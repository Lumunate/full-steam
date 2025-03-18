// src/app/api/user/update-profile/route.ts
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

    // Create update request
    await prisma.updateRequest.create({
      data: {
        userId: session.user.id,
        requestType: "PROFILE_UPDATE",
        requestData: {
          firstName,
          lastName,
          phone,
          address,
          city,
          postalCode,
          additionalInfo,
        },
        status: "PENDING",
      },
    });

    return NextResponse.json({ message: "Profile update request submitted successfully" });
  } catch (error) {
    console.error("Failed to submit profile update request:", error);
    return NextResponse.json(
      { message: "Failed to submit profile update request" },
      { status: 500 }
    );
  }
}

