import { UserRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { handleRBAC } from '@/lib/handlers/auth';
import handleErrors from '@/lib/handlers/errors';
import NotFoundError from '@/lib/handlers/errors/types/NotFoundError';
import * as SessionRepository from '@/repository/SessionRepository';
import { getSessionById, updateSession, deleteSession } from '@/services/SessionService';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sessionId = params.id;
    const session = await SessionRepository.findSessionById(sessionId);
    
    if (!session) {
      throw new NotFoundError('Session not found');
    }
    
    const result = await getSessionById(sessionId);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Only admins and service masters can update sessions
    await handleRBAC([UserRole.SERVICE_MASTER, UserRole.ADMIN]);
    
    const sessionId = params.id;
    const session = await SessionRepository.findSessionById(sessionId);
    
    if (!session) {
      throw new NotFoundError('Session not found');
    }
    
    const body = await request.json();
    const result = await updateSession(sessionId, body);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Only admins and service masters can delete sessions
    await handleRBAC([UserRole.SERVICE_MASTER, UserRole.ADMIN]);
    
    const sessionId = params.id;
    const session = await SessionRepository.findSessionById(sessionId);
    
    if (!session) {
      throw new NotFoundError('Session not found');
    }
    
    const result = await deleteSession(sessionId);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}