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
    const { userId, isApproved } = body;

    console.log("Toggle user approval request:", { userId, isApproved });

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
        isApproved: true,
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

    console.log("Current user approval status:", user.isApproved);
    console.log("Setting user approval status to:", isApproved);

    // Update user approval status
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isApproved: isApproved,
      },
    });

    console.log("Updated user approval status:", updatedUser.isApproved);

    // Send notification email based on approval status
    if (isApproved) {
      // Account approved - send approval email
      await emailService.sendApprovalEmail({
        to: user.email,
        name: `${user.firstName} ${user.lastName}`
      });
      console.log("Sent approval email to:", user.email);
    } else {
      // Account unapproved - send unapproval email
      await emailService.sendAccountBlockedEmail({
        to: user.email,
        name: `${user.firstName} ${user.lastName}`,
        reason: "not meeting service terms and conditions"
      });
      console.log("Sent account blocked email to:", user.email);
    }

    return NextResponse.json({ 
      message: `User ${isApproved ? "approved" : "unapproved"} successfully`,
      user: {
        id: updatedUser.id,
        isApproved: updatedUser.isApproved
      }
    });
  } catch (error) {
    console.error("Failed to toggle user approval status:", error);
    return NextResponse.json(
      { message: "Failed to toggle user approval status: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}