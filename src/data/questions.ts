export type QuestionType = 'choice' | 'match' | 'removeExtra' | 'sort';

export interface ChoiceQuestion {
  type: 'choice';
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  topic: string;
}

export interface MatchQuestion {
  type: 'match';
  id: number;
  question: string;
  leftItems: string[];
  rightItems: string[];
  correctPairs: [number, number][]; // [leftIndex, rightIndex]
  topic: string;
}

export interface RemoveExtraQuestion {
  type: 'removeExtra';
  id: number;
  question: string;
  items: string[];
  extraIndex: number;
  explanation: string;
  topic: string;
}

export interface SortQuestion {
  type: 'sort';
  id: number;
  question: string;
  items: string[];
  correctOrder: number[]; // indices in correct order
  topic: string;
}

export type Question = ChoiceQuestion | MatchQuestion | RemoveExtraQuestion | SortQuestion;

export const questions: Question[] = [
  // === ТЕСТОВЫЕ (Choice) - 7 вопросов ===
  {
    type: 'choice',
    id: 1,
    question: 'Раскройте скобки: 3(x + 2)',
    options: ['3x + 6', '3x + 2', 'x + 6', '3x + 5'],
    correctIndex: 0,
    topic: 'Раскрытие скобок'
  },
  {
    type: 'choice',
    id: 2,
    question: 'Раскройте скобки: -(a - 5)',
    options: ['-a - 5', '-a + 5', 'a - 5', 'a + 5'],
    correctIndex: 1,
    topic: 'Раскрытие скобок'
  },
  {
    type: 'choice',
    id: 3,
    question: 'Решите уравнение: x + 7 = 15',
    options: ['x = 22', 'x = 8', 'x = 7', 'x = 9'],
    correctIndex: 1,
    topic: 'Уравнения'
  },
  {
    type: 'choice',
    id: 4,
    question: 'Раскройте скобки: 2(a + b - 3)',
    options: ['2a + b - 3', '2a + 2b - 6', '2a + 2b - 3', 'a + 2b - 6'],
    correctIndex: 1,
    topic: 'Раскрытие скобок'
  },
  {
    type: 'choice',
    id: 5,
    question: 'Решите уравнение: 3x = 21',
    options: ['x = 24', 'x = 18', 'x = 7', 'x = 63'],
    correctIndex: 2,
    topic: 'Уравнения'
  },
  {
    type: 'choice',
    id: 6,
    question: 'Раскройте скобки: -2(x - 4)',
    options: ['-2x - 8', '-2x + 8', '2x - 8', '-2x - 4'],
    correctIndex: 1,
    topic: 'Раскрытие скобок'
  },
  {
    type: 'choice',
    id: 7,
    question: 'Решите уравнение: 2x + 5 = 13',
    options: ['x = 9', 'x = 4', 'x = 3', 'x = 6'],
    correctIndex: 1,
    topic: 'Уравнения'
  },

  // === СОПОСТАВИТЬ (Match) - 5 вопросов ===
  {
    type: 'match',
    id: 8,
    question: 'Сопоставьте выражения с их раскрытым видом:',
    leftItems: ['2(x + 3)', '3(a - 1)', '5(y + 2)', '-(b + 4)'],
    rightItems: ['-b - 4', '5y + 10', '2x + 6', '3a - 3'],
    correctPairs: [[0, 2], [1, 3], [2, 1], [3, 0]],
    topic: 'Раскрытие скобок'
  },
  {
    type: 'match',
    id: 9,
    question: 'Сопоставьте уравнения с их решениями:',
    leftItems: ['x + 10 = 25', '4x = 20', '3x = 27', 'x - 8 = 12'],
    rightItems: ['x = 20', 'x = 5', 'x = 15', 'x = 9'],
    correctPairs: [[0, 2], [1, 1], [2, 3], [3, 0]],
    topic: 'Уравнения'
  },
  {
    type: 'match',
    id: 10,
    question: 'Сопоставьте выражения с результатом:',
    leftItems: ['-(x - 7)', '4(2 + y)', '-3(a + 2)', '2(b - 5)'],
    rightItems: ['-3a - 6', '-x + 7', '2b - 10', '8 + 4y'],
    correctPairs: [[0, 1], [1, 3], [2, 0], [3, 2]],
    topic: 'Раскрытие скобок'
  },
  {
    type: 'match',
    id: 11,
    question: 'Сопоставьте уравнения с корнями:',
    leftItems: ['5x = 35', 'x + 12 = 20', '3x + 1 = 10', 'x - 4 = 16'],
    rightItems: ['x = 20', 'x = 3', 'x = 7', 'x = 8'],
    correctPairs: [[0, 2], [1, 3], [2, 1], [3, 0]],
    topic: 'Уравнения'
  },
  {
    type: 'match',
    id: 12,
    question: 'Сопоставьте выражения с их упрощённым видом:',
    leftItems: ['6(x - 1)', '-2(3 - a)', '4(y + 3)', '-(5 + c)'],
    rightItems: ['-5 - c', '4y + 12', '6x - 6', '-6 + 2a'],
    correctPairs: [[0, 2], [1, 3], [2, 1], [3, 0]],
    topic: 'Раскрытие скобок'
  },

  // === УБРАТЬ ЛИШНЕЕ (RemoveExtra) - 4 вопроса ===
  {
    type: 'removeExtra',
    id: 13,
    question: 'Найдите лишнее выражение (не является раскрытием скобок 2(x + 3)):',
    items: ['2x + 6', '2·x + 2·3', '2x + 5', 'x·2 + 6'],
    extraIndex: 2,
    explanation: '2(x + 3) = 2x + 6. Ответ 2x + 5 неверен!',
    topic: 'Раскрытие скобок'
  },
  {
    type: 'removeExtra',
    id: 14,
    question: 'Какое уравнение НЕ имеет корень x = 5?',
    items: ['x + 3 = 8', '2x = 10', 'x - 5 = 1', '3x = 15'],
    extraIndex: 2,
    explanation: 'x - 5 = 1 → x = 6, а не 5!',
    topic: 'Уравнения'
  },
  {
    type: 'removeExtra',
    id: 15,
    question: 'Найдите лишнее — какое НЕ равно 4a + 8?',
    items: ['4(a + 2)', '4a + 4·2', '4(a + 4)', '4·a + 4·2'],
    extraIndex: 2,
    explanation: '4(a + 4) = 4a + 16, а не 4a + 8!',
    topic: 'Раскрытие скобок'
  },
  {
    type: 'removeExtra',
    id: 16,
    question: 'Какое уравнение лишнее (остальные имеют x = 4)?',
    items: ['x + 6 = 10', '2x = 8', 'x - 4 = 1', '3x = 12'],
    extraIndex: 2,
    explanation: 'x - 4 = 1 → x = 5, а не 4!',
    topic: 'Уравнения'
  },

  // === РАСТАСОВАТЬ (Sort) - 4 вопроса ===
  {
    type: 'sort',
    id: 17,
    question: 'Расставьте шаги решения уравнения x + 5 = 12 в правильном порядке:',
    items: ['Записать: x + 5 = 12', 'Перенести 5 вправо: x = 12 - 5', 'Вычислить: x = 7', 'Ответ: x = 7'],
    correctOrder: [0, 1, 2, 3],
    topic: 'Уравнения'
  },
  {
    type: 'sort',
    id: 18,
    question: 'Расставьте шаги раскрытия скобок 3(x + 4) в правильном порядке:',
    items: ['Записать: 3(x + 4)', 'Умножить 3 на x: 3·x', 'Умножить 3 на 4: 3·4', 'Записать ответ: 3x + 12'],
    correctOrder: [0, 1, 2, 3],
    topic: 'Раскрытие скобок'
  },
  {
    type: 'sort',
    id: 19,
    question: 'Расставьте шаги решения уравнения 2x - 3 = 7:',
    items: ['Записать: 2x - 3 = 7', 'Перенести -3 вправо: 2x = 7 + 3', 'Вычислить: 2x = 10', 'Разделить на 2: x = 5'],
    correctOrder: [0, 1, 2, 3],
    topic: 'Уравнения'
  },
  {
    type: 'sort',
    id: 20,
    question: 'Расставьте шаги раскрытия скобок -2(a - 5):',
    items: ['Записать: -2(a - 5)', 'Умножить -2 на a: -2a', 'Умножить -2 на (-5): +10', 'Записать ответ: -2a + 10'],
    correctOrder: [0, 1, 2, 3],
    topic: 'Раскрытие скобок'
  }
];
