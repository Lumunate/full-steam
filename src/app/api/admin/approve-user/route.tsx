import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { emailService } from "@/services/emailService";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { userId } = await request.json();

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isApproved: true,
      },
    });

    // Send approval email with better error handling
    console.log(`Approving user: ${user.email}`);
    
    const emailResult = await emailService.sendApprovalEmail({
      to: user.email,
      name: `${user.firstName} ${user.lastName}`,
    });
    
    // Log email result but don't block approval if email fails
    if (!emailResult.success) {
      console.error(`Email failed but user was approved: ${user.email}`);
    }

    return NextResponse.json({ 
      message: "User approved successfully",
      emailSent: emailResult.success
    });
  } catch (error) {
    console.error("Failed to approve user:", error);
    return NextResponse.json(
      { message: "Failed to approve user" },
      { status: 500 }
    );
  }
}