import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        postalCode: true,
        additionalInfo: true,
        children: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            age: true,
            specialNotes: true,
          },
        },
        services: {
          select: {
            childcare: true,
            mealPreparation: true,
            lightHousekeeping: true,
            tutoring: true,
            petMinding: true,
          },
        },
        paymentInfo: {
          select: {
            id: true,
            nameOnCard: true,
            cardNumber: true,
            expiryDate: true,
            cvv: true,
            saveCard: true,
          },
        },
        updateRequests: {
          where: {
            OR: [
              { status: "PENDING" },
              { 
                status: { in: ["APPROVED", "REJECTED"] },
                createdAt: {
                  gte: new Date(new Date().setDate(new Date().getDate() - 7)) // Last 7 days
                }
              }
            ]
          },
          select: {
            id: true,
            requestType: true,
            status: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Log the data for debugging
    console.log("User profile data:", JSON.stringify({
      id: user.id,
      firstName: user.firstName,
      hasPaymentInfo: !!user.paymentInfo,
      children: user.children.length,
    }));

    return NextResponse.json(user);
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return NextResponse.json(
      { message: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}