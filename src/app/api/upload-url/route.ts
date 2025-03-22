import { NextRequest, NextResponse } from 'next/server';

import handleErrors from '@/lib/handlers/errors';
import storageService from '@/lib/handlers/storage';
import { uploadSchema } from '@/lib/handlers/storage/types/upload';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fileName, fileType } = uploadSchema.parse(body);
    
    const signatureResponse = await storageService.generateUploadUrl(fileName, fileType);
    
    return NextResponse.json(signatureResponse);
  } catch (error: unknown) {
    return handleErrors(error);
  }
}