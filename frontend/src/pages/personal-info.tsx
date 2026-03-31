import { useEffect, useState } from "react";
import { UserService, type UserProfile } from "@/services/user.service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function PersonalInfo() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // New state for editing and saving
  const [editName, setEditName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Initial Data Load
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await UserService.getProfile();
        setProfile(data);
        setEditName(data.fullName); // Populate the editable input
      } catch (error: unknown) {
        if (error instanceof Error) {
          setErrorMsg(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  // Handle the Form Submission
  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    if (editName.trim() === profile.fullName) return; // Don't save if nothing changed

    setIsSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Send the PUT request to Spring Boot
      const updatedProfile = await UserService.updateProfile({
        fullName: editName,
      });

      // Update the local UI state with the fresh database data
      setProfile(updatedProfile);
      setSuccessMsg("Profile updated successfully!");

      // Hide the success message after 3 seconds
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Failed to save changes.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  // 1. LOADING STATE
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-md mb-2"></div>
        <Card>
          <CardHeader className="h-20 bg-zinc-100 dark:bg-zinc-900"></CardHeader>
        </Card>
      </div>
    );
  }

  // 2. FATAL ERROR STATE (Could not load profile at all)
  if (!profile && errorMsg) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border border-red-200 bg-red-50 dark:bg-red-950/20 rounded-xl">
        <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-red-700 dark:text-red-400">
          Failed to load profile
        </h3>
      </div>
    );
  }

  // 3. MAIN UI
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold tracking-tight">
          Personal Information
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Manage your basic profile details and account status.
        </p>
      </div>

      {/* Dynamic Alert Banners for Save Operations */}
      {errorMsg && (
        <div className="p-3 bg-red-100 text-red-600 rounded-md text-sm font-medium border border-red-200 flex items-center gap-2">
          <AlertCircle className="h-4 w-4" /> {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="p-3 bg-green-100 text-green-700 rounded-md text-sm font-medium border border-green-200 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> {successMsg}
        </div>
      )}

      <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
        <form onSubmit={handleSaveChanges}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-brand" />
              Profile Details
            </CardTitle>
            <CardDescription>
              Update your display name and view your account status.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* EDITABLE Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  disabled={isSaving}
                  required
                />
              </div>

              {/* READ-ONLY Email Address */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-zinc-500" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  value={profile?.email || ""}
                  readOnly
                  className="bg-zinc-50 dark:bg-zinc-900/50 cursor-not-allowed text-zinc-500"
                  title="Contact support to change your email"
                />
              </div>
            </div>

            {/* Account Status Badge */}
            <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <Label className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-zinc-500" />
                Account Tier
              </Label>
              <div>
                {profile?.isPremium ? (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-500 text-sm font-medium border border-amber-200 dark:border-amber-500/20">
                    <span>🌟</span> Premium Member
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 text-sm font-medium border border-zinc-200 dark:border-zinc-700">
                    Standard User
                  </div>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 py-4">
            <Button
              type="submit"
              disabled={isSaving || editName === profile?.fullName}
              className="bg-brand hover:bg-brand/90 text-white"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
