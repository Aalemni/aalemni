"use server";
import CourseDetail from "@/components/instructor/course_by_id/course_by_id";
import React from "react";
import { Course_2 } from "@/types/types";
import { type Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getCourse(id: string): Promise<Course_2> {
  return {
    id: Number.parseInt(id),
    title: "Advanced Web Development with React",
    thumbnail: "/placeholder.svg?height=200&width=300",
    description:
      "Master modern web development with React, Next.js, and related technologies. This comprehensive course covers everything from the basics to advanced concepts.",
    students: 342,
    rating: 4.9,
    lastUpdated: "2025-03-15",
    status: "published",
    category: "Web Development",
    modules: [
      {
        id: 1,
        title: "Introduction to React",
        description:
          "Learn the fundamentals of React and component-based architecture",
        lessons: [
          {
            id: 1,
            title: "What is React?",
            description: "An introduction to React and its core concepts",
            duration: "15 min",
            pages: [
              { id: 1, title: "Introduction" },
              { id: 2, title: "Core Concepts" },
              { id: 3, title: "Setting Up Your Environment" },
            ],
          },
          {
            id: 2,
            title: "Components and Props",
            description:
              "Understanding React components and how to pass data with props",
            duration: "25 min",
            pages: [
              { id: 1, title: "Component Types" },
              { id: 2, title: "Props in Detail" },
              { id: 3, title: "Component Composition" },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "State Management",
        description: "Learn how to manage state in React applications",
        lessons: [
          {
            id: 1,
            title: "useState Hook",
            description:
              "Managing local component state with the useState hook",
            duration: "20 min",
            pages: [
              { id: 1, title: "Introduction to Hooks" },
              { id: 2, title: "useState Basics" },
              { id: 3, title: "Complex State Management" },
            ],
          },
          {
            id: 2,
            title: "Context API",
            description: "Managing global state with React Context",
            duration: "30 min",
            pages: [
              { id: 1, title: "Context API Overview" },
              { id: 2, title: "Creating a Context" },
              { id: 3, title: "Consuming Context" },
            ],
          },
        ],
      },
    ],
    forum: {
      totalTopics: 24,
      unansweredQuestions: 3,
    },
    reviews: {
      total: 78,
      average: 4.9,
      distribution: [
        { stars: 5, count: 65 },
        { stars: 4, count: 10 },
        { stars: 3, count: 2 },
        { stars: 2, count: 1 },
        { stars: 1, count: 0 },
      ],
    },
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourse(id);

  return {
    title: course.title,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const course = await getCourse(id);
  return (
    <>
      <CourseDetail course={course} />
    </>
  );
}
