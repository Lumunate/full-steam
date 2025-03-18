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
    const { id, firstName, lastName, age, specialNotes } = data;

    if (!id) {
      return NextResponse.json(
        { message: "Child ID is required" },
        { status: 400 }
      );
    }

    // Verify the child belongs to the user
    const child = await prisma.child.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!child) {
      return NextResponse.json(
        { message: "Child not found or does not belong to user" },
        { status: 404 }
      );
    }

    // Create update request
    await prisma.updateRequest.create({
      data: {
        userId: session.user.id,
        requestType: "CHILD_UPDATE",
        requestData: {
          id, // Use the id directly
          childId: id, // Keep childId for backward compatibility
          firstName,
          lastName,
          age,
          specialNotes,
        },
        status: "PENDING",
      },
    });

    return NextResponse.json({ message: "Child update request submitted successfully" });
  } catch (error) {
    console.error("Failed to submit child update request:", error);
    return NextResponse.json(
      { message: "Failed to submit child update request" },
      { status: 500 }
    );
  }
}