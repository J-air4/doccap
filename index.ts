/**
 * Clinical Narrative Builder v3.1 - Main Entry Point
 * 
 * Import this file to use the complete application:
 * 
 * import ClinicalNarrativeBuilder from './index';
 * 
 * Or import individual components:
 * 
 * import { TAGGED_ACTIVITIES, calculateRelevanceScore } from './index';
 */

// Main Application Component
export { default } from './ClinicalNarrativeBuilder_v3.1_INTEGRATED';
export { default as ClinicalNarrativeBuilder } from './ClinicalNarrativeBuilder_v3.1_INTEGRATED';

// Tag Library Functions
export {
  TAG_WEIGHTS,
  TAG_LIBRARY,
  calculateRelevanceScore,
  filterByRelevance,
  getTagNamespace,
  getTagValue,
  isContextTag,
  isSkillTag
} from './tagLibrary';

// Tagged Data
export { TAGGED_ACTIVITIES } from './taggedActivities';
export { TAGGED_CUEING_PURPOSES } from './taggedCueingPurposes';
export { TAGGED_IMPAIRMENTS } from './taggedImpairments';
export { TAGGED_GOALS } from './taggedGoals';

// Types
export type { TaggedActivity } from './taggedActivities';
export type { TaggedCueingPurpose } from './taggedCueingPurposes';
export type { TaggedImpairment } from './taggedImpairments';
export type { TaggedGoal } from './taggedGoals';
