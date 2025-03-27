import { NextRequest, NextResponse } from 'next/server';

import { handleAuthorizeUserSession } from '@/lib/handlers/auth/handle-authorize-user-session';
import handleErrors from '@/lib/handlers/errors';
import AuthError, { AuthErrorType } from '@/lib/handlers/errors/types/AuthError';
import NotFoundError from '@/lib/handlers/errors/types/NotFoundError';
import * as PackageRepository from '@/repository/PackageRepository';
import { getPackageById, updatePackage, deletePackage } from '@/services/PackageService';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Await the params to resolve the Promise
    const packageData = await PackageRepository.findPackageById(id);
    
    if (!packageData) {
      throw new NotFoundError('Package not found');
    }
    
    const result = await getPackageById(id);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await handleAuthorizeUserSession();
    const { id } = await params; 
    
    // Verify package exists 
    const packageData = await PackageRepository.findPackageById(id);
    
    if (!packageData) {
      throw new NotFoundError('Package not found');
    }
    // Check ownership
    if (packageData.userId !== user.id) {
      throw new AuthError(AuthErrorType.UNAUTHORIZED, 403);
    }
    
    const body = await request.json();
    const result = await updatePackage(id, user.id, body);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await handleAuthorizeUserSession();
    const { id } = await params; 
    
    // Verify package exists and check ownership
    const packageData = await PackageRepository.findPackageById(id);
    
    if (!packageData) {
      throw new NotFoundError('Package not found');
    }
    
    if (packageData.userId !== user.id) {
      throw new AuthError(AuthErrorType.UNAUTHORIZED, 403);
    }
    
    const result = await deletePackage(id);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}
