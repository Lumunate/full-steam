import { UserRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import handleErrors from '@/lib/handlers/errors';
import ValidationError from '@/lib/handlers/errors/types/ValidationError';
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
    // await handleRBAC([UserRole.SERVICE_MASTER, UserRole.ADMIN]);
    const requestData = await request.json();
    const body = requestData;
    const parsedDuration = parseFloat(body.duration); 

    if (parsedDuration <= 0) {
      throw new ValidationError('Session duration must be a positive number');
    }
    const result = await createSession({
      name: body.name,
      duration: parsedDuration 
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return handleErrors(error);
  }
}