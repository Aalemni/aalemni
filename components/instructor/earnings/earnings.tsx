"use client";

import { useState } from "react";
import Link from "next/link";
import { DollarSign, Download, Calendar, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function InstructorEarnings() {
  const [activeTab, setActiveTab] = useState("overview");
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(2850);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [timeFilter, setTimeFilter] = useState("all-time");

  // Mock data - would come from API in production
  const earningsData = {
    available: 2850,
    pending: 1250,
    thisMonth: 3250,
    lastMonth: 2980,
    allTime: 42680,
    nextPayout: "2025-04-15",
    transactions: [
      {
        id: 1,
        date: "2025-03-15",
        description: "Monthly Payout",
        amount: 2980,
        status: "completed",
        courses: [
          { id: 1, title: "Advanced Web Development with React", amount: 1450 },
          { id: 2, title: "Machine Learning Fundamentals", amount: 980 },
          { id: 3, title: "Data Science for Beginners", amount: 550 },
        ],
      },
      {
        id: 2,
        date: "2025-02-15",
        description: "Monthly Payout",
        amount: 2540,
        status: "completed",
        courses: [
          { id: 1, title: "Advanced Web Development with React", amount: 1250 },
          { id: 2, title: "Machine Learning Fundamentals", amount: 850 },
          { id: 4, title: "UI/UX Design Principles", amount: 440 },
        ],
      },
      {
        id: 3,
        date: "2025-01-15",
        description: "Monthly Payout",
        amount: 2180,
        status: "completed",
        courses: [
          { id: 1, title: "Advanced Web Development with React", amount: 1080 },
          { id: 2, title: "Machine Learning Fundamentals", amount: 720 },
          { id: 3, title: "Data Science for Beginners", amount: 380 },
        ],
      },
      {
        id: 4,
        date: "2025-04-15",
        description: "Upcoming Payout",
        amount: 3250,
        status: "pending",
        courses: [
          { id: 1, title: "Advanced Web Development with React", amount: 1580 },
          { id: 2, title: "Machine Learning Fundamentals", amount: 1050 },
          { id: 3, title: "Data Science for Beginners", amount: 620 },
        ],
      },
    ],
    courseEarnings: [
      {
        id: 1,
        title: "Advanced Web Development with React",
        amount: 18750,
        students: 342,
      },
      {
        id: 2,
        title: "Machine Learning Fundamentals",
        amount: 14280,
        students: 256,
      },
      {
        id: 3,
        title: "Data Science for Beginners",
        amount: 5850,
        students: 189,
      },
      { id: 4, title: "UI/UX Design Principles", amount: 3800, students: 215 },
    ],
    monthlyEarnings: [
      { month: "Jan 2025", amount: 2180 },
      { month: "Feb 2025", amount: 2540 },
      { month: "Mar 2025", amount: 2980 },
      { month: "Apr 2025", amount: 3250 },
    ],
  };

  const filteredTransactions = earningsData.transactions.filter(
    (transaction) => {
      if (timeFilter === "all-time") return true;

      const transactionDate = new Date(transaction.date);
      const now = new Date();

      switch (timeFilter) {
        case "this-month":
          return (
            transactionDate.getMonth() === now.getMonth() &&
            transactionDate.getFullYear() === now.getFullYear()
          );
        case "last-month":
          const lastMonth = new Date(now);
          lastMonth.setMonth(now.getMonth() - 1);
          return (
            transactionDate.getMonth() === lastMonth.getMonth() &&
            transactionDate.getFullYear() === lastMonth.getFullYear()
          );
        case "last-3-months":
          const threeMonthsAgo = new Date(now);
          threeMonthsAgo.setMonth(now.getMonth() - 3);
          return transactionDate >= threeMonthsAgo;
        case "this-year":
          return transactionDate.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    }
  );

  const handleWithdraw = () => {
    // In a real app, this would call an API to process the withdrawal
    console.log(`Withdrawing $${withdrawAmount} via ${paymentMethod}`);
    setWithdrawDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Earnings & Payouts
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage your earnings, payouts, and subscription
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Tax Report
          </Button>
        </div>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Available for Withdrawal</h3>
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold">
              ${earningsData.available.toLocaleString()}
            </p>
            <Button
              className="w-full mt-4"
              onClick={() => setWithdrawDialogOpen(true)}
            >
              Withdraw Earnings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Pending Earnings</h3>
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold">
              ${earningsData.pending.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Next payout on{" "}
              {new Date(earningsData.nextPayout).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Total Earnings</h3>
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">
              ${earningsData.allTime.toLocaleString()}
            </p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-sm font-medium">
                ${earningsData.thisMonth.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="text-sm text-gray-500">Last Month</p>
              <p className="text-sm font-medium">
                ${earningsData.lastMonth.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="transactions" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger
            value="transactions"
            onClick={() => setActiveTab("transactions")}
          >
            Transactions & Payouts
          </TabsTrigger>
          <TabsTrigger
            value="breakdown"
            onClick={() => setActiveTab("breakdown")}
          >
            Earnings Breakdown
          </TabsTrigger>
          <TabsTrigger
            value="subscription"
            onClick={() => setActiveTab("subscription")}
          >
            Subscription
          </TabsTrigger>
        </TabsList>

        {/* Transactions & Payouts Tab */}
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Transaction History</CardTitle>
                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-time">All Time</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>
                View your transaction history and upcoming payouts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        Description
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">
                        Amount
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">
                        Status
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="py-4 px-4">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">{transaction.description}</td>
                        <td className="py-4 px-4 text-right">
                          ${transaction.amount.toLocaleString()}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Badge
                            variant={
                              transaction.status === "completed"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {transaction.status === "completed"
                              ? "Completed"
                              : "Pending"}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Invoice
                          </Button>
                        </td>
                      </tr>
                    ))}

                    {filteredTransactions.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-8 text-center text-gray-500"
                        >
                          No transactions found for the selected time period.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Earnings Breakdown Tab */}
        <TabsContent value="breakdown">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Earnings by Course</CardTitle>
                <CardDescription>
                  Breakdown of earnings per course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {earningsData.courseEarnings.map((course) => (
                    <div key={course.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{course.title}</h4>
                        <span className="text-lg font-bold">
                          ${course.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{course.students} students enrolled</span>
                        <span className="mx-2">•</span>
                        <span>
                          ${Math.round(course.amount / course.students)} per
                          student avg.
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Earnings</CardTitle>
                <CardDescription>Earnings trend by month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {earningsData.monthlyEarnings.map((month, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-24 text-sm">{month.month}</div>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-orange-500 h-2.5 rounded-full"
                            style={{
                              width: `${(month.amount / Math.max(...earningsData.monthlyEarnings.map((m) => m.amount))) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-24 text-right font-medium">
                        ${month.amount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-4">Earnings Growth</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Month-over-Month</p>
                      <p className="text-lg font-medium text-green-600">
                        +9.1%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        Quarter-over-Quarter
                      </p>
                      <p className="text-lg font-medium text-green-600">
                        +24.3%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Year-over-Year</p>
                      <p className="text-lg font-medium text-green-600">
                        +156.8%
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Share & Platform Fees</CardTitle>
              <CardDescription>
                Breakdown of platform fees and your revenue share
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Gross Revenue</h4>
                  <p className="text-2xl font-bold">
                    ${(earningsData.allTime * 1.15).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Total revenue before platform fees
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Platform Fees</h4>
                  <p className="text-2xl font-bold">
                    ${(earningsData.allTime * 0.15).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    15% of gross revenue
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Your Earnings</h4>
                  <p className="text-2xl font-bold">
                    ${earningsData.allTime.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    85% of gross revenue
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    <svg
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">
                      Pro Tip: Reduce Your Platform Fees
                    </h4>
                    <p className="mt-1 text-sm">
                      Upgrade to our Professional or Enterprise subscription
                      plans to reduce your platform fees to as low as 10%. This
                      could save you thousands of dollars annually as your
                      course sales grow.
                    </p>
                    <Button variant="link" className="mt-2 p-0 h-auto" asChild>
                      <Link href="/instructor/subscription">
                        View Subscription Plans
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Current Subscription</CardTitle>
              <CardDescription>
                Manage your instructor subscription plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border rounded-lg mb-6">
                <div>
                  <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-2">
                    Professional Plan
                  </div>
                  <h4 className="text-lg font-medium">
                    Your subscription renews on May 10, 2025
                  </h4>
                  <p className="text-gray-500 mt-1">
                    You're currently on the Professional plan with unlimited
                    courses and reduced platform fees.
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                  <Button variant="outline">Change Plan</Button>
                  <Button variant="destructive">Cancel Subscription</Button>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-4">Subscription Details</h4>
                <div className="space-y-4">
                  <div className="flex justify-between p-4 border rounded-lg">
                    <div>
                      <h5 className="font-medium">Billing Cycle</h5>
                      <p className="text-sm text-gray-500 mt-1">
                        Annual (Save 20%)
                      </p>
                    </div>
                    <div className="text-right">
                      <h5 className="font-medium">Next Payment</h5>
                      <p className="text-sm text-gray-500 mt-1">May 10, 2025</p>
                    </div>
                  </div>

                  <div className="flex justify-between p-4 border rounded-lg">
                    <div>
                      <h5 className="font-medium">Platform Fee</h5>
                      <p className="text-sm text-gray-500 mt-1">
                        Reduced rate for Professional plan
                      </p>
                    </div>
                    <div className="text-right">
                      <h5 className="font-medium">15%</h5>
                      <p className="text-sm text-gray-500 mt-1">
                        Standard rate: 25%
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between p-4 border rounded-lg">
                    <div>
                      <h5 className="font-medium">Payment Method</h5>
                      <p className="text-sm text-gray-500 mt-1">
                        Visa ending in 4242
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Update
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Available Plans</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 border rounded-lg">
                    <h5 className="font-medium">Basic</h5>
                    <p className="text-2xl font-bold mt-2">
                      $0
                      <span className="text-sm font-normal text-gray-500">
                        /month
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      25% platform fee
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-sm">
                        <svg
                          className="h-5 w-5 text-green-600 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Up to 3 courses
                      </li>
                      <li className="flex items-center text-sm">
                        <svg
                          className="h-5 w-5 text-green-600 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Basic analytics
                      </li>
                      <li className="flex items-center text-sm">
                        <svg
                          className="h-5 w-5 text-green-600 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Standard support
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full mt-6">
                      Downgrade
                    </Button>
                  </div>

                  <div className="p-6 border-2 border-blue-600 rounded-lg relative">
                    <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg">
                      CURRENT
                    </div>
                    <h5 className="font-medium">Professional</h5>
                    <p className="text-2xl font-bold mt-2">
                      $39
                      <span className="text-sm font-normal text-gray-500">
                        /month
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      15% platform fee
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-sm">
                        <svg
                          className="h-5 w-5 text-green-600 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Unlimited courses
                      </li>
                      <li className="flex items-center text-sm">
                        <svg
                          className="h-5 w-5 text-green-600 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Advanced analytics
                      </li>
                      <li className="flex items-center text-sm">
                        <svg
                          className="h-5 w-5 text-green-600 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Priority support
                      </li>
                      <li className="flex items-center text-sm">
                        <svg
                          className="h-5 w-5 text-green-600 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Custom branding
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 border rounded-lg">
                    <h5 className="font-medium">Enterprise</h5>
                    <p className="text-2xl font-bold mt-2">
                      $99
                      <span className="text-sm font-normal text-gray-500">
                        /month
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      10% platform fee
                    </p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-sm">
                        <svg
                          className="h-5 w-5 text-green-600 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Everything in Professional
                      </li>
                      <li className="flex items-center text-sm">
                        <svg
                          className="h-5 w-5 text-green-600 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Lowest platform fee (10%)
                      </li>
                      <li className="flex items-center text-sm">
                        <svg
                          className="h-5 w-5 text-green-600 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Dedicated account manager
                      </li>
                      <li className="flex items-center text-sm">
                        <svg
                          className="h-5 w-5 text-green-600 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        API access
                      </li>
                    </ul>
                    <Button className="w-full mt-6">Upgrade</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Withdraw Dialog */}
      <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw Earnings</DialogTitle>
            <DialogDescription>
              Withdraw your available earnings to your preferred payment method.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Withdrawal Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  max={earningsData.available}
                  className="pl-10 pr-4 py-2 w-full border rounded-md"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Available: ${earningsData.available.toLocaleString()}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="bank">Bank Transfer</option>
                <option value="paypal">PayPal</option>
                <option value="stripe">Stripe</option>
              </select>
            </div>

            {paymentMethod === "bank" && (
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium">Bank Account Details</p>
                <p className="text-sm text-gray-500 mt-1">Ending in ****6789</p>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium">PayPal Account</p>
                <p className="text-sm text-gray-500 mt-1">example@email.com</p>
              </div>
            )}

            {paymentMethod === "stripe" && (
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium">Stripe Account</p>
                <p className="text-sm text-gray-500 mt-1">
                  Connected to your Stripe account
                </p>
              </div>
            )}

            <div className="p-3 bg-blue-50 rounded-md">
              <p className="text-sm">
                <span className="font-medium">Note:</span> Withdrawals typically
                take 3-5 business days to process.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setWithdrawDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleWithdraw}>Confirm Withdrawal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
