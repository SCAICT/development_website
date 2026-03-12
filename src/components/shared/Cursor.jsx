import { useEffect, useRef } from "react";

export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const frame = useRef(null);

  useEffect(() => {
    const handleMove = (event) => {
      pos.current = { x: event.clientX, y: event.clientY };
    };

    const handleOver = (event) => {
      const el = event.target.closest("a, button, [role='button'], [tabindex]");
      ring.current?.classList.toggle("cursor-hover", !!el);
      if (dot.current) {
        dot.current.textContent = el ? "OPEN" : "SCAICT";
      }
    };

    const tick = () => {
      if (dot.current) {
        dot.current.style.left = `${pos.current.x}px`;
        dot.current.style.top = `${pos.current.y}px`;
      }

      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.13;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.13;

      if (ring.current) {
        ring.current.style.left = `${ringPos.current.x}px`;
        ring.current.style.top = `${ringPos.current.y}px`;
      }

      frame.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    if (dot.current) {
      dot.current.textContent = "SCAICT";
    }
    frame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dot} />
      <div id="cursor-ring" ref={ring} />
    </>
  );
}
