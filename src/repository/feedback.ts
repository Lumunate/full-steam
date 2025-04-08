import { Feedback } from '@prisma/client';

import { prisma } from '@/lib/prisma';

export async function createFeedback(feedbackData: Omit<Feedback, 'id' | 'createdAt'>) {
  return prisma.feedback.create({
    data: feedbackData,
  });
}

export async function findAllFeedbacks() {
  return prisma.feedback.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function findFeedbackById(id: number) {
  return prisma.feedback.findUnique({
    where: { id }
  });
}