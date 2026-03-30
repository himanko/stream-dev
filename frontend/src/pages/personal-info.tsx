import { Camera, Globe } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have added this via shadcn
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PersonalInfo() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Personal Information
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Manage your personal details and how you appear to the community.
        </p>
      </div>

      <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-lg">Profile Picture</CardTitle>
          <CardDescription>
            This will be displayed on your profile and certificates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            {/* Premium Avatar Upload Area */}
            <div className="relative group cursor-pointer">
              <div className="h-24 w-24 rounded-full bg-brand/10 border-2 border-dashed border-brand/30 flex items-center justify-center text-3xl font-bold text-brand uppercase overflow-hidden transition-all group-hover:border-brand">
                HB
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex gap-3">
                <Button variant="secondary" size="sm">
                  Upload new image
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  Remove
                </Button>
              </div>
              <p className="text-xs text-zinc-500">
                Recommended: Square JPG, PNG, or GIF, at least 400x400 pixels.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-lg">Basic Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">Full Name</Label>
              <Input id="firstName" defaultValue="Himanko Boruah" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                defaultValue="himanko@example.com"
                disabled
                className="bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500"
              />
              <p className="text-xs text-zinc-500">
                Contact support to change your email.
              </p>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Student Bio</Label>
              <Textarea
                id="bio"
                placeholder="Tell us a little about your coding journey..."
                defaultValue="Aspiring software engineer currently focusing on mastering Java and C++."
                className="resize-none h-24"
              />
              <p className="text-xs text-zinc-500 text-right">
                0 / 160 characters
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-lg">Social Links</CardTitle>
          <CardDescription>
            Add your developer profiles to build your network.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="github" className="flex items-center gap-2">
              <FaGithub className="h-4 w-4" /> GitHub URL
            </Label>
            <Input id="github" placeholder="https://github.com/yourusername" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin" className="flex items-center gap-2">
              <FaLinkedin className="h-4 w-4" /> LinkedIn URL
            </Label>
            <Input
              id="linkedin"
              placeholder="https://linkedin.com/in/yourusername"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website" className="flex items-center gap-2">
              <Globe className="h-4 w-4" /> Personal Portfolio
            </Label>
            <Input id="website" placeholder="https://yourwebsite.com" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t border-zinc-200 dark:border-zinc-800 pt-6 mt-6">
          <Button className="bg-brand hover:bg-brand/90 text-white px-8">
            Save All Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
