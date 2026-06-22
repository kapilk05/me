# Kapil Portfolio OS

A Windows 95/XP inspired portfolio operating system built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Zustand, React Draggable, React Icons, and EmailJS.

## Run Locally

1. Install Node.js 20 or newer from https://nodejs.org/.
2. Open PowerShell in this folder:

   ```powershell
   cd "C:\Users\kapil\OneDrive\Documents\me"
   ```

3. Install dependencies:

   ```powershell
   npm install
   ```

4. Start the dev server:

   ```powershell
   npm run dev
   ```

5. Open:

   ```text
   http://localhost:3000
   ```

## Build

```powershell
npm run build
npm run start
```

## EmailJS

The contact form works without placeholders, but sending email requires these environment variables:

```text
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Create `.env.local` with those values, then restart the dev server.

## Deploy

Push the project to GitHub and import it into Vercel. Use the same EmailJS environment variables in the Vercel project settings, then deploy.
