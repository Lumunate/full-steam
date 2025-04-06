import { NextRequest, NextResponse } from 'next/server';

import { handleAuthorizeUserSession } from '@/lib/handlers/auth/handle-authorize-user-session';
import handleErrors from '@/lib/handlers/errors';
import { getUserPackages, createPackage } from '@/services/PackageService';

export async function GET(_req: NextRequest) {
  try {
    const user = await handleAuthorizeUserSession();
    const result = await getUserPackages(user.id);

    return NextResponse.json(result);
  } catch (error) {
    return handleErrors(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await handleAuthorizeUserSession();
    const body = await request.json();
    const result = await createPackage(user.id, body);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return handleErrors(error);
  }
}