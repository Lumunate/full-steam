import { UserRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { handleRBAC } from '@/lib/handlers/auth';
import handleErrors from '@/lib/handlers/errors';
import { toggleUserApproval } from '@/services/UserService';

export async function PATCH(
  _request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    // Only admins and service masters can toggle user approval
    await handleRBAC([UserRole.SERVICE_MASTER, UserRole.ADMIN]);
    
    const userId = params.userId;
    const result = await toggleUserApproval(userId);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}