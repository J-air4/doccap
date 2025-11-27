import React, { useState, useEffect } from 'react';
import { Star, Clock } from 'lucide-react';

interface Phrase {
  text: string;
  color: 'blue' | 'yellow' | 'red' | 'green' | 'purple';
}

// Favorite phrases (from the HTML's Phase 3 features)
const FAVORITE_PHRASES: Phrase[] = [
  { text: 'Patient verbalized understanding of techniques', color: 'blue' },
  { text: 'Good progress noted with carryover', color: 'green' },
  { text: 'Required decreased cueing by end of session', color: 'green' },
  { text: 'Patient fatigued easily', color: 'yellow' },
  { text: 'No LOB noted during activity', color: 'green' },
  { text: 'Demonstrated improved control', color: 'green' },
  { text: 'Patient tolerated activity well', color: 'blue' },
  { text: 'Continue current POC', color: 'purple' },
];

const COLOR_STYLES = {
  blue: { bg: '#e3f2fd', border: '#90caf9' },
  yellow: { bg: '#fff9c4', border: '#fff176' },
  red: { bg: '#ffebee', border: '#ef9a9a' },
  green: { bg: '#e8f5e9', border: '#a5d6a7' },
  purple: { bg: '#f3e5f5', border: '#ce93d8' },
};

interface PhraseButtonsProps {
  onInsert: (phrase: string) => void;
}

export default function PhraseButtons({ onInsert }: PhraseButtonsProps) {
  const [recentPhrases, setRecentPhrases] = useState<string[]>([]);

  // Load recent phrases from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recent-phrases');
    if (saved) {
      setRecentPhrases(JSON.parse(saved));
    }
  }, []);

  const handlePhraseClick = (phrase: string) => {
    onInsert(phrase);
    
    // Add to recent phrases
    const updated = [phrase, ...recentPhrases.filter(p => p !== phrase)].slice(0, 6);
    setRecentPhrases(updated);
    localStorage.setItem('recent-phrases', JSON.stringify(updated));
  };

  return (
    <div className="app-window">
      <div className="window-title-bar">
        <span>⚡ Quick Access Phrases</span>
      </div>
      <div className="p-4">
        
        {/* Favorites Section */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-600 mb-2">
            <Star className="w-3 h-3" />
            <span>FAVORITES</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {FAVORITE_PHRASES.map((phrase, idx) => {
              const colors = COLOR_STYLES[phrase.color];
              return (
                <button
                  key={idx}
                  onClick={() => handlePhraseClick(phrase.text)}
                  className="phrase-btn phrase-btn-favorite"
                  style={{
                    backgroundColor: colors.bg,
                    borderColor: colors.border,
                  }}
                >
                  {phrase.text}
                </button>
              );
            })}
          </div>
        </div>

        {/* Recently Used Section */}
        {recentPhrases.length > 0 && (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-600 mb-2">
              <Clock className="w-3 h-3" />
              <span>RECENTLY USED</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {recentPhrases.map((phrase, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePhraseClick(phrase)}
                  className="phrase-btn phrase-btn-recent"
                >
                  {phrase}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
