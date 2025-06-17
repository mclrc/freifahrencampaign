'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CountingAnimation.module.css';

const formatNumber = (number: number, prefix?: string, postfix?: string, abbreviate?: boolean) => {
  if (abbreviate) {
    const abbreviations = ['', 'K', 'M', 'B', 'T'];
    const abbreviationIndex = Math.floor(Math.log10(number) / 3);
    const abbreviatedNumber = number / Math.pow(10, abbreviationIndex * 3);
    return `${prefix}${abbreviatedNumber.toFixed(1)}${abbreviations[abbreviationIndex]}${postfix}`;
  }
  return `${prefix}${number.toLocaleString()}${postfix}`;
};

interface CountingAnimationProps {
  targetNumber: number;
  prefix?: string;
  postfix?: string;
  abbreviate?: boolean;
  duration?: number;
  topText: string;
  bottomText: string;
}

const CountingAnimation: React.FC<CountingAnimationProps> = ({
  targetNumber,
  prefix = '',
  postfix = '',
  abbreviate = false,
  duration = 2000,
  topText,
  bottomText,
}) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const animationFrameId = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startTime.current = null;
          animationFrameId.current = requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }
    
    const animate = (timestamp: number) => {
      if (!startTime.current) {
        startTime.current = timestamp;
      }

      const elapsedTime = timestamp - startTime.current;
      const progress = Math.min(elapsedTime / duration, 1);
      const value = Math.floor(progress * targetNumber);

      setCurrentNumber(value);

      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (nodeRef.current) {
        observer.unobserve(nodeRef.current);
      }
    };
  }, [targetNumber, duration]);

  return (
    <div className={styles.container} ref={nodeRef}>
      <div className={styles.topText}>{topText}</div>
      <div className={styles.number}>
        {formatNumber(currentNumber, prefix, postfix, abbreviate)}
      </div>
      <div className={styles.bottomText}>{bottomText}</div>
    </div>
  );
};

export default CountingAnimation;
