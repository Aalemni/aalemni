"use client";

import { Badge } from "@/components/ui/badge";

import type React from "react";

import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Upload,
  Save,
  Eye,
  EyeOff,
  LogOut,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export default function InstructorSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  // Mock data - would come from API in production
  const [profileData, setProfileData] = useState({
    name: "Hadi Rahhal",
    email: "hadi.rahhal@example.com",
    bio: "Experienced software engineer and educator with over 10 years of industry experience. Passionate about teaching web development, machine learning, and data science.",
    profilePicture: "/placeholder.svg?height=200&width=200",
    phone: "+1 (555) 123-4567",
    website: "https://hadirahhal.com",
    socialLinks: {
      twitter: "https://twitter.com/hadirahhal",
      linkedin: "https://linkedin.com/in/hadirahhal",
      github: "https://github.com/hadirahhal",
    },
    teachingExperience:
      "I've been teaching online courses for 5 years, specializing in web development and data science. Prior to that, I worked as a senior developer at several tech companies.",
    expertise: [
      "Web Development",
      "React",
      "Next.js",
      "Machine Learning",
      "Data Science",
    ],
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newEnrollments: true,
    studentMessages: true,
    courseReviews: true,
    payouts: true,
    promotions: false,
    newsletter: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    loginNotifications: true,
    sessionTimeout: "30",
  });

  const [activeSessions, setActiveSessions] = useState([
    {
      id: 1,
      device: "Chrome on Windows",
      location: "New York, USA",
      ip: "192.168.1.1",
      lastActive: "2025-04-06T10:30:00",
      current: true,
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "Boston, USA",
      ip: "192.168.1.2",
      lastActive: "2025-04-05T18:45:00",
      current: false,
    },
    {
      id: 3,
      device: "Firefox on MacOS",
      location: "San Francisco, USA",
      ip: "192.168.1.3",
      lastActive: "2025-04-04T09:15:00",
      current: false,
    },
  ]);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to update the profile
    console.log("Profile updated", profileData);
  };

  const handleNotificationUpdate = () => {
    // In a real app, this would call an API to update notification settings
    console.log("Notification settings updated", notificationSettings);
  };

  const handleSecurityUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to update security settings
    console.log("Security settings updated", securitySettings);
  };

  const handleSessionLogout = (sessionId: number) => {
    // In a real app, this would call an API to log out the session
    console.log(`Logging out session ${sessionId}`);
    setActiveSessions(
      activeSessions.filter((session) => session.id !== sessionId)
    );
  };

  const handleLogoutAllSessions = () => {
    // In a real app, this would call an API to log out all sessions
    console.log("Logging out all sessions");
    setActiveSessions(activeSessions.filter((session) => session.current));
    setLogoutDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings & Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="profile" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" onClick={() => setActiveTab("profile")}>
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            onClick={() => setActiveTab("notifications")}
          >
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="security"
            onClick={() => setActiveTab("security")}
          >
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="payment" onClick={() => setActiveTab("payment")}>
            <CreditCard className="mr-2 h-4 w-4" />
            Payment Methods
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and public profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            website: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData({ ...profileData, bio: e.target.value })
                      }
                      placeholder="Tell students about yourself and your teaching style"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      This will be displayed on your instructor profile page.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleProfileUpdate}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Teaching Experience</CardTitle>
                  <CardDescription>
                    Share your teaching background and expertise
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="teachingExperience">
                      Teaching Experience
                    </Label>
                    <Textarea
                      id="teachingExperience"
                      rows={4}
                      value={profileData.teachingExperience}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          teachingExperience: e.target.value,
                        })
                      }
                      placeholder="Describe your teaching experience and qualifications"
                    />
                  </div>

                  <div>
                    <Label>Areas of Expertise</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {[
                        "Web Development",
                        "Mobile Development",
                        "Data Science",
                        "Machine Learning",
                        "Design",
                        "Business",
                        "Marketing",
                        "Photography",
                        "Music",
                      ].map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={`skill-${skill}`}
                            checked={profileData.expertise.includes(skill)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setProfileData({
                                  ...profileData,
                                  expertise: [...profileData.expertise, skill],
                                });
                              } else {
                                setProfileData({
                                  ...profileData,
                                  expertise: profileData.expertise.filter(
                                    (s) => s !== skill
                                  ),
                                });
                              }
                            }}
                            className="rounded text-primary"
                          />
                          <Label
                            htmlFor={`skill-${skill}`}
                            className="text-sm font-normal"
                          >
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleProfileUpdate}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Media Links</CardTitle>
                  <CardDescription>
                    Connect your social profiles to increase your visibility
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      value={profileData.socialLinks.twitter}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          socialLinks: {
                            ...profileData.socialLinks,
                            twitter: e.target.value,
                          },
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={profileData.socialLinks.linkedin}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          socialLinks: {
                            ...profileData.socialLinks,
                            linkedin: e.target.value,
                          },
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={profileData.socialLinks.github}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          socialLinks: {
                            ...profileData.socialLinks,
                            github: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleProfileUpdate}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage
                      src={profileData.profilePicture}
                      alt={profileData.name}
                    />
                    <AvatarFallback>
                      {profileData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2 w-full">
                    <Button variant="outline" className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload New Picture
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      Remove Picture
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    Upload a high-quality image to make a good impression on
                    your students.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Teaching Certificates</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-md p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        Web Development Certification
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded on Apr 1, 2025
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="border rounded-md p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Data Science Specialization</p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded on Mar 15, 2025
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Certificate
                  </Button>

                  <p className="text-sm text-muted-foreground">
                    Upload certificates to showcase your qualifications to
                    potential students.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how and when you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Email Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="newEnrollments">New Enrollments</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when students enroll in your
                        courses
                      </p>
                    </div>
                    <Switch
                      id="newEnrollments"
                      checked={notificationSettings.newEnrollments}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          newEnrollments: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="studentMessages">Student Messages</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when students send you messages
                      </p>
                    </div>
                    <Switch
                      id="studentMessages"
                      checked={notificationSettings.studentMessages}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          studentMessages: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="courseReviews">Course Reviews</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when students review your courses
                      </p>
                    </div>
                    <Switch
                      id="courseReviews"
                      checked={notificationSettings.courseReviews}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          courseReviews: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="payouts">Upcoming Payouts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about upcoming payouts and
                        earnings
                      </p>
                    </div>
                    <Switch
                      id="payouts"
                      checked={notificationSettings.payouts}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          payouts: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">
                  Marketing Communications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="promotions">Promotions and Offers</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about special offers and promotional
                        opportunities
                      </p>
                    </div>
                    <Switch
                      id="promotions"
                      checked={notificationSettings.promotions}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          promotions: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="newsletter">Instructor Newsletter</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive our monthly newsletter with teaching tips and
                        platform updates
                      </p>
                    </div>
                    <Switch
                      id="newsletter"
                      checked={notificationSettings.newsletter}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          newsletter: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleNotificationUpdate}>
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <form onSubmit={handleSecurityUpdate}>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          className="pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">
                        Confirm New Password
                      </Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Update Password</Button>
                  </CardFooter>
                </form>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Configure additional security options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="twoFactor">
                        Two-Factor Authentication
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      id="twoFactor"
                      checked={securitySettings.twoFactorEnabled}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({
                          ...securitySettings,
                          twoFactorEnabled: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="loginNotifications">
                        Login Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications when someone logs into your
                        account
                      </p>
                    </div>
                    <Switch
                      id="loginNotifications"
                      checked={securitySettings.loginNotifications}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({
                          ...securitySettings,
                          loginNotifications: checked,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="sessionTimeout">
                      Session Timeout (minutes)
                    </Label>
                    <Select
                      value={securitySettings.sessionTimeout}
                      onValueChange={(value) =>
                        setSecuritySettings({
                          ...securitySettings,
                          sessionTimeout: value,
                        })
                      }
                    >
                      <SelectTrigger id="sessionTimeout">
                        <SelectValue placeholder="Select timeout duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSecurityUpdate}>
                    Save Security Settings
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>
                    Manage your active login sessions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeSessions.map((session) => (
                    <div
                      key={session.id}
                      className="flex justify-between items-center p-3 border rounded-md"
                    >
                      <div>
                        <p className="font-medium flex items-center">
                          {session.device}
                          {session.current && (
                            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                              Current
                            </span>
                          )}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {session.location}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last active:{" "}
                          {new Date(session.lastActive).toLocaleString()}
                        </p>
                      </div>
                      {!session.current && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSessionLogout(session.id)}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </Button>
                      )}
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() => setLogoutDialogOpen(true)}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout from All Devices
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Payment Methods Tab */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage how you receive payments from Aalemni
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Current Payment Method
                </h3>
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Bank Account</p>
                        <p className="text-sm text-muted-foreground">
                          Ending in ****6789
                        </p>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Account Holder</p>
                      <p>Hadi Rahhal</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Bank Name</p>
                      <p>Example Bank</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">
                  Add New Payment Method
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="paymentType">Payment Method Type</Label>
                    <Select defaultValue="bank">
                      <SelectTrigger id="paymentType">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank">Bank Account</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="wise">Wise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button>Add Payment Method</Button>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">Tax Information</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Please ensure your tax information is up to date for accurate
                  reporting and payments.
                </p>
                <Button variant="outline">Update Tax Information</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Logout All Sessions Dialog */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Logout from All Devices</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out from all devices? This will end
              all active sessions except your current one.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setLogoutDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogoutAllSessions}>
              Yes, Logout All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
