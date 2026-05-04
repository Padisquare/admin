import ReelDetailClient from "@/components/reels/reel-detail-client";

export default async function ReelDetailPage({
  params,
}: {
  params: Promise<{ reelId: string }>;
}) {
  const { reelId } = await params;
  return <ReelDetailClient reelId={reelId} />;
}
