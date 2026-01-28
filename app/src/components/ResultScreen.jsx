import React from 'react';
import styles from './ResultScreen.module.css';

const ResultScreen = ({ result, onRestart }) => {
    // Inject theme color into CSS variable for this component
    const styleVariables = {
        '--c-theme': result.themeColor,
    };

    return (
        <div className={styles.container} style={styleVariables}>
            <div className={styles.contentWrapper}>
                <div className={styles.header}>
                    <span className={styles.brand}>SOUL CITY</span>
                    <span className={styles.date}>2025</span>
                </div>

                <div className={styles.intro}>
                    <span className={styles.introText}>你的天选之城</span>
                </div>

                <div className={styles.cityTitleBlock}>
                    <span className={styles.diamond}>◆</span>
                    <h1 className={styles.cityName}>{result.title}</h1>
                    <span className={styles.diamond}>◆</span>
                </div>

                <h2 className={styles.subtitle}>{result.subtitle}</h2>

                <div className={styles.tags}>
                    {result.tags.map((tag, i) => (
                        <React.Fragment key={i}>
                            <span className={styles.tag}>{tag}</span>
                            {i < result.tags.length - 1 && <span className={styles.dot}>·</span>}
                        </React.Fragment>
                    ))}
                </div>

                <div className={styles.quoteBox}>
                    <p className={styles.quote}>{result.quote}</p>
                </div>

                <button className={styles.restartLink} onClick={onRestart}>
                    再测一次 →
                </button>

                {/* Details Area */}
                <div className={styles.details}>
                    <div className={styles.section}>
                        {result.description.split('\n\n').map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.section}>
                        <p className={styles.lifestyle}>{result.lifestyle}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultScreen;
