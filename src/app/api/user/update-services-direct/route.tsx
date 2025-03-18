
// src/app/api/user/update-services-direct/route.ts
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

    // Directly update the services
    await prisma.service.update({
      where: {
        userId: session.user.id,
      },
      data: {
        childcare,
        mealPreparation,
        lightHousekeeping,
        tutoring,
        petMinding,
      },
    });

    return NextResponse.json({ message: "Services updated successfully" });
  } catch (error) {
    console.error("Failed to update services:", error);
    return NextResponse.json(
      { message: "Failed to update services" },
      { status: 500 }
    );
  }
}
