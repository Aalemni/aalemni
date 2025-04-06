"use client";

import { forgotPasswordAction } from "@/supabase/actions/auth_actions";
import { FormMessage } from "@/components/form-message";
import { Message } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-messages";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  const [formData, setFormData] = useState({ email: "" });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("email", formData.email);
    const result = await forgotPasswordAction(form_data);
    console.log(result);
  };
  return (
    <>
      <form
        className="flex-1 flex flex-col w-full gap-2 text-foreground [&>input]:mb-6 min-w-64 max-w-64 mx-auto"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-2xl font-medium">Reset Password</h1>
          <p className="text-sm text-secondary-foreground">
            Already have an account?{" "}
            <Link className="text-primary underline" href="/login">
              Sign in
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input
            name="email"
            id="email"
            placeholder="you@example.com"
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Button>Reset Password</Button>
          <FormMessage message={searchParams} />
        </div>
      </form>
      <SmtpMessage />
    </>
  );
}
