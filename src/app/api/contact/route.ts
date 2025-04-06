import { UserRole } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { handleRBAC } from '@/lib/handlers/auth';
import handleErrors from '@/lib/handlers/errors';
import { createContact, getAllContacts } from '@/services/contact';
import { contactSchema } from '@/types/contact';

export async function GET(request: NextRequest) {
  try {
    await handleRBAC([UserRole.SERVICE_MASTER, UserRole.ADMIN]);
    const contacts = await getAllContacts();

    return NextResponse.json(contacts);
  } catch (error) {
    return handleErrors(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = contactSchema.parse(body);
    const contact = await createContact(validatedData);

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return handleErrors(error);
  }
}