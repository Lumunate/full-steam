import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: 'aaabbb@gmail.com',
    },
  });

  if (!existingAdmin) {
    // Create admin user
    const hashedPassword = await bcrypt.hash('aaabbb', 12);
    
    await prisma.user.create({
      data: {
        email: 'aaabbb@gmail.com',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'User',
        phone: '1234567890',
        address: 'Admin Address',
        city: 'Admin City',
        postalCode: '12345',
        isAdmin: true,
        isApproved: true,
      },
    });
    
    console.log('Admin user created successfully');
  } else {
    console.log('Admin user already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });