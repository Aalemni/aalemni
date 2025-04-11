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
import { Specialty } from "@/types/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

interface Apply_instructor_props {
  specialties: Specialty[];
}

export default function ApplyAsInstructorPage({
  specialties,
}: Apply_instructor_props) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
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
    linkedin: "",
    exp_years: "",
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
      data.append("linkedin", formData.linkedin);
      data.append("exp_years", formData.exp_years);
      data.append("specialities", selectedSpecialties.join(","));
      data.append(
        "social_links",
        JSON.stringify({ linkedin: formData.linkedin })
      );

      console.log(formData);
      console.log(selectedSpecialties);
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4 py-8">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <GraduationCap className="h-10 w-10 text-primary" />
        <span className="text-2xl font-bold">Aalemni</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up As Instructor
          </CardTitle>
          <CardDescription className="text-center">
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4 text-start" onSubmit={handleSubmit}>
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
              <Label htmlFor="instructor_role">Role*</Label>
              <Input
                id="instructor_role"
                required
                name="instructor_role"
                type="text"
                placeholder="Web Developer"
                value={formData.instructor_role}
                onChange={(e) =>
                  setFormData({ ...formData, instructor_role: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              {/* <Label htmlFor="specialties">Subject Area</Label>
              <div className="w-full rounded-md border border-input bg-background p-3 text-sm space-y-2">
                {specialties.map((specialty, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Checkbox
                      id={`specialty-${i}`}
                      checked={selectedSpecialties.includes(
                        specialty.specialityid
                      )}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedSpecialties((prev) => [
                            ...prev,
                            specialty.specialityid,
                          ]);
                        } else {
                          setSelectedSpecialties((prev) =>
                            prev.filter((id) => id !== specialty.specialityid)
                          );
                        }
                      }}
                    />
                    <label htmlFor={`specialty-${i}`} className="text-sm">
                      {specialty.specialityname}
                    </label>
                  </div>
                ))}
              </div> */}

              <Label>Specialities</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <div className="flex flex-wrap gap-2">
                      {selectedSpecialties.length > 0 ? (
                        specialties
                          .filter((s) =>
                            selectedSpecialties.includes(s.specialityid!)
                          )
                          .map((s) => (
                            <span
                              key={s.specialityid}
                              className="bg-primary/10 text-primary border border-primary px-2 py-1 rounded-full text-sm"
                            >
                              {s.specialityname}
                            </span>
                          ))
                      ) : (
                        <span className="text-muted-foreground">
                          Select your subject areas
                        </span>
                      )}
                    </div>
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandGroup>
                      {specialties.map((specialty) => (
                        <CommandItem
                          key={specialty.specialityid}
                          onSelect={() => {
                            const id = specialty.specialityid;
                            if (!id) return;

                            setSelectedSpecialties((prev) =>
                              prev.includes(id)
                                ? prev.filter((s) => s !== id)
                                : [...prev, id]
                            );
                          }}
                          className={cn(
                            "flex items-center my-1 gap-2 px-2 py-1.5 cursor-pointer rounded-md transition-colors",
                            selectedSpecialties.includes(
                              specialty.specialityid!
                            )
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted"
                          )}
                        >
                          {specialty.specialityname}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="exp_years">Years of Experience*</Label>
              <Input
                id="exp_years"
                required
                type="number"
                placeholder="5"
                min="1"
                max="40"
                value={formData.exp_years}
                onChange={(e) =>
                  setFormData({ ...formData, exp_years: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                type="url"
                placeholder="https://..."
                value={formData.linkedin}
                onChange={(e) =>
                  setFormData({ ...formData, linkedin: e.target.value })
                }
              />
            </div>
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
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
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
