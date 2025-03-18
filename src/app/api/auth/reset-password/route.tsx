import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import crypto from "crypto";
import { emailService } from "@/services/emailService";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log(`Password reset requested for email: ${email}`);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Don't reveal if user exists or not for security
    if (!user) {
      console.log(`User not found for email: ${email}`);
      return NextResponse.json({ 
        message: "If a user with that email exists, a password reset link has been sent.",
        debug: "User not found" // Remove in production
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 1); // Token expires in 1 hour

    console.log(`Generated reset token for ${email}: ${resetToken.substring(0, 6)}...`);

    // Save token to user record
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetToken,
        resetTokenExpiry: tokenExpiry,
      },
    });

    // Send password reset email with better error handling
    const emailResult = await emailService.sendResetPasswordEmail({
      to: email,
      resetToken,
    });

    if (!emailResult.success) {
      console.error(`Failed to send reset email to ${email}, but token was saved`);
      return NextResponse.json({ 
        message: "Password reset requested, but email sending failed. Please try again or contact support.",
        debug: "Email sending failed" // Remove in production
      }, { status: 500 });
    }

    return NextResponse.json({ 
      message: "If a user with that email exists, a password reset link has been sent.",
      debug: "Success" // Remove in production
    });
  } catch (error) {
    console.error("Failed to request password reset:", error);
    return NextResponse.json(
      { message: "Failed to request password reset" },
      { status: 500 }
    );
  }
}