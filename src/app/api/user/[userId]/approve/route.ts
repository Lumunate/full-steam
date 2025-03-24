import { NextRequest, NextResponse } from 'next/server';

import { handleAuthorizeUserSession } from '@/lib/handlers/auth/handle-authorize-user-session';
import handleErrors from '@/lib/handlers/errors';
import { toggleUserApproval } from '@/services/UserService';

export async function PATCH(
  request: NextRequest,
  context: any
) {
  try {
    const userId = context?.params?.userId as string;
    
    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }
    
    const currentUser = await handleAuthorizeUserSession();
    const updatedUser = await toggleUserApproval(userId, currentUser.role);
    
    return NextResponse.json({
      message: `User approval status toggled to ${updatedUser.isApproved}`,
      isApproved: updatedUser.isApproved,
    });
  } catch (error) {
    return handleErrors(error);
  }
}