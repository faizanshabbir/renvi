import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useSession, useUser } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSupabaseClient(): ReturnType<typeof createClient> {
  const { session } = useSession()

  return createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLIC_KEY!,
      {
          global: {
              fetch: async(url, options = {}) => {
                  const clerkToken = await session?.getToken({
                      template: 'supabase',
                  })

                  const headers = new Headers(options?.headers)
                  headers.set('Authorization', `Bearer ${clerkToken}`)

                  return fetch(url, {
                      ...options,
                      headers,
                  })
              }
          }
      }
  )
}

export const supabaseClient = async(supabaseToken: string) => {
  const { session } = useSession()

  return createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLIC_KEY!,
      {
          global: {
                headers: {Authorization: `Bearer ${supabaseToken}`}
              }
      }
  )
}

export const getCredits = async({userId, token}: {userId: string, token: string}) => {
  const supabase = await supabaseClient(token)
  const {data: credits} = await supabase
    .from("credits")
    .select("*")
  return credits
} 