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
        { label: 'Business Loans', to: '/services' },
          { label: 'Secured Loans', to: '/services' },
        { label: 'Unsecured Loans', to: '/services' },
        { label: 'Emergency Loans', to: '/services' },
        { label: 'Govt-Sponsored Loans', to: '/services' },
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
          <p>Growth Harbour Private Limited is a leading loan consultancy and financial advisory firm dedicated to connecting individuals and businesses with the right financial solutions across India.</p>
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
    { icon: '🏦', title: '15+ Banking Partners', desc: 'We work with HDFC, Axis, SBI, Bajaj Finserv, Canara Bank, Bandhan Bank, Kotak Mahindra, ICICI, and more — giving you access to the widest range of loan products and the most competitive interest rates in the market.' },
    { icon: '⚡', title: 'Fast & Hassle-Free Processing', desc: 'Most loan applications are processed within 48–72 hours. Our dedicated team handles documentation, lender coordination, and follow-ups so you don\'t have to. You focus on your goals; we handle the paperwork.' },
    { icon: '🛡️', title: 'Zero Hidden Charges', desc: 'We believe in complete financial transparency. Every fee, charge, and term is disclosed upfront. What you see is what you get — no surprise deductions, no fine print traps, no post-disbursal shocks.' },
    { icon: '👤', title: 'Dedicated Relationship Manager', desc: 'Every client is assigned a personal Relationship Manager who understands your financial profile, guides you through the entire process, and remains available for all future financial needs.' },
    { icon: '📊', title: '98% Approval Success Rate', desc: 'Our deep understanding of lender eligibility criteria means we only recommend products you qualify for. This precision approach results in an industry-leading 98% loan approval success rate.' },
    { icon: '🇮🇳', title: 'Government Scheme Expertise', desc: 'MUDRA, CGTMSE, Stand-Up India, Startup India — we are certified practitioners for all major government lending schemes and ensure our clients leverage every available subsidy and credit guarantee.' },
  ]

  return (
    <Page>
      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">🚀 India's Trusted Loan Consultancy &amp; Financial Advisory</div>
            <h1>Your Growth is <span>Our Priority</span></h1>
            <p>
              Growth Harbour Private Limited is a leading financial advisory and loan consultancy firm based in New Delhi. We bridge the gap between your ambitions and the capital required to achieve them — offering end-to-end loan facilitation across 5+ categories, backed by a network of 15+ banks and NBFCs. Whether you are an entrepreneur, a salaried professional, or a growing enterprise, we have the right solution for you.
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn-primary">Get a Free Consultation</Link>
              <Link to="/services" className="btn-outline">Explore Our Services</Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item"><div className="num">80+</div><div className="label">Loans Facilitated</div></div>
              <div className="stat-item"><div className="num">25yr</div><div className="label">Combined Experience</div></div>
              <div className="stat-item"><div className="num">98%</div><div className="label">Success Rate</div></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-card accent"><div className="icon">🏦</div><div className="stat">15+</div><div className="stat-label">Banking Partners</div></div>
            <div className="hero-card"><div className="icon">🤝</div><div className="stat">70+</div><div className="stat-label">Team Members</div></div>
            <div className="hero-card"><div className="icon">📈</div><div className="stat">95%</div><div className="stat-label">Client Satisfaction</div></div>
            <div className="hero-card accent"><div className="icon">✅</div><div className="stat">98%</div><div className="stat-label">Approval Rate</div></div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="stats">
        <div className="stats-grid">
          {[
            { num: '25+', desc: 'Years of Combined Experience', sub: 'Across banking & lending' },
            { num: '80+', desc: 'Loans Successfully Facilitated', sub: 'Across all categories' },
            { num: '95%', desc: 'Client Satisfaction Rate', sub: 'Consistently year-on-year' },
            { num: '98%', desc: 'Loan Approval Success Rate', sub: 'Best-match lender process' }
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
            <h2 className="section-title">Loan Solutions Built for <span>Every Need</span></h2>
            <p className="section-subtitle">
              From business funding and government-sponsored schemes to secured, unsecured, and emergency credit — we collaborate with India's leading banks and NBFCs to ensure you always receive the most competitive offer available.
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
            <Link to="/services" className="btn-primary">View All 5 Services</Link>
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
              We don't just connect you to a loan — we become your long-term financial partner, guiding every step of the way with expertise, speed, and integrity.
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
            <p>Talk to our financial advisors today — free consultation, no obligations.</p>
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
    icon: '🏢',
    title: 'Business Loans',
    shortDesc: 'Whether launching a startup or scaling an enterprise, our business loan solutions connect you with PSU banks and top NBFCs for working capital, expansion, and operations funding.',
    desc: 'A business loan is purpose-built funding designed to help entrepreneurs, MSMEs, and established companies start, grow, or sustain their operations. At Growth Harbour, we understand that no two businesses are alike — which is why we offer a consultative approach to match you with the most suitable lender and product from our network of 15+ banks and NBFCs.',
    features: [
      'Working Capital Loans for managing daily operations & cash flow',
      'Term Loans for machinery, infrastructure, and business expansion',
      'MSME Loans under government priority-sector lending schemes',
      'Startup Funding with minimal documentation requirements',
      'Overdraft (OD) & Cash Credit (CC) facilities',
      'Turnover-based loans using P&L and bank statements',
      'Loan amounts from ₹1 Lakh to ₹10 Crore+',
      'Repayment tenures up to 7 years with flexible EMI structures',
    ],
    note: 'Eligibility: Min. 1 year in business | ITR filing preferred | GST registration an advantage'
  },
  {
    icon: '🔐',
    title: 'Secured Loans',
    shortDesc: 'Pledge an asset, unlock large capital. Secured loans offer higher loan amounts and lower interest rates — ideal for substantial financial needs backed by property, gold, or investments.',
    desc: 'A secured loan is backed by collateral — an asset of value you pledge to the lender as security against the borrowing. Because the lender\'s risk is reduced, you benefit from significantly lower interest rates and access to larger loan amounts. Growth Harbour evaluates your assets and connects you with the lender offering the best Loan-to-Value (LTV) ratio and most favourable terms.',
    features: [
      'Loan Against Property (LAP) — residential, commercial & industrial',
      'Gold Loans — quick liquidity against your gold jewellery or coins',
      'Vehicle Loans — two-wheelers, passenger cars & commercial vehicles',
      'Loans Against Securities — shares, mutual funds & bonds',
      'Fixed Deposit (FD) backed credit lines',
      'Loan amounts from ₹1 Lakh up to ₹10 Crore based on asset valuation',
      'Interest rates starting from 8.5% p.a.',
      'Repayment tenure up to 20 years for property-backed loans',
    ],
    note: 'Eligibility: Clear title/ownership of asset | Minimum credit score 650 | Income proof required'
  },
  {
    icon: '🤝',
    title: 'Unsecured Loans',
    shortDesc: 'No collateral? No problem. Unsecured loans are disbursed based on your creditworthiness and income — fast, paperless, and flexible for salaried professionals and self-employed individuals alike.',
    desc: 'Not everyone has assets to pledge — and that should never be a barrier to accessing credit. Our unsecured loan services offer collateral-free funding based purely on your income profile, employment stability, and credit history. Ideal for salaried professionals, self-employed individuals, and small business owners who need quick funds without tying up their assets.',
    features: [
      'Personal Loans for medical bills, travel, wedding, or any personal use',
      'Professional Loans for doctors, CAs, engineers, lawyers & architects',
      'Instant digital loans with paperless KYC and 24–48 hour disbursal',
      'Business loans for SMEs with strong revenue but limited tangible assets',
      'Credit lines and revolving credit for working capital needs',
      'Loan amounts up to ₹40 Lakh for salaried; ₹50 Lakh for self-employed',
      'Flexible tenures from 12 to 60 months',
      'Minimal documents: Aadhaar, PAN, bank statements, salary slips',
    ],
    note: 'Eligibility: Min. credit score 700 | Salaried: min. ₹25,000 net monthly income | Self-employed: 2-year ITR'
  },
  {
    icon: '🚨',
    title: 'Emergency & Miscellaneous Loans',
    shortDesc: 'Life doesn\'t always give advance notice. Our emergency loan solutions are built for speed — fast-tracked applications and same-day processing for urgent situations.',
    desc: 'Financial emergencies demand immediate action. Whether it\'s an unexpected hospital bill, urgent home repairs, or a sudden personal crisis, Growth Harbour\'s emergency loan service is designed to move as fast as you need it to. We fast-track your application, liaise directly with lenders, and prioritize the fastest possible disbursement so that money reaches you when it matters most.',
    features: [
      'Medical Emergency Loans — hospital bills, surgery, critical care & ICU costs',
      'Travel Emergency Loans — last-minute travel, family emergencies abroad',
      'Home Repair Loans — urgent structural, electrical & utility repairs',
      'Advance Salary Loans for salaried individuals against next paycheck',
      'Same-day or next-day processing for pre-approved customer profiles',
      'Digital KYC for minimal paperwork and faster approval',
      'Available 7 days a week including public holidays',
      'Loan amounts from ₹10,000 to ₹5 Lakh for emergency purposes',
    ],
    note: 'Eligibility: Existing customer advantage | Salaried & self-employed eligible | Emergency documentation accepted'
  },
  {
    icon: '🏛️',
    title: 'Government-Sponsored Loans',
    shortDesc: 'The Government of India offers powerful subsidy-linked and priority-sector lending schemes. Growth Harbour is your expert guide through MUDRA, CGTMSE, Stand-Up India, and more.',
    desc: 'The Indian government has launched several transformative lending schemes aimed at empowering entrepreneurs, women, farmers, and marginalized communities — often at subsidized interest rates with credit guarantees. These schemes remain under-utilized because many applicants are unaware of them or struggle with the application process. Growth Harbour bridges this gap with certified expertise and end-to-end support.',
    features: [
      'PM MUDRA Yojana — Shishu (up to ₹50K), Kishore (₹50K–₹5L), Tarun (₹5L–₹10L)',
      'CGTMSE — Credit Guarantee Fund for MSMEs: collateral-free up to ₹2 Crore',
      'Stand-Up India — Dedicated loans for SC/ST and women entrepreneurs',
      'Startup India Seed Fund — Early-stage financing for registered startups',
      'PM SVANidhi — Micro-credit for urban street vendors',
      'Kisan Credit Card (KCC) — Revolving credit for agriculture & allied activities',
      'PMEGP (Prime Minister\'s Employment Generation Programme)',
      'NHB Schemes — Affordable housing loans with interest subvention',
    ],
    note: 'Eligibility varies by scheme | Growth Harbour assists with complete documentation & government portal registration'
  }
]

function ServicesPage() {
  return (
    <Page>
      <PageBanner
        title="Our Services"
        subtitle="End-to-end loan facilitation across 5 categories — from business funding and government-sponsored schemes to secured, unsecured, and emergency credit."
      />
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="section-inner">
          <div className="section-header center">
            <div className="section-tag">What We Offer</div>
            <h2 className="section-title">Comprehensive Loan Solutions <span>Under One Roof</span></h2>
            <p className="section-subtitle">
              We collaborate with 15+ banks and NBFCs — including HDFC Bank, Axis Bank, SBI, Bajaj Finserv, Canara Bank, and Kotak Mahindra — to ensure every client receives a tailored, competitively priced loan product.
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
                  <Link to="/contact" className="btn-primary" style={{ marginTop: 20, display: 'inline-block' }}>Enquire About This Loan</Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bank partners */}
          <div className="banks-section">
            <p className="banks-label">Our Lending Partners</p>
            <div className="banks-grid">
              {['HDFC Bank','Axis Bank','SBI','Bajaj Finserv','Canara Bank','ICICI Bank','Kotak Mahindra','Bandhan Bank','Bank of Baroda','Union Bank of India','PNB','IDFC First Bank'].map(b => (
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
    { icon: '🤝', title: 'Client First', desc: 'Every decision we make is guided by one question: is this in our client\'s best interest? Your success and satisfaction are the true measure of our performance.' },
    { icon: '🔍', title: 'Transparency', desc: 'We believe financial clarity is a right, not a privilege. Every charge, term, and condition is explained in plain language before you sign anything.' },
    { icon: '⚡', title: 'Speed & Efficiency', desc: 'Time is money. Our streamlined processes and lender relationships ensure we move as fast as possible without compromising accuracy or compliance.' },
    { icon: '🌱', title: 'Long-Term Partnership', desc: 'We are not a one-time service. We aim to be your financial partner for life — from your first business loan to your child\'s education fund and beyond.' },
  ]

  const milestones = [
    { year: '2025', event: 'Growth Harbour Private Limited incorporated in New Delhi with a founding team of 10 directors.' },
    { year: '2025', event: 'Empanelled with 15+ leading banks and NBFCs across India.' },
    { year: '2025', event: 'Launched Government Scheme Advisory wing — dedicated MUDRA and CGTMSE facilitation.' },
    { year: '2026', event: 'Expanded team to 70+ financial advisors and relationship managers across Delhi NCR.' },
  ]

  return (
    <Page>
      <PageBanner
        title="About Us"
        subtitle="Growth Harbour Private Limited — dedicated financial partners committed to making credit accessible, transparent, and affordable for every Indian."
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
              <h2 className="section-title">Built to Bridge the Gap Between <span>Ambition & Capital</span></h2>
              <p className="about-para">
                Growth Harbour Private Limited was incorporated with a single, unwavering purpose: to make financial empowerment accessible to every Indian — from the first-time entrepreneur in a tier-2 city to a growing enterprise in the metro. We understood that in India, the gap between ambition and capital is often bridged not by luck, but by the right financial partner.
              </p>
              <p className="about-para">
                Founded by a team of 10 seasoned finance professionals — each with deep expertise in banking, lending, and financial advisory — Growth Harbour operates at the intersection of trust, expertise, and innovation. We don't just process loan applications; we become your strategic financial companion, guiding you from the very first enquiry through to the final disbursement.
              </p>
              <p className="about-para">
                Our network spans 15+ leading banks and NBFCs including HDFC Bank, Axis Bank, Bajaj Finserv, SBI, Canara Bank, ICICI Bank, Kotak Mahindra Bank, and more — ensuring that every client receives the most competitive rate possible, matched precisely to their financial profile.
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
              <p>To simplify access to credit and financial services for individuals and businesses across India — enabling sustainable growth through transparent, affordable, and personalized loan solutions that truly fit each client's unique needs and goals.</p>
            </div>
            <div className="mv-card vision">
              <div className="mv-icon">🔭</div>
              <h3>Our Vision</h3>
              <p>To become India's most trusted loan consultancy — a company where every client walks out not just with the funding they need, but with financial clarity, confidence, and a clear, well-planned path forward toward their long-term goals.</p>
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
            { num: '15+', desc: 'Banking & NBFC Partners', sub: 'For best-rate matching' },
            { num: '80+', desc: 'Loans Facilitated', sub: 'Across all categories' },
            { num: '70+', desc: 'Financial Advisors', sub: 'Across Delhi NCR' },
            { num: '98%', desc: 'Approval Success Rate', sub: 'Industry-leading precision' }
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
    'Each director is responsible for a specific vertical — covering loan advisory, compliance, operations, client relations, and business development.',
    'Growth Harbour maintains full compliance with MCA (Ministry of Corporate Affairs) regulations and annual ROC filing requirements.',
  ]

  return (
    <Page>
      <PageBanner
        title="Board of Directors"
        subtitle="Meet the founding promoter directors who drive the vision, governance, and growth of Growth Harbour Private Limited."
      />

      <section className="section">
        <div className="section-inner">
          {/* Intro */}
          <div className="directors-intro">
            <div className="section-tag">Leadership</div>
            <h2 className="section-title">A Board Built on <span>Expertise & Commitment</span></h2>
            <p className="about-para" style={{ maxWidth: 720 }}>
              Growth Harbour Private Limited is led by a diverse and experienced board of 10 Promoter Directors, each bringing a unique perspective from banking, finance, operations, and entrepreneurship. Together, they ensure the company remains client-focused, compliant, and consistently delivers on its promise of transparent, efficient loan facilitation.
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
    quote: 'I approached Growth Harbour for a business loan to expand my electronics store in Karol Bagh. Within 4 working days, I had a term loan of ₹25 Lakh sanctioned from Axis Bank at a rate I couldn\'t have negotiated myself. The relationship manager handled every document and followed up with the bank on my behalf. Truly exceptional service.',
    avatar: '👨‍💼',
    name: 'Ramesh Gupta',
    title: 'Owner, Gupta Electronics, Delhi',
    loan: 'Business Loan — ₹25 Lakh'
  },
  {
    stars: 5,
    quote: 'We are a small tailoring unit and had no idea about MUDRA loans. Growth Harbour not only explained the entire PM MUDRA Yojana scheme but also helped us with registration on the Udyam portal and got us a Kishore loan of ₹4 Lakh with zero collateral. This changed everything for our business.',
    avatar: '👩‍🦱',
    name: 'Sunita Verma',
    title: 'Co-owner, Verma Garments, Rohini',
    loan: 'PM MUDRA Loan — ₹4 Lakh'
  },
  {
    stars: 5,
    quote: 'My father had a cardiac emergency and the hospital required an advance of ₹3 Lakh immediately. I called Growth Harbour at 9 PM and by noon the next day, a personal loan was disbursed directly to the hospital. I cannot put into words how much that swift action meant to my family during such a difficult time.',
    avatar: '👨‍💻',
    name: 'Vikram Singh',
    title: 'Software Engineer, Gurugram',
    loan: 'Emergency Medical Loan — ₹3 Lakh'
  },
  {
    stars: 5,
    quote: 'As a practicing CA, I needed a professional loan to set up my own firm. Growth Harbour got me an unsecured professional loan from Bajaj Finserv at 10.5% p.a. — lower than what my own bank offered. The documentation was minimal and the disbursal was in 48 hours. I would recommend them to every professional.',
    avatar: '👩‍💼',
    name: 'Anjali Desai',
    title: 'Chartered Accountant, South Delhi',
    loan: 'Professional Loan — ₹10 Lakh'
  },
  {
    stars: 5,
    quote: 'I wanted to expand my farm by buying additional equipment but didn\'t know how to apply for a Kisan Credit Card. Growth Harbour guided me through the entire process with the local branch of Canara Bank. My KCC limit of ₹2 Lakh was approved in 10 days. For a farmer like me, this kind of support is invaluable.',
    avatar: '🧑‍🌾',
    name: 'Ravi Kumar',
    title: 'Farmer, Haryana',
    loan: 'Kisan Credit Card — ₹2 Lakh'
  }
]

function TestimonialsPage() {
  return (
    <Page>
      <PageBanner
        title="Client Testimonials"
        subtitle="Real stories from real clients. Discover how Growth Harbour has helped individuals, entrepreneurs, students, and families achieve their financial goals."
      />

      {/* Stats bar */}
      <div className="testi-stats">
        <div className="testi-stat"><span className="ts-num">500+</span><span className="ts-label">Happy Clients</span></div>
        <div className="testi-stat"><span className="ts-num">4.9/5</span><span className="ts-label">Average Rating</span></div>
        <div className="testi-stat"><span className="ts-num">98%</span><span className="ts-label">Would Recommend</span></div>
        <div className="testi-stat"><span className="ts-num">5</span><span className="ts-label">Loan Categories</span></div>
      </div>

      <section className="section testimonials">
        <div className="section-inner">
          <div className="section-header center">
            <div className="section-tag">Client Stories</div>
            <h2 className="section-title">What Our Clients <span>Say About Us</span></h2>
            <p className="section-subtitle">
              These are real experiences shared by our clients — entrepreneurs, students, working professionals, and families — who trusted Growth Harbour with their most important financial decisions.
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
            <p>Talk to a financial advisor today — free consultation, zero obligations, complete confidentiality.</p>
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
  { q: 'How long does it take to get a loan approved?', a: 'Most loan approvals happen within 48–72 working hours for unsecured loans. Secured loans and government-scheme loans may take 5–10 working days depending on documentation and lender verification requirements.' },
  { q: 'Do you charge any fee for your consultancy service?', a: 'Our initial consultation is completely free. We work on a success-fee model — our service charge is a small, transparent percentage of the disbursed loan amount, disclosed upfront before you proceed.' },
  { q: 'What documents are generally required for a loan?', a: 'Typically: Aadhaar & PAN card, last 3 months\' salary slips or 2 years\' ITR (for self-employed), 6 months\' bank statements, address proof, and business registration (for business loans). Your Relationship Manager will provide a precise checklist.' },
  { q: 'Can I apply if I have a low CIBIL score?', a: 'It depends on the loan type. For secured loans, a lower credit score is often acceptable if your collateral is strong. For unsecured loans, we can suggest lenders who accept scores from 600+, or guide you on steps to improve your score quickly.' },
  { q: 'Do you help with government loan schemes like MUDRA?', a: 'Yes — this is one of our specializations. We handle end-to-end support for PM MUDRA Yojana, CGTMSE, Stand-Up India, Startup India Seed Fund, and other government schemes including portal registration and documentation.' },
]

function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null)

  const contactDetails = [
    { icon: '📧', label: 'Email Us', value: 'growthharbor7@gmail.com', sub: 'We respond within 4 business hours' },
    { icon: '📞', label: 'Call Us', value: '+91 98765 43210', sub: 'Mon–Sat, 9am–7pm IST' },
    { icon: '📍', label: 'Our Office', value: 'New Delhi, India', sub: 'Walk-ins welcome by appointment' },
    { icon: '💬', label: 'WhatsApp', value: '+91 98765 43210', sub: 'Quick queries & document sharing' },
  ]

  return (
    <Page>
      <PageBanner
        title="Contact Us"
        subtitle="Reach out to our team for a free, no-obligation consultation. We're here to help you find the right financial solution."
      />

      <section className="section">
        <div className="section-inner">
          <div className="contact-info" style={{ maxWidth: 600, margin: '0 auto' }}>
            <div className="section-tag">Get In Touch</div>
            <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Let's Find the Right <span style={{ color: 'var(--primary)' }}>Loan For You</span></h2>
            <p style={{ color: 'var(--gray-600)', marginBottom: 32, lineHeight: 1.7 }}>
              Whether you're ready to apply or just exploring your options, our advisors are here to give you honest, expert guidance — completely free of charge. Reach out to us through any of the channels below.
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
