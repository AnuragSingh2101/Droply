"use client";

import { Star, Trash2, Upload, FolderPlus, Cloud } from "lucide-react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";

interface FileEmptyStateProps {
  activeTab: string;
  onUploadClick?: () => void;
  onCreateFolderClick?: () => void;
}

export default function FileEmptyState({ 
  activeTab, 
  onUploadClick,
  onCreateFolderClick 
}: FileEmptyStateProps) {
  const getEmptyStateConfig = () => {
    switch (activeTab) {
      case "starred":
        return {
          icon: <Star className="h-20 w-20 mx-auto text-yellow-400/50 mb-6" />,
          title: "No starred files yet",
          description: "Mark important files with a star to find them quickly when you need them. Starred files will appear here for easy access.",
          actionButtons: null,
        };
      case "trash":
        return {
          icon: <Trash2 className="h-20 w-20 mx-auto text-red-400/50 mb-6" />,
          title: "Trash is empty",
          description: "Files you delete will appear here for 30 days before being permanently removed. You can restore deleted files anytime during this period.",
          actionButtons: null,
        };
      default:
        return {
          icon: <Cloud className="h-20 w-20 mx-auto text-cyan-400/50 mb-6" />,
          title: "Your cloud storage awaits",
          description: "Start building your personal file library. Upload documents, images, and other files to access them anywhere, anytime.",
          actionButtons: (
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              {onUploadClick && (
                <Button
                  onClick={onUploadClick}
                  startContent={<Upload className="h-4 w-4" />}
                  className="
                    px-6 py-3 
                    bg-cyan-500 hover:bg-cyan-400 
                    text-white font-semibold 
                    rounded-lg 
                    border border-cyan-500 hover:border-cyan-400 
                    shadow-md hover:shadow-lg 
                    transform hover:scale-105 
                    transition-all duration-200 ease-in-out
                  "
                >
                  Upload Files
                </Button>
              )}
              {onCreateFolderClick && (
                <Button
                  variant="flat"
                  onClick={onCreateFolderClick}
                  startContent={<FolderPlus className="h-4 w-4" />}
                  className="
                    px-6 py-3 
                    bg-gray-700 hover:bg-gray-600 
                    text-cyan-300 hover:text-cyan-200 
                    border border-gray-600 hover:border-gray-500 
                    rounded-lg 
                    shadow-sm hover:shadow-md 
                    transform hover:scale-105 
                    transition-all duration-200 ease-in-out
                  "
                >
                  Create Folder
                </Button>
              )}
            </div>
          ),
        };
    }
  };

  const { icon, title, description, actionButtons } = getEmptyStateConfig();

  return (
    <Card className="
      border border-cyan-700/30 
      bg-gray-800/50 
      backdrop-blur-sm
      shadow-lg 
      rounded-xl
      transition-all duration-300 ease-in-out
      hover:shadow-xl hover:border-cyan-600/40
    ">
      <CardBody className="text-center py-20 px-8">
        {/* Animated Icon with Glow Effect */}
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-pulse">
            <div className="h-20 w-20 mx-auto rounded-full bg-cyan-500/10 blur-xl"></div>
          </div>
          <div className="relative">
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-cyan-300 mb-4">
          {title}
        </h3>

        {/* Description */}
        <p className="text-cyan-400/80 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
          {description}
        </p>

        {/* Action Buttons */}
        {actionButtons}

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-cyan-500/30 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-cyan-500/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="w-2 h-2 bg-cyan-500/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </CardBody>
    </Card>
  );
}









// "use client";

// import { File } from "lucide-react";
// import { Card, CardBody } from "@heroui/card";

// interface FileEmptyStateProps {
//   activeTab: string;
// }

// export default function FileEmptyState({ activeTab }: FileEmptyStateProps) {
//   const getTitle = () => {
//     switch (activeTab) {
//       case "all":
//         return "No files available";
//       case "starred":
//         return "No starred files";
//       case "trash":
//         return "Trash is empty";
//       default:
//         return "Nothing here yet";
//     }
//   };

//   const getDescription = () => {
//     switch (activeTab) {
//       case "all":
//         return "Upload your first file to get started with your personal cloud storage.";
//       case "starred":
//         return "Mark important files with a star to access them quickly.";
//       case "trash":
//         return "Files you delete will appear here for 30 days before permanent removal.";
//       default:
//         return "";
//     }
//   };

//   return (
//     <Card className="border border-default-200 bg-default-50 shadow-sm transition-shadow hover:shadow-md">
//       <CardBody className="text-center py-16 px-6 sm:px-12">
//         <File className="h-16 w-16 mx-auto text-primary/40 mb-6 animate-pulse" />
//         <h3 className="text-2xl font-semibold text-default-900 mb-2">{getTitle()}</h3>
//         <p className="text-default-600 text-base max-w-xl mx-auto">{getDescription()}</p>
//       </CardBody>
//     </Card>
//   );
// }
