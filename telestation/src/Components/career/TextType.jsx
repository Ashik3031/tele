import React, { useEffect, useState } from "react";

/**
 * TextType
 * props:
 *  - text: string[]               // array of phrases to type
 *  - typingSpeed?: number         // ms per character while typing
 *  - pauseDuration?: number       // ms to wait when a phrase is finished
 *  - showCursor?: boolean         // show blinking cursor
 *  - cursorCharacter?: string     // cursor symbol, default: |
 *  - className?: string           // optional extra classes
 */
const TextType = ({
  text = [],
  typingSpeed = 75,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "|",
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0); // which string
  const [charIndex, setCharIndex] = useState(0);       // how many chars shown
  const [isDeleting, setIsDeleting] = useState(false); // typing or deleting

  useEffect(() => {
    if (!text || text.length === 0) return;

    const currentText = text[currentIndex] || "";
    let timeoutId;

    if (!isDeleting) {
      // typing forward
      if (charIndex < currentText.length) {
        timeoutId = setTimeout(
          () => setCharIndex((prev) => prev + 1),
          typingSpeed
        );
      } else {
        // done typing, wait then start deleting
        timeoutId = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    } else {
      // deleting
      if (charIndex > 0) {
        timeoutId = setTimeout(
          () => setCharIndex((prev) => prev - 1),
          typingSpeed * 0.6
        );
      } else {
        // move to next string
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % text.length);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, currentIndex, text, typingSpeed, pauseDuration]);

  if (!text || text.length === 0) return null;

  const currentText = text[currentIndex] || "";
  const displayed = currentText.slice(0, charIndex);

  return (
    <span className={`inline-block ${className}`}>
      {displayed}
      {showCursor && (
        <span className="inline-block ml-1 animate-pulse">
          {cursorCharacter}
        </span>
      )}
    </span>
  );
};

export default TextType;
