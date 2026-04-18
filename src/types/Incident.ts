// Define the specific, allowed states to prevent typos like 'resloved'
export type IncidentStatus = 'OPEN' | 'INVESTIGATING' | 'RESOLVED';
export type IncidentSeverity = 'CRITICAL' | 'WARNING' | 'INFO';

// The formal Interface for an Incident
export interface Incident {
    id: string;
    title: string;
    severity: IncidentSeverity;
    status: IncidentStatus;
    reporter: string;
    timestamp: string;
}