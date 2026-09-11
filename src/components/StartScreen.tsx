import { motion } from 'framer-motion';

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <motion.div
      key="start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4"
    >
      {/* 3D rotating math symbols */}
      <div className="relative mb-8">
        <motion.div
          animate={{ rotateY: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="text-8xl md:text-9xl font-bold"
          style={{ 
            transformStyle: 'preserve-3d',
            textShadow: '0 0 30px rgba(255,255,255,0.5), 0 0 60px rgba(147,51,234,0.5)'
          }}
        >
          <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            3D
          </span>
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -top-4 -right-4 text-4xl"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-2 -left-4 text-3xl"
        >
          🧮
        </motion.div>
      </div>

      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-6xl font-extrabold text-center mb-4"
      >
        <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          Математика
        </span>
      </motion.h1>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xl md:text-2xl text-white/80 text-center mb-2"
      >
        Тренажёр для 5 класса
      </motion.p>

      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-base text-white/60 text-center mb-8"
      >
        Раскрытие скобок • Решение уравнений
      </motion.p>

      {/* Game type cards */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 max-w-2xl w-full"
      >
        {[
          { icon: '🎯', label: 'Тесты', color: 'from-blue-500 to-cyan-400' },
          { icon: '🔗', label: 'Сопоставить', color: 'from-purple-500 to-pink-400' },
          { icon: '🗑️', label: 'Убрать лишнее', color: 'from-orange-500 to-yellow-400' },
          { icon: '📋', label: 'Растасовать', color: 'from-green-500 to-emerald-400' },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1, rotateY: 10 }}
            className={`bg-gradient-to-br ${item.color} rounded-2xl p-4 text-center shadow-lg cursor-default`}
            style={{ perspective: '500px' }}
          >
            <div className="text-3xl mb-1">{item.icon}</div>
            <div className="text-white text-xs font-bold">{item.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      >
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: '0 0 40px rgba(255,255,0,0.5)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-10 py-5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white text-xl md:text-2xl font-extrabold rounded-full shadow-2xl hover:shadow-yellow-500/50 transition-shadow"
        >
          🚀 Начать игру!
        </motion.button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="text-white/50 text-sm mt-6 text-center"
      >
        20 заданий • 4 типа • Проверь свои знания!
      </motion.p>
    </motion.div>
  );
}
