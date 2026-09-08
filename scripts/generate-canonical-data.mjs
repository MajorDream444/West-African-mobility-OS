import { readFile, writeFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';

const root = resolve(import.meta.dirname, '..');
const claimsPath = resolve(root, 'Mauritania_Mobility_Intelligence_Canonical_Package/data/claims-register.csv');
const decisionsPath = resolve(root, 'Mauritania_Mobility_Intelligence_Canonical_Package/docs/00-governance/DECISION-REGISTER.md');
const dependenciesPath = resolve(root, 'Mauritania_Mobility_Intelligence_Canonical_Package/data/economic-dependencies.csv');
const outputPath = resolve(root, 'src/generated/canonicalGovernance.ts');
const allowedClasses = new Set(['VERIFIED', 'REPORTED', 'ASSUMPTION', 'PROPOSAL', 'OPEN', 'CONFLICT']);
const claimFields = ['claim_id', 'statement', 'classification', 'source', 'source_date', 'source_owner', 'geography', 'lane', 'confidence', 'status', 'validation_owner', 'next_action', 'last_reviewed'];
const dependencyFields = ['output_id', 'output_label', 'input_id', 'input_label', 'claim_ids'];

export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === '"' && text[index + 1] === '"') { field += '"'; index += 1; }
      else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ',') { row.push(field.trim()); field = ''; }
    else if (char === '\n') { row.push(field.trim()); if (row.some(Boolean)) rows.push(row); row = []; field = ''; }
    else if (char !== '\r') field += char;
  }
  if (quoted) throw new Error('Unterminated quoted CSV field');
  if (field || row.length) { row.push(field.trim()); if (row.some(Boolean)) rows.push(row); }
  return rows;
}

function assertUnique(records, key, label) {
  const seen = new Set();
  for (const record of records) {
    if (seen.has(record[key])) throw new Error(`Duplicate ${label} ID: ${record[key]}`);
    seen.add(record[key]);
  }
}

export function parseClaims(text) {
  const rows = parseCsv(text);
  const header = rows.shift();
  if (!header || claimFields.some((field) => !header.includes(field))) throw new Error('Claims register is missing required columns');
  const claims = rows.map((values) => Object.fromEntries(header.map((field, index) => [field, values[index] ?? ''])));
  claims.forEach((claim, rowIndex) => {
    const missing = claimFields.filter((field) => !claim[field]);
    if (missing.length) throw new Error(`Claim row ${rowIndex + 2} missing: ${missing.join(', ')}`);
    if (!/^CLM-\d{3}$/.test(claim.claim_id)) throw new Error(`Invalid claim ID: ${claim.claim_id}`);
    if (!allowedClasses.has(claim.classification)) throw new Error(`Invalid evidence class on ${claim.claim_id}: ${claim.classification}`);
  });
  assertUnique(claims, 'claim_id', 'claim');
  return claims;
}

export function parseDecisions(text) {
  const decisions = text.split('\n').filter((line) => /^\| DEC-\d{3} \|/.test(line)).map((line) => {
    const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
    if (cells.length !== 5 || cells.some((cell) => !cell)) throw new Error(`Malformed decision row: ${line}`);
    const [id, date, decision, status, rationale] = cells;
    if (!/^DEC-\d{3}$/.test(id)) throw new Error(`Invalid decision ID: ${id}`);
    return { id, date, decision, status, rationale };
  });
  if (!decisions.length) throw new Error('No canonical decisions found');
  assertUnique(decisions, 'id', 'decision');
  return decisions;
}

export function parseEconomicDependencies(text) {
  const rows = parseCsv(text);
  const header = rows.shift();
  if (!header || dependencyFields.some((field) => !header.includes(field))) throw new Error('Economic dependency register is missing required columns');
  const dependencies = rows.map((values) => Object.fromEntries(header.map((field, index) => [field, values[index] ?? ''])));
  const pairs = new Set();
  const labels = new Map();
  dependencies.forEach((dependency, rowIndex) => {
    const missing = dependencyFields.filter((field) => field !== 'claim_ids' && !dependency[field]);
    if (missing.length) throw new Error(`Economic dependency row ${rowIndex + 2} missing: ${missing.join(', ')}`);
    if (!/^[a-z][a-z0-9_]*$/.test(dependency.output_id)) throw new Error(`Invalid economic output ID: ${dependency.output_id}`);
    if (!/^[a-z][a-z0-9_]*$/.test(dependency.input_id)) throw new Error(`Invalid economic input ID: ${dependency.input_id}`);
    if (labels.has(dependency.output_id) && labels.get(dependency.output_id) !== dependency.output_label) throw new Error(`Conflicting labels for economic output: ${dependency.output_id}`);
    labels.set(dependency.output_id, dependency.output_label);
    const pair = `${dependency.output_id}:${dependency.input_id}`;
    if (pairs.has(pair)) throw new Error(`Duplicate economic dependency: ${pair}`);
    pairs.add(pair);
    dependency.claim_ids = dependency.claim_ids ? dependency.claim_ids.split(';').map((id) => id.trim()).filter(Boolean) : [];
    dependency.claim_ids.forEach((claimId) => {
      if (!/^CLM-\d{3}$/.test(claimId)) throw new Error(`Invalid claim ID in economic dependency ${pair}: ${claimId}`);
    });
  });
  if (!dependencies.length) throw new Error('No economic dependencies found');
  return dependencies;
}

export function resolveEconomicOutputGates(claims, dependencies) {
  const claimsById = new Map(claims.map((claim) => [claim.claim_id, claim]));
  const grouped = new Map();
  for (const dependency of dependencies) {
    const output = grouped.get(dependency.output_id) ?? { outputId: dependency.output_id, outputLabel: dependency.output_label, dependencies: [] };
    output.dependencies.push(dependency);
    grouped.set(dependency.output_id, output);
  }
  return Object.fromEntries([...grouped.values()].map((output) => {
    const undeclaredInputIds = output.dependencies.filter((dependency) => dependency.claim_ids.length === 0).map((dependency) => dependency.input_id);
    const referencedClaimIds = [...new Set(output.dependencies.flatMap((dependency) => dependency.claim_ids))];
    const unknownClaimIds = referencedClaimIds.filter((claimId) => !claimsById.has(claimId));
    const blockingClaimIds = referencedClaimIds.filter((claimId) => claimsById.has(claimId) && claimsById.get(claimId).classification !== 'VERIFIED');
    const allowed = !undeclaredInputIds.length && !unknownClaimIds.length && !blockingClaimIds.length;
    return [output.outputId, {
      outputId: output.outputId,
      outputLabel: output.outputLabel,
      allowed,
      publicationBlocked: !allowed,
      dependencies: output.dependencies,
      blockingClaimIds,
      unknownClaimIds,
      undeclaredInputIds,
      reason: allowed ? `All declared evidence dependencies for ${output.outputLabel} are verified.` : `Publication blocked for ${output.outputLabel}: every economic input must reference known, verified canonical claims.`
    }];
  }));
}

export function publicationGate(outputGates) {
  const gates = Object.values(outputGates);
  const blockingClaimIds = [...new Set(gates.flatMap((gate) => [...gate.blockingClaimIds, ...gate.unknownClaimIds]))];
  const undeclaredInputIds = [...new Set(gates.flatMap((gate) => gate.undeclaredInputIds))];
  const publicationBlocked = gates.some((gate) => gate.publicationBlocked);
  return {
    publicPricesAllowed: !publicationBlocked,
    publicationBlocked,
    blockingClaimIds,
    undeclaredInputIds,
    reason: publicationBlocked ? 'One or more public economic outputs lack complete, verified canonical evidence.' : 'All public economic outputs have complete, verified canonical evidence.'
  };
}

export function canonicalRedefinitions(source, canonicalIds) {
  return [...source.matchAll(/(?:claim_id|id)\s*:\s*['"]((?:CLM|DEC)-\d{3})['"]/g)].map((match) => match[1]).filter((id) => canonicalIds.has(id));
}

export function renderGenerated(claims, decisions, dependencies) {
  const outputGates = resolveEconomicOutputGates(claims, dependencies);
  const gate = publicationGate(outputGates);
  const historicalClaims = claims.filter((claim) => claim.status.toLowerCase() === 'superseded');
  return `/* AUTO-GENERATED by scripts/generate-canonical-data.mjs. DO NOT EDIT. */\nimport type { Claim, Decision } from '../types';\n\nexport const CANONICAL_CLAIMS: readonly Claim[] = ${JSON.stringify(claims, null, 2)};\n\nexport const CANONICAL_DECISIONS: readonly Decision[] = ${JSON.stringify(decisions, null, 2)};\n\nexport const HISTORICAL_CANONICAL_CLAIMS: readonly Claim[] = ${JSON.stringify(historicalClaims, null, 2)};\n\nexport const ECONOMIC_OUTPUT_GATES = ${JSON.stringify(outputGates, null, 2)} as const;\n\nexport const PUBLICATION_GATE = ${JSON.stringify(gate, null, 2)} as const;\n`;
}

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const path = resolve(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(path) : [path];
  }));
  return nested.flat().filter((path) => /\.(ts|tsx)$/.test(path) && path !== outputPath);
}

export async function assertNoCanonicalRedefinitions(claims, decisions, directory = resolve(root, 'src')) {
  const canonicalIds = new Set([...claims.map((claim) => claim.claim_id), ...decisions.map((decision) => decision.id)]);
  const files = await sourceFiles(directory);
  for (const file of files) {
    const source = await readFile(file, 'utf8');
    const [redefinedId] = canonicalRedefinitions(source, canonicalIds);
    if (redefinedId) throw new Error(`Canonical ID ${redefinedId} is redefined outside generated governance data: ${file}`);
  }
}

export async function generate() {
  const [claimsText, decisionsText, dependenciesText] = await Promise.all([readFile(claimsPath, 'utf8'), readFile(decisionsPath, 'utf8'), readFile(dependenciesPath, 'utf8')]);
  const claims = parseClaims(claimsText);
  const decisions = parseDecisions(decisionsText);
  const dependencies = parseEconomicDependencies(dependenciesText);
  await assertNoCanonicalRedefinitions(claims, decisions);
  const generated = renderGenerated(claims, decisions, dependencies);
  if (process.argv.includes('--check')) {
    const current = await readFile(outputPath, 'utf8').catch(() => '');
    if (current !== generated) throw new Error('Generated governance data is stale. Run npm run generate:governance.');
  } else await writeFile(outputPath, generated);
  const outputGates = resolveEconomicOutputGates(claims, dependencies);
  return { claims, decisions, outputGates, gate: publicationGate(outputGates) };
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) {
  generate().then(({ claims, decisions, outputGates, gate }) => {
    console.log(`Validated ${claims.length} claims, ${decisions.length} decisions, and ${Object.keys(outputGates).length} economic outputs. Publication blocked: ${gate.publicationBlocked}.`);
  }).catch((error) => { console.error(error.message); process.exitCode = 1; });
}
