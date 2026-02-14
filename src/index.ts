/**
 * issue-sentinel — Security pipeline E2E tester
 *
 * Validates nexus-agents issue_triage trust classification,
 * injection detection, and typed action constraints.
 */

export type { ToolCaller } from './evaluator.js';
export {
  evaluateResponse,
  evaluateError,
  triageIssue,
  runEvaluation,
  computeSummary,
} from './evaluator.js';
export { generateReport, type ReportFormat } from './reporter.js';
export type {
  SyntheticIssue,
  EvaluationResult,
  EvaluationSummary,
  TriageInput,
  TriageResponse,
  TrustAssessment,
  ProposedAction,
  TrustTier,
  UserRole,
  IssueCategory,
  ActionType,
} from './types.js';
export {
  TriageInputSchema,
  TriageResponseSchema,
  TrustAssessmentSchema,
  ProposedActionSchema,
  TRUST_TIERS,
  USER_ROLES,
  ISSUE_CATEGORIES,
  ACTION_TYPES,
} from './types.js';
export { ALL_FIXTURES } from './fixtures/synthetic-issues.js';
