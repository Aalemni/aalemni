"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  Search,
  Filter,
  CreditCard,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for purchase history
const purchaseHistoryData = [
  {
    id: "INV-2025-001",
    courseName: "Advanced JavaScript Programming",
    amount: 89.99,
    date: "2025-03-20",
    status: "completed",
  },
  {
    id: "INV-2025-002",
    courseName: "Financial Planning and Investment",
    amount: 129.99,
    date: "2025-02-15",
    status: "completed",
  },
  {
    id: "INV-2025-003",
    courseName: "Graphic Design Masterclass",
    amount: 74.99,
    date: "2025-01-10",
    status: "completed",
  },
  {
    id: "INV-2024-004",
    courseName: "Machine Learning Fundamentals",
    amount: 149.99,
    date: "2024-12-05",
    status: "refunded",
  },
];

// Mock data for subscriptions
const subscriptionsData = [
  {
    id: 1,
    plan: "Premium Learning Plan",
    price: 19.99,
    billingCycle: "monthly",
    nextBillingDate: "2025-05-06",
    status: "active",
  },
];

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("history");
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<
    number | null
  >(null);

  // Filter purchase history based on search query
  const filteredPurchases = purchaseHistoryData.filter(
    (purchase) =>
      purchase.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      purchase.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCancelSubscription = (subscriptionId: number) => {
    setSelectedSubscription(subscriptionId);
    setCancelDialogOpen(true);
  };

  const confirmCancelSubscription = () => {
    // In a real app, this would call an API to cancel the subscription
    console.log(`Cancelled subscription ${selectedSubscription}`);
    setCancelDialogOpen(false);
    // Here you would typically update the UI to reflect the change
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Payments & Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage your payments and subscription plans
          </p>
        </div>
      </div>

      <Tabs
        defaultValue="history"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-8">
          <TabsTrigger value="history">Purchase History</TabsTrigger>
          <TabsTrigger value="subscriptions">Active Subscriptions</TabsTrigger>
        </TabsList>

        {/* Purchase History Tab */}
        <TabsContent value="history">
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by course name or invoice ID..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPurchases.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <p className="text-muted-foreground">
                          {searchQuery
                            ? "No purchases found"
                            : "No purchase history yet"}
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPurchases.map((purchase) => (
                      <TableRow key={purchase.id}>
                        <TableCell className="font-medium">
                          {purchase.id}
                        </TableCell>
                        <TableCell>{purchase.courseName}</TableCell>
                        <TableCell>${purchase.amount.toFixed(2)}</TableCell>
                        <TableCell>{formatDate(purchase.date)}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              purchase.status === "completed"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-red-100 text-red-800 border-red-200"
                            }
                          >
                            {purchase.status === "completed"
                              ? "Completed"
                              : "Refunded"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" asChild>
                              <a
                                href={`/api/invoices/${purchase.id}/download`}
                                download
                              >
                                <Download className="h-4 w-4" />
                              </a>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/courses/${purchase.id}`}>View</Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions">
          {subscriptionsData.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">
                No active subscriptions
              </h3>
              <p className="text-muted-foreground mb-6">
                = You don't have any active subscription plans
              </p>
              <Button asChild>
                <Link href="/plans">Browse Subscription Plans</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subscriptionsData.map((subscription) => (
                <Card key={subscription.id}>
                  <CardHeader>
                    <CardTitle>{subscription.plan}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Price</span>
                      <span className="text-xl font-bold">
                        ${subscription.price}/
                        {subscription.billingCycle === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Next Billing Date
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        {formatDate(subscription.nextBillingDate)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Status</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Active
                      </Badge>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() =>
                          handleCancelSubscription(subscription.id)
                        }
                      >
                        Cancel Subscription
                      </Button>
                      <Button className="flex-1" asChild>
                        <Link href="/plans">Change Plan</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Cancel Subscription Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Cancellation</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your subscription? You will lose
              access to premium features at the end of your current billing
              period.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center p-4 bg-amber-50 text-amber-800 rounded-md">
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p className="text-sm">
              Your subscription will remain active until the end of the current
              billing period.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCancelDialogOpen(false)}
            >
              Keep Subscription
            </Button>
            <Button variant="destructive" onClick={confirmCancelSubscription}>
              Yes, Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
