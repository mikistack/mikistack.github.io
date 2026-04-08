import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, ArrowRight, Code, Globe, Server, Database, ExternalLink, Menu, X, Terminal, ChevronRight, MapPin, Briefcase, Calendar } from 'lucide-react';

/* ─── animation helpers ─── */
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } };

function AnimatedSection({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeUp}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SkillBar({ label, percent, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <div ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-white">{label}</span>
        <span className="text-xs text-brand-400 font-display">{percent}%</span>
      </div>
      <div className="h-2 w-full bg-slate-700/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-500 to-brand-400 rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percent}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

/* ─── terminal animation component ─── */
function CodeTerminal() {
  const lines = [
    { prompt: '~', cmd: 'git clone flowbit-inventory.git' },
    { prompt: '~/flowbit', cmd: 'docker-compose up -d' },
    { output: '✓ postgres ready on :5432' },
    { output: '✓ redis ready on :6379' },
    { output: '✓ api server listening on :3000' },
    { prompt: '~/flowbit', cmd: 'npm run dev' },
    { output: '✓ vite dev server at localhost:5173' },
  ];

  return (
    <div className="bg-slate-950 rounded-2xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        <span className="ml-2 text-xs text-slate-500">terminal — mikistack</span>
      </div>
      {/* Lines */}
      <div className="p-5 space-y-1.5">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.8 + i * 0.25 }}
          >
            {line.prompt ? (
              <div className="flex gap-2">
                <span className="text-emerald-400">{line.prompt}</span>
                <span className="text-brand-400">$</span>
                <span className="text-slate-300">{line.cmd}</span>
              </div>
            ) : (
              <div className="text-slate-500 pl-4">{line.output}</div>
            )}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, delay: 3 }}
          className="flex gap-2 pt-1"
        >
          <span className="text-emerald-400">~/flowbit</span>
          <span className="text-brand-400">$</span>
          <span className="w-2 h-5 bg-brand-400 inline-block" />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── main app ─── */
function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">

      {/* ─── Navbar ─── */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center font-bold text-white text-sm">M</div>
            <span className="font-display text-xl font-bold tracking-tight text-white">mikistack</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-sm font-medium hover:text-brand-400 transition cursor-pointer bg-transparent border-none text-slate-200">
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo('contact')} className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition cursor-pointer border-none">
              Get in touch
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2 text-white bg-transparent border-none cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-lg border-b border-white/5 px-6 py-6 space-y-4"
          >
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="block w-full text-left text-lg font-medium text-slate-200 hover:text-brand-400 transition bg-transparent border-none cursor-pointer py-2">
                {l.label}
              </button>
            ))}
            <button onClick={() => scrollTo('contact')} className="w-full bg-brand-500 text-white px-5 py-3 rounded-full text-sm font-bold transition cursor-pointer border-none mt-2">
              Get in touch
            </button>
          </motion.div>
        )}
      </nav>

      {/* ─── Hero ─── */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              Available for remote work
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white leading-tight"
            >
              Building{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400">
                production-grade
              </span>{' '}
              software.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-400 max-w-lg leading-relaxed"
            >
              I'm Mikiyas Dereje, a Full-Stack Developer based in Ethiopia.
              I design and build scalable web applications from database schemas to polished interfaces — using Vue 3, React, Node.js, and Docker.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <button
                onClick={() => scrollTo('projects')}
                className="flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition shadow-xl shadow-white/5 cursor-pointer border-none"
              >
                View Projects <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="flex items-center gap-2 bg-slate-800 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-700 transition border border-white/5 cursor-pointer"
              >
                <Mail size={18} /> Contact Me
              </button>
            </motion.div>
          </div>

          {/* Terminal animation (right side) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:block"
          >
            <CodeTerminal />
          </motion.div>
        </div>
      </section>

      {/* ─── About ─── */}
      <section id="about" className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-sm font-bold text-brand-400 uppercase tracking-widest mb-3">About Me</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-10">
              Turning ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400">real products</span>.
            </h3>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.1} className="md:col-span-2">
              <div className="bg-slate-800/30 rounded-3xl p-8 border border-white/5 space-y-5">
                <p className="text-slate-300 leading-relaxed text-lg">
                  I'm a Full-Stack Developer with <strong className="text-white">4+ years of experience</strong> building production-grade web applications. I work across the entire stack — from normalized database schemas and RESTful APIs to responsive, accessible frontend interfaces.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  My recent focus is on enterprise-level systems: multi-warehouse inventory management, role-based access control, real-time analytics dashboards, and containerized deployments. I care deeply about clean architecture, performance, and developer experience.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  I'm actively looking for <strong className="text-brand-400">full-stack, frontend, or backend roles</strong> — remote or Ethiopia-based. If you need someone who can ship a complete product end-to-end, let's talk.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="space-y-4">
                <div className="bg-slate-800/30 rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-brand-500/10 rounded-lg text-brand-400 border border-brand-500/20"><MapPin size={18} /></div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold">Location</p>
                      <p className="text-white font-medium">Addis Ababa, Ethiopia</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800/30 rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20"><Briefcase size={18} /></div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold">Experience</p>
                      <p className="text-white font-medium">4+ Years</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800/30 rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20"><Calendar size={18} /></div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase font-bold">Availability</p>
                      <p className="text-white font-medium">Open — Q2 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Projects ─── */}
      <section id="projects" className="py-24 bg-slate-950/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <h2 className="text-sm font-bold text-brand-400 uppercase tracking-widest mb-3">Portfolio</h2>
                <h3 className="text-4xl md:text-5xl font-display font-bold text-white">Featured Projects</h3>
              </div>
              <p className="text-slate-400 max-w-md">End-to-end projects showcasing architecture, UI/UX, and deployment — from complex inventory systems to polished portfolio sites.</p>
            </div>
          </AnimatedSection>

          <div className="max-w-2xl mx-auto">
            {/* ── FlowBit Inventory ── */}
            <AnimatedSection delay={0.1}>
              <div className="group relative bg-slate-900 border border-white/5 rounded-3xl overflow-hidden hover:border-brand-500/50 transition-all duration-500 shadow-2xl">
                <div className="aspect-video overflow-hidden">
                  <img src="/assets/flowbit-dashboard.png" alt="FlowBit Inventory Dashboard" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {['Vue 3', 'Node.js', 'PostgreSQL', 'Docker', 'Redis'].map(t => (
                      <span key={t} className="px-3 py-1 bg-slate-800 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t}</span>
                    ))}
                  </div>
                  <h4 className="text-2xl font-bold text-white group-hover:text-brand-400 transition">FlowBit Inventory Platform</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    A production-grade multi-warehouse inventory system built end-to-end with real-time analytics, barcode scanning, and role-based access control.
                  </p>
                  <ul className="text-slate-500 text-xs space-y-1.5 pl-0 list-none">
                    <li className="flex items-start gap-2"><ChevronRight size={12} className="mt-0.5 text-brand-500 shrink-0" /> Multi-warehouse stock management with transfers</li>
                    <li className="flex items-start gap-2"><ChevronRight size={12} className="mt-0.5 text-brand-500 shrink-0" /> Purchase orders, sales tracking, partial payments</li>
                    <li className="flex items-start gap-2"><ChevronRight size={12} className="mt-0.5 text-brand-500 shrink-0" /> Real-time dashboard with stock valuation & alerts</li>
                    <li className="flex items-start gap-2"><ChevronRight size={12} className="mt-0.5 text-brand-500 shrink-0" /> JWT auth, RBAC (Admin/Manager/Staff), BullMQ jobs</li>
                    <li className="flex items-start gap-2"><ChevronRight size={12} className="mt-0.5 text-brand-500 shrink-0" /> Dockerized deployment with Redis caching</li>
                  </ul>
                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-500 uppercase">2026</span>
                    <div className="flex gap-3">
                      <a href="https://github.com/mikistack/flowbit-inventory" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-brand-500 transition text-slate-300 hover:text-white" title="Source code">
                        <Code size={18} />
                      </a>
                      <a href="https://vercel-brown-psi.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 bg-brand-500 hover:bg-brand-600 rounded-full text-white text-xs font-bold transition" title="Live demo">
                        Try Demo <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Skills ─── */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <h2 className="text-sm font-bold text-brand-400 uppercase tracking-widest mb-3">Expertise</h2>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <AnimatedSection>
                <h3 className="text-4xl font-display font-bold text-white mb-6">
                  Mastering the <span className="text-brand-400">modern stack</span>.
                </h3>
                <p className="text-slate-400 leading-relaxed mb-10">
                  My expertise spans the entire development lifecycle — from system architecture and database design to high-performance frontend engineering and containerized deployments.
                </p>
              </AnimatedSection>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Globe, title: 'Frontend', desc: 'Vue 3, React, Tailwind, Vite', color: 'emerald' },
                  { icon: Server, title: 'Backend', desc: 'Node.js, Express, Go, NestJS', color: 'brand' },
                  { icon: Database, title: 'Database', desc: 'PostgreSQL, Redis, MongoDB', color: 'amber' },
                  { icon: Terminal, title: 'DevOps', desc: 'Docker, CI/CD, Nginx, AWS', color: 'purple' },
                ].map((skill, i) => (
                  <AnimatedSection key={skill.title} delay={0.1 + i * 0.1}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className={`p-6 bg-slate-800/50 rounded-2xl border border-white/5 hover:bg-slate-800 transition cursor-default`}
                    >
                      <div className={`w-10 h-10 bg-${skill.color}-500/10 rounded-xl flex items-center justify-center text-${skill.color}-400 mb-4 font-bold border border-${skill.color}-500/20`}>
                        <skill.icon size={20} />
                      </div>
                      <h5 className="font-bold text-white">{skill.title}</h5>
                      <p className="text-xs text-slate-500 mt-1">{skill.desc}</p>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
            </div>

            <AnimatedSection delay={0.3}>
              <div className="bg-slate-800/30 rounded-3xl p-8 border border-white/5">
                <h4 className="text-lg font-bold text-white mb-6 font-display">Proficiency</h4>
                <div className="space-y-6">
                  <SkillBar label="Frontend Architecture" percent={95} delay={0} />
                  <SkillBar label="Backend Engineering" percent={90} delay={0.1} />
                  <SkillBar label="Database Design" percent={85} delay={0.2} />
                  <SkillBar label="DevOps & Deployment" percent={80} delay={0.3} />
                  <SkillBar label="UI/UX Design" percent={75} delay={0.4} />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── Contact CTA ─── */}
      <section id="contact" className="py-24 px-6 border-t border-white/5">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-12 text-center shadow-2xl shadow-brand-500/10 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/5 rounded-full blur-2xl" />

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Let's build something <br /> extraordinary together.
              </h2>
              <p className="text-brand-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                I'm currently opening slots for Q2 2026. If you have a project in mind, let's talk about how I can help bring it to life.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:mikistack.dev@gmail.com"
                  className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-slate-100 transition shadow-lg no-underline"
                >
                  <Mail size={18} /> Send an Email
                </a>
                <a
                  href="https://github.com/mikistack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-white/20 transition no-underline border border-white/10"
                >
                  <Code size={18} /> GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-12 border-t border-white/5 text-center px-6">
        <p className="text-sm text-slate-500 font-medium">© 2026 Mikiyas Dereje.</p>
        <p className="text-[10px] text-slate-700 uppercase tracking-widest mt-2">Addis Ababa, Ethiopia</p>
      </footer>
    </div>
  );
}

export default App;
