"use server";

import CourseDetailPage from "@/components/course_by_id/course_by_id";

export default async function Page({ params }: { params: { id: string } }) {
  const course = getCourse(params.id);

  return <CourseDetailPage course={course} />;
}

// This would normally come from a database
const getCourse = (id: string) => {
  // Mock data for a specific course
  return {
    id: Number.parseInt(id),
    title: "Complete React Developer in 2023",
    subtitle:
      "Learn React by building real projects. Includes hooks, Redux, GraphQL, and more.",
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
    lastUpdated: "March 2023",
    language: "English",
    format: "Online", // or "In-Person" or "Hybrid"
    duration: {
      hours: 42,
      weeks: 8,
    },
    price: "$89.99",
    discountPrice: "$69.99",
    discountEnds: "2023-05-30",
    tags: ["React", "JavaScript", "Web Development", "Frontend"],
    description: `
      This comprehensive React course will take you from beginner to advanced developer. You'll learn all the fundamentals of React, including hooks, state management, routing, and more. By the end of this course, you'll be able to build complex, production-ready React applications.

      The course is project-based, meaning you'll be building real applications as you learn. This hands-on approach ensures that you not only understand the concepts but can apply them in real-world scenarios.

      Whether you're looking to land your first job as a React developer or enhance your existing skills, this course has everything you need to succeed.
    `,
    whatYouWillLearn: [
      "Build powerful, fast, user-friendly, and reactive web apps",
      "Apply for high-paid jobs or work as a freelancer in one of the most in-demand sectors",
      "Provide amazing user experiences by leveraging the power of JavaScript with ease",
      "Learn all about React Hooks and React Components",
      "Manage complex state efficiently with Redux",
      "Implement user authentication and authorization",
      "Handle forms and user input validation",
      "Connect to databases and REST APIs",
      "Deploy your React apps to production",
      "Understand the latest features in React 18",
    ],
    prerequisites: [
      "Basic knowledge of HTML, CSS, and JavaScript",
      "No prior React knowledge is required",
      "A computer with internet access",
    ],
    targetAudience: [
      "Beginners who want to learn React from scratch",
      "JavaScript developers who want to expand their skillset",
      "Developers who want to build modern, responsive web applications",
      "Anyone interested in frontend development",
    ],
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
    resources: [
      {
        title: "Course Slides",
        type: "PDF",
        size: "15MB",
        url: "#",
      },
      {
        title: "Starter Code",
        type: "ZIP",
        size: "5MB",
        url: "#",
      },
      {
        title: "React Cheat Sheet",
        type: "PDF",
        size: "2MB",
        url: "#",
      },
    ],
    projects: [
      {
        title: "E-commerce Application",
        description:
          "Build a fully functional e-commerce application with React, Redux, and Firebase.",
        image: "/placeholder.svg?height=200&width=360&text=E-commerce+Project",
      },
      {
        title: "Social Media Dashboard",
        description:
          "Create a responsive social media dashboard with real-time updates using React and WebSockets.",
        image: "/placeholder.svg?height=200&width=360&text=Dashboard+Project",
      },
      {
        title: "Portfolio Website",
        description:
          "Design and develop a personal portfolio website with React and Tailwind CSS.",
        image: "/placeholder.svg?height=200&width=360&text=Portfolio+Project",
      },
    ],
    faqs: [
      {
        question: "Do I need to know JavaScript before taking this course?",
        answer:
          "Yes, a basic understanding of JavaScript is required. You should be familiar with concepts like variables, functions, arrays, and objects.",
      },
      {
        question: "Will I receive a certificate upon completion?",
        answer:
          "Yes, you will receive a certificate of completion that you can add to your resume or LinkedIn profile.",
      },
      {
        question: "How long do I have access to the course materials?",
        answer:
          "You will have lifetime access to all course materials, including any future updates.",
      },
      {
        question: "Is there a refund policy?",
        answer:
          "Yes, we offer a 30-day money-back guarantee if you're not satisfied with the course.",
      },
      {
        question: "Can I ask questions if I get stuck?",
        answer:
          "You can ask questions in the course discussion forum, and the instructor or teaching assistants will respond within 24-48 hours.",
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
};
