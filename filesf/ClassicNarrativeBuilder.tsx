import React, { useState, useEffect, useReducer } from 'react';
import { Save, FileText, X, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import './styles/classic-theme.css';
import { adaptDataForClassicUI, ClassicData } from './utils/dataAdapter';
import PhraseButtons from './components/PhraseButtons';
import MedicalNecessityChecklist from './components/MedicalNecessityChecklist';
import StepByStepModal from './components/StepByStepModal';

/**
 * Classic Narrative Builder - Phase 3 Features
 * Windows 95/XP inspired UI with step-by-step workflow
 */

interface NarrativeState {
  duration: number;
  cptCode: string;
  category: string;
  activity: string;
  goal: string;
  impairment: string;
  cueingPurpose: string;
  necessityChecks: string[];
}

interface SavedNarrative {
  id: string;
  date: string;
  duration: number;
  text: string;
}

type Step = 'start' | 'duration' | 'cpt' | 'category' | 'activity' | 'goal' | 'impairment' | 'cueing' | 'checklist' | 'complete';

interface State {
  currentStep: Step;
  narrative: NarrativeState;
  savedNarratives: SavedNarrative[];
  showModal: boolean;
  generatedText: string;
}

type Action =
  | { type: 'SET_STEP'; payload: Step }
  | { type: 'UPDATE_NARRATIVE'; payload: Partial<NarrativeState> }
  | { type: 'SAVE_NARRATIVE' }
  | { type: 'DELETE_NARRATIVE'; payload: string }
  | { type: 'LOAD_SAVED'; payload: SavedNarrative[] }
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'GENERATE_TEXT'; payload: string }
  | { type: 'RESET' };

const initialNarrative: NarrativeState = {
  duration: 45,
  cptCode: '',
  category: '',
  activity: '',
  goal: '',
  impairment: '',
  cueingPurpose: '',
  necessityChecks: [],
};

const initialState: State = {
  currentStep: 'start',
  narrative: initialNarrative,
  savedNarratives: [],
  showModal: false,
  generatedText: '',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'UPDATE_NARRATIVE':
      return { ...state, narrative: { ...state.narrative, ...action.payload } };
    case 'SAVE_NARRATIVE': {
      const newNarrative: SavedNarrative = {
        id: `narrative-${Date.now()}`,
        date: new Date().toLocaleDateString(),
        duration: state.narrative.duration,
        text: state.generatedText,
      };
      const updated = [newNarrative, ...state.savedNarratives];
      localStorage.setItem('classic-narratives', JSON.stringify(updated));
      return { ...state, savedNarratives: updated };
    }
    case 'DELETE_NARRATIVE': {
      const filtered = state.savedNarratives.filter(n => n.id !== action.payload);
      localStorage.setItem('classic-narratives', JSON.stringify(filtered));
      return { ...state, savedNarratives: filtered };
    }
    case 'LOAD_SAVED':
      return { ...state, savedNarratives: action.payload };
    case 'OPEN_MODAL':
      return { ...state, showModal: true, currentStep: 'duration' };
    case 'CLOSE_MODAL':
      return { ...state, showModal: false, currentStep: 'start' };
    case 'GENERATE_TEXT':
      return { ...state, generatedText: action.payload };
    case 'RESET':
      return { ...state, narrative: initialNarrative, currentStep: 'start', generatedText: '' };
    default:
      return state;
  }
}

export default function ClassicNarrativeBuilder() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [classicData, setClassicData] = useState<ClassicData | null>(null);

  // Load saved narratives on mount
  useEffect(() => {
    const saved = localStorage.getItem('classic-narratives');
    if (saved) {
      dispatch({ type: 'LOAD_SAVED', payload: JSON.parse(saved) });
    }
  }, []);

  // Load and adapt data
  useEffect(() => {
    const data = adaptDataForClassicUI();
    setClassicData(data);
  }, []);

  // Generate narrative text as user progresses
  useEffect(() => {
    const { duration, cptCode, category, activity, goal, impairment, cueingPurpose } = state.narrative;
    
    let text = '';
    if (duration) text += `Session duration: ${duration} minutes. `;
    if (cptCode) text += `CPT Code: ${cptCode}. `;
    if (activity) text += `Patient completed ${activity.toLowerCase()}`;
    if (goal) text += ` ${goal}`;
    if (impairment) text += `, 2/2 ${impairment}`;
    if (cueingPurpose) text += ` with cueing ${cueingPurpose}`;
    if (text) text += '.';
    
    dispatch({ type: 'GENERATE_TEXT', payload: text });
  }, [state.narrative]);

  const handleNewNarrative = () => {
    dispatch({ type: 'RESET' });
    dispatch({ type: 'OPEN_MODAL' });
  };

  const handleSave = () => {
    if (state.generatedText) {
      dispatch({ type: 'SAVE_NARRATIVE' });
      alert('✓ Narrative saved!');
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(state.generatedText);
    alert('✓ Copied to clipboard!');
  };

  if (!classicData) {
    return <div className="p-8 text-center">Loading classic builder...</div>;
  }

  return (
    <div className="classic-theme min-h-screen bg-gray-200 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="app-window mb-4">
          <div className="window-title-bar">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <span>Clinical Narrative Builder - Classic Edition</span>
            </div>
          </div>
          
          <div className="p-4">
            <div className="compliance-banner">
              <div className="font-bold mb-1">📋 Medicare Compliance Reminder</div>
              <div className="text-sm">Documentation must demonstrate medical necessity and skilled therapy services per Medicare Part B guidelines.</div>
            </div>

            <div className="flex gap-3 flex-wrap">
              <button onClick={handleNewNarrative} className="app-button app-button-primary">
                + New Sentence
              </button>
              <button onClick={handleSave} disabled={!state.generatedText} className="app-button">
                <Save className="w-4 h-4 inline mr-1" />
                Save Note
              </button>
              <button onClick={handleCopyToClipboard} disabled={!state.generatedText} className="app-button">
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Left Column - Narrative & Quick Phrases */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Narrative Display */}
            <div className="app-window">
              <div className="window-title-bar">
                <span>📝 Generated Narrative</span>
              </div>
              <div className="p-4">
                <textarea
                  className="narrative-textarea w-full"
                  value={state.generatedText}
                  onChange={(e) => dispatch({ type: 'GENERATE_TEXT', payload: e.target.value })}
                  placeholder="Click 'New Sentence' to start building your clinical narrative..."
                  rows={8}
                />
                {state.generatedText && (
                  <div className="mt-2 text-sm text-gray-600">
                    {state.generatedText.length} characters
                  </div>
                )}
              </div>
            </div>

            {/* Quick Access Phrases */}
            <PhraseButtons onInsert={(phrase) => {
              const newText = state.generatedText + ' ' + phrase;
              dispatch({ type: 'GENERATE_TEXT', payload: newText });
            }} />
          </div>

          {/* Right Column - Saved Narratives */}
          <div className="app-window">
            <div className="window-title-bar">
              <span>💾 Saved Narratives</span>
            </div>
            <div className="p-4 max-h-[600px] overflow-y-auto">
              {state.savedNarratives.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No saved narratives yet
                </div>
              ) : (
                <div className="space-y-2">
                  {state.savedNarratives.map((narrative) => (
                    <div key={narrative.id} className="saved-narrative-item">
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{narrative.date}</div>
                        <div className="text-xs text-gray-600">{narrative.duration} min</div>
                        <div className="text-xs text-gray-700 mt-1 line-clamp-2">
                          {narrative.text}
                        </div>
                      </div>
                      <button
                        onClick={() => dispatch({ type: 'DELETE_NARRATIVE', payload: narrative.id })}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Modal */}
      {state.showModal && classicData && (
        <StepByStepModal
          currentStep={state.currentStep}
          narrative={state.narrative}
          data={classicData}
          onUpdateNarrative={(updates) => dispatch({ type: 'UPDATE_NARRATIVE', payload: updates })}
          onNextStep={(nextStep) => dispatch({ type: 'SET_STEP', payload: nextStep })}
          onPrevStep={(prevStep) => dispatch({ type: 'SET_STEP', payload: prevStep })}
          onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
        />
      )}
    </div>
  );
}
