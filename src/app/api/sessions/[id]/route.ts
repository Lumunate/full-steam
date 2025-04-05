import { UserRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { handleRBAC } from '@/lib/handlers/auth';
import handleErrors from '@/lib/handlers/errors';
import NotFoundError from '@/lib/handlers/errors/types/NotFoundError';
import * as SessionService from '@/services/SessionService';
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; 
    const session = await SessionService.getSessionById(id);

    if (!session) {
      throw new NotFoundError('Session not found');
    }
    const result = await SessionService.getSessionById(id);

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
    await handleRBAC([UserRole.SERVICE_MASTER, UserRole.ADMIN]);
    const { id } = await params; 
    const session = await SessionService.getSessionById(id);

    if (!session) {
      throw new NotFoundError('Session not found');
    }
    const body = await request.json();
    const result = await SessionService.updateSession(id, body);

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
    await handleRBAC([UserRole.SERVICE_MASTER, UserRole.ADMIN]);
    const { id } = await params;
    const session = await SessionService.getSessionById(id);

    if (!session) {
      throw new NotFoundError('Session not found');
    }
    const result = await SessionService.deleteSession(id);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}
