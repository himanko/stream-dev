import { useState, useEffect } from "react";
import {
  Upload,
  Search,
  FileVideo,
  RefreshCw,
  MoreVertical,
  HardDrive,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UploadModal } from "./upload-model";

// Type definition based on our media.service.ts
interface MediaObject {
  id: string;
  fileName: string;
  fileSize: number;
  status: "QUEUED" | "PROCESSING" | "COMPLETED" | "FAILED";
  progress: number;
  createdAt: string;
}

export default function MediaLibrary() {
  const [objects, setObjects] = useState<MediaObject[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper for file size conversion
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Simulate fetching data from Spring Boot
  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        // Eventually this will be: const data = await MediaService.getLibrary();
        // For now, we mock the backend response:
        const mockData: MediaObject[] = [
          {
            id: "vid_72x1",
            fileName: "intro_to_react.mp4",
            fileSize: 473956352, // 452 MB in bytes
            status: "COMPLETED",
            progress: 100,
            createdAt: "Apr 10, 2026",
          },
          {
            id: "obj_002x9",
            fileName: "advanced_hooks_tutorial.mov",
            fileSize: 1288490188, // 1.2 GB in bytes
            status: "PROCESSING",
            progress: 65,
            createdAt: "Just now",
          },
        ];

        // Simulate network delay
        setTimeout(() => {
          setObjects(mockData);
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error("Failed to fetch media", error);
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  return (
    <div className="space-y-6">
      {/* 1. HEADER & ACTIONS */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
          <p className="text-sm text-zinc-500">
            Manage raw S3 video objects and monitor transcoding health.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" disabled={loading}>
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />{" "}
            Refresh
          </Button>
          <Button className="bg-[#ff9900] hover:bg-[#ec8b00] text-white font-bold">
            <Upload className="mr-2 h-4 w-4" /> Upload Video
          </Button>
        </div>
      </div>

      {/* 2. QUOTA WIDGET */}
      <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
            <HardDrive className="h-5 w-5 text-zinc-600" />
          </div>
          <div>
            <p className="text-xs text-zinc-500 font-bold uppercase">
              Storage Usage
            </p>
            <p className="text-sm font-semibold">12.4 GB of 50 GB used</p>
          </div>
        </div>
        <Progress value={24.8} className="w-1/3 h-2" />
      </div>

      {/* 3. OBJECT TABLE */}
      <div className="rounded-xl border bg-white dark:bg-zinc-950 shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
            <Input
              placeholder="Search by filename..."
              className="pl-9 bg-zinc-50/50"
            />
          </div>
        </div>

        <Table>
          <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
            <TableRow>
              <TableHead>Object Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Date Uploaded</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-zinc-500"
                >
                  Loading resources...
                </TableCell>
              </TableRow>
            ) : objects.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-zinc-500"
                >
                  No objects found in this bucket.
                </TableCell>
              </TableRow>
            ) : (
              objects.map((obj) => (
                <TableRow
                  key={obj.id}
                  className={
                    obj.status === "PROCESSING"
                      ? "opacity-70 bg-zinc-50/50 dark:bg-zinc-900/20"
                      : ""
                  }
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <FileVideo
                        className={`h-5 w-5 ${obj.status === "COMPLETED" ? "text-blue-500" : "text-zinc-400"}`}
                      />
                      <div className="flex flex-col">
                        <span
                          className={
                            obj.status === "PROCESSING"
                              ? "italic text-zinc-600 dark:text-zinc-400"
                              : ""
                          }
                        >
                          {obj.fileName}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono italic">
                          ID: {obj.id}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {obj.status === "COMPLETED" ? (
                      <Badge className="bg-green-500/10 text-green-600 border-green-200 hover:bg-green-500/20">
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Ready
                      </Badge>
                    ) : (
                      <div className="flex flex-col gap-1 w-32">
                        <span className="text-[10px] font-bold text-blue-600 uppercase">
                          Transcoding {obj.progress}%
                        </span>
                        <Progress value={obj.progress} className="h-1" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-500">
                    {/* Using formatBytes here! */}
                    {formatBytes(obj.fileSize)}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-500">
                    {obj.createdAt}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={obj.status === "PROCESSING"}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <UploadModal>
          <Button className="bg-[#ff9900] hover:bg-[#ec8b00] text-white font-bold">
            <Upload className="mr-2 h-4 w-4" /> Upload Objects
          </Button>
        </UploadModal>
      </div>
    </div>
  );
}
