import { useEffect, useState } from "react";

export function Typewriter({ texts, speed = 70, pause = 2200 }) {
  const [display, setDisplay] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timer;

    if (!isDeleting && charIndex < currentText.length) {
      timer = setTimeout(() => setCharIndex((value) => value + 1), speed);
    } else if (!isDeleting) {
      timer = setTimeout(() => setIsDeleting(true), pause);
    } else if (charIndex > 0) {
      timer = setTimeout(() => setCharIndex((value) => value - 1), speed / 2);
    } else {
      setIsDeleting(false);
      setTextIndex((value) => (value + 1) % texts.length);
    }

    setDisplay(currentText.slice(0, charIndex));
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, pause, speed, textIndex, texts]);

  return (
    <>
      {display}
      <span className="type-cursor">_</span>
    </>
  );
}
