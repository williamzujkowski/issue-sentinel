/**
 * Zod schema validation tests
 */

import { describe, it, expect } from 'vitest';
import {
  TriageInputSchema,
  TriageResponseSchema,
  TrustAssessmentSchema,
  ProposedActionSchema,
  TRUST_TIERS,
  USER_ROLES,
  ISSUE_CATEGORIES,
  ACTION_TYPES,
} from './types.js';
import { MOCK_TIER1_RESPONSE } from './fixtures/mock-responses.js';

describe('TriageInputSchema', () => {
  it('accepts valid input', () => {
    const result = TriageInputSchema.safeParse({
      issueUrl: 'https://github.com/owner/repo/issues/1',
      dryRun: true,
    });
    expect(result.success).toBe(true);
  });

  it('rejects empty issueUrl', () => {
    const result = TriageInputSchema.safeParse({ issueUrl: '' });
    expect(result.success).toBe(false);
  });

  it('accepts without dryRun', () => {
    const result = TriageInputSchema.safeParse({
      issueUrl: 'https://github.com/owner/repo/issues/1',
    });
    expect(result.success).toBe(true);
  });
});

describe('TrustAssessmentSchema', () => {
  it('validates complete assessment', () => {
    const result = TrustAssessmentSchema.safeParse({
      trustTier: '1',
      userRole: 'maintainer',
      reputationScore: 95,
      isSuspicious: false,
      suspiciousSignals: [],
    });
    expect(result.success).toBe(true);
  });

  it('accepts assessment without reputationScore', () => {
    const result = TrustAssessmentSchema.safeParse({
      trustTier: '3',
      userRole: 'unknown',
      isSuspicious: false,
      suspiciousSignals: [],
    });
    expect(result.success).toBe(true);
  });

  it('validates suspicious signals array', () => {
    const result = TrustAssessmentSchema.safeParse({
      trustTier: '4',
      userRole: 'unknown',
      isSuspicious: true,
      suspiciousSignals: ['authority_claim', 'instruction_pattern'],
    });
    expect(result.success).toBe(true);
  });
});

describe('ProposedActionSchema', () => {
  it('validates action', () => {
    const result = ProposedActionSchema.safeParse({
      type: 'RefuseAction',
      description: 'Hostile content detected',
      policyApproved: true,
      corroborated: true,
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing fields', () => {
    const result = ProposedActionSchema.safeParse({
      type: 'RefuseAction',
    });
    expect(result.success).toBe(false);
  });
});

describe('TriageResponseSchema', () => {
  it('validates full response', () => {
    const result = TriageResponseSchema.safeParse(MOCK_TIER1_RESPONSE);
    expect(result.success).toBe(true);
  });

  it('rejects out of range confidence', () => {
    const result = TriageResponseSchema.safeParse({
      ...MOCK_TIER1_RESPONSE,
      categoryConfidence: 1.5,
    });
    expect(result.success).toBe(false);
  });

  it('rejects missing required fields', () => {
    const result = TriageResponseSchema.safeParse({
      issueNumber: 1,
      repository: 'test',
    });
    expect(result.success).toBe(false);
  });
});

describe('Constants', () => {
  it('has 4 trust tiers', () => {
    expect(TRUST_TIERS).toHaveLength(4);
    expect(TRUST_TIERS).toContain('1');
    expect(TRUST_TIERS).toContain('4');
  });

  it('has 6 user roles', () => {
    expect(USER_ROLES).toHaveLength(6);
    expect(USER_ROLES).toContain('owner');
    expect(USER_ROLES).toContain('unknown');
  });

  it('has 6 issue categories', () => {
    expect(ISSUE_CATEGORIES).toHaveLength(6);
    expect(ISSUE_CATEGORIES).toContain('bug');
    expect(ISSUE_CATEGORIES).toContain('security');
  });

  it('has 9 action types', () => {
    expect(ACTION_TYPES).toHaveLength(9);
    expect(ACTION_TYPES).toContain('RefuseAction');
    expect(ACTION_TYPES).toContain('SummarizeIssue');
    expect(ACTION_TYPES).toContain('HandoffMessage');
  });
});
