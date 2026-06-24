"use client";

import { useState, useEffect, useRef } from "react";
import { FiBriefcase, FiCpu, FiFileText, FiFolder, FiGithub, FiLinkedin, FiMail, FiPower, FiSettings, FiUser, FiSearch, FiAward } from "react-icons/fi";
import { useWindowStore } from "@/store/window-store";
import { portfolio, type AppId } from "@/lib/portfolio-data";

type StartItem = { id?: AppId; label: string; icon: React.ElementType; external?: string; keywords: string[] };

const baseItems: StartItem[] = [
  { id: "about", label: "About Me", icon: FiUser, keywords: ["who", "bio", "research", "mumbai", "graduate", "kapil", "kashyap"] },
  { id: "projects", label: "Projects", icon: FiFolder, keywords: ["code", "apps", "stock", "forecasting", "voting", "fibrosis", "neural", "vgg-19", "distilbert", "ecell", "power bi"] },
  { id: "experience", label: "Experience", icon: FiBriefcase, keywords: ["jobs", "work", "history", "indus valley", "wedora", "skima", "djsce", "suvidha", "cto", "sde", "intern"] },
  { id: "skills", label: "Skills", icon: FiCpu, keywords: ["languages", "programming", "java", "python", "javascript", "react", "node", "aws", "docker", "tensorflow", "pytorch", "sql"] },
  { id: "achievements", label: "Achievements", icon: FiAward, keywords: ["achievement", "award", "rank", "winner", "olympiad", "topper", "codechef", "competitions", "medals"] },
  { id: "blogs", label: "My Blogs", icon: FiFileText, keywords: ["articles", "writing", "medium", "dev.to", "posts"] },
  { id: "resume", label: "Resume", icon: FiFileText, keywords: ["cv", "pdf", "wac", "download"] },
  { id: "contact", label: "Contact", icon: FiMail, keywords: ["email", "phone", "hire", "gmail", "location"] },
  { id: "internet", label: "Internet", icon: FiSettings, keywords: ["web", "browser"] },
  { id: "minesweeper", label: "Minesweeper", icon: FiSettings, keywords: ["game", "play"] },
  { id: "paint", label: "Paint", icon: FiSettings, keywords: ["draw", "canvas"] },
  { external: "https://github.com/kapilk05", label: "GitHub", icon: FiGithub, keywords: ["git", "profile", "source"] },
  { external: "https://linkedin.com/in/kapilkashyap05", label: "LinkedIn", icon: FiLinkedin, keywords: ["social", "network", "professional"] }
];

interface StartMenuProps {
  onShutdown: () => void;
  onCloseMenu?: () => void; // Pass an optional close handler state toggle if controlled from Taskbar
}

export default function StartMenu({ onShutdown, onCloseMenu }: StartMenuProps) {
  const open = useWindowStore((state) => state.open);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  // Auto-close menu if clicking outside of its bounding box
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (onCloseMenu) onCloseMenu();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onCloseMenu]);

  // Helper handling option click-throughs + auto-closure sequence
  const handleItemClick = (item: StartItem) => {
    if (item.external) {
      window.open(item.external, "_blank", "noopener,noreferrer");
    } else if (item.id) {
      open(item.id);
    }
    if (onCloseMenu) onCloseMenu();
  };

  // Filter items matching search input text over standard titles and keyword clusters
  const filteredItems = baseItems.filter((item) => {
    const cleanQuery = searchQuery.trim().toLowerCase();
    if (!cleanQuery) return true;
    
    return (
      item.label.toLowerCase().includes(cleanQuery) ||
      item.keywords.some((key) => key.toLowerCase().includes(cleanQuery))
    );
  });

  return (
    <div 
      ref={menuRef}
      className="fixed bottom-10 left-1 z-[9998] flex w-72 border-2 border-white bg-win-gray shadow-win select-none flex-row" 
      role="menu"
    >
      {/* Side Title Strip */}
      <div className="flex w-10 items-end justify-center bg-win-title py-3 text-white">
        <span className="-rotate-90 whitespace-nowrap font-title text-3xl tracking-wider">KapilOS</span>
      </div>

      {/* Main Context Wrapper */}
      <div className="flex-1 flex flex-col p-1 gap-1">
        
        {/* Retro Inset Search Box */}
        <div className="flex items-center gap-2 px-2 py-1 bg-white text-black border-2 border-b-white border-r-white border-t-win-dark border-l-win-dark mx-1 my-1">
          <FiSearch className="text-gray-500 flex-shrink-0" size={14} />
          <input
            type="text"
            placeholder="Search profile..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs font-mono bg-transparent text-black outline-none placeholder-gray-400"
            autoFocus
          />
        </div>

        {/* Dynamic Navigation Options */}
        <div className="flex-1 flex flex-col max-h-[340px] overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <button
                key={item.label}
                className="flex w-full items-center gap-3 px-3 py-2 text-left font-mono text-xs text-black hover:bg-retro-blue hover:text-white"
                onClick={() => handleItemClick(item)}
                role="menuitem"
              >
                <item.icon className="flex-shrink-0" size={14} /> {item.label}
              </button>
            ))
          ) : (
            <div className="px-3 py-4 text-center font-mono text-[11px] text-gray-500 italic">
              No matching records found.
            </div>
          )}
        </div>

        <div className="my-0.5 border-t border-win-dark border-b border-white" />
        
        {/* Shutdown Hook */}
        <button 
          className="flex w-full items-center gap-3 px-3 py-2 text-left font-mono text-xs text-black hover:bg-win-title hover:text-white" 
          onClick={() => {
            onShutdown();
            if (onCloseMenu) onCloseMenu();
          }}
        >
          <FiPower className="text-red-700 flex-shrink-0" size={14} /> Shut Down...
        </button>
      </div>
    </div>
  );
}