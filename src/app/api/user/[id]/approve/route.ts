import { UserRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { handleRBAC } from '@/lib/handlers/auth';
import handleErrors from '@/lib/handlers/errors';
import { toggleUserApproval } from '@/services/UserService';

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) 
{
  try {
    const { id } = await params; 

    await handleRBAC([UserRole.SERVICE_MASTER, UserRole.ADMIN]);
    
    const result = await toggleUserApproval(id);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}
