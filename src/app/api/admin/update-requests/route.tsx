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

    // Get all update requests with user info
    const requests = await prisma.updateRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    // Format the response
    const formattedRequests = requests.map((request) => ({
      id: request.id,
      userId: request.userId,
      userName: `${request.user.firstName} ${request.user.lastName}`,
      userEmail: request.user.email,
      requestType: request.requestType,
      requestData: request.requestData,
      status: request.status,
      createdAt: request.createdAt,
    }));

    return NextResponse.json(formattedRequests);
  } catch (error) {
    console.error("Failed to fetch update requests:", error);
    return NextResponse.json(
      { message: "Failed to fetch update requests" },
      { status: 500 }
    );
  }
}