"use client";

import { Star, Trash, X, ArrowUpFromLine, Download, FileText, Folder } from "lucide-react";
import { Button } from "@heroui/button";
import { useState } from "react";
import type { File as FileType } from "@/lib/db/schema";

interface FileActionsProps {
  file: FileType;
  onStar: (id: string) => void;
  onTrash: (id: string) => void;
  onDelete: (file: FileType) => void;
  onDownload: (file: FileType) => void;
}

export default function FileActions({
  file,
  onStar,
  onTrash,
  onDelete,
  onDownload,
}: FileActionsProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await onDownload(file);
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(file);
    } finally {
      setIsDeleting(false);
    }
  };

  const getFileIcon = () => {
    if (file.isFolder) {
      return <Folder className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="flex flex-wrap gap-2 justify-end">
      {/* Download button */}
      {!file.isTrash && !file.isFolder && (
        <Button
          variant="flat"
          size="sm"
          onClick={handleDownload}
          disabled={isDownloading}
          className="
            min-w-0 px-3 py-2
            bg-blue-900/20 hover:bg-blue-800/30 
            text-blue-400 hover:text-blue-300 
            border border-blue-700/50 hover:border-blue-600/50 
            shadow-sm hover:shadow-md 
            rounded-lg
            transition-all duration-200 ease-in-out
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          startContent={
            <Download className={`h-4 w-4 ${isDownloading ? 'animate-bounce' : ''}`} />
          }
        >
          <span className="hidden sm:inline">
            {isDownloading ? "Downloading..." : "Download"}
          </span>
        </Button>
      )}

      {/* Star button */}
      {!file.isTrash && (
        <Button
          variant="flat"
          size="sm"
          onClick={() => onStar(file.id)}
          className={`
            min-w-0 px-3 py-2
            ${file.isStarred 
              ? 'bg-yellow-900/20 hover:bg-yellow-800/30 text-yellow-400 hover:text-yellow-300 border border-yellow-700/50 hover:border-yellow-600/50' 
              : 'bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-gray-300 border border-gray-600 hover:border-gray-500'
            }
            shadow-sm hover:shadow-md 
            rounded-lg
            transition-all duration-200 ease-in-out
          `}
          startContent={
            <Star
              className={`h-4 w-4 transition-all duration-200 ${
                file.isStarred
                  ? "text-yellow-400 fill-current scale-110"
                  : "text-gray-400"
              }`}
            />
          }
        >
          <span className="hidden sm:inline">
            {file.isStarred ? "Unstar" : "Star"}
          </span>
        </Button>
      )}

      {/* Trash/Restore button */}
      <Button
        variant="flat"
        size="sm"
        onClick={() => onTrash(file.id)}
        className={`
          min-w-0 px-3 py-2
          ${file.isTrash 
            ? 'bg-green-900/20 hover:bg-green-800/30 text-green-400 hover:text-green-300 border border-green-700/50 hover:border-green-600/50' 
            : 'bg-orange-900/20 hover:bg-orange-800/30 text-orange-400 hover:text-orange-300 border border-orange-700/50 hover:border-orange-600/50'
          }
          shadow-sm hover:shadow-md 
          rounded-lg
          transition-all duration-200 ease-in-out
        `}
        startContent={
          file.isTrash ? (
            <ArrowUpFromLine className="h-4 w-4" />
          ) : (
            <Trash className="h-4 w-4" />
          )
        }
      >
        <span className="hidden sm:inline">
          {file.isTrash ? "Restore" : "Delete"}
        </span>
      </Button>

      {/* Delete permanently button */}
      {file.isTrash && (
        <Button
          variant="flat"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
          className="
            min-w-0 px-3 py-2
            bg-red-900/20 hover:bg-red-800/30 
            text-red-400 hover:text-red-300 
            border border-red-700/50 hover:border-red-600/50 
            shadow-sm hover:shadow-md 
            rounded-lg
            transition-all duration-200 ease-in-out
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          startContent={
            <X className={`h-4 w-4 ${isDeleting ? 'animate-pulse' : ''}`} />
          }
        >
          <span className="hidden sm:inline">
            {isDeleting ? "Removing..." : "Remove"}
          </span>
        </Button>
      )}
    </div>
  );
}









// "use client";

// import {
//   Star,
//   Trash,
//   X,
//   ArrowUpFromLine,
//   Download,
// } from "lucide-react";
// import { Button } from "@heroui/button";
// import type { File as FileType } from "@/lib/db/schema";

// interface FileActionsProps {
//   file: FileType;
//   onStar: (id: string) => void;
//   onTrash: (id: string) => void;
//   onDelete: (file: FileType) => void;
//   onDownload: (file: FileType) => void;
// }

// export default function FileActions({
//   file,
//   onStar,
//   onTrash,
//   onDelete,
//   onDownload,
// }: FileActionsProps) {
//   const iconClasses = "h-4 w-4 transition-colors";

//   return (
//     <div className="flex flex-wrap gap-2 justify-end">
//       {/* Download */}
//       {!file.isTrash && !file.isFolder && (
//         <Button
//           variant="flat"
//           size="sm"
//           title="Download file"
//           onClick={() => onDownload(file)}
//           className="min-w-0 px-2 hover:bg-primary/10"
//           startContent={<Download className={iconClasses} />}
//         >
//           <span className="hidden sm:inline">Download</span>
//         </Button>
//       )}

//       {/* Star / Unstar */}
//       {!file.isTrash && (
//         <Button
//           variant="flat"
//           size="sm"
//           title={file.isStarred ? "Unstar file" : "Star file"}
//           onClick={() => onStar(file.id)}
//           className="min-w-0 px-2 hover:bg-yellow-100"
//           startContent={
//             <Star
//               className={`${iconClasses} ${
//                 file.isStarred ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
//               }`}
//             />
//           }
//         >
//           <span className="hidden sm:inline">
//             {file.isStarred ? "Unstar" : "Star"}
//           </span>
//         </Button>
//       )}

//       {/* Trash / Restore */}
//       <Button
//         variant="flat"
//         size="sm"
//         title={file.isTrash ? "Restore file" : "Move to trash"}
//         color={file.isTrash ? "success" : "default"}
//         onClick={() => onTrash(file.id)}
//         className="min-w-0 px-2 hover:bg-default-200"
//         startContent={
//           file.isTrash ? (
//             <ArrowUpFromLine className={iconClasses} />
//           ) : (
//             <Trash className={iconClasses} />
//           )
//         }
//       >
//         <span className="hidden sm:inline">
//           {file.isTrash ? "Restore" : "Delete"}
//         </span>
//       </Button>

//       {/* Permanent Delete */}
//       {file.isTrash && (
//         <Button
//           variant="flat"
//           size="sm"
//           color="danger"
//           title="Permanently delete file"
//           onClick={() => onDelete(file)}
//           className="min-w-0 px-2 hover:bg-danger/10"
//           startContent={<X className={iconClasses} />}
//         >
//           <span className="hidden sm:inline">Remove</span>
//         </Button>
//       )}
//     </div>
//   );
// }
