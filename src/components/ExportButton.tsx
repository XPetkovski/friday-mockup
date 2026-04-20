'use client';

import { exportIncidentCSV } from '@/actions/export';
import FButton from './ui/FButton';
import { Download } from 'lucide-react';
import { useState } from 'react';

export default function ExportButton({ incidentId, title }: { incidentId: string, title: string }) {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        setIsExporting(true);
        try {
            const csvData = await exportIncidentCSV(incidentId);

            // Create a "virtual" link to trigger the download
            const blob = new Blob([csvData], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');

            a.href = url;
            a.download = `Friday430_Report_${title.replace(/\s+/g, '_')}.csv`;
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            alert("Export failed. Please check logs.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <FButton
            variant="outline"
            onClick={handleExport}
            isLoading={isExporting}
            className="px-3 py-1.5 h-9"
        >
            <Download size={16} />
            Export Log
        </FButton>
    );
}