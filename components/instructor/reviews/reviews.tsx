"use client";

import { useState } from "react";
import {
  Star,
  Search,
  MessageSquare,
  ThumbsUp,
  Flag,
  Trash2,
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

export default function InstructorReviews() {
  const [activeTab, setActiveTab] = useState("course-reviews");
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);

  // Mock data - would come from API in production
  const courseReviews = [
    {
      id: 1,
      studentName: "Michael Johnson",
      studentAvatar: "/placeholder.svg?height=40&width=40",
      courseId: 1,
      courseTitle: "Advanced Web Development with React",
      rating: 5,
      comment:
        "This course exceeded my expectations! The content is well-structured and the explanations are clear. I especially enjoyed the practical examples that helped me understand complex concepts.",
      date: "2025-04-01",
      helpful: 12,
      replied: true,
    },
    {
      id: 2,
      studentName: "Sarah Williams",
      studentAvatar: "/placeholder.svg?height=40&width=40",
      courseId: 1,
      courseTitle: "Advanced Web Development with React",
      rating: 4,
      comment:
        "Great course overall. The content is comprehensive and the instructor explains things well. I would have liked more advanced examples, but it's still a solid course for beginners and intermediate developers.",
      date: "2025-03-28",
      helpful: 8,
      replied: false,
    },
    {
      id: 3,
      studentName: "David Lee",
      studentAvatar: "/placeholder.svg?height=40&width=40",
      courseId: 2,
      courseTitle: "Machine Learning Fundamentals",
      rating: 5,
      comment:
        "Excellent course! The instructor breaks down complex ML concepts into digestible pieces. The hands-on projects were particularly valuable for reinforcing the theoretical concepts.",
      date: "2025-03-25",
      helpful: 15,
      replied: true,
    },
    {
      id: 4,
      studentName: "Emily Chen",
      studentAvatar: "/placeholder.svg?height=40&width=40",
      courseId: 3,
      courseTitle: "Data Science for Beginners",
      rating: 3,
      comment:
        "The course provides a good introduction to data science, but I found some sections to be too basic. The instructor is knowledgeable, but the pace was a bit slow for my liking.",
      date: "2025-03-20",
      helpful: 5,
      replied: true,
    },
    {
      id: 5,
      studentName: "James Wilson",
      studentAvatar: "/placeholder.svg?height=40&width=40",
      courseId: 4,
      courseTitle: "UI/UX Design Principles",
      rating: 5,
      comment:
        "This course transformed my understanding of UI/UX design! The instructor's approach to teaching design principles is exceptional, and the assignments helped me build a strong portfolio.",
      date: "2025-03-15",
      helpful: 20,
      replied: false,
    },
  ];

  const instructorReviews = {
    overall: 4.8,
    total: 156,
    distribution: [
      { stars: 5, count: 120 },
      { stars: 4, count: 25 },
      { stars: 3, count: 8 },
      { stars: 2, count: 2 },
      { stars: 1, count: 1 },
    ],
    testimonials: [
      {
        id: 1,
        studentName: "Alex Thompson",
        studentAvatar: "/placeholder.svg?height=40&width=40",
        comment:
          "One of the best instructors I've had! Clear explanations, responsive to questions, and genuinely cares about student success.",
        date: "2025-03-10",
      },
      {
        id: 2,
        studentName: "Jessica Martinez",
        studentAvatar: "/placeholder.svg?height=40&width=40",
        comment:
          "I've taken three courses from this instructor and each one has been excellent. The teaching style is engaging and the content is always up-to-date with industry standards.",
        date: "2025-02-28",
      },
      {
        id: 3,
        studentName: "Ryan Patel",
        studentAvatar: "/placeholder.svg?height=40&width=40",
        comment:
          "What sets this instructor apart is the practical, real-world approach to teaching. The courses aren't just theoretical—they prepare you for actual work scenarios.",
        date: "2025-02-15",
      },
    ],
    improvement: [
      {
        id: 1,
        category: "Content Depth",
        suggestions:
          "Consider adding more advanced topics for experienced students",
        count: 12,
      },
      {
        id: 2,
        category: "Exercise Difficulty",
        suggestions: "Some students would like more challenging assignments",
        count: 8,
      },
      {
        id: 3,
        category: "Update Frequency",
        suggestions:
          "More regular updates to keep content current with latest technologies",
        count: 5,
      },
    ],
  };

  const courses = [
    { id: 1, title: "Advanced Web Development with React" },
    { id: 2, title: "Machine Learning Fundamentals" },
    { id: 3, title: "Data Science for Beginners" },
    { id: 4, title: "UI/UX Design Principles" },
  ];

  const filteredReviews = courseReviews
    .filter((review) => {
      // Apply search filter
      if (
        searchQuery &&
        !review.comment.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !review.studentName.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Apply rating filter
      if (
        ratingFilter !== "all" &&
        review.rating !== Number.parseInt(ratingFilter)
      ) {
        return false;
      }

      // Apply course filter
      if (
        courseFilter !== "all" &&
        review.courseId !== Number.parseInt(courseFilter)
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        case "most-helpful":
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

  const handleDeleteClick = (reviewId: number) => {
    setReviewToDelete(reviewId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the review
    console.log(`Deleting review ${reviewToDelete}`);
    setDeleteDialogOpen(false);
    setReviewToDelete(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Reviews & Feedback
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Manage course reviews and instructor feedback
        </p>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="course-reviews" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger
            value="course-reviews"
            onClick={() => setActiveTab("course-reviews")}
          >
            Course Reviews
          </TabsTrigger>
          <TabsTrigger
            value="instructor-ratings"
            onClick={() => setActiveTab("instructor-ratings")}
          >
            Instructor Ratings
          </TabsTrigger>
        </TabsList>

        {/* Course Reviews Tab */}
        <TabsContent value="course-reviews">
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
                    placeholder="Search reviews..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-4">
                  <Select value={ratingFilter} onValueChange={setRatingFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={courseFilter} onValueChange={setCourseFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      {courses.map((course) => (
                        <SelectItem
                          key={course.id}
                          value={course.id.toString()}
                        >
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="highest">Highest Rated</SelectItem>
                      <SelectItem value="lowest">Lowest Rated</SelectItem>
                      <SelectItem value="most-helpful">Most Helpful</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <Card>
            <CardHeader>
              <CardTitle>Course Reviews</CardTitle>
              <CardDescription>
                {filteredReviews.length} review
                {filteredReviews.length !== 1 ? "s" : ""} found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredReviews.map((review) => (
                  <div key={review.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                          <img
                            src={review.studentAvatar || "/placeholder.svg"}
                            alt={review.studentName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{review.studentName}</h4>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                            <span className="text-sm text-gray-500 ml-2">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Course: {review.courseTitle}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <Button variant="ghost" size="sm" className="mr-2">
                          <Flag className="h-4 w-4" />
                          <span className="sr-only">Flag</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(review.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    <p className="mt-3">{review.comment}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{review.helpful} found this helpful</span>
                      </div>
                      <div>
                        {review.replied ? (
                          <Badge variant="outline" className="mr-2">
                            Replied
                          </Badge>
                        ) : (
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Reply
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {filteredReviews.length === 0 && (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 mx-auto text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium">
                      No reviews found
                    </h3>
                    <p className="mt-2 text-gray-500">
                      Try adjusting your filters to see more reviews
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Instructor Ratings Tab */}
        <TabsContent value="instructor-ratings">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-medium mb-4">Overall Rating</h3>
                  <div className="text-5xl font-bold">
                    {instructorReviews.overall}
                  </div>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(instructorReviews.overall) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Based on {instructorReviews.total} ratings
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">
                  Rating Distribution
                </h3>
                {instructorReviews.distribution.map((item) => (
                  <div key={item.stars} className="flex items-center mb-2">
                    <div className="w-16 flex items-center">
                      <span className="mr-1">{item.stars}</span>
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-yellow-400 h-2.5 rounded-full"
                          style={{
                            width: `${(item.count / instructorReviews.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm text-gray-500">
                      {item.count} (
                      {Math.round((item.count / instructorReviews.total) * 100)}
                      %)
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Student Testimonials</CardTitle>
                <CardDescription>
                  What students are saying about your teaching style
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {instructorReviews.testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="p-4 border rounded-lg">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                          <img
                            src={
                              testimonial.studentAvatar || "/placeholder.svg"
                            }
                            alt={testimonial.studentName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {testimonial.studentName}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(testimonial.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3">{testimonial.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suggestions for Improvement</CardTitle>
                <CardDescription>
                  Anonymous feedback to help you improve your courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {instructorReviews.improvement.map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{item.category}</h4>
                        <Badge variant="outline">{item.count} students</Badge>
                      </div>
                      <p className="mt-2 text-gray-600">{item.suggestions}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Instructor Performance Metrics</CardTitle>
              <CardDescription>
                How you compare to other instructors in your category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Response Rate</h4>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                    <span className="font-medium">95%</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Top 10% of instructors
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Response Time</h4>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <span className="font-medium">85%</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Top 25% of instructors
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Content Quality</h4>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                    <span className="font-medium">92%</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Top 15% of instructors
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
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
                      Pro Tip: Improve Your Ratings
                    </h4>
                    <p className="mt-1 text-sm">
                      Responding to student questions within 24 hours and
                      regularly updating your course content can significantly
                      improve your instructor ratings and lead to more
                      enrollments.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Review Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Review</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this review? This action cannot be
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
