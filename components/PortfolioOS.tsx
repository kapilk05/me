"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FiBriefcase, FiCpu, FiFileText, FiFolder, FiGithub, FiLinkedin, FiMail, FiMonitor, FiTrash2, FiUser } from "react-icons/fi";
import DesktopIcon from "@/components/DesktopIcon";
import StartMenu from "@/components/StartMenu";
import Taskbar from "@/components/Taskbar";
import WindowFrame from "@/components/WindowFrame";
import { AboutApp, BlogsApp, CalculatorApp, ContactApp, ExperienceApp, HeroApp, InternetApp, MinesweeperApp, NotepadApp, PaintApp, ProjectsApp, ResumeApp, SkillsApp, AchievementsApp } from "@/components/Apps";
import { portfolio, type AppId } from "@/lib/portfolio-data";
import { useWindowStore } from "@/store/window-store";

const icons = [
  { id: "hero" as AppId, label: "My Computer", icon: FiMonitor },
  { id: "about" as AppId, label: "About Me", icon: FiUser },
  { id: "projects" as AppId, label: "Projects", icon: FiFolder },
  { id: "experience" as AppId, label: "Experience", icon: FiBriefcase },
  { id: "achievements" as AppId, label: "Achievements", icon: FiBriefcase },
  { id: "skills" as AppId, label: "Skills", icon: FiCpu },
  { id: "resume" as AppId, label: "Resume", icon: FiFileText },
  { id: "blogs" as AppId, label: "My Blogs", icon: FiFileText },
  { label: "Github", icon: FiGithub, external: portfolio.socials.github },
  { label: "LinkedIn", icon: FiLinkedin, external: portfolio.socials.linkedin },
  { id: "contact" as AppId, label: "Contact", icon: FiMail },
  { label: "Recycle Bin", icon: FiTrash2 }
];

const appContent: Record<AppId, React.ReactNode> = {
  hero: <HeroApp />,
  about: <AboutApp />,
  projects: <ProjectsApp />,
  experience: <ExperienceApp />,
  skills: <SkillsApp />,
  resume: <ResumeApp />,
  contact: <ContactApp />,
  internet: <InternetApp />,
  minesweeper: <MinesweeperApp />,
  paint: <PaintApp />,
  calculator: <CalculatorApp />,
  notepad: <NotepadApp />,
  blogs: <BlogsApp />,
  achievements: <AchievementsApp />
};

const sizes: Partial<Record<AppId, { width: number; height: number; x: number; y: number }>> = {
  hero: { width: 820, height: 480, x: 170, y: 70 },
  projects: { width: 940, height: 620, x: 150, y: 50 },
  contact: { width: 780, height: 510, x: 190, y: 90 },
  minesweeper: { width: 340, height: 380, x: 330, y: 120 },
  calculator: { width: 280, height: 310, x: 380, y: 140 },
  paint: { width: 680, height: 470, x: 230, y: 80 },
  blogs: { width: 880, height: 560, x: 200, y: 60 },
  achievements: { width: 740, height: 480, x: 220, y: 100 }
};

export default function PortfolioOS() {
  const [booting, setBooting] = useState(true);
  const [startOpen, setStartOpen] = useState(false);
  const [shutdown, setShutdown] = useState(false);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const { windows, openAll, closeAll, minimize } = useWindowStore();

  // Dynamic log stream state lines
  const [logs, setLogs] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Dynamic Line-by-Line Log Sequence Stream
  useEffect(() => {
    if (!booting) return;
    const logMessages = [
      "Loading portfolio OS core frameworks...",
      "Initializing AI kernel systems...",
      "Loading workspace projects metadata array structure...",
      "Decoding verified achievements data tables...",
      "System modules checks verified successfully.",
      "Starting retro environment layout canvas..."
    ];

    let currentLineIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLineIndex < logMessages.length) {
        setLogs((prev) => [...prev, logMessages[currentLineIndex]]);
        currentLineIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 600);

    // Bails out entirely out of boot state after 5 seconds
    const bootTimer = setTimeout(() => {
      setBooting(false);
    }, 5000);

    return () => {
      clearInterval(logInterval);
      clearTimeout(bootTimer);
    };
  }, [booting]);

  // 2. Self-Correcting AI Autoplay Snake Subsystem Engine
  useEffect(() => {
    if (!booting || !canvasRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return; 

    const grid = 16;
    let count = 0;
    
    let snake = [
      { x: 160, y: 80 },
      { x: 144, y: 80 },
      { x: 128, y: 80 },
      { x: 112, y: 80 }
    ];
    let food = { x: 320, y: 160 };
    let dx = grid;
    let dy = 0;

    function getRandomInt(min: number, max: number) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    let animationFrameId: number;

    function gameLoop() {
      animationFrameId = requestAnimationFrame(gameLoop);

      // Runs at a locked retro frame velocity tick calculation speed
      if (++count < 6) return;
      count = 0;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Basic pathfinding logic to route the head target to coordinate coordinates
      const head = snake[0];
      if (head.x < food.x && dx !== -grid) { dx = grid; dy = 0; }
      else if (head.x > food.x && dx !== grid) { dx = -grid; dy = 0; }
      else if (head.y < food.y && dy !== -grid) { dx = 0; dy = grid; }
      else if (head.y > food.y && dy !== grid) { dx = 0; dy = -grid; }

      // Special collision bypass condition check so it turns safely to clear inside grid limits
      let nextX = head.x + dx;
      let nextY = head.y + dy;
      if (nextX < 0 || nextX >= canvas.width || nextY < 0 || nextY >= canvas.height) {
        if (dx !== 0) { dx = 0; dy = head.y < canvas.height / 2 ? grid : -grid; }
        else { dy = 0; dx = head.x < canvas.width / 2 ? grid : -grid; }
      }

      // Progress snake body positioning movement array sequence mapping updates
      const newHead = { x: head.x + dx, y: head.y + dy };
      snake.unshift(newHead);

      if (newHead.x === food.x && newHead.y === food.y) {
        food.x = getRandomInt(1, canvas.width / grid) * grid;
        food.y = getRandomInt(1, canvas.height / grid) * grid;
      } else {
        snake.pop();
      }

      // Draw Red Apple Food Dot
      ctx.fillStyle = "#ff2222";
      ctx.beginPath();
      ctx.arc(food.x + grid / 2, food.y + grid / 2, grid / 2.5, 0, 2 * Math.PI);
      ctx.fill();

      // Draw Retro Green Snake Entity body tokens
      ctx.fillStyle = "#4ade80";
      snake.forEach((cell, index) => {
        ctx.fillStyle = index === 0 ? "#22c55e" : "#4ade80"; // Slightly darker head block node
        ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);
      });
    }

    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [booting, logs]);

  // FEATURE 3: Intercept physical hardware Windows/Cmd Key to toggle Start Menu drawer layout state
  useEffect(() => {
    const handleHardwareKeys = (event: KeyboardEvent) => {
      if (event.key === "Meta") {
        event.preventDefault(); 
        setStartOpen((prev) => !prev); 
      }
    };
    window.addEventListener("keydown", handleHardwareKeys);
    return () => window.removeEventListener("keydown", handleHardwareKeys);
  }, []);

  // FEATURE 2: Execute tab termination attempt + safe black landing screen layout sequence fallback
  if (shutdown) {
    if (typeof window !== "undefined") {
      window.close();
    }

    return (
      <main className="grid h-screen place-items-center bg-black font-mono text-retro-green select-none">
        <div className="text-center">
          <p className="mb-4 font-title text-5xl">KapilOS</p>
          <p className="text-sm">System core offline.</p>
          <p className="text-[11px] text-gray-500 mt-2">It is now safe to close your browser tab manually.</p>
          <button 
            className="mt-6 border border-retro-green px-4 py-2 hover:bg-retro-green/10 active:bg-retro-green/20" 
            onClick={() => setShutdown(false)}
          >
            Cold Reboot
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      className="desktop relative h-screen overflow-hidden"
      onContextMenu={(event) => {
        event.preventDefault();
        setMenu({ x: event.clientX, y: event.clientY });
      }}
      onClick={(event) => {
        if (menu) setMenu(null);

        const target = event.target as HTMLElement;
        if (target.classList.contains("desktop") || target.classList.contains("snow")) {
          windows.forEach((win) => {
            if (!win.minimized) {
              minimize(win.id);
            }
          });
        }
      }}
    >
      <div className="snow" aria-hidden="true" />
      
      {/* INITIAL BOOT CONTAINER WITH AI SNAKE & DYNAMIC RUN LOGS */}
      {booting && (
        <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black font-mono text-retro-green p-4 select-none">
          <div className="w-[min(540px,95vw)] space-y-4">
            <div className="flex justify-between items-baseline border-b border-retro-green/30 pb-2">
              <p className="font-title text-4xl">KapilOS 95</p>
              <span className="text-[10px] animate-pulse">● AUTO_PILOT_ON</span>
            </div>
            
            {/* Auto-Playing Snake Terminal Box */}
            <div className="w-full h-44 bg-win-dark/10 border border-retro-green/40 relative rounded-sm overflow-hidden flex items-center justify-center">
              <canvas 
                ref={canvasRef} 
                width={512} 
                height={176} 
                className="w-full h-full block bg-black"
              />
            </div>

            {/* Dynamic Logs Terminal Console */}
            <div className="h-32 overflow-y-auto text-xs space-y-1 font-mono text-retro-green/90 bg-black p-2 custom-scrollbar">
              {logs.map((log, index) => (
                <p key={index} className="leading-relaxed flex items-start gap-2">
                  <span className="text-retro-green/40">[{index + 1}]</span>
                  <span>{log}</span>
                </p>
              ))}
              <div className="w-1.5 h-3.5 bg-retro-green animate-blink inline-block ml-1" />
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-retro-green/20">
              <span className="text-[10px] text-retro-green/50">Runtime Environment v2.0.26</span>
              <button 
                className="border border-retro-green px-4 py-1 text-xs hover:bg-retro-green/10 active:bg-retro-green/20 transition-colors cursor-pointer shadow-sm" 
                onClick={() => setBooting(false)}
              >
                Skip Boot
              </button>
            </div>
          </div>
        </div>
      )}
      
      <section className="grid w-fit grid-flow-col grid-rows-[repeat(auto-fill,86px)] h-[calc(100vh-48px)] gap-3 p-4">
        {icons.map((icon) => <DesktopIcon key={icon.label} {...icon} />)}
      </section>
      
      <AnimatePresence>
        {windows.map((win, index) => {
          const size = sizes[win.id] ?? { width: 720, height: 500, x: 160 + index * 24, y: 80 + index * 18 };
          return (
            <WindowFrame key={win.id} win={win} {...size}>
              {appContent[win.id]}
            </WindowFrame>
          );
        })}
      </AnimatePresence>
      
      {menu && (
        <div className="fixed z-[9997] w-44 border-2 border-white bg-win-gray p-1 text-black shadow-win" style={{ left: menu.x, top: menu.y }}>
          <button className="block w-full px-3 py-1 text-left hover:bg-retro-blue hover:text-white" onClick={() => location.reload()}>Refresh</button>
          <button className="block w-full px-3 py-1 text-left hover:bg-retro-blue hover:text-white" onClick={openAll}>Open All</button>
          <button className="block w-full px-3 py-1 text-left hover:bg-retro-blue hover:text-white" onClick={closeAll}>Close All</button>
          <button className="block w-full px-3 py-1 text-left hover:bg-retro-blue hover:text-white">Change Wallpaper</button>
        </div>
      )}
      
      {startOpen && (
        <StartMenu 
          onShutdown={() => setShutdown(true)} 
          onCloseMenu={() => setStartOpen(false)} 
        />
      )}
      
      <ShutdownDialog onShutdown={() => setShutdown(true)} />
      <Taskbar startOpen={startOpen} onStart={() => setStartOpen((value) => !value)} />
    </main>
  );
}

function ShutdownDialog({ onShutdown }: { onShutdown: () => void }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.altKey && event.key.toLowerCase() === "q") setOpen(true);
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, []);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9999] grid place-items-center bg-black/40">
      <div className="win-window w-96">
        <div className="window-titlebar bg-win-title px-2 py-1 font-title text-2xl text-white">Shut Down Windows</div>
        <div className="space-y-4 bg-win-panel p-5 text-black">
          <p>What do you want KapilOS to do?</p>
          <div className="flex justify-end gap-2">
            <button className="win-button px-3 py-2" onClick={() => setOpen(false)}>Sleep</button>
            <button className="win-button px-3 py-2" onClick={() => location.reload()}>Restart</button>
            <button className="win-button px-3 py-2" onClick={onShutdown}>Shut Down</button>
          </div>
        </div>
      </div>
    </div>
  );
}