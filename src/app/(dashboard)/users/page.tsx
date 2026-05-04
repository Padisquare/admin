import UsersPageClient from "@/components/user/user-page";
import { Suspense } from "react";

export default function UsersPage() {
  return (
    <Suspense fallback={null}>
      <UsersPageClient />
    </Suspense>
  );
}