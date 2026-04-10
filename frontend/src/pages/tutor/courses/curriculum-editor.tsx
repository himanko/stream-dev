import { useState } from "react";
import {
  Plus,
  Save,
  Eye,
  GripVertical,
  LayoutList,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LessonItem } from "./lesson-item";

export default function CurriculumEditor() {
  const [isSyncing, setIsSyncing] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 rounded-lg">
            <LayoutList className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Curriculum Designer
            </h1>
            <p className="text-sm text-zinc-500">
              Structure your lessons and map them to S3 media resources.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="h-9">
            <Eye className="mr-2 h-4 w-4" /> Preview
          </Button>
          <Button
            className="h-9 bg-[#ff9900] hover:bg-[#ec8b00] text-white font-bold"
            onClick={() => {
              setIsSyncing(true);
              setTimeout(() => setIsSyncing(false), 1200);
            }}
          >
            {isSyncing ? (
              "Syncing..."
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* CURRICULUM WORKSPACE */}
      <div className="space-y-4">
        <Accordion
          type="multiple"
          defaultValue={["section-1"]}
          className="space-y-4"
        >
          {/* SECTION COMPONENT */}
          <AccordionItem
            value="section-1"
            className="border rounded-xl bg-white dark:bg-zinc-950 px-6 shadow-sm overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <GripVertical className="h-5 w-5 text-zinc-400 cursor-grab" />
              <AccordionTrigger className="hover:no-underline py-5 flex-1 group">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-mono text-zinc-400">
                    Section 01
                  </span>
                  <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    Environment Setup & Fundamentals
                  </span>
                  <Badge
                    variant="secondary"
                    className="bg-zinc-100 text-zinc-600 dark:bg-zinc-900"
                  >
                    4 Lessons
                  </Badge>
                </div>
              </AccordionTrigger>
            </div>

            <AccordionContent className="pt-2 pb-6">
              <div className="pl-12 space-y-3 border-l-2 border-zinc-100 dark:border-zinc-800 ml-2">
                {/* LESSON SUBORDINATES */}
                <LessonItem
                  index="1.1"
                  title="Installing Python on Windows/Mac"
                  fileId="obj_py_install_01"
                  type="video"
                />
                <LessonItem
                  index="1.2"
                  title="Your First 'Hello World'"
                  fileId="obj_py_hello_02"
                  type="video"
                />
                <LessonItem
                  index="1.3"
                  title="Source Code Repository"
                  type="resource"
                />

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full border-dashed border-2 mt-4 h-11 text-zinc-400 hover:text-zinc-900 hover:border-zinc-300"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Lesson to Section
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* ADD SECTION TRIGGER */}
          <Button
            variant="outline"
            className="w-full h-14 border-dashed border-2 border-zinc-200 dark:border-zinc-800 text-zinc-500 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            <Plus className="mr-2 h-5 w-5" /> Add New Section Instance
          </Button>
        </Accordion>
      </div>
    </div>
  );
}
