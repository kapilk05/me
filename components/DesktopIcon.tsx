"use client";

import type { IconType } from "react-icons";
import { useWindowStore } from "@/store/window-store";
import type { AppId } from "@/lib/portfolio-data";

export default function DesktopIcon({ id, label, icon: Icon, external }: { id?: AppId; label: string; icon: IconType; external?: string }) {
  const open = useWindowStore((state) => state.open);
  const activate = () => {
    if (external) window.open(external, "_blank", "noopener,noreferrer");
    if (id) open(id);
  };

  return (
    <button
      className="desktop-icon group flex h-[86px] w-[84px] flex-col items-center justify-start gap-1 p-1 text-center text-white outline-none"
      onDoubleClick={activate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") activate();
      }}
      aria-label={`Open ${label}`}
    >
      <span className="grid h-10 w-10 place-items-center border border-white/80 bg-win-gray text-xl text-black shadow-win group-hover:bg-retro-yellow">
        <Icon />
      </span>
      <span className="max-w-full break-words bg-black/25 px-1 text-[12px] leading-tight shadow-sm group-focus:bg-retro-blue group-hover:bg-retro-blue">
        {label}
      </span>
    </button>
  );
}
