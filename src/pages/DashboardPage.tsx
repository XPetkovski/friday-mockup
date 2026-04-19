import {AlertCircle, CheckCircle2, Clock} from 'lucide-react';
import {createClient} from '@/utils/supabase/server'; // Your Supabase server client
import {Incident} from '@/types/Incident'; // The interface we made!

export default async function DashboardPage() {
    // 1. Initialize Supabase
    const supabase = await createClient();


    // 2. Fetch the data directly from your table!
    // We cast it to 'Incident[]' so TypeScript knows the exact shape of the data.
    const {data, error} = await supabase
        .from('incidents')
        .select('*')
        .order('created_at', {ascending: false});

    if (error) {
        console.error("Error fetching incidents:", error);
        // Handle error state here if needed
    }

    // Fallback to empty array if data is null
    const activeIncidents = (data as Incident[]) || [];
    console.log("SUPABASE DATA:", data);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Incident Command</h2>

            {/* 3. We map over the REAL data now! */}
            {activeIncidents.length === 0 ? (
                <div className="text-slate-500 text-center py-10">No active incidents.</div>
            ) : (
                activeIncidents.map((incident) => (
                    <div
                        key={incident.id}
                        className={`relative bg-white border rounded-xl p-5 flex items-center justify-between transition-all shadow-sm ${
                            incident.status === 'RESOLVED' ? 'opacity-50 grayscale' : 'border-slate-200'
                        }`}
                    >
                        {/* Dynamic Left Color Bar */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl ${
                            incident.severity === 'CRITICAL' ? 'bg-red-500' : 'bg-amber-400'
                        }`}/>

                        <div className="flex items-center gap-4 pl-4">
                            {/* Dynamic Icon */}
                            <div className={`p-2 rounded-full ${
                                incident.severity === 'CRITICAL' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'
                            }`}>
                                {incident.status === 'RESOLVED' ? <CheckCircle2 size={24}/> :
                                    incident.severity === 'CRITICAL' ? <AlertCircle size={24}/> : <Clock size={24}/>}
                            </div>

                            {/* Dynamic Text Content */}
                            <div>
                                <div className="flex items-center gap-3">
                                    <h3 className="font-semibold text-slate-900">{incident.title}</h3>
                                    {incident.severity === 'CRITICAL' && (
                                        <span className="px-2 py-0.5 text-[10px] font-bold bg-red-50 text-red-600 rounded-full border border-red-100 uppercase tracking-wider">
                                            Critical
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                    {/* Note: Make sure these column names match what is actually in your Supabase table! */}
                                    <span>{incident.reported_by}</span>
                                    <span>•</span>
                                    <span>{incident.created_at}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1.5 uppercase font-semibold">
                                        <span className={`w-1.5 h-1.5 rounded-full ${
                                            incident.status === 'INVESTIGATING' ? 'bg-amber-500' : 
                                            incident.status === 'RESOLVED' ? 'bg-green-500' : 'bg-slate-300'
                                        }`}/>
                                        {incident.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {incident.status !== 'RESOLVED' && (
                            <button
                                className="bg-slate-900 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                                Mark Resolved
                            </button>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}