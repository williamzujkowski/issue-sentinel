/**
 * Mock triage responses for deterministic testing.
 */

import type { TriageResponse } from '../types.js';

export const MOCK_TIER1_RESPONSE: TriageResponse = {
  issueNumber: 100,
  repository: 'williamzujkowski/nexus-agents',
  category: 'bug',
  categoryConfidence: 0.92,
  trustAssessment: {
    trustTier: '1',
    userRole: 'maintainer',
    reputationScore: 95,
    isSuspicious: false,
    suspiciousSignals: [],
  },
  proposedActions: [
    {
      type: 'ClassifyIssue',
      description: 'Bug report with clear reproduction steps',
      policyApproved: true,
      corroborated: true,
    },
    {
      type: 'SummarizeIssue',
      description: 'Timeout in CLI expert execution',
      policyApproved: true,
      corroborated: true,
    },
    {
      type: 'ProposeLabels',
      description: 'bug, cli, timeout',
      policyApproved: true,
      corroborated: true,
    },
  ],
  durationMs: 1200,
};

export const MOCK_TIER2_RESPONSE: TriageResponse = {
  issueNumber: 200,
  repository: 'williamzujkowski/nexus-agents',
  category: 'feature',
  categoryConfidence: 0.85,
  trustAssessment: {
    trustTier: '2',
    userRole: 'contributor',
    reputationScore: 60,
    isSuspicious: false,
    suspiciousSignals: [],
  },
  proposedActions: [
    {
      type: 'ClassifyIssue',
      description: 'Feature request for new workflow template',
      policyApproved: true,
      corroborated: true,
    },
    {
      type: 'SummarizeIssue',
      description: 'Add code-quality workflow template',
      policyApproved: true,
      corroborated: true,
    },
  ],
  durationMs: 800,
};

export const MOCK_TIER3_RESPONSE: TriageResponse = {
  issueNumber: 300,
  repository: 'williamzujkowski/nexus-agents',
  category: 'question',
  categoryConfidence: 0.78,
  trustAssessment: {
    trustTier: '3',
    userRole: 'unknown',
    isSuspicious: false,
    suspiciousSignals: [],
  },
  proposedActions: [
    {
      type: 'ClassifyIssue',
      description: 'Usage question about MCP tool configuration',
      policyApproved: true,
      corroborated: false,
    },
    {
      type: 'SummarizeIssue',
      description: 'How to configure consensus voting timeout',
      policyApproved: true,
      corroborated: false,
    },
  ],
  durationMs: 600,
};

export const MOCK_TIER4_INJECTION_RESPONSE: TriageResponse = {
  issueNumber: 400,
  repository: 'williamzujkowski/nexus-agents',
  category: 'security',
  categoryConfidence: 0.95,
  trustAssessment: {
    trustTier: '4',
    userRole: 'unknown',
    isSuspicious: true,
    suspiciousSignals: [
      'authority_claim: "as a maintainer"',
      'instruction_pattern: "close all issues"',
    ],
  },
  proposedActions: [
    {
      type: 'RefuseAction',
      description: 'Hostile content detected: authority impersonation',
      policyApproved: true,
      corroborated: true,
    },
    {
      type: 'RequestHumanApproval',
      description: 'Tier 4 content requires human review',
      policyApproved: true,
      corroborated: true,
    },
  ],
  durationMs: 500,
};

export const MOCK_SECURITY_NO_EVIDENCE: TriageResponse = {
  issueNumber: 500,
  repository: 'williamzujkowski/nexus-agents',
  category: 'security',
  categoryConfidence: 0.7,
  trustAssessment: {
    trustTier: '3',
    userRole: 'unknown',
    isSuspicious: false,
    suspiciousSignals: [],
  },
  proposedActions: [
    {
      type: 'RequestHumanApproval',
      description: 'Security claim without CVE or reproduction steps',
      policyApproved: true,
      corroborated: false,
    },
  ],
  durationMs: 700,
};
