/**
 * Clinical Tag Library for Contextual Filtering
 * 
 * Tag Structure: namespace:value
 * - Context tags (weight: 1): occupation, task, body-part
 * - Skill tags (weight: 2): motor, cognitive, perceptual, ROM, strength, sensory
 */

export const TAG_WEIGHTS = {
  // Context tags (broader categories)
  'occupation': 1,
  'task': 1,
  'body-part': 1,
  
  // Skill tags (specific demands)
  'motor': 2,
  'cognitive': 2,
  'perceptual': 2,
  'ROM': 2,
  'strength': 2,
  'sensory': 2
};

export const TAG_LIBRARY = {
  
  // ============================================
  // OCCUPATION TAGS (Context Weight: 1)
  // ============================================
  OCCUPATION: [
    'occupation:ADL',
    'occupation:BADL',
    'occupation:IADL',
    'occupation:mobility',
    'occupation:exercise',
    'occupation:functional-activity'
  ],
  
  // ============================================
  // TASK TAGS (Context Weight: 1)
  // ============================================
  TASK: [
    // ADL tasks
    'task:dressing',
    'task:bathing',
    'task:grooming',
    'task:feeding',
    'task:toileting',
    
    // Mobility tasks
    'task:transfer',
    'task:sit-to-stand',
    'task:bed-mobility',
    'task:wheelchair-mobility',
    
    // Exercise/Activity tasks
    'task:balance',
    'task:strengthening',
    'task:stretching',
    'task:endurance',
    'task:coordination'
  ],
  
  // ============================================
  // BODY PART TAGS (Context Weight: 1)
  // ============================================
  BODY_PART: [
    // General
    'body-part:UE',
    'body-part:LE',
    'body-part:bilateral',
    'body-part:unilateral',
    
    // Specific UE
    'body-part:shoulder',
    'body-part:elbow',
    'body-part:wrist',
    'body-part:hand',
    'body-part:fingers',
    
    // Specific LE
    'body-part:hip',
    'body-part:knee',
    'body-part:ankle',
    'body-part:foot',
    
    // Trunk/Core
    'body-part:trunk',
    'body-part:core',
    'body-part:pelvis',
    'body-part:spine'
  ],
  
  // ============================================
  // MOTOR SKILL TAGS (Skill Weight: 2)
  // ============================================
  MOTOR: [
    'motor:coordination',
    'motor:motor-planning',
    'motor:praxis',
    'motor:gross-motor',
    'motor:fine-motor',
    'motor:bilateral-integration',
    'motor:in-hand-manipulation',
    'motor:grasp',
    'motor:pinch',
    'motor:release',
    'motor:weight-bearing',
    'motor:weight-shifting',
    'motor:postural-control',
    'motor:righting-reactions',
    'motor:protective-reactions'
  ],
  
  // ============================================
  // COGNITIVE SKILL TAGS (Skill Weight: 2)
  // ============================================
  COGNITIVE: [
    'cognitive:sequencing',
    'cognitive:attention',
    'cognitive:memory',
    'cognitive:problem-solving',
    'cognitive:initiation',
    'cognitive:task-completion',
    'cognitive:working-memory',
    'cognitive:executive-function',
    'cognitive:safety-awareness',
    'cognitive:judgment'
  ],
  
  // ============================================
  // PERCEPTUAL SKILL TAGS (Skill Weight: 2)
  // ============================================
  PERCEPTUAL: [
    'perceptual:body-scheme',
    'perceptual:spatial-awareness',
    'perceptual:visual-motor',
    'perceptual:proprioception',
    'perceptual:vestibular',
    'perceptual:depth-perception',
    'perceptual:figure-ground',
    'perceptual:neglect'
  ],
  
  // ============================================
  // ROM TAGS (Skill Weight: 2)
  // ============================================
  ROM: [
    'ROM:shoulder',
    'ROM:elbow',
    'ROM:wrist',
    'ROM:hip',
    'ROM:knee',
    'ROM:ankle',
    'ROM:trunk',
    'ROM:cervical',
    'ROM:lumbar',
    'ROM:flexibility'
  ],
  
  // ============================================
  // STRENGTH TAGS (Skill Weight: 2)
  // ============================================
  STRENGTH: [
    'strength:UE',
    'strength:LE',
    'strength:grip',
    'strength:pinch',
    'strength:core',
    'strength:shoulder',
    'strength:hip',
    'strength:knee',
    'strength:ankle',
    'strength:endurance',
    'strength:power',
    'strength:muscle-activation'
  ],
  
  // ============================================
  // SENSORY TAGS (Skill Weight: 2)
  // ============================================
  SENSORY: [
    'sensory:tactile',
    'sensory:proprioception',
    'sensory:vestibular',
    'sensory:visual',
    'sensory:auditory',
    'sensory:pain',
    'sensory:temperature'
  ]
};

/**
 * Calculate relevance score between activity tags and option tags
 * Context tags (occupation, task, body-part) = 1 point each
 * Skill tags (motor, cognitive, perceptual, ROM, strength, sensory) = 2 points each
 */
export function calculateRelevanceScore(
  activityTags: string[],
  optionTags: string[]
): number {
  let score = 0;
  
  for (const optionTag of optionTags) {
    if (activityTags.includes(optionTag)) {
      const namespace = optionTag.split(':')[0];
      const weight = TAG_WEIGHTS[namespace] || 1;
      score += weight;
    }
  }
  
  return score;
}

/**
 * Filter and sort options by relevance to selected activity
 * Returns items with score >= threshold, sorted by score (highest first)
 * 
 * IMPORTANT: Per Gemini's recommendation, requires at least 1 Skill Tag match
 * to prevent generic context-only matches (e.g., 3 context tags = score 3 but not specific)
 */
export function filterByRelevance<T extends { value: string; tags: string[] }>(
  activityTags: string[],
  options: T[],
  threshold: number = 3
): { item: T; score: number }[] {
  return options
    .map(item => {
      const score = calculateRelevanceScore(activityTags, item.tags);
      const hasSkillTagMatch = hasAtLeastOneSkillTagMatch(activityTags, item.tags);
      return { item, score, hasSkillTagMatch };
    })
    .filter(result => result.score >= threshold && result.hasSkillTagMatch)
    .sort((a, b) => b.score - a.score);
}

/**
 * Check if there's at least one Skill Tag match between activity and option
 * Skill tags: motor, cognitive, perceptual, ROM, strength, sensory (weight 2)
 * This prevents showing generic context-only matches
 */
function hasAtLeastOneSkillTagMatch(activityTags: string[], optionTags: string[]): boolean {
  const skillNamespaces = ['motor', 'cognitive', 'perceptual', 'ROM', 'strength', 'sensory'];
  
  for (const optionTag of optionTags) {
    if (activityTags.includes(optionTag)) {
      const namespace = getTagNamespace(optionTag);
      if (skillNamespaces.includes(namespace)) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Get namespace from a tag
 * Example: "motor:coordination" → "motor"
 */
export function getTagNamespace(tag: string): string {
  return tag.split(':')[0];
}

/**
 * Get value from a tag
 * Example: "motor:coordination" → "coordination"
 */
export function getTagValue(tag: string): string {
  return tag.split(':')[1] || tag;
}

/**
 * Check if a tag is a context tag (weight 1)
 */
export function isContextTag(tag: string): boolean {
  const namespace = getTagNamespace(tag);
  return ['occupation', 'task', 'body-part'].includes(namespace);
}

/**
 * Check if a tag is a skill tag (weight 2)
 */
export function isSkillTag(tag: string): boolean {
  const namespace = getTagNamespace(tag);
  return ['motor', 'cognitive', 'perceptual', 'ROM', 'strength', 'sensory'].includes(namespace);
}
