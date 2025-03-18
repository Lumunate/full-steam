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

    console.log("Updating child with ID:", id);
    console.log("User ID:", session.user.id);
    console.log("Full data:", data);

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
      console.log("Child not found or doesn't belong to user");
      return NextResponse.json(
        { message: "Child not found or does not belong to user" },
        { status: 404 }
      );
    }

    // Directly update the child
    const updatedChild = await prisma.child.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        age,
        specialNotes: specialNotes || "",
      },
    });

    console.log("Child updated successfully:", updatedChild);
    return NextResponse.json({ 
      message: "Child updated successfully",
      child: updatedChild
    });
  } catch (error) {
    console.error("Failed to update child:", error);
    return NextResponse.json(
      { message: "Failed to update child: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}