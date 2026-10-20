'use server'

import { z } from 'zod'
import { supabase } from './supabase'
import { renderNewsletterWelcome, sendEmail } from './email'

export type SubscribeResult = { ok: true } | { error: string }

const EmailSchema = z.string().trim().email('Enter a valid email address.').max(160)

export async function subscribeNewsletter(input: unknown): Promise<SubscribeResult> {
  const parsed = EmailSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Enter a valid email address.' }
  }

  if (!supabase) return { error: 'Could not subscribe right now. Please try again.' }
  const email = parsed.data.toLowerCase()
  const { error } = await supabase.from('newsletter_subscribers').insert({ email })

  if (error) {
    // 23505 = unique_violation → already subscribed
    if (error.code === '23505') return { error: 'You are already subscribed.' }
    return { error: 'Could not subscribe right now. Please try again.' }
  }

  // Best-effort confirmation; a mail outage must not report the signup failed.
  const { subject, html } = renderNewsletterWelcome()
  await sendEmail({ to: email, subject, html, replyTo: process.env.EMAIL_FROM })

  return { ok: true }
}