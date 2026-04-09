import { useMemo, useState, useEffect } from 'react'
import './App.css'

const services = [
  {
    title: 'Business Websites',
    text: 'Modern, responsive company websites built to create trust, generate inquiries, and convert visitors into real customers.',
    icon: '🏢',
  },
  {
    title: 'E-Commerce & Booking',
    text: 'Online stores, reservation systems, and service booking platforms with smooth user flows and clear calls to action.',
    icon: '🛒',
  },
  {
    title: 'Mobile App Development',
    text: 'Clean, user-friendly Android and cross-platform apps designed for performance, scalability, and long-term growth.',
    icon: '📱',
  },
  {
    title: 'Custom Business Systems',
    text: 'Tailored dashboards, admin panels, ERP, CRM, and workflow systems that help businesses manage operations efficiently.',
    icon: '⚙️',
  },
  {
    title: 'UI/UX Design',
    text: 'Premium interface design, wireframes, landing pages, and product experiences focused on clarity, speed, and brand impact.',
    icon: '🎨',
  },
  {
    title: 'Student & Final Year Projects',
    text: 'Full-stack project support with documentation, presentations, APIs, databases, and polished frontend development.',
    icon: '🎓',
  },
]

const highlights = [
  {
    title: 'Premium Visual Style',
    text: 'Dark modern layouts, smooth animations, bold typography, and interfaces that feel high-end from the first screen.',
    icon: '✨',
  },
  {
    title: 'Fast & Responsive',
    text: 'Every page is optimized for mobile, tablet, and desktop so your brand looks polished on every device.',
    icon: '⚡',
  },
  {
    title: 'Built for Conversion',
    text: 'We structure content, buttons, and sections so the website is not only beautiful, but also useful for business growth.',
    icon: '📈',
  },
]

const processSteps = [
  {
    title: '01. Discover',
    text: 'We understand your business, goals, audience, and what makes your brand different.',
  },
  {
    title: '02. Design',
    text: 'We create a strong visual direction with modern UI, better hierarchy, and premium page flow.',
  },
  {
    title: '03. Develop',
    text: 'We build a clean frontend and reliable backend with real functionality, not just static visuals.',
  },
  {
    title: '04. Launch',
    text: 'We test, refine, and deliver a production-ready solution that feels smooth and professional.',
  },
]

const footerLinks = {
  services: ['Business Websites', 'E-Commerce & Booking', 'Mobile App Development', 'Custom Business Systems', 'UI/UX Design', 'Student Projects'],
  company: ['About Us', 'Portfolio', 'Blog', 'Careers', 'Testimonials'],
  
}

const footerTech = ['React', 'Java', 'Spring Boot', 'PHP', 'Flutter', 'UI/UX', 'Node.js', 'Python']
const whatsappLink = 'https://wa.me/94789534242'
const socialLinks = {
  facebook: 'https://facebook.com/lankax',
  twitter: 'https://twitter.com/lankax',
  linkedin: 'https://linkedin.com/company/lankax',
  instagram: 'https://instagram.com/lankax',
}

function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ loading: false, message: '', error: false })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const apiBase = useMemo(
    () => import.meta.env.VITE_API_BASE_URL || 'http://localhost:8082',
    [],
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ loading: true, message: '', error: false })

    try {
      const response = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Failed to submit your request.')
      }

      const data = await response.json()
      setStatus({ loading: false, message: data.message, error: false })
      setForm({ name: '', email: '', message: '' })
    } catch (error) {
      setStatus({
        loading: false,
        message: 'Could not send your request right now. Please try again.',
        error: true,
      })
    }
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="site-shell">
      {/* Navigation Bar */}
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-logo" onClick={() => scrollToSection('home')}>
            <img src="/lankax-logo.jpeg" alt="LankaX Logo" className="navbar-logo-img" />
            <div className="navbar-brand">
              <span className="navbar-brand-main">Lanka</span>
              <span className="navbar-brand-x">X</span>
              <span className="footer-brand-solution">SOLUTIONS</span>
            </div>
          </div>

          <button 
            className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
            <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
            <button onClick={() => scrollToSection('services')} className="nav-link">Services</button>
            <button onClick={() => scrollToSection('why-us')} className="nav-link">Why Us</button>
            <button onClick={() => scrollToSection('process')} className="nav-link">Process</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link nav-cta">Contact</button>
          </div>
        </div>
      </nav>

    

      <section className="hero">
        <div className="hero-copy">
          <span className="badge">Modern UI • Premium Motion • Real Business Value</span>

          <h1>
            We Design & Build
            <br />
            <span>Digital Experiences</span>
          </h1>

          <p>
            LankaX helps businesses, startups, and students launch modern websites,
            applications, and systems with clean UI, smooth animations, and strong
            functionality. We focus on visuals that attract and structure that converts.
          </p>

          <div className="actions">
            <a className="btn btn-solid" href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
              Start Your Project
            </a>
            <a className="btn btn-outline" href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>
              View Services
            </a>
          </div>
        </div>

        <aside className="hero-panel">
          <h3>What You Get</h3>
          <ul>
            <li>Premium modern interface design</li>
            <li>Responsive pages for every device</li>
            <li>Smooth interactions and animations</li>
            <li>Strong contact and lead-generation flow</li>
            <li>Scalable frontend and backend development</li>
          </ul>
          <p>
            Websites • Booking Systems • Admin Panels • Student Projects • UI/UX •
            Mobile Apps
          </p>
        </aside>
      </section>

      <section className="services" id="services">
        <div className="section-head">
          <h2>What We Build</h2>
          <p>
            From brand websites to custom systems, every project is designed to look
            polished, feel fast, and support real business goals.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services" id="why-us">
        <div className="section-head">
          <h2>Why Clients Choose LankaX</h2>
          <p>
            We combine design quality, technical delivery, and practical thinking so the
            final product feels modern and works in the real world.
          </p>
        </div>

        <div className="service-grid">
          {highlights.map((item) => (
            <article key={item.title} className="service-card highlight-card">
              <div className="service-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="feature">
        <div>
          <h2>Need a website that actually feels premium?</h2>
          <p>
            A modern website is more than colors and animation. It needs strong content,
            smart section flow, clear calls to action, and a polished experience that
            builds trust instantly.
          </p>
        </div>
        <a
          className="btn btn-solid"
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
        >
          Chat on WhatsApp
        </a>
      </section>

      <section className="services" id="process">
        <div className="section-head">
          <h2>How We Work</h2>
          <p>
            A simple process that keeps the project clear, collaborative, and focused on
            results from day one.
          </p>
        </div>

        <div className="process-grid">
          {processSteps.map((step) => (
            <article key={step.title} className="process-card">
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-left">
          <h2>Let&apos;s Build Something Strong</h2>

          <div className="contact-info-item">
            <span className="contact-icon-large">✉</span>
            <a href="mailto:Lankax.solution@gmail.com">Lankax.solution@gmail.com</a>
          </div>

          <div className="contact-info-item">
            <span className="contact-icon-large">☎</span>
            <a href="tel:+94789534242">+94 78 953 4242</a>
          </div>

          <div className="contact-info-item">
            <span className="contact-icon-large contact-icon-web">🌐</span>
            <a href="https://www.lankaxsolution.com" target="_blank" rel="noreferrer">
              www.lankaxsolution.com
            </a>
          </div>

          <div className="contact-info-item">
            <span className="contact-icon-large contact-icon-pin" aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span>Colombo / Remote — Available for Sri Lanka and international clients</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Request a Quote</h3>
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            rows="4"
            name="message"
            placeholder="Tell us what you need: website, system, app, redesign, or final year project"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-solid" disabled={status.loading}>
            {status.loading ? 'Sending...' : 'Send Message'}
          </button>
          {status.message && (
            <p className={status.error ? 'status error' : 'status'}>{status.message}</p>
          )}
        </form>
      </section>

      {/* Enhanced Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-brand">
              <img src="/lankax-logo.jpeg" alt="LankaX Logo" className="footer-logo" />
              <div>
                <span className="footer-brand-text">Lanka</span>
                <span className="footer-brand-x">X</span>
                <span className="footer-brand-solution">SOLUTION</span>
              </div>
            </div>
            <p className="footer-description">
              Creating premium digital experiences that combine stunning design, 
              smooth performance, and real business value.
            </p>
            <div className="footer-social">
              <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
              </a>
              <a href={socialLinks.twitter} target="_blank" rel="noreferrer" className="social-icon" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.52 8.52 0 0 1-5.33 1.84q-.51 0-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54c.48-.74 1.34-1.8 3.26-1.8 2.38 0 4.17 1.56 4.17 4.89v6.21z"/>
                </svg>
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="social-icon" aria-label="Instagram">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path fill="currentColor" d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.06 1.8.25 2.22.41.56.22.95.48 1.36.89.41.41.67.8.89 1.36.16.42.35 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.06 1.17-.25 1.8-.41 2.22-.22.56-.48.95-.89 1.36-.41.41-.8.67-1.36.89-.42.16-1.05.35-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.06-1.8-.25-2.22-.41-.56-.22-.95-.48-1.36-.89-.41-.41-.67-.8-.89-1.36-.16-.42-.35-1.05-.41-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.06-1.17.25-1.8.41-2.22.22-.56.48-.95.89-1.36.41-.41.8-.67 1.36-.89.42-.16 1.05-.35 2.22-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.75.12 4.85.31 4.05.61c-.87.33-1.61.77-2.35 1.5S.94 3.18.61 4.05c-.3.8-.49 1.7-.54 3-.06 1.28-.07 1.69-.07 4.95s.01 3.67.07 4.95c.05 1.3.24 2.2.54 3 .33.87.77 1.61 1.5 2.35.74.74 1.48 1.17 2.35 1.5.8.3 1.7.49 3 .54 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.3-.05 2.2-.24 3-.54.87-.33 1.61-.77 2.35-1.5.74-.74 1.17-1.48 1.5-2.35.3-.8.49-1.7.54-3 .06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.05-1.3-.24-2.2-.54-3-.33-.87-.77-1.61-1.5-2.35-.74-.74-1.48-1.17-2.35-1.5-.8-.3-1.7-.49-3-.54C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.41a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              {footerLinks.services.map((service) => (
                <li key={service}>
                  <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul className="footer-links">
              {footerLinks.company.map((item) => (
                <li key={item}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} LankaX Solution. All rights reserved.</p>
            <div className="footer-tech-row" aria-label="LankaX technologies">
              {footerTech.map((tech) => (
                <span key={tech} className="footer-tech-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App