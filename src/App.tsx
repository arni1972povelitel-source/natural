import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { questions, Question } from './data/questions';
import ChoiceQuestion from './components/ChoiceQuestion';
import MatchQuestion from './components/MatchQuestion';
import RemoveExtraQuestion from './components/RemoveExtraQuestion';
import SortQuestion from './components/SortQuestion';
import StartScreen from './components/StartScreen';
import ResultScreen from './components/ResultScreen';

type GameState = 'start' | 'playing' | 'result';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(questions.length).fill(null));
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setAnswers(Array(questions.length).fill(null));
    setShowFeedback(false);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
    });
  };

  const handleAnswer = useCallback((correct: boolean) => {
    setIsCorrect(correct);
    setShowFeedback(true);
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = correct;
    setAnswers(newAnswers);
    
    if (correct) {
      setScore(prev => prev + 1);
      triggerConfetti();
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setGameState('result');
        if (score + (correct ? 1 : 0) >= 15) {
          confetti({
            particleCount: 300,
            spread: 120,
            origin: { y: 0.5 }
          });
        }
      }
    }, 2000);
  }, [currentQuestion, answers, score]);

  const currentQ = questions[currentQuestion];

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'choice': return '🎯 Тест';
      case 'match': return '🔗 Сопоставить';
      case 'removeExtra': return '🗑️ Убрать лишнее';
      case 'sort': return '📋 Растасовать';
      default: return '';
    }
  };

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'choice': return 'from-blue-500 to-cyan-400';
      case 'match': return 'from-purple-500 to-pink-400';
      case 'removeExtra': return 'from-orange-500 to-yellow-400';
      case 'sort': return 'from-green-500 to-emerald-400';
      default: return 'from-gray-500 to-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              rotate: 0
            }}
            animate={{ 
              y: [null, Math.random() * window.innerHeight],
              rotate: 360
            }}
            transition={{ 
              duration: 15 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {['📐', '✏️', '🔢', '📊', '🧮', '💡', '⭐', '🎓'][i % 8]}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <StartScreen key="start" onStart={startGame} />
        )}

        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4"
          >
            {/* Progress bar */}
            <div className="w-full max-w-2xl mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/80 text-sm font-medium">
                  Задание {currentQuestion + 1} из {questions.length}
                </span>
                <span className="text-white/80 text-sm font-medium">
                  ⭐ {score} очков
                </span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Question type badge */}
            <motion.div
              key={currentQ.id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className={`mb-4 px-4 py-2 rounded-full bg-gradient-to-r ${getQuestionTypeColor(currentQ.type)} text-white font-bold text-sm shadow-lg`}
            >
              {getQuestionTypeLabel(currentQ.type)} • {currentQ.topic}
            </motion.div>

            {/* Question card with 3D effect */}
            <motion.div
              key={`card-${currentQ.id}`}
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              className="w-full max-w-2xl"
              style={{ perspective: '1000px' }}
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/20 shadow-2xl transform-gpu hover:shadow-purple-500/20">
                <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-6 leading-relaxed">
                  {currentQ.question}
                </h2>

                {/* Render question based on type */}
                {currentQ.type === 'choice' && (
                  <ChoiceQuestion question={currentQ} onAnswer={handleAnswer} disabled={showFeedback} />
                )}
                {currentQ.type === 'match' && (
                  <MatchQuestion question={currentQ} onAnswer={handleAnswer} disabled={showFeedback} />
                )}
                {currentQ.type === 'removeExtra' && (
                  <RemoveExtraQuestion question={currentQ} onAnswer={handleAnswer} disabled={showFeedback} />
                )}
                {currentQ.type === 'sort' && (
                  <SortQuestion question={currentQ} onAnswer={handleAnswer} disabled={showFeedback} />
                )}
              </div>
            </motion.div>

            {/* Feedback overlay */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none`}
                >
                  <div className={`text-center p-8 rounded-3xl ${isCorrect ? 'bg-green-500/90' : 'bg-red-500/90'} backdrop-blur-lg shadow-2xl`}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.5, 1] }}
                      transition={{ duration: 0.5 }}
                      className="text-6xl mb-4"
                    >
                      {isCorrect ? '🎉' : '😔'}
                    </motion.div>
                    <p className="text-white text-2xl font-bold">
                      {isCorrect ? 'Правильно!' : 'Неправильно'}
                    </p>
                    {isCorrect && <p className="text-white/80 mt-2">+1 очко</p>}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {gameState === 'result' && (
          <ResultScreen 
            key="result" 
            score={score} 
            total={questions.length} 
            answers={answers}
            onRestart={startGame} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
