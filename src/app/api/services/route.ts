import { UserRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { handleRBAC } from '@/lib/handlers/auth';
import handleErrors from '@/lib/handlers/errors';
import { getAllServices, createService } from '@/services/ServiceService';
import { createServiceSchema } from '@/types/services';

export async function GET(_req: NextRequest) {
  try {
    const result = await getAllServices();

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}
export async function POST(request: NextRequest) {
  try {
    await handleRBAC([UserRole.SERVICE_MASTER, UserRole.ADMIN]);
    
    const body = await request.json();
    const validatedData = createServiceSchema.parse(body);
    
    const result = await createService(validatedData);
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return handleErrors(error);
  }
}