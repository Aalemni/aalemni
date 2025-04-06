"use client";
import React from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function VerifyAccount() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 px-4 py-8">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <GraduationCap className="h-10 w-10 text-primary" />
          <span className="text-2xl font-bold">Aalemni</span>
        </Link>

        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Pending Verification
            </CardTitle>
            <CardDescription className="text-center">
              Your Account is Pending Email Verification. 
            </CardDescription>
          </CardHeader>
          <CardContent>
            An Email has been sent to your email, please check it and verify your account in order to be able to Login
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Already Verified?{" "}
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
    </>
  );
}
