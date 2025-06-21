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
import {
  CourseReview,
  Instructor_Review,
  Level_courses,
  Simplified_Course,
} from "@/types/types";
import { deleteCourseReview } from "@/supabase/actions/course_review";

interface ReviewsPageProps {
  instructor_reviews: Instructor_Review[];
  instructor_course_reviews: CourseReview[];
  instructor_average_rating: number;
  instructor_courses: Simplified_Course[];
}

export default function InstructorReviews({
  instructor_reviews,
  instructor_course_reviews,
  instructor_average_rating,
  instructor_courses,
}: ReviewsPageProps) {
  const [activeTab, setActiveTab] = useState("course-reviews");
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState<string | "">("");
  const [hiddenReviewIds, setHiddenReviewIds] = useState<string[]>([]);

  const filteredReviews = instructor_course_reviews
    .filter(
      (review) =>
        !review.isdeleted && !hiddenReviewIds.includes(review.reviewid)
    )
    .filter((review) => {
      const comment = review.description || "";
      const studentName = review.users?.fullname || "Unknown";

      // Search filter
      if (
        searchQuery &&
        !comment.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !studentName.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Rating filter
      if (
        ratingFilter !== "all" &&
        review.rate !== Number.parseInt(ratingFilter)
      ) {
        return false;
      }

      // Course filter
      if (
        courseFilter !== "all" &&
        review.courseid !== courseFilter // since it's UUID, not number
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdat).getTime() - new Date(a.createdat).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdat).getTime() - new Date(b.createdat).getTime()
          );
        case "highest":
          return b.rate - a.rate;
        case "lowest":
          return a.rate - b.rate;
        default:
          return 0;
      }
    });

  const handleDeleteClick = (reviewId: string) => {
    console.log(reviewId);
    setReviewToDelete(reviewId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    console.log("hello");
    try {
      const response = await deleteCourseReview(reviewToDelete);
      console.log(response);
      console.log("hello 2");

      if (response.success) {
        setHiddenReviewIds((prev) => [...prev, reviewToDelete]);
      }

      setDeleteDialogOpen(false);
      setReviewToDelete("");
    } catch (error) {
      console.log("Error deleting review:", error);
    }
  };

  const totalInstructorReviews = instructor_reviews.length;

  const instructorRatingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = instructor_reviews.filter(
      (review) => review.rate === rating
    ).length;
    const percentage =
      totalInstructorReviews > 0
        ? Math.round((count / totalInstructorReviews) * 100)
        : 0;
    return { rating, percentage };
  });

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
                      {instructor_courses.map((course) => (
                        <SelectItem
                          key={course.courseid}
                          value={course.courseid}
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
                  <div key={review.reviewid} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                          <img
                            src={"/placeholder.svg"}
                            alt={review.users.fullname || "Student"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {review.users?.fullname || "Anonymous"}
                          </h4>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rate
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-500 ml-2">
                              {new Date(review.createdat).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            Course: {review.courses?.title || "Unknown Course"}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(review.reviewid)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    <p className="mt-3">{review.description}</p>
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
                    {instructor_average_rating}
                  </div>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(instructor_average_rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Based on {totalInstructorReviews}{" "}
                    {totalInstructorReviews === 1 ? "review" : "reviews"}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">
                  Rating Distribution
                </h3>
                <div className="mt-6 space-y-4">
                  {instructorRatingDistribution.map(
                    ({ rating, percentage }) => (
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
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Student Testimonials</CardTitle>
                <CardDescription>
                  What students are saying about your teaching style
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {instructor_reviews.map((review) => (
                    <div
                      key={review.reviewid}
                      className="p-4 border rounded-lg"
                    >
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 overflow-hidden">
                          <img
                            src={"/placeholder.svg"}
                            alt={review.users.fullname}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {review.users.fullname}
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(review.createdat).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="mt-3">{review.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* <Card>
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
          </Card> */}
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
