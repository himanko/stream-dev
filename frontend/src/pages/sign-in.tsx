import { useState, useEffect } from "react";
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
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthService } from "@/services/auth.service";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/services/api"; // <-- ADDED: We need this to fetch the user profile

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, login } = useAuth();

  // --- REVERSE BOUNCER ---
  useEffect(() => {
    if (user) {
      const destination = location.state?.from?.pathname || "/profile";
      navigate(destination, { replace: true });
    }
  }, [user, navigate, location]);

  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form Data State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      // 1. Send credentials. The Gateway intercepts the JWT and gives the browser a Cookie.
      await AuthService.login(formData);

      // 2. Fetch the user details using that brand new cookie!
      const userResponse = await api.get("/auth/me");

      // 3. Update the global React state with the user data
      login(userResponse.data);

      // The useEffect reverse-bouncer at the top will now automatically trigger and navigate them to /profile!
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("An unexpected error occurred.");
      }
      setIsLoading(false); // Only stop loading if there's an error
    }
  };

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
          {errorMsg && (
            <div className="p-3 bg-red-100 text-red-600 rounded-md text-sm font-medium border border-red-200">
              {errorMsg}
            </div>
          )}

          {/* OAuth Providers */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              type="button"
              aria-label="Log in with Google"
              disabled={isLoading}
            >
              <FaGoogle className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              type="button"
              aria-label="Log in with Apple"
              disabled={isLoading}
            >
              <FaApple className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              type="button"
              aria-label="Log in with Github"
              disabled={isLoading}
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-brand hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-brand hover:bg-brand/90 text-black dark:text-white"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-center gap-2">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            Don't have an account?{" "}
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
