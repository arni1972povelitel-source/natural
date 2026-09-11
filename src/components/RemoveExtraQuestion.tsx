import { useState } from 'react';
import { motion } from 'framer-motion';
import { RemoveExtraQuestion as RemoveExtraQuestionType } from '../data/questions';

interface Props {
  question: RemoveExtraQuestionType;
  onAnswer: (correct: boolean) => void;
  disabled: boolean;
}

export default function RemoveExtraQuestion({ question, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (answered || disabled) return;
    setSelected(index);
    setAnswered(true);
    onAnswer(index === question.extraIndex);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {question.items.map((item, index) => {
          const isSelected = selected === index;
          const isExtra = index === question.extraIndex;
          const showResult = answered || disabled;

          let bgClass = 'bg-white/10 border-white/30 hover:bg-orange-500/20 hover:border-orange-400 hover:scale-105';
          if (showResult && isExtra) {
            bgClass = 'bg-red-500/30 border-red-400 scale-105';
          } else if (showResult && isSelected && !isExtra) {
            bgClass = 'bg-yellow-500/30 border-yellow-400';
          }

          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              whileHover={!answered && !disabled ? { scale: 1.05, rotateZ: 2 } : {}}
              whileTap={!answered && !disabled ? { scale: 0.9 } : {}}
              onClick={() => handleSelect(index)}
              disabled={answered || disabled}
              className={`p-4 rounded-2xl border-2 text-white font-bold text-base transition-all duration-300 ${bgClass} backdrop-blur-sm`}
            >
              <span className="block text-2xl mb-1">
                {showResult && isExtra ? '🗑️' : '📝'}
              </span>
              {item}
              {showResult && isExtra && (
                <span className="block text-xs mt-1 text-red-300">← Лишнее!</span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      {(answered || disabled) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-500/20 border border-yellow-400/50 rounded-xl p-4 text-center"
        >
          <p className="text-yellow-200 font-medium text-sm">💡 {question.explanation}</p>
        </motion.div>
      )}
    </div>
  );
}
