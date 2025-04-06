"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Download, Share2, Award, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for certificates
const certificatesData = [
  {
    id: 1,
    title: "Python for Data Science",
    instructor: "Alex Rodriguez",
    image: "/placeholder.svg?height=400&width=600",
    dateEarned: "2025-03-15",
    grade: "A",
  },
  {
    id: 2,
    title: "UX/UI Design Principles",
    instructor: "Emma Wilson",
    image: "/placeholder.svg?height=400&width=600",
    dateEarned: "2025-02-20",
    grade: "A-",
  },
  {
    id: 3,
    title: "Public Speaking Masterclass",
    instructor: "James Thompson",
    image: "/placeholder.svg?height=400&width=600",
    dateEarned: "2025-01-10",
    grade: "B+",
  },
  {
    id: 4,
    title: "Digital Marketing Fundamentals",
    instructor: "Michael Chen",
    image: "/placeholder.svg?height=400&width=600",
    dateEarned: "2024-12-05",
    grade: "A",
  },
];

// Mock data for achievements
const achievementsData = [
  {
    id: 1,
    title: "Course Completion Streak",
    description: "Completed 3 courses in a row without breaks",
    image: "/placeholder.svg?height=100&width=100",
    dateEarned: "2025-03-20",
  },
  {
    id: 2,
    title: "Top Learner of the Month",
    description: "Most active student in March 2025",
    image: "/placeholder.svg?height=100&width=100",
    dateEarned: "2025-03-31",
  },
  {
    id: 3,
    title: "Perfect Score",
    description: "Achieved 100% on all quizzes in a course",
    image: "/placeholder.svg?height=100&width=100",
    dateEarned: "2025-02-15",
  },
];

export default function CertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("certificates");

  // Filter certificates based on search query
  const filteredCertificates = certificatesData.filter(
    (certificate) =>
      certificate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certificate.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter achievements based on search query
  const filteredAchievements = achievementsData.filter(
    (achievement) =>
      achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date function
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            My Certificates & Achievements
          </h1>
          <p className="text-muted-foreground">
            View and share your earned certificates and achievements
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search certificates or achievements..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue="certificates"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-8">
          <TabsTrigger value="certificates">
            <Award className="h-4 w-4 mr-2" />
            Certificates
          </TabsTrigger>
          <TabsTrigger value="achievements">
            <Trophy className="h-4 w-4 mr-2" />
            Achievements & Badges
          </TabsTrigger>
        </TabsList>

        {/* Certificates Tab */}
        <TabsContent value="certificates">
          {filteredCertificates.length === 0 ? (
            <div className="text-center py-12">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">
                {searchQuery ? "No certificates found" : "No certificates yet"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? " Try a different search term"
                  : "Complete courses to earn certificates"}
              </p>
              <Button asChild>
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCertificates.map((certificate) => (
                <Card
                  key={certificate.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={certificate.image || "/placeholder.svg"}
                      alt={certificate.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-1">
                      {certificate.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {certificate.instructor}
                    </p>

                    <div className="flex justify-between items-center mb-4">
                      <Badge className="bg-primary">
                        <Award className="h-3 w-3 mr-1" />
                        Grade: {certificate.grade}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        Earned on {formatDate(certificate.dateEarned)}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button asChild className="flex-1">
                        <a
                          href={`/api/certificates/${certificate.id}/download`}
                          download
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download PDF
                        </a>
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button
                        variant="secondary"
                        asChild
                        className="w-full mt-2"
                      >
                        <Link href={`/courses/${certificate.id}`}>
                          Go to Course
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements">
          {filteredAchievements.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">
                {searchQuery ? "No achievements found" : "No achievements yet"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? "Try a different search term"
                  : "Keep learning to earn achievements and badges"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAchievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="relative h-16 w-16 mr-4">
                        <Image
                          src={achievement.image || "/placeholder.svg"}
                          alt={achievement.title}
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Earned on {formatDate(achievement.dateEarned)}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm mb-4">{achievement.description}</p>

                    <Button variant="outline" className="w-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Achievement
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
