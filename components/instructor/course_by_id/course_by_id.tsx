"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
  Users,
  Star,
  Clock,
  Eye,
  MessageSquare,
  FileText,
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import moment from "moment";
import { Course_2, Course_by_id } from "@/types/types";
import dynamic from "next/dynamic";
import React, { useRef, useState } from "react";
import { RichTextEditorHandle } from "@/components/quill_editor/quill_editor";

export default function CourseDetailPage({ course }: { course: Course_by_id }) {
  const [activeTab, setActiveTab] = useState("content");
  const [deleteModuleDialogOpen, setDeleteModuleDialogOpen] = useState(false);
  const [deleteLessonDialogOpen, setDeleteLessonDialogOpen] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState<string | null>(null);
  const [lessonToDelete, setLessonToDelete] = useState<{
    moduleId: number;
    lessonId: number;
  } | null>(null);
  const [expandedModule, setExpandedModule] = useState<number | null>(1);
  const [expandedLesson, setExpandedLesson] = useState<{
    moduleId: number;
    lessonId: number;
  } | null>(null);

  const toggleModule = (moduleId: number) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
    setExpandedLesson(null);
  };

  const toggleLesson = (moduleId: number, lessonId: number) => {
    const newExpandedLesson =
      expandedLesson?.moduleId === moduleId &&
      expandedLesson?.lessonId === lessonId
        ? null
        : { moduleId, lessonId };

    setExpandedLesson(newExpandedLesson);
  };

  const handleDeleteModule = (moduleId: string) => {
    setModuleToDelete(moduleId);
    setDeleteModuleDialogOpen(true);
  };

  const handleDeleteLesson = (moduleId: number, lessonId: number) => {
    setLessonToDelete({ moduleId, lessonId });
    setDeleteLessonDialogOpen(true);
  };

  const confirmDeleteModule = () => {
    // In a real app, this would call an API to delete the module
    console.log(`Deleting module ${moduleToDelete}`);
    setDeleteModuleDialogOpen(false);
    setModuleToDelete(null);
  };

  const confirmDeleteLesson = () => {
    // In a real app, this would call an API to delete the lesson
    console.log(
      `Deleting lesson ${lessonToDelete?.lessonId} from module ${lessonToDelete?.moduleId}`
    );
    setDeleteLessonDialogOpen(false);
    setLessonToDelete(null);
  };
  const totalReviews = course.reviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = course.reviews.filter(
      (review) => review.rate === rating
    ).length;
    const percentage =
      totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { rating, percentage };
  });

  const editorRef = useRef<RichTextEditorHandle>(null);
  const [content, setContent] = useState<string>("");

  const handleGetContent = () => {
    if (editorRef.current) {
      const html = editorRef.current.getContent();
      setContent(html);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link
            href="/instructor/courses"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Link>
        </Button>
      </div>

      {/* Course Overview & Quick Actions */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="lg:w-1/3">
          <Image
            src={"/placeholder.svg"}
            alt={course.title}
            width={300}
            height={200}
            className="w-full rounded-lg"
          />
        </div>
        <div className="lg:w-2/3">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {course.title}
              </h1>
              <Badge
                className="ml-3"
                variant={
                  course.status === "published" ? "default" : "secondary"
                }
              >
                {course.status === "published" ? "Published" : "Draft"}
              </Badge>
            </div>
            <div className="mt-4 ml-2 md:mt-0">
              <Button>
                <Edit className="mr-2 h-4 w-4" />
                Edit Course Details
              </Button>
            </div>
          </div>

          {/* <p className="text-gray-600 dark:text-gray-300 mb-6">
            {course.overview}
          </p> */}
          <div>
            <div
              className="
                    rendered-html
                    [&_h1]:text-3xl [&_h1]:font-bold
                    [&_h2]:text-2xl [&_h2]:font-semibold
                    [&_h3]:text-xl [&_h3]:font-semibold
                    [&_h4]:text-lg [&_h4]:font-medium
                    [&_h5]:text-base [&_h5]:font-medium
                    [&_h6]:text-sm [&_h6]:font-medium

                    [&_p]:text-base [&_p]:leading-relaxed [&_p]:mb-4
                    [&_span]:text-base
                    [&_strong]:font-bold
                    [&_em]:italic
                    [&_a]:text-blue-600 [&_a]:underline [&_a:hover]:text-blue-800
                    [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
                    [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                    [&_li]:mb-1
                    [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600
                    "
              dangerouslySetInnerHTML={{ __html: course.overview }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Students</p>
                <p className="font-medium">students count</p>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Rating</p>
                <p className="font-medium">
                  {course.averageRating} ({course.reviewCount} reviews)
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="font-medium">
                  {new Date(course.updatedat).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link href={`/courses/${course.courseid}`} target="_blank">
                <Eye className="mr-2 h-4 w-4" />
                Preview Course
              </Link>
            </Button>
            {course.status === "draft" ? (
              <Button>Publish Course</Button>
            ) : (
              <Button variant="outline">Unpublish Course</Button>
            )}
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Course
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs for Course Management */}
      <Tabs defaultValue="content" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="content" onClick={() => setActiveTab("content")}>
            <FileText className="mr-2 h-4 w-4" />
            Course Content
          </TabsTrigger>
          {/* <TabsTrigger value="forum" onClick={() => setActiveTab("forum")}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Forum & Discussions
          </TabsTrigger> */}
          <TabsTrigger value="reviews" onClick={() => setActiveTab("reviews")}>
            <Star className="mr-2 h-4 w-4" />
            Reviews & Ratings
          </TabsTrigger>
          <TabsTrigger
            value="students"
            onClick={() => setActiveTab("students")}
          >
            <Users className="mr-2 h-4 w-4" />
            Enrolled Students
          </TabsTrigger>
        </TabsList>

        {/* Course Content Tab */}
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Course Lessons & Content</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Module
                </Button>
              </div>
              <CardDescription>
                Organize your course content into modules and lessons
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Modules Section */}
              <div className="space-y-4">
                {course.module?.map((module, moduleIndex) => (
                  <div
                    key={moduleIndex}
                    className="border rounded-lg overflow-hidden"
                  >
                    {/* Module Header */}
                    <div
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 cursor-pointer"
                      onClick={() => toggleModule(moduleIndex)}
                    >
                      <div className="flex items-center">
                        <span className="font-medium">
                          Module {moduleIndex}:
                        </span>
                        <span className="ml-2">{module.title}</span>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mr-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Edit module logic
                          }}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mr-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteModule(module.moduleid);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                        {expandedModule === moduleIndex ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </div>

                    {/* Module Content (Lessons) */}
                    {expandedModule === moduleIndex && (
                      <div className="p-4 border-t">
                        <div className="mb-4">
                          <p className="text-sm text-gray-500 mb-2">
                            Module Description:
                          </p>
                          <p>{module.overview}</p>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Lessons</h4>
                          <Button size="sm">
                            <Plus className="mr-2 h-3 w-3" />
                            Add Lesson
                          </Button>
                        </div>

                        <div className="space-y-3">
                          {module.lesson?.map((lesson, lessonIndex) => (
                            <div
                              key={lessonIndex}
                              className="border rounded-lg overflow-hidden"
                            >
                              {/* Lesson Header */}
                              <div
                                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 cursor-pointer"
                                onClick={() =>
                                  toggleLesson(moduleIndex, lessonIndex)
                                }
                              >
                                <div>
                                  <span className="font-medium">
                                    Lesson {lessonIndex}:
                                  </span>
                                  <span className="ml-2">{lesson.title}</span>
                                  {/* <span className="ml-2 text-sm text-gray-500">
                                    ({lesson.duration})
                                  </span> */}
                                </div>
                                <div className="flex items-center">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mr-2"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Edit lesson logic
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mr-2"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteLesson(
                                        moduleIndex,
                                        lessonIndex
                                      );
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                  {expandedLesson?.moduleId === moduleIndex &&
                                  expandedLesson?.lessonId === lessonIndex ? (
                                    <ChevronUp className="h-5 w-5 text-gray-500" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5 text-gray-500" />
                                  )}
                                </div>
                              </div>

                              {/* Lesson Content (Pages) */}
                              {expandedLesson?.moduleId === moduleIndex &&
                                expandedLesson?.lessonId === lessonIndex && (
                                  <div className="p-3 border-t">
                                    <div className="mb-4">
                                      <p className="text-sm text-gray-500 mb-2">
                                        Lesson Description:
                                      </p>
                                      <p>{lesson.overview}</p>
                                    </div>

                                    <div className="flex justify-between items-center mb-4">
                                      <h5 className="font-medium">Pages</h5>
                                      <Button size="sm">
                                        <Plus className="mr-2 h-3 w-3" />
                                        Add Page
                                      </Button>
                                    </div>

                                    <div className="space-y-2">
                                      {lesson.page?.map((page, pageIndex) => (
                                        <div
                                          key={pageIndex}
                                          className="flex items-center justify-between p-2 border rounded-lg"
                                        >
                                          <span>
                                            Page {pageIndex}: {page.title}
                                          </span>
                                          <div className="flex items-center">
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="mr-1"
                                            >
                                              <Edit className="h-4 w-4" />
                                              <span className="sr-only">
                                                Edit
                                              </span>
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                              <Trash2 className="h-4 w-4" />
                                              <span className="sr-only">
                                                Delete
                                              </span>
                                            </Button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forum & Discussions Tab */}
        {/* <TabsContent value="forum">
          <Card>
            <CardHeader>
              <CardTitle>Course Forum & Discussions</CardTitle>
              <CardDescription>
                View and respond to student questions and discussions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500">Total Topics</p>
                  <p className="text-2xl font-bold">
                    {course.forum.totalTopics}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Unanswered Questions</p>
                  <p className="text-2xl font-bold text-orange-500">
                    {course.forum.unansweredQuestions}
                  </p>
                </div>
                <div>
                  <Button>View Unanswered Questions</Button>
                </div>
              </div>

              <div className="mb-6">
                <div className="relative">
                  <Input
                    placeholder="Search forum topics..."
                    className="pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">
                        How do I implement useContext with TypeScript?
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Posted by John Doe • 2 days ago
                      </p>
                    </div>
                    <Badge>Unanswered</Badge>
                  </div>
                  <p className="mt-2">
                    I'm having trouble implementing the Context API with
                    TypeScript. Can someone help me understand how to properly
                    type the context and provider?
                  </p>
                  <div className="mt-3">
                    <Button variant="outline" size="sm">
                      Reply
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">
                        Best practices for handling form state?
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Posted by Jane Smith • 5 days ago
                      </p>
                    </div>
                    <Badge variant="outline">Answered</Badge>
                  </div>
                  <p className="mt-2">
                    What's the recommended approach for managing form state in a
                    large React application? Should I use a library or stick
                    with useState?
                  </p>
                  <div className="mt-3">
                    <Button variant="outline" size="sm">
                      View Replies (3)
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline">View All Forum Topics</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}

        {/* Reviews & Ratings Tab */}
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Course Reviews & Ratings</CardTitle>
              <CardDescription>
                View student ratings and feedback for your course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="md:w-1/3 flex flex-col items-center justify-center">
                  <div className="text-5xl font-bold">
                    {course.averageRating}
                  </div>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(course.averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Based on {course.reviewCount}{" "}
                    {totalReviews === 1 ? "review" : "reviews"}
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h4 className="font-medium mb-4">Rating Distribution</h4>
                  <div className="mt-6 space-y-4">
                    {ratingDistribution.map(({ rating, percentage }) => (
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
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="space-y-6">
                  {course.reviews.map((review) => (
                    <div
                      key={review.reviewid}
                      className="rounded-lg border p-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={"/placeholder.svg"}
                            alt={review.user.fullname}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {review.user.fullname}
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {Array(5)
                                .fill(null)
                                .map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rate ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                  </svg>
                                ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {moment(review.createdat).format("YYYY-MM-DD")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4">{review.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <Button variant="outline">Load More Reviews</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enrolled Students Tab */}
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Students</CardTitle>
              <CardDescription>
                Manage students enrolled in this course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="relative">
                  <Input placeholder="Search students..." className="pl-10" />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">
                        Student
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-500">
                        Progress
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-500">
                        Last Active
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-500">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Student rows - This would be populated from API */}
                    <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                          <div>
                            <span className="font-medium block">
                              John Smith
                            </span>
                            <span className="text-sm text-gray-500">
                              john.smith@example.com
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <div className="flex flex-col items-center">
                          <div className="w-full max-w-[120px] bg-gray-200 rounded-full h-2.5 mb-1">
                            <div
                              className="bg-green-600 h-2.5 rounded-full"
                              style={{ width: "75%" }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500">
                            75% Complete
                          </span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span>2 days ago</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <div className="flex items-center justify-center space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/instructor/students/1`}>
                              View Progress
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm">
                            Message
                          </Button>
                        </div>
                      </td>
                    </tr>

                    <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                          <div>
                            <span className="font-medium block">
                              Emily Johnson
                            </span>
                            <span className="text-sm text-gray-500">
                              emily.j@example.com
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <div className="flex flex-col items-center">
                          <div className="w-full max-w-[120px] bg-gray-200 rounded-full h-2.5 mb-1">
                            <div
                              className="bg-green-600 h-2.5 rounded-full"
                              style={{ width: "100%" }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500">
                            100% Complete
                          </span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span>1 week ago</span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <div className="flex items-center justify-center space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/instructor/students/2`}>
                              View Progress
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm">
                            Message
                          </Button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline">View All Students</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Module Confirmation Dialog */}
      <Dialog
        open={deleteModuleDialogOpen}
        onOpenChange={setDeleteModuleDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Module</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this module? This will also delete
              all lessons and content within this module. This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteModuleDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteModule}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Lesson Confirmation Dialog */}
      <Dialog
        open={deleteLessonDialogOpen}
        onOpenChange={setDeleteLessonDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Lesson</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this lesson? This will also delete
              all content within this lesson. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteLessonDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteLesson}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
