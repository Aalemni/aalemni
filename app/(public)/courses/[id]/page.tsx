"use server";

import CourseDetailPage from "@/components/course_by_id/course_by_id";
import { getCourseById } from "@/supabase/actions/course_actions";
import { Course, Course_by_id } from "@/types/types"; // If you created a separate type file
import { type Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getCourse(id: string): Promise<Course> {
  return {
    id: Number.parseInt(id),
    title: "Complete React Developer in 2023",
    image: "/placeholder.svg?height=400&width=1200&text=React+Course+Banner",
    instructor: {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Web Development Expert",
      image: "/placeholder.svg?height=100&width=100&text=SJ",
      rating: 4.9,
      reviewCount: 842,
    },
    rating: 4.9,
    reviewCount: 342,
    studentCount: 5840,
    level: "All Levels",
    duration: {
      hours: 42,
      weeks: 8,
    },
    price: "$89.99",
    discountPrice: "$69.99",
    discountEnds: "2023-05-30",
    tags: ["React", "JavaScript", "Web Development", "Frontend"],
    overview: `<h2>Course Description</h2><br>

<p>This comprehensive <span><b>React</b></span> course will take you from beginner to advanced developer.</p>
<p>You'll learn all the fundamentals of React, including hooks, state management, routing, and more.</p>
<p>By the end of this course, you'll be able to build complex, production-ready React applications.</p>

<p>The course is project-based, meaning you'll be building real applications as you learn.</p>
<p>This hands-on approach ensures that you not only understand the concepts but can apply them in real-world scenarios.</p>

<p>Whether you're looking to land your first job as a React developer or enhance your existing skills, this course has everything you need to succeed.</p>
`,
    syllabus: [
      {
        title: "Week 1: Introduction to React",
        date: "Apr 12 - Apr 18",
        classes: [
          {
            title: "Class 1: Intro, React Fundamentals, JSX",
            date: "APR 12",
            dayOfWeek: "SAT",
            sessions: [
              {
                title: "Course start: Join 15 minutes early for setup",
                time: "6:45 PM—7:00 PM (GMT+3)",
                type: "Online",
              },
              {
                title: "React Fundamentals Class with Dr. Sarah",
                time: "7:00 PM—12:00 AM (GMT+3)",
                type: "Online",
              },
              {
                title: "Optional: Q&A with Dr. Sarah",
                date: "APR 13",
                dayOfWeek: "SUN",
                time: "12:00 AM—1:00 AM (GMT+3)",
                type: "Online",
              },
            ],
            moreItems: 2,
          },
          {
            title: "Class 2: Components, Props, State",
            date: "APR 13",
            dayOfWeek: "SUN",
            sessions: [
              {
                title: "React Components Class with Dr. Sarah",
                time: "7:00 PM—12:00 AM (GMT+3)",
                type: "Online",
              },
              {
                title: "Optional: Q&A with Dr. Sarah",
                date: "APR 14",
                dayOfWeek: "MON",
                time: "12:00 AM—1:00 AM (GMT+3)",
                type: "Online",
              },
            ],
            moreItems: 3,
          },
        ],
      },
      {
        title: "Week 2: React Hooks and State Management",
        date: "Apr 19 - Apr 25",
        classes: [
          {
            title: "Class 3: React Hooks Deep Dive",
            date: "APR 19",
            dayOfWeek: "SAT",
            sessions: [
              {
                title: "React Hooks Class with Dr. Sarah",
                time: "7:00 PM—12:00 AM (GMT+3)",
                type: "Online",
              },
            ],
            moreItems: 2,
          },
          {
            title: "Class 4: State Management with Context API and Redux",
            date: "APR 20",
            dayOfWeek: "SUN",
            sessions: [
              {
                title: "State Management Class with Dr. Sarah",
                time: "7:00 PM—12:00 AM (GMT+3)",
                type: "Online",
              },
            ],
            moreItems: 3,
          },
        ],
      },
      {
        title: "Week 3: Routing and API Integration",
        date: "Apr 26 - May 2",
        classes: [],
      },
      {
        title: "Week 4: Advanced React Patterns",
        date: "May 3 - May 9",
        classes: [],
      },
      {
        title: "Week 5: Testing and Debugging",
        date: "May 10 - May 16",
        classes: [],
      },
      {
        title: "Week 6: Performance Optimization",
        date: "May 17 - May 23",
        classes: [],
      },
      {
        title: "Week 7: Authentication and Authorization",
        date: "May 24 - May 30",
        classes: [],
      },
      {
        title: "Week 8: Final Project and Deployment",
        date: "May 31 - Jun 6",
        classes: [],
      },
    ],
    reviews: [
      {
        id: 1,
        name: "Michael Brown",
        image: "/placeholder.svg?height=60&width=60&text=MB",
        rating: 5,
        date: "2 months ago",
        comment:
          "This course completely changed my career trajectory. The explanations are clear and concise, and the projects are challenging but achievable. I landed a job as a React developer just two months after completing this course!",
      },
      {
        id: 2,
        name: "Jennifer Lee",
        image: "/placeholder.svg?height=60&width=60&text=JL",
        rating: 5,
        date: "3 months ago",
        comment:
          "The best React course I've ever taken. Dr. Johnson has a gift for breaking down complex concepts into understandable chunks. The course is well-structured and the pace is perfect for beginners.",
      },
      {
        id: 3,
        name: "David Wilson",
        image: "/placeholder.svg?height=60&width=60&text=DW",
        rating: 4,
        date: "1 month ago",
        comment:
          "Excellent course with practical examples and real-world applications. I would have liked more coverage of GraphQL, but overall it was a great learning experience.",
      },
    ],
    relatedCourses: [
      {
        id: 2,
        title: "Modern JavaScript from the Beginning",
        image: "/placeholder.svg?height=200&width=360&text=JavaScript+Course",
        instructor: "Dr. Sarah Johnson",
        rating: 4.8,
        price: "$69.99",
      },
      {
        id: 3,
        title: "Node.js API Masterclass",
        image: "/placeholder.svg?height=200&width=360&text=Node.js+Course",
        instructor: "Dr. Sarah Johnson",
        rating: 4.9,
        price: "$79.99",
      },
      {
        id: 4,
        title: "Full-Stack Web Development",
        image: "/placeholder.svg?height=200&width=360&text=Full-Stack+Course",
        instructor: "Michael Chen",
        rating: 4.7,
        price: "$99.99",
      },
    ],
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
  const coursee = await getCourseById(id);
  return <CourseDetailPage course={coursee.data} />;
}
