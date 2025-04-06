import ResetPassword from "@/components/reset_password/reset_password";
import { Message } from "@/types/types";
import React from "react";

export default async function Page(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return (
    <>
      <ResetPassword searchParams={searchParams}/>
    </>
  );
}
