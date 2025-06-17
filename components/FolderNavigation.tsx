"use client";

import { ArrowUpFromLine } from "lucide-react";
import { Button } from "@heroui/button";

interface FolderNavigationProps {
  folderPath: Array<{ id: string; name: string }>;
  navigateUp: () => void;
  navigateToPathFolder: (index: number) => void;
}

export default function FolderNavigation({
  folderPath,
  navigateUp,
  navigateToPathFolder,
}: FolderNavigationProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm overflow-x-auto pb-3 bg-gray-800 px-4 py-2 rounded-md shadow-inner">
      {/* Up Button */}
      <Button
        variant="light"
        size="sm"
        isIconOnly
        onClick={navigateUp}
        isDisabled={folderPath.length === 0}
        className="text-cyan-400 hover:bg-cyan-700/20"
      >
        <ArrowUpFromLine className="h-4 w-4" />
      </Button>

      {/* Home Button */}
      <Button
        variant="light"
        size="sm"
        onClick={() => navigateToPathFolder(-1)}
        className={`text-cyan-300 rounded-md hover:bg-cyan-700/20 ${folderPath.length === 0 ? "font-semibold" : ""}`}
      >
        Home
      </Button>

      {/* Path Buttons */}
      {folderPath.map((folder, index) => (
        <div key={folder.id} className="flex items-center gap-1">
          <span className="text-cyan-500 rounded-md">/</span>
          <Button
            variant="light"
            size="sm"
            onClick={() => navigateToPathFolder(index)}
            className={`truncate max-w-[140px] text-cyan-300 rounded-md hover:bg-cyan-700/20 ${
              index === folderPath.length - 1 ? "font-semibold" : ""
            }`}
            title={folder.name}
          >
            {folder.name}
          </Button>
        </div>
      ))}
    </div>
  );
}









// 'use client';

// import { ArrowUpFromLine, ChevronRight } from 'lucide-react';
// import { Button } from '@heroui/button';
// import { motion, AnimatePresence } from 'framer-motion';

// interface FolderNavigationProps {
//   folderPath: Array<{ id: string; name: string }>;
//   navigateUp: () => void;
//   navigateToPathFolder: (index: number) => void;
// }

// export default function FolderNavigation({
//   folderPath,
//   navigateUp,
//   navigateToPathFolder,
// }: FolderNavigationProps) {
//   return (
//     <div className="flex flex-wrap items-center gap-2 text-sm overflow-x-auto pb-2 px-1">
//       {/* Go up button */}
//       <Button
//         variant="flat"
//         size="sm"
//         isIconOnly
//         onClick={navigateUp}
//         isDisabled={folderPath.length === 0}
//         aria-label="Go to parent folder"
//         className="rounded-md"
//       >
//         <ArrowUpFromLine className="h-4 w-4" />
//       </Button>

//       {/* Home button */}
//       <Button
//         variant="flat"
//         size="sm"
//         onClick={() => navigateToPathFolder(-1)}
//         className={`rounded-md transition-colors ${
//           folderPath.length === 0 ? 'font-semibold text-primary' : 'text-default-700'
//         }`}
//       >
//         Home
//       </Button>

//       {/* Breadcrumb folders */}
//       <AnimatePresence initial={false}>
//         {folderPath.map((folder, index) => (
//           <motion.div
//             key={folder.id}
//             initial={{ opacity: 0, x: 8 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -8 }}
//             transition={{ duration: 0.2 }}
//             className="flex items-center max-w-[150px] overflow-hidden"
//           >
//             <ChevronRight className="mx-1 text-default-400 h-4 w-4 flex-shrink-0" />
//             <Button
//               variant="flat"
//               size="sm"
//               onClick={() => navigateToPathFolder(index)}
//               className={`text-ellipsis whitespace-nowrap overflow-hidden px-2 rounded-md ${
//                 index === folderPath.length - 1
//                   ? 'font-semibold text-primary'
//                   : 'text-default-600 hover:text-primary'
//               }`}
//               title={folder.name}
//             >
//               {folder.name}
//             </Button>
//           </motion.div>
//         ))}
//       </AnimatePresence>
//     </div>
//   );
// }
