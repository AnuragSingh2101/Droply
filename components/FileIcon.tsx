"use client";

import { Folder, FileText } from "lucide-react";
import { IKImage } from "imagekitio-next";
import type { File as FileType } from "@/lib/db/schema";

interface FileIconProps {
  file: FileType;
}

export default function FileIcon({ file }: FileIconProps) {
  if (file.isFolder) return <Folder className="h-5 w-5 text-blue-500" />;

  const fileType = file.type.split("/")[0];
  switch (fileType) {
    case "image":
      return (
        <div className="h-12 w-12 relative overflow-hidden rounded">
          <IKImage
            path={file.path}
            urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
            transformation={[
              {
                height: 48,
                width: 48,
                focus: "auto",
                quality: 80,
                dpr: 2,
              },
            ]}
            loading="lazy"
            lqip={{ active: true }}
            alt={file.name}
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        </div>
      );
    case "application":
      if (file.type.includes("pdf")) {
        return <FileText className="h-5 w-5 text-red-500" />;
      }
      return <FileText className="h-5 w-5 text-orange-500" />;
    case "video":
      return <FileText className="h-5 w-5 text-purple-500" />;
    default:
      return <FileText className="h-5 w-5 text-gray-500" />;
  }
}












// "use client";

// import {
//   Folder,
//   FileText,
//   FileImage,
//   FileVideo,
//   FileArchive,
//   FileCode,
//   FileAudio,
// } from "lucide-react";
// import { IKImage } from "imagekitio-next";
// import type { File as FileType } from "@/lib/db/schema";

// interface FileIconProps {
//   file: FileType;
// }

// export default function FileIcon({ file }: FileIconProps) {
//   if (file.isFolder) {
//     return <Folder className="h-6 w-6 text-blue-600" />;
//   }

//   const fileType = file.type.split("/")[0];
//   const fileExt = file.type.split("/")[1];

//   if (fileType === "image") {
//     return (
//       <div className="h-12 w-12 relative overflow-hidden rounded border border-default-200 shadow-sm">
//         <IKImage
//           path={file.path}
//           urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
//           transformation={[
//             { height: 48, width: 48, focus: "auto", quality: 80, dpr: 2 },
//           ]}
//           loading="lazy"
//           lqip={{ active: true }}
//           alt={file.name}
//           className="object-cover w-full h-full"
//         />
//       </div>
//     );
//   }

//   // Match other types with better icons/colors
//   switch (fileType) {
//     case "application":
//       if (fileExt.includes("pdf")) {
//         return <FileText className="h-6 w-6 text-red-600" />;
//       } else if (fileExt.includes("zip") || fileExt.includes("rar")) {
//         return <FileArchive className="h-6 w-6 text-yellow-500" />;
//       } else if (
//         fileExt.includes("json") ||
//         fileExt.includes("js") ||
//         fileExt.includes("html") ||
//         fileExt.includes("css")
//       ) {
//         return <FileCode className="h-6 w-6 text-teal-500" />;
//       } else {
//         return <FileText className="h-6 w-6 text-orange-500" />;
//       }

//     case "video":
//       return <FileVideo className="h-6 w-6 text-purple-500" />;

//     case "audio":
//       return <FileAudio className="h-6 w-6 text-pink-500" />;

//     default:
//       return <FileText className="h-6 w-6 text-gray-500" />;
//   }
// }
