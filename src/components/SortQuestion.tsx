import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SortQuestion as SortQuestionType } from '../data/questions';

interface Props {
  question: SortQuestionType;
  onAnswer: (correct: boolean) => void;
  disabled: boolean;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function SortQuestion({ question, onAnswer, disabled }: Props) {
  const [items, setItems] = useState<{ text: string; originalIdx: number }[]>([]);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [selectedForSwap, setSelectedForSwap] = useState<number | null>(null);

  useEffect(() => {
    // Shuffle items on mount
    const shuffledIndices = shuffleArray(question.items.map((_, idx) => idx));
    setItems(shuffledIndices.map(idx => ({ text: question.items[idx], originalIdx: idx })));
  }, [question]);

  const handleDragStart = (idx: number) => {
    if (answered || disabled) return;
    setDraggedIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === idx || answered || disabled) return;
    
    const newItems = [...items];
    const draggedItem = newItems[draggedIdx];
    newItems.splice(draggedIdx, 1);
    newItems.splice(idx, 0, draggedItem);
    setItems(newItems);
    setDraggedIdx(idx);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
  };

  const handleClick = (idx: number) => {
    if (answered || disabled) return;
    
    if (selectedForSwap === null) {
      setSelectedForSwap(idx);
    } else if (selectedForSwap === idx) {
      setSelectedForSwap(null);
    } else {
      const newItems = [...items];
      const temp = newItems[selectedForSwap];
      newItems[selectedForSwap] = newItems[idx];
      newItems[idx] = temp;
      setItems(newItems);
      setSelectedForSwap(null);
    }
  };

  const handleSubmit = () => {
    if (answered || disabled) return;
    setAnswered(true);
    
    const isCorrect = items.every((item, idx) => item.originalIdx === question.correctOrder[idx]);
    onAnswer(isCorrect);
  };

  const getItemStatus = (idx: number) => {
    if (!answered) return null;
    return items[idx].originalIdx === question.correctOrder[idx];
  };

  if (items.length === 0) return null;

  return (
    <div className="space-y-4">
      <p className="text-white/60 text-xs text-center mb-2">
        💡 Нажмите на два элемента, чтобы поменять их местами (или перетащите)
      </p>
      
      <div className="space-y-2">
        {items.map((item, idx) => {
          const status = getItemStatus(idx);
          const isDragging = draggedIdx === idx;
          const isSelected = selectedForSwap === idx;

          let bgClass = 'bg-white/10 border-white/30';
          if (isSelected) bgClass = 'bg-green-500/30 border-green-400 scale-105 shadow-lg shadow-green-500/20';
          if (status === true) bgClass = 'bg-green-500/30 border-green-400';
          if (status === false) bgClass = 'bg-red-500/30 border-red-400';

          return (
            <motion.div
              key={`${item.originalIdx}-${idx}`}
              layout
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0, scale: isSelected ? 1.05 : 1 }}
              transition={{ delay: idx * 0.05, type: 'spring', stiffness: 300 }}
              draggable={!answered && !disabled}
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragEnd={handleDragEnd}
              onClick={() => handleClick(idx)}
              className={`p-3 rounded-xl border-2 text-white font-medium text-sm transition-all cursor-grab active:cursor-grabbing ${bgClass} ${
                isDragging ? 'opacity-50' : ''
              } ${!answered && !disabled ? 'hover:bg-white/20 hover:scale-[1.02]' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  isSelected ? 'bg-green-400 text-green-900' : 'bg-white/20'
                }`}>
                  {idx + 1}
                </span>
                <span className="flex-1">{item.text}</span>
                {status === true && <span>✅</span>}
                {status === false && <span>❌</span>}
              </div>
            </motion.div>
          );
        })}
      </div>

      {!answered && !disabled && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg hover:shadow-green-500/30 transition-all"
        >
          ✓ Проверить порядок
        </motion.button>
      )}
    </div>
  );
}
