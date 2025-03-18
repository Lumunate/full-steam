// src/app/api/user/update-profile-direct/route.ts
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
    const { firstName, lastName, phone, address, city, postalCode, additionalInfo } = data;

    // Directly update the user profile
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        firstName,
        lastName,
        phone,
        address,
        city,
        postalCode,
        additionalInfo,
      },
    });

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Failed to update profile:", error);
    return NextResponse.json(
      { message: "Failed to update profile" },
      { status: 500 }
    );
  }
}
