"use client";

import { useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { portfolio } from "@/lib/portfolio-data";
import { useWindowStore } from "@/store/window-store";

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
  return (
    <div className="grid gap-3">
      {portfolio.experience.map((role) => (
        <section key={`${role.company}-${role.role}`} className="inset-panel bg-white p-3">
          <div className="mb-2 flex flex-wrap justify-between gap-2">
            {/* FIXED: Changed from role.title to role.role */}
            <h3 className="font-title text-3xl text-win-title">{role.role}</h3>
            {/* FIXED: Changed from role.period to role.duration */}
            <span className="font-bold">{role.duration}</span>
          </div>
          <p className="font-bold">{role.company}</p>
          <p className="mb-2">{role.description}</p>
          {/* FIXED: Changed from role.details to role.details with optional chaining handle safeguard */}
          <ul className="list-disc space-y-1 pl-5">
            {role.details?.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </section>
      ))}
      <section className="inset-panel bg-white p-3">
        <h3 className="font-bold">Positions of Responsibility</h3>
        {portfolio.positions.map((position) => <p key={position.title}>{position.title}, {position.organization} ({position.period})</p>)}
      </section>
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
    // FIXED: Upgraded width boundary assignment grid footprint from [240px_1fr] to [340px_1fr]
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
