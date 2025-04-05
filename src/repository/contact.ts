import { Contact } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export async function createContact(contactData: Omit<Contact, 'id' | 'createdAt'>) {
  return prisma.contact.create({
    data: contactData,
  });
}

export async function findByEmail(email: string) {
  return prisma.contact.findFirst({
    where: { email },
  });
}

export async function findAllContacts() {
  return prisma.contact.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function findContactById(id: string) {
  return prisma.contact.findUnique({
    where: { id }
  });
}