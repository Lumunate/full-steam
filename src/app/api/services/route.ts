import { NextRequest, NextResponse } from 'next/server';

import handleErrors from '@/lib/handlers/errors';
import { getAllServices } from '@/services/ServiceService';

export async function GET(_req: NextRequest) {
  try {
    const result = await getAllServices();

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}