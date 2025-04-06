import { UserRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { handleRBAC } from '@/lib/handlers/auth';
import handleErrors from '@/lib/handlers/errors';
import { getAllUsers } from '@/services/UserService';

export async function GET(_req: NextRequest) {
  try {
    await handleRBAC([UserRole.SERVICE_MASTER, UserRole.ADMIN]);
    
    const result = await getAllUsers();

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}