import {
  CreditCard,
  Download,
  ArrowUpRight,
  Landmark,
  Receipt,
  History,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  //   CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Payouts() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. SERVICE HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-600 rounded-md">
            <CreditCard className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Billing & Payouts
            </h1>
            <p className="text-sm text-zinc-500">
              Manage your revenue, download tax invoices, and configure your
              bank details.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Receipt className="mr-2 h-4 w-4" /> Tax Documents
          </Button>
          <Button className="bg-[#ff9900] hover:bg-[#ec8b00] text-white font-bold">
            Request Early Payout
          </Button>
        </div>
      </div>

      {/* 2. FINANCIAL SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20 dark:border-emerald-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-800 dark:text-emerald-500">
              Available for Payout
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
              ₹42,500.00
            </div>
            <p className="text-xs text-emerald-600 mt-1">
              Clears on April 15, 2026
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Pending Clearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹12,400.00</div>
            <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
              <History className="h-3 w-3" /> Subject to 7-day refund policy
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Lifetime Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹3,42,800.00</div>
            <p className="text-xs text-green-600 flex items-center mt-1 font-medium">
              <ArrowUpRight className="h-3 w-3 mr-1" /> Lifetime total
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3. TRANSACTION LEDGER (Main Area) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold">Recent Transactions</h3>
          <div className="rounded-xl border bg-white dark:bg-zinc-950 shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Gross</TableHead>
                  <TableHead>Fee (20%)</TableHead>
                  <TableHead className="text-right">Net Earnings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Sale Row */}
                <TableRow>
                  <TableCell className="text-sm text-zinc-500">
                    Apr 10, 2026
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">Advanced Python Course</p>
                    <p className="text-xs text-zinc-500 font-mono">
                      txn_982x12
                    </p>
                  </TableCell>
                  <TableCell className="text-sm">₹4,500.00</TableCell>
                  <TableCell className="text-sm text-red-500">
                    -₹900.00
                  </TableCell>
                  <TableCell className="text-right font-bold text-emerald-600">
                    ₹3,600.00
                  </TableCell>
                </TableRow>

                {/* Sale Row */}
                <TableRow>
                  <TableCell className="text-sm text-zinc-500">
                    Apr 09, 2026
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">React Masterclass</p>
                    <p className="text-xs text-zinc-500 font-mono">
                      txn_771x09
                    </p>
                  </TableCell>
                  <TableCell className="text-sm">₹3,200.00</TableCell>
                  <TableCell className="text-sm text-red-500">
                    -₹640.00
                  </TableCell>
                  <TableCell className="text-right font-bold text-emerald-600">
                    ₹2,560.00
                  </TableCell>
                </TableRow>

                {/* Refund Row */}
                <TableRow className="bg-red-50/50 dark:bg-red-950/10">
                  <TableCell className="text-sm text-zinc-500">
                    Apr 08, 2026
                  </TableCell>
                  <TableCell>
                    <p className="font-medium flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" /> Refund:
                      Java Basics
                    </p>
                    <p className="text-xs text-zinc-500 font-mono">
                      txn_441p01
                    </p>
                  </TableCell>
                  <TableCell className="text-sm text-zinc-400 line-through">
                    ₹1,500.00
                  </TableCell>
                  <TableCell className="text-sm text-zinc-400 line-through">
                    -₹300.00
                  </TableCell>
                  <TableCell className="text-right font-bold text-red-500">
                    -₹1,200.00
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="p-4 border-t bg-zinc-50 dark:bg-zinc-900/50 text-center">
              <Button variant="link" size="sm" className="text-zinc-500">
                View All Transactions
              </Button>
            </div>
          </div>
        </div>

        {/* 4. BANK & PAYOUT SETTINGS (Sidebar) */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Landmark className="h-5 w-5 text-zinc-500" /> Withdrawal
                Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg bg-zinc-50 dark:bg-zinc-900/50 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold">State Bank of India</span>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-600 border-green-200"
                  >
                    Verified
                  </Badge>
                </div>
                <span className="text-sm text-zinc-500 font-mono">
                  •••• •••• •••• 4021
                </span>
                <span className="text-xs text-zinc-400 mt-2">
                  Himanko Boruah
                </span>
              </div>
              <Button variant="outline" className="w-full">
                Update Bank Details
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <History className="h-5 w-5 text-zinc-500" /> Recent Payouts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Mar 01, 2026
                  </p>
                  <p className="text-xs text-zinc-500">Processed to SBI</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold">₹84,200</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between border-b pb-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Feb 01, 2026
                  </p>
                  <p className="text-xs text-zinc-500">Processed to SBI</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold">₹62,100</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
