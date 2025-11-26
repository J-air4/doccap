/**
 * Tagged Cueing Purposes
 * Each cueing purpose tagged with clinical domains for contextual filtering
 */

export interface TaggedCueingPurpose {
  value: string;
  tags: string[];
}

export const TAGGED_CUEING_PURPOSES: TaggedCueingPurpose[] = [
  // ============================================
  // FOR + SPECIFIC PURPOSE
  // ============================================
  {
    value: "for sequencing",
    tags: ["cognitive:sequencing", "occupation:ADL", "task:dressing", "task:bathing", "task:grooming", "motor:motor-planning"]
  },
  {
    value: "for safety awareness",
    tags: ["cognitive:safety-awareness", "cognitive:judgment", "occupation:mobility", "task:transfer", "task:balance"]
  },
  {
    value: "for attention to task",
    tags: ["cognitive:attention", "cognitive:task-completion", "occupation:ADL", "occupation:exercise"]
  },
  {
    value: "for task initiation",
    tags: ["cognitive:initiation", "cognitive:executive-function", "occupation:ADL"]
  },
  {
    value: "for pacing",
    tags: ["cognitive:attention", "strength:endurance", "occupation:exercise", "task:strengthening"]
  },
  {
    value: "for proper body mechanics",
    tags: ["motor:postural-control", "occupation:exercise", "task:strengthening", "task:transfer", "body-part:trunk", "body-part:core"]
  },
  {
    value: "for postural alignment",
    tags: ["motor:postural-control", "body-part:trunk", "body-part:core", "task:balance", "occupation:mobility"]
  },
  {
    value: "for weight shifting",
    tags: ["motor:weight-shifting", "motor:postural-control", "task:balance", "body-part:trunk", "body-part:LE"]
  },
  {
    value: "for motor planning",
    tags: ["motor:motor-planning", "motor:praxis", "occupation:ADL", "task:dressing", "task:coordination"]
  },
  {
    value: "for technique",
    tags: ["motor:motor-planning", "occupation:exercise", "task:strengthening"]
  },
  {
    value: "for balance",
    tags: ["motor:postural-control", "motor:weight-shifting", "task:balance", "body-part:trunk", "body-part:LE", 
           "perceptual:proprioception", "perceptual:vestibular"]
  },
  {
    value: "for breathing/avoid Valsalva",
    tags: ["occupation:exercise", "task:strengthening", "strength:endurance", "cognitive:safety-awareness"]
  },
  {
    value: "for hand/foot placement",
    tags: ["motor:motor-planning", "perceptual:spatial-awareness", "perceptual:body-scheme", "task:transfer", "task:balance"]
  },
  {
    value: "for correct alignment",
    tags: ["motor:postural-control", "body-part:trunk", "body-part:core", "occupation:exercise", "task:strengthening"]
  },
  {
    value: "for correct body mechanics",
    tags: ["motor:postural-control", "body-part:trunk", "occupation:exercise", "task:strengthening", "task:transfer"]
  },
  {
    value: "for correct hand placement",
    tags: ["motor:motor-planning", "body-part:hand", "perceptual:spatial-awareness", "motor:fine-motor"]
  },
  {
    value: "for correct foot placement",
    tags: ["motor:motor-planning", "body-part:foot", "perceptual:spatial-awareness", "task:balance", "task:transfer"]
  },
  {
    value: "for core stability",
    tags: ["strength:core", "motor:postural-control", "body-part:core", "body-part:trunk", "task:balance"]
  },
  {
    value: "for glute activation",
    tags: ["strength:LE", "strength:hip", "body-part:hip", "body-part:LE", "strength:muscle-activation", "occupation:exercise"]
  },
  {
    value: "for facilitation of quads",
    tags: ["strength:LE", "strength:knee", "body-part:knee", "body-part:LE", "strength:muscle-activation", "occupation:exercise"]
  },
  {
    value: "for increased hip flexion",
    tags: ["ROM:hip", "body-part:hip", "body-part:LE", "task:dressing", "task:transfer"]
  },
  {
    value: "for increased trunk flexion",
    tags: ["ROM:trunk", "ROM:lumbar", "body-part:trunk", "task:dressing", "task:transfer"]
  },
  
  // ============================================
  // TO FACILITATE
  // ============================================
  {
    value: "to facilitate motor control",
    tags: ["motor:motor-planning", "motor:coordination", "occupation:exercise", "occupation:functional-activity"]
  },
  {
    value: "to facilitate activation",
    tags: ["strength:muscle-activation", "motor:motor-planning", "occupation:exercise", "task:strengthening"]
  },
  {
    value: "to facilitate muscle activation",
    tags: ["strength:muscle-activation", "strength:UE", "strength:LE", "occupation:exercise", "task:strengthening"]
  },
  {
    value: "to facilitate upright posture",
    tags: ["motor:postural-control", "body-part:trunk", "body-part:core", "task:balance", "occupation:mobility"]
  },
  {
    value: "to facilitate righting reactions",
    tags: ["motor:righting-reactions", "motor:postural-control", "task:balance", "perceptual:vestibular"]
  },
  {
    value: "to facilitate muscle engagement",
    tags: ["strength:muscle-activation", "strength:UE", "strength:LE", "occupation:exercise"]
  },
  {
    value: "to facilitate muscle contraction",
    tags: ["strength:muscle-activation", "occupation:exercise", "task:strengthening"]
  },
  {
    value: "to facilitate correct hip muscle activation",
    tags: ["strength:hip", "strength:LE", "body-part:hip", "strength:muscle-activation", "occupation:exercise"]
  },
  {
    value: "to facilitate recovery from balance loss",
    tags: ["motor:protective-reactions", "motor:righting-reactions", "task:balance", "cognitive:safety-awareness"]
  },
  {
    value: "to facilitate proper weight bearing",
    tags: ["motor:weight-bearing", "motor:postural-control", "task:balance", "body-part:LE", "perceptual:proprioception"]
  },
  {
    value: "to facilitate twisting and rotation",
    tags: ["ROM:trunk", "motor:motor-planning", "body-part:trunk", "task:coordination"]
  },
  {
    value: "to facilitate motor return",
    tags: ["motor:motor-planning", "motor:coordination", "strength:muscle-activation", "sensory:proprioception"]
  },
  
  // ============================================
  // TO IMPROVE
  // ============================================
  {
    value: "to improve task performance",
    tags: ["cognitive:attention", "motor:motor-planning", "occupation:ADL", "occupation:functional-activity"]
  },
  {
    value: "to improve posture",
    tags: ["motor:postural-control", "body-part:trunk", "body-part:core", "occupation:mobility"]
  },
  {
    value: "to improve balance",
    tags: ["motor:postural-control", "motor:weight-shifting", "task:balance", "perceptual:proprioception"]
  },
  {
    value: "to improve dynamic balance",
    tags: ["motor:postural-control", "motor:weight-shifting", "task:balance", "body-part:trunk", "body-part:LE"]
  },
  {
    value: "to improve focus",
    tags: ["cognitive:attention", "cognitive:task-completion", "occupation:ADL", "occupation:exercise"]
  },
  {
    value: "to improve in-hand manipulation",
    tags: ["motor:in-hand-manipulation", "motor:fine-motor", "body-part:hand", "body-part:fingers"]
  },
  {
    value: "to improve safety",
    tags: ["cognitive:safety-awareness", "cognitive:judgment", "task:transfer", "task:balance"]
  },
  {
    value: "to improve control",
    tags: ["motor:motor-planning", "motor:coordination", "motor:postural-control"]
  },
  
  // ============================================
  // TO INCREASE
  // ============================================
  {
    value: "to increase circulation and relieve stiffness",
    tags: ["ROM:shoulder", "ROM:hip", "ROM:flexibility", "occupation:exercise", "sensory:pain"]
  },
  {
    value: "to increase joint mobility",
    tags: ["ROM:shoulder", "ROM:hip", "ROM:knee", "ROM:ankle", "occupation:exercise", "task:stretching"]
  },
  {
    value: "to increase flexion",
    tags: ["ROM:shoulder", "ROM:hip", "ROM:knee", "body-part:UE", "body-part:LE"]
  },
  {
    value: "to increase steadiness",
    tags: ["motor:postural-control", "task:balance", "perceptual:proprioception"]
  },
  {
    value: "to increase independence",
    tags: ["occupation:ADL", "occupation:BADL", "cognitive:task-completion"]
  },
  {
    value: "to increase strength and coordination",
    tags: ["strength:UE", "strength:LE", "motor:coordination", "occupation:exercise"]
  },
  {
    value: "to increase proprioceptive awareness",
    tags: ["perceptual:proprioception", "sensory:proprioception", "task:balance", "motor:postural-control"]
  },
  {
    value: "to increase muscle engagement",
    tags: ["strength:muscle-activation", "strength:UE", "strength:LE", "occupation:exercise"]
  },
  {
    value: "to increase weight bearing",
    tags: ["motor:weight-bearing", "motor:postural-control", "body-part:LE", "task:balance"]
  },
  {
    value: "to increase force through LE's",
    tags: ["strength:LE", "body-part:LE", "motor:weight-bearing", "occupation:exercise"]
  },
  {
    value: "to increase knee flexion",
    tags: ["ROM:knee", "body-part:knee", "body-part:LE", "task:dressing"]
  },
  
  // ============================================
  // TO DECREASE
  // ============================================
  {
    value: "to decrease fall risk",
    tags: ["task:balance", "cognitive:safety-awareness", "motor:postural-control", "occupation:mobility"]
  },
  {
    value: "to decrease freezing",
    tags: ["motor:motor-planning", "motor:initiation", "occupation:mobility", "cognitive:initiation"]
  },
  {
    value: "to decrease pain",
    tags: ["sensory:pain", "ROM:flexibility", "occupation:exercise"]
  },
  {
    value: "to decrease speed",
    tags: ["cognitive:attention", "motor:motor-planning", "cognitive:safety-awareness", "task:transfer"]
  },
  {
    value: "to decrease muscle fatigue",
    tags: ["strength:endurance", "occupation:exercise", "task:strengthening"]
  },
  {
    value: "to decrease hip hiking",
    tags: ["motor:postural-control", "body-part:hip", "body-part:LE", "occupation:mobility"]
  },
  
  // ============================================
  // TO MAINTAIN/KEEP
  // ============================================
  {
    value: "to maintain upright posture",
    tags: ["motor:postural-control", "body-part:trunk", "body-part:core", "task:balance"]
  },
  {
    value: "to maintain straight alignment",
    tags: ["motor:postural-control", "body-part:trunk", "body-part:spine", "occupation:exercise", "task:strengthening"]
  },
  {
    value: "to keep core engaged",
    tags: ["strength:core", "motor:postural-control", "body-part:core", "body-part:trunk", "occupation:exercise"]
  },
  {
    value: "to keep pelvis in neutral",
    tags: ["motor:postural-control", "body-part:pelvis", "body-part:core", "occupation:exercise"]
  },
  {
    value: "to keep back straight",
    tags: ["motor:postural-control", "body-part:trunk", "body-part:spine", "occupation:exercise", "task:transfer"]
  },
  {
    value: "to keep feet facing forward",
    tags: ["motor:motor-planning", "body-part:foot", "body-part:ankle", "task:balance", "task:transfer"]
  },
  
  // ============================================
  // TO PROMOTE
  // ============================================
  {
    value: "to promote functional sitting balance",
    tags: ["task:balance", "body-part:trunk", "motor:postural-control", "occupation:functional-activity"]
  },
  {
    value: "to promote pinch",
    tags: ["motor:pinch", "motor:fine-motor", "body-part:hand", "body-part:fingers", "strength:pinch"]
  },
  {
    value: "to promote pincer grasp",
    tags: ["motor:pinch", "motor:fine-motor", "body-part:hand", "body-part:fingers", "motor:grasp"]
  },
  {
    value: "to promote grip and pinch strength",
    tags: ["strength:grip", "strength:pinch", "body-part:hand", "motor:grasp", "motor:pinch"]
  },
  {
    value: "to promote precision and coordination",
    tags: ["motor:coordination", "motor:fine-motor", "body-part:hand", "perceptual:visual-motor"]
  }
];
