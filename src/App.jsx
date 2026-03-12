import { useCallback, useEffect, useRef, useState } from "react";
import { BootScreen } from "./components/boot/BootScreen";
import { AboutPage } from "./components/pages/AboutPage";
import { EventsPage } from "./components/pages/EventsPage";
import { HomePage } from "./components/pages/HomePage";
import { ModulesPage } from "./components/pages/ModulesPage";

const PAGE_ORDER = ["home", "about", "modules", "events"];

export default function App() {
  const [booting, setBooting] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [exitingPage, setExitingPage] = useState(null);
  const phaseRef = useRef("idle"); // "idle" | "transitioning"

  const handleBootDone = useCallback(() => setBooting(false), []);

  const navigate = useCallback((nextPage) => {
    if (phaseRef.current !== "idle" || nextPage === currentPage) return;
    phaseRef.current = "transitioning";

    setExitingPage(currentPage);

    // 舊頁面 exit 動畫跑完後換頁
    setTimeout(() => {
      setExitingPage(null);
      setCurrentPage(nextPage);
      // enter 動畫跑完後回 idle
      setTimeout(() => {
        phaseRef.current = "idle";
      }, 500);
    }, 340);
  }, [currentPage]);

  // 滾輪換頁
  useEffect(() => {
    if (booting) return;

    let wheelAccum = 0;
    let wheelTimer = null;

    const handleWheel = (e) => {
      if (phaseRef.current !== "idle") return;

      wheelAccum += e.deltaY;
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => { wheelAccum = 0; }, 200);

      if (Math.abs(wheelAccum) < 80) return;

      const idx = PAGE_ORDER.indexOf(currentPage);
      if (wheelAccum > 0 && idx < PAGE_ORDER.length - 1) {
        wheelAccum = 0;
        navigate(PAGE_ORDER[idx + 1]);
      } else if (wheelAccum < 0 && idx > 0) {
        wheelAccum = 0;
        navigate(PAGE_ORDER[idx - 1]);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [booting, currentPage, navigate]);

  const pageComponents = {
    home: <HomePage onNavigate={navigate} />,
    about: <AboutPage />,
    modules: <ModulesPage />,
    events: <EventsPage />,
  };

  return (
    <>
      {booting && <BootScreen onDone={handleBootDone} />}

      {!booting && (
        <>
          {currentPage !== "home" && (
            <button type="button" className="home-chip" onClick={() => navigate("home")}>
              SCAICT / HOME
            </button>
          )}

          {PAGE_ORDER.map((id) => {
            const isExiting = exitingPage === id;
            const isEntering = currentPage === id && exitingPage !== null;
            const isActive = currentPage === id && exitingPage === null;

            let cls = "page-view";
            if (isExiting) cls += " exiting";
            else if (isEntering) cls += " entering";
            else if (isActive) cls += " active";

            return (
              <div key={id} className={cls}>
                {pageComponents[id]}
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
