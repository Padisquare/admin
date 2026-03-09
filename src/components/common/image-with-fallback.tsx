"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

function ImageWithFallback({
  src,
  alt = "",
  width,
  height,
  fallBackImg = "",
  ...props
}: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  fallBackImg?: string;
  [key: string]: unknown;
}) {
  const [imgSrc, setImgSrc] = useState(fallBackImg || "/watermark-cart.svg");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  // const [isImageError, setIsImageError] = useState(false);

  // Effect to update the image source to the main image once the component is mounted
  useEffect(() => {
    if (!isImageLoaded) {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        setImgSrc(src);
        setIsImageLoaded(true);
      };
      img.onerror = () => {
        setImgSrc(fallBackImg || "/watermark-cart.svg");
        // setIsImageError(true);
      };
    }
  }, [src, fallBackImg, width, height, alt, isImageLoaded]);

  return (
    <div className="relative w-full h-full">
      {/* {isImageError && (
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs text-center font-bold z-10">
          This image is not available
        </span>
      )} */}
      <Image
        {...props}
        src={imgSrc}
        className={cn("bg-brand-main rounded-lg", props?.className as string)}
        alt={alt}
        height={height}
        width={width}
        loading="lazy"
      />
    </div>
  );
}

export default ImageWithFallback;
