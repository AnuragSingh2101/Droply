import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";


export async function PATCH(request: NextRequest,
    props: { params: Promise<{fileId: string}> }
) {
    try {
        const { userId } = await auth();
        if(!userId){
            return NextResponse.json({error: "Unauthorized"},{status: 401});
        }

        const { fileId } = await props.params;
        if(!fileId){
            return NextResponse.json({error: "File ID is required"},{status: 400});
        }

        //get the file
        const [file] = await db
      .select()
      .from(files)
      .where(and(eq(files.id, fileId), eq(files.userId, userId)));

      if(!file){
        return NextResponse.json({error: "File not found"},{status: 404});
      }

      //toggle the isTrash Button 
      const [updatedFile] = await db
      .update(files)
      .set({ isTrash: !file.isTrash })
      .where(and(eq(files.id, fileId), eq(files.userId, userId)))
      .returning();

    const action = updatedFile.isTrash ? "moved to trash" : "restored";
    return NextResponse.json({
      ...updatedFile,
      message: `File ${action} successfully`,
    });

    } catch (error) {
        console.error("Error during updating file to Trash:", error);
        return NextResponse.json({error: "Failed to update the file to Trash"},{status: 500});
    }
}