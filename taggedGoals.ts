/**
 * Tagged Goals Data
 * Each goal tagged with clinical domains for contextual filtering
 * 
 * Goals will be suggested based on activity demands and selected impairments
 * Example: UB dressing activity → suggests ADL independence, ROM, coordination goals
 */

export interface TaggedGoal {
  value: string;
  tags: string[];
}

export const TAGGED_GOALS: TaggedGoal[] = [
  
  // ============================================
  // INDEPENDENCE GOALS
  // ============================================
  {
    value: "to promote independence with ADLs",
    tags: ["occupation:ADL", "occupation:BADL", "task:dressing", "task:bathing", "task:grooming", "task:feeding",
           "motor:coordination", "cognitive:sequencing", "cognitive:task-completion"]
  },
  {
    value: "to promote independence with BADLs",
    tags: ["occupation:BADL", "occupation:ADL", "task:dressing", "task:bathing", "task:grooming", "task:toileting",
           "motor:coordination", "cognitive:sequencing", "cognitive:task-completion"]
  },
  {
    value: "to facilitate independence with self-care tasks",
    tags: ["occupation:ADL", "occupation:BADL", "task:dressing", "task:bathing", "task:grooming",
           "motor:coordination", "cognitive:sequencing"]
  },
  {
    value: "to increase independence with functional transfers",
    tags: ["occupation:mobility", "task:transfer", "task:sit-to-stand", "motor:postural-control", "strength:LE"]
  },
  {
    value: "to promote independence during functional mobility",
    tags: ["occupation:mobility", "task:balance", "motor:postural-control", "motor:weight-shifting", "body-part:LE"]
  },
  
  // ============================================
  // SAFETY GOALS
  // ============================================
  {
    value: "to increase safety during functional tasks",
    tags: ["cognitive:safety-awareness", "cognitive:judgment", "occupation:functional-activity", "occupation:mobility", 
           "task:balance", "task:transfer", "motor:postural-control"]
  },
  {
    value: "to promote safety during ADLs and IADLs",
    tags: ["cognitive:safety-awareness", "cognitive:judgment", "occupation:ADL", "occupation:IADL", "task:balance"]
  },
  {
    value: "to decrease fall risk",
    tags: ["task:balance", "motor:postural-control", "cognitive:safety-awareness", 
           "occupation:mobility", "body-part:LE", "perceptual:proprioception"]
  },
  {
    value: "to promote safety awareness",
    tags: ["cognitive:safety-awareness", "cognitive:judgment", "occupation:mobility", 
           "occupation:functional-activity", "task:balance", "motor:postural-control"]
  },
  
  // ============================================
  // FUNCTIONAL PERFORMANCE GOALS
  // ============================================
  {
    value: "to improve functional task performance",
    tags: ["occupation:functional-activity", "occupation:ADL", "motor:motor-planning", 
           "cognitive:attention", "motor:coordination"]
  },
  {
    value: "to facilitate functional reaching abilities",
    tags: ["motor:coordination", "ROM:shoulder", "ROM:trunk", "body-part:UE", 
           "occupation:functional-activity", "task:balance"]
  },
  {
    value: "to promote trunk control during daily tasks",
    tags: ["motor:postural-control", "body-part:trunk", "body-part:core", "strength:core",
           "task:balance", "occupation:functional-activity", "occupation:ADL"]
  },
  {
    value: "to facilitate postural control",
    tags: ["motor:postural-control", "body-part:trunk", "body-part:core", "task:balance",
           "occupation:mobility", "occupation:functional-activity"]
  },
  {
    value: "to improve dynamic balance during ADLs",
    tags: ["motor:postural-control", "motor:weight-shifting", "task:balance", "body-part:trunk", "body-part:LE",
           "occupation:ADL", "occupation:mobility", "perceptual:proprioception"]
  },
  
  // ============================================
  // SPECIFIC ADL GOALS
  // ============================================
  {
    value: "to facilitate threading during LB dressing",
    tags: ["occupation:ADL", "task:dressing", "body-part:LE", "motor:coordination", 
           "motor:motor-planning", "ROM:hip", "ROM:lumbar"]
  },
  {
    value: "to promote B shoulder ROM for dressing",
    tags: ["ROM:shoulder", "body-part:shoulder", "body-part:UE", "body-part:bilateral",
           "occupation:ADL", "task:dressing"]
  },
  {
    value: "to improve trunk mobility for bathing tasks",
    tags: ["ROM:trunk", "ROM:lumbar", "body-part:trunk", "occupation:ADL", "task:bathing",
           "motor:postural-control"]
  },
  {
    value: "to facilitate safety during toilet transfers",
    tags: ["cognitive:safety-awareness", "task:transfer", "motor:postural-control", 
           "occupation:ADL", "task:toileting", "strength:LE"]
  },
  {
    value: "to improve ability to sit EOB for transfers",
    tags: ["motor:postural-control", "task:balance", "task:transfer", "body-part:trunk", "body-part:core",
           "occupation:mobility", "occupation:functional-activity"]
  },
  
  // ============================================
  // STRENGTH/ROM GOALS
  // ============================================
  {
    value: "to promote BUE strength and coordination",
    tags: ["strength:UE", "motor:coordination", "body-part:UE", "body-part:bilateral",
           "occupation:exercise", "task:strengthening", "occupation:functional-activity"]
  },
  {
    value: "to increase B shoulder ROM",
    tags: ["ROM:shoulder", "body-part:shoulder", "body-part:UE", "body-part:bilateral",
           "occupation:exercise", "task:stretching", "occupation:ADL"]
  },
  {
    value: "to improve grip/pinch strength",
    tags: ["strength:grip", "strength:pinch", "body-part:hand", "body-part:fingers",
           "motor:fine-motor", "occupation:ADL", "occupation:functional-activity"]
  },
  {
    value: "to promote activity tolerance",
    tags: ["strength:endurance", "occupation:exercise", "occupation:functional-activity",
           "task:endurance"]
  },
  
  // ============================================
  // RETURN TO FUNCTION GOALS
  // ============================================
  {
    value: "to return patient to prior level of functioning",
    tags: ["occupation:ADL", "occupation:mobility", "occupation:functional-activity",
           "motor:coordination", "strength:UE", "strength:LE"]
  },
  {
    value: "to progress toward discharge goals",
    tags: ["occupation:ADL", "occupation:mobility", "occupation:functional-activity",
           "cognitive:task-completion"]
  }
];
