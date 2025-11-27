/**
 * Simple data adapter to transform existing tagged data
 * for use in the Classic Narrative Builder
 */

import { TAGGED_ACTIVITIES } from './taggedActivities';
import { TAGGED_GOALS } from './taggedGoals';
import { TAGGED_IMPAIRMENTS } from './taggedImpairments';
import { TAGGED_CUEING_PURPOSES } from './taggedCueingPurposes';

export interface ClassicOption {
  id: string;
  label: string;
  value: string;
  tags?: string[];
}

export interface ClassicData {
  activities: Record<string, ClassicOption[]>;
  goals: ClassicOption[];
  impairments: ClassicOption[];
  cueingPurposes: ClassicOption[];
}

/**
 * Transform activities data
 */
function transformActivities() {
  const result: Record<string, ClassicOption[]> = {};
  
  Object.entries(TAGGED_ACTIVITIES).forEach(([category, activities]) => {
    result[category] = activities.map((activity, index) => ({
      id: `${category}-${index}`,
      label: activity.value,
      value: activity.value,
      tags: activity.tags,
    }));
  });
  
  return result;
}

/**
 * Transform goals data
 */
function transformGoals(): ClassicOption[] {
  return TAGGED_GOALS.map((goal, index) => ({
    id: `goal-${index}`,
    label: goal.value,
    value: goal.value,
    tags: goal.tags,
  }));
}

/**
 * Transform impairments data
 */
function transformImpairments(): ClassicOption[] {
  return TAGGED_IMPAIRMENTS.map((impairment, index) => ({
    id: `impairment-${index}`,
    label: impairment.value,
    value: impairment.value,
    tags: impairment.tags,
  }));
}

/**
 * Transform cueing purposes data
 */
function transformCueingPurposes(): ClassicOption[] {
  return TAGGED_CUEING_PURPOSES.map((purpose, index) => ({
    id: `cueing-${index}`,
    label: purpose.value,
    value: purpose.value,
    tags: purpose.tags,
  }));
}

/**
 * Main adapter function - transforms all data
 */
export function adaptDataForClassicUI(): ClassicData {
  return {
    activities: transformActivities(),
    goals: transformGoals(),
    impairments: transformImpairments(),
    cueingPurposes: transformCueingPurposes(),
  };
}
