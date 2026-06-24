"use client";

import Draggable, { type DraggableData, type DraggableEvent } from "react-draggable";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Resizable } from "re-resizable"; 
import { useWindowStore, type WindowState } from "@/store/window-store";

type Props = {
  win: WindowState;
  children: React.ReactNode;
  width?: number;
  height?: number;
};

export default function WindowFrame({ win, children, width = 920, height = 600 }: Props) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const { close, minimize, toggleMaximize, focus, windows } = useWindowStore();
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isCalculated, setIsCalculated] = useState(false);
  
  // RESTORED: Baseline dimensions initialization now stays true to individual default app overrides
  const [dimensions, setDimensions] = useState({ width, height });

  // 1. Dynamic Center Calculation, Viewport Clamping, & Multi-Window Offsets
  useEffect(() => {
    if (typeof window === "undefined" || win.minimized || isCalculated) return;

    const TASKBAR_HEIGHT = 48;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight - TASKBAR_HEIGHT;

    // Use specific application width/height configurations passed down via props
    const targetWidth = Math.min(width, viewportWidth);
    const targetHeight = Math.min(height, viewportHeight);

    let targetX = Math.max(0, (viewportWidth - targetWidth) / 2);
    let targetY = Math.max(0, (viewportHeight - targetHeight) / 2);

    const matchingWindows = windows.filter(
      (w) => !w.minimized && w.id !== win.id && w.title === win.title
    );

    if (matchingWindows.length > 0) {
      const offsetFactor = 30 * matchingWindows.length;
      const prospectiveX = targetX + offsetFactor;
      const prospectiveY = targetY + offsetFactor;

      if (prospectiveX + targetWidth <= viewportWidth) targetX = prospectiveX;
      if (prospectiveY + targetHeight <= viewportHeight) targetY = prospectiveY;
    }

    setPosition({ x: targetX, y: targetY });
    setDimensions({ width: targetWidth, height: targetHeight }); // Keeps sizes bounded
    setIsCalculated(true);
  }, [win.id, win.title, width, height, windows, win.minimized, isCalculated]);

  // 2. Window Focus Management Controls
  useEffect(() => {
    if (isCalculated && nodeRef.current) {
      nodeRef.current.focus();
    }
  }, [isCalculated]);

  // FIXED: Removed the old "handleClickOutside" click listener block to prevent target background windows from minimizing.

  const handleDragStop = (_e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  if (win.minimized || !isCalculated) return null;

  // Responsive styling properties configurations
  const calculatedStyle = win.maximized
    ? { left: 8, top: 8, width: "calc(100vw - 16px)", height: "calc(100vh - 48px)" }
    : { 
        left: position.x,
        top: position.y,
        width: dimensions.width, 
        height: dimensions.height 
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
        tabIndex={0}
        onMouseDown={() => focus(win.id)}
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.14 }}
      >
        {/* Resizable wrapper sits INSIDE motion.div, preventing transform styling conflicts */}
        <Resizable
          size={win.maximized ? { width: "100%", height: "100%" } : { width: dimensions.width, height: dimensions.height }}
          minWidth={280}
          minHeight={200}
          enable={{
                    top: !win.maximized,
                    right: !win.maximized,
                    bottom: !win.maximized,
                    left: !win.maximized,
                    topRight: !win.maximized,
                    bottomRight: !win.maximized,
                    bottomLeft: !win.maximized,
                    topLeft: !win.maximized,
                  }}
          onResizeStop={(_e, _dir, _ref, d) => {
            setDimensions((prev) => ({
              width: prev.width + d.width,
              height: prev.height + d.height,
            }));
          }}
          // Overrides internal transform styling locks to unlock dragging actions 
          style={{ position: "absolute", top: 0, left: 0, transform: "none" }}
          className="flex flex-col w-full h-full min-h-0"
        >
          {/* Window Title Header Drag Track */}
          <div className="window-titlebar flex h-7 select-none items-center justify-between bg-win-title px-2 text-white cursor-move flex-shrink-0">
            <div className="flex min-w-0 items-center gap-2 pointer-events-none">
              <span className="grid h-4 w-4 place-items-center border border-white bg-win-gray text-[10px] text-black">K</span>
              <span className="truncate font-title text-[20px] leading-none">{win.title}</span>
            </div>
            <div className="flex gap-1 z-10">
              <button aria-label={`Minimize ${win.title}`} className="win-control" onClick={() => minimize(win.id)}>_</button>
              <button aria-label={`Maximize ${win.title}`} className="win-control" onClick={() => toggleMaximize(win.id)}>□</button>
              <button aria-label={`Close ${win.title}`} className="win-control" onClick={() => close(win.id)}>×</button>
            </div>
          </div>
          
          {/* Main Application Content Pane Canvas */}
          <div className="min-h-0 flex-1 overflow-auto bg-win-panel p-3 text-black">
            {children}
          </div>
        </Resizable>
      </motion.div>
    </Draggable>
  );
}