import Image from "next/image";
import { Mail, Phone, Linkedin, Twitter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Team data
const founder = {
  name: "Hadi Rahhal",
  role: "Founder & CEO",
  bio: "Hadi Rahhal is the visionary founder of Aalemni. With over 15 years of experience in education and technology, Hadi founded Aalemni with the mission to democratize education and make quality learning accessible to everyone.",
  image: "/placeholder.svg?height=400&width=400",
  email: "hadi@aalemni.com",
  phone: "+1 (555) 123-4567",
  linkedin: "https://linkedin.com/in/hadirahhal",
  twitter: "https://twitter.com/hadirahhal",
};

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Chief Learning Officer",
    bio: "Sarah oversees all educational content and ensures the highest quality standards across all courses.",
    image: "/placeholder.svg?height=400&width=400",
    email: "sarah@aalemni.com",
    linkedin: "https://linkedin.com/in/sarahjohnson",
  },
  {
    name: "Ahmed Hassan",
    role: "CTO",
    bio: "Ahmed leads our technology team, building innovative solutions to enhance the learning experience.",
    image: "/placeholder.svg?height=400&width=400",
    email: "ahmed@aalemni.com",
    linkedin: "https://linkedin.com/in/ahmedhassan",
  },
  {
    name: "Maria Rodriguez",
    role: "Head of Instructor Relations",
    bio: "Maria works closely with our instructors to help them create engaging and effective courses.",
    image: "/placeholder.svg?height=400&width=400",
    email: "maria@aalemni.com",
    linkedin: "https://linkedin.com/in/mariarodriguez",
  },
  {
    name: "David Chen",
    role: "Chief Marketing Officer",
    bio: "David leads our marketing efforts to connect learners with the right courses for their needs.",
    image: "/placeholder.svg?height=400&width=400",
    email: "david@aalemni.com",
    linkedin: "https://linkedin.com/in/davidchen",
  },
];

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Our Team</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Meet the passionate individuals behind Aalemni who are dedicated to
          transforming education.
        </p>
      </div>

      {/* Founder Section */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold mb-8 text-center">Founder</h2>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:shrink-0">
              <div className="h-64 w-full md:h-full md:w-64 relative">
                <Image
                  src={founder.image || "/placeholder.svg"}
                  alt={founder.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-primary">
                {founder.name}
              </h3>
              <p className="text-blue-600 font-medium mb-4">{founder.role}</p>
              <p className="text-gray-700 mb-6">{founder.bio}</p>

              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-muted-foreground mr-2" />
                  <a
                    href={`mailto:${founder.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {founder.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-muted-foreground mr-2" />
                  <a
                    href={`tel:${founder.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {founder.phone}
                  </a>
                </div>
                <div className="flex items-center">
                  <Linkedin className="h-5 w-5 text-muted-foreground mr-2" />
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    LinkedIn
                  </a>
                </div>
                <div className="flex items-center">
                  <Twitter className="h-5 w-5 text-muted-foreground mr-2" />
                  <a
                    href={founder.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section>
        <h2 className="text-2xl font-bold mb-8 text-center">Leadership Team</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-64 relative">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground mb-4 text-sm">
                  {member.bio}
                </p>

                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                  <a
                    href={`mailto:${member.email}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {member.email}
                  </a>
                </div>
                <div className="flex items-center mt-1">
                  <Linkedin className="h-4 w-4 text-muted-foreground mr-2" />
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    LinkedIn
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
