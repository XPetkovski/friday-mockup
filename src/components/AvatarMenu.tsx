'use client'

import { useState, useRef, useEffect } from 'react'
import { User, Settings, LogOut } from 'lucide-react'
import { logout } from '@/app/(auth)/actions'

export default function AvatarMenu({ email }: { email: string | undefined }) {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    // Get the first letter of the email for the avatar, or "U" as fallback
    const initial = email ? email.charAt(0).toUpperCase() : 'U'

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={menuRef}>
            {/* The Avatar Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white font-bold hover:ring-4 ring-slate-200 transition-all focus:outline-none"
            >
                {initial}
            </button>

            {/* The Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Signed in as</p>
                        <p className="text-sm font-bold text-slate-900 truncate">{email}</p>
                    </div>

                    <div className="p-2">
                        <button
                            className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors"
                            onClick={() => { setIsOpen(false); alert("Profile page coming soon!") }}
                        >
                            <Settings size={16} />
                            Profile & Settings
                        </button>

                        {/* Notice how we use a standard HTML form for the Server Action! */}
                        <form action={logout}>
                            <button
                                type="submit"
                                className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors mt-1"
                            >
                                <LogOut size={16} />
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}