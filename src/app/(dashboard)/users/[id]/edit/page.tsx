import EditUserClient from "@/components/user/edit-page";

export default async function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditUserClient userId={id} />;
}