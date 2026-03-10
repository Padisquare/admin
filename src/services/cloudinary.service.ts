// Client-side Cloudinary service - no server-side SDK needed

export interface UploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export class CloudinaryService {
  /**
   * Upload a single image to Cloudinary
   */
  static async uploadImage(
    file: File,
    folder?: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<UploadResult> {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
      );

      if (folder) {
        formData.append("folder", folder);
      }

      const xhr = new XMLHttpRequest();

      // Track upload progress
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable && onProgress) {
          const progress: UploadProgress = {
            loaded: event.loaded,
            total: event.total,
            percentage: Math.round((event.loaded / event.total) * 100),
          };
          onProgress(progress);
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve({
              public_id: response.public_id,
              secure_url: response.secure_url,
              width: response.width,
              height: response.height,
              format: response.format,
              bytes: response.bytes,
            });
          } catch (error) {
            console.error("Error parsing upload response:", error);
            reject(new Error("Failed to parse upload response"));
          }
        } else {
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      });

      xhr.addEventListener("error", () => {
        reject(new Error("Upload failed due to network error"));
      });

      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`
      );
      xhr.send(formData);
    });
  }

  /**
   * Upload multiple images concurrently
   */
  static async uploadMultipleImages(
    files: File[],
    folder?: string,
    onProgress?: (fileIndex: number, progress: UploadProgress) => void
  ): Promise<UploadResult[]> {
    const uploadPromises = files.map((file, index) =>
      this.uploadImage(file, folder, (progress) =>
        onProgress?.(index, progress)
      )
    );

    return Promise.all(uploadPromises);
  }

  /**
   * Delete an image from Cloudinary via API route
   */
  static async deleteImage(publicId: string): Promise<boolean> {
    try {
      const response = await fetch("/api/cloudinary/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete image: ${response.statusText}`);
      }

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error("Error deleting image:", error);
      return false;
    }
  }

  /**
   * Get optimized image URL with transformations
   */
  static getOptimizedUrl(
    publicId: string,
    transformations?: {
      width?: number;
      height?: number;
      quality?: string | number;
      format?: string;
      crop?: string;
    }
  ): string {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
      throw new Error("Cloudinary cloud name not configured");
    }

    let url = `https://res.cloudinary.com/${cloudName}/image/upload`;

    if (transformations) {
      const transformParams = [];
      if (transformations.width)
        transformParams.push(`w_${transformations.width}`);
      if (transformations.height)
        transformParams.push(`h_${transformations.height}`);
      if (transformations.quality)
        transformParams.push(`q_${transformations.quality}`);
      if (transformations.format)
        transformParams.push(`f_${transformations.format}`);
      if (transformations.crop)
        transformParams.push(`c_${transformations.crop}`);

      if (transformParams.length > 0) {
        url += `/${transformParams.join(",")}`;
      }
    }

    url += `/${publicId}`;
    return url;
  }
}
