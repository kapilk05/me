"use client";

import Draggable, { type DraggableData, type DraggableEvent } from "react-draggable";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useWindowStore, type WindowState } from "@/store/window-store";

type Props = {
  win: WindowState;
  children: React.ReactNode;
  width?: number;
  height?: number;
};

// UPDATED: Increased global default sizing from 760x520 to 920x600 for a wider aspect ratio
export default function WindowFrame({ win, children, width = 920, height = 600 }: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const { close, minimize, toggleMaximize, focus, windows } = useWindowStore();
  
  // Track window coordinates persistently across states (minimize, drag, maximize)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isCalculated, setIsCalculated] = useState(false);

  // 1. Dynamic Center Calculation, Viewport Clamping, & Multi-Window Offsets
  useEffect(() => {
    if (typeof window === "undefined" || win.minimized || isCalculated) return;

    const TASKBAR_HEIGHT = 48; // Standard taskbar margin boundary
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight - TASKBAR_HEIGHT;

    // Automatically restrict structural width/height variables on smaller viewports
    const targetWidth = Math.min(width, viewportWidth);
    const targetHeight = Math.min(height, viewportHeight);

    // Baseline centered coordinates calculation
    let targetX = Math.max(0, (viewportWidth - targetWidth) / 2);
    let targetY = Math.max(0, (viewportHeight - targetHeight) / 2);

    // Smart Multi-Window Behavior: Cascade matching instances open concurrently
    const matchingWindows = windows.filter(
      (w) => !w.minimized && w.id !== win.id && w.title === win.title
    );

    if (matchingWindows.length > 0) {
      const offsetFactor = 30 * matchingWindows.length;
      const prospectiveX = targetX + offsetFactor;
      const prospectiveY = targetY + offsetFactor;

      // Apply cascade offsets only if the shifted window stays completely inside bounds
      if (prospectiveX + targetWidth <= viewportWidth) targetX = prospectiveX;
      if (prospectiveY + targetHeight <= viewportHeight) targetY = prospectiveY;
    }

    setPosition({ x: targetX, y: targetY });
    setIsCalculated(true);
  }, [win.id, win.title, width, height, windows, win.minimized, isCalculated]);

  // 2. Window Focus & Keyboard Management Controls
  useEffect(() => {
    if (isCalculated && nodeRef.current) {
      nodeRef.current.focus();
    }
  }, [isCalculated]);

  // Capture position coordinates upon drag completion to preserve its placement
  const handleDragStop = (_e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  if (win.minimized || !isCalculated) return null;

  // Responsive styling calculation
  const calculatedStyle = win.maximized
    ? { left: 8, top: 8, width: "calc(100vw - 16px)", height: "calc(100vh - 48px)" }
    : { 
        left: 0,
        top: 0,
        width: Math.min(width, typeof window !== "undefined" ? window.innerWidth : width), 
        height: Math.min(height, typeof window !== "undefined" ? window.innerHeight - 48 : height) 
      };

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".window-titlebar"
      position={win.maximized ? { x: 0, y: 0 } : position}
      onStop={handleDragStop}
      disabled={win.maximized}
    >
      <motion.div
        ref={nodeRef}
        className={`win-window fixed flex flex-col outline-none ${win.maximized ? "maximized" : ""}`}
        style={{ ...calculatedStyle, zIndex: win.z }}
        role="dialog"
        aria-label={win.title}
        tabIndex={0} // Allows explicit element key focus interception
        onMouseDown={() => focus(win.id)}
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.14 }}
      >
        <div className="window-titlebar flex h-7 select-none items-center justify-between bg-win-title px-2 text-white cursor-default">
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
