import { useEffect, useRef, useState } from "react";
import { BOOT_ASCII, BOOT_SEQUENCE } from "../../constants/boot";
import mascotFallback from "../../assets/mascot.svg";
import mascotImage from "../../../uwu.png";

export function BootScreen({ onDone }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("INITIALIZING");
  const [exiting, setExiting] = useState(false);
  const logRef = useRef(null);

  useEffect(() => {
    const timers = BOOT_SEQUENCE.map((line, index) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, { ...line, key: index }]);

        const percentage = Math.round((index / (BOOT_SEQUENCE.length - 1)) * 100);
        setProgress(percentage);

        if (percentage < 30) setProgressLabel("LOADING KERNEL");
        else if (percentage < 60) setProgressLabel("STARTING SERVICES");
        else if (percentage < 90) setProgressLabel("LAUNCHING INTERFACE");
        else setProgressLabel("READY");
      }, line.delay)
    );

    const lastDelay = BOOT_SEQUENCE.at(-1).delay;
    timers.push(setTimeout(() => setExiting(true), lastDelay + 500));
    timers.push(setTimeout(() => onDone(), lastDelay + 1100));

    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [visibleLines]);

  return (
    <div className={`boot-screen${exiting ? " boot-exit" : ""}`}>
      <div className="boot-left" ref={logRef}>
        {visibleLines.map((line) => (
          <div key={line.key} className={`boot-log-line ${line.cls}`}>
            {line.text || "\u00a0"}
          </div>
        ))}
        <div className="boot-log-line boot-log-prompt boot-caret">█</div>
      </div>

      <div className="boot-right">
        <pre className="boot-logo-ascii">{BOOT_ASCII}</pre>
        <img
          src={mascotImage}
          alt="SCAICT Mascot"
          className="boot-mascot"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = mascotFallback;
          }}
        />
        <div className="boot-tagline">STUDENT COMPUTING COLLECTIVE</div>

        <div className="boot-progress-wrap">
          <div className="boot-progress-bar">
            <div className="boot-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="boot-progress-label">
            {progressLabel} · {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}
