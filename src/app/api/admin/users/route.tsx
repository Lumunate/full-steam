import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const users = await prisma.user.findMany({
      where: {
        isAdmin: false, // Don't show admin users
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        address: true,
        city: true,
        postalCode: true,
        additionalInfo: true,
        isApproved: true,
        createdAt: true,
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
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}