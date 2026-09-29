// Zod schemas shared by 'use server' action modules. They cannot live in those
// modules: a 'use server' file may only export async functions.
import { z } from 'zod'

// `role` is deliberately absent: the profile form must not be able to set it,
// and 015_profile_privilege_guard.sql blocks the write at the database anyway.
export const ProfileSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name.').max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,20}$/, 'Enter a valid phone number.'),
})

export const PasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Enter your current password.'),
    newPassword: z.string().min(8, 'Use at least 8 characters.'),
    confirmPassword: z.string().min(1, 'Confirm your new password.'),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })
  .refine((d) => d.newPassword !== d.currentPassword, {
    message: 'Choose a password different from your current one.',
    path: ['newPassword'],
  })

export const AvatarSchema = z.object({
  file: z.instanceof(File).refine((f) => f.size > 0, 'That file is empty.'),
})

export const EmailChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Enter your current password.'),
  newEmail: z.string().trim().toLowerCase().email('Enter a valid email address.').max(254),
})

export const AddressSchema = z.object({
  name: z.string().trim().min(2, 'Name is required').max(120),
  phone: z.string().trim().regex(/^[0-9+\-\s()]{7,20}$/, 'Enter a valid phone number'),
  email: z.string().trim().email('Enter a valid email').max(160),
  address: z.string().trim().min(5, 'Address is required').max(300),
  city: z.string().trim().min(2, 'City is required').max(80),
  pin: z.string().trim().regex(/^[0-9]{6}$/, 'Enter a valid 6-digit PIN'),
})
