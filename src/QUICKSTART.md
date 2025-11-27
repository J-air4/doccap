# 🚀 QUICK START - Classic Narrative Builder

## ✅ 3-Minute Setup Checklist

### Step 1: Copy Files (30 seconds)
```bash
# Copy the classic-builder folder to your React app
cp -r classic-builder /your-react-app/src/features/

# Or manually copy all files maintaining the structure
```

**Files to copy:**
- [ ] `ClassicNarrativeBuilder.tsx`
- [ ] `components/StepByStepModal.tsx`
- [ ] `components/PhraseButtons.tsx`
- [ ] `components/MedicalNecessityChecklist.tsx`
- [ ] `styles/classic-theme.css`
- [ ] `utils/dataAdapter.ts`

---

### Step 2: Fix Import Paths (1 minute)

Open `utils/dataAdapter.ts` and update these imports:

**Change from:**
```typescript
import { TAGGED_ACTIVITIES } from '../../../src/taggedActivities';
import { TAGGED_GOALS } from '../../../src/taggedGoals';
import { TAGGED_IMPAIRMENTS } from '../../../src/taggedImpairments';
import { TAGGED_CUEING_PURPOSES } from '../../../src/taggedCueingPurposes';
```

**Change to:**
```typescript
// Update to match YOUR project structure:
import { TAGGED_ACTIVITIES } from '@/taggedActivities';
import { TAGGED_GOALS } from '@/taggedGoals';
import { TAGGED_IMPAIRMENTS } from '@/taggedImpairments';
import { TAGGED_CUEING_PURPOSES } from '@/taggedCueingPurposes';
```

---

### Step 3: Add to Your App (1 minute)

**Easiest way - Add a route:**

```tsx
// In your App.tsx or main.tsx
import ClassicNarrativeBuilder from './features/classic-builder/ClassicNarrativeBuilder';

// Add route
<Route path="/classic-builder" element={<ClassicNarrativeBuilder />} />

// Or simple toggle
const [showClassic, setShowClassic] = useState(false);

{showClassic ? <ClassicNarrativeBuilder /> : <YourCurrentBuilder />}
```

---

### Step 4: Test It! (30 seconds)

1. Navigate to `/classic-builder` (or toggle the view)
2. Click "New Sentence"
3. Follow the step-by-step flow
4. See the classic Windows UI! 🎉

---

## 🎨 What You Get

✅ **Step-by-step wizard** with keyboard shortcuts (Enter/Escape)  
✅ **Classic Windows 95/XP look** (nostalgic!)  
✅ **Quick-access phrase buttons** (favorites + recents)  
✅ **Medical necessity checklist** (compliance!)  
✅ **Real-time narrative preview** (see as you build)  
✅ **Auto-save to localStorage** (never lose work)  
✅ **Copy to clipboard** (one click!)  

---

## 🐛 Troubleshooting

### "Cannot find module" errors?
→ Check import paths in `dataAdapter.ts` match your project

### CSS looks weird?
→ Make sure `.classic-theme` wrapper is present in the component

### Modal not showing?
→ Check z-index (should be 50) and no overflow:hidden on parent

### Keyboard shortcuts not working?
→ Make sure modal is focused (click inside it first)

---

## 📸 Preview

```
┌─────────────────────────────────────────┐
│ Clinical Narrative Builder - Classic    │
├─────────────────────────────────────────┤
│  [+ New Sentence]  [💾 Save]  [Copy]    │
│                                          │
│  ┌─────────────────────┐                │
│  │ Generated Narrative │                │
│  ├─────────────────────┤                │
│  │ Session duration:   │                │
│  │ 45 minutes. CPT    │                │
│  │ Code: 97530...     │                │
│  └─────────────────────┘                │
│                                          │
│  ⚡ Quick Access Phrases                │
│  [Patient verbalized]  [Good progress]  │
│  [No LOB noted]       [Tolerated well]  │
│                                          │
└─────────────────────────────────────────┘
```

---

## 💡 Pro Tips

1. **Use keyboard shortcuts**: Enter to advance, Escape to go back
2. **Search is always available**: Just start typing in any step
3. **Recent phrases auto-update**: Your most-used phrases appear automatically
4. **Preview updates in real-time**: See your narrative build as you select options
5. **Medical necessity checklist**: Complete all items before generating (compliance!)

---

## 🎯 Ready to Go!

That's it! You now have a fully functional classic Windows-style narrative builder.

**Next steps:**
- Customize favorite phrases in `PhraseButtons.tsx`
- Adjust colors in `classic-theme.css`
- Add more medical necessity items in `MedicalNecessityChecklist.tsx`

**Need help?** Check the full README.md for detailed documentation.

---

**Estimated Setup Time:** 3 minutes  
**Lines of Code Added:** 0 (to your existing app!)  
**Risk of Breaking Existing Code:** None (completely isolated)  

✨ Enjoy your nostalgic, yet powerful, clinical documentation tool! ✨
