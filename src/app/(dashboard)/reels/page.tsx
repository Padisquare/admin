"use client";
import { CustomTable } from "@/components/common/custom-table";
import { reelsTableColumns } from "@/components/reels/reels-column";
import ReelsOverview from "@/components/reels/reels-overview";
import { reelsDummyData } from "@/constants/data";

const ReelsHomepage = () => {
  return (
    <section className="space-y-5">
      <ReelsOverview />
      <div className="bg-white p-5 rounded-t-2xl">
        <CustomTable
          data={reelsDummyData}
          columns={reelsTableColumns}
          loading={false}
          emptyState={{
            title: "No Reels Posted yet",
            message: "Make a new post now",
          }}
        />
      </div>
    </section>
  );
};

export default ReelsHomepage;
