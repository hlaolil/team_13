
import { z } from 'zod';


export const registerSchema = z
  .object({
    email: z
      .string()
      .email('Please enter a valid email address'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      ),

    confirmPassword: z.string(),

    firstName: z
      .string()
      .min(1, 'First Name is Required'),

    lastName: z
      .string()
      .min(1, 'Last Name is Required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
