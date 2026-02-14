/**
 * Evaluation reporter
 */

import type { EvaluationResult, EvaluationSummary } from './types.js';

export type ReportFormat = 'markdown' | 'json' | 'text';

export function generateReport(
  results: readonly EvaluationResult[],
  summary: EvaluationSummary,
  format: ReportFormat
): string {
  if (format === 'json') {
    return JSON.stringify({ results, summary }, null, 2);
  }
  if (format === 'markdown') {
    return generateMarkdownReport(results, summary);
  }
  return generateTextReport(summary);
}

function generateMarkdownReport(
  results: readonly EvaluationResult[],
  summary: EvaluationSummary
): string {
  const lines: string[] = [];

  lines.push('# Issue Sentinel Evaluation Report');
  lines.push('');
  lines.push('## Summary');
  lines.push(`- **Total:** ${String(summary.total)}`);
  lines.push(`- **Passed:** ${String(summary.passed)}`);
  lines.push(`- **Failed:** ${String(summary.failed)}`);
  lines.push(`- **Errors:** ${String(summary.errors)}`);
  lines.push(
    `- **Tier accuracy:** ${String(Math.round(summary.tierAccuracy * 100))}%`
  );
  lines.push(
    `- **Action accuracy:** ${String(Math.round(summary.actionAccuracy * 100))}%`
  );
  lines.push('');

  lines.push('## Results');
  lines.push('');
  lines.push('| Label | Tier | Actions | Injection | Pass |');
  lines.push('|-------|------|---------|-----------|------|');
  for (const r of results) {
    const tier = r.tierMatch ? 'OK' : 'MISS';
    const actions = r.actionsMatch ? 'OK' : 'MISS';
    const injection = r.injectionDetected ? 'YES' : 'no';
    const pass = r.passed ? 'PASS' : 'FAIL';
    lines.push(`| ${r.label} | ${tier} | ${actions} | ${injection} | ${pass} |`);
  }

  const failures = results.filter((r) => !r.passed);
  if (failures.length > 0) {
    lines.push('');
    lines.push('## Failures');
    for (const f of failures) {
      lines.push(`### ${f.label}`);
      if (f.error !== null) {
        lines.push(`**Error:** ${f.error}`);
      } else if (f.response !== null) {
        lines.push(`**Got tier:** ${f.response.trustAssessment.trustTier}`);
        lines.push(
          `**Got actions:** ${f.response.proposedActions.map((a) => a.type).join(', ')}`
        );
        lines.push(`**Tier match:** ${String(f.tierMatch)}`);
        lines.push(`**Actions match:** ${String(f.actionsMatch)}`);
      }
      lines.push('');
    }
  }

  return lines.join('\n');
}

function generateTextReport(summary: EvaluationSummary): string {
  const lines: string[] = [];
  lines.push(`Issue Sentinel: ${String(summary.total)} issues evaluated`);
  lines.push(
    `Pass: ${String(summary.passed)}/${String(summary.total)}`
  );
  lines.push(
    `Tier accuracy: ${String(Math.round(summary.tierAccuracy * 100))}%`
  );
  lines.push(
    `Action accuracy: ${String(Math.round(summary.actionAccuracy * 100))}%`
  );
  return lines.join('\n');
}
