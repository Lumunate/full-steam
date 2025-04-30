import { UserRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { handleRBAC } from '@/lib/handlers/auth';
import handleErrors from '@/lib/handlers/errors';
import { prisma } from '@/lib/prisma';
export async function GET(_request: NextRequest) {
  try {
    await handleRBAC([UserRole.SERVICE_MASTER, UserRole.ADMIN]);
    const activeUsers = await prisma.user.count({
      where: {
        isDeleted: false,
        isBlocked: false,
      },
    });
    const applicationRequests = await prisma.user.count({
      where: {
        role: UserRole.HELPER,
      },
    });
    const hoursWorked = 386;
    const totalEarnings = 4520;
    const platformCommissions = Math.round(totalEarnings * 0.2);

    return NextResponse.json({
      activeUsers,
      totalEarnings,
      platformCommissions,
      applicationRequests,
      hoursWorked,
    });
  } catch (error) {
    return handleErrors(error);
  }
}