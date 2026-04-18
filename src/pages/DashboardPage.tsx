import { createClient } from '@/utils/supabase/server';
import { AlertTriangle, CheckCircle2, Clock, Activity, ArrowRight } from 'lucide-react';
import ResolveButton from '@/components/ResolveButton';

export default async function DashboardPage() {
    const supabase = await createClient();

    // 1. Fetching data on the server
    // This runs during the request, and the results are sent as part of the initial HTML
    const { data: incidents, error } = await supabase
        .from('incidents')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(`Failed to fetch incidents: ${error.message}`);
    }

    // 2. Logic for the Stats Header
    const activeCount = incidents?.filter(i => i.status !== 'RESOLVED').length || 0;
    const criticalCount = incidents?.filter(i => i.severity === 'CRITICAL' && i.status !== 'RESOLVED').length || 0;

    return (
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            {/* Header Section with Stats */}
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Incident Command</h1>
                    <p className="text-slate-500 text-lg mt-1 font-medium">Monitoring brand safety and operational resilience.</p>
                </div>

                <div className="flex gap-4">
                    {/* Active Stats Card */}
                    <div className="bg-white border border-slate-200 px-6 py-3 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="bg-slate-100 p-2 rounded-xl text-slate-600">
                            <Activity size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-nowrap">Open Alerts</p>
                            <p className="text-2xl font-bold text-slate-900 leading-none">{activeCount}</p>
                        </div>
                    </div>

                    {/* Critical Stats Card */}
                    {criticalCount > 0 && (
                        <div className="bg-red-50 border border-red-100 px-6 py-3 rounded-2xl shadow-sm flex items-center gap-4">
                            <div className="bg-red-100 p-2 rounded-xl text-red-600">
                                <AlertTriangle size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-red-400 uppercase tracking-widest text-nowrap">Critical</p>
                                <p className="text-2xl font-bold text-red-700 leading-none">{criticalCount}</p>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* The Incidents Feed */}
            <div className="space-y-4">
                {incidents && incidents.length > 0 ? (
                    incidents.map((incident) => (
                        <div
                            key={incident.id}
                            className={`group relative overflow-hidden rounded-2xl bg-white border p-6 transition-all hover:shadow-lg ${
                                incident.status === 'RESOLVED' ? 'border-slate-100 opacity-75' : 'border-slate-200'
                            }`}
                        >
                            {/* Visual Severity Accent (Left Border) */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                                incident.status === 'RESOLVED' ? 'bg-slate-200' :
                                    incident.severity === 'CRITICAL' ? 'bg-red-500 animate-pulse' :
                                        incident.severity === 'MEDIUM' ? 'bg-amber-400' : 'bg-blue-400'
                            }`} />

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-start gap-5">
                                    {/* Incident Icon based on Status/Severity */}
                                    <div className={`mt-1 shrink-0 rounded-2xl p-4 ${
                                        incident.status === 'RESOLVED' ? 'bg-slate-100 text-slate-400' :
                                            incident.severity === 'CRITICAL' ? 'bg-red-50 text-red-600' :
                                                incident.severity === 'MEDIUM' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                                    }`}>
                                        {incident.status === 'RESOLVED' ? <CheckCircle2 size={24} /> :
                                            incident.severity === 'CRITICAL' ? <AlertTriangle size={24} strokeWidth={2.5} /> :
                                                <Clock size={24} strokeWidth={2.5} />}
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h3 className={`text-xl font-bold leading-tight ${incident.status === 'RESOLVED' ? 'text-slate-400 line-through' : 'text-slate-900'}`}>
                                                {incident.title}
                                            </h3>
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest border ${
                                                incident.status === 'RESOLVED' ? 'bg-slate-50 text-slate-400 border-slate-200' :
                                                    incident.severity === 'CRITICAL' ? 'bg-red-50 text-red-700 border-red-200' :
                                                        incident.severity === 'MEDIUM' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                                            }`}>
                        {incident.severity}
                      </span>
                                        </div>

                                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400 font-medium">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-slate-600">{incident.reported_by}</span>
                                            </div>
                                            <span className="text-slate-200">•</span>
                                            <div className="flex items-center gap-1.5">
                                                {new Date(incident.created_at).toLocaleString('en-GB', {
                                                    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                                                })}
                                            </div>
                                            <span className="text-slate-200">•</span>
                                            <div className="flex items-center gap-2 uppercase text-[10px] tracking-widest font-bold">
                                                <span className={`h-1.5 w-1.5 rounded-full ${incident.status === 'RESOLVED' ? 'bg-green-500' : 'bg-amber-500'}`} />
                                                {incident.status}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions: The Resolve Button */}
                                <div className="flex items-center gap-3 self-end md:self-center">
                                    <ResolveButton id={incident.id} status={incident.status} />
                                    {incident.status !== 'RESOLVED' && (
                                        <div className="p-2 text-slate-300 group-hover:text-slate-900 transition-colors">
                                            <ArrowRight size={20} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="py-20 text-center rounded-3xl border-2 border-dashed border-slate-200 bg-white">
                        <AlertTriangle className="mx-auto text-slate-200 mb-4" size={48} />
                        <p className="text-slate-400 font-bold text-lg uppercase tracking-widest">System Clear</p>
                        <p className="text-slate-300 text-sm">No active incidents are currently being tracked.</p>
                    </div>
                )}
            </div>
        </div>
    );
}