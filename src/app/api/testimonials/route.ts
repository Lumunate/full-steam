import { NextRequest, NextResponse } from 'next/server';

import handleErrors from '@/lib/handlers/errors';
import { getPublishedFeedbacks } from '@/services/feedback';

export async function GET(_request: NextRequest) {
  try {
    const testimonials = await getPublishedFeedbacks();

    return NextResponse.json(testimonials);
  } catch (error) {
    return handleErrors(error);
  }
}