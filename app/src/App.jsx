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

    // 稀有度系数：平衡各城市出场概率
    // 基于多轮模拟迭代调整 v3
    // 原始分布: 成都27.1%, 杭州21.9%, 上海18.6%, 厦门13.5%, 南京5.9%, 重庆4.1%, 大理3.0%, 长沙2.5%, 西安1.8%, 北京1.6%
    // v2结果: 北京20.9%, 大理20.3%, 成都2.4% - 还需微调
    const rarityCoefficient = {
      成都: 0.92,   // v2得到2.4% → 提升
      杭州: 0.93,   // v2得到5.0% → 略微提升
      上海: 0.94,   // v2得到4.0% → 略微提升
      厦门: 0.96,   // v2得到3.7% → 略微提升
      南京: 1.05,   // v2得到7.6% → 保持
      重庆: 1.12,   // v2得到11.7% → 略微降低
      大理: 1.10,   // v2得到20.3% → 降低
      长沙: 1.18,   // v2得到13.9% → 略微降低
      西安: 1.22,   // v2得到10.5% → 略微降低
      北京: 1.20,   // v2得到20.9% → 降低
    };

    // 应用稀有度系数
    const adjustedScores = {};
    Object.entries(finalScores).forEach(([city, score]) => {
      adjustedScores[city] = score * (rarityCoefficient[city] || 1.0);
    });

    // Calculate winner
    // 1. Find max score
    let maxScore = -1;
    Object.values(adjustedScores).forEach(score => {
      if (score > maxScore) maxScore = score;
    });

    // 2. Find all cities with max score (Tie handling)
    const winners = Object.keys(adjustedScores).filter(city => adjustedScores[city] === maxScore);

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
