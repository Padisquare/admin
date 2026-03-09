"use client";

import { CloudinaryService } from "@/services/cloudinary.service";
import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import clsx from "clsx";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface SingleImageUploadProps {
  label?: string;
  value?: string;
  onChange?: (url: string) => void;
  width?: number;
  height?: number;
  className?: string;
  folder?: string;
  disabled?: boolean;
  name: string;
  labelClassName?: string;
  required?: boolean;
  error?: string;
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  label,
  value,
  onChange,
  width = 160,
  height = 160,
  className,
  folder = "padisquare",
  disabled = false,
  name,
  labelClassName,
  required,
  error,
}) => {
  const [preview, setPreview] = useState<string | undefined>(value);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image must be less than 10MB");
        return;
      }

      // Local preview (before upload)
      const localPreview = URL.createObjectURL(file);
      setPreview(localPreview);

      try {
        setIsUploading(true);
        const res = await CloudinaryService.uploadImage(file, folder);
        setPreview(res.secure_url);
        onChange?.(res.secure_url);
        toast.success("Image uploaded successfully");
      } catch (err) {
        console.error(err);
        toast.error("Upload failed");
        setPreview(value);
      } finally {
        setIsUploading(false);
      }
    },
    [folder, onChange, value],
  );

  const handleRemove = () => {
    setPreview(undefined);
    onChange?.("");
  };

  return (
    <div>
      {label && (
        <Label
          id={name}
          className={cn(
            "font-bold mb-[10px] block text-black text-[15px]",
            labelClassName,
          )}
        >
          {label}
          {required && <span>*</span>}
        </Label>
      )}
      <div
        style={{ width, height }}
        className={clsx(
          "relative rounded-lg border border-dashed flex items-center justify-center bg-muted overflow-hidden",
          className,
        )}
      >
        {preview ? (
          <>
            <Image
              src={preview}
              alt="Preview"
              height={height}
              width={width}
              className="object-cover"
            />

            {!disabled && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 z-10 rounded-full bg-black/60 p-1 text-white hover:bg-black"
              >
                <X size={14} />
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center text-muted-foreground">
            <ImagePlus size={22} />
            {height > 100 && width > 100 && (
              <span className="text-xs mt-1">Upload image</span>
            )}
          </div>
        )}

        {!disabled && (
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={isUploading}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Loader2 className="animate-spin text-white" size={20} />
          </div>
        )}
      </div>
      {error && (
        <p className="font-semibold mt-1 text-red-500 text-sm">{error}</p>
      )}
    </div>
  );
};

export default SingleImageUpload;
