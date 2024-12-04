import { NewPasswordForm } from "@/components/auth/new-passwordform";
import { Suspense } from "react";

export default function NewPasswordPage() {
  return (
    <Suspense>
      <NewPasswordForm />
    </Suspense>
  );
}
