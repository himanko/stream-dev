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
  FileText,
  MapPin, // NEW Icon
  Briefcase, // NEW Icon
  Globe, // NEW Icon
  Eye, // NEW Icon
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaLink, // NEW Icon
} from "react-icons/fa";

// Helper function to format the Last Active time cleanly
const formatLastActive = (dateString?: string) => {
  if (!dateString) return "Never logged in";

  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
};

export default function PersonalInfo() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Consolidated form state with ALL old and new fields merged
  const [formData, setFormData] = useState({
    fullName: "",
    headline: "", // NEW
    location: "", // NEW
    preferredLanguage: "", // NEW
    bio: "",
    portfolioUrl: "", // NEW
    githubUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    facebookUrl: "",
    isPublicProfile: true, // NEW
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Initial Data Load
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await UserService.getProfile();
        setProfile(data);

        // Populate the editable inputs with merged data
        setFormData({
          fullName: data.fullName || "",
          headline: data.headline || "", // NEW
          location: data.location || "", // NEW
          preferredLanguage: data.preferredLanguage || "", // NEW
          bio: data.bio || "",
          portfolioUrl: data.portfolioUrl || "", // NEW
          githubUrl: data.githubUrl || "",
          linkedinUrl: data.linkedinUrl || "",
          twitterUrl: data.twitterUrl || "",
          instagramUrl: data.instagramUrl || "",
          facebookUrl: data.facebookUrl || "",
          isPublicProfile: data.isPublicProfile ?? true, // NEW
        });
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

  // Handle input changes globally (Updated to support checkboxes)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [id]: val });
  };

  // Check if any fields have actually been changed by the user
  const hasChanges =
    formData.fullName !== (profile?.fullName || "") ||
    formData.headline !== (profile?.headline || "") ||
    formData.location !== (profile?.location || "") ||
    formData.preferredLanguage !== (profile?.preferredLanguage || "") ||
    formData.bio !== (profile?.bio || "") ||
    formData.portfolioUrl !== (profile?.portfolioUrl || "") ||
    formData.githubUrl !== (profile?.githubUrl || "") ||
    formData.linkedinUrl !== (profile?.linkedinUrl || "") ||
    formData.twitterUrl !== (profile?.twitterUrl || "") ||
    formData.instagramUrl !== (profile?.instagramUrl || "") ||
    formData.facebookUrl !== (profile?.facebookUrl || "") ||
    formData.isPublicProfile !== (profile?.isPublicProfile ?? true);

  // Handle the Form Submission
  const handleSaveChanges = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !hasChanges) return;

    setIsSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Send the PUT request to Spring Boot with the full form object
      const updatedProfile = await UserService.updateProfile(formData);

      setProfile(updatedProfile);
      setSuccessMsg("Profile updated successfully!");

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

  // 2. FATAL ERROR STATE
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
          Manage your basic profile details, bio, and social links.
        </p>
      </div>

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

      {/* Account Status & Real-Time Presence */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2 text-base font-semibold">
          <ShieldCheck className="h-4 w-4 text-zinc-500" />
          Account Status
        </Label>

        <div className="flex flex-wrap items-center gap-4">
          {/* Premium Badge */}
          {profile?.isPremium ? (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-500 text-sm font-medium border border-amber-200 dark:border-amber-500/20">
              <span>🌟</span> Premium Member
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 text-sm font-medium border border-zinc-200 dark:border-zinc-700">
              Standard User
            </div>
          )}

          {/* NEW: Online / Offline Presence Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 text-sm font-medium border border-zinc-200 dark:border-zinc-800 shadow-sm">
            {profile?.isOnline ? (
              <>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-zinc-700 dark:text-zinc-300">
                  Online Now
                </span>
              </>
            ) : (
              <>
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300 dark:bg-zinc-600"></span>
                <span className="text-zinc-500">
                  Active {formatLastActive(profile?.lastActiveAt)}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
        <form onSubmit={handleSaveChanges}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-brand" />
              Public Profile
            </CardTitle>
            <CardDescription>
              This information will be visible to others on the platform.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Identity Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* EDITABLE Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={isSaving}
                  required
                />
              </div>

              {/* NEW: EDITABLE Headline */}
              <div className="space-y-2">
                <Label htmlFor="headline" className="flex items-center gap-2">
                  <Briefcase className="h-3.5 w-3.5 text-zinc-500" />
                  Headline
                </Label>
                <Input
                  id="headline"
                  placeholder="e.g. Senior C++ Developer"
                  value={formData.headline}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>

              {/* NEW: READ-ONLY Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-zinc-500" />
                  Username
                </Label>
                <Input
                  id="username"
                  value={profile?.username || ""}
                  readOnly
                  className="bg-zinc-50 dark:bg-zinc-900/50 cursor-not-allowed text-zinc-500"
                  title="Username cannot be changed"
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

            {/* NEW: Demographics Grid */}
            <div className="grid gap-6 md:grid-cols-2 pt-2">
              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="e.g. Assam, India"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>

              {/* Preferred Language */}
              <div className="space-y-2">
                <Label
                  htmlFor="preferredLanguage"
                  className="flex items-center gap-2"
                >
                  <Globe className="h-3.5 w-3.5 text-zinc-500" />
                  Preferred Language
                </Label>
                <Input
                  id="preferredLanguage"
                  placeholder="e.g. English, Assamese"
                  value={formData.preferredLanguage}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>
            </div>

            {/* BIO Section */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-zinc-500" />
                Bio
              </Label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={isSaving}
                placeholder="Tell us a little bit about yourself..."
                className="flex min-h-[100px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400"
              />
              <p className="text-xs text-zinc-500">
                Brief description for your profile. URLs are hyperlinked.
              </p>
            </div>

            {/* SOCIAL LINKS Section */}
            <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <Label className="text-base font-semibold">Links & Social</Label>

              {/* NEW: Portfolio */}
              <div className="flex items-center gap-3">
                <FaLink className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                <Input
                  id="portfolioUrl"
                  placeholder="https://yourportfolio.com"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>

              {/* GitHub */}
              <div className="flex items-center gap-3">
                <FaGithub className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                <Input
                  id="githubUrl"
                  placeholder="https://github.com/username"
                  value={formData.githubUrl}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>

              {/* LinkedIn */}
              <div className="flex items-center gap-3">
                <FaLinkedin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <Input
                  id="linkedinUrl"
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>

              {/* Twitter */}
              <div className="flex items-center gap-3">
                <FaTwitter className="h-5 w-5 text-sky-500 dark:text-sky-400" />
                <Input
                  id="twitterUrl"
                  placeholder="https://twitter.com/username"
                  value={formData.twitterUrl}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>

              {/* Instagram */}
              <div className="flex items-center gap-3">
                <FaInstagram className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                <Input
                  id="instagramUrl"
                  placeholder="https://instagram.com/username"
                  value={formData.instagramUrl}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>

              {/* Facebook */}
              <div className="flex items-center gap-3">
                <FaFacebook className="h-5 w-5 text-blue-700 dark:text-blue-500" />
                <Input
                  id="facebookUrl"
                  placeholder="https://facebook.com/username"
                  value={formData.facebookUrl}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>
            </div>

            {/* Settings & Status Section */}
            <div className="space-y-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              {/* NEW: Public Profile Toggle */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label
                    htmlFor="isPublicProfile"
                    className="flex items-center gap-2 text-base font-semibold"
                  >
                    <Eye className="h-4 w-4 text-zinc-500" />
                    Profile Visibility
                  </Label>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Allow other users to see your public profile and
                    achievements.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPublicProfile"
                    checked={formData.isPublicProfile}
                    onChange={handleChange}
                    disabled={isSaving}
                    className="h-5 w-5 rounded border-zinc-300 text-brand focus:ring-brand"
                  />
                  <span className="text-sm font-medium">Public</span>
                </div>
              </div>

              {/* Account Status Badge */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-base font-semibold">
                  <ShieldCheck className="h-4 w-4 text-zinc-500" />
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
            </div>
          </CardContent>

          <CardFooter className="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-100 dark:border-zinc-800 py-4">
            <Button
              type="submit"
              disabled={isSaving || !hasChanges}
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
