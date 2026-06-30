// ============================================================
// Navaneeth Raj Portfolio
// Jack 3D Creator frontend + Navaneeth's real data + Admin CMS
// ============================================================

import React, { useEffect, useState, createContext, useContext, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import {
  Github, Linkedin, Twitter, Mail, X, Lock, Save, LogOut,
  User, GraduationCap, Briefcase, Award, Code2, Layout,
  Terminal, Cpu, MessageSquare, Calendar, ChevronDown,
  ExternalLink, Star, GitFork, MapPin, Send,
  Sparkles, BookOpen, Trophy, Code, Smartphone, Menu,
  Plus, Trash2, Palette, Settings, CheckCircle, AlertCircle,
  Key, Database, RefreshCw, FileText, ArrowUp, ArrowDown, Hash
} from "lucide-react";
import { mongoLoad, mongoSave, sendEmail, mongoConfigured, ADMIN_EMAIL } from "./services.js";
import { Analytics } from "@vercel/analytics/react";

const HackerRank = ({ size = 24, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 5 H4 V19 H6 M18 5 H20 V19 H18 M8 12 H16 M8 7.5 V16.5 M16 7.5 V16.5" />
  </svg>
);

// ============================================================
// GOOGLE FONT + GLOBAL STYLES
// ============================================================
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
  html, body, #root { background: #0C0C0C; font-family: 'Kanit', sans-serif; }
  body { overflow-x: hidden; color: #D7E2EA; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #0C0C0C; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
  .hero-heading {
    background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .glass {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .text-gradient {
    background: linear-gradient(90deg, #a855f7, #22d3ee);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  a { color: inherit; text-decoration: none; }
  img { max-width: 100%; display: block; }
  input, textarea, button { font-family: 'Kanit', sans-serif; }
  section { scroll-margin-top: 100px; }

  /* ── Marquee ── */
  @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .marquee-track { display: flex; width: max-content; animation: marquee 28s linear infinite; }
  .marquee-track:hover { animation-play-state: paused; }

  /* ── Glow pulse ── */
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(168,85,247,0.15); }
    50%        { box-shadow: 0 0 40px rgba(168,85,247,0.4), 0 0 80px rgba(168,85,247,0.15); }
  }
  .glow-pulse { animation: glowPulse 3s ease-in-out infinite; }

  /* ── Floating particle ── */
  @keyframes floatUp { 0% { opacity:0; transform: translateY(0) scale(0.5); } 50% { opacity:1; } 100% { opacity:0; transform: translateY(-120px) scale(1); } }
  .particle { position:absolute; border-radius:50%; pointer-events:none; animation: floatUp 4s ease-in-out infinite; }

  /* ── Scan line ── */
  /* scan-line removed */
  .scan-line { display: none; }

  /* ── Border glow on hover ── */
  .glow-card { transition: box-shadow 0.3s, border-color 0.3s; }
  .glow-card:hover { box-shadow: 0 0 0 1px rgba(168,85,247,0.4), 0 8px 32px rgba(168,85,247,0.15) !important; }

  /* ── Typewriter cursor ── */
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  .cursor { display:inline-block; width:3px; height:1em; background:currentColor; margin-left:3px; animation:blink 1s step-end infinite; vertical-align:middle; }

  /* ── Counter number ── */
  @keyframes countUp { from { opacity:0; transform: scale(0.6); } to { opacity:1; transform: scale(1); } }
  .count-anim { animation: countUp 0.6s cubic-bezier(0.34,1.56,0.64,1) both; }

  /* Mobile Responsiveness Improvements */
  .nav-desktop { display: flex !important; }
  .nav-mobile-btn { display: none !important; }
  .nav-desktop-btn { display: inline-flex !important; }
  .nav-mobile-only { display: none !important; }
  
  .hero-tagline-container { height: 28px; overflow: hidden; margin-bottom: 48px; }
  .hero-tagline {
    color: #22d3ee;
    font-family: monospace;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    font-size: clamp(0.65rem, 1.1vw, 0.85rem);
    text-align: center;
    line-height: 1.4;
  }
  
  .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

  .project-image { width: 100%; height: 100%; object-fit: cover; transition: all 0.5s ease; }

  .cert-card { display: flex; flex-direction: row; align-items: center; gap: clamp(16px, 2vw, 28px); }

  .admin-layout { display: flex; flex-direction: row; flex: 1; overflow: hidden; }
  .admin-sidebar { width: 200px; background: rgba(255,255,255,0.02); padding: 16px; border-right: 1px solid rgba(255,255,255,0.04); overflow-y: auto; flex-shrink: 0; }

  @media (hover: hover) {
    .project-image { filter: none; opacity: 1; }
  }

  @media (max-width: 768px) {
    .nav-desktop { display: none !important; }
    .nav-mobile-btn { display: flex !important; }
    .nav-desktop-btn { display: none !important; }
    .nav-mobile-only { display: flex !important; }
    .admin-layout { flex-direction: column; }
    .admin-sidebar {
      width: 100%; height: auto;
      display: flex; flex-direction: row;
      overflow-x: auto; border-right: none;
      border-bottom: 1px solid rgba(255,255,255,0.04);
      gap: 6px; padding: 10px 12px;
      scrollbar-width: none; -webkit-overflow-scrolling: touch;
    }
    .admin-sidebar::-webkit-scrollbar { display: none; }
    .admin-sidebar button { margin-bottom: 0 !important; white-space: nowrap; min-width: max-content; }
    /* Contact form responsive */
    .contact-grid { grid-template-columns: 1fr !important; }
  }

  /* Navbar container responsive styles */
  .navbar-container {
    background: rgba(18, 18, 20, 0.75);
    backdrop-filter: blur(28px);
    -webkit-backdrop-filter: blur(28px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 9999px;
    padding: 8px 10px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
  }

  @media (max-width: 768px) {
    .navbar-container {
      background: transparent !important;
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
      border: none !important;
      border-radius: 0 !important;
      padding: 0 !important;
      box-shadow: none !important;
    }
  }


  /* iOS Safari safe area */
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    footer { padding-bottom: calc(clamp(32px,4vw,56px) + env(safe-area-inset-bottom)); }
  }

  /* Touch-friendly tap targets */
  @media (hover: none) {
    button, a { min-height: 44px; min-width: 44px; }
    input, textarea { font-size: 16px !important; } /* Prevents iOS zoom on focus */
  }

  @media (max-width: 600px) {
    .hero-tagline-container { height: 48px !important; }
    .hero-tagline { letter-spacing: 0.1em !important; font-size: 11px !important; }
    .stats-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
  }

  @media (max-width: 550px) {
    .cert-card { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 16px !important; }
  }
`;

// ============================================================
// DATA (from your real repo)
// ============================================================
const personalInfo = {
  name: "Navaneeth Raj",
  role: "AI MERN Stack Developer",
  tagline: "Building Intelligent Web Experiences",
  heroDescription: "An ambitious Full Stack Developer and AI Enthusiast focused on building production-grade web applications. I bridge the gap between functional web platforms and cutting-edge artificial intelligence through continuous learning and project-driven development.",
  email: "navaneethraj05@gmail.com",
  location: "Silicon Valley, CA",
  github: "https://github.com/NavaneethRaj05",
  linkedin: "https://www.linkedin.com/in/navaneeth-raj05?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  resumeLink: "#",
};

const socialLinks = [
  { name: "GitHub", href: "https://github.com/NavaneethRaj05", icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/navaneeth-raj05?utm_source=share_via&utm_content=profile&utm_medium=member_android", icon: Linkedin },
  { name: "HackerRank", href: "#", icon: HackerRank },
  { name: "Email", href: "mailto:navaneethraj05@gmail.com", icon: Mail },
];

const education = [
  {
    degree: "B.E. in Computer Science Engineering",
    college: "Navkis College of Engineering",
    yearOfPassing: "2027",
    focus: ["MERN", "GENAI", "AUTOMATION", "CLOUD"],
    type: "college"
  },
  {
    degree: "Pre-University Course (PUC)",
    college: "Navkis PU College, Hassan",
    yearOfPassing: "2023",
    focus: [],
    type: "pu"
  },
  {
    degree: "Secondary School Leaving Certificate(SSLC)",
    college: "United High School,Hassan",
    yearOfPassing: "2021",
    focus: [],
    type: "school"
  },
  {
    degree: "CCBP 4.0 Certification",
    college: "Nxtwave",
    duration: "",
    focus: ["MERN Stack"],
    type: "institution"
  }
];

const getEduType = (edu) => {
  if (edu.type) return edu.type;
  const col = (edu.college || "").toLowerCase();
  const deg = (edu.degree || "").toLowerCase();
  if (col.includes("school") || deg.includes("school") || deg.includes("sslc")) return "school";
  if (col.includes("nxtwave") || col.includes("company") || deg.includes("certification") || deg.includes("ccbp") || deg.includes("course")) return "institution";
  if (col.includes("pu") || col.includes("pre-university") || deg.includes("pu") || deg.includes("puc")) return "pu";
  return "college";
};


const skills = {
  "Frontend":  [{ name: "React" }, { name: "Next.js" }, { name: "Tailwind CSS" }, { name: "Framer Motion" }, { name: "TypeScript" }, { name: "UI/UX Design" }],
  "Backend":   [{ name: "Node.js" }, { name: "Express.js" }, { name: "REST APIs" }, { name: "Socket.io" }, { name: "Authentication (JWT)" }],
  "AI/ML":     [{ name: "OpenAI APIs" }, { name: "Gemini AI" }, { name: "LangChain" }, { name: "RAG Systems" }, { name: "Prompt Engineering" }],
  "Database":  [{ name: "MongoDB" }, { name: "PostgreSQL" }, { name: "Redis" }, { name: "Mongoose" }],
  "Dev Tools": [{ name: "Git/GitHub" }, { name: "Docker" }, { name: "Vercel" }, { name: "Postman" }, { name: "Linux Basics" }],
};

const projects = [
  {
    id: 1,
    priority: 1,
    title: "Team Vortex Website",
    description: "Official AI-powered club management platform for Team Vortex that streamlines event registrations, auditions, payments, team management, and analytics. Integrated LLM-driven features including an intelligent chatbot, AI event generation, audition screening, personalized communications, and automated insights using React, Node.js, MongoDB, and AI.",
    tech: ["React", "Node.js", "MongoDB", "AI"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
    github: "https://github.com/NavaneethRaj05/TeamVortex_website",
    live: "https://teamvortexnce.com/",
    featured: true,
    subProjects: []
  },
  {
    id: 2,
    priority: 2,
    title: "KrishiMind",
    description: "An AI-powered agricultural search engine that provides accurate farming insights through both online and offline knowledge retrieval. Designed to deliver Perplexity-like responses tailored for farmers and agriculture enthusiasts.",
    tech: ["React", "Node.js", "RAG", "LLM"],
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000",
    github: "https://github.com/NavaneethRaj05/KrishiMind",
    live: "#",
    featured: true,
    subProjects: []
  },
  {
    id: 3,
    priority: 3,
    title: "Hostel Management System (Mini Project)",
    description: "Built a smart hostel management platform using MERN Stack, RAG, and LLMs. Features include AI handbook search, complaint priority detection, attendance analytics, outpass risk assessment, billing insights, and automated administrative reporting.",
    tech: ["MERN Stack", "RAG", "LLMs"],
    image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&q=80&w=1000",
    github: "https://github.com/NavaneethRaj05/Hostel-management-system",
    live: "https://hostel-management-system-navaneeth.vercel.app/",
    featured: false,
    subProjects: []
  },
  {
    id: 4,
    priority: 4,
    title: "Hackathon Project – AI Solution, Web Application",
    description: "Developed an AI-driven solution during a hackathon, focusing on real-world problem solving, rapid prototyping, and collaborative development under strict time constraints.",
    tech: ["React", "Firebase", "Node.js", "Stripe"],
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000",
    github: "#",
    live: "#",
    featured: false,
    subProjects: [
      {
        title: "EcoRoute - Smart Emission Tracker (Hackathon 2025)",
        description: "EcoRoute is a web-based routing engine that calculates travel routes based on fuel efficiency and carbon emission, winning 1st place in GreenTech Hackathon.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
        tech: ["React", "Leaflet Maps", "Node.js", "Python"],
        github: "",
        live: ""
      },
      {
        title: "MedAI - Emergency Care Assistant (Hackathon 2024)",
        description: "Real-time AI voice assistant for emergency response teams that transcribes calls, extracts symptoms, and suggests critical first-aid instructions instantly.",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000",
        tech: ["React", "Express", "OpenAI Whispers", "Socket.io"],
        github: "",
        live: ""
      }
    ]
  }
];

const journey = [
  { role: "Exploring AI Agents & RAG", company: "Current Learning", duration: "2026", description: "Deep diving into autonomous agentic workflows and advanced retrieval systems for intelligent information processing.", icon: Cpu, priority: 1 },
  { role: "Hackathon Winner - AI for Good", company: "Global AI Summit", duration: "2025", description: "Developed an autonomous disaster relief coordination bot using satellite imagery and AI, winning first place among 50+ entries.", icon: Trophy, priority: 2 },
  { role: "Open Source Contributor", company: "GitHub / Various Labs", duration: "2024 - 2025", description: "Contributed to several AI-focused repositories, refining prompt engineering techniques and full-stack integration patterns.", icon: Code, priority: 3 },
  { role: "Started MERN Journey", company: "Self-Directed Foundation", duration: "2024", description: "Mastered the core concepts of the MERN stack through intensive building of 10+ experimental projects.", icon: BookOpen, priority: 4 },
];

const certifications = [
  { priority: 1, title: "NxtWave Certification", issuer: "NxtWave", year: "2024", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1000", credentialLink: "#", certificates: [] },
  { priority: 2, title: "NPTEL Certification", issuer: "NPTEL", year: "2025", image: "https://images.unsplash.com/photo-1509228468518-180dd482195e?auto=format&fit=crop&q=80&w=1000", credentialLink: "#", certificates: [] },
];

const whatIBuild = [
  { title: "AI Applications", description: "Intelligent systems powered by LLMs, focusing on natural language understanding and automated task execution.", icon: Cpu, color: "#a855f7" },
  { title: "Full Stack Web Apps", description: "Scalable, secure, and performant web applications built with the modern MERN ecosystem.", icon: Code2, color: "#22d3ee" },
  { title: "Interactive UI/UX", description: "Immersive and highly responsive user interfaces that prioritize accessibility and fluid motion.", icon: Layout, color: "#10b981" },
  { title: "Automation Systems", description: "Smart scripts and background workers that streamline workflows and eliminate repetitive tasks.", icon: Smartphone, color: "#f59e0b" },
];

const githubStats = {
  username: "NavaneethRaj05",
  contributions: "500+",
  repos: "12",
  prs: "24",
  stars: "42",
  forks: "18"
};

// ============================================================
// ADMIN CONTEXT
// ============================================================
const AdminContext = createContext(undefined);
const DEFAULT_PIN = "1234";
const PIN_STORAGE_KEY = "portfolioAdminPin";

function removeIcons(obj) {
  if (Array.isArray(obj)) return obj.map(removeIcons);
  if (typeof obj === "object" && obj !== null) {
    const result = {};
    for (const key in obj) {
      if (key !== "icon" && typeof obj[key] !== "function") {
        result[key] = removeIcons(obj[key]);
      }
    }
    return result;
  }
  return obj;
}

function mergeWithIcons(saved, initial) {
  if (Array.isArray(saved) && Array.isArray(initial)) {
    return saved.map((item, idx) => {
      if (typeof item === "object" && item !== null && typeof initial[idx] === "object") {
        const cleanedItem = { ...item };
        delete cleanedItem.icon;
        return { ...initial[idx], ...cleanedItem };
      }
      return item;
    });
  }
  if (typeof saved === "object" && saved !== null && typeof initial === "object") {
    const result = { ...initial, ...saved };
    for (const key in result) {
      if (key === "icon") {
        result[key] = initial[key];
      } else if (Object.prototype.hasOwnProperty.call(result, key) && Object.prototype.hasOwnProperty.call(initial, key)) {
        result[key] = mergeWithIcons(saved[key], initial[key]);
      }
    }
    return result;
  }
  return saved;
}

function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [dbStatus, setDbStatus] = useState("idle"); // "idle"|"syncing"|"synced"|"error"
  const initialData = { personalInfo, socialLinks, education, skills, projects, journey, certifications, whatIBuild, githubStats };

  // Safe localStorage helpers
  const lsGet = (key) => { try { return localStorage.getItem(key); } catch { return null; } };
  const lsSet = (key, val) => { try { localStorage.setItem(key, val); return true; } catch { return false; } };

  // PIN stored in localStorage so admin can change it
  const [adminPin, setAdminPin] = useState(() => lsGet(PIN_STORAGE_KEY) || DEFAULT_PIN);

  const [data, setData] = useState(() => {
    try {
      const saved = lsGet("portfolioData");
      if (saved) return mergeWithIcons(JSON.parse(saved), initialData);
    } catch (e) { console.warn("Failed to load portfolioData", e); }
    return initialData;
  });

  // On mount: try to load from MongoDB, fall back to localStorage silently
  useEffect(() => {
    if (!mongoConfigured()) return;
    setDbStatus("syncing");
    mongoLoad().then((remoteData) => {
      if (remoteData) {
        setData(mergeWithIcons(remoteData, initialData));
        lsSet("portfolioData", JSON.stringify(remoteData)); // keep local cache fresh
        setDbStatus("synced");
      } else {
        setDbStatus("idle");
      }
    }).catch(() => setDbStatus("error"));
  }, []); // eslint-disable-line

  const verifyPin = (pin) => {
    if (pin === adminPin) { setIsAdmin(true); setShowPinModal(false); return true; }
    return false;
  };
  const logout = () => setIsAdmin(false);
  const updateData = (section, newData) => setData(prev => ({ ...prev, [section]: newData }));

  const changePin = (newPin) => {
    setAdminPin(newPin);
    lsSet(PIN_STORAGE_KEY, newPin);
  };

  const saveData = async () => {
    const clean = removeIcons(data);
    // Always save to localStorage first (instant)
    lsSet("portfolioData", JSON.stringify(clean));
    // Then try MongoDB
    if (mongoConfigured()) {
      setDbStatus("syncing");
      const ok = await mongoSave(clean);
      setDbStatus(ok ? "synced" : "error");
      setSaveMsg(ok ? "✓ Saved to MongoDB!" : "Saved locally (DB unavailable)");
    } else {
      setSaveMsg("✓ Saved locally!");
    }
    setTimeout(() => setSaveMsg(""), 3000);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, showPinModal, setShowPinModal, verifyPin, logout, data, updateData, saveData, saveMsg, dbStatus, changePin, adminPin }}>
      {children}
    </AdminContext.Provider>
  );
}

function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be within AdminProvider");
  return ctx;
}

// ============================================================
// SHARED PRIMITIVES
// ============================================================
const S = {
  dark:   "#0C0C0C",
  text:   "#D7E2EA",
  purple: "#a855f7",
  cyan:   "#22d3ee",
};

function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, style = {}, className = "" }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Slide from left ──
function SlideLeft({ children, delay = 0, style = {} }) {
  return (
    <motion.div style={style}
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >{children}</motion.div>
  );
}

// ── Slide from right ──
function SlideRight({ children, delay = 0, style = {} }) {
  return (
    <motion.div style={style}
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >{children}</motion.div>
  );
}

// ── Typewriter ──
function Typewriter({ text, speed = 55, style = {} }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(t); setDone(true); }
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);
  return (
    <span style={style}>{displayed}{!done && <span className="cursor" />}</span>
  );
}

// ── Animated counter ──
function AnimatedCounter({ target, suffix = "", duration = 1.8 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const observed = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !observed.current) {
        observed.current = true;
        const num = parseInt(String(target).replace(/\D/g, ""), 10) || 0;
        const start = Date.now();
        const tick = () => {
          const elapsed = (Date.now() - start) / (duration * 1000);
          const eased = 1 - Math.pow(1 - Math.min(elapsed, 1), 3);
          setCount(Math.round(eased * num));
          if (elapsed < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  const raw = String(target);
  const hasSuffix = /\D/.test(raw);
  return <span ref={ref}>{count}{hasSuffix ? raw.replace(/\d/g, "") : ""}{suffix}</span>;
}

// ── Floating Particles Background ──
function ParticlesBg({ count = 18 }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      delay: `${Math.random() * 6}s`,
      duration: `${4 + Math.random() * 5}s`,
      color: Math.random() > 0.5 ? "rgba(168,85,247,0.5)" : "rgba(34,211,238,0.5)",
    })), [count]);
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {particles.map(p => (
        <div key={p.id} className="particle" style={{
          left: p.left, top: p.top, width: p.size, height: p.size,
          background: p.color, animationDelay: p.delay, animationDuration: p.duration,
        }} />
      ))}
    </div>
  );
}

// ── Marquee ticker ──
function MarqueeTicker({ items }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", width: "100%", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "14px 0", background: "rgba(255,255,255,0.01)" }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 12, paddingRight: 48, color: "#555", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", whiteSpace: "nowrap" }}>
            <span style={{ color: "rgba(168,85,247,0.6)", fontSize: "0.6rem" }}>✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Cursor glow follower ──
function CursorGlow() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });
  useEffect(() => {
    const handler = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);
  return (
    <motion.div style={{
      position: "fixed", pointerEvents: "none", zIndex: 9999,
      width: 320, height: 320, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)",
      translateX: "-50%", translateY: "-50%",
      left: springX, top: springY,
    }} />
  );
}

// ── Section divider with glow ──
function GlowDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "0 clamp(20px,4vw,60px)" }}>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(168,85,247,0.3), transparent)" }} />
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(168,85,247,0.8)", boxShadow: "0 0 12px rgba(168,85,247,0.6)" }} />
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(34,211,238,0.3), transparent)" }} />
    </div>
  );
}

function SectionHeading({ children, gradient = true, light = false }) {
  return (
    <h2
      className={gradient ? "hero-heading" : ""}
      style={{
        fontWeight: 900,
        textTransform: "uppercase",
        lineHeight: 1,
        letterSpacing: "-0.02em",
        textAlign: "center",
        fontSize: "clamp(2.5rem, 9vw, 120px)",
        color: light ? "#0C0C0C" : undefined,
        fontFamily: "'Kanit', sans-serif",
      }}
    >
      {children}
    </h2>
  );
}

function GlassCard({ children, style = {}, hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, borderColor: "rgba(255,255,255,0.2)" } : {}}
      transition={{ duration: 0.3 }}
      className="glass"
      style={{ borderRadius: 32, padding: "clamp(24px,3vw,48px)", ...style }}
    >
      {children}
    </motion.div>
  );
}

function ContactBtn({ label = "Contact Me", href = "#contact", style = {} }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-block",
        background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
        boxShadow: "0px 4px 4px rgba(181,1,167,0.25), inset 4px 4px 12px #7721B1",
        outline: "2px solid white",
        outlineOffset: "-3px",
        borderRadius: 9999,
        color: "white",
        fontFamily: "'Kanit', sans-serif",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        padding: "clamp(10px,1.2vw,14px) clamp(28px,3vw,48px)",
        fontSize: "clamp(0.7rem,0.9vw,0.95rem)",
        cursor: "pointer",
        textDecoration: "none",
        ...style,
      }}
    >
      {label}
    </a>
  );
}

// ============================================================
// NAVBAR
// ============================================================
const NAV_LINKS = [
  { label: "About",         href: "about" },
  { label: "Education",     href: "education" },
  { label: "Projects",      href: "projects" },
  { label: "Skills",        href: "skills" },
  { label: "Journey",       href: "journey" },
  { label: "What I Build",  href: "what-i-build" },
  { label: "Certifications",href: "certifications" },
];

// Smooth-scroll helper that accounts for fixed navbar height
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 20; // small breathing room above section
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

function Navbar() {
  const { setShowPinModal, isAdmin, data } = useAdmin();
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const handler = () => {
      const ids = NAV_LINKS.map(l => l.href);
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Floating pill navbar */}
      <nav style={{
        position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
        zIndex: 100, width: "calc(100% - 40px)", maxWidth: 1100,
      }}>
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="navbar-container"
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 12,
          }}
        >
          {/* NR Logo box — click to open admin PIN */}
          <button
            onClick={() => setShowPinModal(true)}
            title="Admin Access"
            style={{
              flexShrink: 0, width: 44, height: 44,
              background: isAdmin ? "linear-gradient(135deg, #a855f7, #7c3aed)" : "white",
              borderRadius: 12,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: isAdmin ? "2px solid rgba(168,85,247,0.6)" : "none",
              cursor: "pointer",
              boxShadow: isAdmin ? "0 4px 16px rgba(168,85,247,0.4)" : "0 2px 8px rgba(0,0,0,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s, background 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(168,85,247,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = isAdmin ? "0 4px 16px rgba(168,85,247,0.4)" : "0 2px 8px rgba(0,0,0,0.3)"; }}
          >
            <span style={{ color: isAdmin ? "white" : "#0C0C0C", fontWeight: 900, fontSize: "0.95rem", fontFamily: "'Kanit', sans-serif", letterSpacing: "-0.02em" }}>NR</span>
          </button>

          {/* Center nav links — hidden on small screens */}
          <div className="nav-desktop" style={{
            alignItems: "center",
            gap: "clamp(4px, 1.2vw, 20px)", flex: 1,
            justifyContent: "center", overflowX: "auto", scrollbarWidth: "none",
          }}>
            {NAV_LINKS.map(l => {
              const isActive = activeSection === l.href;
              return (
                <button
                  key={l.label}
                  onClick={() => scrollToSection(l.href)}
                  style={{
                    background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                    border: "none", cursor: "pointer",
                    color: isActive ? "white" : "rgba(215,226,234,0.6)",
                    fontFamily: "'Kanit', sans-serif", fontWeight: 500,
                    textTransform: "uppercase", letterSpacing: "0.08em",
                    fontSize: "clamp(0.58rem, 0.72vw, 0.78rem)",
                    padding: "6px clamp(6px, 0.8vw, 14px)",
                    borderRadius: 8, whiteSpace: "nowrap",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = "rgba(215,226,234,0.6)"; e.currentTarget.style.background = "transparent"; }}}
                >
                  {l.label}
                </button>
              );
            })}
          </div>

          {/* Right side: Resume pill */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {/* Resume pill button — matches reference image */}
            <a
              href={data.personalInfo.resumeLink || "#"}
              target="_blank" rel="noopener noreferrer"
              className="nav-desktop-btn"
              style={{
                alignItems: "center", gap: 6,
                background: "white", color: "#0C0C0C",
                borderRadius: 9999, padding: "9px 20px",
                fontFamily: "'Kanit', sans-serif", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.1em",
                fontSize: "clamp(0.6rem, 0.72vw, 0.78rem)",
                textDecoration: "none", flexShrink: 0,
                transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = S.purple; e.currentTarget.style.color = "white"; e.currentTarget.style.boxShadow = `0 4px 16px rgba(168,85,247,0.4)`; }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#0C0C0C"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)"; }}
            >
              Resume
            </a>

            {/* Hamburger Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="nav-mobile-btn"
              style={{
                background: "transparent",
                border: "1px solid rgba(215,226,234,0.15)",
                borderRadius: 8, padding: "8px 10px", cursor: "pointer",
                color: "rgba(215,226,234,0.6)",
                alignItems: "center", justifyContent: "center",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.4)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(215,226,234,0.15)"; e.currentTarget.style.color = "rgba(215,226,234,0.6)"; }}
            >
              {menuOpen ? <X size={13} /> : <Menu size={13} />}
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Mobile hamburger menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed", top: 90, left: 20, right: 20, zIndex: 99,
              background: "rgba(14,14,16,0.97)", backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24,
              padding: 20, display: "flex", flexDirection: "column", gap: 4,
            }}
          >
            {NAV_LINKS.map(l => (
              <button key={l.label} onClick={() => { scrollToSection(l.href); setMenuOpen(false); }}
                style={{ background: "none", border: "none", color: S.text, textAlign: "left", padding: "12px 16px", borderRadius: 12, cursor: "pointer", fontFamily: "'Kanit', sans-serif", fontWeight: 500, fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.08em", transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                onMouseLeave={e => e.currentTarget.style.background = "none"}
              >{l.label}</button>
            ))}

            {/* Resume button inside mobile menu drawer */}
            <a
              href={data.personalInfo.resumeLink || "#"}
              target="_blank" rel="noopener noreferrer"
              className="nav-mobile-only"
              style={{
                alignItems: "center", justifyContent: "center", gap: 6,
                background: "white", color: "#0C0C0C",
                borderRadius: 9999, padding: "12px 20px", marginTop: 12,
                fontFamily: "'Kanit', sans-serif", fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.1em",
                fontSize: "0.9rem", textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = S.purple; e.currentTarget.style.color = "white"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#0C0C0C"; }}
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================================
// PIN MODAL
// ============================================================
function PinModal() {
  const { showPinModal, setShowPinModal, verifyPin } = useAdmin();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (verifyPin(pin)) { setPin(""); setError(""); }
    else { setError("Incorrect PIN. Please try again."); setPin(""); }
  };

  return (
    <AnimatePresence>
      {showPinModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { setShowPinModal(false); setPin(""); setError(""); }}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
          />
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
            style={{
              position: "relative", background: "#111", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 24, padding: "clamp(28px,4vw,48px)", width: "90%", maxWidth: 400,
            }}
          >
            <button onClick={() => setShowPinModal(false)} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "#666" }}>
              <X size={20} />
            </button>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 28 }}>
              <div style={{ width: 48, height: 48, background: "rgba(168,85,247,0.15)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Lock size={22} color={S.purple} />
              </div>
              <h2 style={{ color: "white", fontWeight: 700, fontSize: "1.5rem", marginBottom: 6, fontFamily: "'Kanit', sans-serif" }}>Admin Access</h2>
              <p style={{ color: "#666", fontSize: "0.875rem" }}>Enter your PIN to continue</p>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="password" value={pin} onChange={e => setPin(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit(e)}
                placeholder="• • • •" maxLength={4} autoFocus
                style={{
                  width: "100%", background: "#1a1a1a", border: "1px solid #333", borderRadius: 12,
                  padding: "14px 20px", color: "white", textAlign: "center", fontSize: "1.5rem",
                  letterSpacing: "0.5em", outline: "none", marginBottom: 8,
                  fontFamily: "'Kanit', sans-serif", transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = S.purple}
                onBlur={e => e.target.style.borderColor = "#333"}
              />
              {error && <p style={{ color: "#f87171", textAlign: "center", fontSize: "0.85rem", marginBottom: 8 }}>{error}</p>}
              <button type="button" onClick={handleSubmit} style={{
                width: "100%", background: S.purple, border: "none", borderRadius: 12,
                padding: "14px", color: "white", fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.08em", cursor: "pointer", marginTop: 8,
                fontSize: "0.85rem", fontFamily: "'Kanit', sans-serif",
                transition: "background 0.2s",
              }}
                onMouseEnter={e => e.target.style.background = "#9333ea"}
                onMouseLeave={e => e.target.style.background = "#a855f7"}
              >Unlock</button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function CommaSeparatedField({ labelText, valueArray, onChange, purpleColor }) {
  const [tempVal, setTempVal] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const currentJoined = valueArray ? valueArray.join(", ") : "";
  const displayVal = isFocused && tempVal !== null ? tempVal : currentJoined;

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", color: "#888", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
        {labelText}
      </label>
      <input
        type="text"
        value={displayVal}
        onChange={e => {
          const val = e.target.value;
          setTempVal(val);
          const arr = val.split(",").map(s => s.trim());
          onChange(arr);
        }}
        onFocus={e => {
          setIsFocused(true);
          setTempVal(currentJoined);
          e.target.style.borderColor = purpleColor;
        }}
        onBlur={e => {
          setIsFocused(false);
          setTempVal(null);
          e.target.style.borderColor = "#333";
          const cleaned = displayVal.split(",").map(s => s.trim()).filter(Boolean);
          onChange(cleaned);
        }}
        style={{ width: "100%", background: "#1a1a1a", border: "1px solid #333", borderRadius: 10, padding: "12px 16px", color: "white", outline: "none", fontFamily: "'Kanit', sans-serif", fontSize: "0.9rem" }}
      />
    </div>
  );
}

// ============================================================
// ADMIN PORTAL
// ============================================================
function AdminPortal() {
  const { data, updateData, saveData, logout, saveMsg, dbStatus, changePin } = useAdmin();
  const [activeSection, setActiveSection] = useState("personal");

  const sections = [
    { id: "personal",        label: "Personal Info",  icon: User },
    { id: "social",          label: "Social Links",   icon: Github },
    { id: "education",       label: "Education",      icon: GraduationCap },
    { id: "skills",          label: "Skills",         icon: Code2 },
    { id: "projects",        label: "Projects",       icon: Briefcase },
    { id: "journey",         label: "Journey",        icon: Layout },
    { id: "certifications",  label: "Certifications", icon: Award },
    { id: "whatIBuild",      label: "What I Build",   icon: Code2 },
    { id: "githubStats",     label: "GitHub Stats",   icon: Github },
    { id: "settings",        label: "Settings",       icon: Settings },
  ];

  const inp = (val, onChange, type = "text", rows) => rows ? (
    <textarea value={val} onChange={e => onChange(e.target.value)} rows={rows}
      style={{ width: "100%", background: "#1a1a1a", border: "1px solid #333", borderRadius: 10, padding: "12px 16px", color: "white", outline: "none", resize: "vertical", fontFamily: "'Kanit', sans-serif", fontSize: "0.9rem" }}
      onFocus={e => e.target.style.borderColor = S.purple} onBlur={e => e.target.style.borderColor = "#333"}
    />
  ) : (
    <input type={type} value={val} onChange={e => onChange(e.target.value)}
      style={{ width: "100%", background: "#1a1a1a", border: "1px solid #333", borderRadius: 10, padding: "12px 16px", color: "white", outline: "none", fontFamily: "'Kanit', sans-serif", fontSize: "0.9rem" }}
      onFocus={e => e.target.style.borderColor = S.purple} onBlur={e => e.target.style.borderColor = "#333"}
    />
  );

  const label = (text) => <label style={{ display: "block", color: "#888", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{text}</label>;
  const field = (labelText, val, onChange, type, rows) => (
    <div key={labelText} style={{ marginBottom: 16 }}>{label(labelText)}{inp(val, onChange, type, rows)}</div>
  );

  const card = (children, key) => (
    <div key={key} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 16, padding: "20px", marginBottom: 16 }}>
      {children}
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 150, display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(8px,2vw,24px)" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)" }} onClick={logout} />
      <div style={{ position: "relative", background: "#0d0d0d", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, width: "100%", maxWidth: 1100, maxHeight: "92vh", overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <h2 style={{ color: "white", fontWeight: 700, fontSize: "1.2rem", fontFamily: "'Kanit', sans-serif" }}>Admin Portal</h2>
            {/* DB sync indicator */}
            {dbStatus !== "idle" && (
              <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 9999, fontSize: "0.68rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em",
                background: dbStatus === "synced" ? "rgba(16,185,129,0.1)" : dbStatus === "error" ? "rgba(239,68,68,0.1)" : "rgba(168,85,247,0.1)",
                border: `1px solid ${dbStatus === "synced" ? "rgba(16,185,129,0.3)" : dbStatus === "error" ? "rgba(239,68,68,0.3)" : "rgba(168,85,247,0.3)"}`,
                color: dbStatus === "synced" ? "#10b981" : dbStatus === "error" ? "#ef4444" : "#a855f7",
              }}>
                {dbStatus === "syncing" && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><RefreshCw size={10} /></motion.div>}
                {dbStatus === "synced"  && <Database size={10} />}
                {dbStatus === "error"   && <AlertCircle size={10} />}
                <span style={{ marginLeft: 3 }}>
                  {dbStatus === "synced"  ? "MongoDB ✓" :
                   dbStatus === "error"   ? "DB Unavailable" :
                                           "Syncing…"}
                </span>
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button onClick={saveData} style={{ display: "flex", alignItems: "center", gap: 6, background: saveMsg && saveMsg.includes("unavailable") ? "#b45309" : saveMsg ? "#059669" : "#374151", border: "none", borderRadius: 8, padding: "8px 14px", color: "white", cursor: "pointer", fontWeight: 600, fontSize: "0.8rem", fontFamily: "'Kanit', sans-serif", minWidth: 80, justifyContent: "center", transition: "background 0.3s" }}>
              <Save size={13} /> {saveMsg || "Save"}
            </button>
            <button onClick={logout} style={{ display: "flex", alignItems: "center", gap: 6, background: "#dc2626", border: "none", borderRadius: 8, padding: "8px 14px", color: "white", cursor: "pointer", fontWeight: 600, fontSize: "0.8rem", fontFamily: "'Kanit', sans-serif" }}>
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>

        <div className="admin-layout">
          {/* Sidebar */}
          <div className="admin-sidebar">
            {sections.map(s => {
              const Icon = s.icon;
              return (
                <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                  borderRadius: 10, border: "none", cursor: "pointer", textAlign: "left", marginBottom: 4,
                  background: activeSection === s.id ? "rgba(168,85,247,0.2)" : "transparent",
                  color: activeSection === s.id ? S.purple : "#888", fontFamily: "'Kanit', sans-serif",
                  fontWeight: 500, fontSize: "0.85rem", transition: "all 0.2s",
                }}>
                  <Icon size={16} /> {s.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: "24px 28px", overflowY: "auto" }}>
            {activeSection === "personal" && (
              <div>
                <h3 style={{ color: "white", fontWeight: 700, marginBottom: 20, fontFamily: "'Kanit', sans-serif" }}>Personal Information</h3>
                {["name","role","tagline","email","location","github","linkedin","resumeLink"].map(f =>
                  field(f, data.personalInfo[f] ?? "", v => updateData("personalInfo", { ...data.personalInfo, [f]: v }))
                )}
                {field("Hero Description", data.personalInfo.heroDescription, v => updateData("personalInfo", { ...data.personalInfo, heroDescription: v }), "text", 4)}
              </div>
            )}
            {activeSection === "social" && (
              <div>
                <h3 style={{ color: "white", fontWeight: 700, marginBottom: 20, fontFamily: "'Kanit', sans-serif" }}>Social Links</h3>
                {data.socialLinks.map((link, i) => card(
                  <div><p style={{ color: "#aaa", marginBottom: 10, fontWeight: 600 }}>{link.name}</p>
                  {field("URL", link.href, v => { const n = [...data.socialLinks]; n[i] = { ...n[i], href: v }; updateData("socialLinks", n); })}</div>, i
                ))}
              </div>
            )}
            {activeSection === "education" && (
              <div>
                <h3 style={{ color: "white", fontWeight: 700, marginBottom: 20, fontFamily: "'Kanit', sans-serif" }}>Education</h3>
                {data.education.map((edu, i) => {
                  const type = edu.type || getEduType(edu);
                  const collegeLabel = type === "school" ? "School" : type === "institution" ? "Institution" : type === "pu" ? "PU College" : "College";
                  const showFocus = type === "college" || type === "institution";
                  return card(
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <p style={{ color: "#aaa", fontWeight: 600 }}>Entry #{i + 1}</p>
                        <button
                          onClick={() => {
                            const n = data.education.filter((_, idx) => idx !== i);
                            updateData("education", n);
                          }}
                          style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                          title="Delete Education Entry"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div style={{ marginBottom: 16 }}>
                        {label("Type")}
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {["college", "school", "pu", "institution"].map(t => {
                            const active = type === t;
                            return (
                              <button
                                key={t}
                                type="button"
                                onClick={() => {
                                  const n = [...data.education];
                                  n[i] = { ...n[i], type: t };
                                  updateData("education", n);
                                }}
                                style={{
                                  padding: "6px 12px",
                                  borderRadius: 8,
                                  border: `1px solid ${active ? S.purple : "#333"}`,
                                  background: active ? "rgba(168, 85, 247, 0.2)" : "#1a1a1a",
                                  color: active ? "white" : "#888",
                                  cursor: "pointer",
                                  fontSize: "0.8rem",
                                  fontWeight: 500,
                                  textTransform: "capitalize",
                                  fontFamily: "'Kanit', sans-serif"
                                }}
                              >
                                {t === "pu" ? "PU College" : t}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      {field(type === "institution" ? "Certification" : "Degree", edu.degree, v => { const n = [...data.education]; n[i] = { ...n[i], degree: v }; updateData("education", n); })}
                      {field(collegeLabel, edu.college, v => { const n = [...data.education]; n[i] = { ...n[i], college: v }; updateData("education", n); })}
                      {type === "institution" ? (
                        field("Duration", edu.duration || "", v => { const n = [...data.education]; n[i] = { ...n[i], duration: v }; updateData("education", n); })
                      ) : (
                        field("Year of Passing", edu.yearOfPassing || "", v => { const n = [...data.education]; n[i] = { ...n[i], yearOfPassing: v }; updateData("education", n); })
                      )}
                      {showFocus && (
                        <CommaSeparatedField labelText="Focus Areas (comma separated)" valueArray={edu.focus} onChange={v => { const n = [...data.education]; n[i] = { ...n[i], focus: v }; updateData("education", n); }} purpleColor={S.purple} />
                      )}
                    </div>, i
                  );
                })}
                <button
                  onClick={() => {
                    const n = [...data.education, { degree: "New Degree", college: "New College", yearOfPassing: "2026", focus: [], type: "college" }];
                    updateData("education", n);
                  }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", background: "rgba(168, 85, 247, 0.1)", border: "1px dashed rgba(168, 85, 247, 0.4)", borderRadius: 16, padding: "16px", color: S.purple, cursor: "pointer", fontWeight: 600, fontSize: "0.9rem", fontFamily: "'Kanit', sans-serif", transition: "all 0.2s", marginTop: 8 }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(168, 85, 247, 0.2)"; e.currentTarget.style.borderColor = S.purple; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(168, 85, 247, 0.1)"; e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.4)"; }}
                >
                  <Plus size={16} /> Add Education Entry
                </button>
              </div>
            )}
            {activeSection === "skills" && (
              <div>
                <h3 style={{ color: "white", fontWeight: 700, marginBottom: 20, fontFamily: "'Kanit', sans-serif" }}>Skills</h3>
                {Object.entries(data.skills).map(([cat, skillList]) => (
                  <div key={cat} style={{ marginBottom: 24, background: "#111", border: "1px solid #222", borderRadius: 16, padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <p style={{ color: S.cyan, fontWeight: 600, textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.08em" }}>{cat}</p>
                      <button
                        onClick={() => {
                          const nd = { ...data.skills };
                          delete nd[cat];
                          updateData("skills", nd);
                        }}
                        style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 4 }}
                        title="Delete Category"
                      >
                        <Trash2 size={14} /> Delete Category
                      </button>
                    </div>
                    {skillList.map((sk, i) =>
                      <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                        <div style={{ flex: 1 }}>
                          {inp(sk.name, v => { const nd = { ...data.skills }; nd[cat] = [...nd[cat]]; nd[cat][i] = { name: v }; updateData("skills", nd); })}
                        </div>
                        <button
                          onClick={() => {
                            const nd = { ...data.skills };
                            nd[cat] = nd[cat].filter((_, idx) => idx !== i);
                            updateData("skills", nd);
                          }}
                          style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                          title="Delete Skill"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        const nd = { ...data.skills };
                        nd[cat] = [...nd[cat], { name: "New Skill" }];
                        updateData("skills", nd);
                      }}
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(34, 211, 238, 0.1)", border: "1px dashed rgba(34, 211, 238, 0.4)", borderRadius: 8, padding: "6px 12px", color: S.cyan, cursor: "pointer", fontSize: "0.8rem", fontWeight: 500, fontFamily: "'Kanit', sans-serif", transition: "all 0.2s", marginTop: 8 }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(34, 211, 238, 0.2)"; e.currentTarget.style.borderColor = S.cyan; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(34, 211, 238, 0.1)"; e.currentTarget.style.borderColor = "rgba(34, 211, 238, 0.4)"; }}
                    >
                      <Plus size={12} /> Add Skill to {cat}
                    </button>
                  </div>
                ))}
                <div style={{ marginTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}>
                  <p style={{ color: "#aaa", fontSize: "0.85rem", marginBottom: 8 }}>Add New Skill Category:</p>
                  <div style={{ display: "flex", gap: 10 }}>
                    <input
                      type="text"
                      placeholder="e.g. Databases, Cloud"
                      id="new-skill-category-input"
                      style={{ flex: 1, background: "#1a1a1a", border: "1px solid #333", borderRadius: 10, padding: "10px 14px", color: "white", outline: "none", fontFamily: "'Kanit', sans-serif", fontSize: "0.9rem" }}
                      onFocus={e => e.target.style.borderColor = S.purple}
                      onBlur={e => e.target.style.borderColor = "#333"}
                    />
                    <button
                      onClick={() => {
                        const inputEl = document.getElementById("new-skill-category-input");
                        if (inputEl) {
                          const newCat = inputEl.value.trim();
                          if (newCat && !data.skills[newCat]) {
                            const nd = { ...data.skills, [newCat]: [] };
                            updateData("skills", nd);
                            inputEl.value = "";
                          }
                        }
                      }}
                      style={{ background: S.purple, border: "none", borderRadius: 10, padding: "10px 16px", color: "white", fontWeight: 600, cursor: "pointer", fontFamily: "'Kanit', sans-serif" }}
                    >
                      Add Category
                    </button>
                  </div>
                </div>
              </div>
            )}
            {activeSection === "projects" && (
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                  <h3 style={{ color: "white", fontWeight: 700, fontFamily: "'Kanit', sans-serif" }}>Projects</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: 9999, padding: "4px 12px" }}>
                    <Hash size={12} color={S.purple} />
                    <span style={{ color: S.purple, fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Priority Order</span>
                  </div>
                </div>
                <p style={{ color: "#555", fontSize: "0.75rem", marginBottom: 16, lineHeight: 1.4 }}>Lower number = shown first. Use ↑↓ arrows or type a priority number.</p>
                {data.projects.map((proj, i) => card(
                  <div key={proj.id || i}>
                    {/* Title row with priority badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #a855f7, #7c3aed)", color: "white", fontSize: "0.72rem", fontWeight: 900, flexShrink: 0, boxShadow: "0 2px 8px rgba(168,85,247,0.4)" }}>
                        {proj.priority ?? i + 1}
                      </div>
                      <p style={{ color: "#aaa", fontWeight: 600, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{proj.title}</p>
                    </div>
                    {/* Action buttons row */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                      <button
                        onClick={() => {
                          if (i === 0) return;
                          const n = [...data.projects];
                          [n[i - 1], n[i]] = [n[i], n[i - 1]];
                          n.forEach((p, idx) => { n[idx] = { ...p, priority: idx + 1 }; });
                          updateData("projects", n);
                        }}
                        disabled={i === 0}
                        style={{ background: i === 0 ? "rgba(255,255,255,0.03)" : "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: 8, padding: "7px 10px", color: i === 0 ? "#444" : S.purple, cursor: i === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 4, transition: "all 0.2s", fontSize: "0.7rem", fontFamily: "'Kanit', sans-serif", fontWeight: 600 }}
                        title="Move Up"
                      >
                        <ArrowUp size={14} /> Up
                      </button>
                      <button
                        onClick={() => {
                          if (i === data.projects.length - 1) return;
                          const n = [...data.projects];
                          [n[i], n[i + 1]] = [n[i + 1], n[i]];
                          n.forEach((p, idx) => { n[idx] = { ...p, priority: idx + 1 }; });
                          updateData("projects", n);
                        }}
                        disabled={i === data.projects.length - 1}
                        style={{ background: i === data.projects.length - 1 ? "rgba(255,255,255,0.03)" : "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: 8, padding: "7px 10px", color: i === data.projects.length - 1 ? "#444" : S.purple, cursor: i === data.projects.length - 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 4, transition: "all 0.2s", fontSize: "0.7rem", fontFamily: "'Kanit', sans-serif", fontWeight: 600 }}
                        title="Move Down"
                      >
                        <ArrowDown size={14} /> Down
                      </button>
                      <div style={{ flex: 1 }} />
                      <button
                        onClick={() => {
                          const n = data.projects.filter((_, idx) => idx !== i);
                          n.forEach((p, idx) => { n[idx] = { ...p, priority: idx + 1 }; });
                          updateData("projects", n);
                        }}
                        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: "7px 10px", fontSize: "0.7rem", fontFamily: "'Kanit', sans-serif", fontWeight: 600, transition: "all 0.2s" }}
                        title="Delete Project"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                    {/* Priority number field */}
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: "block", color: "#888", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Priority (1 = shown first)</label>
                      <input
                        type="number" min="1"
                        value={proj.priority ?? i + 1}
                        onChange={e => {
                          const val = parseInt(e.target.value) || 1;
                          const n = [...data.projects];
                          n[i] = { ...n[i], priority: val };
                          updateData("projects", n);
                        }}
                        style={{ width: "120px", background: "#1a1a1a", border: "1px solid #333", borderRadius: 10, padding: "10px 14px", color: S.purple, outline: "none", fontFamily: "'Kanit', sans-serif", fontSize: "1rem", fontWeight: 700 }}
                        onFocus={e => e.target.style.borderColor = S.purple}
                        onBlur={e => e.target.style.borderColor = "#333"}
                      />
                    </div>
                    {field("Title", proj.title, v => { const n = [...data.projects]; n[i] = { ...n[i], title: v }; updateData("projects", n); })}
                    {field("Description", proj.description, v => { const n = [...data.projects]; n[i] = { ...n[i], description: v }; updateData("projects", n); }, "text", 3)}
                    <div style={{ marginBottom: 16 }}>
                      {label("Project Image")}
                      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
                        {proj.image && (
                          <img src={proj.image} alt="Preview" style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover", border: "1px solid #333" }} />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const base64String = reader.result;
                                const n = [...data.projects];
                                n[i] = { ...n[i], image: base64String };
                                updateData("projects", n);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          style={{ display: "none" }}
                          id={`proj-img-file-${i}`}
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById(`proj-img-file-${i}`).click()}
                          style={{
                            background: S.purple,
                            border: "none",
                            borderRadius: 10,
                            padding: "10px 16px",
                            color: "white",
                            fontWeight: 600,
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            fontFamily: "'Kanit', sans-serif"
                          }}
                        >
                          Upload File
                        </button>
                        <span style={{ color: "#666", fontSize: "0.75rem" }}>or enter URL below:</span>
                      </div>
                    </div>
                    {field("Image URL", proj.image, v => { const n = [...data.projects]; n[i] = { ...n[i], image: v }; updateData("projects", n); })}
                    <CommaSeparatedField labelText="Technologies (comma separated)" valueArray={proj.tech || []} onChange={v => { const n = [...data.projects]; n[i] = { ...n[i], tech: v }; updateData("projects", n); }} purpleColor={S.purple} />
                    {field("GitHub URL", proj.github, v => { const n = [...data.projects]; n[i] = { ...n[i], github: v }; updateData("projects", n); })}
                    {field("Live URL", proj.live, v => { const n = [...data.projects]; n[i] = { ...n[i], live: v }; updateData("projects", n); })}
                    
                    {/* Sub-Projects Section */}
                    <div style={{ marginTop: 20, padding: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 16 }}>
                      <p style={{ color: S.purple, fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Sub-Projects / Project Gallery</p>
                      
                      {((proj.subProjects || [])).map((subProj, subIndex) => (
                        <div key={subIndex} style={{ marginBottom: 16, borderBottom: subIndex < (proj.subProjects || []).length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", paddingBottom: subIndex < (proj.subProjects || []).length - 1 ? 16 : 0 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                            <p style={{ color: "#888", fontSize: "0.8rem", fontWeight: 600 }}>Project #{subIndex + 1}</p>
                            <button
                              type="button"
                              onClick={() => {
                                const n = [...data.projects];
                                n[i] = {
                                  ...n[i],
                                  subProjects: (n[i].subProjects || []).filter((_, idx) => idx !== subIndex)
                                };
                                updateData("projects", n);
                              }}
                              style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                              title="Delete Sub-Project"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          {field(`Project Title #${subIndex + 1}`, subProj.title, v => {
                            const n = [...data.projects];
                            const updatedSubs = [...(n[i].subProjects || [])];
                            updatedSubs[subIndex] = { ...updatedSubs[subIndex], title: v };
                            n[i] = { ...n[i], subProjects: updatedSubs };
                            updateData("projects", n);
                          })}
                          
                          {field(`Project Description #${subIndex + 1}`, subProj.description, v => {
                            const n = [...data.projects];
                            const updatedSubs = [...(n[i].subProjects || [])];
                            updatedSubs[subIndex] = { ...updatedSubs[subIndex], description: v };
                            n[i] = { ...n[i], subProjects: updatedSubs };
                            updateData("projects", n);
                          }, "text", 2)}
                          
                          {/* Image upload / input for sub project */}
                          <div style={{ marginBottom: 8 }}>
                            {label(`Image for Project #${subIndex + 1}`)}
                            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
                              {subProj.image && (
                                <img src={subProj.image} alt="Preview" style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover", border: "1px solid #333" }} />
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={e => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      const base64String = reader.result;
                                      const n = [...data.projects];
                                      const updatedSubs = [...(n[i].subProjects || [])];
                                      updatedSubs[subIndex] = { ...updatedSubs[subIndex], image: base64String };
                                      n[i] = { ...n[i], subProjects: updatedSubs };
                                      updateData("projects", n);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                style={{ display: "none" }}
                                id={`sub-proj-img-file-${i}-${subIndex}`}
                              />
                              <button
                                type="button"
                                onClick={() => document.getElementById(`sub-proj-img-file-${i}-${subIndex}`).click()}
                                style={{
                                  background: S.purple,
                                  border: "none",
                                  borderRadius: 10,
                                  padding: "8px 14px",
                                  color: "white",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                  fontSize: "0.75rem",
                                  fontFamily: "'Kanit', sans-serif"
                                }}
                              >
                                Upload File
                              </button>
                            </div>
                          </div>
                          
                          {field(`Image URL #${subIndex + 1}`, subProj.image, v => {
                            const n = [...data.projects];
                            const updatedSubs = [...(n[i].subProjects || [])];
                            updatedSubs[subIndex] = { ...updatedSubs[subIndex], image: v };
                            n[i] = { ...n[i], subProjects: updatedSubs };
                            updateData("projects", n);
                          })}
                          
                          <CommaSeparatedField labelText={`Technologies #${subIndex + 1} (comma separated)`} valueArray={subProj.tech || []} onChange={v => {
                            const n = [...data.projects];
                            const updatedSubs = [...(n[i].subProjects || [])];
                            updatedSubs[subIndex] = { ...updatedSubs[subIndex], tech: v };
                            n[i] = { ...n[i], subProjects: updatedSubs };
                            updateData("projects", n);
                          }} purpleColor={S.purple} />
                          
                          {field(`GitHub URL #${subIndex + 1}`, subProj.github, v => {
                            const n = [...data.projects];
                            const updatedSubs = [...(n[i].subProjects || [])];
                            updatedSubs[subIndex] = { ...updatedSubs[subIndex], github: v };
                            n[i] = { ...n[i], subProjects: updatedSubs };
                            updateData("projects", n);
                          })}
                          
                          {field(`Live URL #${subIndex + 1}`, subProj.live, v => {
                            const n = [...data.projects];
                            const updatedSubs = [...(n[i].subProjects || [])];
                            updatedSubs[subIndex] = { ...updatedSubs[subIndex], live: v };
                            n[i] = { ...n[i], subProjects: updatedSubs };
                            updateData("projects", n);
                          })}
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={() => {
                          const n = [...data.projects];
                          const updatedSubs = [...(n[i].subProjects || [])];
                          updatedSubs.push({ title: "New Sub-Project", description: "Sub-Project Description", image: "", tech: [], github: "#", live: "#" });
                          n[i] = { ...n[i], subProjects: updatedSubs };
                          updateData("projects", n);
                        }}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", background: "rgba(168, 85, 247, 0.05)", border: "1px dashed rgba(168, 85, 247, 0.3)", borderRadius: 12, padding: "10px", color: S.purple, cursor: "pointer", fontWeight: 600, fontSize: "0.8rem", fontFamily: "'Kanit', sans-serif", transition: "all 0.2s", marginTop: 8 }}
                      >
                        <Plus size={14} /> Add Sub-Project
                      </button>
                    </div>
                  </div>, proj.id || i
                ))}
                <button
                  onClick={() => {
                    const nextPriority = data.projects.length + 1;
                    const n = [...data.projects, { id: Date.now(), priority: nextPriority, title: "New Project", description: "Project Description", tech: [], image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000", github: "#", live: "#", icon: Briefcase, subProjects: [] }];
                    updateData("projects", n);
                  }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", background: "rgba(168, 85, 247, 0.1)", border: "1px dashed rgba(168, 85, 247, 0.4)", borderRadius: 16, padding: "16px", color: S.purple, cursor: "pointer", fontWeight: 600, fontSize: "0.9rem", fontFamily: "'Kanit', sans-serif", transition: "all 0.2s", marginTop: 8 }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(168, 85, 247, 0.2)"; e.currentTarget.style.borderColor = S.purple; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(168, 85, 247, 0.1)"; e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.4)"; }}
                >
                  <Plus size={16} /> Add New Project
                </button>
              </div>
            )}
            {activeSection === "journey" && (
              <div>
                <h3 style={{ color: "white", fontWeight: 700, marginBottom: 20, fontFamily: "'Kanit', sans-serif" }}>Journey</h3>
                {data.journey.map((item, i) => card(
                  <div key={i}>
                    {/* Title row with priority badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #a855f7, #7c3aed)", color: "white", fontSize: "0.72rem", fontWeight: 900, flexShrink: 0, boxShadow: "0 2px 8px rgba(168,85,247,0.4)" }}>
                        {item.priority ?? i + 1}
                      </div>
                      <p style={{ color: "#aaa", fontWeight: 600, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.role || "Journey Entry"}</p>
                    </div>
                    {/* Action buttons row */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                      <button
                        onClick={() => {
                          if (i === 0) return;
                          const n = [...data.journey];
                          [n[i - 1], n[i]] = [n[i], n[i - 1]];
                          n.forEach((p, idx) => { n[idx] = { ...p, priority: idx + 1 }; });
                          updateData("journey", n);
                        }}
                        disabled={i === 0}
                        style={{ background: i === 0 ? "rgba(255,255,255,0.03)" : "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: 8, padding: "7px 10px", color: i === 0 ? "#444" : S.purple, cursor: i === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 4, transition: "all 0.2s", fontSize: "0.7rem", fontFamily: "'Kanit', sans-serif", fontWeight: 600 }}
                        title="Move Up"
                      >
                        <ArrowUp size={14} /> Up
                      </button>
                      <button
                        onClick={() => {
                          if (i === data.journey.length - 1) return;
                          const n = [...data.journey];
                          [n[i], n[i + 1]] = [n[i + 1], n[i]];
                          n.forEach((p, idx) => { n[idx] = { ...p, priority: idx + 1 }; });
                          updateData("journey", n);
                        }}
                        disabled={i === data.journey.length - 1}
                        style={{ background: i === data.journey.length - 1 ? "rgba(255,255,255,0.03)" : "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.2)", borderRadius: 8, padding: "7px 10px", color: i === data.journey.length - 1 ? "#444" : S.purple, cursor: i === data.journey.length - 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 4, transition: "all 0.2s", fontSize: "0.7rem", fontFamily: "'Kanit', sans-serif", fontWeight: 600 }}
                        title="Move Down"
                      >
                        <ArrowDown size={14} /> Down
                      </button>
                      <div style={{ flex: 1 }} />
                      <button
                        onClick={() => {
                          const n = data.journey.filter((_, idx) => idx !== i);
                          n.forEach((p, idx) => { n[idx] = { ...p, priority: idx + 1 }; });
                          updateData("journey", n);
                        }}
                        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: "7px 10px", fontSize: "0.7rem", fontFamily: "'Kanit', sans-serif", fontWeight: 600, transition: "all 0.2s" }}
                        title="Delete Journey Entry"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                    {/* Priority number field */}
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: "block", color: "#888", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Priority (1 = shown first)</label>
                      <input
                        type="number" min="1"
                        value={item.priority ?? i + 1}
                        onChange={e => {
                          const val = parseInt(e.target.value) || 1;
                          const n = [...data.journey];
                          n[i] = { ...n[i], priority: val };
                          updateData("journey", n);
                        }}
                        style={{ width: "120px", background: "#1a1a1a", border: "1px solid #333", borderRadius: 10, padding: "10px 14px", color: S.purple, outline: "none", fontFamily: "'Kanit', sans-serif", fontSize: "1rem", fontWeight: 700 }}
                        onFocus={e => e.target.style.borderColor = S.purple}
                        onBlur={e => e.target.style.borderColor = "#333"}
                      />
                    </div>
                    {field("Role", item.role, v => { const n = [...data.journey]; n[i] = { ...n[i], role: v }; updateData("journey", n); })}
                    {field("Company", item.company, v => { const n = [...data.journey]; n[i] = { ...n[i], company: v }; updateData("journey", n); })}
                    {field("Duration", item.duration, v => { const n = [...data.journey]; n[i] = { ...n[i], duration: v }; updateData("journey", n); })}
                    {field("Description", item.description, v => { const n = [...data.journey]; n[i] = { ...n[i], description: v }; updateData("journey", n); }, "text", 3)}
                  </div>, i
                ))}
                <button
                  onClick={() => {
                    const nextPriority = data.journey.length + 1;
                    const n = [...data.journey, { role: "New Role", company: "New Company", duration: "2026", description: "Milestone description", icon: Cpu, priority: nextPriority }];
                    updateData("journey", n);
                  }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", background: "rgba(168, 85, 247, 0.1)", border: "1px dashed rgba(168, 85, 247, 0.4)", borderRadius: 16, padding: "16px", color: S.purple, cursor: "pointer", fontWeight: 600, fontSize: "0.9rem", fontFamily: "'Kanit', sans-serif", transition: "all 0.2s", marginTop: 8 }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(168, 85, 247, 0.2)"; e.currentTarget.style.borderColor = S.purple; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(168, 85, 247, 0.1)"; e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.4)"; }}
                >
                  <Plus size={16} /> Add Journey Milestone
                </button>
              </div>
            )}
            {activeSection === "certifications" && (
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                  <h3 style={{ color: "white", fontWeight: 700, fontFamily: "'Kanit', sans-serif" }}>Certifications</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: 9999, padding: "4px 12px" }}>
                    <Hash size={12} color={S.cyan} />
                    <span style={{ color: S.cyan, fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Priority Order</span>
                  </div>
                </div>
                <p style={{ color: "#555", fontSize: "0.75rem", marginBottom: 16, lineHeight: 1.4 }}>Lower number = shown first. Use ↑↓ arrows or type a priority number.</p>
                {data.certifications.map((cert, i) => card(
                  <div key={i}>
                    {/* Title row with priority badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #22d3ee, #0891b2)", color: "white", fontSize: "0.72rem", fontWeight: 900, flexShrink: 0, boxShadow: "0 2px 8px rgba(34,211,238,0.35)" }}>
                        {cert.priority ?? i + 1}
                      </div>
                      <p style={{ color: "#aaa", fontWeight: 600, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{cert.title}</p>
                    </div>
                    {/* Action buttons row */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                      <button
                        onClick={() => {
                          if (i === 0) return;
                          const n = [...data.certifications];
                          [n[i - 1], n[i]] = [n[i], n[i - 1]];
                          n.forEach((c, idx) => { n[idx] = { ...c, priority: idx + 1 }; });
                          updateData("certifications", n);
                        }}
                        disabled={i === 0}
                        style={{ background: i === 0 ? "rgba(255,255,255,0.03)" : "rgba(34,211,238,0.15)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: 8, padding: "7px 10px", color: i === 0 ? "#444" : S.cyan, cursor: i === 0 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 4, transition: "all 0.2s", fontSize: "0.7rem", fontFamily: "'Kanit', sans-serif", fontWeight: 600 }}
                        title="Move Up"
                      >
                        <ArrowUp size={14} /> Up
                      </button>
                      <button
                        onClick={() => {
                          if (i === data.certifications.length - 1) return;
                          const n = [...data.certifications];
                          [n[i], n[i + 1]] = [n[i + 1], n[i]];
                          n.forEach((c, idx) => { n[idx] = { ...c, priority: idx + 1 }; });
                          updateData("certifications", n);
                        }}
                        disabled={i === data.certifications.length - 1}
                        style={{ background: i === data.certifications.length - 1 ? "rgba(255,255,255,0.03)" : "rgba(34,211,238,0.15)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: 8, padding: "7px 10px", color: i === data.certifications.length - 1 ? "#444" : S.cyan, cursor: i === data.certifications.length - 1 ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 4, transition: "all 0.2s", fontSize: "0.7rem", fontFamily: "'Kanit', sans-serif", fontWeight: 600 }}
                        title="Move Down"
                      >
                        <ArrowDown size={14} /> Down
                      </button>
                      <div style={{ flex: 1 }} />
                      <button
                        onClick={() => {
                          const n = data.certifications.filter((_, idx) => idx !== i);
                          n.forEach((c, idx) => { n[idx] = { ...c, priority: idx + 1 }; });
                          updateData("certifications", n);
                        }}
                        style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: "7px 10px", fontSize: "0.7rem", fontFamily: "'Kanit', sans-serif", fontWeight: 600, transition: "all 0.2s" }}
                        title="Delete Certification"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                    {/* Priority number field */}
                    <div style={{ marginBottom: 16 }}>
                      <label style={{ display: "block", color: "#888", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Priority (1 = shown first)</label>
                      <input
                        type="number" min="1"
                        value={cert.priority ?? i + 1}
                        onChange={e => {
                          const val = parseInt(e.target.value) || 1;
                          const n = [...data.certifications];
                          n[i] = { ...n[i], priority: val };
                          updateData("certifications", n);
                        }}
                        style={{ width: "120px", background: "#1a1a1a", border: "1px solid #333", borderRadius: 10, padding: "10px 14px", color: S.cyan, outline: "none", fontFamily: "'Kanit', sans-serif", fontSize: "1rem", fontWeight: 700 }}
                        onFocus={e => e.target.style.borderColor = S.cyan}
                        onBlur={e => e.target.style.borderColor = "#333"}
                      />
                    </div>
                    {field("Title", cert.title, v => { const n = [...data.certifications]; n[i] = { ...n[i], title: v }; updateData("certifications", n); })}
                    {field("Issuer", cert.issuer, v => { const n = [...data.certifications]; n[i] = { ...n[i], issuer: v }; updateData("certifications", n); })}
                    {field("Year", cert.year, v => { const n = [...data.certifications]; n[i] = { ...n[i], year: v }; updateData("certifications", n); })}
                    <div style={{ marginBottom: 16 }}>
                      {label("Certification Image")}
                      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
                        {cert.image && (
                          <img src={cert.image} alt="Preview" style={{ width: 44, height: 44, borderRadius: 8, objectFit: "contain", border: "1px solid #333", background: "rgba(255,255,255,0.05)" }} />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const base64String = reader.result;
                                const n = [...data.certifications];
                                n[i] = { ...n[i], image: base64String };
                                updateData("certifications", n);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          style={{ display: "none" }}
                          id={`cert-img-file-${i}`}
                        />
                        <button
                          type="button"
                          onClick={() => document.getElementById(`cert-img-file-${i}`).click()}
                          style={{
                            background: S.purple,
                            border: "none",
                            borderRadius: 10,
                            padding: "10px 16px",
                            color: "white",
                            fontWeight: 600,
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            fontFamily: "'Kanit', sans-serif"
                          }}
                        >
                          Upload File
                        </button>
                        <span style={{ color: "#666", fontSize: "0.75rem" }}>or enter URL below:</span>
                      </div>
                    </div>
                    {field("Image URL", cert.image, v => { const n = [...data.certifications]; n[i] = { ...n[i], image: v }; updateData("certifications", n); })}
                    {field("Credential Link", cert.credentialLink, v => { const n = [...data.certifications]; n[i] = { ...n[i], credentialLink: v }; updateData("certifications", n); })}
                    
                    {/* Sub-Certificates Section */}
                    <div style={{ marginTop: 20, padding: 16, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: 16 }}>
                      <p style={{ color: S.cyan, fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Sub-Certificates / Certificate Gallery</p>
                      
                      {((cert.certificates || [])).map((subCert, subIndex) => (
                        <div key={subIndex} style={{ marginBottom: 16, borderBottom: subIndex < (cert.certificates || []).length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", paddingBottom: subIndex < (cert.certificates || []).length - 1 ? 16 : 0 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                            <p style={{ color: "#888", fontSize: "0.8rem", fontWeight: 600 }}>Certificate #{subIndex + 1}</p>
                            <button
                              type="button"
                              onClick={() => {
                                const n = [...data.certifications];
                                n[i] = {
                                  ...n[i],
                                  certificates: (n[i].certificates || []).filter((_, idx) => idx !== subIndex)
                                };
                                updateData("certifications", n);
                              }}
                              style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                              title="Delete Sub-Certificate"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                          {field(`Cert Title #${subIndex + 1}`, subCert.title, v => {
                            const n = [...data.certifications];
                            const updatedSubs = [...(n[i].certificates || [])];
                            updatedSubs[subIndex] = { ...updatedSubs[subIndex], title: v };
                            n[i] = { ...n[i], certificates: updatedSubs };
                            updateData("certifications", n);
                          })}
                          
                          {/* Image upload / input for sub cert */}
                          <div style={{ marginBottom: 8 }}>
                            {label(`Image for Cert #${subIndex + 1}`)}
                            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
                              {subCert.image && (
                                <img src={subCert.image} alt="Preview" style={{ width: 44, height: 44, borderRadius: 8, objectFit: "contain", border: "1px solid #333", background: "rgba(255,255,255,0.05)" }} />
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                onChange={e => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      const base64String = reader.result;
                                      const n = [...data.certifications];
                                      const updatedSubs = [...(n[i].certificates || [])];
                                      updatedSubs[subIndex] = { ...updatedSubs[subIndex], image: base64String };
                                      n[i] = { ...n[i], certificates: updatedSubs };
                                      updateData("certifications", n);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                style={{ display: "none" }}
                                id={`sub-cert-img-file-${i}-${subIndex}`}
                              />
                              <button
                                type="button"
                                onClick={() => document.getElementById(`sub-cert-img-file-${i}-${subIndex}`).click()}
                                style={{
                                  background: S.purple,
                                  border: "none",
                                  borderRadius: 10,
                                  padding: "8px 14px",
                                  color: "white",
                                  fontWeight: 600,
                                  cursor: "pointer",
                                  fontSize: "0.75rem",
                                  fontFamily: "'Kanit', sans-serif"
                                }}
                              >
                                Upload File
                              </button>
                            </div>
                          </div>
                          
                          {field(`Image URL #${subIndex + 1}`, subCert.image, v => {
                            const n = [...data.certifications];
                            const updatedSubs = [...(n[i].certificates || [])];
                            updatedSubs[subIndex] = { ...updatedSubs[subIndex], image: v };
                            n[i] = { ...n[i], certificates: updatedSubs };
                            updateData("certifications", n);
                          })}
                          
                          {field(`Credential Link #${subIndex + 1}`, subCert.credentialLink, v => {
                            const n = [...data.certifications];
                            const updatedSubs = [...(n[i].certificates || [])];
                            updatedSubs[subIndex] = { ...updatedSubs[subIndex], credentialLink: v };
                            n[i] = { ...n[i], certificates: updatedSubs };
                            updateData("certifications", n);
                          })}
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={() => {
                          const n = [...data.certifications];
                          const updatedSubs = [...(n[i].certificates || [])];
                          updatedSubs.push({ title: "New Certificate", image: "", credentialLink: "#" });
                          n[i] = { ...n[i], certificates: updatedSubs };
                          updateData("certifications", n);
                        }}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", background: "rgba(168, 85, 247, 0.05)", border: "1px dashed rgba(168, 85, 247, 0.3)", borderRadius: 12, padding: "10px", color: S.purple, cursor: "pointer", fontWeight: 600, fontSize: "0.8rem", fontFamily: "'Kanit', sans-serif", transition: "all 0.2s", marginTop: 8 }}
                      >
                        <Plus size={14} /> Add Sub-Certificate
                      </button>
                    </div>
                  </div>, i
                ))}
                <button
                  onClick={() => {
                    const nextPriority = data.certifications.length + 1;
                    const n = [...data.certifications, { priority: nextPriority, title: "New Certification", issuer: "Issuer", year: "2026", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1000", credentialLink: "#", certificates: [] }];
                    updateData("certifications", n);
                  }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", background: "rgba(168, 85, 247, 0.1)", border: "1px dashed rgba(168, 85, 247, 0.4)", borderRadius: 16, padding: "16px", color: S.purple, cursor: "pointer", fontWeight: 600, fontSize: "0.9rem", fontFamily: "'Kanit', sans-serif", transition: "all 0.2s", marginTop: 8 }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(168, 85, 247, 0.2)"; e.currentTarget.style.borderColor = S.purple; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(168, 85, 247, 0.1)"; e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.4)"; }}
                >
                  <Plus size={16} /> Add Certification
                </button>
              </div>
            )}
            {activeSection === "whatIBuild" && (
              <div>
                <h3 style={{ color: "white", fontWeight: 700, marginBottom: 20, fontFamily: "'Kanit', sans-serif" }}>What I Build</h3>
                {data.whatIBuild.map((item, i) => card(
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <p style={{ color: "#aaa", fontWeight: 600 }}>{item.title}</p>
                      <button
                        onClick={() => {
                          const n = data.whatIBuild.filter((_, idx) => idx !== i);
                          updateData("whatIBuild", n);
                        }}
                        style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                        title="Delete Service"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {field("Title", item.title, v => { const n = [...data.whatIBuild]; n[i] = { ...n[i], title: v }; updateData("whatIBuild", n); })}
                    {field("Description", item.description, v => { const n = [...data.whatIBuild]; n[i] = { ...n[i], description: v }; updateData("whatIBuild", n); }, "text", 3)}
                  </div>, i
                ))}
                <button
                  onClick={() => {
                    const n = [...data.whatIBuild, { title: "New Service", description: "Service description", icon: Code2, color: "#a855f7" }];
                    updateData("whatIBuild", n);
                  }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", background: "rgba(168, 85, 247, 0.1)", border: "1px dashed rgba(168, 85, 247, 0.4)", borderRadius: 16, padding: "16px", color: S.purple, cursor: "pointer", fontWeight: 600, fontSize: "0.9rem", fontFamily: "'Kanit', sans-serif", transition: "all 0.2s", marginTop: 8 }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(168, 85, 247, 0.2)"; e.currentTarget.style.borderColor = S.purple; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(168, 85, 247, 0.1)"; e.currentTarget.style.borderColor = "rgba(168, 85, 247, 0.4)"; }}
                >
                  <Plus size={16} /> Add Service
                </button>
              </div>
            )}
            {activeSection === "githubStats" && (
              <div>
                <h3 style={{ color: "white", fontWeight: 700, marginBottom: 20, fontFamily: "'Kanit', sans-serif" }}>GitHub Stats</h3>
                <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 16, padding: "20px", marginBottom: 16 }}>
                  {field("GitHub Username", data.githubStats?.username ?? "", v => updateData("githubStats", { ...data.githubStats, username: v }))}
                  {field("Contributions This Year", data.githubStats?.contributions ?? "", v => updateData("githubStats", { ...data.githubStats, contributions: v }))}
                  {field("Open Repositories", data.githubStats?.repos ?? "", v => updateData("githubStats", { ...data.githubStats, repos: v }))}
                  {field("Pull Requests", data.githubStats?.prs ?? "", v => updateData("githubStats", { ...data.githubStats, prs: v }))}
                  {field("Stars Earned", data.githubStats?.stars ?? "", v => updateData("githubStats", { ...data.githubStats, stars: v }))}
                  {field("Total Forks", data.githubStats?.forks ?? "", v => updateData("githubStats", { ...data.githubStats, forks: v }))}
                  
                  <button
                    onClick={async () => {
                      const username = data.githubStats?.username;
                      if (!username) return alert("Please enter a username first.");
                      try {
                        // Fetch user info
                        const resUser = await fetch(`https://api.github.com/users/${username}`);
                        if (!resUser.ok) throw new Error("User not found or rate limit reached");
                        const userData = await resUser.json();
                        
                        // Fetch user repos (up to 100)
                        const resRepos = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
                        let stars = 0;
                        let forks = 0;
                        if (resRepos.ok) {
                          const reposData = await resRepos.json();
                          reposData.forEach(r => {
                            stars += r.stargazers_count || 0;
                            forks += r.forks_count || 0;
                          });
                        }
                        
                        updateData("githubStats", {
                          username,
                          contributions: data.githubStats?.contributions || "500+", 
                          repos: String(userData.public_repos ?? 0),
                          prs: data.githubStats?.prs || "24", 
                          stars: String(stars),
                          forks: String(forks)
                        });
                        alert("Successfully fetched live stats from GitHub API! Don't forget to click Save.");
                      } catch (err) {
                        alert("Error fetching from GitHub API: " + err.message);
                      }
                    }}
                    style={{
                      background: "#22d3ee",
                      border: "none",
                      borderRadius: 10,
                      padding: "12px 20px",
                      color: "#0c0c0c",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "'Kanit', sans-serif",
                      marginTop: 8,
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    Fetch Live Stats
                  </button>
                </div>
              </div>
            )}
            {activeSection === "settings" && (
              <SettingsPanel changePin={changePin} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SETTINGS PANEL (inside Admin Portal)
// ============================================================
function SettingsPanel({ changePin }) {
  const { adminPin, dbStatus } = useAdmin();
  const [currentPin, setCurrentPin]  = useState("");
  const [newPin, setNewPin]          = useState("");
  const [confirmPin, setConfirmPin]  = useState("");
  const [pinMsg, setPinMsg]          = useState({ text: "", ok: true });

  const inp = (val, set, placeholder, maxLen = 4) => (
    <input
      type="password" value={val} onChange={e => set(e.target.value.replace(/\D/g, ""))}
      placeholder={placeholder} maxLength={maxLen}
      style={{ width: "100%", background: "#1a1a1a", border: "1px solid #333", borderRadius: 10, padding: "12px 16px", color: "white", outline: "none", fontFamily: "'Kanit', sans-serif", fontSize: "1.2rem", letterSpacing: "0.4em", textAlign: "center", transition: "border-color 0.2s" }}
      onFocus={e => e.target.style.borderColor = S.purple}
      onBlur={e => e.target.style.borderColor = "#333"}
    />
  );

  const handlePinChange = () => {
    if (currentPin !== adminPin)             { setPinMsg({ text: "Current PIN is incorrect.", ok: false }); return; }
    if (!/^\d{4}$/.test(newPin))             { setPinMsg({ text: "New PIN must be exactly 4 digits.", ok: false }); return; }
    if (newPin !== confirmPin)               { setPinMsg({ text: "PINs do not match.", ok: false }); return; }
    changePin(newPin);
    setCurrentPin(""); setNewPin(""); setConfirmPin("");
    setPinMsg({ text: "✓ PIN changed successfully!", ok: true });
    setTimeout(() => setPinMsg({ text: "", ok: true }), 3000);
  };

  return (
    <div>
      <h3 style={{ color: "white", fontWeight: 700, marginBottom: 24, fontFamily: "'Kanit', sans-serif", fontSize: "1.1rem" }}>Settings</h3>

      {/* DB Connection Status */}
      <div style={{ background: "#1a1a1a", border: `1px solid ${dbStatus === "synced" ? "rgba(16,185,129,0.25)" : dbStatus === "error" ? "rgba(239,68,68,0.25)" : "#2a2a2a"}`, borderRadius: 16, padding: "20px 24px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, background: dbStatus === "synced" ? "rgba(16,185,129,0.12)" : dbStatus === "error" ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.06)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Database size={16} color={dbStatus === "synced" ? "#10b981" : dbStatus === "error" ? "#ef4444" : "#555"} />
          </div>
          <div>
            <p style={{ color: "white", fontWeight: 600, fontSize: "0.95rem", fontFamily: "'Kanit', sans-serif" }}>Database Status</p>
            <p style={{ color: dbStatus === "synced" ? "#10b981" : dbStatus === "error" ? "#ef4444" : "#888", fontSize: "0.78rem" }}>
              {dbStatus === "synced"  ? "Connected — MongoDB is syncing correctly" :
               dbStatus === "error"   ? "Unavailable — falling back to localStorage" :
               dbStatus === "syncing" ? "Connecting to MongoDB…" :
                                        "Not connected — data stored locally only"}
            </p>
          </div>
        </div>
      </div>

      {/* Change PIN */}
      <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 16, padding: "24px", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 36, height: 36, background: "rgba(168,85,247,0.12)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Key size={16} color={S.purple} />
          </div>
          <div>
            <p style={{ color: "white", fontWeight: 600, fontSize: "0.95rem", fontFamily: "'Kanit', sans-serif" }}>Change Admin PIN</p>
            <p style={{ color: "#666", fontSize: "0.78rem" }}>Your PIN is stored locally in this browser</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 16 }}>
          <div>
            <label style={{ display: "block", color: "#888", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Current PIN</label>
            {inp(currentPin, setCurrentPin, "••••")}
          </div>
          <div>
            <label style={{ display: "block", color: "#888", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>New PIN</label>
            {inp(newPin, setNewPin, "••••")}
          </div>
          <div>
            <label style={{ display: "block", color: "#888", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Confirm New PIN</label>
            {inp(confirmPin, setConfirmPin, "••••")}
          </div>
        </div>
        {pinMsg.text && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 10, marginBottom: 12, background: pinMsg.ok ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)", border: `1px solid ${pinMsg.ok ? "rgba(16,185,129,0.3)" : "rgba(239,68,68,0.3)"}` }}>
            {pinMsg.ok ? <CheckCircle size={14} color="#10b981" /> : <AlertCircle size={14} color="#ef4444" />}
            <span style={{ color: pinMsg.ok ? "#10b981" : "#ef4444", fontSize: "0.82rem" }}>{pinMsg.text}</span>
          </div>
        )}
        <button onClick={handlePinChange}
          style={{ display: "flex", alignItems: "center", gap: 8, background: S.purple, border: "none", borderRadius: 10, padding: "11px 20px", color: "white", fontWeight: 700, cursor: "pointer", fontSize: "0.82rem", fontFamily: "'Kanit', sans-serif" }}>
          <Key size={14} /> Update PIN
        </button>
      </div>
    </div>
  );
}

// ============================================================
// HERO SECTION
// ============================================================
function HeroSection() {
  const { data } = useAdmin();
  const [taglineIdx, setTaglineIdx] = useState(0);
  const tagline = data.personalInfo.tagline;
  const taglines = useMemo(() => [
    tagline,
    "Building modern AI-powered web applications",
    "Engineering AI-driven digital experiences",
    "Exploring intelligent full-stack systems",
  ], [tagline]);
  useEffect(() => {
    const t = setInterval(() => setTaglineIdx(i => (i + 1) % taglines.length), 3000);
    return () => clearInterval(t);
  }, [taglines]);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const marqueeItems = ["React", "Node.js", "MongoDB", "AI / LLMs", "Framer Motion", "TypeScript", "OpenAI", "Next.js", "Docker", "LangChain", "Tailwind CSS", "Express"];

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", background: S.dark }}>
      {/* Floating particles */}
      <ParticlesBg count={22} />

      {/* Ambient glow orbs */}
      <motion.div style={{ y: heroY, position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "90vw", height: "90vw", maxWidth: 1000, background: "radial-gradient(ellipse, rgba(168,85,247,0.07) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "60%", left: "10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(34,211,238,0.05) 0%, transparent 70%)", pointerEvents: "none", borderRadius: "50%" }} />
      <div style={{ position: "absolute", top: "30%", right: "5%", width: 200, height: 200, background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)", pointerEvents: "none", borderRadius: "50%" }} />

      {/* Grid overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

      <motion.div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "140px clamp(20px,4vw,60px) clamp(40px,6vw,80px)", position: "relative", zIndex: 10, textAlign: "center", opacity: heroOpacity }}>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="glow-pulse" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.35)", borderRadius: 9999, padding: "6px 16px", marginBottom: 32 }}>
            <motion.div
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: "50%", background: S.purple }}
            />
            <span style={{ color: S.purple, fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em" }}>Available for opportunities</span>
          </div>
        </motion.div>

        {/* Main heading — letters animate in */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h1 className="hero-heading" style={{
            fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em",
            lineHeight: 1, fontSize: "clamp(3.5rem, 14vw, 160px)", marginBottom: 8,
          }}>
            {data.personalInfo.name}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <p style={{ color: "#888", fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "clamp(0.75rem,1.5vw,1.1rem)", marginBottom: 24 }}>
            <Typewriter text={data.personalInfo.role} speed={60} />
          </p>
        </motion.div>

        {/* Rotating tagline */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="hero-tagline-container">
            <AnimatePresence mode="wait">
              <motion.p
                key={taglineIdx}
                initial={{ y: 24, opacity: 0, x: 20 }}
                animate={{ y: 0, opacity: 1, x: 0 }}
                exit={{ y: -24, opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="hero-tagline"
              >{taglines[taglineIdx]}</motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <ContactBtn />
            </motion.div>
            <motion.a
              href={data.personalInfo.github} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04, borderColor: "rgba(215,226,234,0.6)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                border: "2px solid rgba(215,226,234,0.25)", borderRadius: 9999,
                padding: "clamp(10px,1.2vw,14px) clamp(28px,3vw,48px)",
                color: S.text, fontFamily: "'Kanit', sans-serif", fontWeight: 500,
                textTransform: "uppercase", letterSpacing: "0.1em",
                fontSize: "clamp(0.7rem,0.9vw,0.95rem)",
              }}
            >
              <Github size={16} /> GitHub
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ color: S.cyan }}>
            <ChevronDown size={22} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Marquee ticker */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <MarqueeTicker items={marqueeItems} />
      </div>

      {/* Description strip */}
      <FadeIn delay={0.65} y={20}>
        <div style={{
          background: "rgba(215,226,234,0.02)",
          borderTop: "1px solid rgba(215,226,234,0.06)",
          padding: "clamp(24px, 4vw, 40px) clamp(20px, 4vw, 60px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          textAlign: "center",
          position: "relative",
          zIndex: 10,
        }}>
          <p style={{
            color: S.text,
            opacity: 0.75,
            fontWeight: 300,
            maxWidth: 720,
            lineHeight: 1.7,
            fontSize: "clamp(0.85rem, 1.2vw, 1.05rem)",
            margin: "0 auto",
          }}>
            {data.personalInfo.heroDescription}
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {data.socialLinks.map((link, idx) => (
              <motion.a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                whileHover={{ scale: 1.15, y: -4 }}
                style={{
                  width: 44, height: 44,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(215,226,234,0.12)",
                  borderRadius: 12, color: S.text, opacity: 0.6,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.background = "rgba(168,85,247,0.1)";
                  e.currentTarget.style.borderColor = "rgba(168,85,247,0.4)";
                  e.currentTarget.style.color = S.purple;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.opacity = "0.6";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = "rgba(215,226,234,0.12)";
                  e.currentTarget.style.color = S.text;
                }}
              >
                <link.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// ============================================================
// ABOUT SECTION
// ============================================================
function AboutSection() {
  const { data } = useAdmin();
  const stats = [
    { label: "Projects Built", value: data.projects.length },
    { label: "Certifications", value: data.certifications.length },
    { label: "Journey Milestones", value: data.journey.length },
  ];
  return (
    <section id="about" style={{ background: S.dark, padding: "clamp(80px,10vw,160px) clamp(20px,4vw,60px)", position: "relative", overflow: "hidden" }}>
      {/* Glow orb */}
      <div style={{ position: "absolute", bottom: "10%", right: "-10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)", pointerEvents: "none", borderRadius: "50%" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn delay={0} y={40} style={{ textAlign: "center", marginBottom: "clamp(48px,6vw,96px)" }}>
          <SectionHeading>About Me</SectionHeading>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: "clamp(32px,4vw,64px)", alignItems: "center" }}>
          {/* Profile card — slides from left */}
          <SlideLeft delay={0.1}>
            <GlassCard style={{ display: "flex", flexDirection: "column", gap: 24 }} className="glow-card">
              <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(34,211,238,0.3))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "default" }}
                >
                  <span style={{ color: "white", fontWeight: 900, fontSize: "1.6rem", fontFamily: "'Kanit', sans-serif" }}>NR</span>
                </motion.div>
                <div>
                  <h3 style={{ color: "white", fontWeight: 700, fontSize: "clamp(1.2rem,2vw,1.8rem)", fontFamily: "'Kanit', sans-serif", marginBottom: 4 }}>{data.personalInfo.name}</h3>
                  <p style={{ color: S.cyan, fontWeight: 500, fontSize: "0.9rem" }}>{data.personalInfo.role}</p>
                </div>
              </div>
              <p style={{ color: "#888", lineHeight: 1.7, fontSize: "clamp(0.85rem,1.2vw,1rem)" }}>{data.personalInfo.heroDescription}</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[{ label: data.personalInfo.email, icon: Mail, href: `mailto:${data.personalInfo.email}` }, { label: data.personalInfo.location, icon: MapPin, href: "#" }].map((item, idx) => (
                  <motion.a key={item.label || idx} href={item.href} whileHover={{ scale: 1.04, y: -2 }} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "8px 14px", color: "#888", fontSize: "0.82rem", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "white"} onMouseLeave={e => e.currentTarget.style.color = "#888"}>
                    <item.icon size={14} />{item.label}
                  </motion.a>
                ))}
              </div>
            </GlassCard>
          </SlideLeft>

          {/* Stats — slide from right with animated counters */}
          <SlideRight delay={0.2}>
            <div className="stats-grid">
              {stats.map((stat, i) => (
                <motion.div key={stat.label}
                  initial={{ opacity: 0, y: 40, scale: 0.85 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.06, y: -6, boxShadow: "0 16px 40px rgba(168,85,247,0.15)" }}
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "clamp(20px,2vw,32px)", textAlign: "center", cursor: "default" }}
                >
                  <div style={{ color: "white", fontWeight: 900, fontSize: "clamp(2rem,4vw,3.5rem)", fontFamily: "'Kanit', sans-serif", lineHeight: 1 }}>
                    <AnimatedCounter target={stat.value} />
                  </div>
                  <div style={{ color: "#666", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 8 }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </SlideRight>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// EDUCATION SECTION
// ============================================================
function EducationSection() {
  const { data } = useAdmin();
  return (
    <section id="education" style={{ background: S.dark, padding: "clamp(80px,10vw,160px) clamp(20px,4vw,60px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "-5%", width: 300, height: 300, background: "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)", pointerEvents: "none", borderRadius: "50%" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn delay={0} y={40} style={{ textAlign: "center", marginBottom: "clamp(48px,6vw,96px)" }}>
          <SectionHeading>Education</SectionHeading>
        </FadeIn>
        {data.education.map((edu, i) => {
          const type = edu.type || getEduType(edu);
          const showFocus = type === "college" || type === "institution";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -70 : 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(34,211,238,0.08)" }} transition={{ duration: 0.3 }}>
                <GlassCard style={{ marginBottom: 24, position: "relative", overflow: "hidden" }} className="glow-card">
                  <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: (showFocus && edu.focus && edu.focus.length > 0) ? 28 : 0 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                        <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="glass" style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: S.cyan, flexShrink: 0, cursor: "default" }}>
                          {type === "school" ? <BookOpen size={18} /> : <GraduationCap size={18} />}
                        </motion.div>
                        <h3 style={{ color: "white", fontWeight: 700, fontSize: "clamp(1.1rem,2vw,1.7rem)", fontFamily: "'Kanit', sans-serif", lineHeight: 1.2 }}>{edu.degree}</h3>
                      </div>
                      <p style={{ color: "#888", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.85rem" }}>{edu.college}</p>
                    </div>
                    {((type === "institution" ? edu.duration : edu.yearOfPassing) || null) && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.7 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                        className="glass"
                        style={{ padding: "6px 16px", borderRadius: 9999, color: "#888", fontSize: "0.8rem", fontFamily: "monospace", whiteSpace: "nowrap" }}
                      >{type === "institution" ? edu.duration : edu.yearOfPassing}</motion.span>
                    )}
                  </div>
                  {showFocus && edu.focus && edu.focus.length > 0 && (
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 20 }}>
                      <p style={{ color: S.cyan, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                        <Sparkles size={12} /> Focused On
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {(edu.focus || []).map((item, fi) => (
                          <motion.span key={item}
                            initial={{ opacity: 0, scale: 0.7 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.2 + fi * 0.06, ease: [0.34, 1.56, 0.64, 1] }}
                            whileHover={{ scale: 1.08, y: -3 }}
                            className="glass"
                            style={{ padding: "6px 14px", borderRadius: 9999, fontSize: "0.8rem", color: "#aaa", cursor: "default" }}
                          >{item}</motion.span>
                        ))}
                      </div>
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ============================================================
// PROJECTS SECTION
// ============================================================
function ProjectsSection() {
  const { data } = useAdmin();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedProjectGroup, setSelectedProjectGroup] = useState(null);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sort projects by priority (lowest = first), items without priority go last
  const sortedProjects = useMemo(() => {
    return [...data.projects].sort((a, b) => {
      const pa = a.priority ?? Infinity;
      const pb = b.priority ?? Infinity;
      return pa - pb;
    });
  }, [data.projects]);

  const [cardPositions, setCardPositions] = useState([
    { x: 40, y: 30, rot: -4 },
    { x: 480, y: 15, rot: 5 },
    { x: 100, y: 310, rot: 6 },
    { x: 540, y: 290, rot: -3 }
  ]);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const threads = useMemo(() => {
    const list = [];
    const projs = data.projects;
    for (let i = 0; i < projs.length; i++) {
      for (let j = i + 1; j < projs.length; j++) {
        const shared = projs[i].tech.filter(t => projs[j].tech.includes(t));
        if (shared.length > 0) {
          list.push({ from: i, to: j, tech: shared[0] });
        }
      }
    }
    return list;
  }, [data.projects]);

  return (
    <section id="projects" style={{
      background: "#120a06",
      backgroundImage: "radial-gradient(#1a110b 1px, transparent 1px), radial-gradient(#1a110b 1px, #120a06 1px)",
      backgroundSize: "24px 24px",
      backgroundPosition: "0 0, 12px 12px",
      padding: "clamp(80px,10vw,160px) clamp(20px,4vw,60px)",
      position: "relative",
      overflow: "hidden",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      borderBottom: "1px solid rgba(255,255,255,0.05)"
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 10 }}>
        <FadeIn delay={0} y={40} style={{ textAlign: "center", marginBottom: "clamp(48px,6vw,96px)" }}>
          <SectionHeading>Project Board</SectionHeading>
          <p style={{ color: "#8b7e74", marginTop: 16, fontSize: "clamp(0.85rem,1.2vw,1rem)" }}>
            Drag and inspect my work. Polaroid pins connect via red thread paths of shared technologies.
          </p>
        </FadeIn>

        {isMobile ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
            {sortedProjects.map((project, i) => {
              return (
                <div key={project.id || i} style={{
                  background: "#faf9f6",
                  border: "1px solid rgba(0,0,0,0.1)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                  padding: "16px 16px 28px 16px",
                  borderRadius: 2,
                  maxWidth: 340,
                  width: "100%",
                  color: "#22d3ee"
                }}>
                  <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "#faf9f6", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {project.image && <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />}
                  </div>
                  <h3 style={{ fontFamily: "monospace", fontSize: "1.1rem", fontWeight: "bold", color: "#222", margin: "0 0 8px 0" }}>
                    # {project.title.toUpperCase()}
                  </h3>
                  <p style={{ fontSize: "0.82rem", color: "#666", lineHeight: 1.4, margin: "0 0 16px 0" }}>
                    {project.description}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {project.tech.slice(0, 3).map(t => (
                        <span key={t} style={{ border: "1px solid #ddd", borderRadius: 4, padding: "2px 6px", fontSize: "0.62rem", color: "#555", background: "#f5f5f5" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    {project.subProjects && project.subProjects.length > 0 ? (
                      <button
                        onClick={() => setSelectedProjectGroup(project)}
                        style={{
                          background: "rgba(168,85,247,0.1)",
                          border: "1px solid rgba(168,85,247,0.25)",
                          borderRadius: 8,
                          padding: "6px 12px",
                          color: S.purple,
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 4
                        }}
                      >
                        View Projects ({project.subProjects.length})
                      </button>
                    ) : (
                      <div style={{ display: "flex", gap: 8 }}>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: "#333" }}><Github size={16} /></a>
                        <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ color: "#333" }}><ExternalLink size={16} /></a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ position: "relative", height: 800, background: "rgba(0,0,0,0.15)", borderRadius: 24, border: "2px solid rgba(139, 126, 116, 0.15)", overflow: "hidden" }}>
            <svg style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5, width: "100%", height: "100%" }}>
              {threads.map((thread, idx) => {
                const p1 = cardPositions[thread.from];
                const p2 = cardPositions[thread.to];
                if (!p1 || !p2) return null;

                const x1 = p1.x + 160;
                const y1 = p1.y + 12;
                const x2 = p2.x + 160;
                const y2 = p2.y + 12;

                const isFromHovered = hoveredIndex === thread.from;
                const isToHovered = hoveredIndex === thread.to;
                const active = isFromHovered || isToHovered;

                let opacity = 0.25;
                let strokeWidth = 1.5;
                if (hoveredIndex !== null) {
                  opacity = active ? 0.85 : 0.04;
                  strokeWidth = active ? 2.5 : 1.0;
                }

                const cx = (x1 + x2) / 2;
                const cy = (y1 + y2) / 2 + 35;

                return (
                  <g key={idx}>
                    <path
                      d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                      fill="none"
                      stroke="rgba(0,0,0,0.4)"
                      strokeWidth={strokeWidth}
                      strokeDasharray="2,3"
                      transform="translate(2, 4)"
                    />
                    <path
                      d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth={strokeWidth}
                      strokeDasharray="3,3"
                      style={{
                        opacity,
                        filter: active ? "drop-shadow(0 0 3px rgba(239, 68, 68, 0.6))" : "none",
                        transition: "opacity 0.3s, stroke-width 0.3s"
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {sortedProjects.map((project, i) => {
              const pos = cardPositions[i];
              if (!pos) return null;

              const isHovered = hoveredIndex === i;
              const isOtherHovered = hoveredIndex !== null && hoveredIndex !== i;

              return (
                <motion.div
                  key={project.id || i}
                  drag
                  dragMomentum={false}
                  dragElastic={0.05}
                  onDrag={(event, info) => {
                    setCardPositions(prev => {
                      const next = [...prev];
                      next[i] = {
                        ...next[i],
                        x: next[i].x + info.delta.x,
                        y: next[i].y + info.delta.y
                      };
                      return next;
                    });
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onTap={() => {
                    if (project.subProjects && project.subProjects.length > 0) {
                      setSelectedProjectGroup(project);
                    }
                  }}
                  style={{
                    position: "absolute",
                    left: pos.x,
                    top: pos.y,
                    transform: `rotate(${pos.rot}deg)`,
                    width: 320,
                    background: "#faf9f6",
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: isHovered
                      ? "0 30px 60px rgba(0,0,0,0.5), 0 0 15px rgba(239, 68, 68, 0.2)"
                      : "0 10px 30px rgba(0,0,0,0.35)",
                    padding: "16px 16px 24px 16px",
                    borderRadius: 2,
                    cursor: "grab",
                    zIndex: isHovered ? 25 : 15,
                    opacity: isOtherHovered ? 0.6 : 1.0,
                    transition: "box-shadow 0.2s, opacity 0.3s",
                    userSelect: "none"
                  }}
                  whileTap={{ cursor: "grabbing", scale: 1.02 }}
                >
                  <div style={{
                    position: "absolute",
                    top: 10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: isHovered ? "#ef4444" : "#ef444499",
                    border: "2px solid #fff",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                    zIndex: 20
                  }} />

                  <div style={{
                    position: "relative",
                    aspectRatio: "4/3",
                    overflow: "hidden",
                    background: "#faf9f6",
                    marginBottom: 16,
                    pointerEvents: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {project.image && <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />}
                  </div>

                  <h3 style={{
                    fontFamily: "monospace",
                    fontSize: "0.95rem",
                    fontWeight: 900,
                    color: "#222",
                    margin: "0 0 6px 0",
                    textTransform: "uppercase"
                  }}>
                    # {project.title}
                  </h3>
                  
                  <p style={{
                    fontSize: "0.78rem",
                    color: "#555",
                    lineHeight: 1.4,
                    height: 54,
                    overflow: "hidden",
                    margin: "0 0 12px 0"
                  }}>
                    {project.description}
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px dashed #ddd", paddingTop: 10 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {project.tech.slice(0, 3).map(t => (
                        <span key={t} style={{ border: "1px solid #ddd", borderRadius: 4, padding: "1px 5px", fontSize: "0.58rem", color: "#666", background: "#f0f0f0" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    {project.subProjects && project.subProjects.length > 0 ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProjectGroup(project);
                        }}
                        style={{
                          background: "rgba(168,85,247,0.08)",
                          border: "1px solid rgba(168,85,247,0.2)",
                          borderRadius: 6,
                          padding: "4px 10px",
                          color: S.purple,
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 4
                        }}
                      >
                        View Projects ({project.subProjects.length})
                      </button>
                    ) : (
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: "#333" }} onMouseDown={e => e.stopPropagation()}><Github size={14} /></a>
                        <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ color: "#333" }} onMouseDown={e => e.stopPropagation()}><ExternalLink size={14} /></a>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Project Gallery Modal */}
      <AnimatePresence>
        {selectedProjectGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(12px, 3vw, 24px)",
              background: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)"
            }}
            onClick={() => setSelectedProjectGroup(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{
                position: "relative",
                background: "#0C0C0C",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 28,
                width: "100%",
                maxWidth: 900,
                maxHeight: "85vh",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                padding: "clamp(24px, 4vw, 48px)",
                color: "#D7E2EA",
                boxShadow: "0 24px 60px rgba(0, 0, 0, 0.8)"
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProjectGroup(null)}
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#D7E2EA",
                  cursor: "pointer",
                  zIndex: 10,
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)"; e.currentTarget.style.borderColor = "#ef4444"; e.currentTarget.style.color = "#ef4444"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)"; e.currentTarget.style.color = "#D7E2EA"; }}
              >
                <X size={18} />
              </button>

              {/* Title & Header */}
              <div style={{ marginBottom: 28, paddingRight: 40 }}>
                <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 800, color: "white", marginBottom: 6, fontFamily: "'Kanit', sans-serif" }}>
                  {selectedProjectGroup.title}
                </h3>
                <p style={{ color: "#888", fontSize: "0.9rem" }}>
                  Hackathon Projects Gallery • {selectedProjectGroup.description}
                </p>
              </div>

              {/* Sub-Projects Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 24 }}>
                {(selectedProjectGroup.subProjects || []).map((p, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      borderRadius: 20,
                      padding: 20,
                      display: "flex",
                      flexDirection: "column",
                      gap: 12
                    }}
                  >
                    <div style={{ aspectRatio: "16/9", width: "100%", borderRadius: 12, overflow: "hidden", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {p.image ? (
                        <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <span style={{ color: "#444", fontSize: "0.8rem" }}>No Image Available</span>
                      )}
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 12 }}>
                      <div>
                        <h4 style={{ color: "white", fontWeight: 700, fontSize: "1.05rem", marginBottom: 6 }}>{p.title}</h4>
                        <p style={{ color: "#aaa", fontSize: "0.82rem", lineHeight: 1.4, marginBottom: 12 }}>{p.description}</p>
                        
                        {/* Tech tags */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                          {(p.tech || []).map(t => (
                            <span key={t} style={{ background: "rgba(168, 85, 247, 0.1)", border: "1px solid rgba(168, 85, 247, 0.2)", borderRadius: 6, padding: "2px 8px", fontSize: "0.65rem", color: S.purple }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: 12 }}>
                        {p.github && p.github !== "#" && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "inline-flex", alignItems: "center", gap: 4, color: S.cyan, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", transition: "color 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.color = S.purple}
                            onMouseLeave={e => e.currentTarget.style.color = S.cyan}
                          >
                            GitHub <Github size={12} />
                          </a>
                        )}
                        {p.live && p.live !== "#" && (
                          <a
                            href={p.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "inline-flex", alignItems: "center", gap: 4, color: S.cyan, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", transition: "color 0.2s" }}
                            onMouseEnter={e => e.currentTarget.style.color = S.purple}
                            onMouseLeave={e => e.currentTarget.style.color = S.cyan}
                          >
                            Live Demo <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ============================================================
// SKILLS SECTION
// ============================================================
function SkillsSection() {
  const { data } = useAdmin();
  
  // Map skills to the required constellation data structure
  const mappedSkills = useMemo(() => {
    const list = [];
    Object.entries(data.skills).forEach(([category, skillList]) => {
      skillList.forEach((sk, idx) => {
        // Find matching projects
        const matchedProjects = data.projects
          .filter(p => p.tech?.some(t => t.toLowerCase() === sk.name.toLowerCase()))
          .map(p => p.title);
        
        // Generate pseudo-proficiency dynamically based on skill name
        const seed = sk.name.charCodeAt(0) + (sk.name.charCodeAt(1) || 0);
        const proficiency = 72 + (seed % 24); // between 72% and 96%
        
        list.push({
          name: sk.name,
          category: category,
          proficiency,
          projects: matchedProjects.length > 0 ? matchedProjects : ["Prototype Engine"]
        });
      });
    });
    return list;
  }, [data.skills, data.projects]);

  return (
    <section id="skills" style={{
      background: "#0a0a14", // dark navy visual rule
      padding: "clamp(80px,10vw,160px) clamp(20px,4vw,60px)",
      position: "relative",
      overflow: "hidden"
    }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "70vw", height: "70vw", maxWidth: 700, background: "radial-gradient(ellipse, rgba(168,85,247,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />
      
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn delay={0} y={40} style={{ textAlign: "center", marginBottom: "clamp(48px,6vw,96px)" }}>
          <SectionHeading>Interactive Stack Network</SectionHeading>
          <p style={{ color: "#ef4444", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", marginTop: 16 }}>
            Interactive Stack Network
          </p>
          <p style={{ color: "#8b7e74", marginTop: 8, fontSize: "clamp(0.95rem,1.2vw,1.15rem)" }}>
            Drag the globe to inspect the stack.
          </p>
        </FadeIn>

        {/* Constellation Canvas Map */}
        <ConstellationCanvasMap skills={mappedSkills} />

        {/* Screen Reader Fallback Accessibility */}
        <div className="sr-only" style={{ display: "none" }}>
          <ul>
            {mappedSkills.map(sk => (
              <li key={sk.name}>{sk.name} ({sk.category}) - Proficiency: {sk.proficiency}%, Projects: {sk.projects.join(", ")}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONSTELLATION CANVAS DRAWING SUB-COMPONENT
// ============================================================
function ConstellationCanvasMap({ skills }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredStar, setHoveredStar] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // 3D rotation states
  const rotation = useRef({ x: 0.2, y: 0.3 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const rotationVelocity = useRef({ x: 0.0005, y: 0.0025 }); // slow continuous rotation

  // Process star data once using spherical distribution
  const stars = useMemo(() => {
    const R = 180;
    const N = skills.length;
    return skills.map((sk, idx) => {
      // Uniform distribution on a sphere using Fibonacci sphere algorithm
      const y = 1 - (idx / (N - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y); // radius at y
      const goldenRatio = Math.PI * (3 - Math.sqrt(5));
      const theta = goldenRatio * idx;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const getCategoryDetails = (category) => {
        const cat = category.toLowerCase();
        if (cat.includes("front")) return "#22d3ee";
        if (cat.includes("back")) return "#a855f7";
        if (cat.includes("ai") || cat.includes("ml")) return "#10b981";
        if (cat.includes("data")) return "#f59e0b";
        return "#eab308";
      };
      const color = getCategoryDetails(sk.category);

      return {
        ...sk,
        x3d: x * R,
        y3d: y * R,
        z3d: z * R,
        color,
        // projected 2D coordinates populated during render
        px: 0,
        py: 0,
        pSize: 6
      };
    });
  }, [skills]);

  // Handle resizing and main drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId = null;

    // Resize canvas
    const resizeCanvas = () => {
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = Math.max(500, rect.width * 0.55);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Static background background stars (twinkling, non-rotating)
    const bgStarsCount = 30;
    const bgStars = Array.from({ length: bgStarsCount }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.2 + 0.4,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.02 + Math.random() * 0.03
    }));

    // Main render loop
    const render = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const cameraDist = 550;
      const R = 180;

      // Draw background stars
      bgStars.forEach(star => {
        star.twinklePhase += star.twinkleSpeed;
        const opacity = 0.25 + 0.5 * Math.sin(star.twinklePhase);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(star.x * canvas.width, star.y * canvas.height, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update rotation angles if not dragging/hovering
      if (!isDragging.current && !hoveredStar) {
        rotation.current.y += rotationVelocity.current.y;
        rotation.current.x += rotationVelocity.current.x;
      }

      // Compute cos/sin values for 3D rotation
      const cosY = Math.cos(rotation.current.y);
      const sinY = Math.sin(rotation.current.y);
      const cosX = Math.cos(rotation.current.x);
      const sinX = Math.sin(rotation.current.x);

      // 1. Draw volumetric shading gradient inside the globe to make it feel solid/spherical
      const globegrd = ctx.createRadialGradient(centerX - R / 4, centerY - R / 4, 0, centerX, centerY, R);
      globegrd.addColorStop(0, "rgba(99, 102, 241, 0.08)"); // center highlight
      globegrd.addColorStop(0.6, "rgba(139, 92, 246, 0.03)");
      globegrd.addColorStop(1, "rgba(10, 10, 24, 0.75)"); // dark edges to simulate sphere curvature
      ctx.fillStyle = globegrd;
      ctx.beginPath();
      ctx.arc(centerX, centerY, R, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Globe Wireframe (Latitudes & Longitudes) with segment-by-segment depth color
      // Dynamic segments optimized for mobile viewport performance to avoid lag
      const isMobileGlobe = canvas.width < 640;
      const latCount = isMobileGlobe ? 4 : 7;
      const lonCount = isMobileGlobe ? 5 : 8;
      const segments = isMobileGlobe ? 16 : 32;

      // Draw Latitude parallel rings
      for (let i = 1; i < latCount; i++) {
        const latAngle = (i / latCount) * Math.PI - Math.PI / 2;
        const y_3d = R * Math.sin(latAngle);
        const r_3d = R * Math.cos(latAngle);
        
        let prevPx = 0, prevPy = 0, prevZ = 0;
        for (let j = 0; j <= segments; j++) {
          const lonAngle = (j / segments) * Math.PI * 2;
          const x_3d = r_3d * Math.cos(lonAngle);
          const z_3d = r_3d * Math.sin(lonAngle);

          // Project
          const x1 = x_3d * cosY - z_3d * sinY;
          const z1 = x_3d * sinY + z_3d * cosY;
          const y1 = y_3d * cosX - z1 * sinX;
          const z2 = y_3d * sinX + z1 * cosX;

          const scale = cameraDist / (cameraDist + z2);
          const px = centerX + x1 * scale;
          const py = centerY + y1 * scale;

          if (j > 0) {
            ctx.beginPath();
            ctx.moveTo(prevPx, prevPy);
            ctx.lineTo(px, py);
            const avgZ = (prevZ + z2) / 2;
            const opacity = avgZ > 0 ? 0.03 : 0.16; // Front lines are much brighter, back is faded
            ctx.strokeStyle = `rgba(129, 140, 248, ${opacity})`;
            ctx.lineWidth = avgZ > 0 ? 0.8 : 1.2;
            ctx.stroke();
          }

          prevPx = px;
          prevPy = py;
          prevZ = z2;
        }
      }

      // Draw Longitude meridian rings
      for (let i = 0; i < lonCount; i++) {
        const lonAngle = (i / lonCount) * Math.PI * 2;
        let prevPx = 0, prevPy = 0, prevZ = 0;
        for (let j = 0; j <= segments; j++) {
          const latAngle = (j / segments) * Math.PI * 2;
          const x_3d = R * Math.cos(latAngle) * Math.cos(lonAngle);
          const y_3d = R * Math.sin(latAngle);
          const z_3d = R * Math.cos(latAngle) * Math.sin(lonAngle);

          // Project
          const x1 = x_3d * cosY - z_3d * sinY;
          const z1 = x_3d * sinY + z_3d * cosY;
          const y1 = y_3d * cosX - z1 * sinX;
          const z2 = y_3d * sinX + z1 * cosX;

          const scale = cameraDist / (cameraDist + z2);
          const px = centerX + x1 * scale;
          const py = centerY + y1 * scale;

          if (j > 0) {
            ctx.beginPath();
            ctx.moveTo(prevPx, prevPy);
            ctx.lineTo(px, py);
            const avgZ = (prevZ + z2) / 2;
            const opacity = avgZ > 0 ? 0.03 : 0.16;
            ctx.strokeStyle = `rgba(129, 140, 248, ${opacity})`;
            ctx.lineWidth = avgZ > 0 ? 0.8 : 1.2;
            ctx.stroke();
          }

          prevPx = px;
          prevPy = py;
          prevZ = z2;
        }
      }

      // 3. Draw outer rim boundary circle of the globe
      ctx.beginPath();
      ctx.arc(centerX, centerY, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(129, 140, 248, 0.35)"; // clean, glowing outer rim
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Project all stars
      const projected = stars.map(star => {
        // Y-axis rotation
        const x1 = star.x3d * cosY - star.z3d * sinY;
        const z1 = star.x3d * sinY + star.z3d * cosY;

        // X-axis rotation
        const y1 = star.y3d * cosX - z1 * sinX;
        const z2 = star.y3d * sinX + z1 * cosX;

        // Perspective projection
        const scale = cameraDist / (cameraDist + z2);
        const px = centerX + x1 * scale;
        const py = centerY + y1 * scale;
        const pSize = star.pSize * scale;

        star.px = px;
        star.py = py;
        star.pSize = pSize;
        star.depth = z2; // save for sorting

        return star;
      });

      // 2. Draw 3D Connection Arcs
      const pairs = [
        ["React", "Node.js"],
        ["React", "TypeScript"],
        ["Node.js", "Express.js"],
        ["Node.js", "MongoDB"],
        ["OpenAI APIs", "LangChain"],
        ["Framer Motion", "UI/UX Design"],
        ["Next.js", "Tailwind CSS"],
        ["PostgreSQL", "REST APIs"],
        ["Docker", "Git/GitHub"]
      ];

      pairs.forEach(([nameA, nameB]) => {
        const a = projected.find(s => s.name.toLowerCase() === nameA.toLowerCase());
        const b = projected.find(s => s.name.toLowerCase() === nameB.toLowerCase());
        if (!a || !b) return;

        // Draw a bezier curve in 3D
        const midX = (a.x3d + b.x3d) / 2;
        const midY = (a.y3d + b.y3d) / 2;
        const midZ = (a.z3d + b.z3d) / 2;
        const len = Math.hypot(midX, midY, midZ) || 1;
        const push = 30; // arc bulge
        const ctrlX = (midX / len) * (R + push);
        const ctrlY = (midY / len) * (R + push);
        const ctrlZ = (midZ / len) * (R + push);

        ctx.beginPath();
        const curvePoints = 20;
        for (let t = 0; t <= curvePoints; t++) {
          const ratio = t / curvePoints;
          const term1 = (1 - ratio) * (1 - ratio);
          const term2 = 2 * (1 - ratio) * ratio;
          const term3 = ratio * ratio;

          const px_3d = term1 * a.x3d + term2 * ctrlX + term3 * b.x3d;
          const py_3d = term1 * a.y3d + term2 * ctrlY + term3 * b.y3d;
          const pz_3d = term1 * a.z3d + term2 * ctrlZ + term3 * b.z3d;

          // Project curve point
          const cx1 = px_3d * cosY - pz_3d * sinY;
          const cz1 = px_3d * sinY + pz_3d * cosY;
          const cy1 = py_3d * cosX - cz1 * sinX;
          const cz2 = py_3d * sinX + cz1 * cosX;

          const scale = cameraDist / (cameraDist + cz2);
          const cpx = centerX + cx1 * scale;
          const cpy = centerY + cy1 * scale;

          if (t === 0) ctx.moveTo(cpx, cpy);
          else ctx.lineTo(cpx, cpy);
        }

        const isHoverConnected = hoveredStar && (hoveredStar.name === a.name || hoveredStar.name === b.name);
        // Alpha fades if connection is on back of globe
        const avgDepth = (a.depth + b.depth) / 2;
        let baseAlpha = avgDepth > 0 ? 0.08 : 0.25;
        if (isHoverConnected) baseAlpha = 0.85;

        ctx.strokeStyle = `rgba(239, 68, 68, ${baseAlpha})`;
        ctx.lineWidth = isHoverConnected ? 2.0 : 1.0;
        ctx.stroke();
      });

      // Sort stars back-to-front (painter's algorithm)
      const sorted = [...projected].sort((a, b) => b.depth - a.depth);

      // 3. Draw Nodes (Pins + Labels)
      sorted.forEach(star => {
        const isSelf = hoveredStar && hoveredStar.name === star.name;
        const isFront = star.depth <= 20; // is the node on the front side of the globe

        if (!isFront && !isSelf) {
          // Draw small faded dot in the back
          ctx.beginPath();
          ctx.arc(star.px, star.py, 2.5 * (cameraDist / (cameraDist + star.depth)), 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
          ctx.fill();
          return;
        }

        // Draw pin (red and dark grey split triangle) pointing to star.px, star.py
        const pinHeight = 12;
        const pinHalfWidth = 4;
        
        // Left half: Red
        ctx.beginPath();
        ctx.moveTo(star.px, star.py);
        ctx.lineTo(star.px - pinHalfWidth, star.py - pinHeight);
        ctx.lineTo(star.px, star.py - pinHeight);
        ctx.closePath();
        ctx.fillStyle = "#ef4444";
        ctx.fill();

        // Right half: Dark grey
        ctx.beginPath();
        ctx.moveTo(star.px, star.py);
        ctx.lineTo(star.px + pinHalfWidth, star.py - pinHeight);
        ctx.lineTo(star.px, star.py - pinHeight);
        ctx.closePath();
        ctx.fillStyle = "#374151";
        ctx.fill();

        // Draw label text & pill below the pin
        const labelText = star.name.toLowerCase();
        ctx.font = "bold 9px monospace";
        const textWidth = ctx.measureText(labelText).width;
        
        const pillW = textWidth + 12;
        const pillH = 16;
        const pillX = star.px - pillW / 2;
        const pillY = star.py + 4;

        // Draw pill shadow
        ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;

        // Draw pill background (white)
        ctx.beginPath();
        ctx.roundRect(pillX, pillY, pillW, pillH, 4);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Reset shadow
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Draw pill border
        ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw pill text
        ctx.fillStyle = "#111827"; // dark text
        ctx.textAlign = "center";
        ctx.fillText(labelText, star.px, pillY + 11);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [stars, hoveredStar]);

  // Handle mouse movements
  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    if (isDragging.current) {
      const deltaX = e.clientX - dragStart.current.x;
      const deltaY = e.clientY - dragStart.current.y;
      rotation.current.y += deltaX * 0.005;
      rotation.current.x += deltaY * 0.005;
      dragStart.current = { x: e.clientX, y: e.clientY };
      setHoveredStar(null);
      return;
    }

    // Find if hovering a star
    let found = null;
    let minDist = 18; // hover threshold distance in px

    stars.forEach(star => {
      const dist = Math.hypot(star.px - mx, star.py - my);
      if (dist < minDist) {
        minDist = dist;
        found = star;
      }
    });

    if (found) {
      setHoveredStar(found);
      setTooltipPos({ x: found.px, y: found.py });
    } else {
      setHoveredStar(null);
    }
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    setHoveredStar(null);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.touches[0].clientX - rect.left;
      const my = e.touches[0].clientY - rect.top;
      
      let found = null;
      let minDist = 28; // larger threshold for touch targets on mobile
      
      stars.forEach(star => {
        const dist = Math.hypot(star.px - mx, star.py - my);
        if (dist < minDist) {
          minDist = dist;
          found = star;
        }
      });
      
      if (found) {
        setHoveredStar(found);
        setTooltipPos({ x: found.px, y: found.py });
      } else {
        setHoveredStar(null);
      }
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      
      if (isDragging.current) {
        if (e.cancelable) e.preventDefault();
        
        const deltaX = touch.clientX - dragStart.current.x;
        const deltaY = touch.clientY - dragStart.current.y;
        
        rotation.current.y += deltaX * 0.008;
        rotation.current.x += deltaY * 0.008;
        dragStart.current = { x: touch.clientX, y: touch.clientY };
        
        setHoveredStar(null);
      }
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleClick = () => {
    if (hoveredStar) {
      console.log(`Clicked skill star: ${hoveredStar.name}`);
      scrollToSection("projects");
    }
  };

  return (
    <div 
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: isDragging.current ? "grabbing" : hoveredStar ? "pointer" : "grab"
      }}
    >
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => { isDragging.current = false; setHoveredStar(null); }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onClick={handleClick}
        style={{ display: "block", width: "100%", height: "100%", touchAction: "none" }}
      />

      {/* Floating glassmorphic tooltip card */}
      <AnimatePresence>
        {hoveredStar && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              left: tooltipPos.x + 15,
              top: tooltipPos.y - 65,
              pointerEvents: "none",
              zIndex: 30,
              background: "rgba(10, 10, 24, 0.82)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${hoveredStar.color}44`,
              borderRadius: 14,
              padding: "12px 16px",
              boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 10px ${hoveredStar.color}1a`,
              width: 200,
              textAlign: "left"
            }}
          >
            <h4 style={{ color: "white", fontSize: "0.85rem", fontWeight: 800, margin: 0, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span>{hoveredStar.name}</span>
              <span style={{ fontSize: "0.65rem", padding: "2px 6px", borderRadius: 4, background: `${hoveredStar.color}22`, color: hoveredStar.color, textTransform: "uppercase" }}>{hoveredStar.category}</span>
            </h4>
            
            {/* Proficiency bar */}
            <div style={{ marginTop: 10, marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.68rem", color: "#888", marginBottom: 3 }}>
                <span>Proficiency</span>
                <span style={{ color: hoveredStar.color, fontWeight: "bold" }}>{hoveredStar.proficiency}%</span>
              </div>
              <div style={{ width: "100%", height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 99 }}>
                <div style={{ width: `${hoveredStar.proficiency}%`, height: "100%", background: hoveredStar.color, borderRadius: 99 }} />
              </div>
            </div>

            {/* Projects list chips */}
            <div style={{ fontSize: "0.68rem", color: "#666" }}>
              <span style={{ display: "block", marginBottom: 4 }}>Recent Projects:</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {hoveredStar.projects.map((proj, pIdx) => (
                  <span key={pIdx} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4, padding: "2px 6px", fontSize: "0.62rem", color: "#aaa" }}>
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// JOURNEY SECTION
// ============================================================
function JourneySection() {
  const { data } = useAdmin();
  const sortedJourney = useMemo(() => {
    return [...data.journey].sort((a, b) => {
      const pa = a.priority ?? Infinity;
      const pb = b.priority ?? Infinity;
      return pa - pb;
    });
  }, [data.journey]);
  return (
    <section id="journey" style={{ background: S.dark, padding: "clamp(80px,10vw,160px) clamp(20px,4vw,60px)", position: "relative", overflow: "hidden" }}>
      <ParticlesBg count={8} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <FadeIn delay={0} y={40} style={{ marginBottom: "clamp(48px,6vw,96px)" }}>
          <SectionHeading>My Evolution</SectionHeading>
          <p style={{ color: "#666", marginTop: 16, textAlign: "center", fontSize: "clamp(0.85rem,1.2vw,1rem)" }}>Tracing the path from interest to innovation.</p>
        </FadeIn>
        <div style={{ position: "relative", marginLeft: "clamp(16px,4vw,48px)", paddingLeft: 2 }}>
          {/* Animated timeline line */}
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ position: "absolute", left: -1, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #a855f7, #22d3ee, transparent)", transformOrigin: "top" }}
          />
          {sortedJourney.map((item, i) => {
            const Icon = item.icon || Cpu;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div style={{ position: "relative", paddingLeft: "clamp(28px,4vw,56px)", marginBottom: "clamp(28px,4vw,56px)" }}>
                  {/* Animated dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + 0.3, ease: [0.34, 1.56, 0.64, 1], duration: 0.5 }}
                    animate={{ boxShadow: ["0 0 8px rgba(34,211,238,0.4)", "0 0 20px rgba(34,211,238,0.8)", "0 0 8px rgba(34,211,238,0.4)"] }}
                    // @ts-ignore
                    transition2={{ duration: 2, repeat: Infinity }}
                    style={{ position: "absolute", left: -9, top: 4, width: 16, height: 16, background: S.dark, border: "2px solid #22d3ee", borderRadius: "50%", boxShadow: "0 0 15px #22d3ee", zIndex: 1 }}
                  />
                  <motion.div
                    whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(168,85,247,0.12)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <GlassCard style={{ position: "relative", overflow: "hidden" }} className="glow-card">
                      <div style={{ position: "absolute", top: 0, right: 0, opacity: 0.04 }}>
                        <Icon size={140} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                        <div>
                          <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12 + 0.25 }}
                            style={{ display: "block", color: "#666", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}
                          >{item.company}</motion.span>
                          <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.12 + 0.35 }}
                            style={{ color: "white", fontWeight: 700, fontSize: "clamp(1rem,2vw,1.5rem)", fontFamily: "'Kanit', sans-serif", textTransform: "uppercase" }}
                          >{item.role}</motion.h3>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.7 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.12 + 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                          style={{ display: "flex", alignItems: "center", gap: 6, color: S.cyan, fontSize: "0.82rem", background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: 9999, padding: "4px 12px", whiteSpace: "nowrap" }}
                        >
                          <Calendar size={12} />{item.duration}
                        </motion.div>
                      </div>
                      <p style={{ color: "#888", lineHeight: 1.7, fontSize: "clamp(0.85rem,1.1vw,1rem)" }}>{item.description}</p>
                    </GlassCard>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// GITHUB SECTION
// ============================================================
function GitHubSection() {
  const { data } = useAdmin();
  const stats = data.githubStats || {
    username: "NavaneethRaj05",
    contributions: "500+",
    repos: "12",
    prs: "24",
    stars: "42",
    forks: "18"
  };

  const githubStats = [
    { label: "Contributions this year", value: stats.contributions, color: S.purple },
    { label: "Open Repositories", value: stats.repos, color: S.cyan },
    { label: "Pull Requests", value: stats.prs, color: "#10b981" },
  ];
  return (
    <section id="github" style={{ background: S.dark, padding: "clamp(80px,10vw,160px) clamp(20px,4vw,60px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn delay={0} y={40} style={{ textAlign: "center", marginBottom: "clamp(48px,6vw,96px)" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: 9999, padding: "6px 16px", marginBottom: 20 }}>
            <Terminal size={12} color={S.cyan} />
            <span style={{ color: S.cyan, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>Open Source Impact</span>
          </div>
          <SectionHeading>GitHub Activity</SectionHeading>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "clamp(16px,2vw,28px)" }}>
          {/* Stats */}
          <FadeIn delay={0.1} y={30}>
            <GlassCard style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div className="glass" style={{ width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Github size={28} color="white" />
                </div>
                <div>
                  <p style={{ color: "white", fontWeight: 700, fontSize: "1rem", fontFamily: "'Kanit', sans-serif" }}>{stats.username}</p>
                  <p style={{ color: "#666", fontSize: "0.8rem" }}>github.com</p>
                </div>
              </div>
              {githubStats.map(stat => (
                <div key={stat.label}>
                  <div style={{ fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)", fontFamily: "'Kanit', sans-serif", lineHeight: 1, color: stat.color }}>{stat.value}</div>
                  <div style={{ color: "#666", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
              <a href={stats.username ? `https://github.com/${stats.username}` : (data.personalInfo.github || "#")} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "white", color: "black", borderRadius: 16, padding: "14px", fontWeight: 700, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.1em", transition: "background 0.2s", textDecoration: "none" }}
                onMouseEnter={e => e.currentTarget.style.background = "#22d3ee"}
                onMouseLeave={e => e.currentTarget.style.background = "white"}
              ><Github size={16} /> Visit Profile</a>
            </GlassCard>
          </FadeIn>

          {/* Contribution grid visual */}
          <FadeIn delay={0.2} y={30}>
            <GlassCard>
              <h3 style={{ color: "white", fontWeight: 700, marginBottom: 24, fontFamily: "'Kanit', sans-serif", display: "flex", alignItems: "center", gap: 10 }}>
                Repository Insights
                <span style={{ fontSize: "0.7rem", color: S.cyan, background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: 9999, padding: "2px 10px" }}>Live Sync</span>
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                {[{ label: "Stars Earned", value: stats.stars, icon: Star, color: "#f59e0b" }, { label: "Total Forks", value: stats.forks, icon: GitFork, color: S.purple }].map(stat => (
                  <div key={stat.label} className="glass" style={{ borderRadius: 20, padding: "clamp(16px,2vw,24px)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <span style={{ color: "#888", fontSize: "0.8rem" }}>{stat.label}</span>
                      <stat.icon size={14} color={stat.color} />
                    </div>
                    <div style={{ color: "white", fontWeight: 900, fontSize: "clamp(1.5rem,3vw,2.5rem)", fontFamily: "'Kanit', sans-serif" }}>{stat.value}</div>
                  </div>
                ))}
              </div>
              {/* Visual contribution grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(13, 1fr)", gap: 3, opacity: 0.35 }}>
                {Array.from({ length: 52 }).map((_, i) => (
                  <div key={i} style={{ aspectRatio: "1", borderRadius: 3, background: i % 3 === 0 ? S.cyan : i % 5 === 0 ? S.purple : "rgba(255,255,255,0.08)", opacity: (((i * 7) % 10) / 10) * 0.8 + 0.2 }} />
                ))}
              </div>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHAT I BUILD SECTION
// ============================================================
// ============================================================
// WHAT I BUILD SECTION
// ============================================================
const getServiceIcon = (title) => {
  const t = title.toLowerCase();
  if (t.includes("ai") || t.includes("machine") || t.includes("intel")) return Cpu;
  if (t.includes("web") || t.includes("stack") || t.includes("full")) return Code2;
  if (t.includes("ui") || t.includes("ux") || t.includes("design") || t.includes("interface")) return Layout;
  if (t.includes("auto") || t.includes("script") || t.includes("bot") || t.includes("workflow")) return Smartphone;
  return Code2;
};

function WhatIBuildSection() {
  const { data } = useAdmin();
  const [activeCard, setActiveCard] = useState(null);
  const rotationAngleRef = useRef(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  // Dynamic viewport sizing for zero-lag mobile responsiveness
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const services = data.whatIBuild || [];
  const N = services.length;
  
  const isMobileSize = windowWidth < 640;
  const rx = isMobileSize ? 130 : 220;
  const ry = isMobileSize ? 55 : 90;
  const cx = isMobileSize ? 160 : 250;
  const cy = isMobileSize ? 160 : 250;
  const containerSize = isMobileSize ? 320 : 500;
  const nodeSize = isMobileSize ? 42 : 54;
  const hubSize = isMobileSize ? 140 : 220;

  const nodesRefs = useRef([]);
  const svgLinesRefs = useRef([]);
  const pulseCircleRef = useRef(null);

  // Initial nodes layout coordinates for SSR/First paint
  const nodes = useMemo(() => {
    return services.map((service, idx) => {
      const angle = (2 * Math.PI * idx) / N + rotationAngleRef.current;
      const x = cx + Math.cos(angle) * rx;
      const y = cy + Math.sin(angle) * ry;
      const depth = Math.sin(angle);
      const color = service.color || "#a855f7";
      return { ...service, x, y, angle, depth, color, index: idx };
    });
  }, [services, N, cx, cy, rx, ry]);

  // Animation loop updating DOM nodes directly to bypass React virtual DOM overhead and lag
  useEffect(() => {
    let animId;
    const tick = () => {
      // Rotate if no specific node is hovered/active
      if (activeCard === null) {
        rotationAngleRef.current = (rotationAngleRef.current + 0.002) % (Math.PI * 2);
      }

      services.forEach((service, idx) => {
        const angle = (2 * Math.PI * idx) / N + rotationAngleRef.current;
        const x = cx + Math.cos(angle) * rx;
        const y = cy + Math.sin(angle) * ry;
        const depth = Math.sin(angle); // ranges from -1 to 1

        const nodeEl = nodesRefs.current[idx];
        if (nodeEl) {
          nodeEl.style.left = `${x}px`;
          nodeEl.style.top = `${y}px`;
          nodeEl.style.zIndex = String(Math.round(15 + depth * 5));
          
          const isActive = activeCard === idx;
          const scale = 0.82 + (depth + 1) * 0.12;
          const opacity = 0.55 + (depth + 1) * 0.225;
          nodeEl.style.opacity = isActive ? "1" : String(opacity);
          nodeEl.style.transform = `translate(-50%, -50%) scale(${scale})`;
        }

        const lineEl = svgLinesRefs.current[idx];
        if (lineEl) {
          lineEl.setAttribute("x2", String(x));
          lineEl.setAttribute("y2", String(y));
        }

        if (activeCard === idx && pulseCircleRef.current) {
          pulseCircleRef.current.setAttribute("cx", String(x));
          pulseCircleRef.current.setAttribute("cy", String(y));
        }
      });

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [services, N, cx, cy, rx, ry, activeCard]);

  const activeService = activeCard !== null ? services[activeCard] : null;
  const ActiveServiceIcon = activeService ? getServiceIcon(activeService.title) : null;

  return (
    <section id="what-i-build" style={{
      background: "#08070d",
      padding: "clamp(80px,10vw,160px) clamp(20px,4vw,60px)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow effects */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "80vw", height: "80vw", maxWidth: 900, background: "radial-gradient(circle, rgba(168,85,247,0.03) 0%, transparent 65%)", pointerEvents: "none", zIndex: 1 }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 10 }}>
        
        {/* Section Heading */}
        <FadeIn delay={0} y={40} style={{ textAlign: "center", marginBottom: "48px" }}>
          <SectionHeading>Capabilities</SectionHeading>
          <p style={{ color: "#ef4444", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", marginTop: 16 }}>
            What I Build
          </p>
          <p style={{ color: "#8b7e74", marginTop: 8, fontSize: "clamp(0.95rem,1.2vw,1.15rem)" }}>
            Explore my core development competencies in the orbital map.
          </p>
        </FadeIn>

        {/* Responsive Outer Wrapper for Orbit Map */}
        <div 
          onMouseLeave={() => { setActiveCard(null); }}
          onClick={() => { setActiveCard(null); }}
          onTouchStart={() => { setActiveCard(null); }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: isMobileSize ? 360 : 520,
            width: "100%",
            overflow: "visible",
            padding: "20px 0"
          }}
        >
          {/* Scaling wrapper to make the layout responsive without blurry transform scale */}
          <div style={{
            position: "relative",
            width: containerSize,
            height: containerSize,
            flexShrink: 0
          }}>
            {/* SVG Connecting lines & orbits */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", zIndex: 2 }}>
              {/* Outer orbital track boundary (Elliptical / Solar System) */}
              <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
              <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="rgba(168,85,247,0.15)" strokeWidth="1.5" strokeDasharray="5,8" style={{ filter: "drop-shadow(0 0 4px rgba(168,85,247,0.4))" }} />

              {/* Connecting rays from center to nodes */}
              {nodes.map(node => {
                const isActive = activeCard === node.index;
                return (
                  <g key={node.index}>
                    <line
                      ref={el => svgLinesRefs.current[node.index] = el}
                      x1={cx}
                      y1={cy}
                      x2={node.x}
                      y2={node.y}
                      stroke={isActive ? `${node.color}55` : "rgba(255, 255, 255, 0.08)"}
                      strokeWidth={isActive ? 2 : 1}
                      style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                    />
                    
                    {/* Glowing pulse particle on active connection path */}
                    {isActive && (
                      <motion.circle
                        ref={pulseCircleRef}
                        r={4}
                        fill={node.color}
                        initial={{ cx: cx, cy: cy }}
                        animate={{ cx: node.x, cy: node.y }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        style={{ filter: `drop-shadow(0 0 6px ${node.color})` }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Central glassmorphic detail display hub */}
            <div style={{
              position: "absolute",
              left: cx,
              top: cy,
              transform: "translate(-50%, -50%)",
              width: hubSize,
              height: hubSize,
              borderRadius: "50%",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: isMobileSize ? 12 : 20
            }}>
              {/* Spinning technical HUD ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
                style={{
                  position: "absolute",
                  inset: isMobileSize ? -6 : -12,
                  borderRadius: "50%",
                  border: "1px dashed rgba(168, 85, 247, 0.2)",
                  pointerEvents: "none"
                }}
              />
              
              {/* Central Glass panel */}
              <div 
                className="glass"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "rgba(10, 10, 18, 0.85)",
                  boxShadow: activeService 
                    ? `0 0 35px ${activeService.color}20, inset 0 0 15px ${activeService.color}15`
                    : "0 0 25px rgba(255,255,255,0.02)",
                  transition: "box-shadow 0.4s"
                }}
              />

              {/* Text / Detail content */}
              <div style={{ position: "relative", zIndex: 12, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <AnimatePresence mode="wait">
                  {!activeService ? (
                    <motion.div
                      key="default"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                      <Sparkles size={isMobileSize ? 20 : 26} color="#a855f7" style={{ marginBottom: 8, filter: "drop-shadow(0 0 8px rgba(168,85,247,0.4))" }} />
                      <h4 style={{ color: "white", fontSize: isMobileSize ? "0.75rem" : "0.85rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Core Hub</h4>
                      <p style={{ color: "#666", fontSize: isMobileSize ? "0.6rem" : "0.68rem", marginTop: 4, padding: "0 10px", lineHeight: 1.4 }}>Hover any node to see details</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={activeService.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                    >
                      {ActiveServiceIcon && <ActiveServiceIcon
                        size={isMobileSize ? 18 : 24}
                        color={activeService.color}
                        style={{ marginBottom: 6, filter: `drop-shadow(0 0 8px ${activeService.color}60)` }}
                      />}
                      <h4 style={{ color: "white", fontSize: isMobileSize ? "0.72rem" : "0.85rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                        {activeService.title}
                      </h4>
                      <p style={{ color: "#bbb", fontSize: isMobileSize ? "0.58rem" : "0.68rem", marginTop: 6, lineHeight: 1.3, padding: "0 5px", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: isMobileSize ? 3 : 4, WebkitBoxOrient: "vertical" }}>
                        {activeService.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Orbiting Capability Nodes */}
            {nodes.map(node => {
              const Icon = getServiceIcon(node.title);
              const isActive = activeCard === node.index;
              
              // 3D depth calculation: scale and opacity based on node's depth
              const scale = 0.82 + (node.depth + 1) * 0.12; // 0.82 to 1.06
              const opacity = 0.55 + (node.depth + 1) * 0.225; // 0.55 to 1.0
              const calculatedNodeSize = nodeSize * scale;

              return (
                <div
                  key={node.index}
                  ref={el => nodesRefs.current[node.index] = el}
                  style={{
                    position: "absolute",
                    left: node.x,
                    top: node.y,
                    transform: `translate(-50%, -50%) scale(${scale})`,
                    zIndex: Math.round(15 + node.depth * 5),
                    opacity: isActive ? 1 : opacity,
                    transition: "opacity 0.3s, z-index 0.3s"
                  }}
                >
                  <motion.div
                    onMouseEnter={() => setActiveCard(node.index)}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      setActiveCard(node.index);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCard(node.index);
                    }}
                    whileHover={{ scale: 1.12 }}
                    style={{
                      position: "relative",
                      width: calculatedNodeSize,
                      height: calculatedNodeSize,
                      borderRadius: "50%",
                      background: isActive 
                        ? `radial-gradient(circle at 30% 30%, ${node.color}, #0a0a12)`
                        : "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.08), rgba(10, 10, 18, 0.95))",
                      border: `1.5px solid ${isActive ? node.color : "rgba(255, 255, 255, 0.15)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isActive ? "white" : "rgba(255,255,255,0.5)",
                      cursor: "pointer",
                      boxShadow: isActive 
                        ? `0 0 25px ${node.color}70, inset 0 0 12px ${node.color}50`
                        : "0 6px 14px rgba(0,0,0,0.6)",
                      transition: "width 0.3s, height 0.3s, border-color 0.3s, color 0.3s, box-shadow 0.3s, background 0.3s"
                    }}
                  >
                    <Icon size={isMobileSize ? 16 : 20} />

                    {/* Orbit title label - Pill glassmorphic format to prevent overlapping text issues */}
                    <span style={{
                      position: "absolute",
                      top: calculatedNodeSize + 8,
                      left: -70,
                      width: 190,
                      textAlign: "center",
                      color: isActive ? "white" : "rgba(215, 226, 234, 0.75)",
                      fontSize: isMobileSize ? "0.62rem" : "0.7rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      pointerEvents: "none",
                      transition: "color 0.3s",
                      background: "rgba(10, 10, 18, 0.8)",
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                      border: `1px solid ${isActive ? node.color + "50" : "rgba(255, 255, 255, 0.08)"}`,
                      padding: "3px 10px",
                      borderRadius: 9999,
                      display: "inline-block",
                      boxShadow: isActive ? `0 0 10px ${node.color}25` : "0 4px 10px rgba(0,0,0,0.4)"
                    }}>
                      {node.title}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dedicated Capability Info Panel */}
        <div style={{ 
          marginTop: 24, 
          minHeight: 110, 
          display: "flex", 
          justifyContent: "center",
          width: "100%",
          padding: "0 10px"
        }}>
          <AnimatePresence mode="wait">
            {activeService ? (
              <motion.div
                key={activeService.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                style={{
                  maxWidth: 600,
                  width: "100%",
                  background: "rgba(10, 10, 18, 0.75)",
                  border: `1.5px solid ${activeService.color}40`,
                  borderRadius: 16,
                  padding: "16px 20px",
                  boxShadow: `0 8px 30px rgba(0,0,0,0.5), 0 0 15px ${activeService.color}15`,
                  textAlign: "center",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)"
                }}
              >
                <h3 style={{ 
                  color: "white", 
                  fontWeight: 800, 
                  fontSize: "clamp(1rem, 1.5vw, 1.25rem)", 
                  marginBottom: 8, 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  gap: 8,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  fontFamily: "'Kanit', sans-serif"
                }}>
                  {ActiveServiceIcon && <ActiveServiceIcon 
                    size={18} 
                    color={activeService.color}
                    style={{ filter: `drop-shadow(0 0 6px ${activeService.color})` }}
                  />}
                  <span style={{ color: activeService.color }}>{activeService.title}</span>
                </h3>
                <p style={{ color: "#d1d5db", lineHeight: 1.6, fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)", margin: 0 }}>
                  {activeService.description}
                </p>
              </motion.div>
            ) : (
              <div style={{ 
                color: "#666", 
                fontSize: "0.88rem", 
                fontStyle: "italic", 
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}>
                <Sparkles size={14} color="#666" />
                {isMobileSize ? "Tap any orbital node to view details" : "Hover or click any orbital node to view details"}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CERTIFICATIONS SECTION
// ============================================================
function CertificationsSection() {
  const { data } = useAdmin();
  const [selectedCertGroup, setSelectedCertGroup] = useState(null);

  // Sort certifications by priority (lowest = first), items without priority go last
  const sortedCertifications = useMemo(() => {
    return [...data.certifications].sort((a, b) => {
      const pa = a.priority ?? Infinity;
      const pb = b.priority ?? Infinity;
      return pa - pb;
    });
  }, [data.certifications]);
  return (
    <section id="certifications" style={{ background: "#ffffff", padding: "clamp(80px,10vw,160px) clamp(20px,4vw,60px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn delay={0} y={40} style={{ marginBottom: "clamp(48px,6vw,96px)" }}>
          <SectionHeading gradient={false} light>Certifications</SectionHeading>
          <div style={{ width: 60, height: 4, background: "linear-gradient(90deg, #a855f7, #22d3ee)", borderRadius: 9999, margin: "16px auto 0" }} />
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "clamp(16px,2vw,28px)" }}>
          {sortedCertifications.map((cert, i) => {
            const hasSubCerts = cert.certificates && cert.certificates.length > 0;
            return (
              <FadeIn key={i} delay={i * 0.1} y={30}>
                <motion.div
                  onClick={() => {
                    if (hasSubCerts) {
                      setSelectedCertGroup(cert);
                    } else if (cert.credentialLink && cert.credentialLink !== "#") {
                      window.open(cert.credentialLink, "_blank");
                    }
                  }}
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.3 }}
                  className="cert-card"
                  style={{ background: "#f8f8f8", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 28, padding: "clamp(20px,2vw,32px)", overflow: "hidden", cursor: "pointer" }}
                >
                  <div style={{ width: 90, height: 90, borderRadius: 18, overflow: "hidden", flexShrink: 0, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(0,0,0,0.03)" }}>
                    <img src={cert.image} alt={cert.title} style={{ width: "100%", height: "100%", objectFit: "contain", transition: "transform 0.5s" }}
                      onMouseEnter={e => e.target.style.transform = "scale(1.1)"}
                      onMouseLeave={e => e.target.style.transform = "scale(1)"}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ color: "#0C0C0C", fontWeight: 700, fontSize: "clamp(0.9rem,1.5vw,1.2rem)", fontFamily: "'Kanit', sans-serif", marginBottom: 6, lineHeight: 1.3 }}>{cert.title}</h3>
                    <p style={{ color: "#888", fontSize: "0.82rem", marginBottom: 14 }}>{cert.issuer} • {cert.year}</p>
                    {hasSubCerts ? (
                      <a href="#" onClick={e => { e.preventDefault(); e.stopPropagation(); setSelectedCertGroup(cert); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: S.cyan, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", transition: "color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.color = S.purple}
                        onMouseLeave={e => e.currentTarget.style.color = S.cyan}
                      >
                        View Certificates ({cert.certificates.length}) <ExternalLink size={12} />
                      </a>
                    ) : (
                      <a href={cert.credentialLink} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: S.cyan, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", transition: "color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.color = S.purple}
                        onMouseLeave={e => e.currentTarget.style.color = S.cyan}
                      >
                        Verify Credential <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedCertGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "clamp(12px, 3vw, 24px)",
              background: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)"
            }}
            onClick={() => setSelectedCertGroup(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{
                position: "relative",
                background: "#0C0C0C",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 28,
                width: "100%",
                maxWidth: 900,
                maxHeight: "85vh",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                padding: "clamp(24px, 4vw, 48px)",
                color: "#D7E2EA",
                boxShadow: "0 24px 60px rgba(0, 0, 0, 0.8)"
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCertGroup(null)}
                style={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#D7E2EA",
                  cursor: "pointer",
                  zIndex: 10,
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(239, 68, 68, 0.15)"; e.currentTarget.style.borderColor = "#ef4444"; e.currentTarget.style.color = "#ef4444"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"; e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)"; e.currentTarget.style.color = "#D7E2EA"; }}
              >
                <X size={18} />
              </button>

              {/* Title & Header */}
              <div style={{ marginBottom: 28, paddingRight: 40 }}>
                <h3 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: 800, color: "white", marginBottom: 6, fontFamily: "'Kanit', sans-serif" }}>
                  {selectedCertGroup.title}
                </h3>
                <p style={{ color: "#888", fontSize: "0.9rem" }}>
                  Issued by {selectedCertGroup.issuer} • {selectedCertGroup.year}
                </p>
              </div>

              {/* Certificates Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 24 }}>
                {(selectedCertGroup.certificates || []).map((c, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      borderRadius: 20,
                      padding: 16,
                      display: "flex",
                      flexDirection: "column",
                      gap: 12
                    }}
                  >
                    <div style={{ aspectRatio: "1.414", width: "100%", borderRadius: 12, overflow: "hidden", background: "rgba(255, 255, 255, 0.02)", border: "1px solid rgba(255, 255, 255, 0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {c.image ? (
                        <img src={c.image} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "contain", cursor: "zoom-in" }}
                          onClick={() => window.open(c.image, "_blank")}
                        />
                      ) : (
                        <span style={{ color: "#444", fontSize: "0.8rem" }}>No Image Available</span>
                      )}
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 12 }}>
                      <h4 style={{ color: "white", fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.4 }}>{c.title}</h4>
                      {c.credentialLink && c.credentialLink !== "#" && (
                        <a
                          href={c.credentialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            alignSelf: "flex-start",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            color: S.cyan,
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            transition: "color 0.2s"
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = S.purple}
                          onMouseLeave={e => e.currentTarget.style.color = S.cyan}
                        >
                          Verify Certificate <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ============================================================
// CONTACT SECTION
// ============================================================
function ContactSection() {
  const { data } = useAdmin();
  const [ledText, setLedText] = useState("SELECT PRODUCT SLOT");
  const [inputCode, setInputCode] = useState("");
  const [dispensingCode, setDispensingCode] = useState(null);
  const [trayCanister, setTrayCanister] = useState(null); // canister currently in the tray
  const [status, setStatus] = useState("idle");

  const adminEmail = data.personalInfo.email || ADMIN_EMAIL || "";

  const products = useMemo(() => [
    { code: "A1", label: "Email.exe", color: "#a855f7", icon: Mail },
    { code: "B2", label: "LinkedIn.dll", color: "#22d3ee", icon: Linkedin },
    { code: "C3", label: "GitHub.sh", color: "#10b981", icon: Github },
    { code: "D4", label: "Resume.pdf", color: "#f59e0b", icon: FileText }
  ], []);

  const handleKeyClick = (key) => {
    if (status === "dispensing") return;
    
    if (key === "CLEAR") {
      setInputCode("");
      setLedText("SELECT PRODUCT SLOT");
    } else if (key === "ENTER") {
      processSelection(inputCode.toUpperCase());
    } else {
      if (inputCode.length < 2) {
        const newCode = inputCode + key;
        setInputCode(newCode);
        setLedText(`SLOT: ${newCode}`);
      }
    }
  };

  const processSelection = (code) => {
    const prod = products.find(p => p.code === code);
    if (!prod) {
      setLedText("ERR: INVALID SLOT");
      setInputCode("");
      setTimeout(() => setLedText("SELECT PRODUCT SLOT"), 1500);
      return;
    }

    // Start dispensing sequence
    setStatus("dispensing");
    setInputCode("");
    setLedText(`SHIPPING ${prod.code}...`);
    setDispensingCode(prod.code);

    // Canister falls down to tray
    setTimeout(() => {
      setDispensingCode(null);
      setTrayCanister(prod);
      setStatus("collect");
      setLedText("COLLECT IN TRAY");
    }, 1200);
  };

  const handleCollect = () => {
    if (!trayCanister) return;

    setLedText("OPENING CAPSULE...");
    
    setTimeout(() => {
      const prod = trayCanister;
      setTrayCanister(null);
      setStatus("idle");
      setLedText("PRODUCT DISPENSED");

      // Actions based on product using correct admin details
      if (prod.code === "A1") {
        window.location.href = `mailto:${adminEmail}`;
        setLedText("EMAIL CLIENT OPENED");
      } else if (prod.code === "B2") {
        window.open(data.personalInfo.linkedin, "_blank", "noopener,noreferrer");
        setLedText("LINKEDIN OPENED");
      } else if (prod.code === "C3") {
        window.open(data.personalInfo.github, "_blank", "noopener,noreferrer");
        setLedText("GITHUB OPENED");
      } else if (prod.code === "D4") {
        window.open(data.personalInfo.resumeLink || "#", "_blank", "noopener,noreferrer");
        setLedText("RESUME OPENED");
      }
      
      setTimeout(() => setLedText("SELECT PRODUCT SLOT"), 2500);
    }, 800);
  };

  return (
    <section id="contact" style={{
      background: S.dark,
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "clamp(80px,10vw,160px) clamp(20px,4vw,60px)",
      position: "relative",
      overflow: "hidden",
    }}>
      <ParticlesBg count={10} />
      
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 10 }}>
        
        {/* Section Heading */}
        <FadeIn delay={0} y={40} style={{ textAlign: "center", marginBottom: "clamp(48px,6vw,96px)" }}>
          <SectionHeading>Contact Station</SectionHeading>
          <p style={{ color: "#666", marginTop: 16, fontSize: "clamp(0.85rem,1.2vw,1rem)" }}>
            Select a product canister from the vending machine slots or enter its slot code to connect.
          </p>
        </FadeIn>

        {/* Vending Machine Chassis */}
        <div style={{
          maxWidth: 680,
          margin: "0 auto",
          background: "linear-gradient(135deg, #181824 0%, #0c0c14 100%)",
          border: "4px solid #1a1a2e",
          borderRadius: 24,
          boxShadow: "0 30px 60px rgba(0,0,0,0.8), 0 0 40px rgba(168,85,247,0.1), inset 0 0 30px rgba(255,255,255,0.05)",
          padding: "32px 24px",
          display: "grid",
          gridTemplateColumns: "1fr 180px",
          gap: 24,
          position: "relative"
        }}>
          {/* Mobile responsive split */}
          <style>{`
            @media (max-width: 600px) {
              #contact > div > div {
                grid-template-columns: 1fr !important;
              }
            }
          `}</style>

          {/* Vending Compartment (Glass Cabinet) */}
          <div style={{
            background: "rgba(0, 0, 0, 0.4)",
            border: "2px solid #252538",
            borderRadius: 16,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: 400,
            position: "relative",
            boxShadow: "inset 0 0 20px rgba(0,0,0,0.8)"
          }}>
            {/* Glass shine effect */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 70%)",
              borderRadius: "14px 14px 0 0",
              pointerEvents: "none"
            }} />

            {/* Grid of Slots */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              height: 260
            }}>
              {products.map((prod, i) => {
                const Icon = prod.icon;
                const isDispensing = dispensingCode === prod.code;

                return (
                  <div
                    key={prod.code}
                    onClick={() => processSelection(prod.code)}
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: `1px solid ${prod.color}22`,
                      borderRadius: 12,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      cursor: "pointer",
                      boxShadow: `inset 0 0 10px ${prod.color}05`,
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = prod.color; e.currentTarget.style.background = `${prod.color}0a`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${prod.color}22`; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                  >
                    {/* Falling canister animation */}
                    <AnimatePresence>
                      {!isDispensing && (
                        <motion.div
                          exit={{ y: 200, scale: 0.8, opacity: 0 }}
                          transition={{ duration: 1.0, ease: "easeIn" }}
                          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                        >
                          {/* Spiral coil representation */}
                          <div style={{ width: 44, height: 16, border: "2px solid rgba(255,255,255,0.1)", borderBottom: "none", borderRadius: "50% 50% 0 0", marginBottom: 8 }} />
                          {/* Product canister */}
                          <div style={{
                            width: 44,
                            height: 60,
                            background: `linear-gradient(to bottom, #222, ${prod.color}aa, #222)`,
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: 6,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            boxShadow: `0 4px 10px ${prod.color}33`
                          }}>
                            <Icon size={20} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Channel tags and Code tags */}
                    <div style={{
                      marginTop: 8,
                      fontFamily: "monospace",
                      fontSize: "0.68rem",
                      background: "rgba(0,0,0,0.5)",
                      padding: "2px 6px",
                      borderRadius: 4,
                      color: "#aaa",
                      textAlign: "center",
                      width: "85%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}>
                      <span style={{ color: prod.color, fontWeight: "bold" }}>{prod.code}</span> | {prod.label.split('.')[0]}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Delivery Tray / Flap at the bottom */}
            <div
              onClick={handleCollect}
              style={{
                height: 70,
                background: "#121218",
                border: `2px solid ${trayCanister ? "#22d3ee" : "#252538"}`,
                borderRadius: 10,
                boxShadow: trayCanister
                  ? "inset 0 0 15px rgba(34, 211, 238, 0.4), 0 0 10px rgba(34, 211, 238, 0.2)"
                  : "inset 0 0 8px rgba(0,0,0,0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: trayCanister ? "pointer" : "default",
                transition: "all 0.3s"
              }}
            >
              {trayCanister ? (
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#22d3ee",
                    fontFamily: "monospace",
                    fontSize: "0.8rem",
                    fontWeight: "bold"
                  }}
                >
                  <span>[CLICK TO OPEN {trayCanister.code}]</span>
                </motion.div>
              ) : (
                <span style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "#444" }}>DELIVERY TRAY</span>
              )}
            </div>
          </div>

          {/* Keypad and Control Console panel */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 16
          }}>
            {/* LED Screen */}
            <div style={{
              background: "#040408",
              border: "1px solid rgba(168, 85, 247, 0.3)",
              borderRadius: 10,
              padding: 12,
              minHeight: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "inset 0 0 10px rgba(168,85,247,0.2)"
            }}>
              <span style={{
                fontFamily: "monospace",
                fontSize: "0.78rem",
                color: "#a855f7",
                textShadow: "0 0 3px rgba(168, 85, 247, 0.6)",
                textAlign: "center"
              }}>
                {ledText}
              </span>
            </div>

            {/* Numerical Keypad Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
              background: "rgba(0,0,0,0.2)",
              padding: 10,
              borderRadius: 12,
              border: "1px solid #1a1a2e"
            }}>
              {["A", "B", "C", "1", "2", "3", "D", "4", "CLEAR", "0", "ENTER"].map((key) => {
                const isEnter = key === "ENTER";
                const isClear = key === "CLEAR";

                return (
                  <button
                    key={key}
                    onClick={() => handleKeyClick(key)}
                    style={{
                      gridColumn: isEnter ? "span 2" : isClear ? "span 1" : "auto",
                      background: isEnter ? "rgba(16, 185, 129, 0.15)" : isClear ? "rgba(239, 68, 68, 0.15)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isEnter ? "rgba(16, 185, 129, 0.3)" : isClear ? "rgba(239, 68, 68, 0.3)" : "rgba(255,255,255,0.06)"}`,
                      borderRadius: 8,
                      padding: 10,
                      color: isEnter ? "#10b981" : isClear ? "#ef4444" : "white",
                      fontFamily: "monospace",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      transition: "all 0.15s"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = isEnter ? "rgba(16, 185, 129, 0.25)" : isClear ? "rgba(239, 68, 68, 0.25)" : "rgba(255,255,255,0.1)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = isEnter ? "rgba(16, 185, 129, 0.15)" : isClear ? "rgba(239, 68, 68, 0.15)" : "rgba(255,255,255,0.03)"; }}
                  >
                    {key}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  const { data } = useAdmin();
  return (
    <footer style={{ background: S.dark, borderTop: "1px solid rgba(215,226,234,0.06)", padding: "clamp(32px,4vw,56px) clamp(20px,4vw,60px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24, alignItems: "center", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, background: "white", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "black", fontWeight: 900, fontSize: "0.85rem", fontFamily: "'Kanit', sans-serif" }}>NR</span>
          </div>
          <span style={{ color: "white", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "0.85rem", fontFamily: "'Kanit', sans-serif" }}>{data.personalInfo.name}</span>
        </div>
        <p style={{ color: "#666", fontSize: "0.85rem" }}>© 2026 {data.personalInfo.name}. All rights reserved.</p>
        <div style={{ display: "flex", gap: 16 }}>
          {data.socialLinks.map(link => (
            <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
              style={{ color: "#666", transition: "color 0.2s", display: "flex" }}
              onMouseEnter={e => e.currentTarget.style.color = S.cyan}
              onMouseLeave={e => e.currentTarget.style.color = "#666"}
            ><link.icon size={18} /></a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// APP ROOT
// ============================================================
function AppContent() {
  const { isAdmin } = useAdmin();
  return (
    <main style={{ background: S.dark, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{GLOBAL_CSS}</style>
      <CursorGlow />
      <Navbar />
      <PinModal />
      {isAdmin && <AdminPortal />}
      <HeroSection />
      <GlowDivider />
      <AboutSection />
      <GlowDivider />
      <EducationSection />
      <GlowDivider />
      <ProjectsSection />
      <GlowDivider />
      <SkillsSection />
      <GlowDivider />
      <JourneySection />
      <GlowDivider />
      <GitHubSection />
      <GlowDivider />
      <WhatIBuildSection />
      <GlowDivider />
      <CertificationsSection />
      <GlowDivider />
      <ContactSection />
      <Footer />
    </main>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AppContent />
      <Analytics />
    </AdminProvider>
  );
}
