import { User } from '@prisma/client';
import { hash } from 'bcryptjs';

import { createUser } from '@/repository/UserRepository';
import { CreateUser } from '@/types/auth/register-user';

export async function makeUser(
  data: CreateUser,
): Promise<Omit<User, 'password'>> {
  // Hash the password
  const hashedPassword = await hash(data.password, 10);

  // Create the user with the hashed password
  const user = await createUser({
    ...data,
    password: hashedPassword,
  });

  // Exclude password from the returned user
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;

  return userWithoutPassword;
}
