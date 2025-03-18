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

    const body = await request.json();
    const { userId, isActive } = body;

    console.log("Toggle user status request:", { userId, isActive });

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    // Get the user with their name and email for notification
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { 
        id: true, 
        isActive: true,
        firstName: true,
        lastName: true,
        email: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    console.log("Current user status:", user.isActive);
    console.log("Setting user status to:", isActive);

    // Update user active status
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: isActive,
      },
    });

    console.log("Updated user status:", updatedUser.isActive);

    // Send notification email based on active status
    if (!isActive) {
      // Account deactivated - send blocked email
      await emailService.sendAccountBlockedEmail({
        to: user.email,
        name: `${user.firstName} ${user.lastName}`,
        reason: "not meeting service terms and conditions"
      });
      console.log("Sent account blocked email to:", user.email);
    } else {
      // Account activated - send activation email
      await emailService.sendAccountActivatedEmail({
        to: user.email,
        name: `${user.firstName} ${user.lastName}`
      });
      console.log("Sent account activated email to:", user.email);
    }

    return NextResponse.json({ 
      message: `User ${isActive ? "activated" : "deactivated"} successfully`,
      user: {
        id: updatedUser.id,
        isActive: updatedUser.isActive
      }
    });
  } catch (error) {
    console.error("Failed to toggle user status:", error);
    return NextResponse.json(
      { message: "Failed to toggle user status: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}