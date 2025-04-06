import Image from "next/image";
import Link from "next/link";
import {
  Star,
  BookOpen,
  Users,
  Clock,
  Globe,
  MessageSquare,
  Calendar,
  CheckCircle,
  Play,
} from "lucide-react";

import { Button } from "@/components/uii_/button";
import { Badge } from "@/components/uii_/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Instructor } from "@/types/types";

export function InstructorById({ instructor }: { instructor: Instructor}) {
  return (
    <>
      {/* Cover Image */}
      <div className="relative h-48 w-full md:h-64 lg:h-80">
        <Image
          src={instructor.coverImage || "/placeholder.svg"}
          alt={`${instructor.name} cover`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      {/* Instructor Profile Header */}
      <section className="container relative -mt-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="flex flex-col items-center">
              <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-background">
                <Image
                  src={instructor.image || "/placeholder.svg"}
                  alt={instructor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h1 className="mt-4 text-center text-2xl font-bold">
                {instructor.name}
              </h1>
              <p className="text-center text-muted-foreground">
                {instructor.title}
              </p>

              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="ml-1 font-medium">{instructor.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({instructor.reviewCount} reviews)
                </span>
              </div>

              <div className="mt-6 grid w-full grid-cols-2 gap-4">
                <Button className="w-full" asChild>
                  <Link href="#book">Book a Session</Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="#message">Message</Link>
                </Button>
              </div>

              <div className="mt-6 w-full rounded-lg border p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Students</p>
                    <p className="text-lg font-bold">
                      {instructor.studentCount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Courses</p>
                    <p className="text-lg font-bold">
                      {instructor.courseCount}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="text-lg font-bold">{instructor.experience}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Rate</p>
                    <p className="text-lg font-bold">{instructor.price}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 w-full">
                <h3 className="font-semibold">Specialties</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {instructor.specialties.map((specialty, i) => (
                    <Badge key={i} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-6 w-full">
                <h3 className="font-semibold">Languages</h3>
                <div className="mt-2 space-y-2">
                  {instructor.languages.map((language, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span>{language}</span>
                      <Badge variant="outline">Fluent</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 w-full">
                <h3 className="font-semibold">Education</h3>
                <div className="mt-2 space-y-3">
                  {instructor.education.map((edu, i) => (
                    <div key={i}>
                      <p className="font-medium">{edu.degree}</p>
                      <p className="text-sm text-muted-foreground">
                        {edu.institution}, {edu.year}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 w-full">
                <h3 className="font-semibold">Certifications</h3>
                <div className="mt-2 space-y-2">
                  {instructor.certifications.map((cert, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {instructor.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {instructor.about.split("\n\n").map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="rounded-lg border p-4">
                        <h3 className="font-semibold">Teaching Style</h3>
                        <div className="mt-4 space-y-3">
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">
                                Practical Exercises
                              </span>
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
                      </div>

                      <div className="rounded-lg border p-4">
                        <h3 className="font-semibold">Availability</h3>
                        <div className="mt-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Response Time</span>
                            </div>
                            <span className="text-sm font-medium">
                              Within 24 hours
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Available Days</span>
                            </div>
                            <span className="text-sm font-medium">Mon-Fri</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">Time Zone</span>
                            </div>
                            <span className="text-sm font-medium">
                              PST (UTC-8)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="courses" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Courses by {instructor.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {instructor.courses.map((course) => (
                        <Link key={course.id} href={`/courses/${course.id}`}>
                          <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                            <div className="aspect-video relative">
                              <Image
                                src={course.image || "/placeholder.svg"}
                                alt={course.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                                <Button
                                  size="icon"
                                  className="h-12 w-12 rounded-full"
                                >
                                  <Play className="h-6 w-6" />
                                  <span className="sr-only">
                                    Preview course
                                  </span>
                                </Button>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold">{course.title}</h3>
                              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                {course.description}
                              </p>
                              <div className="mt-3 flex items-center gap-2">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 fill-primary text-primary" />
                                  <span className="ml-1 text-sm">
                                    {course.rating}
                                  </span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  ({course.reviewCount} reviews)
                                </span>
                              </div>
                              <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-xs">
                                    {course.hours} hours
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-xs">
                                    {course.level}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-3 flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                  {course.studentCount.toLocaleString()}{" "}
                                  students
                                </span>
                                <span className="font-semibold">
                                  {course.price}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-6 text-center">
                      <Button variant="outline" asChild>
                        <Link href="/courses">View All Courses</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                      <div className="flex flex-col items-center justify-center rounded-lg border bg-background p-6 text-center">
                        <div className="text-5xl font-bold">
                          {instructor.rating}
                        </div>
                        <div className="mt-2 flex">
                          {Array(5)
                            .fill(null)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < Math.floor(instructor.rating)
                                    ? "fill-primary text-primary"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                        </div>
                        <p className="mt-2 text-muted-foreground">
                          Instructor Rating • {instructor.reviewCount} Reviews
                        </p>
                      </div>
                      <div className="md:col-span-2 space-y-4">
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
                            <div
                              key={rating}
                              className="flex items-center gap-4"
                            >
                              <div className="flex items-center gap-1">
                                <span>{rating}</span>
                                <Star className="h-4 w-4 fill-primary text-primary" />
                              </div>
                              <div className="h-2 flex-1 rounded-full bg-muted">
                                <div
                                  className="h-2 rounded-full bg-primary"
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

                    <div className="mt-8 space-y-6">
                      {instructor.reviews.map((review) => (
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
                                      <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                          i < review.rating
                                            ? "fill-primary text-primary"
                                            : "text-muted-foreground"
                                        }`}
                                      />
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

                    <div className="mt-6 text-center">
                      <Button variant="outline">See All Reviews</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {instructor.schedule.map((session) => (
                        <div key={session.id} className="rounded-lg border p-6">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h3 className="font-semibold">{session.title}</h3>
                              <div className="mt-2 flex flex-col gap-1 sm:flex-row sm:gap-4">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">
                                    {session.date}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">
                                    {session.time}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm">
                                    {session.spots}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button>Book Session</Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div
                      id="book"
                      className="mt-8 rounded-lg border bg-muted p-6"
                    >
                      <h3 className="text-xl font-semibold">
                        Book a Private Session
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        Schedule a one-on-one session with {instructor.name} to
                        get personalized guidance and feedback.
                      </p>
                      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <Card>
                          <CardContent className="p-6">
                            <h4 className="font-semibold">30-Minute Session</h4>
                            <p className="mt-2 text-2xl font-bold">$29.99</p>
                            <ul className="mt-4 space-y-2">
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                <span className="text-sm">
                                  One-on-one guidance
                                </span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                <span className="text-sm">Code review</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                <span className="text-sm">Career advice</span>
                              </li>
                            </ul>
                            <Button className="mt-6 w-full">Book Now</Button>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-6">
                            <h4 className="font-semibold">60-Minute Session</h4>
                            <p className="mt-2 text-2xl font-bold">$49.99</p>
                            <ul className="mt-4 space-y-2">
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                <span className="text-sm">
                                  One-on-one guidance
                                </span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                <span className="text-sm">
                                  In-depth code review
                                </span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                <span className="text-sm">
                                  Project planning
                                </span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                <span className="text-sm">
                                  Portfolio review
                                </span>
                              </li>
                            </ul>
                            <Button className="mt-6 w-full">Book Now</Button>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Similar Instructors */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="text-2xl font-bold">Similar Instructors</h2>
          <p className="mt-2 text-muted-foreground">
            Explore other instructors who teach similar subjects
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Link key={i} href={`/instructors/${i + 1}`}>
                <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                  <div className="aspect-square relative">
                    <Image
                      src={`/placeholder.svg?height=300&width=300&text=Instructor+${i}`}
                      alt={`Instructor ${i}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">
                      {i === 0
                        ? "Michael Chen"
                        : i === 1
                          ? "Emily Rodriguez"
                          : i === 2
                            ? "David Thompson"
                            : "Priya Patel"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {i === 0
                        ? "Data Science Instructor"
                        : i === 1
                          ? "UX/UI Design Specialist"
                          : i === 2
                            ? "Cloud Computing Expert"
                            : "Mobile App Developer"}
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm">{4.7 + i * 0.1}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {i === 0
                        ? ["Python", "Machine Learning", "Data Analysis"].map(
                            (tag, j) => (
                              <Badge
                                key={j}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            )
                          )
                        : i === 1
                          ? ["UI Design", "User Research", "Figma"].map(
                              (tag, j) => (
                                <Badge
                                  key={j}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              )
                            )
                          : i === 2
                            ? ["AWS", "Azure", "DevOps"].map((tag, j) => (
                                <Badge
                                  key={j}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))
                            : ["iOS", "Android", "React Native"].map(
                                (tag, j) => (
                                  <Badge
                                    key={j}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                )
                              )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Message Instructor */}
      <section id="message" className="py-16">
        <div className="container">
          <div className="mx-auto max-w-3xl rounded-lg border bg-background p-8">
            <h2 className="text-2xl font-bold">Contact {instructor.name}</h2>
            <p className="mt-2 text-muted-foreground">
              Have a question or want to discuss a potential collaboration? Send
              a message directly to {instructor.name}.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="subject" className="block text-sm font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="What would you like to discuss?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <div className="flex justify-end">
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
