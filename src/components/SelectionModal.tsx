import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Sparkles, Check } from 'lucide-react';

interface OptionItem {
  value: string;
  tags?: string[];
  description?: string; // For things like CPT codes
}

interface SelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  contextText?: string; // e.g., "For activity: Donning Shirt"
  options: OptionItem[] | string[]; // Can handle simple strings or objects
  suggestedOptions?: OptionItem[] | string[]; // The "Smart Suggestions"
  currentValue?: string;
  onSelect: (value: string) => void;
  colorTheme?: 'blue' | 'purple' | 'emerald' | 'amber';
}

export default function SelectionModal({
  isOpen,
  onClose,
  title,
  contextText,
  options,
  suggestedOptions = [],
  currentValue,
  onSelect,
  colorTheme = 'blue'
}: SelectionModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
      setSearchQuery('');
      setShowAll(false);
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Normalize data helper
  const normalize = (item: string | OptionItem): OptionItem => {
    return typeof item === 'string' ? { value: item } : item;
  };

  // Filter logic
  const allNormalized = options.map(normalize);
  const suggestionsNormalized = suggestedOptions.map(normalize);

  // Remove suggestions from the "All" list to avoid duplicates in view
  const suggestedValues = new Set(suggestionsNormalized.map(s => s.value));

  const filteredOptions = allNormalized.filter(opt => {
    const matchesSearch = opt.value.toLowerCase().includes(searchQuery.toLowerCase());
    const isAlreadySuggested = suggestedValues.has(opt.value);

    // If searching, show everything matching. If not searching, hide suggestions from "all" list
    if (searchQuery) return matchesSearch;
    return !isAlreadySuggested;
  });

  const handleSelect = (val: string) => {
    onSelect(val);
    onClose();
  };

  // Theme classes
  const themeStyles = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', ring: 'focus:ring-blue-500', btn: 'bg-blue-600' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', ring: 'focus:ring-purple-500', btn: 'bg-purple-600' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', ring: 'focus:ring-emerald-500', btn: 'bg-emerald-600' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', ring: 'focus:ring-amber-500', btn: 'bg-amber-600' },
  }[colorTheme];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-50 md:bg-black/50 md:backdrop-blur-sm transition-all duration-200">

      {/* Modal Container */}
      <div className="flex-1 flex flex-col w-full h-full md:h-[90vh] md:w-[800px] md:m-auto md:rounded-2xl md:shadow-2xl bg-slate-50 overflow-hidden relative animate-in fade-in slide-in-from-bottom-4 duration-300">

        {/* Header */}
        <div className="bg-white border-b px-4 py-4 md:px-6 md:py-5 flex-none z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              {contextText && (
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  {contextText}
                </p>
              )}
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">{title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${options.length} options...`}
              className={`w-full pl-11 pr-4 py-3 bg-slate-100 border-2 border-transparent focus:bg-white focus:border-slate-300 rounded-xl text-base outline-none transition-all ${themeStyles.ring}`}
            />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8">

          {/* 1. Smart Suggestions Section */}
          {!searchQuery && suggestionsNormalized.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 px-1">
                <Sparkles className={`w-4 h-4 ${themeStyles.text}`} />
                <span>Suggested for you</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestionsNormalized.map((opt, idx) => (
                  <button
                    key={`suggest-${idx}`}
                    onClick={() => handleSelect(opt.value)}
                    className={`
                      relative group text-left p-4 rounded-xl border-2 transition-all duration-200
                      hover:shadow-md active:scale-[0.98] min-h-[48px]
                      ${currentValue === opt.value
                        ? `${themeStyles.bg} ${themeStyles.border} shadow-sm`
                        : 'bg-white border-slate-200 hover:border-slate-300'}
                    `}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className={`font-medium text-base leading-snug ${currentValue === opt.value ? themeStyles.text : 'text-slate-700'}`}>
                        {opt.value}
                      </span>
                      {currentValue === opt.value && (
                        <div className={`p-1 rounded-full ${themeStyles.btn} text-white flex-shrink-0`}>
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. All Options Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="text-sm font-semibold text-slate-500">
                {searchQuery ? 'Search Results' : 'All Options'}
              </div>
              {/* Toggle to show huge lists if not searching */}
              {!searchQuery && !showAll && filteredOptions.length > 8 && (
                <button
                  onClick={() => setShowAll(true)}
                  className={`text-sm font-medium ${themeStyles.text} hover:underline`}
                >
                  Show all ({filteredOptions.length})
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {(showAll || searchQuery ? filteredOptions : filteredOptions.slice(0, 8)).map((opt, idx) => (
                <button
                  key={`all-${idx}`}
                  onClick={() => handleSelect(opt.value)}
                  className={`
                    text-left px-4 py-3 rounded-lg border transition-colors duration-150
                    flex items-center justify-between group min-h-[48px]
                    ${currentValue === opt.value
                      ? 'bg-slate-100 border-slate-400'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                  `}
                >
                  <span className={`text-sm md:text-base ${currentValue === opt.value ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>
                    {opt.value}
                  </span>
                  {currentValue === opt.value && <Check className="w-4 h-4 text-slate-500" />}
                </button>
              ))}
            </div>

            {!searchQuery && !showAll && filteredOptions.length > 8 && (
              <button
                onClick={() => setShowAll(true)}
                className="w-full py-3 mt-2 text-sm font-medium text-slate-500 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                View {filteredOptions.length - 8} more options...
              </button>
            )}

            {searchQuery && filteredOptions.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-3">
                  <Search className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-slate-900 font-medium">No matches found</h3>
                <p className="text-slate-500 text-sm mt-1">Try a different search term</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer (Desktop Only - Mobile usually relies on top close or selection) */}
        <div className="hidden md:block p-4 border-t bg-slate-50 text-right">
          <button onClick={onClose} className="px-6 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
