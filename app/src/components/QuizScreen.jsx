import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './QuizScreen.module.css';

const QuizScreen = ({ question, currentStep, totalSteps, onAnswer }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    // Reset local state when question changes
    useEffect(() => {
        setSelectedOption(null);
    }, [question.id]);

    const handleOptionClick = (option) => {
        if (selectedOption) return; // Lock input
        setSelectedOption(option.label);

        setTimeout(() => {
            onAnswer(option);
        }, 350);
    };

    // Progress percentage
    const progress = ((currentStep) / totalSteps) * 100;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.progressText}>
                    <span className={styles.current}>{String(currentStep).padStart(2, '0')}</span>
                    <span className={styles.divider}>/</span>
                    <span className={styles.total}>{totalSteps}</span>
                </div>
                <div className={styles.progressBarBg}>
                    <div
                        className={styles.progressBarFill}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className={styles.content}>
                <div key={question.id} className={styles.questionWrapper}>
                    <h2 className={styles.questionText}>{question.text}</h2>

                    <div className={styles.optionsList}>
                        {question.options.map((option) => (
                            <button
                                key={option.label}
                                className={classNames(styles.optionButton, {
                                    [styles.selected]: selectedOption === option.label,
                                })}
                                onClick={() => handleOptionClick(option)}
                                disabled={!!selectedOption}
                            >
                                <span className={styles.optionLabel}>{option.label}</span>
                                <span className={styles.optionText}>{option.text}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizScreen;
