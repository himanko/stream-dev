import { FaGoogle, FaApple, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-zinc-500 dark:text-zinc-400">
            Enter your email and password to sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* OAuth Providers */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              type="button"
              aria-label="Log in with Google"
            >
              <FaGoogle className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              type="button"
              aria-label="Log in with Apple"
            >
              <FaApple className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              type="button"
              aria-label="Log in with Github"
            >
              <FaGithub className="h-4 w-4" />
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-zinc-950 px-2 text-zinc-500">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Standard Login Form */}
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/forgot-password"
                  className="text-sm font-medium text-brand hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-center gap-2">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            Don't have an account?{" "}
            {/* Uses React Router to navigate to the sign-up page */}
            <Link
              to="/sign-up"
              className="font-semibold text-brand hover:underline"
            >
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
