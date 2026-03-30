import {
  Award,
  Download,
  ExternalLink,
  Share2,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  //   CardContent,
  //   CardDescription,
  //   CardHeader,
  //   CardTitle,
} from "@/components/ui/card";

export default function Certificates() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            My Certificates
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            View, download, and share your verified credentials with the world.
          </p>
        </div>
        <Button variant="outline" className="shrink-0 gap-2 hidden sm:flex">
          <Share2 className="h-4 w-4" /> Share Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* CERTIFICATE CARD */}
        <Card className="overflow-hidden border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 group">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px]">
            {/* Visual Document Representation */}
            <div className="relative p-8 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 flex flex-col items-center justify-center min-h-[300px]">
              {/* Decorative Document Border */}
              <div className="absolute inset-4 border-2 border-zinc-200 dark:border-zinc-800 rounded-lg pointer-events-none"></div>
              <div className="absolute inset-6 border border-zinc-100 dark:border-zinc-900 rounded pointer-events-none"></div>

              <div className="relative z-10 text-center space-y-4">
                <div className="mx-auto h-16 w-16 bg-brand/10 rounded-full flex items-center justify-center mb-6">
                  <Award className="h-8 w-8 text-brand" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 mb-2">
                    Certificate of Completion
                  </h4>
                  <h3 className="text-2xl font-serif text-zinc-900 dark:text-white">
                    Core Java Foundations
                  </h3>
                </div>
                <div className="pt-4">
                  <p className="text-xs text-zinc-500 italic">
                    Proudly presented to
                  </p>
                  <p className="text-lg font-medium text-zinc-900 dark:text-white mt-1">
                    Himanko Boruah
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 pt-6 text-xs text-zinc-400">
                  <Building2 className="h-4 w-4" />
                  <span>Fun With Backend</span>
                </div>
              </div>
            </div>

            {/* Metadata & Actions */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-white dark:bg-zinc-950">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-500 mb-2">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Verified Credential
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-white leading-tight">
                    Core Java Foundations
                  </h4>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2">
                    <span className="text-zinc-500">Issued on</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-300">
                      Mar 15, 2026
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2">
                    <span className="text-zinc-500">Credential ID</span>
                    <span className="font-mono text-xs text-zinc-900 dark:text-zinc-300">
                      FWB-7892-A1B2
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-100 dark:border-zinc-900 pb-2">
                    <span className="text-zinc-500">Skills</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-300 text-right">
                      Java, OOP, JVM
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 mt-auto">
                <Button className="w-full bg-brand hover:bg-brand/90 text-white gap-2">
                  <Download className="h-4 w-4" /> Download PDF
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="w-full text-xs h-9 gap-1.5"
                  >
                    <Share2 className="h-3.5 w-3.5" /> LinkedIn
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-xs h-9 gap-1.5"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Verify Link
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
