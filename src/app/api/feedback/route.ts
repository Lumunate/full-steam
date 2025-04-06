import { UserRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { handleRBAC } from '@/lib/handlers/auth';
import handleErrors from '@/lib/handlers/errors';
import { createFeedback, getAllFeedbacks } from '@/services/feedback';
import { feedbackSchema } from '@/types/feedback';

export async function GET(request: NextRequest) {
  try {
    await handleRBAC([UserRole.SERVICE_MASTER, UserRole.ADMIN]);
    const feedbacks = await getAllFeedbacks();

    return NextResponse.json(feedbacks);
  } catch (error) {
    return handleErrors(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = feedbackSchema.parse(body);
    const feedback = await createFeedback(validatedData);

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    return handleErrors(error);
  }
}