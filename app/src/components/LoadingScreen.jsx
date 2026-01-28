import React from 'react';
import styles from './LoadingScreen.module.css';

const LoadingScreen = () => {
    return (
        <div className={styles.container}>
            <div className={styles.textWrapper}>
                <p className={styles.text}>正在寻找</p>
                <p className={styles.textMain}>属于你的城市</p>
                <div className={styles.line}></div>
            </div>
        </div>
    );
};

export default LoadingScreen;
