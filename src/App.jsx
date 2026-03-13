import { useCallback, useEffect, useRef, useState } from "react";
import { AboutPage } from "./components/pages/AboutPage";
import { EventsPage } from "./components/pages/EventsPage";
import { GalleryPage } from "./components/pages/GalleryPage";
import { HomePage } from "./components/pages/HomePage";
import { ModulesPage } from "./components/pages/ModulesPage";
import { PartnersPage } from "./components/pages/PartnersPage";
import { EpiloguePage } from "./components/pages/EpiloguePage";

const PAGE_ORDER = ["home", "about", "modules", "events", "partners", "epilogue"];
const LAST_PAGE_KEY = "scaict:last-page";
const RETURN_TO_MAIN_KEY = "scaict:return-to-main";

function getStoredPage() {
  if (typeof window === "undefined") return "home";

  const storedPage = window.sessionStorage.getItem(LAST_PAGE_KEY);
  return PAGE_ORDER.includes(storedPage) ? storedPage : "home";
}

export default function App() {
  const isGalleryRoute = typeof window !== "undefined" && window.location.pathname.startsWith("/gallery/");
  const [booting] = useState(false);
  const [currentPage, setCurrentPage] = useState(getStoredPage);
  const [exitingPage, setExitingPage] = useState(null);
  const [navDir, setNavDir] = useState("forward"); // "forward" | "backward"
  const [flash, setFlash] = useState(false);
  const [visitKeys, setVisitKeys] = useState({ home: 0, about: 0, modules: 0, events: 0, partners: 0, epilogue: 0 });
  const phaseRef = useRef("idle"); // "idle" | "transitioning"

  const navigate = useCallback((nextPage) => {
    if (phaseRef.current !== "idle" || nextPage === currentPage) return;
    phaseRef.current = "transitioning";

    const fromIdx = PAGE_ORDER.indexOf(currentPage);
    const toIdx   = PAGE_ORDER.indexOf(nextPage);
    const dir = toIdx >= fromIdx ? "forward" : "backward";
    setNavDir(dir);
    setFlash(true);
    setExitingPage(currentPage);

    // 舊頁面 exit（380ms）後切入新頁
    setTimeout(() => {
      setExitingPage(null);
      setCurrentPage(nextPage);
      // 每次導航都讓目標頁 remount，確保進場動畫重新執行
      setVisitKeys((prev) => ({ ...prev, [nextPage]: prev[nextPage] + 1 }));
      setTimeout(() => setFlash(false), 180);
      setTimeout(() => { phaseRef.current = "idle"; }, 560);
    }, 380);
  }, [currentPage]);

  // 滾輪換頁（只在頁面滾到頂/底時才換頁）
  useEffect(() => {
    if (booting) return;

    let wheelAccum = 0;
    let wheelTimer = null;

    const handleWheel = (e) => {
      if (phaseRef.current !== "idle") return;

      const el = e.target.closest(".page-view.active");
      const scrollEl = el ?? document.documentElement;
      const atTop    = scrollEl.scrollTop <= 0;
      const atBottom = scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 1;

      const goingDown = e.deltaY > 0;
      const goingUp   = e.deltaY < 0;

      // 只有在邊界時才累積
      if ((goingDown && !atBottom) || (goingUp && !atTop)) {
        wheelAccum = 0;
        return;
      }

      wheelAccum += e.deltaY;
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => { wheelAccum = 0; }, 300);

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

  useEffect(() => {
    if (booting) return;

    let startY = null;
    let startScrollTop = 0;
    let activeScrollEl = null;

    const handleTouchStart = (e) => {
      if (phaseRef.current !== "idle") return;

      const touch = e.touches?.[0];
      if (!touch) return;

      const el = e.target.closest(".page-view.active");
      activeScrollEl = el ?? document.documentElement;
      startY = touch.clientY;
      startScrollTop = activeScrollEl.scrollTop;
    };

    const handleTouchEnd = (e) => {
      if (phaseRef.current !== "idle" || startY === null || !activeScrollEl) {
        startY = null;
        activeScrollEl = null;
        return;
      }

      const touch = e.changedTouches?.[0];
      if (!touch) return;

      const deltaY = touch.clientY - startY;
      const moved = Math.abs(deltaY);
      const currentScrollTop = activeScrollEl.scrollTop;
      const atTop = currentScrollTop <= 0 && startScrollTop <= 0;
      const atBottom =
        currentScrollTop + activeScrollEl.clientHeight >= activeScrollEl.scrollHeight - 1 &&
        startScrollTop + activeScrollEl.clientHeight >= activeScrollEl.scrollHeight - 1;

      startY = null;

      if (moved < 56) {
        activeScrollEl = null;
        return;
      }

      const idx = PAGE_ORDER.indexOf(currentPage);

      if (deltaY < 0 && atBottom && idx < PAGE_ORDER.length - 1) {
        navigate(PAGE_ORDER[idx + 1]);
      } else if (deltaY > 0 && atTop && idx > 0) {
        navigate(PAGE_ORDER[idx - 1]);
      }

      activeScrollEl = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [booting, currentPage, navigate]);

  useEffect(() => {
    if (typeof window === "undefined" || booting) return;
    window.sessionStorage.setItem(LAST_PAGE_KEY, currentPage);
  }, [booting, currentPage]);

  if (isGalleryRoute) {
    return <GalleryPage />;
  }

  return (
    <>
      {!booting && (
        <>
          {currentPage !== "home" && (
            <button type="button" className="home-chip" onClick={() => navigate("home")}>
              SCAICT / HOME
            </button>
          )}

          {flash && <div className="nav-flash" />}

          {PAGE_ORDER.map((id) => {
            const isExiting  = exitingPage === id;
            const isEntering = currentPage === id && exitingPage !== null;
            const isActive   = currentPage === id && exitingPage === null;

            let cls = "page-view";
            if (isExiting)       cls += ` exiting nav-${navDir}`;
            else if (isEntering) cls += ` entering nav-${navDir}`;
            else if (isActive)   cls += " active";

            const pageProps = { isExiting, navDir };

            const pageNode = id === "home"     ? <HomePage     key={visitKeys.home}     onNavigate={navigate} {...pageProps} />
                           : id === "about"    ? <AboutPage    key={visitKeys.about}    {...pageProps} />
                           : id === "modules"  ? <ModulesPage  key={visitKeys.modules}  onNavigate={navigate} {...pageProps} />
                           : id === "events"   ? <EventsPage   key={visitKeys.events}   {...pageProps} />
                           : id === "partners"  ? <PartnersPage key={visitKeys.partners} {...pageProps} />
                           :                     <EpiloguePage key={visitKeys.epilogue} {...pageProps} />;

            return (
              <div key={id} className={cls}>
                {pageNode}
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
