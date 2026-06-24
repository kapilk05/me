"use client";

import { useEffect, useState } from "react";
import { useWindowStore } from "@/store/window-store";
import { FiPower } from "react-icons/fi";

const APP_TITLE_FALLBACKS: Record<string, string> = {
  blogs: "My Blogs",
  achievements: "Achievements",
  hero: "My Computer",
  about: "About Me",
  projects: "Projects",
  experience: "Experience",
  skills: "Skills",
  resume: "Resume",
  contact: "Contact",
};

export default function Taskbar({ onStart, startOpen }: { onStart: () => void; startOpen: boolean }) {
  const [clock, setClock] = useState("");
  const { windows, focus } = useWindowStore();

  useEffect(() => {
    const tick = () => setClock(new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }).format(new Date()));
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="taskbar fixed bottom-0 left-0 right-0 z-[9999] flex h-10 items-center gap-2 border-t-2 border-white bg-win-gray px-1 text-black shadow-[0_-1px_0_#808080]">
      <button className={`win-button flex h-8 items-center gap-1 px-3 font-bold ${startOpen ? "pressed" : ""}`} onClick={onStart} aria-haspopup="menu">
        <FiPower /> Start
      </button>
      <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
        {windows.map((window) => (
          <button 
            key={window.id} 
            className={`win-button h-8 min-w-32 max-w-44 truncate px-2 text-left ${window.minimized ? "" : "pressed"}`} 
            onClick={() => focus(window.id)}
          >
            {/* FIXED: Uses the store string, but gracefully falls back to safety map if string is blank */}
            {window.title || APP_TITLE_FALLBACKS[window.id] || "Application"}
          </button>
        ))}
      </div>
      <div className="inset-panel h-8 px-3 pt-1 text-sm font-mono flex items-center">{clock}</div>
    </div>
  );
}