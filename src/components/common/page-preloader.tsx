"use client";

import Image from "next/image";

const PagePreloader = () => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-700 `}
    >
      {/* Clean background */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/50 to-white"></div>
      </div>

      <div className="relative flex flex-col items-center gap-10 z-10">
        {/* Logo with subtle animation */}
        <div className="relative">
          <div className="transform transition-all duration-1000 hover:scale-110">
            <Image
              src="/LogoDark.svg"
              alt="Padisquare"
              width={180}
              height={65}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagePreloader;
