import { useState, useEffect } from "react";
import { FaGoogle, FaApple, FaGithub } from "react-icons/fa";
import { Eye, EyeOff, Check, X } from "lucide-react";
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
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "@/services/auth.service";

export default function SignUp() {
  const navigate = useNavigate();

  // --- REVERSE BOUNCER ---
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form Data State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "Contains a number", met: /\d/.test(formData.password) },
    {
      text: "Contains a special character",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isPasswordValid = passwordRequirements.every((req) => req.met);
    if (!isPasswordValid) {
      setErrorMsg("Please ensure your password meets all requirements.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      await AuthService.register(formData);
      // THE FIX: Put the email securely in the URL query string instead of invisible state!
      const safeEmail = encodeURIComponent(formData.email);
      navigate(`/verify-email?email=${safeEmail}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl mt-8 mb-8">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Create an account
          </CardTitle>
          <CardDescription className="text-zinc-500 dark:text-zinc-400">
            Enter your details to get started with Fun With Backend
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
              aria-label="Sign up with Google"
              disabled={isLoading}
            >
              <FaGoogle className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              type="button"
              aria-label="Sign up with Apple"
              disabled={isLoading}
            >
              <FaApple className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              type="button"
              aria-label="Sign up with Github"
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
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Himanko Boruah"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

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
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="flex flex-col gap-1.5 mt-2">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    {req.met ? (
                      <Check className="h-3.5 w-3.5 text-green-500" />
                    ) : (
                      <X className="h-3.5 w-3.5 text-zinc-400 dark:text-zinc-600" />
                    )}
                    <span
                      className={
                        req.met
                          ? "text-zinc-700 dark:text-zinc-300"
                          : "text-zinc-500 dark:text-zinc-500"
                      }
                    >
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-6 bg-brand hover:bg-brand/90 text-black dark:text-white"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col items-center justify-center gap-2">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="font-semibold text-brand hover:underline"
            >
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
