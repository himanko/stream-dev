import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center px-4">
      <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-6xl max-w-4xl">
        Master Java & C++ from the Ground Up
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
        Start with our free foundational tutorials on YouTube, then level up to
        our premium mastery courses. Build real-world portfolio pieces,
        including a full-stack digital banking prototype.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Button asChild size="lg" className="font-semibold px-8">
          <Link to="/sign-up">Start Learning for Free</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="font-semibold px-8"
        >
          <a
            href="https://youtube.com/@funwithbackend"
            target="_blank"
            rel="noreferrer"
          >
            Watch on YouTube
          </a>
        </Button>
      </div>
    </div>
  );
}
