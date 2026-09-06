import { getAccessToken } from './googleAuth';
import { 
  CRMLead, PersonalInquiry, FleetInquiry, MechanicRegistration, WorkshopRegistration, 
  VehicleModel, DialloSprintQuestion 
} from '../types';

export interface SpreadsheetInfo {
  id: string;
  name: string;
  webViewLink?: string;
  modifiedTime?: string;
}

export interface SyncResult {
  success: boolean;
  spreadsheetId: string;
  spreadsheetUrl: string;
  rowsAdded: {
    personal: number;
    fleet: number;
    mechanics: number;
    workshops: number;
    vehicles: number;
    governance: number;
  };
  message: string;
}

const SHEETS_API_BASE = 'https://sheets.googleapis.com/v4/spreadsheets';
const DRIVE_API_BASE = 'https://www.googleapis.com/drive/v3';

// Helper to make authenticated Google API requests
async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('User is not authenticated with Google. Please sign in to connect Google Sheets.');
  }

  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${token}`);
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errorBody = await response.text();
    let errorMessage = `Google API error (${response.status}): ${response.statusText}`;
    try {
      const parsed = JSON.parse(errorBody);
      if (parsed.error?.message) {
        errorMessage = parsed.error.message;
      }
    } catch {
      // ignore
    }
    throw new Error(errorMessage);
  }
  return response;
}

/**
 * List spreadsheets from the user's Google Drive
 */
export async function listUserSpreadsheets(): Promise<SpreadsheetInfo[]> {
  const query = encodeURIComponent("mimeType='application/vnd.google-apps.spreadsheet' and trashed=false");
  const url = `${DRIVE_API_BASE}/files?q=${query}&fields=files(id,name,webViewLink,modifiedTime)&orderBy=modifiedTime desc&pageSize=15`;
  
  const res = await authFetch(url);
  const data = await res.json();
  return (data.files || []).map((f: any) => ({
    id: f.id,
    name: f.name,
    webViewLink: f.webViewLink,
    modifiedTime: f.modifiedTime,
  }));
}

/**
 * Fetch spreadsheet title and sheet tabs metadata
 */
export async function getSpreadsheetDetails(spreadsheetId: string): Promise<{ title: string; sheets: string[] }> {
  const res = await authFetch(`${SHEETS_API_BASE}/${spreadsheetId}?fields=properties.title,sheets.properties.title`);
  const data = await res.json();
  return {
    title: data.properties?.title || 'Untitled Spreadsheet',
    sheets: (data.sheets || []).map((s: any) => s.properties?.title || ''),
  };
}

/**
 * Create a new master spreadsheet with tabs for all West African Mobility OS domains
 */
export async function createMasterSpreadsheet(customTitle?: string): Promise<SpreadsheetInfo> {
  const title = customTitle || `West African Mobility OS - CRM & Evidence (${new Date().toISOString().split('T')[0]})`;
  
  const body = {
    properties: {
      title,
    },
    sheets: [
      { properties: { title: 'Personal Leads' } },
      { properties: { title: 'Fleet Inquiries' } },
      { properties: { title: 'Mechanic Cohort' } },
      { properties: { title: 'Partner Workshops' } },
      { properties: { title: 'Candidate Vehicles' } },
      { properties: { title: 'Diallo Sprint Questions' } }
    ],
  };

  const res = await authFetch(SHEETS_API_BASE, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return {
    id: data.spreadsheetId,
    name: data.properties?.title || title,
    webViewLink: `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}/edit`,
  };
}

/**
 * Initialize / overwrite headers and sync all data to the target spreadsheet
 */
export async function syncAllDataToSheet(
  spreadsheetId: string,
  leads: CRMLead[],
  vehicles: VehicleModel[],
  dialloQuestions: DialloSprintQuestion[]
): Promise<SyncResult> {
  // 1. Separate leads by type
  const personalLeads = leads.filter((l): l is PersonalInquiry => l.type === 'personal');
  const fleetLeads = leads.filter((l): l is FleetInquiry => l.type === 'fleet');
  const mechanics = leads.filter((l): l is MechanicRegistration => l.type === 'mechanic');
  const workshops = leads.filter((l): l is WorkshopRegistration => l.type === 'workshop');

  // 2. Prepare tabular values for each sheet
  const personalValues = [
    [
      'Lead ID', 'Full Name', 'Phone', 'Email', 'City', 'Vehicle Preference', 
      'Budget Range', 'Primary Usage', 'Timeline', 'Deposit Readiness', 
      'CRM Stage', 'Status', 'Registration Date', 'Operator Notes'
    ],
    ...personalLeads.map(l => [
      l.id, l.fullName, l.phone, l.email || '', l.city, l.selectedVehicleId || l.vehiclePreference || 'Open',
      l.budgetRange, l.primaryUsage, l.purchaseTimeline, l.depositReadiness,
      l.crmStage, l.status, l.createdAt, l.notes || ''
    ])
  ];

  const fleetValues = [
    [
      'Inquiry ID', 'Organization', 'Contact Person', 'Title', 'Phone', 'Email',
      'Sector', 'Est. Fleet Size', 'Delivery Location', 'Duty Cycle / Conditions', 
      'Acquisition Timing', 'CRM Stage', 'Status', 'Registration Date', 'Notes'
    ],
    ...fleetLeads.map(l => [
      l.id, l.orgName, l.contactName, l.contactTitle, l.phone, l.email,
      l.sector, l.fleetSizeEstimate, l.deliveryLocation, l.operatingConditions,
      l.acquisitionTiming, l.crmStage, l.status, l.createdAt, l.notes || ''
    ])
  ];

  const mechanicValues = [
    [
      'Candidate ID', 'Full Name', 'Phone', 'Email', 'City', 'Years Exp',
      'Current Workshop', 'Specialties', 'Languages', 'Certifications',
      'Diagnostic Experience', 'Pathway Stage', 'Readiness Rating', 'Status', 'Next Action', 'Created At'
    ],
    ...mechanics.map(m => [
      m.id, m.fullName, m.phone, m.email || '', m.city, m.yearsExperience,
      m.currentWorkshop, m.specialties.join(', '), m.languages.join(', '), m.certifications,
      m.hasDiagnosticExperience ? 'Yes' : 'No', m.pathwayStage, m.readinessRating, m.status, m.nextAction, m.createdAt
    ])
  ];

  const workshopValues = [
    [
      'Workshop ID', 'Business Name', 'Owner Name', 'Phone', 'Email', 'Location',
      'Bays', 'Lifts', '3-Phase Power', 'Electrical Capability', 'Hybrid/EV Ready',
      'Diagnostic Tools', 'Parts Storage', 'Technicians', 'Readiness Score (0-100)', 'Status', 'Next Action', 'Created At'
    ],
    ...workshops.map(w => [
      w.id, w.businessName, w.ownerName, w.phone, w.email, w.location,
      w.bayCount, w.liftCount, w.hasThreePhasePower ? 'Yes' : 'No',
      w.electricalCapability ? 'Yes' : 'No', w.hybridEvReadiness ? 'Yes' : 'No',
      w.diagnosticToolsOwned, w.partsStorageSpace, w.technicianCount, w.readinessScore,
      w.status, w.nextAction, w.createdAt
    ])
  ];

  const vehicleValues = [
    [
      'Code', 'Model', 'Brand', 'Powertrain', 'Fuel Type', 'Engine & Power',
      'Category', 'Indicative FOB Min (USD)', 'Indicative FOB Max (USD)', 
      'Duty Rate', 'VAT Rate', 'Ground Clearance (mm)', 'Desert Rating (/10)', 
      'Readiness Score (/100)', 'Pipeline Stage', 'Evidence Classification'
    ],
    ...vehicles.map(v => [
      v.candidateCode, v.model, v.brand, v.powertrain, v.fuelType, `${v.engine} (${v.powerHp} HP)`,
      v.category, v.indicativeFobUsd.min, v.indicativeFobUsd.max,
      `${Math.round(v.dutyRatePct * 100)}%`, `${Math.round(v.vatRatePct * 100)}%`,
      v.groundClearanceMm, v.sandAndHeatSuitability.score,
      v.serviceReadinessScore, v.pipelineStage, v.evidenceClassification
    ])
  ];

  const dialloValues = [
    [
      '#', 'Category', 'Sprint Question', 'Description', 
      'Target Evidence / Response', 'Assigned Lead', 'Confidence', 'Status', 'Last Updated'
    ],
    ...dialloQuestions.map(q => [
      q.number, q.category, q.title, q.description,
      q.targetResponse, q.assignedTo, q.confidence, q.status, q.lastUpdated
    ])
  ];

  // 3. Ensure sheet tabs exist
  const meta = await getSpreadsheetDetails(spreadsheetId);
  const existingSheets = meta.sheets;
  const targetSheets = [
    'Personal Leads', 
    'Fleet Inquiries', 
    'Mechanic Cohort', 
    'Partner Workshops', 
    'Candidate Vehicles', 
    'Diallo Sprint Questions'
  ];

  const sheetsToCreate = targetSheets.filter(title => !existingSheets.includes(title));
  if (sheetsToCreate.length > 0) {
    const addSheetRequests = sheetsToCreate.map(title => ({
      addSheet: { properties: { title } }
    }));
    await authFetch(`${SHEETS_API_BASE}/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      body: JSON.stringify({ requests: addSheetRequests })
    });
  }

  // 4. Batch update values across all sheets
  const dataPayload = [
    { range: "'Personal Leads'!A1", values: personalValues },
    { range: "'Fleet Inquiries'!A1", values: fleetValues },
    { range: "'Mechanic Cohort'!A1", values: mechanicValues },
    { range: "'Partner Workshops'!A1", values: workshopValues },
    { range: "'Candidate Vehicles'!A1", values: vehicleValues },
    { range: "'Diallo Sprint Questions'!A1", values: dialloValues }
  ];

  await authFetch(`${SHEETS_API_BASE}/${spreadsheetId}/values:batchUpdate`, {
    method: 'POST',
    body: JSON.stringify({
      valueInputOption: 'USER_ENTERED',
      data: dataPayload,
    })
  });

  return {
    success: true,
    spreadsheetId,
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
    rowsAdded: {
      personal: personalLeads.length,
      fleet: fleetLeads.length,
      mechanics: mechanics.length,
      workshops: workshops.length,
      vehicles: vehicles.length,
      governance: dialloQuestions.length,
    },
    message: `Successfully synchronized ${leads.length} CRM records, ${vehicles.length} vehicle models, and ${dialloQuestions.length} sprint questions to Google Sheets.`
  };
}

/**
 * Append a newly submitted lead to the connected Google Sheet
 */
export async function appendLeadToSheet(spreadsheetId: string, lead: CRMLead): Promise<boolean> {
  try {
    let sheetName = '';
    let rowValues: any[] = [];

    switch (lead.type) {
      case 'personal':
        sheetName = 'Personal Leads';
        rowValues = [
          lead.id, lead.fullName, lead.phone, lead.email || '', lead.city, 
          lead.selectedVehicleId || lead.vehiclePreference || 'Open',
          lead.budgetRange, lead.primaryUsage, lead.purchaseTimeline, lead.depositReadiness,
          lead.crmStage, lead.status, lead.createdAt, lead.notes || ''
        ];
        break;
      case 'fleet':
        sheetName = 'Fleet Inquiries';
        rowValues = [
          lead.id, lead.orgName, lead.contactName, lead.contactTitle, lead.phone, lead.email,
          lead.sector, lead.fleetSizeEstimate, lead.deliveryLocation, lead.operatingConditions,
          lead.acquisitionTiming, lead.crmStage, lead.status, lead.createdAt, lead.notes || ''
        ];
        break;
      case 'mechanic':
        sheetName = 'Mechanic Cohort';
        rowValues = [
          lead.id, lead.fullName, lead.phone, lead.email || '', lead.city, lead.yearsExperience,
          lead.currentWorkshop, lead.specialties.join(', '), lead.languages.join(', '), lead.certifications,
          lead.hasDiagnosticExperience ? 'Yes' : 'No', lead.pathwayStage, lead.readinessRating, 
          lead.status, lead.nextAction, lead.createdAt
        ];
        break;
      case 'workshop':
        sheetName = 'Partner Workshops';
        rowValues = [
          lead.id, lead.businessName, lead.ownerName, lead.phone, lead.email, lead.location,
          lead.bayCount, lead.liftCount, lead.hasThreePhasePower ? 'Yes' : 'No',
          lead.electricalCapability ? 'Yes' : 'No', lead.hybridEvReadiness ? 'Yes' : 'No',
          lead.diagnosticToolsOwned, lead.partsStorageSpace, lead.technicianCount, lead.readinessScore,
          lead.status, lead.nextAction, lead.createdAt
        ];
        break;
    }

    if (!sheetName) return false;

    const url = `${SHEETS_API_BASE}/${spreadsheetId}/values/'${encodeURIComponent(sheetName)}'!A:A:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    await authFetch(url, {
      method: 'POST',
      body: JSON.stringify({ values: [rowValues] }),
    });
    return true;
  } catch (err) {
    console.error('Failed to append lead to Google Sheet:', err);
    return false;
  }
}
