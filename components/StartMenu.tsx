"use client";

import { FiBriefcase, FiCpu, FiFileText, FiFolder, FiGithub, FiLinkedin, FiMail, FiPower, FiSettings, FiUser } from "react-icons/fi";
import { useWindowStore } from "@/store/window-store";
import type { AppId } from "@/lib/portfolio-data";

const items: { id?: AppId; label: string; icon: React.ElementType; external?: string }[] = [
  { id: "about", label: "About Me", icon: FiUser },
  { id: "projects", label: "Projects", icon: FiFolder },
  { id: "experience", label: "Experience", icon: FiBriefcase },
  { id: "skills", label: "Skills", icon: FiCpu },
  { id: "resume", label: "Resume", icon: FiFileText },
  { id: "contact", label: "Contact", icon: FiMail },
  { id: "internet", label: "Internet", icon: FiSettings },
  { id: "minesweeper", label: "Minesweeper", icon: FiSettings },
  { id: "paint", label: "Paint", icon: FiSettings },
  { external: "https://github.com/kapilk05", label: "GitHub", icon: FiGithub },
  { external: "https://linkedin.com/in/kapilkashyap05", label: "LinkedIn", icon: FiLinkedin }
];

export default function StartMenu({ onShutdown }: { onShutdown: () => void }) {
  const open = useWindowStore((state) => state.open);
  return (
    <div className="fixed bottom-10 left-1 z-[9998] flex w-72 border-2 border-white bg-win-gray shadow-win" role="menu">
      <div className="flex w-10 items-end justify-center bg-win-title py-3 text-white">
        <span className="-rotate-90 whitespace-nowrap font-title text-3xl">KapilOS</span>
      </div>
      <div className="flex-1 p-1">
        {items.map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-retro-blue hover:text-white"
            onClick={() => (item.external ? window.open(item.external, "_blank", "noopener,noreferrer") : item.id && open(item.id))}
            role="menuitem"
          >
            <item.icon /> {item.label}
          </button>
        ))}
        <div className="my-1 border-t border-win-dark" />
        <button className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-win-title hover:text-white" onClick={onShutdown}>
          <FiPower /> Shut Down...
        </button>
      </div>
    </div>
  );
}
