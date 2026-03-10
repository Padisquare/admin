import React from "react";

interface Props {
  analytics: React.ReactNode;
  usersGrowth: React.ReactNode;
  productsGrowth: React.ReactNode;
}
const HomeLayout = ({ analytics, usersGrowth, productsGrowth }: Props) => {
  return (
    <section className="space-y-5 flex flex-col">
      <div className="">{analytics}</div>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 h-full gap-5">
        <div className="h-full">{usersGrowth}</div>
        <div className="h-full">{productsGrowth}</div>
      </div>
    </section>
  );
};

export default HomeLayout;
