import React, { useState, useEffect, useReducer, useRef } from 'react';
import { Save, Plus, Trash2, Copy, Clock, Activity, FileText, ChevronDown, ChevronRight, Edit2, Copy as CopyIcon, Lightbulb, Check, Search, X, Zap, RotateCcw } from 'lucide-react';

// CONTEXTUAL FILTERING IMPORTS
import { TAGGED_ACTIVITIES } from './taggedActivities';
import { TAGGED_CUEING_PURPOSES } from './taggedCueingPurposes';
import { TAGGED_IMPAIRMENTS } from './taggedImpairments';
import { TAGGED_GOALS } from './taggedGoals';
import { calculateRelevanceScore, filterByRelevance } from './tagLibrary';

/**
 * Clinical Narrative Builder v4.0 - REDESIGNED UI
 *
 * NEW IN v4.0:
 * - Chip/pill selectors instead of dropdowns
 * - Quick templates for common interventions
 * - Step-by-step wizard flow
 * - Searchable comboboxes
 * - Progressive disclosure
 * - Modern, clean interface
 */

interface Intervention {
  id: string;
  cptCode: string;
  category: string;
  activities: string[];
  parameters: string;
  goal: string;
  assistanceLevel: string;
  cueingTypes: string[];
  cueingPurpose: string;
  cueingLocation: string;
  impairment: string;
  patientResponse: string;
  progression?: string;
  progressionRationale?: string;
  compensation?: string;
  clinicalObservation?: string;
  modification?: string;
  painLevel?: number;
}

interface Session {
  sessionId: string;
  sessionDate: string;
  totalDuration: number;
  interventions: Intervention[];
  plan: string[];
  narrative: string;
}

interface SessionState {
  sessionId: string;
  sessionDate: string;
  totalDuration: number;
  interventions: Intervention[];
  plan: string[];
  narrative: string;
  editingInterventionId: string | null;
}

type SessionAction =
  | { type: 'ADD_INTERVENTION'; payload: Intervention }
  | { type: 'UPDATE_INTERVENTION'; payload: Intervention }
  | { type: 'DELETE_INTERVENTION'; payload: { id: string } }
  | { type: 'DUPLICATE_INTERVENTION'; payload: { id: string } }
  | { type: 'REORDER_INTERVENTIONS'; payload: { startIndex: number; endIndex: number } }
  | { type: 'SET_EDITING_ID'; payload: { id: string | null } }
  | { type: 'TOGGLE_PLAN_ITEM'; payload: { value: string } }
  | { type: 'UPDATE_SESSION_INFO'; payload: { field: 'sessionDate' | 'totalDuration'; value: string | number } }
  | { type: 'UPDATE_NARRATIVE'; payload: { narrative: string } }
  | { type: 'LOAD_SESSION'; payload: Session }
  | { type: 'CLEAR_SESSION' };

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'ADD_INTERVENTION':
      return { ...state, interventions: [...state.interventions, action.payload] };
    case 'UPDATE_INTERVENTION':
      return { ...state, interventions: state.interventions.map(int => int.id === action.payload.id ? action.payload : int), editingInterventionId: null };
    case 'DELETE_INTERVENTION':
      return { ...state, interventions: state.interventions.filter(int => int.id !== action.payload.id) };
    case 'DUPLICATE_INTERVENTION': {
      const intToDuplicate = state.interventions.find(int => int.id === action.payload.id);
      if (!intToDuplicate) return state;
      const duplicated: Intervention = { ...intToDuplicate, id: `int_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` };
      return { ...state, interventions: [...state.interventions, duplicated] };
    }
    case 'SET_EDITING_ID':
      return { ...state, editingInterventionId: action.payload.id };
    case 'TOGGLE_PLAN_ITEM': {
      const { value } = action.payload;
      const newPlan = state.plan.includes(value) ? state.plan.filter(p => p !== value) : [...state.plan, value];
      return { ...state, plan: newPlan };
    }
    case 'UPDATE_SESSION_INFO':
      return { ...state, [action.payload.field]: action.payload.value };
    case 'UPDATE_NARRATIVE':
      return { ...state, narrative: action.payload.narrative };
    case 'LOAD_SESSION':
      return { ...action.payload, editingInterventionId: null };
    case 'CLEAR_SESSION':
      return { sessionId: `session_${Date.now()}`, sessionDate: new Date().toISOString().split('T')[0], totalDuration: 45, interventions: [], plan: [], narrative: '', editingInterventionId: null };
    default:
      return state;
  }
}

function createInitialState(): SessionState {
  return { sessionId: `session_${Date.now()}`, sessionDate: new Date().toISOString().split('T')[0], totalDuration: 45, interventions: [], plan: [], narrative: '', editingInterventionId: null };
}

// ============================================
// CHIP SELECTOR COMPONENT
// ============================================
interface ChipSelectorProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  columns?: number;
  maxHeight?: string;
}

function ChipSelector({ options, selected, onChange, columns = 2, maxHeight = "200px" }: ChipSelectorProps) {
  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className={`grid gap-1.5 overflow-y-auto pr-1`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, maxHeight }}>
      {options.map((opt, i) => {
        const isSelected = selected.includes(opt);
        return (
          <button
            key={i}
            type="button"
            onClick={() => toggle(opt)}
            className={`px-2 py-1.5 text-xs rounded-full border transition-all text-left truncate
              ${isSelected
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:bg-blue-50'
              }`}
            title={opt}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ============================================
// SEARCHABLE SELECT COMPONENT
// ============================================
interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label?: string }[];
  placeholder?: string;
  className?: string;
}

function SearchableSelect({ value, onChange, options, placeholder = "Search...", className = "" }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = search
    ? options.filter(o => (o.label || o.value).toLowerCase().includes(search.toLowerCase()))
    : options;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearch('');
  };

  const displayValue = options.find(o => o.value === value)?.label || value || placeholder;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 py-2 text-sm text-left bg-white border rounded-lg flex items-center justify-between
          ${isOpen ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-300 hover:border-slate-400'}
          ${value ? 'text-slate-900' : 'text-slate-400'}`}
      >
        <span className="truncate">{displayValue}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-xl">
          <div className="p-2 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.slice(0, 50).map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full px-3 py-2 text-sm text-left hover:bg-blue-50 flex items-center justify-between
                    ${opt.value === value ? 'bg-blue-100 text-blue-900' : 'text-slate-700'}`}
                >
                  <span>{opt.label || opt.value}</span>
                  {opt.value === value && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-sm text-slate-500 text-center">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// QUICK PICK BUTTONS
// ============================================
interface QuickPickProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  columns?: number;
}

function QuickPick({ options, value, onChange, columns = 4 }: QuickPickProps) {
  return (
    <div className={`grid gap-1`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {options.map((opt, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(opt === value ? '' : opt)}
          className={`px-2 py-1.5 text-xs rounded border transition-all
            ${opt === value
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
            }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ============================================
// CLINICAL DATA
// ============================================
const CLINICAL_DATA = {
  CPT_CODES: [
    { code: "97530", desc: "Therapeutic Activities", icon: "🎯" },
    { code: "97535", desc: "Self-Care/Home Mgmt", icon: "🏠" },
    { code: "97110", desc: "Therapeutic Exercise", icon: "💪" },
    { code: "97112", desc: "Neuromuscular Re-ed", icon: "🧠" }
  ],

  CATEGORIES: {
    "97530": [
      "Dynamic sitting balance tasks", "Static sitting balance tasks", "Dynamic standing balance tasks",
      "Static standing balance tasks", "Functional transfer training", "Sit-to-stand transfer training",
      "Bed mobility training", "W/c mobility training", "Bilateral coordination tasks",
      "Fine motor coordination training", "Gross motor coordination training", "Visual-motor integration tasks",
      "Cognitive-motor dual tasks", "Functional strengthening activities", "Functional reaching activities",
      "Safety awareness training", "Energy conservation training", "Body mechanics training"
    ],
    "97535": [
      "UB dressing training", "LB dressing training", "Bathing/showering training",
      "Grooming/hygiene training", "Self-feeding training", "Toileting training",
      "Medication management training", "Meal preparation training", "Light housekeeping tasks",
      "Laundry tasks", "Home management training", "Functional mobility for ADLs",
      "Bathroom navigation training", "Community reintegration"
    ],
    "97110": [
      "BUE strengthening exercises", "RUE strengthening exercises", "LUE strengthening exercises",
      "BUE theraband exercises", "BUE AROM exercises", "BUE AAROM exercises",
      "BLE strengthening exercises", "RLE strengthening exercises", "LLE strengthening exercises",
      "Core stabilization exercises", "Trunk stabilization exercises", "Postural alignment exercises",
      "ROM exercises", "Gentle stretching exercises", "Endurance/activity tolerance training"
    ],
    "97112": [
      "Balance retraining", "Postural control training", "Weight shifting training",
      "Righting reactions training", "Motor control training", "Motor planning activities",
      "Coordination training", "Proprioceptive training", "Trunk control training",
      "Trunk mobilization activities", "Selective motor control techniques", "Sensory processing training"
    ]
  },

  ACTIVITIES: {
    "Dynamic sitting balance tasks": [
      "throwing/catching tasks", "anterior weight shifting EOB", "lateral weight shifting EOB",
      "reaching outside BOS seated", "ball toss from w/c", "sequenced number tap bilaterally",
      "item retrieval with lateral scooting", "tabletop activity crossing midline"
    ],
    "Fine motor coordination training": [
      "pegboard activities", "clothespin retrieval/placement", "cracking plastic eggs with pegs",
      "bead stringing", "coin manipulation", "card turning", "theraputty manipulation"
    ],
    "UB dressing training": [
      "donning/doffing pullover shirt", "donning/doffing button-front shirt", "managing fasteners",
      "one-handed dressing techniques", "UE threading with theraband loop"
    ],
    "LB dressing training": [
      "donning/doffing pants", "donning/doffing socks", "donning/doffing shoes",
      "using long-handled shoe horn", "using sock aid", "cross leg technique"
    ],
    "Functional transfer training": [
      "w/c to bed SPT", "bed to w/c SPT", "w/c to toilet SPT", "scooting pivot transfers"
    ],
    "BUE strengthening exercises": [
      "shoulder flexion/extension", "shoulder abduction/adduction", "elbow flexion/extension",
      "bicep curls with weights", "theraband pulls", "scapular retraction/protraction"
    ]
  },

  QUICK_PARAMETERS: ["x5 trials", "x10 trials", "2x10 reps", "3x10 reps", "for 5 min", "for 10 min", "bilaterally"],

  PARAMETERS: [
    "x3 trials", "x5 trials", "x6 trials", "x10 trials", "6/6 trials", "10/10 trials",
    "2x6 reps", "2x8 reps", "2x10 reps", "2x12 reps", "3x10 reps", "3x15 reps",
    "for 5 minutes", "for 8 minutes", "for 10 minutes", "for 15 minutes",
    "8/8 items", "10/10 items", "bilaterally", "with 1 rest break", "with 2 rest breaks"
  ],

  ASSISTANCE_LEVELS: [
    { name: "Independent", abbrev: "I", color: "green" },
    { name: "Modified Independent", abbrev: "Mod I", color: "green" },
    { name: "Supervision/SBA", abbrev: "SBA", color: "yellow" },
    { name: "Contact Guard Assist", abbrev: "CGA", color: "yellow" },
    { name: "Minimal Assistance", abbrev: "Min A", color: "orange" },
    { name: "Moderate Assistance", abbrev: "Mod A", color: "orange" },
    { name: "Maximal Assistance", abbrev: "Max A", color: "red" },
    { name: "Dependent", abbrev: "Dep", color: "red" }
  ],

  CUEING_TYPES: [
    "min verbal cues", "mod verbal cues", "max verbal cues", "tactile cues",
    "physical guidance", "demonstrations", "visual cues", "repeated instructions"
  ],

  CUEING_LOCATIONS: [
    "at trunk", "at hips", "at pelvis", "at shoulders", "at knees", "at elbow", "at wrist"
  ],

  PATIENT_RESPONSES: [
    "verbalized understanding", "demonstrated carryover", "demonstrated improved performance",
    "required decreased cueing by end", "no LOB noted", "good progress noted"
  ],

  PLAN_OPTIONS: [
    "Continue current POC", "Continue ADL training", "Continue balance training",
    "Progress strengthening", "Progress to standing", "Introduce HEP",
    "Caregiver training", "D/C planning initiated"
  ],

  PROGRESSION_OPTIONS: [
    "Progressed to standing", "Progressed to increased resistance", "Upgraded reps/sets",
    "Modified to reduce complexity", "Downgraded for safety"
  ],

  CLINICAL_OBSERVATIONS: [
    "demonstrating good balance", "demonstrating improved control", "muscles fatigued easily",
    "LOB noted during dynamic tasks", "no LOB noted"
  ]
};

// Quick templates for common interventions
const TEMPLATES = [
  { name: "Balance Training", cpt: "97530", category: "Dynamic sitting balance tasks", assist: "Contact Guard Assist" },
  { name: "UB Dressing", cpt: "97535", category: "UB dressing training", assist: "Minimal Assistance" },
  { name: "LB Dressing", cpt: "97535", category: "LB dressing training", assist: "Moderate Assistance" },
  { name: "Transfers", cpt: "97530", category: "Functional transfer training", assist: "Moderate Assistance" },
  { name: "UE Strengthening", cpt: "97110", category: "BUE strengthening exercises", assist: "Supervision/SBA" },
  { name: "Fine Motor", cpt: "97530", category: "Fine motor coordination training", assist: "Modified Independent" }
];

// ============================================
// MAIN COMPONENT
// ============================================
export default function ClinicalNarrativeBuilderV2() {
  const [state, dispatch] = useReducer(sessionReducer, null, createInitialState);
  const [currentIntervention, setCurrentIntervention] = useState<Partial<Intervention>>({
    cptCode: '', category: '', activities: [], parameters: '', goal: '',
    assistanceLevel: '', cueingTypes: [], cueingPurpose: '', cueingLocation: '',
    impairment: '', patientResponse: '', progression: '', clinicalObservation: ''
  });
  const [savedSessions, setSavedSessions] = useState<Session[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeStep, setActiveStep] = useState(0); // 0: CPT/Category, 1: Details, 2: Cueing

  // Get current activity tags for contextual filtering
  const getCurrentActivityTags = (): string[] => {
    if (!currentIntervention.category || !currentIntervention.activities?.length) return [];
    const categoryActivities = TAGGED_ACTIVITIES[currentIntervention.category] || [];
    const selectedActivityObjects = categoryActivities.filter(act => currentIntervention.activities?.includes(act.value));
    return [...new Set(selectedActivityObjects.flatMap(act => act.tags))];
  };

  useEffect(() => {
    const saved = localStorage.getItem('cnb_sessions_v25');
    if (saved) setSavedSessions(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const narrative = generateNarrative(state);
    dispatch({ type: 'UPDATE_NARRATIVE', payload: { narrative } });
  }, [state.interventions, state.totalDuration, state.plan]);

  const generateNarrative = (state: SessionState): string => {
    if (state.interventions.length === 0) return "Add interventions to generate narrative...";
    let sentences: string[] = [];
    state.interventions.forEach((int, idx) => sentences.push(buildInterventionNarrative(int, idx)));
    let output = sentences.join(' ');
    if (state.plan.length > 0) output += ` Plan: ${state.plan.join('; ')}.`;
    return output;
  };

  const buildInterventionNarrative = (int: Intervention, idx: number): string => {
    const openers = ['Patient completed', 'Patient performed', 'Patient engaged in', 'Therapist facilitated'];
    let opener = openers[idx % openers.length];
    let narrative = `${opener} ${int.category.toLowerCase()}`;

    if (int.activities.length > 0) {
      narrative += int.activities.length === 1
        ? ` ${int.activities[0]}`
        : ` including ${int.activities.join(', ')}`;
    }
    if (int.clinicalObservation) narrative += `, ${int.clinicalObservation}`;
    if (int.goal) narrative += ` in order ${int.goal.replace('to ', '')}`;
    narrative += '.';
    if (int.parameters) narrative += ` ${int.parameters.charAt(0).toUpperCase() + int.parameters.slice(1)}.`;

    const abbrev = CLINICAL_DATA.ASSISTANCE_LEVELS.find(a => a.name === int.assistanceLevel)?.abbrev;
    if (abbrev && int.assistanceLevel !== 'Independent') {
      narrative += ` ${abbrev}`;
      if (int.cueingTypes.length > 0) narrative += ` and ${int.cueingTypes.join('/')}`;
      if (int.cueingLocation) narrative += ` ${int.cueingLocation}`;
      if (int.cueingPurpose) narrative += ` ${int.cueingPurpose}`;
      if (int.impairment) narrative += `, 2/2 ${int.impairment}`;
      narrative += '.';
    }
    if (int.progression) narrative += ` ${int.progression}.`;
    if (int.patientResponse) narrative += ` Patient ${int.patientResponse}.`;

    return narrative;
  };

  const addIntervention = () => {
    if (!currentIntervention.cptCode || !currentIntervention.category) {
      alert('Select CPT code and category');
      return;
    }
    const newInt: Intervention = {
      id: `int_${Date.now()}`,
      cptCode: currentIntervention.cptCode!,
      category: currentIntervention.category!,
      activities: currentIntervention.activities || [],
      parameters: currentIntervention.parameters || '',
      goal: currentIntervention.goal || '',
      assistanceLevel: currentIntervention.assistanceLevel || '',
      cueingTypes: currentIntervention.cueingTypes || [],
      cueingPurpose: currentIntervention.cueingPurpose || '',
      cueingLocation: currentIntervention.cueingLocation || '',
      impairment: currentIntervention.impairment || '',
      patientResponse: currentIntervention.patientResponse || '',
      progression: currentIntervention.progression || '',
      clinicalObservation: currentIntervention.clinicalObservation || ''
    };
    dispatch({ type: 'ADD_INTERVENTION', payload: newInt });
    resetForm();
  };

  const resetForm = () => {
    setCurrentIntervention({
      cptCode: currentIntervention.cptCode, category: '', activities: [], parameters: '', goal: '',
      assistanceLevel: '', cueingTypes: [], cueingPurpose: '', cueingLocation: '',
      impairment: '', patientResponse: '', progression: '', clinicalObservation: ''
    });
    setActiveStep(0);
    setShowAdvanced(false);
  };

  const applyTemplate = (template: typeof TEMPLATES[0]) => {
    setCurrentIntervention({
      ...currentIntervention,
      cptCode: template.cpt,
      category: template.category,
      assistanceLevel: template.assist,
      activities: []
    });
    setActiveStep(1);
  };

  const saveSession = () => {
    const sessionToSave: Session = { ...state };
    const sessions = [...savedSessions];
    const idx = sessions.findIndex(s => s.sessionId === state.sessionId);
    if (idx >= 0) sessions[idx] = sessionToSave;
    else sessions.push(sessionToSave);
    setSavedSessions(sessions);
    localStorage.setItem('cnb_sessions_v25', JSON.stringify(sessions));
    alert('Saved!');
  };

  const copyNarrative = () => {
    navigator.clipboard.writeText(state.narrative);
    alert('Copied!');
  };

  const getActivityOptions = () => {
    if (!currentIntervention.category) return [];
    return CLINICAL_DATA.ACTIVITIES[currentIntervention.category as keyof typeof CLINICAL_DATA.ACTIVITIES] || [];
  };

  const activityTags = getCurrentActivityTags();
  const suggestedGoals = activityTags.length > 0 ? filterByRelevance(activityTags, TAGGED_GOALS, 2) : [];
  const suggestedImpairments = activityTags.length > 0 ? filterByRelevance(activityTags, TAGGED_IMPAIRMENTS, 2) : [];
  const suggestedCueingPurposes = activityTags.length > 0 ? filterByRelevance(activityTags, TAGGED_CUEING_PURPOSES, 2) : [];

  return (
    <div className="h-screen flex flex-col bg-slate-100">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6" />
          <div>
            <h1 className="font-bold text-lg">Clinical Narrative Builder</h1>
            <p className="text-blue-200 text-xs">v4.0 • Redesigned UI</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="date"
            value={state.sessionDate}
            onChange={(e) => dispatch({ type: 'UPDATE_SESSION_INFO', payload: { field: 'sessionDate', value: e.target.value }})}
            className="px-2 py-1 text-sm rounded bg-blue-500 border border-blue-400 text-white"
          />
          <select
            value={state.totalDuration}
            onChange={(e) => dispatch({ type: 'UPDATE_SESSION_INFO', payload: { field: 'totalDuration', value: parseInt(e.target.value) }})}
            className="px-2 py-1 text-sm rounded bg-blue-500 border border-blue-400 text-white"
          >
            <option value={30}>30 min</option>
            <option value={45}>45 min</option>
            <option value={60}>60 min</option>
          </select>
          <button onClick={() => dispatch({ type: 'CLEAR_SESSION' })} className="p-2 hover:bg-blue-500 rounded" title="New Session">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button onClick={saveSession} className="flex items-center gap-1 px-3 py-1.5 bg-green-500 hover:bg-green-400 rounded text-sm font-medium">
            <Save className="w-4 h-4" /> Save
          </button>
          <button onClick={copyNarrative} className="flex items-center gap-1 px-3 py-1.5 bg-white text-blue-600 hover:bg-blue-50 rounded text-sm font-medium">
            <Copy className="w-4 h-4" /> Copy
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden">

        {/* LEFT PANEL - FORM */}
        <div className="w-3/5 overflow-y-auto p-4 space-y-4">

          {/* Quick Templates */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-amber-500" />
              <span className="font-semibold text-slate-800">Quick Start Templates</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {TEMPLATES.map((t, i) => (
                <button
                  key={i}
                  onClick={() => applyTemplate(t)}
                  className="px-3 py-1.5 text-sm bg-gradient-to-r from-slate-50 to-slate-100 hover:from-blue-50 hover:to-blue-100 border border-slate-200 hover:border-blue-300 rounded-lg transition-all"
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Interventions List */}
          {state.interventions.length > 0 && (
            <div className="bg-white rounded-xl p-4 shadow-sm border">
              <div className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                Interventions ({state.interventions.length})
              </div>
              <div className="space-y-2">
                {state.interventions.map((int) => (
                  <div key={int.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg group">
                    <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded">{int.cptCode}</span>
                    <span className="flex-1 text-sm text-slate-700">{int.category}</span>
                    <span className="text-xs text-slate-500">{CLINICAL_DATA.ASSISTANCE_LEVELS.find(a => a.name === int.assistanceLevel)?.abbrev || ''}</span>
                    <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                      <button onClick={() => dispatch({ type: 'DUPLICATE_INTERVENTION', payload: { id: int.id } })} className="p-1 hover:bg-slate-200 rounded">
                        <CopyIcon className="w-4 h-4 text-slate-500" />
                      </button>
                      <button onClick={() => dispatch({ type: 'DELETE_INTERVENTION', payload: { id: int.id } })} className="p-1 hover:bg-red-100 rounded">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Intervention Form */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-4 border-b">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-slate-800">Add Intervention</span>
              </div>
              {/* Progress Steps */}
              <div className="flex items-center gap-2 mt-3">
                {['CPT & Category', 'Activities & Details', 'Cueing & Response'].map((step, i) => (
                  <React.Fragment key={i}>
                    <button
                      onClick={() => setActiveStep(i)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all
                        ${activeStep >= i ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}
                    >
                      <span className="w-4 h-4 flex items-center justify-center rounded-full bg-white/20 text-[10px]">{i + 1}</span>
                      {step}
                    </button>
                    {i < 2 && <ChevronRight className="w-4 h-4 text-slate-300" />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="p-4 space-y-4">
              {/* STEP 0: CPT & Category */}
              {activeStep === 0 && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">CPT Code</label>
                    <div className="grid grid-cols-4 gap-2">
                      {CLINICAL_DATA.CPT_CODES.map(c => (
                        <button
                          key={c.code}
                          type="button"
                          onClick={() => setCurrentIntervention({...currentIntervention, cptCode: c.code, category: '', activities: []})}
                          className={`p-3 rounded-lg border-2 transition-all text-left
                            ${currentIntervention.cptCode === c.code
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-slate-200 hover:border-blue-300'}`}
                        >
                          <div className="text-lg mb-1">{c.icon}</div>
                          <div className="font-bold text-sm text-slate-800">{c.code}</div>
                          <div className="text-xs text-slate-500">{c.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {currentIntervention.cptCode && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                      <SearchableSelect
                        value={currentIntervention.category || ''}
                        onChange={(value) => {
                          setCurrentIntervention({...currentIntervention, category: value, activities: []});
                          setActiveStep(1);
                        }}
                        options={(CLINICAL_DATA.CATEGORIES[currentIntervention.cptCode as keyof typeof CLINICAL_DATA.CATEGORIES] || []).map(c => ({ value: c }))}
                        placeholder="Search categories..."
                      />
                    </div>
                  )}
                </>
              )}

              {/* STEP 1: Activities & Details */}
              {activeStep === 1 && currentIntervention.category && (
                <>
                  {/* Activities */}
                  {getActivityOptions().length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Activities <span className="text-slate-400 font-normal">({currentIntervention.activities?.length || 0} selected)</span>
                      </label>
                      <ChipSelector
                        options={getActivityOptions()}
                        selected={currentIntervention.activities || []}
                        onChange={(selected) => setCurrentIntervention({...currentIntervention, activities: selected})}
                        columns={1}
                        maxHeight="150px"
                      />
                    </div>
                  )}

                  {/* Parameters Quick Pick */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Parameters</label>
                    <QuickPick
                      options={CLINICAL_DATA.QUICK_PARAMETERS}
                      value={currentIntervention.parameters || ''}
                      onChange={(value) => setCurrentIntervention({...currentIntervention, parameters: value})}
                    />
                  </div>

                  {/* Goal */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Goal {suggestedGoals.length > 0 && <span className="text-blue-500 text-xs ml-1">✨ Smart suggestions</span>}
                    </label>
                    {suggestedGoals.length > 0 ? (
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1.5">
                          {suggestedGoals.slice(0, 6).map(({ item }, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setCurrentIntervention({...currentIntervention, goal: item.value})}
                              className={`px-2 py-1 text-xs rounded-full border transition-all
                                ${currentIntervention.goal === item.value
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'}`}
                            >
                              {item.value}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <SearchableSelect
                        value={currentIntervention.goal || ''}
                        onChange={(value) => setCurrentIntervention({...currentIntervention, goal: value})}
                        options={TAGGED_GOALS.map(g => ({ value: g.value }))}
                        placeholder="Search goals..."
                      />
                    )}
                  </div>

                  {/* Assistance Level */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Assistance Level</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {CLINICAL_DATA.ASSISTANCE_LEVELS.map(a => (
                        <button
                          key={a.name}
                          type="button"
                          onClick={() => {
                            setCurrentIntervention({...currentIntervention, assistanceLevel: a.name});
                            if (a.name !== 'Independent' && a.name !== 'Modified Independent') setActiveStep(2);
                          }}
                          className={`px-2 py-2 text-xs rounded-lg border-2 transition-all font-medium
                            ${currentIntervention.assistanceLevel === a.name
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                        >
                          {a.abbrev}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveStep(2)}
                    className="w-full py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    Next: Add cueing details →
                  </button>
                </>
              )}

              {/* STEP 2: Cueing & Response */}
              {activeStep === 2 && currentIntervention.category && (
                <>
                  {/* Cueing Types */}
                  {currentIntervention.assistanceLevel && currentIntervention.assistanceLevel !== 'Independent' && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Cueing Types</label>
                      <ChipSelector
                        options={CLINICAL_DATA.CUEING_TYPES}
                        selected={currentIntervention.cueingTypes || []}
                        onChange={(selected) => setCurrentIntervention({...currentIntervention, cueingTypes: selected})}
                        columns={2}
                        maxHeight="120px"
                      />
                    </div>
                  )}

                  {/* Cueing Location */}
                  {(currentIntervention.cueingTypes?.length || 0) > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Cueing Location</label>
                      <QuickPick
                        options={CLINICAL_DATA.CUEING_LOCATIONS}
                        value={currentIntervention.cueingLocation || ''}
                        onChange={(value) => setCurrentIntervention({...currentIntervention, cueingLocation: value})}
                      />
                    </div>
                  )}

                  {/* Cueing Purpose */}
                  {(currentIntervention.cueingTypes?.length || 0) > 0 && suggestedCueingPurposes.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Cueing Purpose <span className="text-blue-500 text-xs ml-1">✨ Smart suggestions</span>
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {suggestedCueingPurposes.slice(0, 8).map(({ item }, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setCurrentIntervention({...currentIntervention, cueingPurpose: item.value})}
                            className={`px-2 py-1 text-xs rounded-full border transition-all
                              ${currentIntervention.cueingPurpose === item.value
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'}`}
                          >
                            {item.value}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Impairment */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Impairment (2/2) {suggestedImpairments.length > 0 && <span className="text-blue-500 text-xs ml-1">✨</span>}
                    </label>
                    {suggestedImpairments.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {suggestedImpairments.slice(0, 6).map(({ item }, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setCurrentIntervention({...currentIntervention, impairment: item.value})}
                            className={`px-2 py-1 text-xs rounded-full border transition-all
                              ${currentIntervention.impairment === item.value
                                ? 'bg-purple-600 text-white border-purple-600'
                                : 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'}`}
                          >
                            {item.value}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <SearchableSelect
                        value={currentIntervention.impairment || ''}
                        onChange={(value) => setCurrentIntervention({...currentIntervention, impairment: value})}
                        options={TAGGED_IMPAIRMENTS.map(i => ({ value: i.value }))}
                        placeholder="Search impairments..."
                      />
                    )}
                  </div>

                  {/* Patient Response */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Patient Response</label>
                    <QuickPick
                      options={CLINICAL_DATA.PATIENT_RESPONSES}
                      value={currentIntervention.patientResponse || ''}
                      onChange={(value) => setCurrentIntervention({...currentIntervention, patientResponse: value})}
                      columns={2}
                    />
                  </div>

                  {/* Advanced Toggle */}
                  <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
                  >
                    <Lightbulb className="w-4 h-4" />
                    {showAdvanced ? 'Hide' : 'Show'} Clinical Reasoning
                    <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                  </button>

                  {showAdvanced && (
                    <div className="space-y-3 pt-2 border-t">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Clinical Observation</label>
                        <QuickPick
                          options={CLINICAL_DATA.CLINICAL_OBSERVATIONS}
                          value={currentIntervention.clinicalObservation || ''}
                          onChange={(value) => setCurrentIntervention({...currentIntervention, clinicalObservation: value})}
                          columns={2}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Progression</label>
                        <QuickPick
                          options={CLINICAL_DATA.PROGRESSION_OPTIONS}
                          value={currentIntervention.progression || ''}
                          onChange={(value) => setCurrentIntervention({...currentIntervention, progression: value})}
                          columns={2}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Add Button */}
              {currentIntervention.category && (
                <button
                  onClick={addIntervention}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium shadow-sm transition-all"
                >
                  ✓ Add to Session
                </button>
              )}
            </div>
          </div>

          {/* Plan Section */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Plan <span className="text-slate-400 font-normal">({state.plan.length} selected)</span>
            </label>
            <ChipSelector
              options={CLINICAL_DATA.PLAN_OPTIONS}
              selected={state.plan}
              onChange={(selected) => {
                // Update plan by comparing current vs selected
                selected.forEach(s => { if (!state.plan.includes(s)) dispatch({ type: 'TOGGLE_PLAN_ITEM', payload: { value: s } }); });
                state.plan.forEach(p => { if (!selected.includes(p)) dispatch({ type: 'TOGGLE_PLAN_ITEM', payload: { value: p } }); });
              }}
              columns={2}
              maxHeight="150px"
            />
          </div>
        </div>

        {/* RIGHT PANEL - NARRATIVE */}
        <div className="w-2/5 bg-white border-l flex flex-col">
          <div className="p-4 border-b bg-gradient-to-r from-slate-50 to-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-slate-800">Generated Narrative</span>
              </div>
              <span className="text-xs text-slate-400">{state.narrative.length} chars</span>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <textarea
              value={state.narrative}
              onChange={(e) => dispatch({ type: 'UPDATE_NARRATIVE', payload: { narrative: e.target.value }})}
              className="w-full h-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm leading-relaxed resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Your narrative will appear here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
