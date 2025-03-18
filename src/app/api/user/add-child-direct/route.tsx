
// src/app/api/user/add-child-direct/route.ts
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

    // Directly add the child
    await prisma.child.create({
      data: {
        firstName,
        lastName,
        age,
        specialNotes,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ message: "Child added successfully" });
  } catch (error) {
    console.error("Failed to add child:", error);
    return NextResponse.json(
      { message: "Failed to add child" },
      { status: 500 }
    );
  }
}
