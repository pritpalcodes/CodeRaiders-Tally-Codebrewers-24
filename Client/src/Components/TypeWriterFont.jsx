// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';

const TypeWriterEffect = () => {
  const phrases = [
    " Code!", 
    " Compete!", 
    " Conquer!", 
    " Contest!", 
    " Learn!", 
    " Grow!", 
    " Challenge!", 
    " Experiment!", 
    " Iterate!", 
    " Succeed!"
  ];
  
  const [displayedText, setDisplayedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [delay, setDelay] = useState(200);

  useEffect(() => {
    const handleTyping = () => {
      if (!deleting && charIndex < phrases[phraseIndex].length) {
        setDisplayedText(prev => prev + phrases[phraseIndex][charIndex]);
        setCharIndex(prev => prev + 1);
        setDelay(200);
      } else if (deleting && charIndex > 0) {
        setDisplayedText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
        setDelay(100);
      } else if (!deleting && charIndex === phrases[phraseIndex].length) {
        setDeleting(true);
        setDelay(1000);
      } else if (deleting && charIndex === 0) {
        setDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setDelay(500);
      }
    };

    const typingInterval = setTimeout(handleTyping, delay);
    return () => clearTimeout(typingInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, deleting, delay, phraseIndex]);

  return (
    <h2 className="text-[#FFFFFF]">
      Your one-stop solution to ...<span className="p-2 text-[#00FF00]">{displayedText}</span>
    </h2>
  );
};

export default TypeWriterEffect;
