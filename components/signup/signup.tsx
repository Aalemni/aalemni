"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, GraduationCap } from "lucide-react";
import { Button } from "@/components/uii_/button";
import { Input } from "@/components/uii_/input";
import { Label } from "@/components/uii_/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signUpAction } from "@/supabase/actions/auth_actions";
import { toast } from "react-toastify";
export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    agree_terms: false,
    role: "student",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const from_data = new FormData();
      var agree_terms = formData.agree_terms == true ? "1" : "0";
      from_data.append("name", formData.name);
      from_data.append("email", formData.email);
      from_data.append("username", formData.username);
      from_data.append("password", formData.password);
      from_data.append("confirm_password", formData.confirm_password);
      from_data.append("phone", formData.phone);
      from_data.append("role", formData.role);
      from_data.append("agree_terms", agree_terms);
      const result = await signUpAction(from_data);
      if (result && result != null) {
        if (result.success == false) {
          if (result.message.includes("duplicate key value")) {
            if (result.message.includes("email")) {
              toast.error("User email already exists");
            } else if (result.message.includes("username")) {
              toast.error("Username already exists");
            } else {
              toast.error("Users already exists");
            }
          } else {
            toast.error(result.message);
          }
        } else {
          toast.success(result.message);
          router.push("/verify-account");
        }
      } else {
        toast.error("An Error Occured! Please Try Again Later");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      toast.error("An Error Occured! Please Try Again Later");
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
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your information to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                type="fullname"
                placeholder="e.g. Hadi Rahhal"
                required
                autoComplete="fullname"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="e.g. its._.hadi-rahhal"
                required
                autoComplete="username"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. hadi_rahhal@gmail.com"
                required
                autoComplete="email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phonenumber">Phone Number</Label>
              <Input
                id="phonenumber"
                type="phonenumber"
                placeholder="e.g. +961 ** *** ***"
                required
                autoComplete="phonenumber"
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
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
                className="mt-1"
                checked={Boolean(formData.agree_terms)}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    agree_terms: checked ? true : false,
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

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          {/* <div className="mt-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                Google
              </Button>
              <Button variant="outline" className="w-full">
                Facebook
              </Button>
            </div>
          </div> */}
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
