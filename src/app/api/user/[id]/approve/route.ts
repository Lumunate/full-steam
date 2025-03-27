import { UserRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { handleRBAC } from '@/lib/handlers/auth';
import handleErrors from '@/lib/handlers/errors';
import { toggleUserApproval } from '@/services/UserService';

// type Params = { userId: string } | Promise<{ userId: string }>;

export async function PATCH(
  _request: NextRequest,
  // { params }: { params: Params }
  { params }: { params: Promise<{ id: string }> }
) 
{
  try {
    const { id } = await params; // Await if params is a Promise
    // Only admins and service masters can toggle user approval

    await handleRBAC([UserRole.SERVICE_MASTER, UserRole.ADMIN]);
    
    const result = await toggleUserApproval(id);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}
