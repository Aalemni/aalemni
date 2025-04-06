import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Clock,
  Award,
  BarChart,
  Play,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function StudentDashboardPage() {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Welcome back, John!</h1>
          <p className="text-muted-foreground">
            Continue your learning journey. You have 3 courses in progress.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">5</div>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                2 completed, 3 in progress
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Learning Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">24.5</div>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                3.5 hours this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">2</div>
                <Award className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground">
                View your achievements
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      title: "Complete Web Development Bootcamp",
                      progress: 65,
                      image:
                        "/placeholder.svg?height=120&width=240&text=Web+Dev",
                      lastLesson: "JavaScript Fundamentals",
                      timeLeft: "5h 30m left",
                    },
                    {
                      title: "UI/UX Design Masterclass",
                      progress: 40,
                      image: "/placeholder.svg?height=120&width=240&text=UI/UX",
                      lastLesson: "User Research Methods",
                      timeLeft: "8h 15m left",
                    },
                    {
                      title: "Python for Data Science",
                      progress: 25,
                      image:
                        "/placeholder.svg?height=120&width=240&text=Python",
                      lastLesson: "NumPy Basics",
                      timeLeft: "10h 45m left",
                    },
                  ].map((course, i) => (
                    <div key={i} className="flex flex-col gap-4 sm:flex-row">
                      <div className="h-24 w-40 overflow-hidden rounded-md">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          width={160}
                          height={96}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="font-semibold">{course.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            Last lesson: {course.lastLesson}
                          </p>
                        </div>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>{course.progress}% complete</span>
                            <span className="text-muted-foreground">
                              {course.timeLeft}
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Button asChild>
                          <Link href={`/student/courses/${i + 1}`}>
                            <Play className="mr-2 h-4 w-4" />
                            Continue
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Live classes and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Advanced JavaScript Q&A",
                      date: "Today",
                      time: "3:00 PM - 4:30 PM",
                      instructor: "John Doe",
                    },
                    {
                      title: "Responsive Design Workshop",
                      date: "Tomorrow",
                      time: "1:00 PM - 3:00 PM",
                      instructor: "Jane Smith",
                    },
                    {
                      title: "React Project Review",
                      date: "May 20, 2023",
                      time: "2:00 PM - 3:30 PM",
                      instructor: "Robert Johnson",
                    },
                  ].map((session, i) => (
                    <div
                      key={i}
                      className="flex flex-col rounded-lg border p-4 hover:bg-muted/50"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{session.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {session.date} • {session.time}
                          </p>
                          <p className="text-sm">
                            Instructor: {session.instructor}
                          </p>
                        </div>
                        <Badge variant={i === 0 ? "default" : "outline"}>
                          {i === 0
                            ? "Today"
                            : i === 1
                              ? "Tomorrow"
                              : "Upcoming"}
                        </Badge>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          Add to Calendar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recommended for You</CardTitle>
                  <CardDescription>
                    Based on your interests and learning history
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/student/courses">
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[
                  {
                    title: "Advanced React Patterns",
                    instructor: "Jane Smith",
                    image: "/placeholder.svg?height=120&width=240&text=React",
                    price: "$49.99",
                    rating: 4.8,
                  },
                  {
                    title: "Node.js Microservices",
                    instructor: "Robert Johnson",
                    image: "/placeholder.svg?height=120&width=240&text=Node.js",
                    price: "$59.99",
                    rating: 4.7,
                  },
                  {
                    title: "Data Visualization with D3.js",
                    instructor: "Emily Davis",
                    image: "/placeholder.svg?height=120&width=240&text=D3.js",
                    price: "$39.99",
                    rating: 4.9,
                  },
                  {
                    title: "TypeScript for React Developers",
                    instructor: "Michael Chen",
                    image:
                      "/placeholder.svg?height=120&width=240&text=TypeScript",
                    price: "$44.99",
                    rating: 4.6,
                  },
                ].map((course, i) => (
                  <Link key={i} href={`/courses/${i + 10}`}>
                    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                      <div className="aspect-video relative">
                        <Image
                          src={course.image || "/placeholder.svg"}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {course.instructor}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <BarChart className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs">{course.rating}</span>
                          </div>
                          <span className="font-medium">{course.price}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
