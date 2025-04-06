import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Globe,
  Users,
  CheckCircle,
  Play,
  Monitor,
  MapPin,
  ChevronDown,
  ChevronRight,
  Download,
} from "lucide-react";

import { Button } from "@/components/uii_/button";
import { Badge } from "@/components/uii_/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type Course = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  instructor: {
    id: number;
    name: string;
    title: string;
    image: string;
    rating: number;
    reviewCount: number;
  };
  rating: number;
  reviewCount: number;
  studentCount: number;
  level: string;
  lastUpdated: string;
  language: string;
  format: string;
  duration: {
    hours: number;
    weeks: number;
  };
  price: string;
  discountPrice: string;
  discountEnds: string;
  tags: string[];
  description: string;
  whatYouWillLearn: string[];
  prerequisites: string[];
  targetAudience: string[];
  syllabus: {
    title: string;
    date: string;
    classes: {
      title: string;
      date: string;
      dayOfWeek: string;
      sessions: {
        title: string;
        time: string;
        type: string;
        date?: string;
        dayOfWeek?: string;
      }[];
      moreItems: number;
    }[];
  }[];
  resources: {
    title: string;
    type: string;
    size: string;
    url: string;
  }[];
  projects: {
    title: string;
    description: string;
    image: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  reviews: {
    id: number;
    name: string;
    image: string;
    rating: number;
    date: string;
    comment: string;
  }[];
  relatedCourses: {
    id: number;
    title: string;
    image: string;
    instructor: string;
    rating: number;
    price: string;
  }[];
};
export default function CourseDetailPage({ course }: { course: Course }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Course Header */}
      <div className="relative bg-aalemni-navy text-white">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-aalemni-orange text-white">
                  {course.level}
                </Badge>
                <Badge variant="outline" className="text-white border-white">
                  {course.format === "Online" ? (
                    <Monitor className="mr-1 h-3 w-3" />
                  ) : course.format === "In-Person" ? (
                    <MapPin className="mr-1 h-3 w-3" />
                  ) : (
                    <Globe className="mr-1 h-3 w-3" />
                  )}
                  {course.format}
                </Badge>
                <Badge variant="outline" className="text-white border-white">
                  <Clock className="mr-1 h-3 w-3" />
                  {course.duration.hours} hours
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
              <p className="mt-2 text-lg text-gray-200">{course.subtitle}</p>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={course.instructor.image || "/placeholder.svg"}
                      alt={course.instructor.name}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <Link
                      href={`/instructors/${course.instructor.id}`}
                      className="font-medium hover:underline"
                    >
                      {course.instructor.name}
                    </Link>
                    <p className="text-sm text-gray-300">
                      {course.instructor.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <div className="flex">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                  </div>
                  <span className="ml-1 text-sm">{course.rating}</span>
                  <span className="text-sm text-gray-300">
                    ({course.reviewCount} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">
                    {course.studentCount.toLocaleString()} students
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">
                    Last updated {course.lastUpdated}
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <Card className="overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Button
                      size="icon"
                      className="h-12 w-12 rounded-full bg-aalemni-orange hover:bg-aalemni-orange/90"
                    >
                      <Play className="h-6 w-6" />
                      <span className="sr-only">Preview course</span>
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-aalemni-navy">
                      {course.discountPrice}
                    </span>
                    <span className="text-lg line-through text-muted-foreground">
                      {course.price}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <Button className="w-full bg-aalemni-orange hover:bg-aalemni-orange/90 text-white">
                      Enroll Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      Add to Wishlist
                    </Button>
                  </div>

                  <div className="mt-6 space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">
                        {course.duration.hours} hours ({course.duration.weeks}{" "}
                        weeks)
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Language:</span>
                      <span className="font-medium">{course.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level:</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Format:</span>
                      <span className="font-medium">{course.format}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deadline:</span>
                      <span className="font-medium text-red-500">
                        Offer ends in 3 days
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium mb-2">This course includes:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-aalemni-orange" />
                        <span>
                          {course.duration.hours} hours on-demand video
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-aalemni-orange" />
                        <span>3 downloadable resources</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-aalemni-orange" />
                        <span>Full lifetime access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-aalemni-orange" />
                        <span>Access on mobile and TV</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-aalemni-orange" />
                        <span>Certificate of completion</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container py-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Course Description
                  </h2>
                  <div className="prose max-w-none">
                    {course.description.split("\n\n").map((paragraph, i) => (
                      <p key={i} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {course.whatYouWillLearn.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-aalemni-orange mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Course Projects</h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {course.projects.map((project, i) => (
                      <Card key={i} className="overflow-hidden">
                        <div className="aspect-video relative">
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {project.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-4">Prerequisites</h2>
                  <ul className="space-y-2">
                    {course.prerequisites.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-aalemni-orange mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">This Course Is For</h2>
                  <ul className="space-y-2">
                    {course.targetAudience.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-aalemni-orange mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4">Course Resources</h2>
                  <div className="space-y-3">
                    {course.resources.map((resource, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 border rounded-md"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 flex items-center justify-center bg-aalemni-navy/10 rounded-md text-aalemni-navy">
                            {resource.type === "PDF" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-file-text"
                              >
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" x2="8" y1="13" y2="13" />
                                <line x1="16" x2="8" y1="17" y2="17" />
                                <line x1="10" x2="8" y1="9" y2="9" />
                              </svg>
                            ) : resource.type === "ZIP" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-folder-archive"
                              >
                                <path d="M22 20V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2Z" />
                                <circle cx="12" cy="13" r="2" />
                                <path d="M12 15v5" />
                                <path d="M12 11v-2" />
                                <path d="M12 8V6" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-file"
                              >
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                <polyline points="14 2 14 8 20 8" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{resource.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {resource.size}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-aalemni-orange"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Related Courses</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {course.relatedCourses.map((relatedCourse) => (
                  <Link
                    key={relatedCourse.id}
                    href={`/courses/${relatedCourse.id}`}
                  >
                    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                      <div className="aspect-video relative">
                        <Image
                          src={relatedCourse.image || "/placeholder.svg"}
                          alt={relatedCourse.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                          <Button
                            size="icon"
                            className="h-12 w-12 rounded-full"
                          >
                            <Play className="h-6 w-6" />
                            <span className="sr-only">Preview course</span>
                          </Button>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold line-clamp-2">
                          {relatedCourse.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {relatedCourse.instructor}
                        </p>
                        <div className="mt-2 flex items-center gap-1">
                          <div className="flex">
                            {Array(5)
                              .fill(null)
                              .map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-4 w-4 ${i < Math.floor(relatedCourse.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                              ))}
                          </div>
                          <span className="ml-1 text-sm">
                            {relatedCourse.rating}
                          </span>
                        </div>
                        <div className="mt-2 font-semibold">
                          {relatedCourse.price}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="syllabus" className="space-y-8">
            <div className="bg-white dark:bg-gray-950 rounded-lg border p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 className="text-3xl font-bold">Course Syllabus</h2>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <div className="relative">
                    <select className="pl-4 pr-10 py-2 border rounded-lg appearance-none bg-background focus:outline-none focus:ring-2 focus:ring-aalemni-orange">
                      <option>Cohort: Apr 12 - Apr 20</option>
                      <option>Cohort: May 10 - May 18</option>
                      <option>Cohort: Jun 14 - Jun 22</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
                  </div>
                  <Button variant="link" className="text-aalemni-orange">
                    Expand all modules
                  </Button>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-4">
                {course.syllabus.map((week, weekIndex) => (
                  <AccordionItem
                    key={weekIndex}
                    value={`week-${weekIndex}`}
                    className="border rounded-lg overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 [&[data-state=open]>div>svg]:rotate-90">
                      <div className="flex items-center w-full">
                        <div className="flex-1 flex items-center gap-2">
                          <span className="font-semibold">
                            Week {weekIndex + 1}
                          </span>
                          <span className="text-muted-foreground">
                            {week.date}
                          </span>
                        </div>
                        <ChevronRight className="h-5 w-5 transition-transform duration-200" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-0 pt-0 pb-0">
                      {week.classes.length > 0 ? (
                        <div className="border-t">
                          {week.classes.map((classItem, classIndex) => (
                            <div
                              key={classIndex}
                              className="border-b last:border-b-0"
                            >
                              <div className="px-6 py-4 bg-muted/30">
                                <h3 className="font-semibold text-lg">
                                  {classItem.title}
                                </h3>
                              </div>
                              <div className="divide-y">
                                {classItem.sessions.map(
                                  (session, sessionIndex) => (
                                    <div
                                      key={sessionIndex}
                                      className="px-6 py-4 flex flex-col md:flex-row md:items-center gap-2"
                                    >
                                      <div className="flex-shrink-0 flex flex-col items-center justify-center w-12 h-12 bg-aalemni-orange/10 text-aalemni-orange rounded-lg">
                                        <span className="text-xs font-semibold">
                                          {session.dayOfWeek ||
                                            classItem.dayOfWeek}
                                        </span>
                                        <span className="text-sm font-bold">
                                          {session.date || classItem.date}
                                        </span>
                                      </div>
                                      <div className="flex-1 ml-0 md:ml-4">
                                        <p className="font-medium">
                                          {session.title}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          {session.time}
                                        </p>
                                      </div>
                                      <Badge
                                        variant="outline"
                                        className="flex-shrink-0 gap-1"
                                      >
                                        {session.type === "Online" ? (
                                          <Monitor className="h-3 w-3" />
                                        ) : (
                                          <MapPin className="h-3 w-3" />
                                        )}
                                        {session.type}
                                      </Badge>
                                    </div>
                                  )
                                )}
                                {classItem.moreItems > 0 && (
                                  <div className="px-6 py-3 bg-muted/20 text-center">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-muted-foreground"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="mr-1"
                                      >
                                        <rect
                                          width="18"
                                          height="18"
                                          x="3"
                                          y="3"
                                          rx="2"
                                        />
                                        <path d="M9 12h6" />
                                        <path d="M12 9v6" />
                                      </svg>
                                      {classItem.moreItems} more items
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="px-6 py-8 text-center border-t">
                          <p className="text-muted-foreground">
                            Content for this week will be available soon.
                          </p>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="bg-aalemni-navy text-white rounded-lg p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Course Schedule</h3>
                  <p className="mb-4">
                    This course runs for 8 weeks with live sessions every
                    weekend.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-aalemni-orange mt-0.5" />
                      <span>Live classes on Saturdays and Sundays</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-aalemni-orange mt-0.5" />
                      <span>Optional Q&A sessions after each class</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-aalemni-orange mt-0.5" />
                      <span>Weekly assignments and projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-aalemni-orange mt-0.5" />
                      <span>24/7 access to course materials</span>
                    </li>
                  </ul>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Time Commitment</h3>
                  <p className="mb-4">
                    To get the most out of this course, you should plan to
                    dedicate:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-aalemni-orange mt-0.5" />
                      <span>5-7 hours per week for live sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-aalemni-orange mt-0.5" />
                      <span>3-5 hours per week for assignments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-aalemni-orange mt-0.5" />
                      <span>2-3 hours per week for additional practice</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="instructor">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="md:col-span-1">
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-aalemni-orange/20">
                    <Image
                      src={course.instructor.image || "/placeholder.svg"}
                      alt={course.instructor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="mt-4 text-2xl font-bold">
                    {course.instructor.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {course.instructor.title}
                  </p>

                  <div className="mt-4 flex items-center justify-center gap-2">
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-yellow-400 fill-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span className="ml-1 font-medium">
                        {course.instructor.rating}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({course.instructor.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="mt-6 w-full">
                    <Button
                      className="w-full bg-aalemni-orange hover:bg-aalemni-orange/90 text-white"
                      asChild
                    >
                      <Link href={`/instructors/${course.instructor.id}`}>
                        View Full Profile
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">
                  About the Instructor
                </h2>
                <div className="prose max-w-none">
                  <p>
                    Former Google engineer with 10+ years of experience in web
                    development. Passionate about teaching modern JavaScript
                    frameworks and helping students build real-world
                    applications.
                  </p>
                  <p>
                    After working at Google and several tech startups, I decided
                    to focus on teaching and helping others build their skills
                    in web development. My teaching philosophy centers on
                    practical, project-based learning. I believe that the best
                    way to learn programming is by building real applications
                    and solving real problems.
                  </p>
                  <p>
                    I specialize in modern JavaScript frameworks like React and
                    Node.js, and I'm constantly updating my courses to reflect
                    the latest industry trends and best practices. Whether
                    you're a complete beginner or an experienced developer
                    looking to expand your skills, my goal is to help you become
                    a confident and competent web developer.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Teaching Style</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Practical Exercises</span>
                            <span className="text-sm font-medium">90%</span>
                          </div>
                          <Progress value={90} className="mt-2 h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Theory & Concepts</span>
                            <span className="text-sm font-medium">75%</span>
                          </div>
                          <Progress value={75} className="mt-2 h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">
                              Project-Based Learning
                            </span>
                            <span className="text-sm font-medium">95%</span>
                          </div>
                          <Progress value={95} className="mt-2 h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "JavaScript",
                          "React",
                          "Node.js",
                          "Redux",
                          "GraphQL",
                          "TypeScript",
                          "Web Development",
                          "Frontend",
                          "Full-Stack",
                        ].map((tag, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-aalemni-navy/10"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">
                    Other Courses by {course.instructor.name}
                  </h3>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {course.relatedCourses.slice(0, 2).map((relatedCourse) => (
                      <Link
                        key={relatedCourse.id}
                        href={`/courses/${relatedCourse.id}`}
                      >
                        <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                          <div className="aspect-video relative">
                            <Image
                              src={relatedCourse.image || "/placeholder.svg"}
                              alt={relatedCourse.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold">
                              {relatedCourse.title}
                            </h3>
                            <div className="mt-2 flex items-center gap-1">
                              <div className="flex">
                                {Array(5)
                                  .fill(null)
                                  .map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`h-4 w-4 ${i < Math.floor(relatedCourse.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                  ))}
                              </div>
                              <span className="ml-1 text-sm">
                                {relatedCourse.rating}
                              </span>
                            </div>
                            <div className="mt-2 font-semibold">
                              {relatedCourse.price}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="md:col-span-1">
                <div className="rounded-lg border p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="text-5xl font-bold text-aalemni-navy">
                      {course.rating}
                    </div>
                    <div className="mt-2 flex">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(course.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      Course Rating • {course.reviewCount} Reviews
                    </p>
                  </div>

                  <div className="mt-6 space-y-4">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const percentage =
                        rating === 5
                          ? 78
                          : rating === 4
                            ? 15
                            : rating === 3
                              ? 5
                              : rating === 2
                                ? 1
                                : 1;
                      return (
                        <div key={rating} className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <span>{rating}</span>
                            <svg
                              className="h-4 w-4 text-yellow-400 fill-yellow-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          </div>
                          <div className="h-2 flex-1 rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-aalemni-orange"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {percentage}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="space-y-6">
                  {course.reviews.map((review) => (
                    <div key={review.id} className="rounded-lg border p-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={review.image || "/placeholder.svg"}
                            alt={review.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{review.name}</h4>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {Array(5)
                                .fill(null)
                                .map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                  </svg>
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4">{review.comment}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <Button variant="outline">Load More Reviews</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="faq">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h2>

              <Accordion type="single" collapsible className="w-full">
                {course.faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-8 rounded-lg border p-6 bg-muted/30">
                <h3 className="text-xl font-bold mb-2">
                  Still have questions?
                </h3>
                <p className="mb-4">
                  If you have any other questions about this course, please
                  don't hesitate to contact us.
                </p>
                <Button className="bg-aalemni-orange hover:bg-aalemni-orange/90 text-white">
                  Contact Support
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Enrollment CTA */}
      <div className="bg-aalemni-navy text-white py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold">
                Ready to start your learning journey?
              </h2>
              <p className="mt-2">
                Enroll now and join over 5,800 students already taking this
                course.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-aalemni-orange hover:bg-aalemni-orange/90 text-white">
                Enroll Now for {course.discountPrice}
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Add to Wishlist
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
