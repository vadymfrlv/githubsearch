import { useState, useEffect } from 'react';

export const useScrollUp = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrolledHeight = window.scrollY;
    const windowHeight = window.innerHeight;

    const isScrolled = scrolledHeight > 0;
    const hasContentToScroll = document.documentElement.scrollHeight > windowHeight;

    setShowScrollButton(isScrolled && hasContentToScroll);
  };

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return { showScrollButton, scrollUp };
};
