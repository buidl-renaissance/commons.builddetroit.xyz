import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { compressImage, getBase64SizeMB } from '@/lib/imageCompression';

const ProfilePictureContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ProfilePictureUpload = styled.div<{ hasImage: boolean }>`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px dashed ${({ theme, hasImage }) => hasImage ? theme.colors.neonOrange : theme.colors.rustedSteel}60;
  background: ${({ theme, hasImage }) => hasImage ? 'transparent' : `${theme.colors.creamyBeige}40`};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    border-color: ${({ theme }) => theme.colors.neonOrange};
    border-style: solid;
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(255, 79, 0, 0.2);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const ProfilePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.rustedSteel};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  text-align: center;
  padding: 1rem;
  
  div {
    text-align: center;
  }
`;

const UploadIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.rustedSteel}80;
  margin-bottom: 0.5rem;
`;

const HiddenFileInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const UploadText = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.rustedSteel};
  text-align: center;
  margin-top: 0.5rem;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;

  ${ProfilePictureUpload}:hover & {
    opacity: 1;
  }
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.asphaltBlack};
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  display: block;
  line-height: 1.4;
`;

interface ProfileImageUploadProps {
  label?: string;
  value?: string; // URL of existing image
  onChange: (url: string) => void; // Now returns the uploaded URL
  onError?: (error: string) => void;
  disabled?: boolean;
  required?: boolean;
  maxSize?: number; // in MB, default 5MB
  accept?: string; // file types, default "image/*"
}

export default function ProfileImageUploadComponent({
  label = "Profile Picture",
  value = "",
  onChange,
  onError,
  disabled = false,
  required = false,
  maxSize = 5,
  accept = "image/*"
}: ProfileImageUploadProps) {
  const [preview, setPreview] = useState<string>(value);
  const [isUploading, setIsUploading] = useState(false);

  // Update preview when value prop changes
  useEffect(() => {
    setPreview(value);
  }, [value]);

  const uploadImage = async (file: File): Promise<string> => {
    // Compress image before uploading to stay within Vercel's 4.5MB limit
    const compressedData = await compressImage(file, {
      maxWidth: 800,  // Profile images can be smaller
      maxHeight: 800,
      quality: 0.85,
      maxSizeMB: 1, // Profile images can be even smaller
    });

    const compressedSize = getBase64SizeMB(compressedData);
    console.log(`Compressed profile image size: ${compressedSize.toFixed(2)}MB`);

    // Upload the file using the upload API
    const uploadResponse = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: compressedData,
        fileName: `profile-${Date.now()}.${file.name.split('.').pop()}`,
        fileType: file.type,
        folder: 'profiles'
      }),
    });

    const uploadResult = await uploadResponse.json();
    
    if (!uploadResponse.ok || !uploadResult.success) {
      throw new Error(uploadResult.error || 'Failed to upload profile picture');
    }

    return uploadResult.url;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        const errorMsg = 'Please select an image file';
        onError?.(errorMsg);
        return;
      }

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        const errorMsg = `Image size must be less than ${maxSize}MB`;
        onError?.(errorMsg);
        return;
      }

      setIsUploading(true);
      
      try {
        // Create preview immediately
        const reader = new FileReader();
        reader.onload = (e) => {
          const previewUrl = e.target?.result as string;
          setPreview(previewUrl);
        };
        reader.readAsDataURL(file);

        // Upload the image
        const imageUrl = await uploadImage(file);
        
        // Update preview with uploaded URL and notify parent
        setPreview(imageUrl);
        onChange(imageUrl);
        
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Failed to upload image';
        onError?.(errorMsg);
        // Reset preview on error
        setPreview(value);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <ProfilePictureContainer>
      {label && <Label>{label}{required && ' *'}</Label>}
      <ProfilePictureUpload 
        hasImage={!!preview} 
        style={{ cursor: disabled || isUploading ? 'not-allowed' : 'pointer' }}
      >
        {preview ? (
          <ProfileImage src={preview} alt="Profile preview" />
        ) : (
          <ProfilePlaceholder>
            <UploadIcon>{isUploading ? '⏳' : '📷'}</UploadIcon>
            <div>{isUploading ? 'Uploading...' : 'Click to upload'}</div>
          </ProfilePlaceholder>
        )}
        <HiddenFileInput
          type="file"
          accept={accept}
          onChange={handleFileUpload}
          id="profilePictureInput"
          disabled={disabled || isUploading}
        />
        {!disabled && !isUploading && preview && (
          <ImageOverlay>Change Photo</ImageOverlay>
        )}
      </ProfilePictureUpload>
      <UploadText>
        {isUploading ? 'Uploading image...' : preview ? 'Image uploaded successfully' : 'No file selected'}
      </UploadText>
    </ProfilePictureContainer>
  );
}
