'use client';
import { useEffect, useRef, useState } from 'react';

const ScrollAnimation = ({ children, animation = 'fade-up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const animationClasses = {
    'fade-up': 'opacity-0 translate-y-10 transition-all duration-1000 ease-out',
    'fade-in': 'opacity-0 transition-opacity duration-1000 ease-out',
    'slide-in': 'opacity-0 -translate-x-full transition-all duration-1000 ease-out',
  };

  return (
    <div
      ref={ref}
      className={`${animationClasses[animation]} ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0' : ''
      }`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;