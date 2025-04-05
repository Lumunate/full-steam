import { z } from 'zod';

export const feedbackSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  course: z.string().min(1, 'Course/Subject is required').optional(),
  relation: z.string().min(1, 'Relation is required'),
  email: z.string().email('Invalid email').optional(),
  sessionDate: z.preprocess((val) => {
    if (typeof val === 'string') {
      const date = new Date(val);

      return isNaN(date.getTime()) ? null : date;
    }

    return val;
  }, z.date().nullable()),
  experience: z.string().min(1, 'Experience rating is required'),
  feedback: z.string().min(1, 'Feedback is required'),
});

export type IFeedback = z.infer<typeof feedbackSchema>;