/**
 * Tagged Impairments Data
 * Each impairment tagged with clinical domains for contextual filtering
 * 
 * These impairments will be suggested based on the activity demands
 * Example: UB dressing activity → suggests sequencing, coordination, ROM impairments
 */

export interface TaggedImpairment {
  value: string;
  tags: string[];
}

export const TAGGED_IMPAIRMENTS: TaggedImpairment[] = [
  
  // ============================================
  // STRENGTH IMPAIRMENTS
  // ============================================
  {
    value: "decreased BUE strength",
    tags: ["strength:UE", "body-part:UE", "body-part:bilateral", "occupation:exercise", "task:strengthening"]
  },
  {
    value: "decreased LUE strength",
    tags: ["strength:UE", "body-part:UE", "body-part:unilateral", "occupation:exercise", "task:strengthening"]
  },
  {
    value: "decreased RUE strength",
    tags: ["strength:UE", "body-part:UE", "body-part:unilateral", "occupation:exercise", "task:strengthening"]
  },
  {
    value: "decreased BLE strength",
    tags: ["strength:LE", "body-part:LE", "body-part:bilateral", "occupation:mobility", "task:strengthening"]
  },
  {
    value: "decreased LLE strength",
    tags: ["strength:LE", "body-part:LE", "body-part:unilateral", "occupation:mobility", "task:strengthening"]
  },
  {
    value: "decreased RLE strength",
    tags: ["strength:LE", "body-part:LE", "body-part:unilateral", "occupation:mobility", "task:strengthening"]
  },
  {
    value: "decreased core strength",
    tags: ["strength:core", "body-part:core", "body-part:trunk", "task:balance", "motor:postural-control"]
  },
  {
    value: "decreased grip/pinch strength",
    tags: ["strength:grip", "strength:pinch", "body-part:hand", "body-part:fingers", "motor:fine-motor", "occupation:ADL"]
  },
  {
    value: "generalized weakness",
    tags: ["strength:UE", "strength:LE", "strength:endurance", "occupation:exercise", "occupation:functional-activity"]
  },
  {
    value: "deconditioning",
    tags: ["strength:endurance", "occupation:exercise", "task:strengthening", "task:endurance"]
  },
  
  // ============================================
  // BALANCE IMPAIRMENTS
  // ============================================
  {
    value: "impaired static balance",
    tags: ["motor:postural-control", "task:balance", "body-part:trunk", "body-part:LE", "perceptual:proprioception", "perceptual:vestibular"]
  },
  {
    value: "impaired dynamic balance",
    tags: ["motor:postural-control", "motor:weight-shifting", "task:balance", "body-part:trunk", "body-part:LE", 
           "perceptual:proprioception", "perceptual:vestibular", "occupation:mobility"]
  },
  {
    value: "impaired sitting balance",
    tags: ["motor:postural-control", "task:balance", "body-part:trunk", "body-part:core", 
           "perceptual:proprioception", "occupation:functional-activity"]
  },
  {
    value: "impaired standing balance",
    tags: ["motor:postural-control", "motor:weight-shifting", "task:balance", "body-part:trunk", "body-part:LE",
           "perceptual:proprioception", "perceptual:vestibular", "occupation:mobility"]
  },
  {
    value: "posterior leaning/retropulsion",
    tags: ["motor:postural-control", "motor:weight-shifting", "task:balance", "body-part:trunk", 
           "perceptual:proprioception", "perceptual:spatial-awareness"]
  },
  {
    value: "lateral leaning",
    tags: ["motor:postural-control", "task:balance", "body-part:trunk", "perceptual:proprioception", "perceptual:spatial-awareness"]
  },
  {
    value: "decreased weight bearing on one side",
    tags: ["motor:weight-bearing", "motor:postural-control", "body-part:LE", "body-part:unilateral",
           "perceptual:proprioception", "perceptual:neglect"]
  },
  {
    value: "LOB during dynamic tasks",
    tags: ["motor:postural-control", "motor:weight-shifting", "task:balance", "body-part:trunk", "body-part:LE",
           "occupation:mobility", "occupation:functional-activity"]
  },
  
  // ============================================
  // MOTOR COORDINATION IMPAIRMENTS
  // ============================================
  {
    value: "impaired fine motor coordination",
    tags: ["motor:fine-motor", "motor:coordination", "body-part:hand", "body-part:fingers", 
           "occupation:ADL", "task:dressing", "perceptual:visual-motor"]
  },
  {
    value: "impaired gross motor coordination",
    tags: ["motor:gross-motor", "motor:coordination", "body-part:UE", "body-part:LE", 
           "occupation:functional-activity", "task:coordination"]
  },
  {
    value: "impaired motor planning",
    tags: ["motor:motor-planning", "motor:praxis", "cognitive:sequencing", "occupation:ADL", 
           "task:dressing", "task:coordination"]
  },
  {
    value: "decreased motor control",
    tags: ["motor:motor-planning", "motor:coordination", "body-part:UE", "body-part:LE", 
           "occupation:functional-activity"]
  },
  {
    value: "hemiparesis R",
    tags: ["motor:motor-planning", "motor:coordination", "body-part:UE", "body-part:LE", "body-part:unilateral",
           "strength:UE", "strength:LE", "occupation:ADL", "occupation:mobility"]
  },
  {
    value: "hemiparesis L",
    tags: ["motor:motor-planning", "motor:coordination", "body-part:UE", "body-part:LE", "body-part:unilateral",
           "strength:UE", "strength:LE", "occupation:ADL", "occupation:mobility"]
  },
  {
    value: "decreased LUE motor control",
    tags: ["motor:motor-planning", "motor:coordination", "body-part:UE", "body-part:unilateral",
           "occupation:ADL", "task:dressing"]
  },
  {
    value: "decreased RUE motor control",
    tags: ["motor:motor-planning", "motor:coordination", "body-part:UE", "body-part:unilateral",
           "occupation:ADL", "task:dressing"]
  },
  
  // ============================================
  // ROM/FLEXIBILITY IMPAIRMENTS
  // ============================================
  {
    value: "limited UE ROM",
    tags: ["ROM:shoulder", "ROM:elbow", "ROM:wrist", "body-part:UE", 
           "occupation:ADL", "task:dressing", "task:bathing"]
  },
  {
    value: "limited LE ROM",
    tags: ["ROM:hip", "ROM:knee", "ROM:ankle", "body-part:LE",
           "occupation:ADL", "task:dressing", "occupation:mobility"]
  },
  {
    value: "limited trunk mobility",
    tags: ["ROM:trunk", "ROM:lumbar", "body-part:trunk", "body-part:spine",
           "task:balance", "task:dressing", "motor:postural-control"]
  },
  {
    value: "limited hip mobility",
    tags: ["ROM:hip", "body-part:hip", "body-part:LE",
           "task:dressing", "occupation:mobility", "task:transfer"]
  },
  {
    value: "decreased hip flexion ROM",
    tags: ["ROM:hip", "body-part:hip", "body-part:LE",
           "task:dressing", "task:transfer"]
  },
  
  // ============================================
  // POSTURE IMPAIRMENTS
  // ============================================
  {
    value: "forward flexed trunk",
    tags: ["motor:postural-control", "ROM:trunk", "body-part:trunk", "body-part:spine",
           "task:balance", "occupation:mobility"]
  },
  {
    value: "forward rounded shoulders",
    tags: ["motor:postural-control", "ROM:shoulder", "body-part:shoulder", "body-part:trunk",
           "occupation:exercise", "task:strengthening"]
  },
  {
    value: "lateral trunk lean",
    tags: ["motor:postural-control", "body-part:trunk", "task:balance",
           "perceptual:proprioception", "perceptual:spatial-awareness"]
  },
  {
    value: "poor postural control",
    tags: ["motor:postural-control", "body-part:trunk", "body-part:core", "task:balance",
           "occupation:mobility", "occupation:functional-activity"]
  },
  
  // ============================================
  // ENDURANCE IMPAIRMENTS
  // ============================================
  {
    value: "decreased activity tolerance",
    tags: ["strength:endurance", "occupation:exercise", "occupation:functional-activity",
           "task:endurance"]
  },
  {
    value: "decreased endurance",
    tags: ["strength:endurance", "occupation:exercise", "task:endurance", "task:strengthening"]
  },
  {
    value: "decreased cardiopulmonary endurance",
    tags: ["strength:endurance", "occupation:exercise", "task:endurance"]
  },
  {
    value: "fatigue affecting performance",
    tags: ["strength:endurance", "occupation:functional-activity", "occupation:exercise",
           "cognitive:attention"]
  },
  {
    value: "symptoms of COPD",
    tags: ["strength:endurance", "occupation:exercise", "task:endurance"]
  },
  
  // ============================================
  // COGNITIVE IMPAIRMENTS
  // ============================================
  {
    value: "impaired attention to task",
    tags: ["cognitive:attention", "cognitive:task-completion", "occupation:ADL", "occupation:functional-activity"]
  },
  {
    value: "impaired sequencing abilities",
    tags: ["cognitive:sequencing", "cognitive:executive-function", "occupation:ADL", 
           "task:dressing", "task:bathing", "task:grooming", "motor:motor-planning"]
  },
  {
    value: "decreased safety awareness",
    tags: ["cognitive:safety-awareness", "cognitive:judgment", "occupation:mobility",
           "task:balance", "task:transfer"]
  },
  {
    value: "impaired problem-solving",
    tags: ["cognitive:problem-solving", "cognitive:executive-function", "occupation:ADL",
           "occupation:IADL"]
  },
  {
    value: "decreased working memory",
    tags: ["cognitive:memory", "cognitive:working-memory", "cognitive:attention",
           "occupation:ADL", "occupation:IADL"]
  },
  {
    value: "impaired executive function",
    tags: ["cognitive:executive-function", "cognitive:problem-solving", "cognitive:initiation",
           "occupation:ADL", "occupation:IADL"]
  },
  {
    value: "decreased comprehension",
    tags: ["cognitive:attention", "cognitive:memory", "occupation:ADL", "occupation:functional-activity"]
  },
  {
    value: "deficits in thinking processes",
    tags: ["cognitive:executive-function", "cognitive:problem-solving", "cognitive:attention",
           "occupation:ADL", "occupation:IADL"]
  },
  {
    value: "impaired task initiation",
    tags: ["cognitive:initiation", "cognitive:executive-function", "occupation:ADL",
           "occupation:functional-activity"]
  },
  {
    value: "decreased insight into deficits",
    tags: ["cognitive:judgment", "cognitive:safety-awareness", "cognitive:executive-function",
           "occupation:ADL", "occupation:mobility"]
  },
  
  // ============================================
  // PAIN/SENSORY/OTHER IMPAIRMENTS
  // ============================================
  {
    value: "pain limiting movement",
    tags: ["sensory:pain", "ROM:shoulder", "ROM:hip", "ROM:flexibility",
           "occupation:functional-activity", "occupation:exercise"]
  },
  {
    value: "reported pain",
    tags: ["sensory:pain", "occupation:functional-activity", "occupation:exercise"]
  },
  {
    value: "edema affecting function",
    tags: ["body-part:UE", "body-part:LE", "occupation:ADL", "occupation:functional-activity",
           "motor:fine-motor", "ROM:flexibility"]
  },
  {
    value: "decreased proprioception",
    tags: ["perceptual:proprioception", "sensory:proprioception", "task:balance",
           "motor:postural-control", "occupation:mobility"]
  },
  {
    value: "visual-perceptual deficits",
    tags: ["perceptual:visual-motor", "perceptual:spatial-awareness", "perceptual:depth-perception",
           "occupation:ADL", "occupation:mobility", "task:coordination"]
  },
  {
    value: "L-sided neglect",
    tags: ["perceptual:neglect", "perceptual:spatial-awareness", "cognitive:attention",
           "body-part:unilateral", "occupation:ADL", "task:dressing", "occupation:mobility"]
  }
];
