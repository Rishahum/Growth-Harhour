import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import './index.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'About', to: '/about' },
    { label: 'Directors', to: '/directors' },
    { label: 'Testimonials', to: '/testimonials' },
  ]

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Growth Harbour Logo" className="logo-img" />
          Growth Harbour
        </Link>
        <div className="nav-links">
          {navLinks.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => isActive ? 'nav-active' : ''}>
              {l.label}
            </NavLink>
          ))}
          <NavLink to="/contact" className="nav-cta">Get Started</NavLink>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {navLinks.map(l => (
          <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => isActive ? 'nav-active' : ''}>
            {l.label}
          </NavLink>
        ))}
        <NavLink to="/contact" className="nav-cta">Get Started</NavLink>
      </div>
    </nav>
  )
}

function PageBanner({ title, subtitle }) {
  return (
    <div className="page-banner">
      <div className="page-banner-inner">
        <p className="page-banner-breadcrumb">
          <Link to="/">Home</Link> <span>/</span> <span>{title}</span>
        </p>
        <h1>{title}</h1>
        {subtitle && <p className="page-banner-sub">{subtitle}</p>}
      </div>
    </div>
  )
}

function Page({ children }) {
  const { pathname } = useLocation()
  return <main className="page-animate" key={pathname}>{children}</main>
}

function Footer() {
  const year = new Date().getFullYear()
  const cols = [
    {
      title: 'Our Services',
      links: [
        { label: 'Strategy Consulting', to: '/services' },
        { label: 'Management Consulting', to: '/services' },
        { label: 'Digital Transformation', to: '/services' },
        { label: 'HR & Talent Consulting', to: '/services' },
        { label: 'Financial Advisory', to: '/services' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', to: '/about' },
        { label: 'Board of Directors', to: '/directors' },
        { label: 'Testimonials', to: '/testimonials' },
        { label: 'Contact Us', to: '/contact' },
      ]
    },
    {
      title: 'Quick Info',
      links: [
        { label: 'Privacy Policy', to: '/' },
        { label: 'Terms of Service', to: '/' },
        { label: 'Disclaimer', to: '/' },
      ]
    }
  ]
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Growth Harbour Logo" className="logo-img" />
            Growth Harbour
          </div>
          <p>Growth Harbour Private Limited is a premier business and management consulting firm dedicated to helping organisations across India unlock their full potential through strategy, operations, digital innovation, and people excellence.</p>
          <p style={{ marginTop: 12, fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)' }}>CIN: U65990DL2025PTC000000 | MSME Registered</p>
        </div>
        {cols.map(col => (
          <div className="footer-col" key={col.title}>
            <h4>{col.title}</h4>
            <ul>
              {col.links.map(link => (
                <li key={link.label}><Link to={link.to}>{link.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© {year} Growth Harbour Private Limited. All rights reserved.</span>
        <div className="social-links">
          <a href="#" className="social-link" aria-label="LinkedIn">in</a>
          <a href="#" className="social-link" aria-label="Twitter">𝕏</a>
          <a href="#" className="social-link" aria-label="Instagram">ig</a>
          <a href="#" className="social-link" aria-label="YouTube">▶</a>
        </div>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════ */
function HomePage() {
  const whyUs = [
    { icon: '🎯', title: 'Outcome-Driven Approach', desc: 'We don\'t just deliver reports — we deliver results. Every engagement is scoped around measurable business outcomes, and our success is defined by the tangible impact we create for your organisation.' },
    { icon: '⚡', title: 'Agile & Fast Execution', desc: 'Business moves fast — so do we. Our lean consulting teams are structured for speed, cutting through bureaucracy to deliver actionable insights and implementable solutions within weeks, not months.' },
    { icon: '🔍', title: 'Deep Industry Expertise', desc: 'Our consultants bring hands-on experience across 10+ sectors including financial services, retail, manufacturing, technology, and healthcare — ensuring advice that is grounded in sector-specific realities.' },
    { icon: '👤', title: 'Dedicated Engagement Manager', desc: 'Every client is assigned a senior Engagement Manager who acts as your single point of contact — understanding your business deeply and ensuring complete alignment from strategy through to execution.' },
    { icon: '📊', title: 'Data-Backed Insights', desc: 'Our recommendations are never based on gut feel alone. We combine primary research, industry benchmarking, and advanced data analytics to ensure every strategic decision is supported by hard evidence.' },
    { icon: '🌱', title: 'Long-Term Partnership', desc: 'We invest in relationships, not transactions. Many of our clients have partnered with us across multiple projects over several years — a testament to the trust and consistent value we deliver.' },
  ]

  return (
    <Page>
      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">🚀 India's Trusted Business &amp; Management Consulting Firm</div>
            <h1>Your Growth is <span>Our Priority</span></h1>
            <p>
              Growth Harbour Private Limited is a premier consulting firm headquartered in New Delhi. We partner with organisations across India to solve their most complex business challenges — from shaping corporate strategy and transforming operations to driving digital innovation and building high-performance teams. Whether you are a startup, an MSME, or a large enterprise, we have the expertise to accelerate your growth.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn-primary">Get a Free Consultation</Link>
              <Link to="/services" className="btn-outline">Explore Our Services</Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item"><div className="num">200+</div><div className="label">Projects Delivered</div></div>
              <div className="stat-item"><div className="num">50+</div><div className="label">Expert Consultants</div></div>
              <div className="stat-item"><div className="num">95%</div><div className="label">Client Retention</div></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card accent"><div className="icon">🎯</div><div className="stat">10+</div><div className="stat-label">Industries Served</div></div>
            <div className="hero-card"><div className="icon">🤝</div><div className="stat">50+</div><div className="stat-label">Expert Consultants</div></div>
            <div className="hero-card"><div className="icon">📈</div><div className="stat">95%</div><div className="stat-label">Client Retention</div></div>
            <div className="hero-card accent"><div className="icon">✅</div><div className="stat">200+</div><div className="stat-label">Projects Delivered</div></div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="stats">
        <div className="stats-grid">
          {[
            { num: '12+', desc: 'Years of Combined Experience', sub: 'Across strategy & operations' },
            { num: '200+', desc: 'Projects Successfully Delivered', sub: 'Across all service lines' },
            { num: '95%', desc: 'Client Retention Rate', sub: 'Consistently year-on-year' },
            { num: '10+', desc: 'Industries Served', sub: 'From startups to enterprises' }
          ].map(s => (
            <div className="stat-box" key={s.desc}>
              <div className="number">{s.num}</div>
              <div className="desc">{s.desc}</div>
              <div className="sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services teaser */}
      <section className="section services">
        <div className="section-inner">
          <div className="section-header center">
            <div className="section-tag">What We Do</div>
            <h2 className="section-title">Consulting Solutions Built for <span>Every Challenge</span></h2>
            <p className="section-subtitle">
              From shaping corporate strategy and streamlining operations to driving digital transformation and developing high-performance teams — we bring the expertise, frameworks, and hands-on support your organisation needs to grow.
            </p>
          </div>
          <div className="services-grid">
            {services.slice(0, 3).map(s => (
              <div className="service-card" key={s.title}>
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.shortDesc}</p>
                <Link to="/services" className="learn-more">Learn more →</Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/services" className="btn-primary">View All 5 Practice Areas</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="section-inner">
          <div className="section-header center">
            <div className="section-tag">Why Choose Us</div>
            <h2 className="section-title">What Sets Growth Harbour <span>Apart</span></h2>
            <p className="section-subtitle">
              We don't just deliver strategies — we become your long-term growth partner, combining deep expertise with practical execution to drive real, measurable business impact.
            </p>
          </div>
          <div className="why-grid">
            {whyUs.map(w => (
              <div className="why-card" key={w.title}>
                <div className="why-icon">{w.icon}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="cta-strip">
        <div className="cta-strip-inner">
          <div>
            <h2>Ready to Take the Next Step?</h2>
            <p>Talk to our consultants today — free discovery call, no obligations.</p>
          </div>
          <div className="cta-strip-actions">
            <Link to="/contact" className="btn-primary">Book Free Consultation</Link>
            <Link to="/about" className="btn-outline">Learn About Us</Link>
          </div>
        </div>
      </section>
    </Page>
  )
}

/* ══════════════════════════════════════════════
   SERVICES DATA & PAGE
══════════════════════════════════════════════ */
const services = [
  {
    icon: '🎯',
    title: 'Strategy Consulting',
    shortDesc: 'Whether you\'re a startup defining direction or an enterprise navigating change, our strategy consultants help you set clear goals, outmanoeuvre competition, and build a roadmap for sustainable growth.',
    desc: 'Strategy consulting is the cornerstone of what we do at Growth Harbour. We work directly with founders, CEOs, and senior leadership teams to tackle the most critical questions facing their organisations — where to compete, how to win, and how to sustain advantage over time. Our approach combines rigorous market analysis, competitive intelligence, and collaborative workshops to produce strategies that are bold yet realistic.',
    features: [
      'Corporate strategy development — vision, mission, and long-term roadmaps',
      'Market entry strategy for new geographies, segments, and products',
      'Competitive positioning and differentiation frameworks',
      'Business model design and revenue stream diversification',
      'Strategic planning workshops and facilitated leadership offsites',
      'Portfolio strategy and business unit prioritisation',
      'Growth acceleration plans for startups and MSMEs',
      'Feasibility studies and go-to-market strategy for new ventures',
    ],
    note: 'Ideal for: Startups seeking direction | MSMEs planning scale-up | Enterprises undergoing transformation'
  },
  {
    icon: '⚙️',
    title: 'Management Consulting',
    shortDesc: 'Operational excellence is not an accident — it\'s engineered. Our management consultants identify inefficiencies, redesign processes, and build the systems your organisation needs to perform at its peak.',
    desc: 'Great strategy means nothing without the operational capability to execute it. Growth Harbour\'s management consulting practice helps organisations streamline how they work — removing bottlenecks, eliminating waste, and building scalable operating models that deliver consistent results. We embed ourselves in your business to understand your processes from the inside, then co-create solutions your teams can actually implement.',
    features: [
      'Operating model design and organisational restructuring',
      'Business process reengineering (BPR) and workflow optimisation',
      'Performance management systems and KPI framework design',
      'Cost optimisation and resource allocation reviews',
      'Supply chain and procurement process improvement',
      'Change management planning and stakeholder communication',
      'Project management office (PMO) setup and governance',
      'Post-merger integration support and operational alignment',
    ],
    note: 'Ideal for: Growing companies hitting operational ceilings | Enterprises seeking cost efficiency | Post-merger integrations'
  },
  {
    icon: '💻',
    title: 'Digital Transformation',
    shortDesc: 'Digital is no longer optional — it\'s existential. We help organisations build and execute digital strategies that modernise operations, enhance customer experience, and unlock new revenue opportunities.',
    desc: 'Digital transformation is one of the most complex and consequential journeys an organisation can undertake. Growth Harbour guides businesses through every stage — from assessing digital maturity and defining a transformation roadmap, to selecting the right technology platforms and managing the organisational change that comes with them. Our consultants combine strategic thinking with practical technology expertise to ensure your digital investments deliver real business value.',
    features: [
      'Digital maturity assessment and transformation roadmap development',
      'Technology selection, vendor evaluation, and RFP management',
      'ERP, CRM, and HRMS implementation advisory',
      'AI and automation opportunity identification and deployment',
      'Data strategy, analytics architecture, and BI implementation',
      'Cloud migration strategy and hybrid infrastructure planning',
      'Customer experience (CX) redesign through digital channels',
      'Cybersecurity posture assessment and risk mitigation planning',
    ],
    note: 'Ideal for: Businesses digitising operations | Enterprises adopting AI & automation | Companies improving customer experience'
  },
  {
    icon: '👥',
    title: 'HR & Talent Consulting',
    shortDesc: 'Your people are your most valuable asset. Our HR consultants help you attract, develop, and retain top talent — building the organisational culture and people systems that power long-term success.',
    desc: 'In a competitive talent market, the organisations that win are those that invest in their people strategy with the same rigour they apply to their business strategy. Growth Harbour\'s HR consulting practice helps companies design people-first systems — from talent acquisition and onboarding to performance management, leadership development, and culture transformation. We ensure your organisation has the human capital it needs to execute its strategy.',
    features: [
      'HR function assessment and people strategy development',
      'Organisational design and workforce planning',
      'Talent acquisition strategy and employer branding',
      'Performance appraisal system design and implementation',
      'Leadership development programmes and succession planning',
      'Employee engagement surveys and culture transformation initiatives',
      'Compensation benchmarking and total rewards strategy',
      'HR policy documentation, employee handbooks, and compliance frameworks',
    ],
    note: 'Ideal for: Startups building their first HR function | Scaling companies standardising people processes | Enterprises transforming culture'
  },
  {
    icon: '📊',
    title: 'Financial Advisory',
    shortDesc: 'Sound financial decision-making is the backbone of every successful business. Our financial advisors help you plan, optimise, and protect your organisation\'s financial health for the long term.',
    desc: 'Growth Harbour\'s financial advisory practice provides businesses with the financial clarity and expertise they need to make confident decisions. Whether you\'re planning for growth, navigating a turnaround, preparing for investment, or optimising your cost base, our advisors bring deep financial acumen and commercial judgement to every engagement. We translate complex financial data into actionable insights your leadership team can act on.',
    features: [
      'Business financial planning, budgeting, and forecasting',
      'Cash flow modelling and working capital optimisation',
      'Investment readiness and fundraising advisory for startups',
      'Financial due diligence for acquisitions and partnerships',
      'Profitability analysis and margin improvement programmes',
      'Management information system (MIS) design and reporting',
      'Cost reduction and spend analytics',
      'Financial controls assessment and internal audit support',
    ],
    note: 'Ideal for: Startups seeking investment | MSMEs improving profitability | Enterprises optimising financial performance'
  }
]

function ServicesPage() {
  return (
    <Page>
      <PageBanner
        title="Our Services"
        subtitle="End-to-end consulting across 5 practice areas — from strategy and management to digital transformation, HR, and financial advisory."
      />
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="section-inner">
          <div className="section-header center">
            <div className="section-tag">What We Offer</div>
            <h2 className="section-title">Comprehensive Consulting Solutions <span>Under One Roof</span></h2>
            <p className="section-subtitle">
              We serve clients across 10+ industries — including financial services, technology, retail, manufacturing, and healthcare — delivering tailored consulting engagements that create measurable, lasting impact.
            </p>
          </div>

          <div className="services-full-grid">
            {services.map(s => (
              <div className="service-full-card" key={s.title}>
                <div className="sfc-left">
                  <div className="service-icon large">{s.icon}</div>
                </div>
                <div className="sfc-right">
                  <h3>{s.title}</h3>
                  <p className="sfc-desc">{s.desc}</p>
                  <div className="sfc-features">
                    <p className="sfc-features-label">What's Covered</p>
                    <ul>
                      {s.features.map(f => <li key={f}>{f}</li>)}
                    </ul>
                  </div>
                  <div className="sfc-note">{s.note}</div>
                  <Link to="/contact" className="btn-primary" style={{ marginTop: 20, display: 'inline-block' }}>Enquire About This Service</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Industry partners */}
          <div className="banks-section">
            <p className="banks-label">Industries We Serve</p>
            <div className="banks-grid">
              {['Financial Services','Technology','Retail & E-commerce','Manufacturing','Healthcare','Education','Real Estate','Logistics','FMCG','Hospitality','Pharmaceuticals','Media & Entertainment'].map(b => (
                <div className="bank-badge" key={b}>{b}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}

/* ══════════════════════════════════════════════
   ABOUT PAGE
══════════════════════════════════════════════ */
function AboutPage() {
  const values = [
    { icon: '🤝', title: 'Client First', desc: 'Every decision we make is guided by one question: is this truly in our client\'s best interest? Your growth and satisfaction are the only measure of our success.' },
    { icon: '🔍', title: 'Transparency', desc: 'We believe in complete clarity — on scope, timelines, fees, and findings. Every recommendation is explained in plain language with the evidence to back it up.' },
    { icon: '⚡', title: 'Speed & Efficiency', desc: 'Time is strategy. Our lean teams and structured methodologies ensure we deliver actionable insights and implementable solutions faster than the industry norm.' },
    { icon: '🌱', title: 'Long-Term Partnership', desc: 'We are not a one-time vendor. We aim to be your strategic partner for the long haul — growing alongside your business and evolving our support as your needs change.' },
  ]

  const milestones = [
    { year: '2025', event: 'Growth Harbour Private Limited incorporated in New Delhi with a founding team of 10 directors.' },
    { year: '2025', event: 'Launched 5 core consulting practice areas: Strategy, Management, Digital, HR & Talent, and Financial Advisory.' },
    { year: '2025', event: 'Onboarded first 50 clients across Delhi NCR, spanning technology, retail, and financial services sectors.' },
    { year: '2026', event: 'Expanded team to 50+ consultants and analysts; crossed 200 project deliveries across 10+ industries.' },
  ]

  return (
    <Page>
      <PageBanner
        title="About Us"
        subtitle="Growth Harbour Private Limited — dedicated consulting partners committed to helping organisations across India grow smarter, operate better, and lead with confidence."
      />

      {/* Company story */}
      <section className="section">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-image">
              <div className="about-img-main">🌱</div>
              <div className="about-badge">
                <div className="num">10</div>
                <div className="txt">Founder Directors</div>
              </div>
            </div>
            <div className="about-text">
              <div className="section-tag">Our Story</div>
              <h2 className="section-title">Built to Bridge the Gap Between <span>Ambition & Achievement</span></h2>
              <p className="about-para">
                Growth Harbour Private Limited was incorporated with a single, unwavering purpose: to make world-class consulting accessible to every Indian organisation — from the first-time founder in a tier-2 city to a scaling enterprise in the metro. We understood that in India, the gap between ambition and achievement is often bridged not by luck, but by the right strategic partner.
              </p>
              <p className="about-para">
                Founded by a team of 10 seasoned business professionals — each with deep expertise in strategy, operations, technology, and people management — Growth Harbour operates at the intersection of insight, execution, and trust. We don't just hand over reports and walk away; we become embedded partners who stay accountable for outcomes long after the engagement ends.
              </p>
              <p className="about-para">
                Our practice spans 5 core consulting areas — Strategy, Management, Digital Transformation, HR & Talent, and Financial Advisory — serving clients across 10+ industries including financial services, technology, retail, manufacturing, and healthcare across Delhi NCR and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section" style={{ background: 'var(--gray-50)', paddingTop: 60, paddingBottom: 60 }}>
        <div className="section-inner">
          <div className="mv-grid">
            <div className="mv-card mission">
              <div className="mv-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To make high-impact consulting accessible to every ambitious organisation across India — enabling sustainable growth through honest, expert-led advisory that is grounded in data, delivered with speed, and measured by real business outcomes.</p>
            </div>
            <div className="mv-card vision">
              <div className="mv-icon">🔭</div>
              <h3>Our Vision</h3>
              <p>To become India's most trusted consulting firm — a company where every client walks away not just with a strategy, but with the clarity, capability, and confidence to execute it and achieve their long-term business goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="section-inner">
          <div className="section-header center">
            <div className="section-tag">Our Values</div>
            <h2 className="section-title">The Principles That <span>Drive Us</span></h2>
          </div>
          <div className="values-grid">
            {values.map(v => (
              <div className="value-card" key={v.title}>
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="section" style={{ background: 'var(--gray-50)', paddingTop: 70, paddingBottom: 70 }}>
        <div className="section-inner">
          <div className="section-header center">
            <div className="section-tag">Our Journey</div>
            <h2 className="section-title">Key <span>Milestones</span></h2>
          </div>
          <div className="milestones">
            {milestones.map((m, i) => (
              <div className="milestone-item" key={i}>
                <div className="milestone-year">{m.year}</div>
                <div className="milestone-line"><div className="milestone-dot" /></div>
                <div className="milestone-text">{m.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats">
        <div className="stats-grid">
          {[
            { num: '10+', desc: 'Industries Served', sub: 'From startups to enterprises' },
            { num: '200+', desc: 'Projects Delivered', sub: 'Across all practice areas' },
            { num: '50+', desc: 'Expert Consultants', sub: 'Across Delhi NCR' },
            { num: '95%', desc: 'Client Retention Rate', sub: 'Consistently year-on-year' }
          ].map(s => (
            <div className="stat-box" key={s.desc}>
              <div className="number">{s.num}</div>
              <div className="desc">{s.desc}</div>
              <div className="sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  )
}

/* ══════════════════════════════════════════════
   DIRECTORS PAGE
══════════════════════════════════════════════ */
const directors = [
  { din: '11154153', name: 'SHRISTY MALIK', since: 'Aug 2025' },
  { din: '11167470', name: 'VIKAS DHANDHI', since: 'Aug 2025' },
  { din: '06805191', name: 'SUMIT DABAS', since: 'Aug 2025' },
  { din: '11154157', name: 'SAHIL', since: 'Aug 2025' },
  { din: '11154152', name: 'HINA MEHTAAB KHAN', since: 'Aug 2025' },
  { din: '11155204', name: 'ANJU', since: 'Aug 2025' },
  { din: '11154156', name: 'PARVEEN DHANDHI', since: 'Aug 2025' },
  { din: '11155203', name: 'ANURADHA', since: 'Aug 2025' },
  { din: '11259318', name: 'SUNIL KUMAR', since: 'Aug 2025' },
  { din: '11259319', name: 'ANITA AHLAWAT', since: 'Aug 2025' },
]
const avatarColors = [
  '#EA580C','#1a0800','#F97316','#FB923C','#EA580C',
  '#1a0800','#FB923C','#F97316','#EA580C','#1a0800'
]

function DirectorsPage() {
  const govPoints = [
    'All 10 directors serve as Promoter Directors, collectively holding 100% shareholding in the company.',
    'The board meets quarterly to review operational performance, financial targets, and strategic expansion plans.',
    'Each director is responsible for a specific vertical — covering consulting advisory, compliance, operations, client relations, and business development.',
    'Growth Harbour maintains full compliance with MCA (Ministry of Corporate Affairs) regulations and annual ROC filing requirements.',
  ]

  return (
    <Page>
      <PageBanner
        title="Board of Directors"
        subtitle="Meet the founding promoter directors who drive the vision, governance, and consulting excellence of Growth Harbour Private Limited."
      />

      <section className="section">
        <div className="section-inner">
          {/* Intro */}
          <div className="directors-intro">
            <div className="section-tag">Leadership</div>
            <h2 className="section-title">A Board Built on <span>Expertise & Commitment</span></h2>
            <p className="about-para" style={{ maxWidth: 720 }}>
              Growth Harbour Private Limited is led by a diverse and experienced board of 10 Promoter Directors, each bringing a unique perspective from strategy, operations, technology, finance, and people management. Together, they ensure the firm remains client-focused, compliant, and consistently delivers on its promise of transparent, high-impact consulting.
            </p>
          </div>

          {/* Cards */}
          <div className="directors-grid">
            {directors.map((d, i) => (
              <div className="director-card" key={d.din}>
                <div className="director-avatar" style={{ background: avatarColors[i] }}>
                  {d.name.charAt(0)}
                </div>
                <div className="director-name">{d.name}</div>
                <div className="director-role">Promoter Director</div>
                <div className="director-din">DIN: {d.din}</div>
                <div className="director-since">Since {d.since}</div>
              </div>
            ))}
          </div>

          {/* Governance */}
          <div className="governance-box">
            <h3>Corporate Governance</h3>
            <ul>
              {govPoints.map(p => (
                <li key={p}>
                  <span className="gov-check">✓</span> {p}
                </li>
              ))}
            </ul>
            <div className="cin-bar">
              <span>Company Type: Private Limited</span>
              <span>Category: Company Limited by Shares</span>
              <span>Registered Office: New Delhi, India</span>
              <span>ROC: RoC-Delhi</span>
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}

/* ══════════════════════════════════════════════
   TESTIMONIALS PAGE
══════════════════════════════════════════════ */
const testimonials = [
  {
    stars: 5,
    quote: 'Growth Harbour\'s strategy team helped us completely rethink our go-to-market approach. Within 3 months of implementing their recommendations, our revenue from new customer segments grew by 40%. Their consultants didn\'t just hand over a slide deck — they stayed with us through execution and made sure the strategy actually landed.',
    avatar: '👨‍💼',
    name: 'Ramesh Gupta',
    title: 'Founder & CEO, Gupta Retail Group, Delhi',
    loan: 'Strategy Consulting Engagement'
  },
  {
    stars: 5,
    quote: 'We were struggling with high operational costs and slow processes across our manufacturing unit. Growth Harbour\'s management consulting team mapped every workflow, identified redundancies we had never even noticed, and redesigned our operations from the ground up. We reduced operational costs by 22% in the first six months.',
    avatar: '👩‍🦱',
    name: 'Sunita Verma',
    title: 'Operations Director, Verma Industries, Noida',
    loan: 'Management Consulting Engagement'
  },
  {
    stars: 5,
    quote: 'Our digital transformation project had stalled twice before we brought in Growth Harbour. They cut through the complexity, selected the right ERP vendor for our size, managed the implementation, and trained our team. For the first time, our finance, sales, and inventory are all talking to each other in real time.',
    avatar: '👨‍💻',
    name: 'Vikram Singh',
    title: 'CEO, TechNova Solutions, Gurugram',
    loan: 'Digital Transformation Engagement'
  },
  {
    stars: 5,
    quote: 'As we scaled from 30 to 120 employees in under two years, our HR processes simply couldn\'t keep up. Growth Harbour built our entire people infrastructure — from appraisal systems and compensation bands to culture programmes and a proper onboarding process. Our attrition dropped from 34% to 11% within a year.',
    avatar: '👩‍💼',
    name: 'Anjali Desai',
    title: 'Co-founder, Desai Digital, South Delhi',
    loan: 'HR & Talent Consulting Engagement'
  },
  {
    stars: 5,
    quote: 'Growth Harbour\'s financial advisory team helped us build a proper business plan and financial model ahead of our Series A fundraise. Their investor readiness work was exceptional — they knew exactly what questions investors would ask and helped us build the answers into our narrative. We closed our round within 10 weeks.',
    avatar: '🧑‍💼',
    name: 'Ravi Kumar',
    title: 'Founder, AgriTech Ventures, Haryana',
    loan: 'Financial Advisory Engagement'
  }
]

function TestimonialsPage() {
  return (
    <Page>
      <PageBanner
        title="Client Testimonials"
        subtitle="Real stories from real clients. Discover how Growth Harbour has helped startups, MSMEs, and enterprises across India grow faster, operate smarter, and achieve their goals."
      />

      {/* Stats bar */}
      <div className="testi-stats">
        <div className="testi-stat"><span className="ts-num">200+</span><span className="ts-label">Projects Delivered</span></div>
        <div className="testi-stat"><span className="ts-num">4.9/5</span><span className="ts-label">Average Rating</span></div>
        <div className="testi-stat"><span className="ts-num">95%</span><span className="ts-label">Client Retention</span></div>
        <div className="testi-stat"><span className="ts-num">5</span><span className="ts-label">Practice Areas</span></div>
      </div>

      <section className="section testimonials">
        <div className="section-inner">
          <div className="section-header center">
            <div className="section-tag">Client Stories</div>
            <h2 className="section-title">What Our Clients <span>Say About Us</span></h2>
            <p className="section-subtitle">
              These are real experiences shared by our clients — founders, business owners, and enterprise leaders — who trusted Growth Harbour to help them navigate their most important business challenges.
            </p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map(t => (
              <div className="testimonial-card" key={t.name}>
                <div className="stars">{'★'.repeat(t.stars)}</div>
                <blockquote>"{t.quote}"</blockquote>
                <div className="testi-loan-tag">{t.loan}</div>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.avatar}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-title">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-strip">
        <div className="cta-strip-inner">
          <div>
            <h2>Join Our Growing Family of Satisfied Clients</h2>
            <p>Talk to a consultant today — free discovery call, zero obligations, complete confidentiality.</p>
          </div>
          <div className="cta-strip-actions">
            <Link to="/contact" className="btn-primary">Get Free Consultation</Link>
          </div>
        </div>
      </section>
    </Page>
  )
}

/* ══════════════════════════════════════════════
   CONTACT PAGE
══════════════════════════════════════════════ */
const faqs = [
  { q: 'How long does a typical consulting engagement take?', a: 'It depends on the scope. A focused strategy or diagnostic project typically runs 4–8 weeks. A full-scale transformation engagement — covering strategy through implementation — can span 3–6 months. We scope every project clearly upfront so you know exactly what to expect.' },
  { q: 'Do you charge for the initial consultation?', a: 'No — our initial discovery call is completely free with no obligations. We use it to understand your business, your challenges, and your goals before we propose any engagement. You only pay once we agree on a defined scope and deliverables.' },
  { q: 'How do you price your consulting engagements?', a: 'We offer flexible pricing models — fixed-fee project pricing for well-defined scopes, and retainer-based arrangements for ongoing advisory. All fees are discussed and agreed upon transparently before any work begins. There are no hidden charges.' },
  { q: 'Do you work with small businesses and startups, or only large enterprises?', a: 'We work with organisations of all sizes — from early-stage startups to established MSMEs and large enterprises. Our engagements are scaled to suit your budget and stage of growth. Many of our most impactful projects have been with growing SMEs.' },
  { q: 'What industries do you specialise in?', a: 'Our consultants bring hands-on experience across 10+ industries including financial services, technology, retail, manufacturing, healthcare, education, logistics, and FMCG. We match the right consultant to your sector so you always get advice grounded in industry reality.' },
]

function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null)

  const contactDetails = [
    { icon: '📧', label: 'Email Us', value: 'growthharbor7@gmail.com', sub: 'We respond within 4 business hours' },
    { icon: '📞', label: 'Call Us', value: '+91 98765 43210', sub: 'Mon–Sat, 9am–7pm IST' },
    { icon: '📍', label: 'Our Office', value: 'Pune, Maharashtra', sub: 'Walk-ins welcome by appointment' },
    { icon: '💬', label: 'WhatsApp', value: '+91 98765 43210', sub: 'Quick queries & document sharing' },
  ]

  return (
    <Page>
      <PageBanner
        title="Contact Us"
        subtitle="Reach out to our team for a free discovery call. We're here to understand your challenges and explore how we can help your organisation grow."
      />

      <section className="section">
        <div className="section-inner">
          <div className="contact-info" style={{ maxWidth: 600, margin: '0 auto' }}>
            <div className="section-tag">Get In Touch</div>
            <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Let's Solve Your <span style={{ color: 'var(--primary)' }}>Toughest Business Challenges</span></h2>
            <p style={{ color: 'var(--gray-600)', marginBottom: 32, lineHeight: 1.7 }}>
              Whether you have a specific project in mind or just want to explore how consulting can help your organisation, our team is here to give you honest, expert guidance — completely free of charge. Reach out through any of the channels below.
            </p>
            <div className="contact-details">
              {contactDetails.map(d => (
                <div className="contact-item" key={d.label}>
                  <div className="contact-item-icon">{d.icon}</div>
                  <div>
                    <h4>{d.label}</h4>
                    <p>{d.value}</p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--gray-600)' }}>{d.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="section-inner">
          <div className="section-header center">
            <div className="section-tag">FAQ</div>
            <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
            <p className="section-subtitle">Everything you need to know before applying. Can't find your answer? Call us directly.</p>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div className={`faq-item${openFaq === i ? ' open' : ''}`} key={i}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className="faq-chevron">{openFaq === i ? '▲' : '▼'}</span>
                </button>
                {openFaq === i && <div className="faq-answer">{f.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Page>
  )
}

/* ── App ── */
export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/directors" element={<DirectorsPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </HashRouter>
  )
}
