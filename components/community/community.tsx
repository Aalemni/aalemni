import { AccordionContent } from "@/components/ui/accordion";
import { AccordionTrigger } from "@/components/ui/accordion";
import { AccordionItem } from "@/components/ui/accordion";
import { Accordion } from "@/components/ui/accordion";
import Link from "next/link";
import Image from "next/image";
import {
  MessageSquare,
  Users,
  BookOpen,
  Search,
  Send,
  Plus,
  Filter,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/uii_/button";
import { Badge } from "@/components/uii_/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/uii_/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Mock data for communities
const communities = [
  {
    id: 1,
    name: "Web Development",
    description:
      "Discuss the latest web technologies, frameworks, and best practices.",
    members: 5240,
    topics: 1872,
    image: "/placeholder.svg?height=200&width=200&text=WebDev",
    category: "Technology",
    featured: true,
  },
  {
    id: 2,
    name: "Data Science",
    description:
      "Share insights, tools, and techniques for data analysis and machine learning.",
    members: 4180,
    topics: 1543,
    image: "/placeholder.svg?height=200&width=200&text=DataSci",
    category: "Technology",
    featured: true,
  },
  {
    id: 3,
    name: "UX/UI Design",
    description:
      "Exchange ideas on user experience, interface design, and usability.",
    members: 3650,
    topics: 1298,
    image: "/placeholder.svg?height=200&width=200&text=UX/UI",
    category: "Design",
    featured: true,
  },
  {
    id: 4,
    name: "Business Strategy",
    description:
      "Discuss business models, market analysis, and strategic planning.",
    members: 2980,
    topics: 1087,
    image: "/placeholder.svg?height=200&width=200&text=Business",
    category: "Business",
    featured: false,
  },
  {
    id: 5,
    name: "Digital Marketing",
    description:
      "Share marketing strategies, SEO techniques, and content creation tips.",
    members: 3120,
    topics: 1156,
    image: "/placeholder.svg?height=200&width=200&text=Marketing",
    category: "Marketing",
    featured: false,
  },
  {
    id: 6,
    name: "Mobile Development",
    description: "Discuss iOS, Android, and cross-platform mobile development.",
    members: 2870,
    topics: 1043,
    image: "/placeholder.svg?height=200&width=200&text=Mobile",
    category: "Technology",
    featured: false,
  },
  {
    id: 7,
    name: "Cybersecurity",
    description:
      "Exchange knowledge on security practices, tools, and threat prevention.",
    members: 2540,
    topics: 932,
    image: "/placeholder.svg?height=200&width=200&text=Security",
    category: "Technology",
    featured: false,
  },
  {
    id: 8,
    name: "Personal Development",
    description:
      "Share tips and strategies for personal growth and productivity.",
    members: 3840,
    topics: 1432,
    image: "/placeholder.svg?height=200&width=200&text=Personal",
    category: "Lifestyle",
    featured: false,
  },
];

// Mock data for enrolled courses with group chats
const enrolledCourses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Sarah Johnson",
    image: "/placeholder.svg?height=200&width=360&text=Web+Dev",
    lastMessage: "Don't forget to submit your project by Friday!",
    lastMessageTime: "2 hours ago",
    unreadCount: 3,
  },
  {
    id: 2,
    title: "Data Science and Machine Learning",
    instructor: "Michael Chen",
    image: "/placeholder.svg?height=200&width=360&text=Data+Science",
    lastMessage: "I've posted the solutions to yesterday's exercise.",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    instructor: "Emily Rodriguez",
    image: "/placeholder.svg?height=200&width=360&text=UI/UX",
    lastMessage: "Great work on the wireframes everyone!",
    lastMessageTime: "3 days ago",
    unreadCount: 0,
  },
];

// Mock data for discussions
const discussions = [
  {
    id: 1,
    title: "How to optimize React performance?",
    author: "John Doe",
    authorImage: "/placeholder.svg?height=40&width=40&text=JD",
    community: "Web Development",
    replies: 24,
    views: 342,
    lastActivity: "2 hours ago",
    tags: ["React", "Performance", "JavaScript"],
  },
  {
    id: 2,
    title: "Best practices for data visualization",
    author: "Sarah Smith",
    authorImage: "/placeholder.svg?height=40&width=40&text=SS",
    community: "Data Science",
    replies: 18,
    views: 276,
    lastActivity: "5 hours ago",
    tags: ["Visualization", "D3.js", "Python"],
  },
  {
    id: 3,
    title: "User testing methods for mobile apps",
    author: "Michael Brown",
    authorImage: "/placeholder.svg?height=40&width=40&text=MB",
    community: "UX/UI Design",
    replies: 31,
    views: 420,
    lastActivity: "Yesterday",
    tags: ["User Testing", "Mobile", "UX Research"],
  },
  {
    id: 4,
    title: "Setting up a CI/CD pipeline for Node.js",
    author: "Emily Chen",
    authorImage: "/placeholder.svg?height=40&width=40&text=EC",
    community: "Web Development",
    replies: 15,
    views: 198,
    lastActivity: "2 days ago",
    tags: ["DevOps", "Node.js", "CI/CD"],
  },
  {
    id: 5,
    title: "Implementing authentication with JWT",
    author: "David Wilson",
    authorImage: "/placeholder.svg?height=40&width=40&text=DW",
    community: "Web Development",
    replies: 27,
    views: 312,
    lastActivity: "3 days ago",
    tags: ["Authentication", "Security", "JWT"],
  },
];

// Mock data for a specific group chat
const groupChatMessages = [
  {
    id: 1,
    sender: "Dr. Sarah Johnson",
    senderRole: "Instructor",
    senderImage: "/placeholder.svg?height=40&width=40&text=SJ",
    content:
      "Welcome to the Web Development Bootcamp group chat! This is where we'll discuss course materials, answer questions, and share resources.",
    timestamp: "Monday, 10:00 AM",
  },
  {
    id: 2,
    sender: "John Doe",
    senderRole: "Student",
    senderImage: "/placeholder.svg?height=40&width=40&text=JD",
    content:
      "Thanks for setting this up! I have a question about the JavaScript assignment from Module 2.",
    timestamp: "Monday, 10:15 AM",
  },
  {
    id: 3,
    sender: "Dr. Sarah Johnson",
    senderRole: "Instructor",
    senderImage: "/placeholder.svg?height=40&width=40&text=SJ",
    content: "Of course, John. What specifically are you having trouble with?",
    timestamp: "Monday, 10:18 AM",
  },
  {
    id: 4,
    sender: "John Doe",
    senderRole: "Student",
    senderImage: "/placeholder.svg?height=40&width=40&text=JD",
    content:
      "I'm struggling with the async/await part. Could you explain how it differs from promises?",
    timestamp: "Monday, 10:22 AM",
  },
  {
    id: 5,
    sender: "Dr. Sarah Johnson",
    senderRole: "Instructor",
    senderImage: "/placeholder.svg?height=40&width=40&text=SJ",
    content:
      "Great question! Async/await is actually syntactic sugar built on top of promises. It makes asynchronous code look and behave more like synchronous code, which can be easier to understand and maintain. Let me share a code example to illustrate...",
    timestamp: "Monday, 10:30 AM",
  },
  {
    id: 6,
    sender: "Emily Wilson",
    senderRole: "Student",
    senderImage: "/placeholder.svg?height=40&width=40&text=EW",
    content:
      "That explanation really helped me too! I was confused about the same thing.",
    timestamp: "Monday, 10:45 AM",
  },
  {
    id: 7,
    sender: "Dr. Sarah Johnson",
    senderRole: "Instructor",
    senderImage: "/placeholder.svg?height=40&width=40&text=SJ",
    content:
      "I'm glad it was helpful! Don't forget to submit your project by Friday. If anyone needs additional help, I'll be holding office hours tomorrow at 3 PM.",
    timestamp: "Today, 9:00 AM",
  },
];

export default function CommunityPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-aalemni-navy/10 via-background to-background pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center">
              <Badge
                className="mb-4 w-fit bg-aalemni-orange text-white"
                variant="outline"
              >
                Connect & Learn Together
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-aalemni-navy sm:text-5xl md:text-6xl">
                Join Our Learning Community
              </h1>
              <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
                Connect with fellow learners, engage with instructors, and
                participate in discussions to enhance your learning experience.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
                <Button
                  size="lg"
                  className="bg-aalemni-orange hover:bg-aalemni-orange/90 text-white"
                  asChild
                >
                  <Link href="#communities">Browse Communities</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-aalemni-navy text-aalemni-navy hover:bg-aalemni-navy/10"
                  asChild
                >
                  <Link href="#my-groups">My Group Chats</Link>
                </Button>
              </div>
            </div>
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-lg rounded-lg border bg-background shadow-xl">
                <div className="aspect-video relative rounded-t-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=720&width=1280&text=Community+Discussions"
                    alt="Aalemni Community Discussions"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-aalemni-navy">
                    Collaborative Learning
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Share knowledge, ask questions, and learn from peers and
                    experts in your field.
                  </p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-12 -left-12 h-64 w-64 rounded-full bg-aalemni-orange/10 blur-3xl"></div>
              <div className="absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-aalemni-blue/10 blur-3xl"></div>
            </div>
          </div>
        </div>
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 h-full w-full">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-aalemni-blue/5 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 h-64 w-64 rounded-full bg-aalemni-orange/5 blur-3xl"></div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-16 bg-aalemni-light md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              className="mb-4 bg-aalemni-orange/10 text-aalemni-orange"
              variant="outline"
            >
              Community Features
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-aalemni-navy sm:text-4xl">
              How Our Community Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover the different ways to engage and connect on the Aalemni
              platform.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: MessageSquare,
                title: "Course Group Chats",
                description:
                  "Each course has a dedicated group chat where enrolled students can interact with their instructor and fellow learners. Ask questions, share resources, and collaborate on projects in real-time.",
              },
              {
                icon: Users,
                title: "Topic Communities",
                description:
                  "Join communities centered around specific topics or fields of interest. Engage in discussions, share knowledge, and connect with others who share your professional or academic interests.",
              },
              {
                icon: BookOpen,
                title: "Study Groups",
                description:
                  "Form or join study groups for specific courses or subjects. Work together on assignments, prepare for assessments, and support each other's learning journey.",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="h-full border-aalemni-light hover:border-aalemni-orange/20"
              >
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-aalemni-orange/10 text-aalemni-orange">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4 text-aalemni-navy">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* My Group Chats */}
      <section id="my-groups" className="py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <Badge className="mb-4" variant="outline">
                Your Courses
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                My Group Chats
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Access group chats for courses you're enrolled in.
              </p>
            </div>
            <Button variant="outline" asChild className="mt-4 md:mt-0">
              <Link href="/courses">
                Explore More Courses
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-12">
            <Tabs defaultValue="chats" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="chats">Group Chats</TabsTrigger>
                <TabsTrigger value="chat">Active Chat</TabsTrigger>
              </TabsList>
              <TabsContent value="chats" className="mt-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {enrolledCourses.map((course) => (
                    <Link
                      key={course.id}
                      href={`/community?course=${course.id}`}
                    >
                      <Card className="h-full transition-all hover:shadow-md">
                        <div className="aspect-video relative">
                          <Image
                            src={course.image || "/placeholder.svg"}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="line-clamp-1">
                            {course.title}
                          </CardTitle>
                          <CardDescription>
                            Instructor: {course.instructor}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={`/placeholder.svg?height=32&width=32&text=${course.instructor.charAt(0)}`}
                              />
                              <AvatarFallback>
                                {course.instructor.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm line-clamp-2">
                                {course.lastMessage}
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {course.lastMessageTime}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <div className="flex w-full items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              Group Chat
                            </span>
                            {course.unreadCount > 0 && (
                              <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">
                                {course.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </CardFooter>
                      </Card>
                    </Link>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="chat" className="mt-6">
                <Card>
                  <CardHeader className="border-b">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40&text=SJ" />
                        <AvatarFallback>SJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>Complete Web Development Bootcamp</CardTitle>
                        <CardDescription>
                          Group Chat • Dr. Sarah Johnson
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-[500px] overflow-y-auto p-4">
                      <div className="space-y-6">
                        {groupChatMessages.map((message) => (
                          <div key={message.id} className="flex gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={message.senderImage} />
                              <AvatarFallback>
                                {message.sender.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">
                                  {message.sender}
                                </span>
                                <Badge
                                  variant="outline"
                                  className="h-5 px-1 text-xs"
                                >
                                  {message.senderRole}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {message.timestamp}
                                </span>
                              </div>
                              <p className="mt-1">{message.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t p-4">
                    <div className="flex w-full items-center gap-2">
                      <Input
                        placeholder="Type your message..."
                        className="flex-1"
                      />
                      <Button size="icon">
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send message</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Communities */}
      <section id="communities" className="py-16 bg-aalemni-light md:py-24">
        <div className="container">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <Badge
                className="mb-4 bg-aalemni-orange/10 text-aalemni-orange"
                variant="outline"
              >
                Topic-Based
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-aalemni-navy sm:text-4xl">
                Explore Communities
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join communities based on your interests and professional goals.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search communities..."
                  className="pl-9 w-full sm:w-64"
                />
              </div>
              <Button
                variant="outline"
                className="border-aalemni-navy text-aalemni-navy hover:bg-aalemni-navy/10"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {communities.map((community) => (
              <Link key={community.id} href={`/community/${community.id}`}>
                <Card className="h-full transition-all hover:shadow-md border-aalemni-light hover:border-aalemni-orange/20">
                  <div className="aspect-square relative">
                    <Image
                      src={community.image || "/placeholder.svg"}
                      alt={community.name}
                      fill
                      className="object-cover"
                    />
                    {community.featured && (
                      <div className="absolute right-2 top-2">
                        <Badge
                          variant="secondary"
                          className="bg-aalemni-orange text-white"
                        >
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-aalemni-navy">
                      {community.name}
                    </CardTitle>
                    <CardDescription>{community.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {community.description}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-aalemni-blue" />
                        <span>{community.members.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-aalemni-blue" />
                        <span>{community.topics.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-aalemni-navy text-aalemni-navy hover:bg-aalemni-navy/10"
                    >
                      Join Community
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              variant="outline"
              className="border-aalemni-navy text-aalemni-navy hover:bg-aalemni-navy/10"
              asChild
            >
              <Link href="/community/all">
                View All Communities
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Discussions */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <Badge className="mb-4" variant="outline">
                Knowledge Sharing
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Recent Discussions
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Explore the latest topics being discussed across our
                communities.
              </p>
            </div>
            <Button asChild>
              <Link href="/community/new-topic">
                <Plus className="mr-2 h-4 w-4" />
                New Topic
              </Link>
            </Button>
          </div>

          <div className="mt-12">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {discussions.map((discussion) => (
                    <Link
                      key={discussion.id}
                      href={`/community/topic/${discussion.id}`}
                    >
                      <div className="flex gap-4 p-6 transition-colors hover:bg-muted/50">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={discussion.authorImage} />
                          <AvatarFallback>
                            {discussion.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-semibold">{discussion.title}</h3>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <span>{discussion.author}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {discussion.community}
                            </Badge>
                            <span>•</span>
                            <span>{discussion.lastActivity}</span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {discussion.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            <span>{discussion.replies}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{discussion.views}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/community/discussions">
                View All Discussions
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-16 bg-aalemni-navy text-white md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How to Join Our Community
            </h2>
            <p className="mt-4 text-xl text-white/80">
              Follow these simple steps to become an active member of the
              Aalemni community.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: 1,
                title: "Create an Account",
                description:
                  "Sign up for an Aalemni account to access all community features and personalize your experience.",
                action: "Sign Up",
                actionLink: "/signup",
              },
              {
                step: 2,
                title: "Join Communities",
                description:
                  "Browse and join communities that align with your interests, professional goals, or courses you're taking.",
                action: "Explore Communities",
                actionLink: "#communities",
              },
              {
                step: 3,
                title: "Participate Actively",
                description:
                  "Engage in discussions, ask questions, share knowledge, and connect with fellow learners and instructors.",
                action: "Get Started",
                actionLink: "/community/guidelines",
              },
            ].map((step, i) => (
              <div key={i} className="relative">
                {i < 2 && (
                  <div className="absolute top-10 left-full h-0.5 w-full -translate-x-1/2 bg-aalemni-orange/30 hidden md:block"></div>
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-aalemni-orange/30 bg-aalemni-orange/20 text-4xl font-bold">
                    {step.step}
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-white/80">{step.description}</p>
                  <Button
                    variant="secondary"
                    className="mt-6 bg-aalemni-orange hover:bg-aalemni-orange/90 text-white"
                    asChild
                  >
                    <Link href={step.actionLink}>{step.action}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              Community Standards
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Community Guidelines
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our community thrives on respect, collaboration, and knowledge
              sharing. Please follow these guidelines to ensure a positive
              experience for everyone.
            </p>
          </div>

          <div className="mt-12 mx-auto max-w-3xl">
            <Card>
              <CardContent className="p-6 space-y-6">
                {[
                  {
                    title: "Be Respectful",
                    description:
                      "Treat all community members with respect and courtesy. Disagreements are natural, but always focus on ideas rather than individuals.",
                  },
                  {
                    title: "Share Knowledge",
                    description:
                      "Contribute meaningfully to discussions by sharing your expertise and experiences. Help others learn and grow.",
                  },
                  {
                    title: "Stay On Topic",
                    description:
                      "Keep discussions relevant to the community or course topic. This helps maintain focus and makes information easier to find.",
                  },
                  {
                    title: "No Self-Promotion",
                    description:
                      "Avoid excessive self-promotion or spam. Sharing relevant resources is encouraged, but should add value to the discussion.",
                  },
                  {
                    title: "Protect Privacy",
                    description:
                      "Respect others' privacy and confidentiality. Do not share personal information without permission.",
                  },
                  {
                    title: "Report Issues",
                    description:
                      "If you encounter inappropriate behavior or content, please report it to our moderation team.",
                  },
                ].map((guideline, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-semibold">{guideline.title}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {guideline.description}
                    </p>
                    {i < 5 && <Separator className="mt-6" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-muted md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              Common Questions
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Find answers to common questions about our community features.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "How do I join a course group chat?",
                  answer:
                    "When you enroll in a course, you're automatically added to the course group chat. You can access all your course group chats from the 'My Group Chats' section on the Community page.",
                },
                {
                  question: "Can I create my own community?",
                  answer:
                    "Currently, communities are created and managed by the Aalemni team. However, you can suggest new community topics by contacting our support team.",
                },
                {
                  question: "Are there moderators in the communities?",
                  answer:
                    "Yes, all communities and group chats are moderated by the Aalemni team and course instructors to ensure a positive and productive environment.",
                },
                {
                  question: "How can I report inappropriate behavior?",
                  answer:
                    "You can report inappropriate content or behavior by clicking the 'Report' button available on all posts and messages, or by contacting our support team directly.",
                },
                {
                  question: "Can I create private study groups?",
                  answer:
                    "Yes, enrolled students can create private study groups for specific courses. These groups allow you to collaborate with selected classmates in a more intimate setting.",
                },
                {
                  question:
                    "Will my instructor see all my messages in the group chat?",
                  answer:
                    "Yes, course instructors have access to all messages in their course group chats. This allows them to provide timely assistance and monitor discussions.",
                },
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-aalemni-navy sm:text-4xl">
              Ready to Join Our Community?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Connect with fellow learners, engage with instructors, and enhance
              your learning experience.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <Button
                size="lg"
                className="bg-aalemni-orange hover:bg-aalemni-orange/90 text-white"
                asChild
              >
                <Link href="/signup">Create Account</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-aalemni-navy text-aalemni-navy hover:bg-aalemni-navy/10"
                asChild
              >
                <Link href="#communities">Explore Communities</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
