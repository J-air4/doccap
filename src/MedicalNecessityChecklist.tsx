import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface MedicalNecessityChecklistProps {
  checkedItems: string[];
  onToggle: (item: string) => void;
  onComplete: () => void;
  onBack: () => void;
}

const NECESSITY_ITEMS = [
  {
    id: 'skilled',
    label: 'Skilled therapy services required',
    description: 'Intervention requires expertise of licensed OT/OTA',
  },
  {
    id: 'improvement',
    label: 'Potential for improvement documented',
    description: 'Patient shows capacity to benefit from skilled intervention',
  },
  {
    id: 'functional',
    label: 'Functional goals established',
    description: 'Treatment targets meaningful occupational performance',
  },
  {
    id: 'reasonable',
    label: 'Treatment duration is reasonable',
    description: 'Timeframe appropriate for condition and goals',
  },
];

export default function MedicalNecessityChecklist({
  checkedItems,
  onToggle,
  onComplete,
  onBack,
}: MedicalNecessityChecklistProps) {
  const allChecked = NECESSITY_ITEMS.every(item => checkedItems.includes(item.id));

  return (
    <div className="p-6 space-y-4">
      <div className="medical-necessity-banner">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-bold mb-1">Medical Necessity Documentation</div>
            <div className="text-sm">
              Verify that your narrative meets Medicare Part B requirements before finalizing.
              All items must be checked to proceed.
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {NECESSITY_ITEMS.map((item) => {
          const isChecked = checkedItems.includes(item.id);
          return (
            <label key={item.id} className="necessity-checkbox">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(item.id)}
              />
              <div className="flex-1">
                <div className={`font-semibold ${isChecked ? 'text-green-700' : 'text-gray-700'}`}>
                  {item.label}
                  {isChecked && <CheckCircle2 className="w-4 h-4 inline ml-2 text-green-600" />}
                </div>
                <div className="text-sm text-gray-600 mt-1">{item.description}</div>
              </div>
            </label>
          );
        })}
      </div>

      {!allChecked && (
        <div className="warning-banner text-center">
          <strong>⚠️ Incomplete Checklist</strong>
          <div className="text-sm mt-1">Please verify all medical necessity criteria before proceeding.</div>
        </div>
      )}

      {allChecked && (
        <div className="recommendation-box text-center">
          <strong>✓ All Requirements Met</strong>
          <div className="text-sm mt-1">Your documentation meets medical necessity standards.</div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <button onClick={onBack} className="app-button">
          ← Back
        </button>
        <button
          onClick={onComplete}
          disabled={!allChecked}
          className="app-button app-button-primary"
        >
          Complete & Generate →
        </button>
      </div>
    </div>
  );
}
