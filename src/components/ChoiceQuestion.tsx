import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChoiceQuestion as ChoiceQuestionType } from '../data/questions';

interface Props {
  question: ChoiceQuestionType;
  onAnswer: (correct: boolean) => void;
  disabled: boolean;
}

export default function ChoiceQuestion({ question, onAnswer, disabled }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (answered || disabled) return;
    setSelected(index);
    setAnswered(true);
    onAnswer(index === question.correctIndex);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {question.options.map((option, index) => {
        const isSelected = selected === index;
        const isCorrect = index === question.correctIndex;
        const showResult = answered || disabled;

        let bgClass = 'bg-white/10 border-white/30 hover:bg-white/20 hover:border-white/50 hover:scale-105';
        if (showResult && isCorrect) {
          bgClass = 'bg-green-500/30 border-green-400 scale-105';
        } else if (showResult && isSelected && !isCorrect) {
          bgClass = 'bg-red-500/30 border-red-400';
        }

        return (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={!answered && !disabled ? { scale: 1.05 } : {}}
            whileTap={!answered && !disabled ? { scale: 0.95 } : {}}
            onClick={() => handleSelect(index)}
            disabled={answered || disabled}
            className={`p-4 rounded-2xl border-2 text-white font-bold text-lg transition-all duration-300 ${bgClass} backdrop-blur-sm`}
            style={{ perspective: '500px' }}
          >
            <span className="inline-block mr-2 text-white/50">
              {String.fromCharCode(65 + index)})
            </span>
            {option}
            {showResult && isCorrect && <span className="ml-2">✅</span>}
            {showResult && isSelected && !isCorrect && <span className="ml-2">❌</span>}
          </motion.button>
        );
      })}
    </div>
  );
}
