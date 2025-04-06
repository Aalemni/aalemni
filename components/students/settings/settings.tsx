"use client";

import type React from "react";

import { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Upload,
  Trash2,
  LogOut,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { Badge } from "@/components/ui/badge";

const activeSessions = [
  {
    id: 1,
    device: "Chrome on Windows",
    location: "New York, USA",
    lastActive: "2025-04-06T10:30:00",
    current: true,
  },
  {
    id: 2,
    device: "Safari on iPhone",
    location: "Boston, USA",
    lastActive: "2025-04-05T18:45:00",
    current: false,
  },
  {
    id: 3,
    device: "Firefox on MacOS",
    location: "San Francisco, USA",
    lastActive: "2025-04-04T09:15:00",
    current: false,
  },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  // Mock profile data
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Student passionate about web development and design. Currently learning React and Next.js.",
  });

  // Mock learning preferences
  const [learningPreferences, setLearningPreferences] = useState({
    interests: ["Web Development", "Design", "Business"],
    preferredCategories: ["tech", "design"],
    learningMode: "mixed",
  });

  // Mock notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailCourseUpdates: true,
    emailPromotions: false,
    smsReminders: true,
    browserNotifications: true,
  });

  // Mock security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to update the profile
    console.log("Profile updated", profileData);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API to update the password
    console.log("Password updated");
  };

  const handleSendOTP = () => {
    // In a real app, this would call an API to send an OTP
    console.log("OTP sent");
    setOtpSent(true);
  };

  const handleSessionLogout = (sessionId: number) => {
    // In a real app, this would call an API to log out the session
    console.log(`Logging out session ${sessionId}`);
  };

  const handleLogoutAllSessions = () => {
    // In a real app, this would call an API to log out all sessions
    console.log("Logging out all sessions");
    setLogoutDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings & Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile, preferences, and account settings
          </p>
        </div>
      </div>

      <Tabs
        defaultValue="profile"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-8">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="password">
            <Lock className="h-4 w-4 mr-2" />
            Password & Security
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <User className="h-4 w-4 mr-2" />
            Learning Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="md:col-span-2">
              <form onSubmit={handleProfileUpdate}>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and public profile
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
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
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData({ ...profileData, bio: e.target.value })
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </CardFooter>
              </form>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage
                      src="/placeholder.svg?height=96&width=96"
                      alt="Profile"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="w-full mb-2">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload New Picture
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove Picture
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Password & Security Tab */}
        <TabsContent value="password">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="md:col-span-2">
              <form onSubmit={handlePasswordUpdate}>
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

                  <div className="pt-4 border-t">
                    <Label htmlFor="otp">One-Time Password (OTP)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="otp"
                        type="text"
                        disabled={!otpSent}
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        onClick={handleSendOTP}
                        disabled={otpSent}
                      >
                        {otpSent ? "OTP Sent" : "Send OTP"}
                      </Button>
                    </div>
                    {otpSent && (
                      <p className="text-sm text-muted-foreground mt-2">
                        OTP has been sent to your email and phone. It will
                        expire in 10 minutes.
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={!otpSent}>
                    Update Password
                  </Button>
                </CardFooter>
              </form>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Enable Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorEnabled}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({
                          ...securitySettings,
                          twoFactorEnabled: checked,
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
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
                            <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                              Current
                            </Badge>
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

        {/* Learning Preferences Tab */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Learning Preferences</CardTitle>
              <CardDescription>
                Customize your learning experience and get personalized
                recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">
                  Interests & Skills
                </Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Select topics you're interested in learning about
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    "Web Development",
                    "Mobile Development",
                    "Data Science",
                    "Design",
                    "Business",
                    "Marketing",
                    "Photography",
                    "Music",
                    "Health & Fitness",
                  ].map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`interest-${interest}`}
                        checked={learningPreferences.interests.includes(
                          interest
                        )}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setLearningPreferences({
                              ...learningPreferences,
                              interests: [
                                ...learningPreferences.interests,
                                interest,
                              ],
                            });
                          } else {
                            setLearningPreferences({
                              ...learningPreferences,
                              interests: learningPreferences.interests.filter(
                                (i) => i !== interest
                              ),
                            });
                          }
                        }}
                        className="rounded text-primary"
                      />
                      <Label
                        htmlFor={`interest-${interest}`}
                        className="text-sm font-normal"
                      >
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t">
                <Label className="text-base font-medium">
                  Preferred Course Categories
                </Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Select categories you'd like to see more of
                </p>
                <Select
                  value={learningPreferences.preferredCategories.join(",")}
                  onValueChange={(value) =>
                    setLearningPreferences({
                      ...learningPreferences,
                      preferredCategories: value.split(",").filter(Boolean),
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="personal">
                      Personal Development
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-6 border-t">
                <Label className="text-base font-medium">
                  Preferred Learning Mode
                </Label>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose how you prefer to learn
                </p>
                <Select
                  value={learningPreferences.learningMode}
                  onValueChange={(value) =>
                    setLearningPreferences({
                      ...learningPreferences,
                      learningMode: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self-paced">Self-paced</SelectItem>
                    <SelectItem value="live">Live Sessions</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
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
                      <Label htmlFor="emailCourseUpdates">Course Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about course content updates and
                        announcements
                      </p>
                    </div>
                    <Switch
                      id="emailCourseUpdates"
                      checked={notificationSettings.emailCourseUpdates}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          emailCourseUpdates: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailPromotions">
                        Promotions and Offers
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about special offers, discounts, and new
                        courses
                      </p>
                    </div>
                    <Switch
                      id="emailPromotions"
                      checked={notificationSettings.emailPromotions}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          emailPromotions: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">SMS Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="smsReminders">Course Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive SMS reminders about upcoming deadlines, quizzes,
                        and live sessions
                      </p>
                    </div>
                    <Switch
                      id="smsReminders"
                      checked={notificationSettings.smsReminders}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          smsReminders: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">
                  Browser Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="browserNotifications">
                        Enable Browser Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications in your browser when you're on the
                        platform
                      </p>
                    </div>
                    <Switch
                      id="browserNotifications"
                      checked={notificationSettings.browserNotifications}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          browserNotifications: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Notification Settings</Button>
            </CardFooter>
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
