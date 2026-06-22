import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kapil Kashyap OS",
  description: "A Windows 95 inspired portfolio operating system for Kapil Kashyap, AI Engineer and Full Stack Developer.",
  openGraph: {
    title: "Kapil Kashyap OS",
    description: "Explore Kapil Kashyap's projects, experience, skills, resume, and contact details through a nostalgic desktop OS.",
    url: "https://kapilkashyap.netlify.app/",
    siteName: "Kapil Kashyap Portfolio OS",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c3b2e"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
