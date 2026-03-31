import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { AuthService } from "@/services/auth.service";
import { AlertCircle, ArrowLeft, MailCheck } from "lucide-react";

export default function VerifyEmail() {
  const navigate = useNavigate();

  // 2. THE FIX: Grab the email directly from the URL (e.g., ?email=test@test.com)
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Refs to manage the 6 input boxes
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // 2. Security: If no email is present in state, kick them back to sign-up
  useEffect(() => {
    if (!email) {
      navigate("/sign-up");
    }
  }, [email, navigate]);

  // Handle typing a digit
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newCode = [...code];
    newCode[index] = value.slice(-1); // Only keep the last digit typed
    setCode(newCode);

    // Auto-focus the next box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle Pasting the full 6-digit code
  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = pastedData.split("");
    // Fill as many boxes as we have digits for
    const updatedCode = [...code];
    newCode.forEach((char, idx) => {
      if (idx < 6) updatedCode[idx] = char;
    });
    setCode(updatedCode);

    // Focus the last filled box or the 6th box
    const nextFocus = newCode.length < 6 ? newCode.length : 5;
    inputRefs.current[nextFocus]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");

    if (fullCode.length !== 6) {
      setErrorMsg("Please enter all 6 digits.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      // 3. Call your Spring Boot /api/auth/verify endpoint
      await AuthService.verifyEmail(email, fullCode);

      // 4. THE FIX: Success! Send them to the Sign-In page to officially log in.
      // We pass a state message so the Sign-In page can show a nice "Success" banner!
      navigate("/sign-in", {
        state: {
          message: "Account verified successfully! Please log in to continue.",
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Invalid code. Please check your email and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-brand/10 w-12 h-12 rounded-full flex items-center justify-center mb-2">
            <MailCheck className="h-6 w-6 text-brand" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Check your email
          </CardTitle>
          <CardDescription className="text-zinc-500 dark:text-zinc-400">
            We sent a verification code to <br />
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {email}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between gap-2" onPaste={handlePaste}>
              {code.map((num, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={num}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  disabled={isLoading}
                  className="w-full h-14 text-center text-2xl font-bold border rounded-lg bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all disabled:opacity-50"
                />
              ))}
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-100 text-red-600 rounded-md text-sm flex items-center gap-2 border border-red-200">
                <AlertCircle className="h-4 w-4" /> {errorMsg}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 bg-brand hover:bg-brand/90 text-white font-semibold"
              disabled={isLoading || code.includes("")}
            >
              {isLoading ? "Verifying..." : "Verify Account"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 border-t border-zinc-100 dark:border-zinc-800 pt-6">
          <p className="text-sm text-zinc-500 text-center">
            Didn't receive the code?{" "}
            <button className="text-brand font-semibold hover:underline">
              Resend code
            </button>
          </p>
          <Link
            to="/sign-up"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Sign Up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
