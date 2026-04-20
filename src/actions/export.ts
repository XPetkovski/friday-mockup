'use server';

import { createClient } from '@/utils/supabase/server';

export async function exportIncidentCSV(incidentId: string) {
    const supabase = await createClient();

    // 1. Fetch the specific incident details
    const { data: incident, error: incError } = await supabase
        .from('incidents')
        .select('*')
        .eq('id', incidentId)
        .single();

    if (incError || !incident) throw new Error("Incident not found");

    // 2. Prepare the CSV Header and Rows
    // In a real app, you'd also fetch the chat history for this incident here!
    const headers = ["Field", "Value"];
    const rows = [
        ["ID", incident.id],
        ["Title", incident.title],
        ["Severity", incident.severity],
        ["Status", incident.status],
        ["Reporter", incident.reporter],
        ["Timestamp", incident.created_at],
        ["Resolution Notes", incident.status === 'RESOLVED' ? "Incident was closed by commander." : "N/A"],
    ];

    // 3. Convert array to CSV string
    const csvContent = [
        headers.join(","),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    return csvContent;
}