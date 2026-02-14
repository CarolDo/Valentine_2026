'use client';

import { useEffect, useState } from 'react';
import loveConfig from '@/config/loveConfig';
import styles from './Hero.module.css';

type Petal = {
  left: string;
  delay: string;
  duration: string;
};

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Generate petals ONLY on client after mount
    const generatedPetals = Array.from({ length: 12 }).map(() => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${15 + Math.random() * 10}s`,
    }));

    setPetals(generatedPetals);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className={styles.hero}>
      {/* Floating tulip petals */}
      <div className={styles.petals}>
        {petals.map((petal, i) => (
          <div
            key={i}
            className={styles.petal}
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
            }}
          >
            🌷
          </div>
        ))}
      </div>

      {/* Hero content */}
      <div
        className={styles.content}
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className={styles.tulipIcon}>🌷</div>
        <h1 className={styles.headline}>{loveConfig.heroHeadline}</h1>
        <p className={styles.subtext}>{loveConfig.heroSubtext}</p>
        <div className={styles.heartDivider}>
          <span>❤️</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className={styles.scrollHint}
        onClick={scrollToContent}
        aria-label="Scroll to begin"
      >
        <span>Scroll to begin</span>
        <svg
          className={styles.chevron}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  );
}