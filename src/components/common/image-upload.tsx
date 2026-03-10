"use client";
import { CloudinaryService } from "@/services/cloudinary.service";
import { ImagePlus, Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { toast } from "sonner";

interface ImageUploadProps {
  imageUrl?: string;
  onImageUpload?: (image: string) => void;
  isUploadingApi?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  imageUrl,
  onImageUpload,
  isUploadingApi,
}) => {
  const [image, setImage] = useState<string | undefined>(imageUrl);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not a valid image file`);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        toast.error(`${file.name} is too large. Maximum size is 10MB`);
        return;
      }

      try {
        setIsUploading(true);
        const result = await CloudinaryService.uploadImage(file, "padisquare");
        setImage(result.secure_url);
        onImageUpload?.(result.secure_url);
        toast.success("Image uploaded successfully");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image");
      } finally {
        setIsUploading(false);
      }
    },
    [onImageUpload]
  );

  if (isUploading || isUploadingApi) {
    return (
      <div className="h-[65px] w-[65px] cursor-pointer bg-password-toggle-btn flex items-center justify-center rounded-full">
        <Loader2 className="w-4 h-4 animate-spin text-brand-main" />
      </div>
    );
  }

  return (
    <div className="h-[65px] relative w-[65px] cursor-pointer bg-password-toggle-btn flex items-center justify-center rounded-full">
      {image ? (
        <Image
          src={image}
          alt="Image"
          fill
          className="object-cover rounded-full"
        />
      ) : (
        <ImagePlus className="w-4 h-4" strokeWidth={2} />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
      />
    </div>
  );
};

export default ImageUpload;
