import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { emailService } from "@/services/emailService";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.isAdmin) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { requestId, approved, adminComment } = await request.json();

    // Get the update request
    const updateRequest = await prisma.updateRequest.findUnique({
      where: {
        id: requestId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!updateRequest) {
      return NextResponse.json(
        { message: "Update request not found" },
        { status: 404 }
      );
    }

    // Update the request status
    await prisma.updateRequest.update({
      where: {
        id: requestId,
      },
      data: {
        status: approved ? "APPROVED" : "REJECTED",
        adminComment,
      },
    });

    // If approved, apply the changes
    if (approved) {
      await applyChanges(updateRequest);
    }

    // Try to send email, but continue even if email fails
    try {
      await emailService.sendRequestProcessedEmail({
        to: updateRequest.user.email,
        name: `${updateRequest.user.firstName} ${updateRequest.user.lastName}`,
        requestType: updateRequest.requestType,
        approved,
      });
    } catch (emailError) {
      console.error("Email sending failed but request was processed:", emailError);
      // Continue execution - don't fail the request just because email failed
    }

    return NextResponse.json({ 
      message: `Request ${approved ? "approved" : "rejected"} successfully` 
    });
  } catch (error) {
    console.error("Failed to process request:", error);
    return NextResponse.json(
      { message: "Failed to process request" },
      { status: 500 }
    );
  }
}

// Helper function to apply changes based on request type
async function applyChanges(updateRequest: any) {
  const prisma = new PrismaClient();
  const { requestType, requestData, userId } = updateRequest;
  
  try {
    // Handle different request types
    switch (requestType) {
      case "PROFILE_UPDATE":
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            firstName: requestData.firstName,
            lastName: requestData.lastName,
            phone: requestData.phone,
            address: requestData.address,
            city: requestData.city,
            postalCode: requestData.postalCode,
            additionalInfo: requestData.additionalInfo,
          },
        });
        break;
        
      case "SERVICE_UPDATE":
        await prisma.service.update({
          where: {
            userId: userId,
          },
          data: {
            childcare: requestData.childcare,
            mealPreparation: requestData.mealPreparation,
            lightHousekeeping: requestData.lightHousekeeping,
            tutoring: requestData.tutoring,
            petMinding: requestData.petMinding,
          },
        });
        break;
        
      case "CHILD_UPDATE":
        await prisma.child.update({
          where: {
            id: requestData.childId || requestData.id,
          },
          data: {
            firstName: requestData.firstName,
            lastName: requestData.lastName,
            age: requestData.age,
            specialNotes: requestData.specialNotes,
          },
        });
        break;
        
      case "CHILD_ADD":
        await prisma.child.create({
          data: {
            firstName: requestData.firstName,
            lastName: requestData.lastName,
            age: requestData.age,
            specialNotes: requestData.specialNotes,
            userId: userId,
          },
        });
        break;
    }
  } catch (error) {
    console.error(`Error applying changes for request ${updateRequest.id}:`, error);
    throw error;
  }
}