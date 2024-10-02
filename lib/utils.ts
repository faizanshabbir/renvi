import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useSession, useUser } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
