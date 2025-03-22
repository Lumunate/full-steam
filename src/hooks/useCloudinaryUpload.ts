/* eslint-disable newline-after-var */
/* eslint-disable padding-line-between-statements */
import axios from 'axios';
import { useState } from 'react';

import { CloudinaryUploadResponse } from '@/lib/handlers/storage/lib/cloudinary/components/file-upload/FileUpload.types';
import { SignatureResponse } from '@/lib/handlers/storage/lib/cloudinary/types/SignatureResponse';

interface UseCloudinaryUploadReturn {
  isUploading: boolean;
  uploadFile: (file: File) => Promise<string>;
  uploadFiles: (files: File[]) => Promise<string[]>;
  error: string | null;
}

export const useCloudinaryUpload = (): UseCloudinaryUploadReturn => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getSignature = async (file: File): Promise<SignatureResponse> => {
    try {
      const response = await axios.post('/api/upload-url', {
        fileName: file.name,
        fileType: file.type,
      });
      return response.data;
    } catch (err) {
      setError('Failed to get upload signature');
      throw err;
    }
  };

  const uploadToCloudinary = async (
    file: File,
    signature: SignatureResponse,
  ): Promise<CloudinaryUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', signature.apiKey);
    formData.append('timestamp', signature.timestamp.toString());
    formData.append('signature', signature.signature);
    formData.append('resource_type', 'auto');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${signature.cloudName}/auto/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    return response.json();
  };

  const uploadFile = async (file: File): Promise<string> => {
    setIsUploading(true);
    setError(null);

    try {
      const signature = await getSignature(file);
      const result = await uploadToCloudinary(file, signature);
      return result.secure_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload file');
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const uploadFiles = async (files: File[]): Promise<string[]> => {
    setIsUploading(true);
    setError(null);

    try {
      const urls: string[] = [];
      for (const file of files) {
        const url = await uploadFile(file);
        urls.push(url);
      }
      return urls;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload files');
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    uploadFile,
    uploadFiles,
    error,
  };
};