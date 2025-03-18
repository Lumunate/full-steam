import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { emailService } from "@/services/emailService";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      postalCode,
      password,
      additionalInfo,
      children,
      services,
      payment,
    } = body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // Create admin user if it's the admin email
    const isAdmin = email === "aaabbb@gmail.com";
    const isApproved = isAdmin; // Auto approve admin

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user in a transaction
    const result = await prisma.$transaction(async (prisma: { user: { create: (arg0: { data: { email: any; password: string; firstName: any; lastName: any; phone: any; address: any; city: any; postalCode: any; additionalInfo: any; isAdmin: boolean; isApproved: boolean; }; }) => any; }; child: { create: (arg0: { data: { firstName: any; lastName: any; age: any; userId: any; }; }) => any; }; service: { create: (arg0: { data: { childcare: any; mealPreparation: any; lightHousekeeping: any; tutoring: any; petMinding: any; userId: any; }; }) => any; }; payment: { create: (arg0: { data: { nameOnCard: any; cardNumber: any; expiryDate: any; cvv: any; saveCard: any; agreedToTerms: any; userId: any; }; }) => any; }; }) => {
      // Create the user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          phone,
          address,
          city,
          postalCode,
          additionalInfo,
          isAdmin,
          isApproved,
        },
      });

      // Create children records
      for (const child of children) {
        await prisma.child.create({
          data: {
            firstName: child.firstName,
            lastName: child.lastName,
            age: child.age,
            userId: user.id,
          },
        });
      }

      // Create services record
      await prisma.service.create({
        data: {
          childcare: services.childcare,
          mealPreparation: services.mealPreparation,
          lightHousekeeping: services.lightHousekeeping,
          tutoring: services.tutoring,
          petMinding: services.petMinding,
          userId: user.id,
        },
      });

      // Create payment record
      await prisma.payment.create({
        data: {
          nameOnCard: payment.nameOnCard,
          cardNumber: payment.cardNumber,
          expiryDate: payment.expiryDate,
          cvv: payment.cvv,
          saveCard: payment.saveCard,
          agreedToTerms: payment.agreedToTerms,
          userId: user.id,
        },
      });

      return user;
    });

    // Send registration confirmation email
    if (!isAdmin) {
      await emailService.sendRegistrationEmail({
        to: email,
        name: `${firstName} ${lastName}`,
      });
    }

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Failed to register user" },
      { status: 500 }
    );
  }
}