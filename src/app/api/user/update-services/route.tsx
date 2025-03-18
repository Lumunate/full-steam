
// src/app/api/user/update-services/route.ts
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
    const { childcare, mealPreparation, lightHousekeeping, tutoring, petMinding } = data;

    // Create update request
    await prisma.updateRequest.create({
      data: {
        userId: session.user.id,
        requestType: "SERVICE_UPDATE",
        requestData: {
          childcare,
          mealPreparation,
          lightHousekeeping,
          tutoring,
          petMinding,
        },
        status: "PENDING",
      },
    });

    return NextResponse.json({ message: "Service update request submitted successfully" });
  } catch (error) {
    console.error("Failed to submit service update request:", error);
    return NextResponse.json(
      { message: "Failed to submit service update request" },
      { status: 500 }
    );
  }
}