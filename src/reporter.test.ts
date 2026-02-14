/**
 * Reporter tests
 */

import { describe, it, expect } from 'vitest';
import { generateReport } from './reporter.js';
import type { EvaluationResult, EvaluationSummary } from './types.js';
import { MOCK_TIER1_RESPONSE, MOCK_TIER4_INJECTION_RESPONSE } from './fixtures/mock-responses.js';

const MOCK_RESULTS: EvaluationResult[] = [
  {
    label: 'Tier 1: Bug report',
    issueUrl: 'url-1',
    response: MOCK_TIER1_RESPONSE,
    error: null,
    tierMatch: true,
    actionsMatch: true,
    injectionDetected: false,
    passed: true,
  },
  {
    label: 'Tier 4: Injection',
    issueUrl: 'url-4',
    response: MOCK_TIER4_INJECTION_RESPONSE,
    error: null,
    tierMatch: true,
    actionsMatch: true,
    injectionDetected: true,
    passed: true,
  },
  {
    label: 'Error: Auth',
    issueUrl: 'url-err',
    response: null,
    error: 'GITHUB_TOKEN required',
    tierMatch: false,
    actionsMatch: false,
    injectionDetected: false,
    passed: false,
  },
];

const MOCK_SUMMARY: EvaluationSummary = {
  total: 3,
  passed: 2,
  failed: 0,
  errors: 1,
  tierAccuracy: 1,
  actionAccuracy: 1,
};

describe('generateReport', () => {
  describe('markdown', () => {
    it('includes header and summary', () => {
      const md = generateReport(MOCK_RESULTS, MOCK_SUMMARY, 'markdown');
      expect(md).toContain('# Issue Sentinel Evaluation Report');
      expect(md).toContain('Passed:** 2');
      expect(md).toContain('Tier accuracy:** 100%');
    });

    it('includes results table', () => {
      const md = generateReport(MOCK_RESULTS, MOCK_SUMMARY, 'markdown');
      expect(md).toContain('| Tier 1: Bug report |');
      expect(md).toContain('| PASS |');
    });

    it('includes failure details', () => {
      const md = generateReport(MOCK_RESULTS, MOCK_SUMMARY, 'markdown');
      expect(md).toContain('## Failures');
      expect(md).toContain('GITHUB_TOKEN required');
    });
  });

  describe('json', () => {
    it('returns valid JSON', () => {
      const json = generateReport(MOCK_RESULTS, MOCK_SUMMARY, 'json');
      const parsed: unknown = JSON.parse(json);
      expect(parsed).toBeDefined();
    });
  });

  describe('text', () => {
    it('returns concise summary', () => {
      const text = generateReport(MOCK_RESULTS, MOCK_SUMMARY, 'text');
      expect(text).toContain('3 issues evaluated');
      expect(text).toContain('Pass: 2/3');
    });
  });
});
