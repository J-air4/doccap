import React, { useEffect, useState } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { ClassicData } from '../utils/dataAdapter';
import MedicalNecessityChecklist from './MedicalNecessityChecklist';

type Step = 'start' | 'duration' | 'cpt' | 'category' | 'activity' | 'goal' | 'impairment' | 'cueing' | 'checklist' | 'complete';

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

interface StepByStepModalProps {
  currentStep: Step;
  narrative: NarrativeState;
  data: ClassicData;
  onUpdateNarrative: (updates: Partial<NarrativeState>) => void;
  onNextStep: (nextStep: Step) => void;
  onPrevStep: (prevStep: Step) => void;
  onClose: () => void;
}

const CPT_CODES = [
  { code: '97530', name: 'Therapeutic Activities', icon: '🎯' },
  { code: '97535', name: 'Self-Care/Home Management', icon: '🏠' },
  { code: '97110', name: 'Therapeutic Exercise', icon: '💪' },
  { code: '97112', name: 'Neuromuscular Re-education', icon: '🧠' },
];

const STEP_FLOW: Record<Step, { next?: Step; prev?: Step }> = {
  start: { next: 'duration' },
  duration: { next: 'cpt', prev: 'start' },
  cpt: { next: 'category', prev: 'duration' },
  category: { next: 'activity', prev: 'cpt' },
  activity: { next: 'goal', prev: 'category' },
  goal: { next: 'impairment', prev: 'activity' },
  impairment: { next: 'cueing', prev: 'goal' },
  cueing: { next: 'checklist', prev: 'impairment' },
  checklist: { next: 'complete', prev: 'cueing' },
  complete: {},
};

export default function StepByStepModal({
  currentStep,
  narrative,
  data,
  onUpdateNarrative,
  onNextStep,
  onPrevStep,
  onClose,
}: StepByStepModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        const prevStep = STEP_FLOW[currentStep].prev;
        if (prevStep) {
          onPrevStep(prevStep);
        } else {
          onClose();
        }
      }
      if (e.key === 'Enter' && currentStep !== 'checklist') {
        e.preventDefault();
        const nextStep = STEP_FLOW[currentStep].next;
        if (nextStep && canProceed()) {
          onNextStep(nextStep);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, narrative, onNextStep, onPrevStep, onClose]);

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 'duration': return narrative.duration > 0;
      case 'cpt': return !!narrative.cptCode;
      case 'category': return !!narrative.category;
      case 'activity': return !!narrative.activity;
      case 'goal': return !!narrative.goal;
      case 'impairment': return !!narrative.impairment;
      case 'cueing': return !!narrative.cueingPurpose;
      default: return true;
    }
  };

  const handleNext = () => {
    const nextStep = STEP_FLOW[currentStep].next;
    if (nextStep && canProceed()) {
      onNextStep(nextStep);
      setSearchQuery('');
    }
  };

  const handleBack = () => {
    const prevStep = STEP_FLOW[currentStep].prev;
    if (prevStep) {
      onPrevStep(prevStep);
      setSearchQuery('');
    }
  };

  const getStepTitle = (): string => {
    const titles: Record<Step, string> = {
      start: 'Start New Narrative',
      duration: 'Session Duration',
      cpt: 'Select CPT Code',
      category: 'Select Category',
      activity: 'Select Activity',
      goal: 'Select Goal',
      impairment: 'Select Impairment',
      cueing: 'Select Cueing Purpose',
      checklist: 'Medical Necessity Checklist',
      complete: 'Complete!',
    };
    return titles[currentStep];
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'duration':
        return (
          <div className="p-6 text-center space-y-6">
            <div>
              <label className="block text-lg font-semibold mb-4">How many minutes was the session?</label>
              <input
                type="number"
                value={narrative.duration}
                onChange={(e) => onUpdateNarrative({ duration: parseInt(e.target.value) || 0 })}
                className="duration-input mx-auto"
                min="15"
                max="120"
                step="5"
                autoFocus
              />
            </div>
            
            <div className="billing-guide text-left max-w-md mx-auto">
              <div className="font-bold mb-2">💡 Billing Guidelines:</div>
              <ul className="text-sm space-y-1">
                <li>• <strong>8-22 min:</strong> 1 unit</li>
                <li>• <strong>23-37 min:</strong> 2 units</li>
                <li>• <strong>38-52 min:</strong> 3 units</li>
                <li>• <strong>53+ min:</strong> 4 units</li>
              </ul>
            </div>
          </div>
        );

      case 'cpt':
        return (
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              {CPT_CODES.map((cpt) => (
                <button
                  key={cpt.code}
                  onClick={() => {
                    onUpdateNarrative({ cptCode: cpt.code });
                    onNextStep('category');
                  }}
                  className={`p-6 rounded-lg border-2 transition-all text-left ${
                    narrative.cptCode === cpt.code
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{cpt.icon}</div>
                  <div className="font-bold text-lg">{cpt.code}</div>
                  <div className="text-sm text-gray-600">{cpt.name}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'category':
        const categories = narrative.cptCode ? Object.keys(data.activities) : [];
        return (
          <div className="p-6">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                autoFocus
              />
            </div>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {categories
                .filter(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      onUpdateNarrative({ category });
                      handleNext();
                    }}
                    className={`modal-option w-full text-left ${
                      narrative.category === category ? 'modal-option-selected' : ''
                    }`}
                  >
                    {category}
                  </button>
                ))}
            </div>
          </div>
        );

      case 'activity':
        const activities = narrative.category ? data.activities[narrative.category] || [] : [];
        return (
          <div className="p-6">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                autoFocus
              />
            </div>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {activities
                .filter(act => act.value.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((activity) => (
                  <button
                    key={activity.id}
                    onClick={() => {
                      onUpdateNarrative({ activity: activity.value });
                      handleNext();
                    }}
                    className={`modal-option w-full text-left ${
                      narrative.activity === activity.value ? 'modal-option-selected' : ''
                    }`}
                  >
                    {activity.value}
                  </button>
                ))}
            </div>
          </div>
        );

      case 'goal':
        return (
          <div className="p-6">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search goals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                autoFocus
              />
            </div>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {data.goals
                .filter(goal => goal.value.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => {
                      onUpdateNarrative({ goal: goal.value });
                      handleNext();
                    }}
                    className={`modal-option w-full text-left ${
                      narrative.goal === goal.value ? 'modal-option-selected' : ''
                    }`}
                  >
                    {goal.value}
                  </button>
                ))}
            </div>
          </div>
        );

      case 'impairment':
        return (
          <div className="p-6">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search impairments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                autoFocus
              />
            </div>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {data.impairments
                .filter(imp => imp.value.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((impairment) => (
                  <button
                    key={impairment.id}
                    onClick={() => {
                      onUpdateNarrative({ impairment: impairment.value });
                      handleNext();
                    }}
                    className={`modal-option w-full text-left ${
                      narrative.impairment === impairment.value ? 'modal-option-selected' : ''
                    }`}
                  >
                    {impairment.value}
                  </button>
                ))}
            </div>
          </div>
        );

      case 'cueing':
        return (
          <div className="p-6">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search cueing purposes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                autoFocus
              />
            </div>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {data.cueingPurposes
                .filter(cp => cp.value.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((cueing) => (
                  <button
                    key={cueing.id}
                    onClick={() => {
                      onUpdateNarrative({ cueingPurpose: cueing.value });
                      handleNext();
                    }}
                    className={`modal-option w-full text-left ${
                      narrative.cueingPurpose === cueing.value ? 'modal-option-selected' : ''
                    }`}
                  >
                    {cueing.value}
                  </button>
                ))}
            </div>
          </div>
        );

      case 'checklist':
        return (
          <MedicalNecessityChecklist
            checkedItems={narrative.necessityChecks}
            onToggle={(item) => {
              const updated = narrative.necessityChecks.includes(item)
                ? narrative.necessityChecks.filter(i => i !== item)
                : [...narrative.necessityChecks, item];
              onUpdateNarrative({ necessityChecks: updated });
            }}
            onComplete={() => onClose()}
            onBack={handleBack}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-window">
        <div className="window-title-bar">
          <span>{getStepTitle()}</span>
          <button onClick={onClose} className="hover:bg-white/20 rounded p-1 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preview Panel */}
        <div className="modal-preview mx-3 mt-3">
          <div className="text-xs font-bold text-gray-600 mb-1">PREVIEW:</div>
          <div className="text-sm">
            {narrative.duration > 0 && `${narrative.duration} min session. `}
            {narrative.cptCode && `CPT ${narrative.cptCode}. `}
            {narrative.activity && `Patient completed ${narrative.activity} `}
            {narrative.goal && `${narrative.goal} `}
            {narrative.impairment && `2/2 ${narrative.impairment} `}
            {narrative.cueingPurpose && `with cueing ${narrative.cueingPurpose}.`}
          </div>
        </div>

        {/* Step Content */}
        {renderStepContent()}

        {/* Navigation Buttons */}
        {currentStep !== 'checklist' && (
          <div className="flex justify-between p-4 border-t border-gray-300">
            <button
              onClick={handleBack}
              disabled={!STEP_FLOW[currentStep].prev}
              className="app-button"
            >
              <ArrowLeft className="w-4 h-4 inline mr-1" />
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="app-button app-button-primary"
            >
              Continue
              <ArrowRight className="w-4 h-4 inline ml-1" />
            </button>
          </div>
        )}

        {/* Keyboard Hints */}
        <div className="px-4 pb-3 text-xs text-gray-500 text-center">
          Press <kbd className="px-2 py-1 bg-gray-200 rounded">Enter</kbd> to continue • 
          <kbd className="px-2 py-1 bg-gray-200 rounded ml-1">Escape</kbd> to go back
        </div>
      </div>
    </div>
  );
}
