import { useMutation } from '@tanstack/react-query';
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
  const [error, setError] = useState<string | null>(null);

  const signatureMutation = useMutation({
    mutationFn: async (file: File): Promise<SignatureResponse> => {
      const response = await axios.post('/api/upload-url', {
        fileName: file.name,
        fileType: file.type,
      });

      return response.data;
    }
  });

  const uploadMutation = useMutation({
    mutationFn: async ({ file, signature }: { file: File, signature: SignatureResponse }): Promise<CloudinaryUploadResponse> => {
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
    }
  });

  const uploadFile = async (file: File): Promise<string> => {
    setError(null);
    try {
      const signature = await signatureMutation.mutateAsync(file);
      const result = await uploadMutation.mutateAsync({ file, signature });

      return result.secure_url;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload file';

      setError(errorMessage);
      throw err;
    }
  };

  const uploadFiles = async (files: File[]): Promise<string[]> => {
    setError(null);
    try {
      const urls: string[] = [];

      for (const file of files) {
        const url = await uploadFile(file);

        urls.push(url);
      }
    
      return urls;
    
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload files';

      setError(errorMessage);
      throw err;
    }
  };

  return {
    isUploading: signatureMutation.isPending || uploadMutation.isPending,
    uploadFile,
    uploadFiles,
    error,
  };
};