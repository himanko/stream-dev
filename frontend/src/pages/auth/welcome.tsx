import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  User,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Welcome() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  // Auto-redirect logic
  useEffect(() => {
    if (countdown === 0) {
      navigate("/profile", { replace: true });
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-lg border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl animate-in fade-in zoom-in duration-500">
        <CardHeader className="text-center pt-8">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-500" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight flex items-center justify-center gap-2">
            Email Verified! <Sparkles className="h-6 w-6 text-[#ff9900]" />
          </CardTitle>
          <CardDescription className="text-base mt-2 text-zinc-500 dark:text-zinc-400">
            Welcome to Fun With Backend. Your account is now fully active and
            secured.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-4">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              Recommended Next Steps:
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 p-2 text-blue-600 dark:text-blue-400">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Complete your profile
                  </p>
                  <p className="text-xs text-zinc-500">
                    Add an avatar and set up your bio.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-0.5 rounded-full bg-purple-100 dark:bg-purple-900/30 p-2 text-purple-600 dark:text-purple-400">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Explore the dashboard
                  </p>
                  <p className="text-xs text-zinc-500">
                    View your courses and account settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pb-8">
          <Button
            className="w-full bg-brand hover:bg-brand/90 text-black dark:text-white group"
            size="lg"
            onClick={() => navigate("/profile", { replace: true })}
          >
            Go to my Dashboard
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="text-xs text-zinc-500 font-medium">
            Redirecting automatically in{" "}
            <span className="font-bold text-zinc-900 dark:text-zinc-100">
              {countdown}
            </span>{" "}
            seconds...
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
