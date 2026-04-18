import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() { // 1. Added 'async' here
    const cookieStore = await cookies() // 2. Added 'await' here

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
                // Note: If you plan to use 'set' or 'remove',
                // you would add them here, but for simple fetching, 'get' is enough.
            },
        }
    )
}