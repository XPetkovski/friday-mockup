import { ShieldAlert } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import AvatarMenu from './AvatarMenu';
import ChatBot from "@/components/ChatBot";

export default async function Navbar() {
    // 1. Check the secure session on the server
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo Section */}
                    <div className="flex items-center gap-2">
                        <div className="bg-slate-900 p-1.5 rounded-lg">
                            <ShieldAlert className="text-white" size={20} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">
              Sunday4:13
            </span>
                    </div>

                    {/* Right Side Items */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100 text-[10px] font-black tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
                            LIVE MONITORING
                        </div>

                        <ChatBot />

                        {/* 2. Pass the email down to the Client Component */}
                        <AvatarMenu email={user?.email} />

                    </div>
                </div>
            </div>
        </nav>
    );
}