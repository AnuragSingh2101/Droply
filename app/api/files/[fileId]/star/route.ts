import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { NextResponse, NextRequest } from "next/server";


export async function PATCH(
    request: NextRequest,
    props: {params: Promise<{ fileId: string}>}
){
    try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fileId } = await props.params;
    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required" },
        { status: 400 }
      );
    }

    // Get the current file
    const [file] = await db
      .select()
      .from(files)
      .where(and(eq(files.id, fileId), eq(files.userId, userId)));

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // isStarred functionality. 
    const [updatedFile] = await db
      .update(files)
      .set({ isStarred: !file.isStarred })
      .where(and(eq(files.id, fileId), eq(files.userId, userId)))
      .returning();

    return NextResponse.json({ file: updatedFile }, { status: 200 });

    } catch (error) {
        console.error("Error during the starring the file :", error);
    return NextResponse.json(
      { error: "Failed to starred the file" },
      { status: 500 }
    );
    }
}