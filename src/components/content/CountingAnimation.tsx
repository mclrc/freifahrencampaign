'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './CountingAnimation.module.css';

interface CountingAnimationProps {
  targetNumber: number;
  postfix?: string;
  duration?: number;
  subtitle: string;
}

const CountingAnimation: React.FC<CountingAnimationProps> = ({
  targetNumber,
  postfix = '',
  duration = 2000,
  subtitle,
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
      <div className={styles.number}>
        {currentNumber.toLocaleString()}
        {postfix}
      </div>
      <div className={styles.subtitle}>{subtitle}</div>
    </div>
  );
};

export default CountingAnimation;
