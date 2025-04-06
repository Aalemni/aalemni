"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users,
  BookOpen,
  Star,
  DollarSign,
  ChevronRight,
  TrendingUp,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const instructorName = "Hadi Rahhal";
  const stats = {
    totalStudents: 1248,
    totalCourses: 12,
    averageRating: 4.8,
    totalEarnings: {
      month: 3250,
      allTime: 42680,
    },
  };

  const courses = [
    {
      id: 1,
      title: "Advanced Web Development with React",
      thumbnail: "/placeholder.svg?height=80&width=120",
      students: 342,
      rating: 4.9,
      views30Days: 1240,
      enrollments30Days: 68,
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      thumbnail: "/placeholder.svg?height=80&width=120",
      students: 256,
      rating: 4.7,
      views30Days: 980,
      enrollments30Days: 42,
    },
    {
      id: 3,
      title: "Data Science for Beginners",
      thumbnail: "/placeholder.svg?height=80&width=120",
      students: 189,
      rating: 4.6,
      views30Days: 760,
      enrollments30Days: 31,
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      thumbnail: "/placeholder.svg?height=80&width=120",
      students: 215,
      rating: 4.8,
      views30Days: 890,
      enrollments30Days: 37,
    },
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: "Live Q&A: React Hooks Deep Dive",
      date: "Apr 10, 2025",
      time: "14:00 - 15:30",
      students: 78,
    },
    {
      id: 2,
      title: "Workshop: Building a Full-Stack App",
      date: "Apr 15, 2025",
      time: "10:00 - 12:00",
      students: 45,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header & Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {instructorName}!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Here's your latest stats and activities.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Session
          </Button>
          <Button>
            <BookOpen className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Students
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {stats.totalStudents}
                </h3>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +12% this month
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Courses
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {stats.totalCourses}
                </h3>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" /> +2 this month
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Average Rating
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {stats.averageRating}
                </h3>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < Math.floor(stats.averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Earnings
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  ${stats.totalEarnings.month}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  ${stats.totalEarnings.allTime} all-time
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="courses" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="courses">Course Performance</TabsTrigger>
          <TabsTrigger value="earnings">Earnings Summary</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
        </TabsList>

        {/* Course Performance Tab */}
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Course Performance Summary</CardTitle>
              <CardDescription>
                Overview of your courses and their performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        Course
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-500">
                        Students
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-500">
                        Rating
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-500">
                        30-Day Views
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-500">
                        30-Day Enrollments
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr
                        key={course.id}
                        className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <Image
                              src={course.thumbnail || "/placeholder.svg"}
                              alt={course.title}
                              width={60}
                              height={40}
                              className="rounded mr-3"
                            />
                            <span className="font-medium">{course.title}</span>
                          </div>
                        </td>
                        <td className="text-center py-4 px-4">
                          {course.students}
                        </td>
                        <td className="text-center py-4 px-4">
                          <div className="flex items-center justify-center">
                            <span className="mr-1">{course.rating}</span>
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          </div>
                        </td>
                        <td className="text-center py-4 px-4">
                          {course.views30Days}
                        </td>
                        <td className="text-center py-4 px-4">
                          {course.enrollments30Days}
                        </td>
                        <td className="text-center py-4 px-4">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/instructor/courses/${course.id}`}>
                              Go to Course
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-right">
                <Button variant="link" asChild>
                  <Link
                    href="/instructor/courses"
                    className="flex items-center"
                  >
                    View all courses <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Earnings Summary Tab */}
        <TabsContent value="earnings">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Summary & Payouts</CardTitle>
              <CardDescription>
                Overview of your earnings and upcoming payouts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-sm font-medium text-gray-500">
                      Total Earnings This Month
                    </h4>
                    <p className="text-3xl font-bold mt-2">
                      ${stats.totalEarnings.month}
                    </p>
                    <p className="text-sm text-green-600 mt-1 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" /> +18% from last
                      month
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-sm font-medium text-gray-500">
                      Next Payout Date
                    </h4>
                    <p className="text-3xl font-bold mt-2">Apr 15, 2025</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Estimated amount: $3,250
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 flex flex-col h-full justify-between">
                    <h4 className="text-sm font-medium text-gray-500">
                      Available for Withdrawal
                    </h4>
                    <p className="text-3xl font-bold mt-2">$2,850</p>
                    <Button className="mt-4">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Withdraw Earnings
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-4">Recent Transactions</h4>
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
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="py-4 px-4">Mar 15, 2025</td>
                        <td className="py-4 px-4">Monthly Payout</td>
                        <td className="py-4 px-4 text-right">$2,980</td>
                        <td className="py-4 px-4 text-right">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="py-4 px-4">Feb 15, 2025</td>
                        <td className="py-4 px-4">Monthly Payout</td>
                        <td className="py-4 px-4 text-right">$2,540</td>
                        <td className="py-4 px-4 text-right">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Completed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-right">
                  <Button variant="link" asChild>
                    <Link
                      href="/instructor/earnings"
                      className="flex items-center"
                    >
                      View all transactions{" "}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upcoming Sessions Tab */}
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>
                Your scheduled live sessions and workshops
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <Card key={session.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div>
                            <h4 className="font-medium">{session.title}</h4>
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-2" />
                              {session.date} • {session.time}
                            </div>
                            <div className="mt-2 text-sm text-gray-500">
                              <Users className="h-4 w-4 inline mr-2" />
                              {session.students} students enrolled
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0 flex space-x-3">
                            <Button variant="outline" size="sm">
                              Edit Session
                            </Button>
                            <Button size="sm">Start Session</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium">
                    No upcoming sessions
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Schedule a new session to engage with your students
                  </p>
                  <Button className="mt-4">Schedule Session</Button>
                </div>
              )}
              <div className="mt-4 text-right">
                <Button variant="link" asChild>
                  <Link href="/calendar" className="flex items-center">
                    View full calendar <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Subscription Information */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Subscription Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-2">
                Professional Plan
              </div>
              <h4 className="text-lg font-medium">
                Your subscription renews on May 10, 2025
              </h4>
              <p className="text-gray-500 mt-1">
                You're currently on the Professional plan with unlimited courses
                and priority support.
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button variant="outline">Change Plan</Button>
              <Button variant="destructive">Cancel Subscription</Button>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium mb-2">Plan Features</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              <li className="flex items-center text-sm">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <svg
                    className="h-3 w-3 text-green-600"
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
                </div>
                Unlimited courses
              </li>
              <li className="flex items-center text-sm">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <svg
                    className="h-3 w-3 text-green-600"
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
                </div>
                Priority support
              </li>
              <li className="flex items-center text-sm">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <svg
                    className="h-3 w-3 text-green-600"
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
                </div>
                Advanced analytics
              </li>
              <li className="flex items-center text-sm">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <svg
                    className="h-3 w-3 text-green-600"
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
                </div>
                Custom branding
              </li>
              <li className="flex items-center text-sm">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <svg
                    className="h-3 w-3 text-green-600"
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
                </div>
                Reduced platform fees (12%)
              </li>
              <li className="flex items-center text-sm">
                <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <svg
                    className="h-3 w-3 text-green-600"
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
                </div>
                Dedicated account manager
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
