import React, { useState, useEffect } from 'react';
import { Language, CRMLead } from '../types';
import { 
  initAuth, googleSignIn, logout, getCurrentUser, getAccessToken 
} from '../services/googleAuth';
import { 
  listUserSpreadsheets, createMasterSpreadsheet, syncAllDataToSheet, 
  SpreadsheetInfo, SyncResult, getSpreadsheetDetails 
} from '../services/googleSheets';
import { CANDIDATE_VEHICLES } from '../data/canonicalData';
import { DIALLO_SPRINT_QUESTIONS } from '../data/canonicalData';
import { 
  Table, CheckCircle2, AlertTriangle, ExternalLink, RefreshCw, 
  FileSpreadsheet, Plus, LogOut, ArrowRight, Shield, Database, 
  Check, X, Sparkles, Lock, Cloud 
} from 'lucide-react';
import { User } from 'firebase/auth';

interface GoogleSheetsManagerProps {
  currentLanguage: Language;
  leads: CRMLead[];
  onSpreadsheetConnected?: (sheetId: string) => void;
  activeSpreadsheetId?: string | null;
}

export const GoogleSheetsManager: React.FC<GoogleSheetsManagerProps> = ({
  currentLanguage,
  leads,
  onSpreadsheetConnected,
  activeSpreadsheetId: initialSheetId,
}) => {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);
  
  // Spreadsheets
  const [userSheets, setUserSheets] = useState<SpreadsheetInfo[]>([]);
  const [isLoadingSheets, setIsLoadingSheets] = useState<boolean>(false);
  const [activeSheet, setActiveSheet] = useState<SpreadsheetInfo | null>(null);
  
  // Sync state
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);

  // Mandatory user confirmation modal state
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);
  const [pendingAction, setPendingAction] = useState<{
    type: 'create_and_sync' | 'overwrite_sync';
    targetSheetId?: string;
    description: string;
  } | null>(null);

  // Initialize Auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser) => {
        setUser(authedUser);
        setIsAuthenticated(true);
        loadSpreadsheets();
      },
      () => {
        setUser(null);
        setIsAuthenticated(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Restore saved active spreadsheet
  useEffect(() => {
    const savedId = initialSheetId || localStorage.getItem('wamos_active_sheet_id');
    const savedName = localStorage.getItem('wamos_active_sheet_name');
    if (savedId) {
      setActiveSheet({
        id: savedId,
        name: savedName || 'West African Mobility OS Sheet',
        webViewLink: `https://docs.google.com/spreadsheets/d/${savedId}/edit`
      });
      if (onSpreadsheetConnected) onSpreadsheetConnected(savedId);
    }
  }, [initialSheetId]);

  const loadSpreadsheets = async () => {
    setIsLoadingSheets(true);
    setErrorMessage(null);
    try {
      const sheets = await listUserSpreadsheets();
      setUserSheets(sheets);
    } catch (err: any) {
      console.warn('Could not list spreadsheets from Drive:', err);
    } finally {
      setIsLoadingSheets(false);
    }
  };

  const handleSignIn = async () => {
    setIsLoadingAuth(true);
    setErrorMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setIsAuthenticated(true);
        await loadSpreadsheets();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Google sign-in failed. Please try again.');
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setUser(null);
    setIsAuthenticated(false);
    setUserSheets([]);
  };

  // Request confirmation before mutating sheet data
  const promptCreateAndSync = () => {
    setPendingAction({
      type: 'create_and_sync',
      description: `Create a new Google Spreadsheet titled "West African Mobility OS - CRM & Evidence" with 6 formatted tabs (Personal Leads, Fleet Inquiries, Mechanic Cohort, Partner Workshops, Candidate Vehicles, Diallo Sprint Questions) and write ${leads.length} leads and 10 vehicles.`
    });
    setConfirmModalOpen(true);
  };

  const promptOverwriteSync = (sheetId: string) => {
    setPendingAction({
      type: 'overwrite_sync',
      targetSheetId: sheetId,
      description: `Synchronize and update spreadsheet (${activeSheet?.name || sheetId}). This will populate/overwrite 6 domain sheets with all ${leads.length} active CRM records, vehicle specs, and evidence sprint data.`
    });
    setConfirmModalOpen(true);
  };

  // Execute confirmed action
  const executePendingAction = async () => {
    if (!pendingAction) return;
    setConfirmModalOpen(false);
    setIsSyncing(true);
    setErrorMessage(null);

    try {
      let sheetToSync = activeSheet;
      
      if (pendingAction.type === 'create_and_sync') {
        const created = await createMasterSpreadsheet();
        sheetToSync = created;
        setActiveSheet(created);
        localStorage.setItem('wamos_active_sheet_id', created.id);
        localStorage.setItem('wamos_active_sheet_name', created.name);
        if (onSpreadsheetConnected) onSpreadsheetConnected(created.id);
        await loadSpreadsheets();
      }

      if (!sheetToSync?.id) {
        throw new Error('No target spreadsheet specified.');
      }

      const result = await syncAllDataToSheet(
        sheetToSync.id,
        leads,
        CANDIDATE_VEHICLES,
        DIALLO_SPRINT_QUESTIONS
      );

      setSyncResult(result);
      setLastSyncedAt(new Date().toLocaleTimeString());
    } catch (err: any) {
      console.error('Google Sheets sync error:', err);
      setErrorMessage(err.message || 'Failed to sync with Google Sheets.');
    } finally {
      setIsSyncing(false);
      setPendingAction(null);
    }
  };

  const selectExistingSheet = (sheet: SpreadsheetInfo) => {
    setActiveSheet(sheet);
    localStorage.setItem('wamos_active_sheet_id', sheet.id);
    localStorage.setItem('wamos_active_sheet_name', sheet.name);
    if (onSpreadsheetConnected) onSpreadsheetConnected(sheet.id);
  };

  return (
    <div className="bg-[#0f1723] border border-[#1e2e42] rounded-2xl p-6 sm:p-8 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1b2b3d]">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0f9d58]/20 border border-[#0f9d58]/40 flex items-center justify-center text-[#34a853] shrink-0">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">Google Sheets Live CRM Bridge</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0f9d58]/20 text-[#34a853] border border-[#0f9d58]/40 uppercase tracking-wider">
                Workspace OAuth
              </span>
            </div>
            <p className="text-xs text-[#8ca1b8] mt-1 max-w-2xl">
              Export and synchronize West African Mobility OS market intelligence, buyer leads, mechanic applicants, and vehicle comparison matrices directly to your Google Sheets.
            </p>
          </div>
        </div>

        {/* Auth status & actions */}
        <div>
          {!isAuthenticated ? (
            <button
              onClick={handleSignIn}
              disabled={isLoadingAuth}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-semibold shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              <span>{isLoadingAuth ? 'Connecting...' : 'Sign in with Google'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-semibold text-white block">{user?.displayName || 'Google User'}</span>
                <span className="text-[10px] text-[#7e91a6] block truncate max-w-[180px]">{user?.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                title="Disconnect Google Account"
                className="p-2 rounded-lg bg-[#182535] hover:bg-[#203248] text-[#8ca1b8] hover:text-white transition-colors border border-[#23354c]"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-xs text-rose-300">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Sync Success Banner */}
      {syncResult && (
        <div className="p-4 rounded-xl bg-[#0f9d58]/10 border border-[#0f9d58]/30 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#34a853]">
              <CheckCircle2 className="w-4 h-4" />
              <span>{syncResult.message}</span>
            </div>
            <a
              href={syncResult.spreadsheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0f9d58]/20 hover:bg-[#0f9d58]/30 text-[#34a853] text-xs font-semibold transition-colors"
            >
              <span>Open in Sheets</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-[11px] text-[#a0b5cb] pt-2 border-t border-[#0f9d58]/20">
            <div>Personal: <span className="font-bold text-white">{syncResult.rowsAdded.personal}</span></div>
            <div>Fleet: <span className="font-bold text-white">{syncResult.rowsAdded.fleet}</span></div>
            <div>Mechanics: <span className="font-bold text-white">{syncResult.rowsAdded.mechanics}</span></div>
            <div>Workshops: <span className="font-bold text-white">{syncResult.rowsAdded.workshops}</span></div>
            <div>Vehicles: <span className="font-bold text-white">{syncResult.rowsAdded.vehicles}</span></div>
            <div>Sprint: <span className="font-bold text-white">{syncResult.rowsAdded.governance}</span></div>
          </div>
        </div>
      )}

      {!isAuthenticated ? (
        /* Sign-In Incentive & Scope Breakdown */
        <div className="bg-[#121c29] border border-[#1d2d3e] rounded-xl p-6 text-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#e0b555]">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-white text-base">Connect your Google Workspace</h4>
            <p className="text-xs text-[#8ca1b8] mt-1">
              Sign in with your Google Account to export real-time Mauritanian vehicle inquiries, mechanic candidate profiles, and workshop verification audits into Google Sheets.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4 text-[11px] text-[#7e91a6] pt-2">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#34a853]" />
              Official Google OAuth 2.0
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#b58a35]" />
              In-Memory Token Caching
            </span>
          </div>
        </div>
      ) : (
        /* Authenticated Control Surface */
        <div className="space-y-6">
          {/* Active Connected Spreadsheet Bar */}
          <div className="bg-[#131d2a] border border-[#203247] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#0f9d58]/20 border border-[#0f9d58]/40 flex items-center justify-center text-[#34a853]">
                <Table className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-[#7e91a6] uppercase tracking-wider font-semibold block">
                  Active Spreadsheet
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">
                    {activeSheet ? activeSheet.name : 'None Selected'}
                  </span>
                  {activeSheet?.webViewLink && (
                    <a
                      href={activeSheet.webViewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#34a853] hover:text-[#46c368] transition-colors"
                      title="Open in Google Sheets"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                {lastSyncedAt && (
                  <span className="text-[10px] text-[#7e91a6]">Last synced: {lastSyncedAt}</span>
                )}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={promptCreateAndSync}
                disabled={isSyncing}
                className="px-3.5 py-2 rounded-lg bg-[#b58a35] hover:bg-[#c99a3c] text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create & Sync New Sheet</span>
              </button>

              {activeSheet && (
                <button
                  onClick={() => promptOverwriteSync(activeSheet.id)}
                  disabled={isSyncing}
                  className="px-3.5 py-2 rounded-lg bg-[#1b2b3d] hover:bg-[#23384f] text-white font-semibold text-xs flex items-center gap-1.5 transition-all border border-[#273d57] active:scale-95 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#e0b555]' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Sync Active Sheet'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Existing Spreadsheets Browser from Google Drive */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#e0b555] uppercase tracking-wider">
                Recent Google Sheets in your Google Drive
              </h4>
              <button
                onClick={loadSpreadsheets}
                disabled={isLoadingSheets}
                className="text-[11px] text-[#7e91a6] hover:text-white flex items-center gap-1 transition-colors"
              >
                <RefreshCw className={`w-3 h-3 ${isLoadingSheets ? 'animate-spin' : ''}`} />
                <span>Refresh Drive List</span>
              </button>
            </div>

            {isLoadingSheets ? (
              <div className="p-6 text-center text-xs text-[#7e91a6] bg-[#111a26] rounded-xl border border-[#1b2938]">
                Scanning Google Drive for spreadsheets...
              </div>
            ) : userSheets.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#7e91a6] bg-[#111a26] rounded-xl border border-[#1b2938]">
                No spreadsheets found in your Drive. Click "Create & Sync New Sheet" to initialize one.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {userSheets.map((sheet) => {
                  const isCurrent = activeSheet?.id === sheet.id;
                  return (
                    <div
                      key={sheet.id}
                      className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-[#152436] border-[#0f9d58] shadow-md shadow-[#0f9d58]/5'
                          : 'bg-[#111a26] border-[#1c2c3e] hover:border-[#283e58]'
                      }`}
                    >
                      <div className="mb-2">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-semibold text-xs text-white truncate" title={sheet.name}>
                            {sheet.name}
                          </span>
                          {isCurrent && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#0f9d58]/20 text-[#34a853] border border-[#0f9d58]/40">
                              Connected
                            </span>
                          )}
                        </div>
                        {sheet.modifiedTime && (
                          <span className="text-[10px] text-[#7e91a6] block">
                            Modified: {new Date(sheet.modifiedTime).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-[#182637]">
                        {!isCurrent && (
                          <button
                            onClick={() => selectExistingSheet(sheet)}
                            className="text-[11px] px-2.5 py-1 rounded bg-[#1b293b] hover:bg-[#23354b] text-[#b58a35] font-semibold transition-colors flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            <span>Connect</span>
                          </button>
                        )}
                        {sheet.webViewLink && (
                          <a
                            href={sheet.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] px-2.5 py-1 rounded bg-[#162232] hover:bg-[#1d2d42] text-[#8ca1b8] hover:text-white transition-colors flex items-center gap-1 ml-auto"
                          >
                            <span>Open</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mandatory User Confirmation Modal for Destructive / Write Operations */}
      {confirmModalOpen && pendingAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#121b27] border border-[#23364c] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#b58a35]/20 border border-[#b58a35]/40 flex items-center justify-center text-[#e0b555]">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">
                  {pendingAction.type === 'create_and_sync' 
                    ? 'Confirm Spreadsheet Creation & Export' 
                    : 'Confirm Data Overwrite & Sync'}
                </h4>
                <span className="text-[10px] text-[#7e91a6]">Google Workspace API Confirmation</span>
              </div>
            </div>

            <p className="text-xs text-[#9eb2c7] leading-relaxed">
              {pendingAction.description}
            </p>

            <div className="p-3 rounded-lg bg-[#0d141e] border border-[#1b2737] text-[11px] space-y-1 text-[#cad6e2]">
              <div className="flex justify-between">
                <span className="text-[#7e91a6]">Total Leads:</span>
                <span className="font-bold text-white">{leads.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7e91a6]">Candidate Vehicles:</span>
                <span className="font-bold text-white">{CANDIDATE_VEHICLES.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7e91a6]">Diallo Questions:</span>
                <span className="font-bold text-white">{DIALLO_SPRINT_QUESTIONS.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7e91a6]">Target Tabs:</span>
                <span className="font-medium text-[#e0b555]">6 Formatted Worksheets</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => {
                  setConfirmModalOpen(false);
                  setPendingAction(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#182535] hover:bg-[#1f3044] text-[#8ca1b8] hover:text-white text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executePendingAction}
                className="px-4 py-2 rounded-lg bg-[#b58a35] hover:bg-[#c99a3c] text-neutral-950 text-xs font-bold transition-all active:scale-95"
              >
                Confirm & Proceed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
