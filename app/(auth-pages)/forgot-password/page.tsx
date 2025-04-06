import { Message } from "@/components/form-message";
import ForgotPassword from "@/components/forgot_password/forgot_password";

export default async function Page(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;

  return <ForgotPassword searchParams={searchParams} />;
}
