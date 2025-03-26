import { prisma } from '@/lib/prisma';
import {  CreateSessionInput } from '@/types/sessions';

export async function createSession(data: CreateSessionInput) {
  return prisma.session.create({
    data
  });
}

export async function findAllSessions() {
  return prisma.session.findMany({
    orderBy: {
      name: 'asc'
    }
  });
}

export async function findSessionById(id: string) {
  return prisma.session.findUnique({
    where: { id }
  });
}

export async function updateSession(id: string, data: Partial<CreateSessionInput>) {
  return prisma.session.update({
    where: { id },
    data
  });
}

export async function deleteSession(id: string) {
  return prisma.session.delete({
    where: { id }
  });
}