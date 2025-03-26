import { CloudUpload as UploadIcon } from '@mui/icons-material';
import ErrorIcon from '@mui/icons-material/Error';
import {
  Box,
  CircularProgress,
  Typography,
  Avatar,
} from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { useSnackbar } from '@/components/snackbar';

import { DropZone, Input } from './PicUpload.style';
import {
  CloudinaryUploadResponse,
  FileUploadProps,
  UploadStatus,
} from './PicUpload.types';
import { SignatureResponse } from '../../types/SignatureResponse';

const PicUpload: React.FC<FileUploadProps> = ({
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 5,
  hoist = () => {},
  reset,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);
  const [, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (reset) {
      setFiles([]);
      setUploadStatus(null);
      setUploadProgress({});
      setPreviewUrl('');
      hoist(''); // Clear the hoisted value
    }
  }, [reset, hoist]);

  const validateFiles = (
    fileList: File[],
  ): { isValid: boolean; error?: string } => {
    const allowedTypes = [
      'image/jpeg', 
      'image/jpg', 
      'image/png', 
      'image/gif'
    ];

    const hasInvalidType = fileList.some(
      file => !allowedTypes.includes(file.type),
    );

    if (hasInvalidType) {
      return { isValid: false, error: 'Only jpeg, jpg, png and gif images are allowed' };
    }

    const hasInvalidSize = fileList.some(file => file.size > maxFileSize);

    if (hasInvalidSize) {
      return {
        isValid: false,
        error: `Files must be smaller than ${maxFileSize / (1024 * 1024)}MB`,
      };
    }

    if (files.length + fileList.length > maxFiles) {
      return {
        isValid: false,
        error: `Maximum ${maxFiles} files allowed`,
      };
    }

    return { isValid: true };
  };

  const getSignature = async (file: File): Promise<SignatureResponse> => {
    const response = await axios.post('/api/upload-url', {
      fileName: file.name,
      fileType: file.type,
    });

    return response.data;
  };

  const uploadFile = async (
    file: File,
    signature: SignatureResponse,
  ): Promise<CloudinaryUploadResponse> => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('api_key', signature.apiKey);
    formData.append('timestamp', signature.timestamp.toString());
    formData.append('signature', signature.signature);

    formData.append('resource_type', 'image');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(`Upload failed: ${response.status} ${errorText}`);
    }

    return response.json();
  };

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
      e.stopPropagation();

      const droppedFiles = Array.from(e.dataTransfer.files);
      const validation = validateFiles(droppedFiles);

      if (!validation.isValid) {
        setUploadStatus({
          type: 'error',
          message: validation.error || 'Validation failed',
        });

        return;
      }

      setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
      setUploadStatus(null);
    },
    [files.length],
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const validation = validateFiles(selectedFiles);

    if (!validation.isValid) {
      setUploadStatus({
        type: 'error',
        message: validation.error || 'Validation failed',
      });

      return;
    }

    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    setUploadStatus(null);
  };

  const uploadToCloudinary = async (): Promise<void> => {
    setUploading(true);
    setUploadStatus(null);

    try {
      if (!files[0]) {
        return;
      }

      const signature = await getSignature(files[0]);
      const uploadedUrls: string[] = [];

      for (const file of files) {
        try {
          setUploadProgress(prev => ({
            ...prev,
            [file.name]: 0,
          }));

          const result = await uploadFile(file, signature);

          uploadedUrls.push(result.secure_url);

          setUploadProgress(prev => ({
            ...prev,
            [file.name]: 100,
          }));
        } catch  {
          showSnackbar({
            title: 'Upload Error',
            message: `Failed to upload ${file.name}`,
          });
          throw new Error(`Failed to upload ${file.name}`);
        }
      }

      setUploadStatus({
        type: 'success',
        message: `Successfully uploaded ${uploadedUrls.length} files`,
        urls: uploadedUrls,
      });

      // Set preview URL for display
      if (uploadedUrls[0]) {
        setPreviewUrl(uploadedUrls[0]);
        hoist(uploadedUrls[0]);
      }

      setUploadProgress({});
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message:
          error instanceof Error ? error.message : 'Failed to upload files',
      });
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (files.length > 0) {
      uploadToCloudinary();
    }
  }, [files]);

  const handleReset = () => {
    setFiles([]);
    setUploadStatus(null);
    setPreviewUrl('');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {uploading ? (
        <Box
          sx={{
            width: 120,
            height: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px dashed #ccc`,
            borderRadius: '50%',
          }}
        >
          <CircularProgress
            size={40}
            color={'primary'}
          />
        </Box>
      ) : uploadStatus?.type === 'success' && previewUrl ? (
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={previewUrl}
            alt="Profile"
            sx={{ 
              width: 120, 
              height: 120,
              border: '2px solid #f0f0f0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              cursor: 'pointer',
            }}
            onClick={() => handleFileSelect}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -5,
              right: -5,
              backgroundColor: 'white',
              borderRadius: '50%',
              padding: 0.5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
            onClick={handleReset}
          >
            <UploadIcon fontSize="small" />
          </Box>
        </Box>
      ) : (
        <Box>
          <DropZone 
            onDragOver={onDragOver} 
            onDrop={onDrop}
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
            }}
          >
            <Input
              type='file'
              accept='.jpg,.jpeg,.png,.gif'
              onChange={handleFileSelect}
              id='file-input'
            />

            <label htmlFor='file-input' style={{ display: 'block', width: '100%', height: '100%' }}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  borderRadius: '50%',
                }}
              >
                {uploadStatus?.type === 'error' ? (
                  <ErrorIcon sx={{ color: 'black', fontSize: 40 }} />
                ) : (
                  <UploadIcon
                    sx={{
                      color: 'text.secondary',
                      fontSize: 40,
                    }}
                  />
                )}
              </Box>
            </label>
          </DropZone>
          
          <Typography 
            variant='body2' 
            align="center" 
            color='text.secondary'
            sx={{ mt: 1 }}
          >
            {uploadStatus?.type === 'error' 
              ? uploadStatus.message 
              : 'Upload profile photo'}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PicUpload;