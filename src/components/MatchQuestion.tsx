import { useState } from 'react';
import { motion } from 'framer-motion';
import { MatchQuestion as MatchQuestionType } from '../data/questions';

interface Props {
  question: MatchQuestionType;
  onAnswer: (correct: boolean) => void;
  disabled: boolean;
}

export default function MatchQuestion({ question, onAnswer, disabled }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [pairs, setPairs] = useState<Map<number, number>>(new Map());
  const [answered, setAnswered] = useState(false);

  const handleLeftClick = (index: number) => {
    if (answered || disabled) return;
    setSelectedLeft(index);
  };

  const handleRightClick = (index: number) => {
    if (answered || disabled || selectedLeft === null) return;
    
    const newPairs = new Map(pairs);
    // Remove any existing pair for this right item
    for (const [key, val] of newPairs.entries()) {
      if (val === index) newPairs.delete(key);
    }
    newPairs.set(selectedLeft, index);
    setPairs(newPairs);
    setSelectedLeft(null);
  };

  const handleSubmit = () => {
    if (pairs.size !== question.leftItems.length) return;
    
    setAnswered(true);
    let allCorrect = true;
    for (const [leftIdx, rightIdx] of question.correctPairs) {
      if (pairs.get(leftIdx) !== rightIdx) {
        allCorrect = false;
        break;
      }
    }
    onAnswer(allCorrect);
  };

  const isPairCorrect = (leftIdx: number) => {
    if (!answered || !pairs.has(leftIdx)) return null;
    const rightIdx = pairs.get(leftIdx)!;
    const correctRight = question.correctPairs.find(p => p[0] === leftIdx)?.[1];
    return rightIdx === correctRight;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Left items */}
        <div className="space-y-2">
          {question.leftItems.map((item, index) => {
            const isSelected = selectedLeft === index;
            const correct = isPairCorrect(index);
            
            let bgClass = 'bg-blue-500/20 border-blue-400/50 hover:bg-blue-500/30';
            if (isSelected) bgClass = 'bg-blue-500/50 border-blue-300 scale-105 shadow-lg shadow-blue-500/30';
            if (answered && correct === true) bgClass = 'bg-green-500/30 border-green-400';
            if (answered && correct === false) bgClass = 'bg-red-500/30 border-red-400';

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleLeftClick(index)}
                disabled={answered || disabled}
                className={`w-full p-3 rounded-xl border-2 text-white font-medium text-sm transition-all ${bgClass}`}
              >
                {item}
                {pairs.has(index) && !answered && (
                  <span className="ml-1 text-xs text-white/60">→</span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Right items */}
        <div className="space-y-2">
          {question.rightItems.map((item, index) => {
            const isMatched = Array.from(pairs.values()).includes(index);
            const matchedLeft = Array.from(pairs.entries()).find(([_, v]) => v === index)?.[0];
            const correct = matchedLeft !== undefined ? isPairCorrect(matchedLeft) : null;

            let bgClass = 'bg-purple-500/20 border-purple-400/50 hover:bg-purple-500/30';
            if (isMatched) bgClass = 'bg-purple-500/40 border-purple-300';
            if (answered && correct === true) bgClass = 'bg-green-500/30 border-green-400';
            if (answered && correct === false) bgClass = 'bg-red-500/30 border-red-400';

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleRightClick(index)}
                disabled={answered || disabled || selectedLeft === null}
                className={`w-full p-3 rounded-xl border-2 text-white font-medium text-sm transition-all ${bgClass} ${
                  selectedLeft !== null ? 'cursor-pointer' : ''
                }`}
              >
                {item}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Submit button */}
      {!answered && !disabled && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={pairs.size !== question.leftItems.length}
          className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
            pairs.size === question.leftItems.length
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/30'
              : 'bg-gray-500/30 cursor-not-allowed'
          }`}
        >
          ✓ Проверить ({pairs.size}/{question.leftItems.length})
        </motion.button>
      )}
    </div>
  );
}
