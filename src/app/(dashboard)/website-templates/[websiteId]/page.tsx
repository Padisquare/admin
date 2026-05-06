import WebsiteTemplateDetailClient from "@/components/website-templates/website-template-detail-client";

export default async function WebsiteTemplateDetailPage({
  params,
}: {
  params: Promise<{ websiteId: string }>;
}) {
  const { websiteId } = await params;
  return <WebsiteTemplateDetailClient websiteId={websiteId} />;
}
