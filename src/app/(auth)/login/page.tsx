import { login, signup } from '../actions'
import { ShieldAlert } from 'lucide-react'

// Make sure "export default" is right here!
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ message: string }> }) {
    const resolvedParams = await searchParams;

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto min-h-screen bg-slate-50 text-slate-900">
            <div className="flex items-center gap-2 mb-8 mx-auto">
                <div className="bg-slate-900 p-2 rounded-lg">
                <ShieldAlert className="text-white" size={28} />
                </div>
                <span className="text-2xl font-bold tracking-tight text-slate-900">Friday4:30</span>
            </div>

            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-4 text-slate-900">
                <label className="text-md font-bold" htmlFor="email">Email</label>
                <input
                    className="rounded-lg px-4 py-3 bg-white border border-slate-200 mb-4 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                    name="email"
                    placeholder="commander@friday430.com"
                    required
                />

                <label className="text-md font-bold" htmlFor="password">Password</label>
                <input
                    className="rounded-lg px-4 py-3 bg-white border border-slate-200 mb-6 focus:ring-2 focus:ring-slate-900 outline-none transition-all"
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    required
                />

                <button formAction={login} className="bg-slate-900 text-white rounded-lg px-4 py-3 text-sm font-bold mb-2 hover:bg-slate-800 transition-colors">
                    Sign In
                </button>
                <button formAction={signup} className="border border-slate-200 bg-white text-slate-900 rounded-lg px-4 py-3 text-sm font-bold hover:bg-slate-50 transition-colors">
                    Create Account
                </button>

                {resolvedParams?.message && (
                    <p className="mt-4 p-4 bg-red-50 text-red-600 text-center text-sm font-medium rounded-lg">
                        {resolvedParams.message}
                    </p>
                )}
            </form>
        </div>
    )
}