// "use client";

// import { RefreshCw, Trash } from "lucide-react";
// import { Button } from "@heroui/button";

// interface FileActionButtonsProps {
//   activeTab: string;
//   trashCount: number;
//   folderPath: Array<{ id: string; name: string }>;
//   onRefresh: () => void;
//   onEmptyTrash: () => void;
// }

// export default function FileActionButtons({
//   activeTab,
//   trashCount,
//   folderPath,
//   onRefresh,
//   onEmptyTrash,
// }: FileActionButtonsProps) {
//   return (
//     <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
//       <h2 className="text-xl sm:text-2xl font-semibold truncate max-w-full">
//         {activeTab === "all" &&
//           (folderPath.length > 0
//             ? folderPath[folderPath.length - 1].name
//             : "All Files")}
//         {activeTab === "starred" && "Starred Files"}
//         {activeTab === "trash" && "Trash"}
//       </h2>
//       <div className="flex gap-2 sm:gap-3 self-end sm:self-auto">
//         <Button
//           variant="flat"
//           size="sm"
//           onClick={onRefresh}
//           startContent={<RefreshCw className="h-4 w-4" />}
//         >
//           Refresh
//         </Button>
//         {activeTab === "trash" && trashCount > 0 && (
//           <Button
//             color="danger"
//             variant="flat"
//             size="sm"
//             onClick={onEmptyTrash}
//             startContent={<Trash className="h-4 w-4" />}
//           >
//             Empty Trash
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }





"use client";

import { RefreshCw, Trash, FolderOpen, Star, Archive } from "lucide-react";
import { Button } from "@heroui/button";
import { useState } from "react";

interface FileActionButtonsProps {
  activeTab: string;
  trashCount: number;
  folderPath: Array<{ id: string; name: string }>;
  onRefresh: () => void;
  onEmptyTrash: () => void;
}

export default function FileActionButtons({
  activeTab,
  trashCount,
  folderPath,
  onRefresh,
  onEmptyTrash,
}: FileActionButtonsProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEmptyingTrash, setIsEmptyingTrash] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setTimeout(() => setIsRefreshing(false), 500); // Minimum loading time for UX
    }
  };

  const handleEmptyTrash = async () => {
    setIsEmptyingTrash(true);
    try {
      await onEmptyTrash();
    } finally {
      setIsEmptyingTrash(false);
    }
  };

  const getTabIcon = () => {
    switch (activeTab) {
      case "starred":
        return <Star className="h-5 w-5 text-yellow-400" />;
      case "trash":
        return <Archive className="h-5 w-5 text-red-400" />;
      default:
        return <FolderOpen className="h-5 w-5 text-cyan-400" />;
    }
  };

  const getTitle = () => {
    if (activeTab === "all") {
      return folderPath.length > 0
        ? folderPath[folderPath.length - 1].name
        : "All Files";
    }
    if (activeTab === "starred") return "Starred Files";
    if (activeTab === "trash") return `Trash ${trashCount > 0 ? `(${trashCount})` : ""}`;
    return "Files";
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
      {/* Title Section */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {getTabIcon()}
        <h2 className="text-xl sm:text-2xl font-semibold text-cyan-300 truncate">
          {getTitle()}
        </h2>
        {folderPath.length > 1 && activeTab === "all" && (
          <div className="hidden sm:flex items-center text-sm text-cyan-500">
            <span className="mx-2">/</span>
            <span className="truncate max-w-32">
              {folderPath[folderPath.length - 2]?.name}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 sm:gap-3 self-end sm:self-auto shrink-0">
        <Button
          variant="flat"
          size="sm"
          onClick={handleRefresh}
          disabled={isRefreshing}
          startContent={
            <RefreshCw 
              className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} 
            />
          }
          className="
            bg-gray-700 hover:bg-gray-600 
            text-cyan-300 hover:text-cyan-200 
            border border-gray-600 hover:border-gray-500 
            shadow-sm hover:shadow-md 
            rounded-lg
            transition-all duration-200 ease-in-out
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>

        {activeTab === "trash" && trashCount > 0 && (
          <Button
            color="danger"
            variant="flat"
            size="sm"
            onClick={handleEmptyTrash}
            disabled={isEmptyingTrash}
            startContent={<Trash className="h-4 w-4" />}
            className="
              bg-red-900/20 hover:bg-red-800/30 
              text-red-400 hover:text-red-300 
              border border-red-700/50 hover:border-red-600/50 
              shadow-sm hover:shadow-md 
              rounded-lg
              transition-all duration-200 ease-in-out
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {isEmptyingTrash ? "Emptying..." : "Empty Trash"}
          </Button>
        )}
      </div>
    </div>
  );
}