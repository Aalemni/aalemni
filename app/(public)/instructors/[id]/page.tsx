"use server";

import { InstructorById } from "@/components/instructor_by_id/instructor_by_id";
import { Instructor } from "@/types/types";
import { type Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// This would normally come from a database
const getInstructor = (id: string): Instructor => {
  // Mock data for a specific instructor
  return {
    id: Number.parseInt(id),
    name: "Dr. Sarah Johnson",
    title: "Web Development Expert",
    image: "/placeholder.svg?height=400&width=400&text=SJ",
    coverImage: "/placeholder.svg?height=400&width=1200&text=Cover+Image",
    rating: 4.9,
    reviewCount: 842,
    studentCount: 15420,
    courseCount: 8,
    specialties: [
      "JavaScript",
      "React",
      "Node.js",
      "Full-Stack Development",
      "Web Design",
    ],
    bio: "Former Google engineer with 10+ years of experience in web development. Passionate about teaching modern JavaScript frameworks and helping students build real-world applications.",
    featured: true,
    languages: ["English", "Spanish"],
    price: "$19.99/hour",
    location: "San Francisco, CA",
    experience: "12+ years",
    education: [
      {
        degree: "Ph.D. in Computer Science",
        institution: "Stanford University",
        year: "2012",
      },
      {
        degree: "M.S. in Computer Science",
        institution: "MIT",
        year: "2008",
      },
    ],
    certifications: [
      "AWS Certified Solutions Architect",
      "Google Cloud Professional Developer",
      "MongoDB Certified Developer",
    ],
    about:
      "I'm Dr. Sarah Johnson, a passionate educator and web development expert with over 12 years of industry experience. After working at Google and several tech startups, I decided to focus on teaching and helping others build their skills in web development.\n\nMy teaching philosophy centers on practical, project-based learning. I believe that the best way to learn programming is by building real applications and solving real problems. My courses are designed to give you hands-on experience while explaining complex concepts in simple terms.\n\nI specialize in modern JavaScript frameworks like React and Node.js, and I'm constantly updating my courses to reflect the latest industry trends and best practices. Whether you're a complete beginner or an experienced developer looking to expand your skills, my goal is to help you become a confident and competent web developer.",
    courses: [
      {
        id: 1,
        title: "Complete React Developer in 2023",
        image: "/placeholder.svg?height=200&width=360&text=React+Course",
        rating: 4.9,
        reviewCount: 342,
        studentCount: 5840,
        level: "All Levels",
        hours: 42,
        price: "$89.99",
        description:
          "Learn React by building real projects. Includes hooks, Redux, GraphQL, and more.",
      },
      {
        id: 2,
        title: "Modern JavaScript from the Beginning",
        image: "/placeholder.svg?height=200&width=360&text=JavaScript+Course",
        rating: 4.8,
        reviewCount: 287,
        studentCount: 4320,
        level: "Beginner",
        hours: 36,
        price: "$69.99",
        description:
          "Master JavaScript fundamentals including ES6+ features, asynchronous programming, and DOM manipulation.",
      },
      {
        id: 3,
        title: "Node.js API Masterclass",
        image: "/placeholder.svg?height=200&width=360&text=Node.js+Course",
        rating: 4.9,
        reviewCount: 213,
        studentCount: 3260,
        level: "Intermediate",
        hours: 28,
        price: "$79.99",
        description:
          "Build a complete backend REST API with Node.js, Express, MongoDB, and JWT authentication.",
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
          "Dr. Johnson's React course completely changed my career trajectory. Her explanations are clear and concise, and the projects are challenging but achievable. I landed a job as a React developer just two months after completing her course!",
      },
      {
        id: 2,
        name: "Jennifer Lee",
        image: "/placeholder.svg?height=60&width=60&text=JL",
        rating: 5,
        date: "3 months ago",
        comment:
          "The best JavaScript course I've ever taken. Sarah has a gift for breaking down complex concepts into understandable chunks. The course is well-structured and the pace is perfect for beginners.",
      },
      {
        id: 3,
        name: "David Wilson",
        image: "/placeholder.svg?height=60&width=60&text=DW",
        rating: 4,
        date: "1 month ago",
        comment:
          "Excellent Node.js course with practical examples and real-world applications. I would have liked more coverage of GraphQL, but overall it was a great learning experience.",
      },
    ],
    schedule: [
      {
        id: 1,
        title: "JavaScript Fundamentals Q&A",
        date: "Tomorrow",
        time: "10:00 AM - 11:30 AM",
        spots: "12/20 spots available",
      },
      {
        id: 2,
        title: "React Hooks Workshop",
        date: "May 25, 2023",
        time: "2:00 PM - 4:00 PM",
        spots: "8/15 spots available",
      },
      {
        id: 3,
        title: "Code Review Session",
        date: "May 28, 2023",
        time: "1:00 PM - 2:30 PM",
        spots: "5/10 spots available",
      },
    ],
  };
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const course = await getInstructor(id);

  return {
    title: course.title,
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const instructor = getInstructor(id);

  return (
    <>
      <InstructorById instructor={instructor} />
    </>
  );
}
