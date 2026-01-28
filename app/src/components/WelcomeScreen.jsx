import React from 'react';
import styles from './WelcomeScreen.module.css';

const WelcomeScreen = ({ onStart }) => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.issueNumber}>VOL.01</span>
                    <span className={styles.date}>2025 EDITION</span>
                </div>

                <h1 className={styles.title}>
                    <span className={styles.titleSmall}>你的灵魂</span>
                    <br />
                    <span className={styles.titleBig}>属于哪座</span>
                    <br />
                    <span className={styles.titleBig}>城市？</span>
                </h1>

                <div className={styles.divider}></div>

                <p className={styles.subtitle}>
                    30道生活场景题<br />找到最懂你的那座城
                </p>

                <div className={styles.visualElement}>
                    <div className={styles.circle}></div>
                    <div className={styles.line}></div>
                </div>

                <button className={styles.startButton} onClick={onStart}>
                    <span className={styles.buttonText}>开始测试</span>
                    <span className={styles.buttonArrow}>→</span>
                </button>
            </div>

            <div className={styles.footer}>
                <p>City Soul Match Test</p>
            </div>
        </div>
    );
};

export default WelcomeScreen;
