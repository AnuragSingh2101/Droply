"use client";

import { File, Star, Trash } from "lucide-react";
import { Tabs, Tab } from "@heroui/tabs";
import Badge from "@/components/ui/Badge";
import type { File as FileType } from "@/lib/db/schema";

interface FileTabsProps {
  activeTab: string;
  onTabChange: (key: string) => void;
  files: FileType[];
  starredCount: number;
  trashCount: number;
}

export default function FileTabs({
  activeTab,
  onTabChange,
  files,
  starredCount,
  trashCount,
}: FileTabsProps) {
  return (
    <Tabs
      selectedKey={activeTab}
      onSelectionChange={(key) => onTabChange(key as string)}
      color="primary"
      variant="light"
      classNames={{
        base: "w-full overflow-x-auto",
        tabList: "flex gap-3 md:gap-5 px-1 py-2 rounded-lg bg-gray-800",
        tab: `
          flex items-center gap-2 px-4 py-2
          rounded-full text-sm font-medium
          text-cyan-300 hover:bg-cyan-900/30
          transition-colors duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500
          data-[selected=true]:bg-cyan-700/20 data-[selected=true]:text-cyan-100
        `,
      }}
    >
      <Tab
        key="all"
        title={
          <div className="flex items-center gap-2">
            <File className="h-4 w-4" />
            <span>All Files</span>
            <Badge
              variant="flat"
              color="default"
              size="sm"
              className="bg-gray-600 text-white"
              aria-label={`${files.filter((file) => !file.isTrash).length} files`}
            >
              {files.filter((file) => !file.isTrash).length}
            </Badge>
          </div>
        }
      />
      <Tab
        key="starred"
        title={
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span>Starred</span>
            <Badge
              variant="flat"
              color="warning"
              size="sm"
              className="bg-yellow-500/20 text-yellow-400"
              aria-label={`${starredCount} starred files`}
            >
              {starredCount}
            </Badge>
          </div>
        }
      />
      <Tab
        key="trash"
        title={
          <div className="flex items-center gap-2">
            <Trash className="h-4 w-4" />
            <span>Trash</span>
            <Badge
              variant="flat"
              color="danger"
              size="sm"
              className="bg-red-500/20 text-red-400"
              aria-label={`${trashCount} files in trash`}
            >
              {trashCount}
            </Badge>
          </div>
        }
      />
    </Tabs>
  );
}