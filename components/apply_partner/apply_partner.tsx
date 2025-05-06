"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, GraduationCap, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  signUpAction,
  signUpActionInstructor,
} from "@/supabase/actions/auth_actions";
import { toast } from "react-toastify";
import { PartnershipType, Specialty } from "@/types/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface Apply_instructor_props {
  partnership_types: PartnershipType[];
}

export default function ApplyAsPartnerPage({
  partnership_types,
}: Apply_instructor_props) {
  console.log(partnership_types);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    agree_terms: false,
    role: "instructor",
    phone: "",
    instructor_role: "",
    partnership_type: "",
    organization_name: "",
    partnership_goal: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("username", formData.username);
      data.append("password", formData.password);
      data.append("confirm_password", formData.confirm_password);
      data.append("phone", formData.phone);
      data.append("role", formData.role);
      data.append("agree_terms", formData.agree_terms ? "1" : "0");
      data.append("instructor_role", formData.instructor_role);
      data.append("partnership_type", formData.partnership_type);
      data.append("organization_name", formData.organization_name);
      data.append("partnership_goal", formData.partnership_goal);
      data.append(
        "social_links",
        JSON.stringify({ partnership_type: formData.partnership_type })
      );

      console.log(formData);
      const result = await signUpActionInstructor(data);
      if (result) {
        if (!result.success) {
          if (result.message.includes("duplicate key value")) {
            if (result.message.includes("email")) {
              toast.error("User email already exists");
            } else if (result.message.includes("username")) {
              toast.error("Username already exists");
            } else {
              toast.error("User already exists");
            }
          } else {
            toast.error(result.message);
          }
        } else {
          toast.success(result.message);
          router.push("/verify-account");
        }
      } else {
        toast.error("An Error Occurred! Please Try Again Later");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("An Error Occurred! Please Try Again Later");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center bg-muted/40 py-8">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Wanna Become a Partner?
          </CardTitle>
          <CardDescription className="text-center">
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6 text-start" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name*</Label>
                <Input
                  required
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Hadi Rahhal"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username*</Label>
                <Input
                  required
                  id="username"
                  type="text"
                  name="username"
                  placeholder="its_hadi"
                  autoComplete="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  required
                  type="text"
                  name="email"
                  placeholder="hadi@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number*</Label>
                <Input
                  id="phone"
                  type="text"
                  name="phone"
                  required
                  placeholder="+961 ** *** ***"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization_name">Organization Name*</Label>
                <Input
                  id="organization_name"
                  required
                  type="text"
                  placeholder="E.g. Aalemni"
                  value={formData.organization_name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      organization_name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="partnership_type">Partnership Type</Label>
                <select
                  defaultValue="none"
                  id="partnershipType"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aalemni-orange focus-visible:ring-offset-2"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      partnership_type: e.target.value,
                    });
                  }}
                >
                  <option value="none" disabled>
                    Select partnership type
                  </option>
                  {partnership_types.length > 0
                    ? partnership_types.map((type) => {
                        return (
                          <option
                            value={type.partnershiptypeid}
                            key={type.partnershiptypeid}
                          >
                            {type.name}
                          </option>
                        );
                      })
                    : "No partnership types available"}
                </select>
              </div>
            </div>

            {/* These fields will span full width */}
            <div className="space-y-2">
              <Label htmlFor="partnership_goal">Partnership Goals</Label>
              <textarea
                id="partnership_goal"
                rows={4}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aalemni-orange focus-visible:ring-offset-2"
                placeholder="Tell us about your partnership goals and how you envision collaborating with Aalemni..."
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    partnership_goal: e.target.value,
                  });
                }}
              ></textarea>
            </div>

            {/* Passwords section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="pr-10"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirm_password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="pr-10"
                    autoComplete="new-confirm_password"
                    value={formData.confirm_password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirm_password: e.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Terms and submit */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                required
                checked={formData.agree_terms}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    agree_terms: checked === true,
                  })
                }
              />
              <Label htmlFor="terms" className="text-sm leading-tight">
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <div className="mt-6">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Loading..." : "Become a Partner"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Already have an account as a Partner?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
