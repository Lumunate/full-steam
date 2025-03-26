import { UserRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { handleRBAC } from '@/lib/handlers/auth';
import handleErrors from '@/lib/handlers/errors';
import { getAllSessions, createSession } from '@/services/SessionService';

export async function GET(_req: NextRequest) {
  try {
    const result = await getAllSessions();

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Only admins and service masters can create sessions
    await handleRBAC([UserRole.SERVICE_MASTER, UserRole.ADMIN]);
    
    const body = await request.json();
    const result = await createSession(body);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return handleErrors(error);
  }
}