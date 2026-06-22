"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FiBriefcase, FiCpu, FiFileText, FiFolder, FiGithub, FiLinkedin, FiMail, FiMonitor, FiTrash2, FiUser } from "react-icons/fi";
import DesktopIcon from "@/components/DesktopIcon";
import StartMenu from "@/components/StartMenu";
import Taskbar from "@/components/Taskbar";
import WindowFrame from "@/components/WindowFrame";
import { AboutApp, CalculatorApp, ContactApp, ExperienceApp, HeroApp, InternetApp, MinesweeperApp, NotepadApp, PaintApp, ProjectsApp, ResumeApp, SkillsApp } from "@/components/Apps";
import { portfolio, type AppId } from "@/lib/portfolio-data";
import { useWindowStore } from "@/store/window-store";

const icons = [
  { id: "hero" as AppId, label: "My Computer", icon: FiMonitor },
  { id: "about" as AppId, label: "About Me", icon: FiUser },
  { id: "projects" as AppId, label: "Projects", icon: FiFolder },
  { id: "experience" as AppId, label: "Experience", icon: FiBriefcase },
  { id: "skills" as AppId, label: "Skills", icon: FiCpu },
  { id: "resume" as AppId, label: "Resume", icon: FiFileText },
  { id: "contact" as AppId, label: "Contact", icon: FiMail },
  { label: "Github", icon: FiGithub, external: portfolio.socials.github },
  { label: "LinkedIn", icon: FiLinkedin, external: portfolio.socials.linkedin },
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
  notepad: <NotepadApp />
};

const sizes: Partial<Record<AppId, { width: number; height: number; x: number; y: number }>> = {
  hero: { width: 820, height: 480, x: 170, y: 70 },
  projects: { width: 940, height: 620, x: 150, y: 50 },
  contact: { width: 780, height: 510, x: 190, y: 90 },
  minesweeper: { width: 340, height: 380, x: 330, y: 120 },
  calculator: { width: 280, height: 310, x: 380, y: 140 },
  paint: { width: 680, height: 470, x: 230, y: 80 }
};

export default function PortfolioOS() {
  const [booting, setBooting] = useState(true);
  const [startOpen, setStartOpen] = useState(false);
  const [shutdown, setShutdown] = useState(false);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const { windows, openAll, closeAll } = useWindowStore();

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 2400);
    return () => window.clearTimeout(timer);
  }, []);

  if (shutdown) {
    return (
      <main className="grid h-screen place-items-center bg-black font-mono text-retro-green">
        <div className="text-center">
          <p className="mb-4 font-title text-5xl">KapilOS</p>
          <p>It is now safe to close your browser.</p>
          <button className="mt-6 border border-retro-green px-4 py-2" onClick={() => setShutdown(false)}>Restart</button>
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
      onClick={() => menu && setMenu(null)}
    >
      <div className="snow" aria-hidden="true" />
      {booting && (
        <div className="fixed inset-0 z-[10000] grid place-items-center bg-black font-mono text-retro-green">
          <div className="w-[min(520px,90vw)] space-y-3">
            <p className="font-title text-5xl">KapilOS 95</p>
            <p>Loading portfolio OS...</p>
            <p>Initializing modules...</p>
            <p>Loading projects...</p>
            <p>Starting desktop...</p>
            <button className="mt-3 border border-retro-green px-3 py-1" onClick={() => setBooting(false)}>Skip</button>
          </div>
        </div>
      )}
      <section className="grid w-fit grid-flow-col grid-rows-[repeat(5,86px)] gap-3 p-4 pb-14">
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
      {startOpen && <StartMenu onShutdown={() => setShutdown(true)} />}
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
