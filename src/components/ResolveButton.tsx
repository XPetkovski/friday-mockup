'use client'

import { useTransition } from 'react'
import { resolveIncident } from '@/app/actions'
import { Check } from 'lucide-react'

export default function ResolveButton({ id, status }: { id: string, status: string }) {
    const [isPending, startTransition] = useTransition()

    if (status === 'RESOLVED') return null

    return (
        <button
            disabled={isPending}
            onClick={() => startTransition(() => resolveIncident(id))}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-700 transition-colors disabled:opacity-50"
        >
            {isPending ? 'Processing...' : <><Check size={16} /> Mark Resolved</>}
        </button>
    )
}