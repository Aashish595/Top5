
'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react'; // Optional: install lucide-react icons



export default function ScrollToTopButton() {
  console.log('Client component: ScrollToTopButton');
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 z-50 bg-primary text-white p-3 rounded-full shadow-lg transition-opacity duration-300 hover:bg-primary/80 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}

