import React from "react";

interface Props {
  analytics: React.ReactNode;
}
const HomeLayout = ({ analytics }: Props) => {
  return (
    <section className="space-y-5 flex flex-col">
      <div className="">{analytics}</div>
    </section>
  );
};

export default HomeLayout;
