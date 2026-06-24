"use client";

import { create } from "zustand";
import type { AppId } from "@/lib/portfolio-data";

export type WindowState = {
  id: AppId;
  title: string;
  minimized: boolean;
  maximized: boolean;
  z: number;
};

const titles: Record<AppId, string> = {
  hero: "CreativePortfolio.exe",
  about: "About Me - Notepad",
  projects: "Projects - Windows Explorer",
  experience: "Experience - Control Panel",
  skills: "Skills - System Properties",
  resume: "Resume.doc",
  contact: "Inbox - Outlook Express",
  internet: "Internet Explorer",
  minesweeper: "Minesweeper",
  paint: "Paint",
  calculator: "Calculator",
  notepad: "Untitled - Notepad",
  blogs: "My Blogs - WordPad",
  achievements: "Achievements - Registry Editor"
};

type Store = {
  windows: WindowState[];
  nextZ: number;
  open: (id: AppId) => void;
  close: (id: AppId) => void;
  focus: (id: AppId) => void;
  minimize: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  closeAll: () => void;
  openAll: () => void;
};

const defaultApps: AppId[] = ["hero", "about", "projects", "experience", "skills", "resume", "contact"];

export const useWindowStore = create<Store>((set, get) => ({
  windows: [{ id: "hero", title: titles.hero, minimized: false, maximized: false, z: 10 }],
  nextZ: 11,
  open: (id) => {
    const existing = get().windows.find((window) => window.id === id);
    if (existing) {
      get().focus(id);
      set({ windows: get().windows.map((window) => (window.id === id ? { ...window, minimized: false } : window)) });
      return;
    }
    set((state) => ({
      windows: [...state.windows, { id, title: titles[id], minimized: false, maximized: false, z: state.nextZ }],
      nextZ: state.nextZ + 1
    }));
  },
  close: (id) => set((state) => ({ windows: state.windows.filter((window) => window.id !== id) })),
  focus: (id) =>
    set((state) => ({
      windows: state.windows.map((window) => (window.id === id ? { ...window, z: state.nextZ, minimized: false } : window)),
      nextZ: state.nextZ + 1
    })),
  minimize: (id) => set((state) => ({ windows: state.windows.map((window) => (window.id === id ? { ...window, minimized: true } : window)) })),
  toggleMaximize: (id) => set((state) => ({ windows: state.windows.map((window) => (window.id === id ? { ...window, maximized: !window.maximized, minimized: false } : window)) })),
  closeAll: () => set({ windows: [] }),
  openAll: () =>
    set((state) => ({
      windows: defaultApps.map((id, index) => ({ id, title: titles[id], minimized: false, maximized: false, z: state.nextZ + index })),
      nextZ: state.nextZ + defaultApps.length
    }))
}));
