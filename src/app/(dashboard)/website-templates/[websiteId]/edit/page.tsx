import EditWebsiteTemplateClient from "@/components/website-templates/edit-webtemp-page";

export default async function EditUserPage({
    params,
}: {
    params: Promise<{ websiteId: string }>;
}) {
    const { websiteId } = await params;

    return <EditWebsiteTemplateClient websiteId={websiteId} />;
}
