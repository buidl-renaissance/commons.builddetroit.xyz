/**
 * Client-side image compression utility
 * Compresses images to reduce upload size while maintaining quality
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  maxSizeMB?: number;
}

const DEFAULT_OPTIONS: CompressionOptions = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 0.8,
  maxSizeMB: 2,
};

/**
 * Compresses an image file
 * @param file - The image file to compress
 * @param options - Compression options
 * @returns Promise resolving to compressed file data URL
 */
export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<string> {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        try {
          // Calculate new dimensions
          let { width, height } = img;
          
          if (opts.maxWidth && width > opts.maxWidth) {
            height = (height * opts.maxWidth) / width;
            width = opts.maxWidth;
          }
          
          if (opts.maxHeight && height > opts.maxHeight) {
            width = (width * opts.maxHeight) / height;
            height = opts.maxHeight;
          }

          // Create canvas and draw resized image
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Try different quality levels if size is still too large
          let quality = opts.quality!;
          let dataUrl = canvas.toDataURL(file.type, quality);
          
          // If still too large, reduce quality iteratively
          const maxSizeBytes = (opts.maxSizeMB || 2) * 1024 * 1024;
          const base64Size = (dataUrl.length * 3) / 4; // Approximate size after base64 encoding
          
          while (base64Size > maxSizeBytes && quality > 0.1) {
            quality -= 0.1;
            dataUrl = canvas.toDataURL(file.type, quality);
          }

          resolve(dataUrl);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Gets the size of a base64 string in MB
 */
export function getBase64SizeMB(base64String: string): number {
  const base64Length = base64String.length;
  const sizeInBytes = (base64Length * 3) / 4;
  return sizeInBytes / (1024 * 1024);
}

