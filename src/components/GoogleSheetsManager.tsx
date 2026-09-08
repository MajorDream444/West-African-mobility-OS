import React from 'react';
import type { CRMLead, Language } from '../types';

interface GoogleSheetsManagerProps {
  currentLanguage: Language;
  leads: CRMLead[];
  initialSheetId?: string | null;
  activeSpreadsheetId?: string | null;
  onSpreadsheetConnected?: (sheetId: string) => void;
}

export const GoogleSheetsManager: React.FC<GoogleSheetsManagerProps> = () => (
  <section className="rounded-2xl border border-amber-500/40 bg-[#101925] p-8">
    <h2 className="text-xl font-bold text-amber-300">External CRM connection disabled</h2>
    <p className="mt-3 text-sm text-[#9fb1c5]">
      This remediation build uses browser-only demonstration persistence. It does not authenticate, create spreadsheets, upload records, or modify Google services.
    </p>
    <p className="mt-2 text-xs text-[#7e91a6]">
      A production data store, consent model, permissions system, audit history, and approved integration design remain deferred.
    </p>
  </section>
);
