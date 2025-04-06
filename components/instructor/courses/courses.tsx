"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Edit, Trash2, Eye, Star } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function InstructorCourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);

  // Mock data - would come from API in production
  const courses = [
    {
      id: 1,
      title: "Advanced Web Development with React",
      thumbnail: "/placeholder.svg?height=80&width=120",
      students: 342,
      rating: 4.9,
      lastUpdated: "2025-03-15",
      status: "published",
      category: "Web Development",
    },
    {
      id: 2,
      title: "Machine Learning Fundamentals",
      thumbnail: "/placeholder.svg?height=80&width=120",
      students: 256,
      rating: 4.7,
      lastUpdated: "2025-02-28",
      status: "published",
      category: "Data Science",
    },
    {
      id: 3,
      title: "Data Science for Beginners",
      thumbnail: "/placeholder.svg?height=80&width=120",
      students: 189,
      rating: 4.6,
      lastUpdated: "2025-01-20",
      status: "published",
      category: "Data Science",
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      thumbnail: "/placeholder.svg?height=80&width=120",
      students: 215,
      rating: 4.8,
      lastUpdated: "2025-03-05",
      status: "published",
      category: "Design",
    },
    {
      id: 5,
      title: "Introduction to Blockchain",
      thumbnail: "/placeholder.svg?height=80&width=120",
      students: 0,
      rating: 0,
      lastUpdated: "2025-04-01",
      status: "draft",
      category: "Blockchain",
    },
  ];

  const filteredCourses = courses
    .filter((course) => {
      // Apply search filter
      if (
        searchQuery &&
        !course.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Apply status filter
      if (statusFilter !== "all" && course.status !== statusFilter) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime()
          );
        case "oldest":
          return (
            new Date(a.lastUpdated).getTime() -
            new Date(b.lastUpdated).getTime()
          );
        case "popular":
          return b.students - a.students;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const handleDeleteClick = (courseId: number) => {
    setCourseToDelete(courseId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the course
    console.log(`Deleting course ${courseToDelete}`);
    setDeleteDialogOpen(false);
    setCourseToDelete(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Manage My Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Create, edit and manage your courses
          </p>
        </div>
        <Button className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" />
          Create New Course
        </Button>
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
                placeholder="Search courses..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Courses</CardTitle>
          <CardDescription>
            You have {filteredCourses.length} course
            {filteredCourses.length !== 1 ? "s" : ""}
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
                    Last Updated
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">
                    Status
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course) => (
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
                        <div>
                          <span className="font-medium block">
                            {course.title}
                          </span>
                          <span className="text-sm text-gray-500">
                            {course.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4">{course.students}</td>
                    <td className="text-center py-4 px-4">
                      {course.rating > 0 ? (
                        <div className="flex items-center justify-center">
                          <span className="mr-1">{course.rating}</span>
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        </div>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {new Date(course.lastUpdated).toLocaleDateString()}
                    </td>
                    <td className="text-center py-4 px-4">
                      <Badge
                        variant={
                          course.status === "published"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {course.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </td>
                    <td className="text-center py-4 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/instructor/courses/${course.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/instructor/courses/${course.id}/edit`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteClick(course.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredCourses.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      No courses found. Try adjusting your filters or create a
                      new course.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this course? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
