import React, { useState, useEffect } from 'react';
import '../styles/TypedText.css';

type TypedTextProps = {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
};

const TypedText = ({ 
  texts, 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  delayBetweenTexts = 1500 
}: TypedTextProps) => {
  const [textIndex, setTextIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(typingSpeed);

  useEffect(() => {
    const ticker = setTimeout(() => {
      tick();
    }, delta);

    return () => clearTimeout(ticker);
  }, [text, isDeleting, textIndex]);

  const tick = () => {
    const currentIndex = textIndex % texts.length;
    const fullText = texts[currentIndex];

    if (isDeleting) {
      setText(fullText.substring(0, text.length - 1));
      setDelta(deletingSpeed);
    } else {
      setText(fullText.substring(0, text.length + 1));
      setDelta(typingSpeed);
    }

    if (!isDeleting && text === fullText) {
      setDelta(delayBetweenTexts);
      setIsDeleting(true);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setTextIndex(textIndex + 1);
      setDelta(typingSpeed);
    }
  };

  return (
    <div className="typed-text">
      <span>{text}</span>
      <span className="cursor">|</span>
    </div>
  );
};

export default TypedText;