import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import ImageKit from "imagekit";
import { v4 as uuidv4 } from "uuid";

// Initialize ImageKit with your credentials
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});



export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const formUserId = formData.get("userId") as string;
    const parentId = (formData.get("parentId") as string) || null;

    if (formUserId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!file) {
      console.log("formData keys:", Array.from(formData.keys()));
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate parent folder if provided
    if (parentId) {
      const [parentFolder] = await db
        .select()
        .from(files)
        .where(
          and(
            eq(files.id, parentId),
            eq(files.userId, userId),
            eq(files.isFolder, true)
          )
        );

      if (!parentFolder) {
        return NextResponse.json(
          { error: "Parent folder not found" },
          { status: 404 }
        );
      }
    }

    // Allow only images and PDFs
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only image and PDF files are supported" },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);
    const originalFilename = file.name;
    const fileExtension = originalFilename.split(".").pop() || "file";
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;
    const folderPath = parentId
      ? `/droply/${userId}/folders/${parentId}`
      : `/droply/${userId}`;

    // ✅ Move this outside the try so it's accessible
    let uploadResponse;
    try {
      uploadResponse = await imagekit.upload({
        file: fileBuffer,
        fileName: uniqueFilename,
        folder: folderPath,
        useUniqueFileName: false,
      });
    } catch (uploadError) {
      console.error("ImageKit upload error:", uploadError);
      return NextResponse.json(
        { error: "ImageKit upload failed" },
        { status: 500 }
      );
    }

    const fileData = {
      name: originalFilename,
      path: uploadResponse.filePath,
      size: file.size,
      type: file.type,
      fileUrl: uploadResponse.url,
      thumbnailUrl: uploadResponse.thumbnailUrl || null,
      imagekit_file_id: uploadResponse.fileId,
      userId: userId,
      parentId: parentId,
      isFolder: false,
      isStarred: false,
      isTrash: false,
    };

    const [newFile] = await db.insert(files).values(fileData).returning();
    return NextResponse.json(newFile);

  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}