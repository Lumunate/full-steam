
// src/app/api/user/update-payment-direct/route.ts
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await request.json();
    const { nameOnCard, cardNumber, expiryDate, cvv, saveCard } = data;

    // Check if payment info exists for this user
    const existingPayment = await prisma.payment.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (existingPayment) {
      // Update existing payment
      await prisma.payment.update({
        where: {
          userId: session.user.id,
        },
        data: {
          nameOnCard,
          cardNumber,
          expiryDate,
          cvv,
          saveCard,
        },
      });
    } else {
      // Create new payment record
      await prisma.payment.create({
        data: {
          nameOnCard,
          cardNumber,
          expiryDate,
          cvv,
          saveCard,
          agreedToTerms: true,
          userId: session.user.id,
        },
      });
    }

    return NextResponse.json({ message: "Payment information updated successfully" });
  } catch (error) {
    console.error("Failed to update payment information:", error);
    return NextResponse.json(
      { message: "Failed to update payment information" },
      { status: 500 }
    );
  }
}