"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Filter, Clock, BookOpen, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for courses
const coursesData = [
  {
    id: 1,
    title: "Introduction to Web Development",
    instructor: "Sarah Johnson",
    image: "/placeholder.svg?height=200&width=300",
    progress: 65,
    lastAccessed: "2025-04-05T14:30:00",
    status: "in-progress",
  },
  {
    id: 2,
    title: "Digital Marketing Fundamentals",
    instructor: "Michael Chen",
    image: "/placeholder.svg?height=200&width=300",
    progress: 30,
    lastAccessed: "2025-04-04T10:15:00",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Business Leadership Workshop",
    instructor: "Hadi Rahhal",
    image: "/placeholder.svg?height=200&width=300",
    progress: 0,
    lastAccessed: null,
    status: "upcoming",
  },
  {
    id: 4,
    title: "Python for Data Science",
    instructor: "Alex Rodriguez",
    image: "/placeholder.svg?height=200&width=300",
    progress: 100,
    lastAccessed: "2025-03-15T09:45:00",
    status: "completed",
  },
  {
    id: 5,
    title: "UX/UI Design Principles",
    instructor: "Emma Wilson",
    image: "/placeholder.svg?height=200&width=300",
    progress: 100,
    lastAccessed: "2025-02-20T16:20:00",
    status: "completed",
  },
];

export default function StudentCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [unenrollCourseId, setUnenrollCourseId] = useState<number | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Filter courses based on search query and status filter
  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || course.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Format date function
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not started yet";

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return (
        "Today at " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    } else if (diffDays === 1) {
      return (
        "Yesterday at " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  const handleUnenroll = (courseId: number) => {
    setUnenrollCourseId(courseId);
    setConfirmDialogOpen(true);
  };

  const confirmUnenroll = () => {
    // In a real app, this would call an API to unenroll the student
    console.log(`Unenrolled from course ${unenrollCourseId}`);
    setConfirmDialogOpen(false);
    // Here you would typically update the UI to reflect the change
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Courses</h1>
          <p className="text-muted-foreground">
            Track your progress and continue learning
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by course title or instructor..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                <span className={statusFilter === "all" ? "font-bold" : ""}>
                  All Courses
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("in-progress")}>
                <span
                  className={statusFilter === "in-progress" ? "font-bold" : ""}
                >
                  In Progress
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                <span
                  className={statusFilter === "completed" ? "font-bold" : ""}
                >
                  Completed
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("upcoming")}>
                <span
                  className={statusFilter === "upcoming" ? "font-bold" : ""}
                >
                  Upcoming
                </span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Course List */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium mb-2">No Courses Found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "You are not enrolled in any courses yet"}
          </p>
          <Button asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card
              key={course.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                {course.status === "completed" && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-500">Completed</Badge>
                  </div>
                )}
                {course.status === "upcoming" && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-blue-500">Upcoming</Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1 line-clamp-1">
                  {course.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {course.instructor}
                </p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Last Accessed</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(course.lastAccessed)}
                    </p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="px-6 py-4 bg-muted/30 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => handleUnenroll(course.id)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Unenroll
                </Button>
                <Button asChild>
                  <Link href={`/courses/${course.id}/learn`}>
                    {course.progress === 0 ? "Start" : "Resume"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Unenroll Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Unenrollment</DialogTitle>
            <DialogDescription>
              Are you sure you want to unenroll from this course? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmUnenroll}>
              Yes, Unenroll
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
