import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import DashboardPage from '@/pages/DashboardPage';

export default function Page() {
    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            <Navbar />
            <Suspense fallback={<DashboardSkeleton />}>
                <DashboardPage />
            </Suspense>
        </main>
    );
}

function DashboardSkeleton() {
    return (
        <div className="mx-auto max-w-5xl px-4 py-10 animate-pulse">
            <div className="h-12 w-64 bg-slate-200 rounded-xl mb-10" />
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-40 w-full bg-white border border-slate-100 rounded-2xl" />
                ))}
            </div>
        </div>
    );
}