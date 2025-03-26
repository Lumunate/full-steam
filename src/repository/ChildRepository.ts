import { prisma } from '@/lib/prisma';
export interface CreateChildInput {
  userId: string;
  name: string;
  age: number;
  specialNotes?: string;
}

export async function createChild(data: CreateChildInput) {
  return prisma.child.create({
    data: {
      userId: data.userId,
      name: data.name,
      age: data.age,
      specialNotes: data.specialNotes
    }
  });
}

export async function getChildrenByUserId(userId: string) {
  return prisma.child.findMany({
    where: {
      userId
    }
  });
}

export async function updateChild(
  id: string,
  data: Partial<Omit<CreateChildInput, 'userId'>>
) {
  return prisma.child.update({
    where: { id },
    data
  });
}

export async function deleteChild(id: string) {
  return prisma.child.delete({
    where: { id }
  });
}

export async function createManyChildren(children: CreateChildInput[]) {
  return Promise.all(children.map(child => createChild(child)));
}