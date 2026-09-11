import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface ResultScreenProps {
  score: number;
  total: number;
  answers: (boolean | null)[];
  onRestart: () => void;
}

export default function ResultScreen({ score, total, answers, onRestart }: ResultScreenProps) {
  const percentage = Math.round((score / total) * 100);
  
  const getGrade = () => {
    if (percentage >= 90) return { emoji: '🏆', text: 'Отлично!', color: 'from-yellow-400 to-orange-500' };
    if (percentage >= 70) return { emoji: '🌟', text: 'Хорошо!', color: 'from-green-400 to-emerald-500' };
    if (percentage >= 50) return { emoji: '👍', text: 'Неплохо!', color: 'from-blue-400 to-cyan-500' };
    return { emoji: '📚', text: 'Нужно подучить!', color: 'from-purple-400 to-pink-500' };
  };

  const grade = getGrade();

  const handleCelebration = () => {
    if (percentage >= 70) {
      const duration = 3000;
      const end = Date.now() + duration;
      const interval = setInterval(() => {
        if (Date.now() > end) return clearInterval(interval);
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00']
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00']
        });
      }, 150);
    }
  };

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-8xl mb-4"
        >
          {grade.emoji}
        </motion.div>

        <h1 className={`text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r ${grade.color} bg-clip-text text-transparent`}>
          {grade.text}
        </h1>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          <div className="text-6xl font-extrabold text-white mb-2">
            {score} / {total}
          </div>
          <div className="text-white/70 text-lg">правильных ответов</div>
          
          {/* Score bar */}
          <div className="mt-4 h-4 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className={`h-full bg-gradient-to-r ${grade.color} rounded-full`}
            />
          </div>
          <div className="text-white/60 mt-2">{percentage}%</div>
        </div>

        {/* Answer summary */}
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-8 max-w-md mx-auto">
          {answers.map((answer, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                answer ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}
            >
              {i + 1}
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            handleCelebration();
            onRestart();
          }}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-purple-500/50"
        >
          🔄 Играть снова
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
