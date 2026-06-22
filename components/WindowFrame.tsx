"use client";

import Draggable from "react-draggable";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useWindowStore, type WindowState } from "@/store/window-store";

type Props = {
  win: WindowState;
  children: React.ReactNode;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
};

export default function WindowFrame({ win, children, width = 760, height = 520, x = 120, y = 90 }: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const { close, minimize, toggleMaximize, focus } = useWindowStore();
  const style = win.maximized
    ? { left: 8, top: 8, width: "calc(100vw - 16px)", height: "calc(100vh - 48px)" }
    : { width, height };

  if (win.minimized) return null;

  return (
    <Draggable nodeRef={nodeRef} handle=".window-titlebar" defaultPosition={{ x, y }} disabled={win.maximized}>
      <motion.div
        ref={nodeRef}
        className={`win-window fixed flex flex-col ${win.maximized ? "maximized" : ""}`}
        style={{ ...style, zIndex: win.z }}
        role="dialog"
        aria-label={win.title}
        tabIndex={-1}
        onMouseDown={() => focus(win.id)}
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.14 }}
      >
        <div className="window-titlebar flex h-7 select-none items-center justify-between bg-win-title px-2 text-white">
          <div className="flex min-w-0 items-center gap-2">
            <span className="grid h-4 w-4 place-items-center border border-white bg-win-gray text-[10px] text-black">K</span>
            <span className="truncate font-title text-[20px] leading-none">{win.title}</span>
          </div>
          <div className="flex gap-1">
            <button aria-label={`Minimize ${win.title}`} className="win-control" onClick={() => minimize(win.id)}>_</button>
            <button aria-label={`Maximize ${win.title}`} className="win-control" onClick={() => toggleMaximize(win.id)}>□</button>
            <button aria-label={`Close ${win.title}`} className="win-control" onClick={() => close(win.id)}>×</button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto bg-win-panel p-3 text-black">{children}</div>
      </motion.div>
    </Draggable>
  );
}
