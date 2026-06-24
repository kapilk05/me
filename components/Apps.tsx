"use client";

import { useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FiBookOpen, FiEye } from "react-icons/fi";
import { portfolio } from "@/lib/portfolio-data";
import { useWindowStore } from "@/store/window-store";
import { FiAward } from "react-icons/fi";
import { Resizable } from "re-resizable"; 

export function HeroApp() {
  const open = useWindowStore((state) => state.open);
  return (
    <div className="grid gap-5 md:grid-cols-[220px_1fr]">
      <div className="inset-panel grid min-h-56 place-items-center bg-[#163f32] p-4">
        <div className="grid h-40 w-40 place-items-center border-4 border-win-light bg-win-title text-center font-title text-6xl text-white shadow-win">
          KK
        </div>
      </div>
      <div className="space-y-4">
        <p className="font-title text-5xl leading-none text-win-title">{portfolio.name}</p>
        <p className="text-lg font-bold">{portfolio.title}</p>
        <p>{portfolio.heroText}</p>
        <p className="inset-panel bg-white p-3">{portfolio.summary}</p>
        <div className="flex flex-wrap gap-2">
          <button className="win-button px-4 py-2" onClick={() => open("projects")}>View Projects</button>
          <a className="win-button px-4 py-2" href={portfolio.resumeUrl} target="_blank" rel="noreferrer">Download Resume</a>
          <button className="win-button px-4 py-2" onClick={() => open("contact")}>Contact Me</button>
        </div>
      </div>
    </div>
  );
}

export function AboutApp() {
  return (
    <div className="h-full bg-white">
      <div className="flex gap-5 border-b border-win-dark bg-win-gray px-2 py-1 text-sm"><span>File</span><span>Edit</span><span>View</span><span>Help</span></div>
      <article className="space-y-4 p-4 font-mono leading-7">
        <h2 className="font-title text-4xl">ABOUT_KAPIL.TXT</h2>
        {portfolio.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <div className="inset-panel grid gap-1 bg-win-panel p-3">
          <strong>Quick Facts</strong>
          <span>Location: {portfolio.contact.location}</span>
          <span>Email: {portfolio.contact.email}</span>
          <span>Phone: {portfolio.contact.alternatePhone}</span>
          <span>LinkedIn: linkedin.com/in/kapilkashyap05</span>
        </div>
      </article>
    </div>
  );
}

export function ProjectsApp() {
  const categories = ["All", ...Array.from(new Set(portfolio.projects.map((project) => project.category)))];
  const [category, setCategory] = useState("All");
  const projects = category === "All" ? portfolio.projects : portfolio.projects.filter((project) => project.category === category);
  const techCount = new Set(projects.flatMap((project) => project.techStack)).size;

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-center gap-2 border-b border-win-dark pb-2">
        <span className="font-bold">Address</span>
        <div className="inset-panel flex-1 bg-white px-2 py-1">C:\Portfolio\Projects\{category}</div>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-[180px_1fr]">
        <aside className="inset-panel bg-white p-2">
          <p className="mb-2 font-bold">Folders</p>
          {categories.map((item) => (
            <button key={item} className={`block w-full px-2 py-1 text-left hover:bg-retro-blue hover:text-white ${item === category ? "bg-retro-blue text-white" : ""}`} onClick={() => setCategory(item)}>
              ▸ {item}
            </button>
          ))}
        </aside>
        <section className="grid content-start gap-3 overflow-auto md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.title} className="inset-panel bg-white p-3">
              <div className="mb-2 flex items-start gap-2">
                <span className="grid h-10 w-10 shrink-0 place-items-center border border-black bg-retro-yellow">▣</span>
                <div>
                  <h3 className="font-bold">{project.title}</h3>
                  <p className="text-xs">{project.category}</p>
                </div>
              </div>
              <p className="mb-3 text-sm">{project.description}</p>
              <div className="mb-3 flex flex-wrap gap-1">{project.techStack.map((tech) => <span className="border border-win-dark bg-win-panel px-1 text-xs" key={tech}>{tech}</span>)}</div>
              <div className="flex gap-2">
                {"liveLink" in project && project.liveLink && <a className="win-button px-2 py-1 text-xs" href={project.liveLink} target="_blank" rel="noreferrer">Live</a>}
                {"githubLink" in project && project.githubLink && <a className="win-button px-2 py-1 text-xs" href={project.githubLink} target="_blank" rel="noreferrer">GitHub</a>}
              </div>
            </article>
          ))}
        </section>
      </div>
      <div className="mt-2 border-t border-win-dark pt-1 text-xs">Total projects: {projects.length} | Technologies used: {techCount}</div>
    </div>
  );
}

export function ExperienceApp() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToJob = (id: string) => {
    const sanitizedId = id.replace(/[^a-zA-Z0-9-_]/g, "\\$&");
    const element = scrollContainerRef.current?.querySelector(`#job-${sanitizedId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const timelinePoints = useMemo(() => {
    const seenLabels = new Set<string>();
    const points: Array<{ id: string; label: string; title: string }> = [];

    [...portfolio.experience].reverse().forEach((role: any) => {
      const uniqueId = role.id || `${role.company}-${role.role}`;
      const rawDate = role.duration.split(" ")[0];
      const rawYear = role.duration.replace(/^\D+/g, "").substring(2, 4);
      const shortLabel = `${rawDate.substring(0, 3)} '${rawYear}`;

      if (!seenLabels.has(shortLabel)) {
        seenLabels.add(shortLabel);
        points.push({
          id: uniqueId,
          label: shortLabel,
          title: role.role
        });
      }
    });

    return points;
  }, []);

  return (
    <div className="flex h-full flex-col min-h-0 text-black">
      <div className="mb-4 p-3 inset-panel bg-white select-none shrink-0 overflow-x-auto">
        <p className="font-mono text-[10px] text-gray-500 mb-3 uppercase tracking-wider">
          System Career Milestone Tracker:
        </p>
        <div className="relative flex justify-between items-center min-w-[400px] px-8 my-2">
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[3px] bg-win-dark border-b border-white" />
          
          {timelinePoints.map((pt, idx) => (
            <button
              key={idx}
              onClick={() => scrollToJob(pt.id)}
              className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
              title={pt.title}
            >
              <div className="w-4 h-4 bg-win-gray border-2 border-win-dark active:border-win-light shadow-win flex items-center justify-center rounded-sm group-hover:bg-retro-blue group-hover:border-blue-900 transition-colors">
                <div className="w-1 h-1 bg-black group-hover:bg-white rounded-full" />
              </div>
              <span className="font-mono text-[9px] font-bold text-gray-700 mt-2 bg-win-panel px-1 border border-transparent group-hover:border-win-dark group-hover:text-black whitespace-nowrap">
                {pt.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div ref={scrollContainerRef} className="flex-1 overflow-auto grid gap-3 pb-4 pr-1">
        {portfolio.experience.map((role: any) => {
          const uniqueId = role.id || `${role.company}-${role.role}`;
          return (
            <section 
              key={`${role.company}-${role.role}`} 
              id={`job-${uniqueId}`}
              className="inset-panel bg-white p-3 scroll-mt-2"
            >
              <div className="mb-2 flex flex-wrap justify-between gap-2">
                <h3 className="font-title text-3xl text-win-title">{role.role}</h3>
                <span className="font-bold">{role.duration}</span>
              </div>
              <p className="font-bold mb-2">{role.company}</p>
              <ul className="list-disc space-y-1 pl-5">
                {role.details?.map((detail: string) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </section>
          );
        })}
        
        <section className="inset-panel bg-white p-3">
          <h3 className="font-bold text-sm border-b border-win-dark pb-1 mb-3">Positions of Responsibility</h3>
          <div className="space-y-4 font-mono text-xs text-black">
            {portfolio.positions.map((position: any, index: number) => {
              const uniqueId = position.title || `${position.organization}`;
              return (
                <div key={index} id={`job-${uniqueId}`} className="space-y-1 scroll-mt-2">
                  <div className="font-bold text-black">
                    {position.title}, <span className="text-gray-700 font-normal">{position.organization}</span>{" "}
                    <span className="text-gray-500 font-normal">({position.period})</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-gray-800">
                    {position.details?.map((detail: any, idx: number) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export function SkillsApp() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {portfolio.skills.map((category, index) => (
        <section key={category.title} className="inset-panel bg-white p-3">
          <h3 className="mb-2 font-bold">{category.title}</h3>
          <div className="mb-2 h-4 border border-win-dark bg-win-panel">
            <div className="h-full bg-retro-green" style={{ width: `${Math.max(55, 96 - index * 5)}%` }} />
          </div>
          <div className="flex flex-wrap gap-1">{category.items.map((skill) => <span key={skill} className="border border-win-dark bg-win-panel px-2 py-1 text-xs">{skill}</span>)}</div>
        </section>
      ))}
    </div>
  );
}

export function ResumeApp() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex gap-2">
        <a className="win-button px-3 py-2" href={portfolio.resumeUrl} download>Download</a>
        <a className="win-button px-3 py-2" href={portfolio.resumeUrl} target="_blank" rel="noreferrer">Open New Tab</a>
      </div>
      <iframe className="inset-panel min-h-96 flex-1 bg-white" src={portfolio.resumeUrl} title="Kapil Kashyap resume preview" />
    </div>
  );
}

export function ContactApp() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("Ready");
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Sending...");
    const service = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const template = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const key = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!service || !template || !key || !form.current) {
      setStatus("EmailJS env vars are not configured. Use the email links on the left.");
      return;
    }
    try {
      await emailjs.sendForm(service, template, form.current, { publicKey: key });
      form.current.reset();
      setStatus("Message sent successfully.");
    } catch {
      setStatus("Message failed. Please email directly.");
    }
  };
  return (
    <div className="grid gap-4 md:grid-cols-[340px_1fr]">
      <aside className="inset-panel bg-white p-3 select-text">
        <h3 className="mb-3 font-bold">Ways to Connect</h3>
        <p className="break-all">{portfolio.contact.email}</p>
        <p className="break-all">{portfolio.contact.workEmail}</p>
        <p>{portfolio.contact.phone}</p>
        <p>{portfolio.contact.location}</p>
        <a className="mt-3 block text-retro-blue underline" href={portfolio.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a className="block text-retro-blue underline" href={portfolio.socials.github} target="_blank" rel="noreferrer">GitHub</a>
      </aside>
      <form ref={form} onSubmit={submit} className="inset-panel grid gap-2 bg-white p-3">
        {["name", "email", "subject"].map((field) => (
          <label key={field} className="grid gap-1 capitalize">{field}<input name={field} required type={field === "email" ? "email" : "text"} className="inset-panel px-2 py-1" /></label>
        ))}
        <label className="grid gap-1">Message<textarea name="message" required rows={6} className="inset-panel px-2 py-1" /></label>
        <button className="win-button px-3 py-2" type="submit">Send Message</button>
        <p className="text-sm">{status}</p>
      </form>
    </div>
  );
}

export function InternetApp() {
  return (
    <div className="space-y-3">
      <div className="inset-panel bg-white px-2 py-1">Address: https://kapilkashyap.netlify.app/links</div>
      {[portfolio.socials.github, portfolio.socials.linkedin, portfolio.socials.codechef, portfolio.socials.leetcode].map((link) => (
        <a className="block border border-win-dark bg-white p-3 text-retro-blue underline" href={link} target="_blank" key={link} rel="noreferrer">{link}</a>
      ))}
    </div>
  );
}

export function MinesweeperApp() {
  const cells = useMemo(() => Array.from({ length: 64 }, (_, index) => (index % 9 === 0 ? "*" : (index % 4) + 1)), []);
  const [open, setOpen] = useState<number[]>([]);
  return <div className="grid w-fit grid-cols-8 gap-1">{cells.map((cell, index) => <button key={index} className="win-button grid h-8 w-8 place-items-center" onClick={() => setOpen((items) => [...items, index])}>{open.includes(index) ? cell : ""}</button>)}</div>;
}

export function PaintApp() {
  return (
    <div className="space-y-2">
      <div className="flex gap-2">{["#000", "#a31515", "#0f8b3d", "#153fa3", "#f4c542"].map((color) => <span key={color} className="h-6 w-6 border border-black" style={{ background: color }} />)}</div>
      <canvas className="inset-panel h-80 w-full bg-white" aria-label="Simple Paint canvas" />
    </div>
  );
}

export function CalculatorApp() {
  return <div className="grid w-56 grid-cols-4 gap-1"><div className="inset-panel col-span-4 bg-white p-2 text-right">0</div>{"789/456*123-0.=+".split("").map((key) => <button className="win-button h-10" key={key}>{key}</button>)}</div>;
}

export function NotepadApp() {
  return <textarea className="h-full min-h-80 w-full resize-none bg-white p-3 font-mono outline-none" defaultValue={"KapilOS notes:\n- Recruiters can explore windows.\n- Projects live in Explorer.\n- Contact lives in Outlook Express."} />;
}

export function BlogsApp() {
  const [activeBlog, setActiveBlog] = useState<any>(portfolio.blogs[0]);

  return (
    <div className="flex h-full flex-col font-mono text-xs text-black">
      <div className="mb-2 flex items-center gap-2 border-b border-win-dark pb-2 select-none">
        <span className="font-bold text-gray-700">Address</span>
        <div className="inset-panel flex-1 bg-white px-2 py-1 text-black select-all">
          C:\Portfolio\Blogs\{activeBlog.id}.txt
        </div>
      </div>
      
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 md:grid-cols-[220px_1fr]">
        <aside className="inset-panel bg-white p-2 overflow-y-auto select-none">
          <p className="mb-2 font-bold border-b border-win-dark pb-1 text-gray-800">Articles</p>
          <div className="space-y-1">
            {portfolio.blogs.map((blog) => (
              <button 
                key={blog.id} 
                className={`flex w-full items-start gap-2 px-2 py-2 text-left hover:bg-retro-blue hover:text-white transition-colors border border-transparent ${
                  blog.id === activeBlog.id ? "bg-retro-blue text-white border-win-dark" : "text-black"
                }`}
                onClick={() => setActiveBlog(blog)}
              >
                <FiBookOpen className="mt-0.5 shrink-0" size={13} />
                <span className="truncate leading-tight">{blog.title}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="inset-panel bg-white p-5 overflow-y-auto space-y-4 select-text">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-title text-win-title leading-snug">{activeBlog.title}</h2>
            <div className="text-[11px] text-gray-500 font-mono">
              By <span className="font-bold text-gray-700">Kapil Kashyap</span> · {activeBlog.date}
            </div>
          </div>
          
          <div className="border-t-2 border-win-dark border-b border-white my-2" />
          
          <article className="space-y-4 text-sm text-gray-900 leading-relaxed font-sans max-w-2xl">
            {activeBlog.content.map((block: any, idx: number) => {
              if (block.type === "quote") {
                return (
                  <blockquote key={idx} className="border-l-4 border-win-title bg-win-panel px-4 py-3 font-mono italic my-3 text-black">
                    "{block.text}"
                  </blockquote>
                );
              }
              if (block.type === "image") {
                return (
                  <div key={idx} className="my-4 border-2 border-win-dark inset-panel bg-win-panel p-1">
                    <img 
                      src={block.src} 
                      alt={block.alt || "Blog visual"} 
                      className="w-full h-auto object-cover max-h-96"
                      loading="lazy"
                    />
                    {block.alt && (
                      <p className="text-[11px] font-mono text-gray-600 mt-1 text-center select-none">
                        Fig: {block.alt}
                      </p>
                    )}
                  </div>
                );
              }
              if (block.type === "list") {
                return (
                  <ul key={idx} className="list-none space-y-2 pl-2 my-2 font-mono text-xs">
                    {block.items.map((item: any, itemIdx: number) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <span className="text-win-title font-bold shrink-0">→</span>
                        <div>
                          <span className="font-bold text-black block md:inline mr-1">{item.title}</span>
                          <span className="text-gray-700">{item.desc}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                );
              }
              return <p key={idx}>{block.text}</p>;
            })}
          </article>
        </section>
      </div>
    </div>
  );
}

// ==========================================
// CLEANED UP & RESIZABLE CERTIFICATE VIEWER
// ==========================================
export function AchievementsApp() {
  const [activeCert, setActiveCert] = useState<string | null>(null);
  const [certDimensions, setCertDimensions] = useState({ width: 720, height: 540 });

  return (
    <div className="relative flex h-full flex-col font-mono text-xs text-black">
      <div className="mb-3 flex items-center gap-2 border-b border-win-dark pb-2 select-none">
        <span className="font-bold text-gray-700">Registry</span>
        <div className="inset-panel flex-1 bg-white px-2 py-1 text-black select-all">
          HKEY_CURRENT_USER\Software\KapilOS\Achievements
        </div>
      </div>

      <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pr-1 pb-2">
        {portfolio.achievementsList.map((ach: any, idx: number) => (
          <div 
            key={idx} 
            className="relative inset-panel bg-white p-4 flex flex-col items-center text-center border border-win-stroke hover:bg-win-panel/20 transition-all group"
          >
            {ach.certificateSrc && (
              <button
                onClick={() => {
                  // FIXED COMPREHENSIVE FULLSCREEN CHECK
                  let isAlreadyFullscreen = false;
                  if (typeof window !== "undefined") {
                    isAlreadyFullscreen = 
                      !!document.fullscreenElement || 
                      (window.outerWidth >= window.screen.width - 20 && 
                       window.outerHeight >= window.screen.height - 80);
                  }

                  if (!isAlreadyFullscreen && typeof window !== "undefined") {
                    window.alert("For a better visual experience, please consider opening your application window in Fullscreen mode.");
                  }
                  
                  setCertDimensions({ width: 720, height: 540 });
                  setActiveCert(ach.certificateSrc);
                }}
                className="win-button absolute top-1.5 right-1.5 p-1 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity z-10"
                title="View Verified Certificate Documents"
              >
                <FiEye size={12} />
              </button>
            )}

            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center text-3xl mb-3 shadow-inner border-2 border-dashed border-gray-300 group-hover:scale-110 transition-transform duration-200"
              style={{ backgroundColor: `${ach.color}15` }}
            >
              {ach.icon}
            </div>
            
            <h3 className="font-bold text-sm text-black mb-1 leading-tight group-hover:text-retro-blue">
              {ach.title}
            </h3>
            
            <p className="text-[11px] text-gray-600 font-sans leading-normal mt-auto">
              {ach.description}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-2 border-t border-win-dark pt-1 text-[10px] text-gray-500 select-none">
        Total medals decoded: {portfolio.achievementsList.length} verified items.
      </div>

      {activeCert && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 p-2 animate-fadeIn">
          <Resizable
            size={{ width: certDimensions.width, height: certDimensions.height }}
            minWidth={450}
            minHeight={350}
            onResizeStop={(_e, _dir, _ref, d) => {
              setCertDimensions((prev) => ({
                width: prev.width + d.width,
                height: prev.height + d.height,
              }));
            }}
            enable={{
              top: false, right: true, bottom: true, left: false,
              topRight: false, bottomRight: true, bottomLeft: false, topLeft: false
            }}
            className="win-window flex flex-col shadow-2xl border-2 border-white bg-win-gray overflow-hidden select-none"
          >
            <div className="window-titlebar flex h-6 select-none items-center justify-between bg-win-title px-2 text-white shrink-0 w-full">
              <span className="font-title text-sm tracking-wide">Certificate_Viewer.exe</span>
              <button 
                className="win-control h-4 w-4 leading-none text-xs flex items-center justify-center font-bold" 
                onClick={() => setActiveCert(null)}
                aria-label="Close Viewer Window"
              >
                ×
              </button>
            </div>

            <div className="p-2 bg-win-panel flex-1 flex flex-col min-h-0 w-full h-full">
              <div className="inset-panel flex-1 bg-white p-2 overflow-auto flex items-center justify-center min-h-0 w-full h-full">
                <img 
                  src={activeCert} 
                  alt="Official verification credential" 
                  className="max-w-full max-h-full object-contain pointer-events-none"
                />
              </div>
            </div>
          </Resizable>
        </div>
      )}
    </div>
  );
}