/**
 * Tagged Activities Data
 * Each activity now includes clinical tags for contextual filtering
 */

export interface TaggedActivity {
  value: string;
  tags: string[];
}

export const TAGGED_ACTIVITIES: Record<string, TaggedActivity[]> = {
  
  // ============================================
  // 97530 - THERAPEUTIC ACTIVITIES
  // ============================================
  
  "Dynamic sitting balance tasks": [
    {
      value: "throwing/catching tasks to facilitate trunk control",
      tags: ["occupation:functional-activity", "task:balance", "body-part:trunk", "body-part:UE", "body-part:bilateral", 
             "motor:coordination", "motor:bilateral-integration", "motor:postural-control", "motor:weight-shifting",
             "perceptual:visual-motor", "perceptual:spatial-awareness"]
    },
    {
      value: "anterior weight shifting while seated EOB",
      tags: ["occupation:functional-activity", "task:balance", "body-part:trunk", "body-part:core",
             "motor:weight-shifting", "motor:postural-control", "perceptual:proprioception"]
    },
    {
      value: "lateral weight shifting while seated EOB",
      tags: ["occupation:functional-activity", "task:balance", "body-part:trunk", "body-part:core",
             "motor:weight-shifting", "motor:postural-control", "perceptual:proprioception"]
    },
    {
      value: "reaching outside BOS while seated",
      tags: ["occupation:functional-activity", "task:balance", "body-part:trunk", "body-part:UE",
             "motor:postural-control", "motor:weight-shifting", "ROM:shoulder", "ROM:trunk",
             "perceptual:spatial-awareness", "perceptual:proprioception"]
    },
    {
      value: "ball toss activity from w/c",
      tags: ["occupation:functional-activity", "task:balance", "task:coordination", "body-part:trunk", "body-part:UE", "body-part:bilateral",
             "motor:coordination", "motor:bilateral-integration", "motor:postural-control",
             "perceptual:visual-motor"]
    },
    {
      value: "sequenced number tap activity bilaterally",
      tags: ["occupation:functional-activity", "task:coordination", "body-part:UE", "body-part:bilateral",
             "motor:coordination", "motor:bilateral-integration", "motor:motor-planning",
             "cognitive:sequencing", "cognitive:attention", "perceptual:visual-motor"]
    },
    {
      value: "item retrieval incorporating lateral scooting",
      tags: ["occupation:functional-activity", "task:balance", "body-part:trunk", "body-part:core", "body-part:LE",
             "motor:weight-shifting", "motor:postural-control", "ROM:hip", "ROM:trunk"]
    },
    {
      value: "tabletop activity crossing midline",
      tags: ["occupation:functional-activity", "task:coordination", "body-part:UE", "body-part:trunk",
             "motor:coordination", "motor:bilateral-integration", "ROM:shoulder", "ROM:trunk",
             "perceptual:body-scheme"]
    }
  ],

  "Static sitting balance tasks": [
    {
      value: "sitting unsupported EOB",
      tags: ["occupation:functional-activity", "task:balance", "body-part:trunk", "body-part:core",
             "motor:postural-control", "strength:core", "perceptual:proprioception", "perceptual:vestibular"]
    },
    {
      value: "sitting balance on compliant surface",
      tags: ["occupation:functional-activity", "task:balance", "body-part:trunk", "body-part:core",
             "motor:postural-control", "motor:righting-reactions", "strength:core",
             "perceptual:proprioception", "perceptual:vestibular"]
    },
    {
      value: "maintaining upright posture in w/c",
      tags: ["occupation:functional-activity", "task:balance", "body-part:trunk", "body-part:core",
             "motor:postural-control", "strength:core", "perceptual:proprioception"]
    },
    {
      value: "trunk control with B UE weight bearing",
      tags: ["occupation:functional-activity", "task:balance", "body-part:trunk", "body-part:UE", "body-part:bilateral",
             "motor:postural-control", "motor:weight-bearing", "strength:UE", "strength:core"]
    }
  ],

  "Dynamic standing balance tasks": [
    {
      value: "weight shifting in standing with RW",
      tags: ["occupation:mobility", "task:balance", "body-part:LE", "body-part:trunk", "body-part:bilateral",
             "motor:weight-shifting", "motor:postural-control", "perceptual:proprioception"]
    },
    {
      value: "reaching outside BOS in standing",
      tags: ["occupation:mobility", "task:balance", "body-part:trunk", "body-part:UE", "body-part:LE",
             "motor:postural-control", "motor:weight-shifting", "ROM:shoulder", "ROM:hip",
             "perceptual:spatial-awareness", "perceptual:proprioception"]
    },
    {
      value: "ball toss/catch in standing",
      tags: ["occupation:functional-activity", "task:balance", "task:coordination", "body-part:UE", "body-part:LE", "body-part:bilateral",
             "motor:coordination", "motor:postural-control", "motor:bilateral-integration",
             "perceptual:visual-motor"]
    },
    {
      value: "stepping over obstacles",
      tags: ["occupation:mobility", "task:balance", "body-part:LE", "body-part:bilateral",
             "motor:motor-planning", "motor:weight-shifting", "ROM:hip", "ROM:knee",
             "perceptual:spatial-awareness", "perceptual:depth-perception", "cognitive:safety-awareness"]
    },
    {
      value: "tandem stance activities",
      tags: ["occupation:mobility", "task:balance", "body-part:LE", "body-part:trunk",
             "motor:postural-control", "strength:LE", "perceptual:proprioception", "perceptual:vestibular"]
    },
    {
      value: "single leg stance",
      tags: ["occupation:mobility", "task:balance", "body-part:LE", "body-part:unilateral",
             "motor:postural-control", "motor:weight-bearing", "strength:LE",
             "perceptual:proprioception", "perceptual:vestibular"]
    },
    {
      value: "turning and pivoting",
      tags: ["occupation:mobility", "task:balance", "body-part:LE", "body-part:trunk", "body-part:bilateral",
             "motor:weight-shifting", "motor:postural-control", "perceptual:vestibular", "perceptual:spatial-awareness"]
    },
    {
      value: "backward diagonal stepping with trunk rotation",
      tags: ["occupation:mobility", "task:balance", "task:coordination", "body-part:LE", "body-part:trunk", "body-part:bilateral",
             "motor:motor-planning", "motor:weight-shifting", "motor:postural-control",
             "ROM:trunk", "ROM:hip", "perceptual:spatial-awareness"]
    },
    {
      value: "item retrieval in standing with RW",
      tags: ["occupation:mobility", "task:balance", "body-part:trunk", "body-part:UE", "body-part:LE",
             "motor:postural-control", "motor:weight-shifting", "ROM:shoulder", "ROM:hip"]
    }
  ],

  "Fine motor coordination training": [
    {
      value: "pegboard activities",
      tags: ["occupation:functional-activity", "task:coordination", "body-part:hand", "body-part:fingers", "body-part:UE", "body-part:unilateral",
             "motor:fine-motor", "motor:coordination", "motor:pinch", "motor:release",
             "perceptual:visual-motor", "cognitive:attention"]
    },
    {
      value: "knot untying/tying from theraband",
      tags: ["occupation:functional-activity", "task:coordination", "body-part:hand", "body-part:fingers", "body-part:bilateral",
             "motor:fine-motor", "motor:coordination", "motor:in-hand-manipulation", "motor:bilateral-integration",
             "perceptual:visual-motor", "cognitive:sequencing", "cognitive:problem-solving"]
    },
    {
      value: "clothespin retrieval/placement",
      tags: ["occupation:functional-activity", "task:coordination", "body-part:hand", "body-part:fingers",
             "motor:fine-motor", "motor:pinch", "motor:release", "motor:coordination",
             "strength:pinch", "strength:grip"]
    },
    {
      value: "cracking plastic eggs with pegs inside",
      tags: ["occupation:functional-activity", "task:coordination", "body-part:hand", "body-part:fingers", "body-part:bilateral",
             "motor:fine-motor", "motor:bilateral-integration", "motor:in-hand-manipulation",
             "strength:grip", "strength:pinch"]
    },
    {
      value: "bead stringing tasks",
      tags: ["occupation:functional-activity", "task:coordination", "body-part:hand", "body-part:fingers", "body-part:bilateral",
             "motor:fine-motor", "motor:coordination", "motor:bilateral-integration", "motor:pinch",
             "perceptual:visual-motor", "cognitive:attention"]
    },
    {
      value: "coin manipulation",
      tags: ["occupation:functional-activity", "task:coordination", "body-part:hand", "body-part:fingers",
             "motor:fine-motor", "motor:in-hand-manipulation", "motor:coordination",
             "perceptual:tactile", "sensory:tactile"]
    },
    {
      value: "theraputty manipulation",
      tags: ["occupation:functional-activity", "task:strengthening", "body-part:hand", "body-part:fingers",
             "motor:fine-motor", "motor:in-hand-manipulation", "strength:grip", "strength:pinch",
             "ROM:wrist", "ROM:fingers", "sensory:tactile"]
    },
    {
      value: "grasp and release tasks",
      tags: ["occupation:functional-activity", "task:coordination", "body-part:hand", "body-part:fingers",
             "motor:fine-motor", "motor:grasp", "motor:release", "motor:motor-planning",
             "strength:grip"]
    }
  ],

  // ============================================
  // 97535 - SELF-CARE/HOME MANAGEMENT
  // ============================================
  
  "UB dressing training": [
    {
      value: "donning/doffing pullover shirt",
      tags: ["occupation:ADL", "occupation:BADL", "task:dressing", "body-part:UE", "body-part:bilateral",
             "motor:coordination", "motor:motor-planning", "motor:bilateral-integration",
             "cognitive:sequencing", "cognitive:attention", "perceptual:body-scheme",
             "ROM:shoulder", "ROM:elbow"]
    },
    {
      value: "donning/doffing button-front shirt",
      tags: ["occupation:ADL", "occupation:BADL", "task:dressing", "body-part:UE", "body-part:hand", "body-part:fingers", "body-part:bilateral",
             "motor:coordination", "motor:motor-planning", "motor:fine-motor", "motor:bilateral-integration",
             "cognitive:sequencing", "cognitive:attention", "perceptual:body-scheme", "perceptual:visual-motor",
             "ROM:shoulder"]
    },
    {
      value: "donning/doffing bra using one-handed technique",
      tags: ["occupation:ADL", "occupation:BADL", "task:dressing", "body-part:UE", "body-part:unilateral",
             "motor:coordination", "motor:motor-planning", "motor:fine-motor",
             "cognitive:sequencing", "cognitive:problem-solving", "perceptual:body-scheme",
             "ROM:shoulder"]
    },
    {
      value: "managing fasteners",
      tags: ["occupation:ADL", "task:dressing", "body-part:hand", "body-part:fingers", "body-part:bilateral",
             "motor:fine-motor", "motor:coordination", "motor:pinch", "motor:in-hand-manipulation",
             "perceptual:visual-motor", "cognitive:attention", "strength:pinch"]
    },
    {
      value: "one-handed dressing techniques",
      tags: ["occupation:ADL", "task:dressing", "body-part:UE", "body-part:unilateral",
             "motor:coordination", "motor:motor-planning", "cognitive:sequencing",
             "cognitive:problem-solving", "perceptual:body-scheme"]
    }
  ],

  "LB dressing training": [
    {
      value: "donning/doffing pants",
      tags: ["occupation:ADL", "occupation:BADL", "task:dressing", "body-part:LE", "body-part:UE", "body-part:bilateral",
             "motor:coordination", "motor:motor-planning", "cognitive:sequencing",
             "ROM:hip", "ROM:knee", "ROM:trunk", "perceptual:body-scheme"]
    },
    {
      value: "donning/doffing socks",
      tags: ["occupation:ADL", "occupation:BADL", "task:dressing", "body-part:LE", "body-part:UE",
             "motor:coordination", "motor:motor-planning", "ROM:hip", "ROM:knee", "ROM:lumbar",
             "perceptual:body-scheme", "cognitive:sequencing"]
    },
    {
      value: "donning/doffing shoes",
      tags: ["occupation:ADL", "occupation:BADL", "task:dressing", "body-part:LE", "body-part:UE",
             "motor:coordination", "motor:fine-motor", "ROM:hip", "ROM:lumbar",
             "perceptual:body-scheme", "cognitive:sequencing"]
    },
    {
      value: "cross leg technique for LB dressing",
      tags: ["occupation:ADL", "task:dressing", "body-part:LE", "body-part:UE",
             "motor:motor-planning", "ROM:hip", "ROM:lumbar", "cognitive:sequencing",
             "cognitive:problem-solving", "perceptual:body-scheme"]
    }
  ],

  // ============================================
  // 97110 - THERAPEUTIC EXERCISE
  // ============================================
  
  "BUE strengthening exercises": [
    {
      value: "shoulder flexion/extension",
      tags: ["occupation:exercise", "task:strengthening", "body-part:UE", "body-part:shoulder", "body-part:bilateral",
             "strength:shoulder", "strength:UE", "ROM:shoulder", "motor:motor-planning"]
    },
    {
      value: "shoulder abduction/adduction",
      tags: ["occupation:exercise", "task:strengthening", "body-part:UE", "body-part:shoulder", "body-part:bilateral",
             "strength:shoulder", "strength:UE", "ROM:shoulder"]
    },
    {
      value: "elbow flexion/extension",
      tags: ["occupation:exercise", "task:strengthening", "body-part:UE", "body-part:elbow", "body-part:bilateral",
             "strength:UE", "ROM:elbow"]
    },
    {
      value: "bicep curls with weights",
      tags: ["occupation:exercise", "task:strengthening", "body-part:UE", "body-part:elbow",
             "strength:UE", "strength:muscle-activation", "motor:motor-planning"]
    },
    {
      value: "theraband pulls",
      tags: ["occupation:exercise", "task:strengthening", "body-part:UE", "body-part:bilateral",
             "strength:UE", "strength:shoulder", "motor:bilateral-integration"]
    }
  ],

  "BLE strengthening exercises": [
    {
      value: "hip flexion exercises",
      tags: ["occupation:exercise", "task:strengthening", "body-part:LE", "body-part:hip",
             "strength:LE", "strength:hip", "ROM:hip"]
    },
    {
      value: "hip abduction exercises",
      tags: ["occupation:exercise", "task:strengthening", "body-part:LE", "body-part:hip",
             "strength:LE", "strength:hip", "ROM:hip"]
    },
    {
      value: "knee extension exercises",
      tags: ["occupation:exercise", "task:strengthening", "body-part:LE", "body-part:knee",
             "strength:LE", "strength:knee", "ROM:knee"]
    },
    {
      value: "ankle DF/PF exercises",
      tags: ["occupation:exercise", "task:strengthening", "body-part:LE", "body-part:ankle",
             "strength:LE", "strength:ankle", "ROM:ankle"]
    },
    {
      value: "theraband exercises for BLE",
      tags: ["occupation:exercise", "task:strengthening", "body-part:LE", "body-part:bilateral",
             "strength:LE", "motor:bilateral-integration"]
    }
  ],

  "Core stabilization exercises": [
    {
      value: "abdominal bracing",
      tags: ["occupation:exercise", "task:strengthening", "body-part:core", "body-part:trunk",
             "strength:core", "motor:postural-control", "motor:motor-planning"]
    },
    {
      value: "pelvic tilts",
      tags: ["occupation:exercise", "task:strengthening", "body-part:core", "body-part:pelvis", "body-part:trunk",
             "strength:core", "ROM:lumbar", "motor:motor-planning"]
    },
    {
      value: "bridging exercises",
      tags: ["occupation:exercise", "task:strengthening", "body-part:core", "body-part:LE", "body-part:trunk",
             "strength:core", "strength:LE", "motor:postural-control"]
    },
    {
      value: "seated trunk rotation",
      tags: ["occupation:exercise", "task:strengthening", "task:coordination", "body-part:trunk", "body-part:core",
             "strength:core", "ROM:trunk", "ROM:lumbar", "motor:motor-planning"]
    }
  ],

  // ============================================
  // 97112 - NEUROMUSCULAR RE-EDUCATION
  // ============================================
  
  "Balance retraining": [
    {
      value: "weight shifting anterior/posterior",
      tags: ["occupation:functional-activity", "task:balance", "body-part:trunk", "body-part:LE",
             "motor:weight-shifting", "motor:postural-control", "perceptual:proprioception", "perceptual:vestibular"]
    },
    {
      value: "weight shifting lateral",
      tags: ["occupation:functional-activity", "task:balance", "body-part:trunk", "body-part:LE",
             "motor:weight-shifting", "motor:postural-control", "perceptual:proprioception", "perceptual:vestibular"]
    },
    {
      value: "perturbation training",
      tags: ["occupation:functional-activity", "task:balance", "body-part:trunk", "body-part:LE",
             "motor:postural-control", "motor:righting-reactions", "motor:protective-reactions",
             "perceptual:proprioception", "perceptual:vestibular"]
    },
    {
      value: "foam surface activities",
      tags: ["occupation:functional-activity", "task:balance", "body-part:trunk", "body-part:LE",
             "motor:postural-control", "motor:righting-reactions", "perceptual:proprioception",
             "perceptual:vestibular", "sensory:proprioception"]
    },
    {
      value: "righting reactions training",
      tags: ["occupation:functional-activity", "task:balance", "body-part:trunk", "body-part:LE",
             "motor:postural-control", "motor:righting-reactions", "motor:protective-reactions",
             "perceptual:vestibular", "perceptual:proprioception"]
    }
  ],

  "Motor control training": [
    {
      value: "isolated movement training",
      tags: ["occupation:functional-activity", "task:coordination", "body-part:UE",
             "motor:motor-planning", "motor:coordination", "motor:praxis",
             "perceptual:proprioception", "cognitive:attention"]
    },
    {
      value: "selective motor control techniques",
      tags: ["occupation:functional-activity", "task:coordination", "body-part:UE",
             "motor:motor-planning", "motor:coordination", "perceptual:proprioception",
             "cognitive:attention"]
    },
    {
      value: "tapping/vibration to facilitate motor return",
      tags: ["occupation:functional-activity", "task:coordination", "body-part:UE",
             "motor:motor-planning", "motor:coordination", "strength:muscle-activation",
             "sensory:tactile", "sensory:proprioception"]
    },
    {
      value: "weight bearing to normalize tone",
      tags: ["occupation:functional-activity", "task:balance", "body-part:UE",
             "motor:weight-bearing", "motor:postural-control", "strength:muscle-activation",
             "sensory:proprioception"]
    }
  ]
};
