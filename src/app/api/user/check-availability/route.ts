import { NextRequest, NextResponse } from 'next/server';

import handleErrors from '@/lib/handlers/errors';
import { checkFieldAvailability } from '@/services/UserService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const field = searchParams.get('field') as 'username' | 'email';
    const value = searchParams.get('value');
    
    if (!field || !value || !['username', 'email'].includes(field)) {
      return NextResponse.json({ available: false, error: 'Invalid parameters' }, { status: 400 });
    }
    
    const isAvailable = await checkFieldAvailability(field, value);
    
    return NextResponse.json({ available: isAvailable });
  } catch (error: unknown) {
    return handleErrors(error);
  }
}