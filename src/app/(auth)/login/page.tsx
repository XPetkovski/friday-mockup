import { login, signup } from '../actions'
import { ShieldAlert } from 'lucide-react'
import FInput from '@/components/ui/FInput';
import FButton from "@/components/ui/FButton";
// refactored

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ message: string }> }) {
    const resolvedParams = await searchParams;

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto min-h-screen bg-slate-50 text-slate-900">
            <div className="flex items-center gap-2 mb-8 mx-auto">
                <div className="bg-slate-900 p-2 rounded-lg">
                    <ShieldAlert className="text-white" size={28} />
                </div>
                <span className="text-2xl font-bold tracking-tight text-slate-900">Sunday4:13</span>
            </div>

            <form className="animate-in flex-1 flex flex-col w-full justify-center gap-4 text-slate-900">
                <label className="text-md font-bold" htmlFor="email">Email</label>
                <FInput
                    name="email"
                    placeholder="commander@friday430.com"
                    required
                    type="email"
                />

                <label className="text-md font-bold" htmlFor="password">Password</label>
                <FInput
                    name="password"
                    placeholder="••••••••"
                    required
                    type="password"
                />

                <FButton formAction={login} variant="primary" className="mb-2">
                    Sign In
                </FButton>

                {/* Use FButton with the outline variant */}
                <FButton formAction={signup} variant="outline">
                    Create Account
                </FButton>

                {resolvedParams?.message && (
                    <p className="mt-4 p-4 bg-red-50 text-red-600 text-center text-sm font-medium rounded-lg">
                        {resolvedParams.message}
                    </p>
                )}
            </form>
        </div>
    )
}