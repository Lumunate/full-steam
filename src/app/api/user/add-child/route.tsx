
// src/app/api/user/add-child/route.ts
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
    const { firstName, lastName, age, specialNotes } = data;

    // Create update request
    await prisma.updateRequest.create({
      data: {
        userId: session.user.id,
        requestType: "CHILD_ADD",
        requestData: {
          firstName,
          lastName,
          age,
          specialNotes,
        },
        status: "PENDING",
      },
    });

    return NextResponse.json({ message: "Child add request submitted successfully" });
  } catch (error) {
    console.error("Failed to submit child add request:", error);
    return NextResponse.json(
      { message: "Failed to submit child add request" },
      { status: 500 }
    );
  }
}