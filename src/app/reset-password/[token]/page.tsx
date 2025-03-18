
// src/app/reset-password/[token]/page.tsx
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import NewPasswordForm from "@/components/auth/NewPasswordForm";

const prisma = new PrismaClient();

interface ResetPasswordWithTokenPageProps {
  params: {
    token: string;
  };
}

export default async function ResetPasswordWithTokenPage({
  params,
}: ResetPasswordWithTokenPageProps) {
  const { token } = params;

  // Verify token is valid
  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    redirect("/reset-password?error=invalid-token");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Create New Password</h1>
          <NewPasswordForm token={token} />
        </div>
      </main>
    </div>
  );
}