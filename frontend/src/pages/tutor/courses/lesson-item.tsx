import {
  Video,
  FileText,
  Settings,
  Trash2,
  GripVertical,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LessonProps {
  index: string;
  title: string;
  fileId?: string;
  type: "video" | "resource";
}

export function LessonItem({ index, title, fileId, type }: LessonProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-white dark:bg-zinc-900 hover:border-amber-200 dark:hover:border-amber-900/50 transition-all group">
      <div className="flex items-center gap-4">
        <GripVertical className="h-4 w-4 text-zinc-300 cursor-grab group-hover:text-zinc-500" />

        {type === "video" ? (
          <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded">
            <Video className="h-4 w-4 text-blue-600" />
          </div>
        ) : (
          <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded">
            <FileText className="h-4 w-4 text-emerald-600" />
          </div>
        )}

        <div className="flex flex-col">
          <span className="text-sm font-semibold">
            {index} {title}
          </span>
          <div className="flex items-center gap-2 mt-1">
            {fileId ? (
              <>
                <Badge
                  variant="outline"
                  className="text-[10px] font-mono text-green-600 bg-green-50 dark:bg-green-500/5 border-green-200"
                >
                  <CheckCircle2 className="mr-1 h-3 w-3" /> Linked: {fileId}
                </Badge>
                <span className="flex items-center gap-1 text-[10px] text-zinc-400">
                  <Clock className="h-3 w-3" /> 12:45
                </span>
              </>
            ) : (
              <Badge
                variant="outline"
                className="text-[10px] text-zinc-400 border-dashed"
              >
                No Content Attached
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="secondary" size="sm" className="h-8 text-xs">
          {fileId ? "Update Video" : "Select S3 Object"}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-500"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Rename Lesson</DropdownMenuItem>
            <DropdownMenuItem>Make Lesson Free Preview</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Delete Lesson
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
