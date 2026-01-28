import React, { useState } from 'react';
import { questions, cityResults } from './data';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import LoadingScreen from './components/LoadingScreen';
import ResultScreen from './components/ResultScreen';
import styles from './App.module.css';

const PRELOAD_DELAY = 2500; // 2.5s loading

function App() {
  const [stage, setStage] = useState('welcome'); // welcome, quiz, loading, result
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);

  const handleStart = () => {
    setStage('quiz');
  };

  const handleAnswer = (option) => {
    // Update scores
    const newScores = { ...scores };
    if (option.weights) {
      Object.entries(option.weights).forEach(([city, weight]) => {
        newScores[city] = (newScores[city] || 0) + weight;
      });
    }
    setScores(newScores);

    // Navigate
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      finishQuiz(newScores);
    }
  };

  const finishQuiz = (finalScores) => {
    setStage('loading');

    // Calculate winner
    // 1. Find max score
    let maxScore = -1;
    Object.values(finalScores).forEach(score => {
      if (score > maxScore) maxScore = score;
    });

    // 2. Find all cities with max score (Tie handling)
    const winners = Object.keys(finalScores).filter(city => finalScores[city] === maxScore);

    // 3. Randomly pick one if tie
    const winnerCity = winners[Math.floor(Math.random() * winners.length)];

    // 4. Fallback (should not happen if data is correct, but safe)
    const finalCity = winnerCity || '上海';

    setResult(cityResults[finalCity]);

    setTimeout(() => {
      setStage('result');
    }, PRELOAD_DELAY);
  };

  const handleRestart = () => {
    setScores({});
    setCurrentQuestionIndex(0);
    setResult(null);
    setStage('welcome');
  };

  return (
    <div className={styles.app}>
      {stage === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}

      {stage === 'quiz' && (
        <QuizScreen
          question={questions[currentQuestionIndex]}
          currentStep={currentQuestionIndex + 1}
          totalSteps={questions.length}
          onAnswer={handleAnswer}
        />
      )}

      {stage === 'loading' && (
        <LoadingScreen />
      )}

      {stage === 'result' && result && (
        <ResultScreen
          result={result}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
