# UI Redesign Collaboration - Gemini Input Requested

## Current State
The Clinical Narrative Builder (React/TypeScript app) currently uses:
- **SearchableSelect dropdowns** for categories, goals, impairments
- **ChipSelector** components for multi-select options
- **QuickPick** buttons for simple selections

## Desired State
Replace all SearchableSelect dropdowns with a **modal-based selection interface** similar to the provided HTML reference file.

## Reference Interface (from HTML file)
The HTML prototype uses:
- Full-screen modal overlay for selections
- Large, clickable button options (easy to see/use)
- Live preview of narrative as you build
- Step-by-step wizard flow
- Keyboard shortcuts (Enter to continue, Escape to go back)
- No dropdowns - everything is modals with buttons

## Key Design Questions for Gemini

### 1. Modal Component Architecture
**Question**: What's the best way to structure the modal component in React?
- Single reusable Modal component with dynamic content?
- Multiple specialized modal components (CategoryModal, GoalModal, etc.)?
- Modal state management approach (Context API, local state, reducer)?

### 2. Dropdown Replacement Strategy
**Current Dropdowns to Replace**:
1. Category selection (SearchableSelect on line 705-713)
2. Goal selection (SearchableSelect on line 772-778)
3. Impairment selection (SearchableSelect on line 888-894)
4. Cueing purpose selection (via chips but could be modal)

**Question**: Should we:
- Replace all at once or incrementally?
- Keep search functionality in modals?
- Use grid layout for buttons (like HTML) or list?

### 3. User Experience Flow
**Current Flow**:
- Step-based wizard (0: CPT/Category, 1: Details, 2: Cueing)
- Progressive disclosure
- Contextual filtering with tags

**Question**: How to integrate modals without disrupting the step flow?
- Should modals be triggered by clicking input fields?
- Should clicking a button open the modal directly?
- How to handle the "back" navigation within modals vs steps?

### 4. Search Functionality
The HTML has search within modals for phrase selection.

**Question**:
- Should category/goal/impairment modals also have search?
- How to balance discoverability (browsing) vs efficiency (search)?
- Should search be always visible or progressive disclosure?

### 5. Mobile Responsiveness
**Question**: The modal approach is more mobile-friendly than dropdowns.
- Should we optimize button sizes for touch?
- Stack buttons single-column on mobile?
- Any other mobile considerations?

## Technical Constraints
- React 18 with TypeScript
- Tailwind CSS for styling
- Current state management uses useReducer
- Must maintain existing data structures (TAGGED_GOALS, TAGGED_IMPAIRMENTS, etc.)
- Must preserve contextual filtering/smart suggestions feature

## Example Code Pattern from HTML
```javascript
// Modal shows large clickable options
options.forEach(option => {
  const optionEl = document.createElement('a');
  optionEl.href = '#';
  optionEl.textContent = option;
  optionEl.className = 'modal-option';
  optionEl.onclick = (e) => {
    e.preventDefault();
    handleOptionClick(option);
  };
  modalContent.appendChild(optionEl);
});
```

## Request for Gemini
Please provide recommendations on:
1. **Component structure** for the modal system
2. **UX flow** - how modals should integrate with existing step-based wizard
3. **Code organization** - where to place modal logic, how to share state
4. **Specific implementation approach** for replacing each dropdown
5. **Any potential pitfalls** or considerations we should be aware of

## Current File Structure
```
src/
├── ClinicalNarrativeBuilder.tsx (main component - 998 lines)
├── taggedActivities.ts
├── taggedCueingPurposes.ts
├── taggedGoals.ts
├── taggedImpairments.ts
└── tagLibrary.ts (contextual filtering logic)
```

---

**Awaiting Gemini's architectural guidance before proceeding with implementation.**
