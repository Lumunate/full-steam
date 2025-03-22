import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
        
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized: No session' }, { status: 401 });
    }
    
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
        
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized: User not found' }, { status: 401 });
    }
    
    if (currentUser.role !== 'ADMIN' && currentUser.role !== 'SERVICE_MASTER') {
      return NextResponse.json({ error: 'Unauthorized: Insufficient permissions' }, { status: 403 });
    }
    
    const userToUpdate = await prisma.user.findUniqueOrThrow({
      where: { id: userId }
    });
        
    if (!userToUpdate) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isApproved: !userToUpdate.isApproved }
    });
        
    return NextResponse.json({
      message: `User approval status toggled to ${updatedUser.isApproved}`,
      isApproved: updatedUser.isApproved,
    });
  } catch (error) {
    return NextResponse.json({

      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}