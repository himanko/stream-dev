import { useState, useRef } from "react";
import {
  UploadCloud,
  X,
  FileVideo,
  CheckCircle2,
  AlertCircle,
  Database,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

// Define the state of each file being uploaded
interface UploadableFile {
  id: string;
  file: File;
  progress: number;
  status: "IDLE" | "UPLOADING" | "SUCCESS" | "ERROR";
}

export function UploadModal({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState<UploadableFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to format bytes cleanly
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // 1. Handle File Selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        id: Math.random().toString(36).substring(7),
        file,
        progress: 0,
        status: "IDLE" as const,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  // 2. Handle Drag & Drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files).map((file) => ({
        id: Math.random().toString(36).substring(7),
        file,
        progress: 0,
        status: "IDLE" as const,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  // 3. The Upload Execution Logic (Direct to S3 Simulation)
  const executeUpload = async () => {
    setIsUploading(true);

    // Process each file
    for (let i = 0; i < files.length; i++) {
      if (files[i].status === "SUCCESS") continue;

      // Mark as uploading
      setFiles((prev) =>
        prev.map((f) =>
          f.id === files[i].id ? { ...f, status: "UPLOADING" } : f,
        ),
      );

      /* INDUSTRY STANDARD FLOW FOR SPRING BOOT + S3:
        1. const { url, objectKey } = await MediaService.getPresignedUrl(files[i].file.name);
        2. await axios.put(url, files[i].file, {
             headers: { 'Content-Type': files[i].file.type },
             onUploadProgress: (progressEvent) => {
               const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
               // Update React state with percentCompleted
             }
           });
        3. await MediaService.notifyBackendUploadComplete(objectKey);
      */

      // SIMULATION OF NETWORK PROGRESS
      await new Promise<void>((resolve) => {
        let currentProgress = 0;
        const interval = setInterval(() => {
          currentProgress += Math.floor(Math.random() * 15) + 5; // Random chunk size
          if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(interval);
            resolve();
          }

          setFiles((prev) =>
            prev.map((f) =>
              f.id === files[i].id ? { ...f, progress: currentProgress } : f,
            ),
          );
        }, 300);
      });

      // Mark as Success
      setFiles((prev) =>
        prev.map((f) =>
          f.id === files[i].id ? { ...f, status: "SUCCESS" } : f,
        ),
      );
    }

    setIsUploading(false);
  };

  const handleClose = (open: boolean) => {
    if (isUploading) return; // Prevent closing while uploading
    setIsOpen(open);
    if (!open) {
      // Clean up state when closing
      setTimeout(() => setFiles([]), 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        {children || (
          <Button className="bg-[#ff9900] hover:bg-[#ec8b00] text-white font-bold">
            <UploadCloud className="mr-2 h-4 w-4" /> Upload Objects
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-zinc-950">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            Upload to S3 Storage
          </DialogTitle>
          <DialogDescription>
            Files will be uploaded directly to your secure AWS S3 bucket.
            Transcoding will begin automatically upon completion.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* DRAG AND DROP ZONE */}
          {!isUploading && files.length === 0 && (
            <div
              className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl p-10 flex flex-col items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="p-3 bg-blue-100 dark:bg-blue-500/10 rounded-full">
                <UploadCloud className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  MP4, MOV, PDF, or ZIP (Max. 5GB per object)
                </p>
              </div>
              <input
                type="file"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileSelect}
              />
            </div>
          )}

          {/* FILE LIST & PROGRESS */}
          {files.length > 0 && (
            <div className="border rounded-md divide-y dark:border-zinc-800 max-h-[300px] overflow-y-auto">
              {files.map((fileObj) => (
                <div
                  key={fileObj.id}
                  className="p-4 flex flex-col gap-3 bg-zinc-50/50 dark:bg-zinc-900/20"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileVideo className="h-5 w-5 text-zinc-500 flex-shrink-0" />
                      <div className="flex flex-col truncate">
                        <span className="text-sm font-medium truncate pr-4">
                          {fileObj.file.name}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-zinc-500 font-mono">
                            {formatBytes(fileObj.file.size)}
                          </span>
                          {fileObj.status === "SUCCESS" && (
                            <Badge className="h-4 text-[9px] bg-green-500/10 text-green-600 border-green-200">
                              Uploaded
                            </Badge>
                          )}
                          {fileObj.status === "ERROR" && (
                            <Badge
                              variant="destructive"
                              className="h-4 text-[9px]"
                            >
                              Failed
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Delete button (only show if not currently uploading/success) */}
                    {fileObj.status === "IDLE" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-zinc-500 hover:text-red-500"
                        onClick={() => removeFile(fileObj.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                    {fileObj.status === "SUCCESS" && (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    )}
                    {fileObj.status === "ERROR" && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>

                  {/* PROGRESS BAR (Only show if uploading or success) */}
                  {(fileObj.status === "UPLOADING" ||
                    fileObj.status === "SUCCESS") && (
                    <div className="flex items-center gap-3">
                      <Progress
                        value={fileObj.progress}
                        className={`h-1.5 flex-1 ${fileObj.status === "SUCCESS" ? "[&>div]:bg-green-500" : "[&>div]:bg-blue-600"}`}
                      />
                      <span className="text-xs font-mono text-zinc-500 w-8">
                        {fileObj.progress}%
                      </span>
                    </div>
                  )}
                </div>
              ))}

              {/* Add more files row */}
              {!isUploading && (
                <div
                  className="p-3 text-center text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 cursor-pointer font-medium transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  + Add more files
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="border-t pt-4">
          <Button
            variant="outline"
            onClick={() => handleClose(false)}
            disabled={isUploading}
          >
            {files.some((f) => f.status === "SUCCESS") ? "Close" : "Cancel"}
          </Button>
          <Button
            className="bg-[#ff9900] hover:bg-[#ec8b00] text-white font-bold w-32"
            disabled={
              files.length === 0 ||
              isUploading ||
              files.every((f) => f.status === "SUCCESS")
            }
            onClick={executeUpload}
          >
            {isUploading ? "Uploading..." : "Start Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
