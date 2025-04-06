"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Download,
  Mail,
  Users,
  BookOpen,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function InstructorStudents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [progressFilter, setProgressFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Mock data - would come from API in production
  const students = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      enrolledCourses: 2,
      progress: 75,
      lastActive: "2025-04-04",
      courses: [
        { id: 1, title: "Advanced Web Development with React", progress: 75 },
        { id: 3, title: "Data Science for Beginners", progress: 30 },
      ],
    },
    {
      id: 2,
      name: "Emily Johnson",
      email: "emily.j@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      enrolledCourses: 3,
      progress: 100,
      lastActive: "2025-03-28",
      courses: [
        { id: 1, title: "Advanced Web Development with React", progress: 100 },
        { id: 2, title: "Machine Learning Fundamentals", progress: 100 },
        { id: 4, title: "UI/UX Design Principles", progress: 100 },
      ],
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.b@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      enrolledCourses: 1,
      progress: 45,
      lastActive: "2025-04-02",
      courses: [
        { id: 2, title: "Machine Learning Fundamentals", progress: 45 },
      ],
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.w@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
      enrolledCourses: 2,
      progress: 10,
      lastActive: "2025-04-05",
      courses: [
        { id: 1, title: "Advanced Web Development with React", progress: 15 },
        { id: 4, title: "UI/UX Design Principles", progress: 5 },
      ],
    },
  ];

  const courses = [
    { id: 1, title: "Advanced Web Development with React" },
    { id: 2, title: "Machine Learning Fundamentals" },
    { id: 3, title: "Data Science for Beginners" },
    { id: 4, title: "UI/UX Design Principles" },
  ];

  const filteredStudents = students
    .filter((student) => {
      // Apply search filter
      if (
        searchQuery &&
        !student.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !student.email.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Apply course filter
      if (courseFilter !== "all") {
        const courseId = Number.parseInt(courseFilter);
        if (!student.courses.some((course) => course.id === courseId)) {
          return false;
        }
      }

      // Apply progress filter
      if (progressFilter !== "all") {
        switch (progressFilter) {
          case "not-started":
            if (student.progress > 0) return false;
            break;
          case "in-progress":
            if (student.progress < 1 || student.progress >= 100) return false;
            break;
          case "completed":
            if (student.progress < 100) return false;
            break;
        }
      }

      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      let comparison = 0;

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "progress":
          comparison = a.progress - b.progress;
          break;
        case "courses":
          comparison = a.enrolledCourses - b.enrolledCourses;
          break;
        case "lastActive":
          comparison =
            new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime();
          break;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSortChange = (column: string) => {
    if (sortBy === column) {
      toggleSortOrder();
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Student Management
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage and track your students' progress
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Message All
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Students
                </p>
                <h3 className="text-2xl font-bold mt-1">{students.length}</h3>
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
                  Active Students
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {
                    students.filter(
                      (s) =>
                        new Date(s.lastActive) >
                        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                    ).length
                  }
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Active in the last 7 days
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Average Progress
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {Math.round(
                    students.reduce(
                      (acc, student) => acc + student.progress,
                      0
                    ) / students.length
                  )}
                  %
                </h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Completed Courses
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {students.reduce((acc, student) => {
                    return (
                      acc +
                      student.courses.filter(
                        (course) => course.progress === 100
                      ).length
                    );
                  }, 0)}
                </h3>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                placeholder="Search students by name or email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id.toString()}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={progressFilter} onValueChange={setProgressFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by progress" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Progress</SelectItem>
                  <SelectItem value="not-started">Not Started (0%)</SelectItem>
                  <SelectItem value="in-progress">
                    In Progress (1-99%)
                  </SelectItem>
                  <SelectItem value="completed">Completed (100%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Students</CardTitle>
          <CardDescription>
            You have {filteredStudents.length} student
            {filteredStudents.length !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th
                    className="text-left py-3 px-4 font-medium text-gray-500 cursor-pointer"
                    onClick={() => handleSortChange("name")}
                  >
                    <div className="flex items-center">
                      Student
                      {sortBy === "name" &&
                        (sortOrder === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th
                    className="text-center py-3 px-4 font-medium text-gray-500 cursor-pointer"
                    onClick={() => handleSortChange("courses")}
                  >
                    <div className="flex items-center justify-center">
                      Enrolled Courses
                      {sortBy === "courses" &&
                        (sortOrder === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th
                    className="text-center py-3 px-4 font-medium text-gray-500 cursor-pointer"
                    onClick={() => handleSortChange("progress")}
                  >
                    <div className="flex items-center justify-center">
                      Overall Progress
                      {sortBy === "progress" &&
                        (sortOrder === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th
                    className="text-center py-3 px-4 font-medium text-gray-500 cursor-pointer"
                    onClick={() => handleSortChange("lastActive")}
                  >
                    <div className="flex items-center justify-center">
                      Last Active
                      {sortBy === "lastActive" &&
                        (sortOrder === "asc" ? (
                          <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                          <ChevronDown className="ml-1 h-4 w-4" />
                        ))}
                    </div>
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                          <img
                            src={student.avatar || "/placeholder.svg"}
                            alt={student.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-medium block">
                            {student.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {student.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">
                      <div className="flex flex-col items-center">
                        <span>{student.enrolledCourses}</span>
                        <div className="text-xs text-gray-500 mt-1">
                          {student.courses
                            .map((course) => course.title)
                            .join(", ")}
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">
                      <div className="flex flex-col items-center">
                        <div className="w-full max-w-[120px] bg-gray-200 rounded-full h-2.5 mb-1">
                          <div
                            className={`h-2.5 rounded-full ${
                              student.progress < 30
                                ? "bg-red-600"
                                : student.progress < 70
                                  ? "bg-yellow-600"
                                  : "bg-green-600"
                            }`}
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">
                          {student.progress}% Complete
                        </span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span>
                        {new Date(student.lastActive).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/instructor/students/${student.id}`}>
                            View Details
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Message</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      No students found. Try adjusting your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
