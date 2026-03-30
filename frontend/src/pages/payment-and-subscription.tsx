import {
  CreditCard,
  Download,
  CheckCircle2,
  Zap,
  Plus,
  FileText,
  ShieldCheck,
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

export default function PaymentAndSubscription() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Subscription & Billing
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Manage your plan, payment methods, and download past invoices.
        </p>
      </div>

      {/* ZONE 1: CURRENT PLAN & UPSELL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Plan Card */}
        <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">Current Plan</CardTitle>
                <CardDescription>
                  You are currently on the free tier.
                </CardDescription>
              </div>
              <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                Freemium
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div className="flex items-baseline gap-1 text-3xl font-bold text-zinc-900 dark:text-white">
              $0
              <span className="text-sm font-normal text-zinc-500">/month</span>
            </div>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-zinc-400" /> Free YouTube
                Content
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-zinc-400" /> Basic Backend
                Notes
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-zinc-400" /> Community
                Access
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>
              Current Plan
            </Button>
          </CardFooter>
        </Card>

        {/* Premium Upsell Card */}
        <Card className="relative overflow-hidden border-brand/20 bg-brand/5 dark:bg-brand/10 flex flex-col">
          {/* Subtle gradient background decoration */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-brand/20 blur-2xl"></div>

          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-4 w-4 text-brand fill-brand" />
                  Mastery Pro
                </CardTitle>
                <CardDescription className="text-brand/80 dark:text-brand/70">
                  Unlock the complete engineering curriculum.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div className="flex items-baseline gap-1 text-3xl font-bold text-zinc-900 dark:text-white">
              $29
              <span className="text-sm font-normal text-zinc-500">/month</span>
            </div>
            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-4 w-4 text-brand" /> Advanced C++ &
                Java Architecture
              </li>
              <li className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-4 w-4 text-brand" /> Full Source
                Code: Banking App Prototype
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand" /> 1-on-1 Code
                Reviews
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand" /> Official
                Completion Certificates
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-brand hover:bg-brand/90 text-white">
              Upgrade to Pro
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* ZONE 2: PAYMENT METHODS */}
      <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-lg">Payment Methods</CardTitle>
          <CardDescription>
            Securely add or remove your payment details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Mocked Saved Card */}
          <div className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
            <div className="flex items-center gap-4">
              <div className="h-10 w-14 bg-zinc-200 dark:bg-zinc-800 rounded flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-zinc-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">
                  Visa ending in 4242
                </p>
                <p className="text-xs text-zinc-500">Expires 12/2028</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                Default
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              >
                Edit
              </Button>
            </div>
          </div>

          <Button variant="outline" className="w-full border-dashed">
            <Plus className="mr-2 h-4 w-4" /> Add Payment Method
          </Button>

          <div className="flex items-center gap-2 text-xs text-zinc-500 mt-4">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            Payments are securely processed by Stripe. We do not store your full
            card details.
          </div>
        </CardContent>
      </Card>

      {/* ZONE 3: BILLING HISTORY */}
      <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-lg">Billing History</CardTitle>
          <CardDescription>
            View and download your past invoices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="grid grid-cols-4 bg-zinc-50 dark:bg-zinc-900/50 p-3 text-xs font-medium text-zinc-500 uppercase tracking-wider">
              <div>Date</div>
              <div>Amount</div>
              <div>Status</div>
              <div className="text-right">Invoice</div>
            </div>

            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {/* Mock Invoice Row 1 */}
              <div className="grid grid-cols-4 items-center p-3 text-sm">
                <div className="text-zinc-900 dark:text-zinc-300">
                  Mar 01, 2026
                </div>
                <div className="text-zinc-900 dark:text-zinc-300">$0.00</div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400">
                    Paid
                  </span>
                </div>
                <div className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-500 hover:text-brand"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Mock Invoice Row 2 */}
              <div className="grid grid-cols-4 items-center p-3 text-sm">
                <div className="text-zinc-900 dark:text-zinc-300">
                  Feb 01, 2026
                </div>
                <div className="text-zinc-900 dark:text-zinc-300">$0.00</div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-400">
                    Paid
                  </span>
                </div>
                <div className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-500 hover:text-brand"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
