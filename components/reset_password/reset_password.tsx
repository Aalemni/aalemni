"use client";
import { resetPasswordAction } from "@/supabase/actions/auth_actions";
import { FormMessage } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Message } from "@/types/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ResetPassword({
  searchParams,
}: {
  searchParams: Message;
}) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("password", formData.password);
    form_data.append("confirmPassword", formData.confirmPassword);
    const result = await resetPasswordAction(form_data);
    console.log(result);
  };
  return (
    <form
      className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-medium">Reset password</h1>
      <p className="text-sm text-foreground/60">
        Please enter your new password below.
      </p>
      <Label htmlFor="password">New password</Label>
      <Input
        type="password"
        name="password"
        placeholder="New password"
        required
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <Label htmlFor="confirmPassword">Confirm password</Label>
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        required
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
      />
      <Button>Reset password</Button>
      <FormMessage message={searchParams} />
    </form>
  );
}
