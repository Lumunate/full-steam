import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

import { useSnackbar } from '@/components/snackbar';
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
  const { showSnackbar } = useSnackbar();

  const validateFileType = (file: File): boolean => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];
    
    if (allowedTypes.includes(file.type)) return true;
    
    const fileName = file.name.toLowerCase();

    return allowedExtensions.some(ext => fileName.endsWith(ext));
  };

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
    mutationFn: async ({ 
      file, 
      signature, 
      resourceType 
    }: { 
      file: File, 
      signature: SignatureResponse,
      resourceType: string 
    }): Promise<CloudinaryUploadResponse> => {
      const formData = new FormData();

      formData.append('file', file);
      formData.append('api_key', signature.apiKey);
      formData.append('timestamp', signature.timestamp.toString());
      formData.append('signature', signature.signature);
      formData.append('resource_type', resourceType);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${signature.cloudName}/${resourceType}/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    }
  });

  const getResourceType = (file: File): string => {
    // Check if file is a PDF
    if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
      return 'raw';
    }
    
    if (file.type.startsWith('image/')) {
      return 'image';
    }
    
    return 'raw';
  };

  const uploadFile = async (file: File): Promise<string> => {
    setError(null);
    
    // Validate file type
    if (!validateFileType(file)) {
      const errorMessage = 'Invalid file type. Only PDF, JPG, JPEG, and PNG files are allowed.';

      setError(errorMessage);
      showSnackbar({
        type: 'error',
        title: 'Upload Error',
        message: errorMessage
      });
      throw new Error(errorMessage);
    }
    
    try {
      const resourceType = getResourceType(file);
      const signature = await signatureMutation.mutateAsync(file);
      const result = await uploadMutation.mutateAsync({ file, signature, resourceType });

      showSnackbar({
        type: 'success',
        title: 'Upload Success',
        message: `File ${file.name} uploaded successfully`
      });

      return result.secure_url;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload file';

      setError(errorMessage);
      showSnackbar({
        type: 'error',
        title: 'Upload Error',
        message: errorMessage
      });
      throw err;
    }
  };

  const uploadFiles = async (files: File[]): Promise<string[]> => {
    setError(null);
    
    // Validate all files first
    const invalidFiles = files.filter(file => !validateFileType(file));

    if (invalidFiles.length > 0) {
      const errorMessage = 'Invalid file type(s). Only PDF, JPG, JPEG, and PNG files are allowed.';

      setError(errorMessage);
      showSnackbar({
        type: 'error',
        title: 'Upload Error',
        message: errorMessage
      });
      throw new Error(errorMessage);
    }
    
    try {
      const urls: string[] = [];

      for (const file of files) {
        const url = await uploadFile(file);

        urls.push(url);
      }
    
      if (urls.length > 0) {
        showSnackbar({
          type: 'success',
          title: 'Upload Complete',
          message: `Successfully uploaded ${urls.length} file(s)`
        });
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