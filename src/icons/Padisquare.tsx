import Image from "next/image";
import React from "react";

const PadisquareIcon = ({
  width = 18,
  height = 18,
}: {
  height: number;
  width: number;
}) => {
  return (
    <Image
      src="/LogoIcon.svg"
      alt="Padisquare Logo"
      width={width}
      height={height}
    />
  );
};

export default PadisquareIcon;
