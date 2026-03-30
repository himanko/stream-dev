import {
  Key,
  Smartphone,
  Laptop,
  ShieldCheck,
  AlertTriangle,
  LogOut,
} from "lucide-react";
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

export default function SecurityAndSignIn() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Security & Sign-in
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Keep your account secure and manage your authenticated devices.
        </p>
      </div>

      {/* CHANGE PASSWORD */}
      <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Key className="h-5 w-5 text-brand" /> Password
          </CardTitle>
          <CardDescription>
            Change your password to maintain account security.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 max-w-md">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-lg p-4 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            <p className="font-medium text-zinc-900 dark:text-zinc-300 mb-2">
              Password Requirements:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Minimum 8 characters long</li>
              <li>At least one uppercase and one lowercase letter</li>
              <li>At least one number or special character</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Update Password</Button>
        </CardFooter>
      </Card>

      {/* TWO FACTOR AUTHENTICATION */}
      <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-500" /> Two-Step
                Verification
              </CardTitle>
              <CardDescription>
                Add an extra layer of security to your account.
              </CardDescription>
            </div>
            <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              Off
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl mb-6">
            Two-step verification protects your account by requiring a code from
            your authenticator app in addition to your password when signing in.
          </p>
          <Button variant="outline">Set up Authenticator App</Button>
        </CardContent>
      </Card>

      {/* ACTIVE SESSIONS */}
      <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-lg">Where You're Logged In</CardTitle>
          <CardDescription>
            We'll alert you if we notice any unusual activity.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Device */}
          <div className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center">
                <Laptop className="h-5 w-5 text-brand" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white flex items-center gap-2">
                  Windows • Chrome
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Active Now
                  </span>
                </p>
                <p className="text-xs text-zinc-500">
                  Guwahati, Assam, India • 192.168.1.1
                </p>
              </div>
            </div>
          </div>

          {/* Other Device */}
          <div className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-zinc-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">
                  iPhone 14 Pro • Safari
                </p>
                <p className="text-xs text-zinc-500">
                  Guwahati, Assam, India • Last active: 2 hours ago
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            >
              Log out
            </Button>
          </div>

          <Button variant="link" className="text-brand px-0">
            Log out of all other sessions
          </Button>
        </CardContent>
      </Card>

      {/* DANGER ZONE */}
      <Card className="border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/10">
        <CardHeader>
          <CardTitle className="text-lg text-red-600 dark:text-red-500 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" /> Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl mb-4">
            Permanently delete your account and all of your content. This action
            is not reversible, so please continue with caution.
          </p>
          <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
