"use client";
import { ImagePlus, X, Upload, AlertCircle } from "lucide-react";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { CloudinaryService, UploadResult } from "@/services/cloudinary.service";
import { toast } from "sonner";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ImageWithFallback from "./image-with-fallback";

export interface ImageItem {
  id: string;
  file?: File;
  url: string;
  publicId?: string;
  isUploading?: boolean;
  uploadProgress?: number;
  error?: string;
}

interface CustomImagePickerProps {
  maxImages?: number;
  folder?: string;
  onImagesChange?: (images: UploadResult[]) => void;
  initialImages?: string[];
  className?: string;
  error?: string;
}

const CustomImagePicker: React.FC<CustomImagePickerProps> = ({
  maxImages = 10,
  folder = "padisquare",
  onImagesChange,
  initialImages = [],
  className = "",
  error,
}) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [oldImages, setOldImages] = useState<ImageItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize old images only once
  useEffect(() => {
    const processedImages = initialImages.map((url, index) => {
      // Extract public ID from Cloudinary URL
      const urlParts = url.split("/");
      const lastPart = urlParts[urlParts.length - 1];
      const publicId = lastPart.split(".")[0];

      return {
        id: `initial-${index}-${publicId}`,
        url,
        publicId,
      };
    });

    setOldImages(processedImages);
  }, [initialImages]);

  const handleFileSelect = useCallback(
    async (files: FileList | null) => {
      if (!files) return;

      const fileArray = Array.from(files);
      const validFiles = fileArray.filter((file) => {
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} is not a valid image file`);
          return false;
        }
        if (file.size > 10 * 1024 * 1024) {
          // 10MB limit
          toast.error(`${file.name} is too large. Maximum size is 10MB`);
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) return;

      const totalCurrentImages = images.length + oldImages.length;
      const remainingSlots = maxImages - totalCurrentImages;
      const filesToUpload = validFiles.slice(0, remainingSlots);

      if (validFiles.length > remainingSlots) {
        toast.warning(`Only ${remainingSlots} more images can be uploaded`);
      }

      // Create preview items for selected files
      const newImageItems: ImageItem[] = filesToUpload.map((file) => ({
        id: `temp-${Date.now()}-${Math.random()}`,
        file,
        url: URL.createObjectURL(file),
        isUploading: true,
        uploadProgress: 0,
      }));

      setImages((prev) => [...prev, ...newImageItems]);

      try {
        const uploadPromises = filesToUpload.map(async (file, index) => {
          const tempId = newImageItems[index].id;

          try {
            const result = await CloudinaryService.uploadImage(
              file,
              folder,
              (progress) => {
                setImages((prev) =>
                  prev.map((img) =>
                    img.id === tempId
                      ? { ...img, uploadProgress: progress.percentage }
                      : img
                  )
                );
              }
            );

            // Update the image item with upload result
            setImages((prev) =>
              prev.map((img) =>
                img.id === tempId
                  ? {
                      ...img,
                      url: result.secure_url,
                      publicId: result.public_id,
                      isUploading: false,
                      uploadProgress: 100,
                    }
                  : img
              )
            );

            return result;
          } catch (error) {
            // Handle upload error
            setImages((prev) =>
              prev.map((img) =>
                img.id === tempId
                  ? {
                      ...img,
                      isUploading: false,
                      error:
                        error instanceof Error
                          ? error.message
                          : "Upload failed",
                    }
                  : img
              )
            );
            throw error;
          }
        });

        const results = await Promise.allSettled(uploadPromises);
        const successfulUploads = results
          .filter(
            (result): result is PromiseFulfilledResult<UploadResult> =>
              result.status === "fulfilled"
          )
          .map((result) => result.value);

        if (successfulUploads.length > 0) {
          // Move successful uploads into oldImages so they are not shown twice
          const uploadedImageItems: ImageItem[] = successfulUploads.map(
            (r) => ({
              id: `initial-${r.public_id}`,
              url: r.secure_url,
              publicId: r.public_id,
            })
          );

          // Append to oldImages (these are the canonical uploaded images)
          setOldImages((prev) => [...prev, ...uploadedImageItems]);

          // Remove uploaded items from the temporary `images` state to avoid duplicates
          setImages((prev) =>
            prev.filter(
              (img) =>
                !successfulUploads.some((s) => s.public_id === img.publicId)
            )
          );

          // Notify parent with previous oldImages + newly uploaded results
          const allUploadedImages = [
            ...oldImages.map((img) => ({
              public_id: img.publicId!,
              secure_url: img.url,
              width: 0,
              height: 0,
              format: "jpg",
              bytes: 0,
            })),
            ...successfulUploads,
          ];

          onImagesChange?.(allUploadedImages);
          toast.success(
            `${successfulUploads.length} image(s) uploaded successfully`
          );
        }

        const failedUploads = results.filter(
          (result) => result.status === "rejected"
        ).length;

        if (failedUploads > 0) {
          toast.error(`${failedUploads} image(s) failed to upload`);
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Failed to upload images");
      }
    },
    [images, oldImages, maxImages, folder, onImagesChange]
  );

  const handleDeleteOldImage = useCallback(
    async (imageId: string, publicId?: string) => {
      // Remove from local state immediately for better UX
      setOldImages((prev) => prev.filter((img) => img.id !== imageId));

      // If it has a publicId, delete from Cloudinary
      if (publicId) {
        try {
          await CloudinaryService.deleteImage(publicId);
          toast.success("Image deleted successfully");
        } catch (error) {
          console.error("Error deleting image:", error);
          toast.error("Failed to delete image from server");
        }
      }

      // Update parent component with remaining images
      const remainingOldImages = oldImages.filter((img) => img.id !== imageId);
      const allRemainingImages = [
        ...remainingOldImages.map((img) => ({
          public_id: img.publicId!,
          secure_url: img.url,
          width: 0,
          height: 0,
          format: "jpg",
          bytes: 0,
        })),
        ...images
          .filter((img) => img.publicId)
          .map((img) => ({
            public_id: img.publicId!,
            secure_url: img.url,
            width: 0,
            height: 0,
            format: "jpg",
            bytes: 0,
          })),
      ];

      onImagesChange?.(allRemainingImages);
    },
    [oldImages, images, onImagesChange]
  );

  const handleDeleteNewImage = useCallback(
    async (imageId: string, publicId?: string) => {
      // Remove from local state immediately for better UX
      setImages((prev) => prev.filter((img) => img.id !== imageId));

      // If it has a publicId, delete from Cloudinary
      if (publicId) {
        try {
          await CloudinaryService.deleteImage(publicId);
          toast.success("Image deleted successfully");
        } catch (error) {
          console.error("Error deleting image:", error);
          toast.error("Failed to delete image from server");
        }
      }

      // Update parent component with remaining images
      const remainingNewImages = images.filter((img) => img.id !== imageId);
      const allRemainingImages = [
        ...oldImages.map((img) => ({
          public_id: img.publicId!,
          secure_url: img.url,
          width: 0,
          height: 0,
          format: "jpg",
          bytes: 0,
        })),
        ...remainingNewImages
          .filter((img) => img.publicId)
          .map((img) => ({
            public_id: img.publicId!,
            secure_url: img.url,
            width: 0,
            height: 0,
            format: "jpg",
            bytes: 0,
          })),
      ];

      onImagesChange?.(allRemainingImages);
    },
    [images, oldImages, onImagesChange]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const totalImages = images.length + oldImages.length;
  const canAddMore = totalImages < maxImages;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-wrap gap-2">
        {/* Upload Button */}
        {canAddMore && (
          <ImageUploadButton
            ref={fileInputRef}
            onChange={handleInputChange}
            disabled={!canAddMore}
          />
        )}

        {/* Old Image Previews */}
        {oldImages.map((image) => (
          <ImagePreview
            key={image.id}
            image={image}
            onDelete={() => handleDeleteOldImage(image.id, image.publicId)}
          />
        ))}

        {/* New Image Previews */}
        {images.map((image) => (
          <ImagePreview
            key={image.id}
            image={image}
            onDelete={() => handleDeleteNewImage(image.id, image.publicId)}
          />
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-500 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

interface ImagePreviewProps {
  image: ImageItem;
  onDelete: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ image, onDelete }) => {
  const imageContent = (
    <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-colors bg-gray-50">
      <Image
        src={image.url}
        alt="Upload preview"
        fill
        className="object-cover"
        sizes="128px"
        onError={(e) => {
          e.currentTarget.src = "/placeholder-image.png";
        }}
      />

      {/* Delete Button */}
      {!image.isUploading && (
        <button
          onClick={onDelete}
          className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors z-10"
          aria-label="Delete image"
        >
          <X className="h-3 w-3" />
        </button>
      )}

      {/* Upload Progress Overlay */}
      {image.isUploading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center">
            <Upload className="h-8 w-8 text-white animate-pulse mx-auto mb-2" />
            <p className="text-white text-sm font-medium">
              {image.uploadProgress}%
            </p>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {image.error && (
        <div className="absolute inset-0 bg-red-500/90 flex items-center justify-center p-2">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-white mx-auto mb-2" />
            <p className="text-white text-xs">Error</p>
          </div>
        </div>
      )}
    </div>
  );

  // Only show hover card if image is not uploading and has no error
  if (image.isUploading || image.error) {
    return imageContent;
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer">{imageContent}</div>
      </HoverCardTrigger>
      <HoverCardContent side="top" className="w-80 p-0">
        {/* Large Image Preview */}
        <div className="relative aspect-square w-full">
          <ImageWithFallback
            src={image.url}
            alt="Full preview"
            fill
            className="object-contain"
            sizes="320px"
          />
          {/* Image info overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <p className="text-white text-xs font-medium">Preview</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

interface ImageUploadButtonProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const ImageUploadButton = React.forwardRef<
  HTMLInputElement,
  ImageUploadButtonProps
>(({ onChange, disabled }, ref) => {
  return (
    <div className="relative">
      <input
        ref={ref}
        type="file"
        accept="image/*"
        multiple
        onChange={onChange}
        disabled={disabled}
        className="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        className={`
          w-20 h-20 rounded-lg border-2 border-dashed border-gray-300 
          hover:border-gray-400 transition-colors cursor-pointer
          flex flex-col items-center justify-center gap-2
          bg-gray-50 hover:bg-gray-100
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <ImagePlus className="h-5 w-5 text-gray-400" />
      </label>
    </div>
  );
});

ImageUploadButton.displayName = "ImageUploadButton";

export default CustomImagePicker;
