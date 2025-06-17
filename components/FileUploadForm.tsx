"use client";

import { useState, useRef } from "react";
import { Button } from "@heroui/button";
import { Progress } from "@heroui/progress";
import { Input } from "@heroui/input";
import {
  Upload,
  X,
  FileUp,
  AlertTriangle,
  FolderPlus,
  ArrowRight,
} from "lucide-react";
import { addToast } from "@heroui/toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import axios from "axios";

interface FileUploadFormProps {
  userId: string;
  onUploadSuccess?: () => void;
  currentFolder?: string | null;
}

export default function FileUploadForm({
  userId,
  onUploadSuccess,
  currentFolder = null,
}: FileUploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Folder creation state
  const [folderModalOpen, setFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [creatingFolder, setCreatingFolder] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit");
        return;
      }

      setFile(selectedFile);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];

      if (droppedFile.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5MB limit");
        return;
      }

      setFile(droppedFile);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const clearFile = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    if (currentFolder) {
      formData.append("parentId", currentFolder);
    }

    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      await axios.post("/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
      });

      addToast({
        title: "Upload Successful",
        description: `${file.name} has been uploaded successfully.`,
        color: "success",
      });

      clearFile();
      onUploadSuccess?.();
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload file. Please try again.");
      addToast({
        title: "Upload Failed",
        description: "We couldn't upload your file. Please try again.",
        color: "danger",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      addToast({
        title: "Invalid Folder Name",
        description: "Please enter a valid folder name.",
        color: "danger",
      });
      return;
    }

    setCreatingFolder(true);

    try {
      await axios.post("/api/folders/create", {
        name: folderName.trim(),
        userId,
        parentId: currentFolder,
      });

      addToast({
        title: "Folder Created",
        description: `Folder "${folderName}" has been created successfully.`,
        color: "success",
      });

      setFolderName("");
      setFolderModalOpen(false);
      onUploadSuccess?.();
    } catch (error) {
      console.error("Error creating folder:", error);
      addToast({
        title: "Folder Creation Failed",
        description: "We couldn't create the folder. Please try again.",
        color: "danger",
      });
    } finally {
      setCreatingFolder(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action buttons */}
      <div className="flex gap-3 mb-4">
        <Button
          color="primary"
          variant="flat"
          startContent={<FolderPlus className="h-5 w-5" />}
          onClick={() => setFolderModalOpen(true)}
          className="flex-1 font-semibold text-sm rounded-lg bg-cyan-100 text-cyan-700 shadow-sm
           hover:bg-cyan-200 hover:shadow-md hover:border hover:border-cyan-500
           transition-all duration-200 ease-in-out"

        >
          New Folder
        </Button>
        <Button
          color="primary"
          variant="flat"
          startContent={<FileUp className="h-5 w-5" />}
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 font-semibold text-sm rounded-lg bg-cyan-100 text-cyan-700 shadow-sm
           hover:bg-cyan-200 hover:shadow-md hover:border hover:border-cyan-500
           transition-all duration-200 ease-in-out"

        >
          Add Image
        </Button>
      </div>

      {/* File drop area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${
          error
            ? "border-danger/70 bg-danger/20 text-danger-900"
            : file
            ? "border-primary/70 bg-primary/20 text-primary-900"
            : "border-default-300 hover:border-primary/50 hover:bg-primary/10 text-default-900"
        }`}
      >
        {!file ? (
          <div className="space-y-4">
            <FileUp className="h-14 w-14 mx-auto text-primary/80" />
            <div>
              <p className="text-base text-default-800">
                Drag and drop your image here, or{" "}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary font-semibold underline underline-offset-2 hover:text-primary-dark cursor-pointer bg-transparent border-0 p-0 m-0"
                  aria-label="Browse files"
                >
                  browse
                </button>
              </p>
              <p className="text-xs text-default-500 mt-1">Images up to 5MB</p>
            </div>
            <Input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              aria-describedby="file-upload-instructions"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/15 rounded-md">
                  <FileUp className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-md font-semibold truncate max-w-[220px]">
                    {file.name}
                  </p>
                  <p className="text-sm text-default-600">
                    {file.size < 1024
                      ? `${file.size} B`
                      : file.size < 1024 * 1024
                      ? `${(file.size / 1024).toFixed(1)} KB`
                      : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                  </p>
                </div>
              </div>
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onClick={clearFile}
                className="text-default-600 hover:text-danger-600"
                aria-label="Clear selected file"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {error && (
              <div
                className="bg-danger-100 text-danger-900 p-3 rounded-lg flex items-center gap-2 shadow-md"
                role="alert"
                aria-live="assertive"
              >
                <AlertTriangle className="h-5 w-5" />
                <span className="text-sm font-semibold">{error}</span>
              </div>
            )}

            {uploading && (
              <Progress
                value={progress}
                color="primary"
                size="sm"
                showValueLabel={true}
                className="max-w-full rounded"
              />
            )}

            <Button
              color="primary"
              startContent={<Upload className="h-5 w-5" />}
              endContent={!uploading && <ArrowRight className="h-5 w-5" />}
              onClick={handleUpload}
              isLoading={uploading}
              className="w-full text-base font-semibold"
              isDisabled={!!error}
              aria-disabled={!!error}
            >
              {uploading ? `Uploading... ${progress}%` : "Upload Image"}
            </Button>
          </div>
        )}
      </div>

      {/* Upload tips */}
      <section
        className="bg-default-100/10 p-5 rounded-lg border border-default-200 shadow-sm"
        aria-label="Upload tips"
      >
        <h4 className="text-sm font-semibold mb-3 text-default-700">Tips</h4>
        <ul className="text-xs text-default-600 space-y-1 list-disc list-inside">
          <li>Images are private and only visible to you</li>
          <li>Supported formats: JPG, PNG, GIF, WebP</li>
          <li>Maximum file size: 5MB</li>
        </ul>
      </section>

      {/* Create Folder Modal */}
      <Modal
        isOpen={folderModalOpen}
        onOpenChange={setFolderModalOpen}
        backdrop="none"
        classNames={{
          base: "border border-default-300 bg-gray-900 bg-opacity-90 shadow-lg rounded-lg max-w-md mx-auto p-6 relative z-50 text-white",
          header:
            "border-b border-default-700 pb-3 mb-4 flex items-center gap-3",
          footer:
            "border-t border-default-700 pt-4 mt-6 flex justify-end gap-3",
        }}
        aria-label="Create new folder"
      >
        <ModalContent>
          <ModalHeader className="text-lg font-semibold flex items-center gap-3">
            <FolderPlus className="h-6 w-6 text-primary" />
            <span>New Folder</span>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <label htmlFor="folderNameInput" className="sr-only">
                Folder name
              </label>
              <input
                id="folderNameInput"
                type="text"
                placeholder="My Folder"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                autoFocus
                className="w-full border border-gray-600 bg-gray-800 text-white caret-white focus:ring-2 focus:ring-primary-500 focus:outline-none rounded-md px-3 py-2 placeholder-gray-400"
                aria-describedby="folderNameHelp"
              />
              <p id="folderNameHelp" className="text-xs text-gray-400">
                Enter a name for your new folder.
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="flat"
              color="default"
              onClick={() => setFolderModalOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={handleCreateFolder}
              isLoading={creatingFolder}
              isDisabled={!folderName.trim()}
              endContent={!creatingFolder && <ArrowRight className="h-5 w-5" />}
              className="font-semibold"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
