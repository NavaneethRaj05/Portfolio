// ============================================================
// Navaneeth Raj Portfolio
// Jack 3D Creator frontend + Navaneeth's real data + Admin CMS
// ============================================================

import { useEffect, useState, createContext, useContext, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github, Linkedin, Twitter, Mail, X, Lock, Save, LogOut,
  User, GraduationCap, Briefcase, Award, Code2, Layout,
  Terminal, Cpu, MessageSquare, Calendar, ChevronDown,
  ExternalLink, Star, GitFork, MapPin, Send,
  Sparkles, BookOpen, Trophy, Code, Smartphone, Menu,
  Plus, Trash2, Palette
} from "lucide-react";

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
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  a { color: inherit; text-decoration: none; }
  img { max-width: 100%; display: block; }
  input, textarea, button { font-family: 'Kanit', sans-serif; }
  section { scroll-margin-top: 100px; }

  /* Mobile Responsiveness Improvements */
  .nav-desktop {
    display: flex !important;
  }
  .nav-mobile-btn {
    display: none !important;
  }
  .nav-desktop-btn {
    display: inline-flex !important;
  }
  .nav-mobile-only {
    display: none !important;
  }
  
  .hero-tagline-container {
    height: 28px;
    overflow: hidden;
    margin-bottom: 48px;
  }
  .hero-tagline {
    color: var(--accent-secondary);
    font-family: monospace;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    font-size: clamp(0.65rem, 1.1vw, 0.85rem);
    text-align: center;
    line-height: 1.4;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s ease;
  }

  .cert-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: clamp(16px, 2vw, 28px);
  }

  .admin-layout {
    display: flex;
    flex-direction: row;
    flex: 1;
    overflow: hidden;
  }
  .admin-sidebar {
    width: 200px;
    background: rgba(255,255,255,0.02);
    padding: 16px;
    border-right: 1px solid rgba(255,255,255,0.04);
    overflow-y: auto;
    flex-shrink: 0;
  }

  @media (hover: hover) {
    .project-image {
      filter: blur(2px);
      opacity: 0.5;
    }
    .project-image:hover {
      filter: none;
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    .nav-desktop {
      display: none !important;
    }
    .nav-mobile-btn {
      display: flex !important;
    }
    .nav-desktop-btn {
      display: none !important;
    }
    .nav-mobile-only {
      display: flex !important;
    }
    .admin-layout {
      flex-direction: column;
    }
    .admin-sidebar {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      border-right: none;
      border-bottom: 1px solid rgba(255,255,255,0.04);
      gap: 8px;
      padding: 12px;
      scrollbar-width: none;
    }
    .admin-sidebar::-webkit-scrollbar {
      display: none;
    }
    .admin-sidebar button {
      margin-bottom: 0 !important;
      white-space: nowrap;
    }
  }

  @media (max-width: 600px) {
    .hero-tagline-container {
      height: 48px !important;
    }
    .hero-tagline {
      letter-spacing: 0.1em !important;
      font-size: 11px !important;
    }
    .stats-grid {
      grid-template-columns: 1fr !important;
      gap: 12px !important;
    }
  }

  @media (max-width: 550px) {
    .cert-card {
      flex-direction: column !important;
      align-items: center !important;
      text-align: center !important;
      gap: 16px !important;
    }
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
  email: "navaneeth@example.com",
  location: "Silicon Valley, CA",
  github: "https://github.com/NavaneethRaj05",
  linkedin: "https://linkedin.com/in/navaneethraj",
  resumeLink: "#",
};

const socialLinks = [
  { name: "GitHub", href: "https://github.com/NavaneethRaj05", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/navaneethraj", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com/navaneethraj", icon: Twitter },
  { name: "Email", href: "mailto:navaneeth@example.com", icon: Mail },
];

const education = [
  {
    degree: "B.E. in Computer Science Engineering",
    college: "Navkis College of Engineering",
    duration: "2022 – 2026",
    focus: ["AI", "MERN Stack", "Full Stack Systems", "UI/UX"],
  },
];

const skills = {
  "Frontend":  [{ name: "React" }, { name: "Next.js" }, { name: "Tailwind CSS" }, { name: "Framer Motion" }, { name: "TypeScript" }, { name: "UI/UX Design" }],
  "Backend":   [{ name: "Node.js" }, { name: "Express.js" }, { name: "REST APIs" }, { name: "Socket.io" }, { name: "Authentication (JWT)" }],
  "AI/ML":     [{ name: "OpenAI APIs" }, { name: "Gemini AI" }, { name: "LangChain" }, { name: "RAG Systems" }, { name: "Prompt Engineering" }],
  "Database":  [{ name: "MongoDB" }, { name: "PostgreSQL" }, { name: "Redis" }, { name: "Mongoose" }],
  "Dev Tools": [{ name: "Git/GitHub" }, { name: "Docker" }, { name: "Vercel" }, { name: "Postman" }, { name: "Linux Basics" }],
};

const projects = [
  { id: 1, title: "AI Codebase Explainer", description: "An intelligent tool that scans repository structures and provides plain-English explanations of complex logic using Gemini integration.", tech: ["React", "Node.js", "Google AI", "Tailwind"], image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000", icon: Terminal, github: "#", live: "#", featured: true },
  { id: 2, title: "Smart Complaint Resolution", description: "Autonomous support agent that categorizes, prioritizes, and drafts responses for customer inquiries using sentiment analysis.", tech: ["MERN Stack", "OpenAI", "Redis", "Docker"], image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000", icon: Cpu, github: "#", live: "#", featured: true },
  { id: 3, title: "AI Personal Assistant Chat", description: "Full-featured chat application with memory storage, file analysis capabilities, and real-time streaming responses.", tech: ["Next.js", "MongoDB", "LangChain", "Socket.io"], image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&q=80&w=1000", icon: MessageSquare, github: "#", live: "#", featured: false },
  { id: 4, title: "Event Management Platform", description: "End-to-end event hosting system with automated scheduling, ticket generation, and attendee engagement analytics.", tech: ["React", "Firebase", "Node.js", "Stripe"], image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000", icon: Calendar, github: "#", live: "#", featured: false },
];

const journey = [
  { role: "Exploring AI Agents & RAG", company: "Current Learning", duration: "2026", description: "Deep diving into autonomous agentic workflows and advanced retrieval systems for intelligent information processing.", icon: Cpu },
  { role: "Hackathon Winner - AI for Good", company: "Global AI Summit", duration: "2025", description: "Developed an autonomous disaster relief coordination bot using satellite imagery and AI, winning first place among 50+ entries.", icon: Trophy },
  { role: "Open Source Contributor", company: "GitHub / Various Labs", duration: "2024 - 2025", description: "Contributed to several AI-focused repositories, refining prompt engineering techniques and full-stack integration patterns.", icon: Code },
  { role: "Started MERN Journey", company: "Self-Directed Foundation", duration: "2024", description: "Mastered the core concepts of the MERN stack through intensive building of 10+ experimental projects.", icon: BookOpen },
];

const certifications = [
  { title: "Google Cloud Certified - Professional Cloud Architect", issuer: "Google Cloud", year: "2023", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1000", credentialLink: "#" },
  { title: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: "2022", image: "https://images.unsplash.com/photo-1509228468518-180dd482195e?auto=format&fit=crop&q=80&w=1000", credentialLink: "#" },
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
const ADMIN_PIN = "1234";

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
  const initialData = { personalInfo, socialLinks, education, skills, projects, journey, certifications, whatIBuild, githubStats };

  // Safe localStorage helpers — fall back silently in sandboxed envs
  const lsGet = (key) => { try { return localStorage.getItem(key); } catch { return null; } };
  const lsSet = (key, val) => { try { localStorage.setItem(key, val); return true; } catch { return false; } };

  const [data, setData] = useState(() => {
    try {
      const saved = lsGet("portfolioData");
      if (saved) return mergeWithIcons(JSON.parse(saved), initialData);
    } catch (e) {
      console.warn("Failed to load portfolioData", e);
    }
    return initialData;
  });

  const verifyPin = (pin) => {
    if (pin === ADMIN_PIN) { setIsAdmin(true); setShowPinModal(false); return true; }
    return false;
  };
  const logout = () => setIsAdmin(false);
  const updateData = (section, newData) => setData(prev => ({ ...prev, [section]: newData }));
  const saveData = () => {
    const ok = lsSet("portfolioData", JSON.stringify(removeIcons(data)));
    setSaveMsg(ok ? "✓ Saved!" : "✓ Applied (localStorage unavailable in preview)");
    setTimeout(() => setSaveMsg(""), 2500);
  };
  return (
    <AdminContext.Provider value={{ isAdmin, showPinModal, setShowPinModal, verifyPin, logout, data, updateData, saveData, saveMsg }}>
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
  dark: "#0C0C0C",
  text: "#D7E2EA",
  purple: "var(--accent-primary)",
  cyan: "var(--accent-secondary)",
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
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 12,
            background: "rgba(18, 18, 20, 0.75)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 9999,
            padding: "8px 10px 8px 10px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* NR Logo box */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              flexShrink: 0, width: 44, height: 44,
              background: "white", borderRadius: 12,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "none", cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(168,85,247,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)"; }}
          >
            <span style={{ color: "#0C0C0C", fontWeight: 900, fontSize: "0.95rem", fontFamily: "'Kanit', sans-serif", letterSpacing: "-0.02em" }}>NR</span>
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

          {/* Right side: admin lock + Resume pill */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button
              onClick={() => setShowPinModal(true)}
              title="Admin Login"
              style={{
                background: "transparent",
                border: "1px solid rgba(215,226,234,0.15)",
                borderRadius: 8, padding: "8px 10px", cursor: "pointer",
                color: isAdmin ? S.purple : "rgba(215,226,234,0.4)",
                transition: "all 0.2s", display: "flex", alignItems: "center",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(168,85,247,0.4)"; e.currentTarget.style.color = S.purple; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(215,226,234,0.15)"; e.currentTarget.style.color = isAdmin ? S.purple : "rgba(215,226,234,0.4)"; }}
            >
              <Lock size={13} />
            </button>

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
    else { setError("Incorrect PIN — try 1234"); setPin(""); }
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
                onMouseLeave={e => e.target.style.background = S.purple}
              >Unlock</button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// ADMIN PORTAL
// ============================================================
function AdminPortal() {
  const { data, updateData, saveData, logout, saveMsg } = useAdmin();
  const [activeSection, setActiveSection] = useState("personal");

  const sections = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "social", label: "Social Links", icon: Github },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Code2 },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "journey", label: "Journey", icon: Layout },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "whatIBuild", label: "What I Build", icon: Code2 },
    { id: "githubStats", label: "GitHub Stats", icon: Github },
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
    <div style={{ marginBottom: 16 }}>{label(labelText)}{inp(val, onChange, type, rows)}</div>
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ color: "white", fontWeight: 700, fontSize: "1.3rem", fontFamily: "'Kanit', sans-serif" }}>Admin Portal</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={saveData} style={{ display: "flex", alignItems: "center", gap: 6, background: saveMsg ? "#059669" : "#059669", border: "none", borderRadius: 8, padding: "8px 16px", color: "white", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", fontFamily: "'Kanit', sans-serif", minWidth: 90, justifyContent: "center" }}>
              <Save size={14} /> {saveMsg || "Save"}
            </button>
            <button onClick={logout} style={{ display: "flex", alignItems: "center", gap: 6, background: "#dc2626", border: "none", borderRadius: 8, padding: "8px 16px", color: "white", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", fontFamily: "'Kanit', sans-serif" }}>
              <LogOut size={14} /> Logout
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
                {data.education.map((edu, i) => card(
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
                    {field("Degree", edu.degree, v => { const n = [...data.education]; n[i] = { ...n[i], degree: v }; updateData("education", n); })}
                    {field("College", edu.college, v => { const n = [...data.education]; n[i] = { ...n[i], college: v }; updateData("education", n); })}
                    {field("Duration", edu.duration, v => { const n = [...data.education]; n[i] = { ...n[i], duration: v }; updateData("education", n); })}
                    {field("Focus Areas (comma separated)", edu.focus ? edu.focus.join(", ") : "", v => { const n = [...data.education]; n[i] = { ...n[i], focus: v.split(",").map(s => s.trim()).filter(Boolean) }; updateData("education", n); })}
                  </div>, i
                ))}
                <button
                  onClick={() => {
                    const n = [...data.education, { degree: "New Degree", college: "New College", duration: "2026 – 2028", focus: [] }];
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
                <h3 style={{ color: "white", fontWeight: 700, marginBottom: 20, fontFamily: "'Kanit', sans-serif" }}>Projects</h3>
                {data.projects.map((proj, i) => card(
                  <div key={proj.id || i}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <p style={{ color: "#aaa", fontWeight: 600 }}>{proj.title}</p>
                      <button
                        onClick={() => {
                          const n = data.projects.filter((_, idx) => idx !== i);
                          updateData("projects", n);
                        }}
                        style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                        title="Delete Project"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {field("Title", proj.title, v => { const n = [...data.projects]; n[i] = { ...n[i], title: v }; updateData("projects", n); })}
                    {field("Description", proj.description, v => { const n = [...data.projects]; n[i] = { ...n[i], description: v }; updateData("projects", n); }, "text", 3)}
                    {field("Image URL", proj.image, v => { const n = [...data.projects]; n[i] = { ...n[i], image: v }; updateData("projects", n); })}
                    {field("Technologies (comma separated)", proj.tech ? proj.tech.join(", ") : "", v => { const n = [...data.projects]; n[i] = { ...n[i], tech: v.split(",").map(s => s.trim()).filter(Boolean) }; updateData("projects", n); })}
                    {field("GitHub URL", proj.github, v => { const n = [...data.projects]; n[i] = { ...n[i], github: v }; updateData("projects", n); })}
                    {field("Live URL", proj.live, v => { const n = [...data.projects]; n[i] = { ...n[i], live: v }; updateData("projects", n); })}
                  </div>, proj.id || i
                ))}
                <button
                  onClick={() => {
                    const n = [...data.projects, { id: Date.now(), title: "New Project", description: "Project Description", tech: [], image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000", github: "#", live: "#", icon: Briefcase }];
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
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <p style={{ color: "#aaa", fontWeight: 600 }}>{item.role || "Journey Entry"}</p>
                      <button
                        onClick={() => {
                          const n = data.journey.filter((_, idx) => idx !== i);
                          updateData("journey", n);
                        }}
                        style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                        title="Delete Journey Entry"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {field("Role", item.role, v => { const n = [...data.journey]; n[i] = { ...n[i], role: v }; updateData("journey", n); })}
                    {field("Company", item.company, v => { const n = [...data.journey]; n[i] = { ...n[i], company: v }; updateData("journey", n); })}
                    {field("Duration", item.duration, v => { const n = [...data.journey]; n[i] = { ...n[i], duration: v }; updateData("journey", n); })}
                    {field("Description", item.description, v => { const n = [...data.journey]; n[i] = { ...n[i], description: v }; updateData("journey", n); }, "text", 3)}
                  </div>, i
                ))}
                <button
                  onClick={() => {
                    const n = [...data.journey, { role: "New Role", company: "New Company", duration: "2026", description: "Milestone description", icon: Cpu }];
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
                <h3 style={{ color: "white", fontWeight: 700, marginBottom: 20, fontFamily: "'Kanit', sans-serif" }}>Certifications</h3>
                {data.certifications.map((cert, i) => card(
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <p style={{ color: "#aaa", fontWeight: 600 }}>{cert.title}</p>
                      <button
                        onClick={() => {
                          const n = data.certifications.filter((_, idx) => idx !== i);
                          updateData("certifications", n);
                        }}
                        style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                        title="Delete Certification"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {field("Title", cert.title, v => { const n = [...data.certifications]; n[i] = { ...n[i], title: v }; updateData("certifications", n); })}
                    {field("Issuer", cert.issuer, v => { const n = [...data.certifications]; n[i] = { ...n[i], issuer: v }; updateData("certifications", n); })}
                    {field("Year", cert.year, v => { const n = [...data.certifications]; n[i] = { ...n[i], year: v }; updateData("certifications", n); })}
                    {field("Image URL", cert.image, v => { const n = [...data.certifications]; n[i] = { ...n[i], image: v }; updateData("certifications", n); })}
                    {field("Credential Link", cert.credentialLink, v => { const n = [...data.certifications]; n[i] = { ...n[i], credentialLink: v }; updateData("certifications", n); })}
                  </div>, i
                ))}
                <button
                  onClick={() => {
                    const n = [...data.certifications, { title: "New Certification", issuer: "Issuer", year: "2026", image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1000", credentialLink: "#" }];
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
                      background: S.cyan,
                      border: "none",
                      borderRadius: 10,
                      padding: "12px 20px",
                      color: "#0c0c0c",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "'Kanit', sans-serif",
                      marginTop: 8
                    }}
                  >
                    Fetch Live Stats
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
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

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", background: S.dark }}>
      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%,-50%)", width: "80vw", height: "80vw", maxWidth: 900, background: "radial-gradient(ellipse, rgba(168,85,247,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "140px clamp(20px,4vw,60px) clamp(40px,6vw,80px)", position: "relative", zIndex: 10, textAlign: "center" }}>
        {/* Badge */}
        <FadeIn delay={0} y={-20}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)", borderRadius: 9999, padding: "6px 16px", marginBottom: 32 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: S.purple, boxShadow: `0 0 8px ${S.purple}` }} />
            <span style={{ color: S.purple, fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em" }}>Available for opportunities</span>
          </div>
        </FadeIn>

        {/* Main heading */}
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading" style={{
            fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em",
            lineHeight: 1, fontSize: "clamp(3.5rem, 14vw, 160px)", marginBottom: 8,
          }}>
            {data.personalInfo.name}
          </h1>
        </FadeIn>

        <FadeIn delay={0.25} y={20}>
          <p style={{ color: "#888", fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "clamp(0.75rem,1.5vw,1.1rem)", marginBottom: 24 }}>
            {data.personalInfo.role}
          </p>
        </FadeIn>

        {/* Rotating tagline */}
        <FadeIn delay={0.35} y={20}>
          <div className="hero-tagline-container">
            <AnimatePresence mode="wait">
              <motion.p
                key={taglineIdx}
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }}
                className="hero-tagline"
              >{taglines[taglineIdx]}</motion.p>
            </AnimatePresence>
          </div>
        </FadeIn>

        {/* CTA buttons */}
        <FadeIn delay={0.5} y={20}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <ContactBtn />
            <a href={data.personalInfo.github} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: "2px solid rgba(215,226,234,0.25)", borderRadius: 9999,
              padding: "clamp(10px,1.2vw,14px) clamp(28px,3vw,48px)",
              color: S.text, fontFamily: "'Kanit', sans-serif", fontWeight: 500,
              textTransform: "uppercase", letterSpacing: "0.1em",
              fontSize: "clamp(0.7rem,0.9vw,0.95rem)", transition: "all 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(215,226,234,0.5)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(215,226,234,0.25)"}
            >
              <Github size={16} /> GitHub
            </a>
          </div>
        </FadeIn>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ color: S.cyan }}>
            <ChevronDown size={22} />
          </motion.div>
        </motion.div>
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
            {data.socialLinks.map(link => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
                style={{
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(215,226,234,0.12)",
                  borderRadius: 12,
                  color: S.text,
                  opacity: 0.6,
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
              </a>
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
    <section id="about" style={{ background: S.dark, padding: "clamp(80px,10vw,160px) clamp(20px,4vw,60px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn delay={0} y={40} style={{ textAlign: "center", marginBottom: "clamp(48px,6vw,96px)" }}>
          <SectionHeading>About Me</SectionHeading>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "clamp(32px,4vw,64px)", alignItems: "center" }}>
          {/* Profile card */}
          <FadeIn delay={0.1} x={-40} y={0}>
            <GlassCard style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(34,211,238,0.3))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "white", fontWeight: 900, fontSize: "1.6rem", fontFamily: "'Kanit', sans-serif" }}>NR</span>
                </div>
                <div>
                  <h3 style={{ color: "white", fontWeight: 700, fontSize: "clamp(1.2rem,2vw,1.8rem)", fontFamily: "'Kanit', sans-serif", marginBottom: 4 }}>{data.personalInfo.name}</h3>
                  <p style={{ color: S.cyan, fontWeight: 500, fontSize: "0.9rem" }}>{data.personalInfo.role}</p>
                </div>
              </div>
              <p style={{ color: "#888", lineHeight: 1.7, fontSize: "clamp(0.85rem,1.2vw,1rem)" }}>{data.personalInfo.heroDescription}</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[{ label: data.personalInfo.email, icon: Mail, href: `mailto:${data.personalInfo.email}` }, { label: data.personalInfo.location, icon: MapPin, href: "#" }].map(item => (
                  <a key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "8px 14px", color: "#888", fontSize: "0.82rem", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "white"} onMouseLeave={e => e.currentTarget.style.color = "#888"}>
                    <item.icon size={14} />{item.label}
                  </a>
                ))}
              </div>
            </GlassCard>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.2} x={0} y={30}>
            <div className="stats-grid">
              {stats.map((stat, i) => (
                <motion.div key={stat.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} viewport={{ once: true }}
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "clamp(20px,2vw,32px)", textAlign: "center" }}
                >
                  <div style={{ color: "white", fontWeight: 900, fontSize: "clamp(2rem,4vw,3.5rem)", fontFamily: "'Kanit', sans-serif", lineHeight: 1 }}>{stat.value}</div>
                  <div style={{ color: "#666", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 8 }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
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
    <section id="education" style={{ background: S.dark, padding: "clamp(80px,10vw,160px) clamp(20px,4vw,60px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn delay={0} y={40} style={{ textAlign: "center", marginBottom: "clamp(48px,6vw,96px)" }}>
          <SectionHeading>Education</SectionHeading>
        </FadeIn>
        {data.education.map((edu, i) => (
          <FadeIn key={i} delay={i * 0.1} y={30}>
            <GlassCard style={{ marginBottom: 24, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 28 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div className="glass" style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", color: S.cyan, flexShrink: 0 }}>
                      <GraduationCap size={18} />
                    </div>
                    <h3 style={{ color: "white", fontWeight: 700, fontSize: "clamp(1.1rem,2vw,1.7rem)", fontFamily: "'Kanit', sans-serif", lineHeight: 1.2 }}>{edu.degree}</h3>
                  </div>
                  <p style={{ color: "#888", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.85rem" }}>{edu.college}</p>
                </div>
                <span className="glass" style={{ padding: "6px 16px", borderRadius: 9999, color: "#888", fontSize: "0.8rem", fontFamily: "monospace", whiteSpace: "nowrap" }}>{edu.duration}</span>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 20 }}>
                <p style={{ color: S.cyan, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                  <Sparkles size={12} /> Focused On
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {(edu.focus || []).map(item => (
                    <span key={item} className="glass" style={{ padding: "6px 14px", borderRadius: 9999, fontSize: "0.8rem", color: "#aaa" }}>{item}</span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// PROJECTS SECTION
// ============================================================
function ProjectsSection() {
  const { data } = useAdmin();
  return (
    <section id="projects" style={{ background: S.dark, padding: "clamp(80px,10vw,160px) clamp(20px,4vw,60px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn delay={0} y={40} style={{ marginBottom: "clamp(48px,6vw,96px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <SectionHeading>Projects</SectionHeading>
          <p style={{ color: "#666", maxWidth: 500, textAlign: "center", lineHeight: 1.6, fontSize: "clamp(0.85rem,1.2vw,1rem)" }}>
            A showcase of my recent experiments and full-stack solutions.
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))", gap: "clamp(16px,2vw,32px)" }}>
          {data.projects.map((project, i) => {
            const Icon = project.icon || Briefcase;
            return (
              <FadeIn key={project.id || i} delay={i * 0.08} y={30}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: "0 24px 48px rgba(0,0,0,0.4), 0 0 20px rgba(168,85,247,0.1)" }}
                  transition={{ duration: 0.3 }}
                  className="glass"
                  style={{ borderRadius: 40, padding: "clamp(20px,2vw,32px)", display: "flex", flexDirection: "column", height: "100%" }}
                >
                  <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", marginBottom: 24, aspectRatio: "16/9" }}>
                    {project.image && <img src={project.image} alt={project.title} className="project-image" />}
                    <div style={{ position: "absolute", bottom: 12, left: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {(project.tech || []).map(t => (
                        <span key={t} style={{ padding: "4px 10px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", borderRadius: 9999, fontSize: "0.68rem", color: "white", border: "1px solid rgba(255,255,255,0.1)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ padding: 10, background: "rgba(255,255,255,0.04)", borderRadius: 12, color: S.purple }}>
                      <Icon size={22} />
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {[{ icon: Github, href: project.github }, { icon: ExternalLink, href: project.live }].map(({ icon: BtnIcon, href }) => (
                        <a key={href || "#"} href={href || "#"} className="glass" style={{ padding: 8, borderRadius: 10, color: "#666", display: "flex", alignItems: "center", justifyContent: "center", transition: "color 0.2s" }}
                          onMouseEnter={e => e.currentTarget.style.color = "white"} onMouseLeave={e => e.currentTarget.style.color = "#666"}>
                          <BtnIcon size={16} />
                        </a>
                      ))}
                    </div>
                  </div>
                  <h3 style={{ color: "white", fontWeight: 700, fontSize: "clamp(1.1rem,1.8vw,1.5rem)", fontFamily: "'Kanit', sans-serif", marginBottom: 10 }}>{project.title}</h3>
                  <p style={{ color: "#888", lineHeight: 1.6, fontSize: "clamp(0.82rem,1.1vw,0.95rem)", flex: 1 }}>{project.description}</p>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SKILLS SECTION
// ============================================================
function SkillsSection() {
  const { data } = useAdmin();
  return (
    <section id="skills" style={{ background: S.dark, padding: "clamp(80px,10vw,160px) clamp(20px,4vw,60px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn delay={0} y={40} style={{ textAlign: "center", marginBottom: "clamp(48px,6vw,96px)" }}>
          <SectionHeading>Skills</SectionHeading>
          <p style={{ color: "#666", marginTop: 16, fontSize: "clamp(0.85rem,1.2vw,1rem)" }}>A specialized toolkit forged through intensive building and experimentation.</p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "clamp(16px,2vw,28px)" }}>
          {Object.entries(data.skills).map(([category, skillList], idx) => (
            <FadeIn key={category} delay={idx * 0.08} y={30}>
              <motion.div
                whileHover={{ borderColor: "rgba(255,255,255,0.2)", y: -4 }}
                transition={{ duration: 0.3 }}
                className="glass"
                style={{ borderRadius: 32, padding: "clamp(24px,2.5vw,40px)", position: "relative", overflow: "hidden" }}
              >
                <div style={{ position: "absolute", top: -40, right: -40, width: 120, height: 120, background: "rgba(34,211,238,0.05)", borderRadius: "50%", filter: "blur(20px)" }} />
                <h3 style={{ color: S.cyan, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 700, marginBottom: 24 }}>{category}</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {skillList.map((skill, i) => (
                    <motion.span key={skill.name}
                      initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15 + i * 0.04 }} viewport={{ once: true }}
                      whileHover={{ scale: 1.06, y: -3, borderColor: "rgba(34,211,238,0.5)", background: "rgba(34,211,238,0.08)" }}
                      style={{ padding: "8px 14px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: "0.8rem", fontWeight: 600, color: "#aaa", cursor: "default", display: "inline-block", transition: "all 0.2s" }}
                    >{skill.name}</motion.span>
                  ))}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// JOURNEY SECTION
// ============================================================
function JourneySection() {
  const { data } = useAdmin();
  return (
    <section id="journey" style={{ background: S.dark, padding: "clamp(80px,10vw,160px) clamp(20px,4vw,60px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn delay={0} y={40} style={{ marginBottom: "clamp(48px,6vw,96px)" }}>
          <SectionHeading>My Evolution</SectionHeading>
          <p style={{ color: "#666", marginTop: 16, textAlign: "center", fontSize: "clamp(0.85rem,1.2vw,1rem)" }}>Tracing the path from interest to innovation.</p>
        </FadeIn>
        <div style={{ position: "relative", marginLeft: "clamp(16px,4vw,48px)", paddingLeft: 2 }}>
          <div style={{ position: "absolute", left: -1, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary), transparent)" }} />
          {data.journey.map((item, i) => {
            const Icon = item.icon || Cpu;
            return (
              <FadeIn key={i} delay={i * 0.1} x={-20} y={0}>
                <div style={{ position: "relative", paddingLeft: "clamp(28px,4vw,56px)", marginBottom: "clamp(28px,4vw,56px)" }}>
                  <div style={{ position: "absolute", left: -9, top: 4, width: 16, height: 16, background: S.dark, border: "2px solid var(--accent-secondary)", borderRadius: "50%", boxShadow: "0 0 15px var(--accent-secondary)", zIndex: 1 }} />
                  <GlassCard style={{ position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, right: 0, opacity: 0.05 }}>
                      <Icon size={120} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                      <div>
                        <span style={{ display: "block", color: "#666", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>{item.company}</span>
                        <h3 style={{ color: "white", fontWeight: 700, fontSize: "clamp(1rem,2vw,1.5rem)", fontFamily: "'Kanit', sans-serif", textTransform: "uppercase" }}>{item.role}</h3>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, color: S.cyan, fontSize: "0.82rem", background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.2)", borderRadius: 9999, padding: "4px 12px", whiteSpace: "nowrap" }}>
                        <Calendar size={12} />{item.duration}
                      </div>
                    </div>
                    <p style={{ color: "#888", lineHeight: 1.7, fontSize: "clamp(0.85rem,1.1vw,1rem)" }}>{item.description}</p>
                  </GlassCard>
                </div>
              </FadeIn>
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
                onMouseEnter={e => e.currentTarget.style.background = S.cyan}
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
// WHAT I BUILD SECTION  (white bg, rounded top)
// ============================================================
function WhatIBuildSection() {
  const { data } = useAdmin();
  return (
    <section id="what-i-build" style={{
      background: "#ffffff",
      borderRadius: "clamp(40px,5vw,60px) clamp(40px,5vw,60px) 0 0",
      padding: "clamp(80px,10vw,160px) clamp(20px,4vw,60px)",
      marginTop: -1,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn delay={0} y={40} style={{ textAlign: "center", marginBottom: "clamp(48px,6vw,96px)" }}>
          <SectionHeading gradient={false} light>What I Build</SectionHeading>
          <p style={{ color: "#666", marginTop: 16, maxWidth: 500, margin: "16px auto 0", fontSize: "clamp(0.85rem,1.2vw,1rem)" }}>
            I focus on creating systems that bridge the gap between functional logic and intelligent automation.
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "clamp(16px,2vw,28px)" }}>
          {data.whatIBuild.map((service, i) => {
            const Icon = service.icon || Code2;
            return (
              <FadeIn key={service.title} delay={i * 0.1} y={30}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  transition={{ duration: 0.3 }}
                  style={{ background: "#f8f8f8", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 24, padding: "clamp(24px,2.5vw,40px)", height: "100%" }}
                >
                  <div style={{ marginBottom: 20, padding: 14, display: "inline-block", background: "rgba(0,0,0,0.04)", borderRadius: 16, color: service.color || S.purple }}>
                    <Icon size={28} />
                  </div>
                  <h3 style={{ color: "#0C0C0C", fontWeight: 700, fontSize: "clamp(1rem,1.8vw,1.3rem)", fontFamily: "'Kanit', sans-serif", marginBottom: 12 }}>{service.title}</h3>
                  <p style={{ color: "#666", lineHeight: 1.6, fontSize: "clamp(0.82rem,1.1vw,0.95rem)" }}>{service.description}</p>
                </motion.div>
              </FadeIn>
            );
          })}
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
  return (
    <section id="certifications" style={{ background: "#ffffff", padding: "clamp(80px,10vw,160px) clamp(20px,4vw,60px)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn delay={0} y={40} style={{ marginBottom: "clamp(48px,6vw,96px)" }}>
          <SectionHeading gradient={false} light>Certifications</SectionHeading>
          <div style={{ width: 60, height: 4, background: "linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))", borderRadius: 9999, margin: "16px auto 0" }} />
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: "clamp(16px,2vw,28px)" }}>
          {data.certifications.map((cert, i) => (
            <FadeIn key={i} delay={i * 0.1} y={30}>
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                transition={{ duration: 0.3 }}
                className="cert-card"
                style={{ background: "#f8f8f8", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 28, padding: "clamp(20px,2vw,32px)", overflow: "hidden" }}
              >
                <div style={{ width: 90, height: 90, borderRadius: 18, overflow: "hidden", flexShrink: 0, border: "1px solid rgba(0,0,0,0.06)" }}>
                  <img src={cert.image} alt={cert.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.1)"}
                    onMouseLeave={e => e.target.style.transform = "scale(1)"}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ color: "#0C0C0C", fontWeight: 700, fontSize: "clamp(0.9rem,1.5vw,1.2rem)", fontFamily: "'Kanit', sans-serif", marginBottom: 6, lineHeight: 1.3 }}>{cert.title}</h3>
                  <p style={{ color: "#888", fontSize: "0.82rem", marginBottom: 14 }}>{cert.issuer} • {cert.year}</p>
                  <a href={cert.credentialLink} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: S.cyan, fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = S.purple}
                    onMouseLeave={e => e.currentTarget.style.color = S.cyan}
                  >
                    Verify Credential <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONTACT SECTION  (dark bg, rounded top)
// ============================================================
function ContactSection() {
  const { data } = useAdmin();
  return (
    <section id="contact" style={{
      background: S.dark,
      borderRadius: "clamp(40px,5vw,60px) clamp(40px,5vw,60px) 0 0",
      padding: "clamp(80px,10vw,160px) clamp(20px,4vw,60px)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn delay={0} y={40} style={{ textAlign: "center", marginBottom: "clamp(48px,6vw,96px)" }}>
          <SectionHeading>Contact</SectionHeading>
          <p style={{ color: "#666", marginTop: 16, fontSize: "clamp(0.85rem,1.2vw,1rem)" }}>Let's build the future together.</p>
        </FadeIn>
        <GlassCard style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "clamp(32px,4vw,64px)", position: "relative" }}>
            {/* Info */}
            <div>
              <h3 style={{ color: "white", fontWeight: 700, fontSize: "clamp(1.5rem,3vw,3rem)", fontFamily: "'Kanit', sans-serif", lineHeight: 1.2, marginBottom: 32 }}>
                Let's Build <br /><span className="text-gradient">The Future</span>
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 32 }}>
                {[{ icon: Mail, label: "Email Me", value: data.personalInfo.email, href: `mailto:${data.personalInfo.email}` }, { icon: MapPin, label: "Location", value: data.personalInfo.location, href: "#" }].map(item => (
                  <a key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none" }}>
                    <div className="glass" style={{ width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "#888", flexShrink: 0, transition: "color 0.2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = S.purple}
                      onMouseLeave={e => e.currentTarget.style.color = "#888"}
                    >
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p style={{ color: "#666", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 2 }}>{item.label}</p>
                      <p style={{ color: "white", fontWeight: 500, fontSize: "clamp(0.85rem,1.2vw,1rem)" }}>{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                {data.socialLinks.slice(0, 3).map(social => (
                  <motion.a key={social.name} whileHover={{ y: -5, scale: 1.1 }} href={social.href} target="_blank" rel="noopener noreferrer"
                    className="glass"
                    style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "#888", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = S.cyan}
                    onMouseLeave={e => e.currentTarget.style.color = "#888"}
                  ><social.icon size={20} /></motion.a>
                ))}
              </div>
            </div>

            {/* Form */}
            <motion.form initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} onSubmit={e => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[{ label: "Full Name", placeholder: "John Doe", type: "text" }, { label: "Email Address", placeholder: "john@example.com", type: "email" }].map(f => (
                <div key={f.label}>
                  <label style={{ display: "block", color: "#666", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "14px 20px", color: "white", outline: "none", fontSize: "0.95rem", fontFamily: "'Kanit', sans-serif", transition: "border-color 0.2s" }}
                    onFocus={e => e.target.style.borderColor = "rgba(168,85,247,0.4)"}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: "block", color: "#666", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 8 }}>Your Message</label>
                <textarea placeholder="How can I help you today?" rows={5} style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "14px 20px", color: "white", outline: "none", fontSize: "0.95rem", resize: "none", fontFamily: "'Kanit', sans-serif", transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "var(--accent-primary)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.02, boxShadow: "0 0 30px var(--accent-primary)" }} whileTap={{ scale: 0.98 }}
                style={{ background: "linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))", border: "none", borderRadius: 16, padding: "16px", color: "white", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "0.8rem", cursor: "pointer", fontFamily: "'Kanit', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
              ><Send size={16} /> Send Transmission</motion.button>
            </motion.form>
          </div>
        </GlassCard>
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
        <p style={{ color: "#666", fontSize: "0.85rem" }}>© 2026 {data.personalInfo.name}. Crafted with AI & Passion.</p>
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
      <Navbar />
      <PinModal />
      {isAdmin && <AdminPortal />}
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <ProjectsSection />
      <SkillsSection />
      <JourneySection />
      <GitHubSection />
      <WhatIBuildSection />
      <CertificationsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}
