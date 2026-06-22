"use client";

import { useEffect, useState } from "react";
import { useWindowStore } from "@/store/window-store";
import { FiPower } from "react-icons/fi";

export default function Taskbar({ onStart, startOpen }: { onStart: () => void; startOpen: boolean }) {
  const [clock, setClock] = useState("");
  const { windows, focus } = useWindowStore();

  useEffect(() => {
    const tick = () => setClock(new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit" }).format(new Date()));
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] flex h-10 items-center gap-2 border-t-2 border-white bg-win-gray px-1 text-black shadow-[0_-1px_0_#808080]">
      <button className={`win-button flex h-8 items-center gap-1 px-3 font-bold ${startOpen ? "pressed" : ""}`} onClick={onStart} aria-haspopup="menu">
        <FiPower /> Start
      </button>
      <div className="flex min-w-0 flex-1 gap-1 overflow-x-auto">
        {windows.map((window) => (
          <button key={window.id} className={`win-button h-8 min-w-32 truncate px-2 text-left ${window.minimized ? "" : "pressed"}`} onClick={() => focus(window.id)}>
            {window.title}
          </button>
        ))}
      </div>
      <div className="inset-panel h-8 px-3 pt-1 text-sm">{clock}</div>
    </div>
  );
}
