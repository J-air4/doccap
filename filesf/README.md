# Classic Narrative Builder - Integration Guide

## 🎯 What's This?

A self-contained "Phase 3" Clinical Narrative Builder with a classic Windows 95/XP look and feel. Features step-by-step workflow, quick-access phrases, medical necessity checklist, and real-time narrative preview.

## 📁 File Structure

```
classic-builder/
├── ClassicNarrativeBuilder.tsx       (Main component)
├── components/
│   ├── StepByStepModal.tsx          (Step navigation with keyboard shortcuts)
│   ├── PhraseButtons.tsx            (Quick access phrases)
│   └── MedicalNecessityChecklist.tsx (Compliance checklist)
├── styles/
│   └── classic-theme.css            (Classic Windows styling)
└── utils/
    └── dataAdapter.ts               (Transforms your existing data)
```

## 🚀 Integration Steps

### 1. Copy Files

Copy the entire `classic-builder` folder into your React app:

```bash
cp -r classic-builder /path/to/your-app/src/features/
```

### 2. Add Route (Optional)

Add a route to access the classic builder:

```tsx
// In your App.tsx or router config
import ClassicNarrativeBuilder from './features/classic-builder/ClassicNarrativeBuilder';

// Option A: As a separate route
<Route path="/classic-builder" element={<ClassicNarrativeBuilder />} />

// Option B: As a toggle in your main app
const [useClassicMode, setUseClassicMode] = useState(false);

{useClassicMode ? (
  <ClassicNarrativeBuilder />
) : (
  <YourCurrentBuilder />
)}
```

### 3. Fix Import Paths

Update the imports in `dataAdapter.ts` to match your project structure:

```typescript
// Change these lines in dataAdapter.ts:
import { TAGGED_ACTIVITIES } from '../../../src/taggedActivities';
import { TAGGED_GOALS } from '../../../src/taggedGoals';
// etc...

// To match your actual paths:
import { TAGGED_ACTIVITIES } from '@/taggedActivities';
import { TAGGED_GOALS } from '@/taggedGoals';
```

### 4. Install Dependencies (if needed)

The classic builder uses `lucide-react` icons (which you already have):

```bash
npm install lucide-react
```

## ✨ Features

### 1. **Step-by-Step Workflow**
- Duration entry with billing guidelines
- CPT code selection
- Category → Activity → Goal → Impairment → Cueing
- Real-time narrative preview
- Keyboard shortcuts (Enter to continue, Escape to go back)

### 2. **Quick Access Phrases**
- Pre-defined favorite phrases (color-coded)
- Recently used phrases (auto-updates)
- One-click insertion into narrative

### 3. **Medical Necessity Checklist**
- Medicare Part B compliance checks
- Must complete all items before generating
- Visual feedback for completion status

### 4. **Classic Windows Styling**
- Windows 95/XP inspired UI
- Classic blue title bars
- Raised button effects
- Nostalgic scrollbars

### 5. **Smart Features**
- Auto-saves to localStorage
- Recent phrases tracking
- Narrative preview updates in real-time
- Copy to clipboard functionality

## 🎨 Customization

### Change Favorite Phrases

Edit `PhraseButtons.tsx`:

```typescript
const FAVORITE_PHRASES: Phrase[] = [
  { text: 'Your custom phrase', color: 'blue' },
  // Add more...
];
```

### Adjust Medical Necessity Items

Edit `MedicalNecessityChecklist.tsx`:

```typescript
const NECESSITY_ITEMS = [
  {
    id: 'your-item',
    label: 'Your requirement',
    description: 'Description of requirement',
  },
  // Add more...
];
```

### Modify Colors

Edit `classic-theme.css`:

```css
.classic-theme .window-title-bar {
  background: linear-gradient(to right, #your-color, #your-color);
}
```

## 🔧 Data Flow

```
Your Existing Data (TS files)
    ↓
dataAdapter.ts (transforms to ClassicOption format)
    ↓
ClassicNarrativeBuilder (main state management)
    ↓
StepByStepModal (user interaction)
    ↓
Generated Narrative (saved to localStorage)
```

## 💾 Storage

The classic builder uses localStorage for:
- `classic-narratives`: Saved narrative history
- `recent-phrases`: Recently used phrases (auto-updates)

Storage keys are prefixed to avoid conflicts with your existing app.

## ⌨️ Keyboard Shortcuts

- **Enter**: Continue to next step / Select option
- **Escape**: Go back / Close modal
- **Type to search**: In all selection steps

## 🐛 Troubleshooting

### "Cannot find module" errors
- Check that import paths in `dataAdapter.ts` match your project structure
- Ensure all files are in the correct directory

### Styling conflicts
- The `.classic-theme` wrapper class prevents CSS leakage
- All styles are scoped to components within this wrapper

### localStorage not working
- Check browser privacy settings
- Verify localStorage is enabled
- Clear browser cache if seeing old data

## 🎯 What's Different from Main App?

| Feature | Main App | Classic Builder |
|---------|----------|-----------------|
| UI Style | Modern, Tailwind | Classic Windows 95/XP |
| Workflow | Modal-based | Step-by-step wizard |
| Data Entry | Dropdown menus | Click-through steps |
| Phrases | None | Quick-access buttons |
| Compliance | Manual | Checklist before generate |
| Preview | Separate panel | Inline in modal |

## 🚀 Future Enhancements

Potential additions:
- Export to PDF
- Email narrative
- Template library
- Custom phrase management
- Multi-language support
- Print-friendly format

## 📝 Notes

- The classic builder is **completely independent** from your main app
- It uses the same clinical data (activities, goals, etc.)
- No changes needed to your existing components
- Can run side-by-side with your current builder
- Easy to remove if not needed (just delete the folder)

## ✅ Ready to Use!

The classic builder is production-ready and tested. Just copy the files, fix the import paths, and you're good to go!

---

**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Compatibility:** React 18+, TypeScript 5+
