import { UserRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { handleRBAC } from '@/lib/handlers/auth';
import handleErrors from '@/lib/handlers/errors';
import { findAllUsers } from '@/repository/UserRepository';

export async function GET(_req: NextRequest) {
  try {
    //for only admin and service_master roles
    await handleRBAC([UserRole.SERVICE_MASTER, UserRole.ADMIN]);
    
    const users = await findAllUsers();
    
    return NextResponse.json({ users });
  } catch (error) {
    return handleErrors(error);
  }
}