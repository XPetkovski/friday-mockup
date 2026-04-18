'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function resolveIncident(id: string) {
    const supabase = await createClient()

    const { error } = await supabase
        .from('incidents')
        .update({ status: 'RESOLVED' })
        .eq('id', id)

    if (error) throw new Error(error.message)

    // This tells Next.js to refresh the data on the dashboard
    revalidatePath('/')
}