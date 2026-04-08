import { useMemo, useState } from 'react'

const services = [
  {
    title: 'Websites',
    text: 'Business, e-commerce, and portfolio websites that are responsive, SEO-ready, and fast.',
  },
  {
    title: 'Mobile Apps',
    text: 'Cross-platform apps with polished UI and reliable backend integration.',
  },
  {
    title: 'University Projects',
    text: 'Assignments and final-year support with clean code and strong documentation.',
  },
  {
    title: 'UI/UX Design',
    text: 'Research-backed interfaces, wireframes, and production-ready designs.',
  },
  {
    title: 'Custom Software',
    text: 'Tailored ERP, CRM, and business systems built for scale and security.',
  },
  {
    title: 'System Development',
    text: 'Java, PHP, Flutter, Python, React, and Node.js solutions for modern teams.',
  },
]

const footerTech = ['Java', 'PHP', 'Flutter', 'Python', 'UI/UX']

function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ loading: false, message: '', error: false })

  const apiBase = useMemo(
    () => import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    [],
  )

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

  return (
    <div className="site-shell">
      <header className="top-bar">
        <div className="corner-logo-wrap">
          <img src="/lankax-logo.jpeg" alt="LankaX Logo" className="corner-logo" />
        </div>
        <div className="header-brand-block">
          <h2 className="header-brand-title" aria-label="LankaX Solution">
            <span className="header-brand-wordmark">
              <span className="header-brand-main">Lanka</span>
              <span className="header-brand-x">X</span>
            </span>
            <span className="header-brand-solution">SOLUTION</span>
          </h2>
          <p className="header-brand-tagline">Future.Powered by LankaX</p>
          <div className="header-contact-lines">
            <a className="header-contact-item" href="mailto:Lankax.solution@gmail.com">
              <span aria-hidden="true" className="contact-icon">✉</span>
              <span>Lankax.solution@gmail.com</span>
            </a>
            <a className="header-contact-item" href="tel:0789534242">
              <span aria-hidden="true" className="contact-icon">✆</span>
              <span>0789534242</span>
            </a>
          </div>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <span className="badge">Innovation Meets Excellence</span>
          <h1>
            Build Your
            <br />
            <span>Digital Future</span>
          </h1>
          <p>
            Next-gen websites, mobile apps, university projects, and custom systems.
            We turn ideas into high-impact digital experiences.
          </p>
          <div className="actions">
            <a className="btn btn-solid" href="#contact">
              Start Your Project
            </a>
            <a className="btn btn-outline" href="#services">
              Explore Services
            </a>
          </div>
        </div>

        <aside className="hero-panel">
          <h3>Core Solutions</h3>
          <ul>
            <li>Websites</li>
            <li>Mobile Apps</li>
            <li>University Assignments</li>
            <li>UI/UX Design</li>
            <li>Final Year Projects</li>
          </ul>
          <p>Java • PHP • Flutter • Python • React • Node.js</p>
        </aside>
      </section>

      <section className="services" id="services">
        <div className="section-head">
          <h2>What We Deliver</h2>
          <p>End-to-end digital solutions crafted for modern challenges.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article key={service.title} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="feature">
        <div>
          <h2>University Assignments and Final Year Projects</h2>
          <p>
            Get expert support in Java, PHP, Flutter, AI, and web app development with
            quality documentation and on-time delivery.
          </p>
        </div>
        <a className="btn btn-solid" href="#contact">
          Get Help Now
        </a>
      </section>

      <section className="contact" id="contact">
        <div className="contact-left">
          <h2>Let&apos;s Talk</h2>
          <div className="contact-info-item">
            <span className="contact-icon-large">✉</span>
            <a href="mailto:Lankax.solution@gmail.com">Lankax.solution@gmail.com</a>
          </div>
          <div className="contact-info-item">
            <span className="contact-icon-large">☎</span>
            <a href="tel:0789534242">0789534242</a>
          </div>
          <div className="contact-info-item">
            <span className="contact-icon-large contact-icon-web">🌐</span>
            <a href="https://www.lankaxsolution.com" target="_blank" rel="noopener noreferrer">www.lankaxsolution.com</a>
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
            <span>Colombo / Remote — Worldwide support</span>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Request a Quote</h3>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            rows="4"
            name="message"
            placeholder="Tell us about your project"
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

      <footer>
        <div className="footer-brand">
          <span className="footer-brand-text">Lanka</span>
          <span className="footer-brand-x">X</span>
          <span className="footer-brand-solution">SOLUTION</span>
        </div>
        <p className="footer-year">2025 — Future.Powered by Lanka X</p>
        <p className="footer-services">
          Websites · Mobile Apps · University Projects · Custom Systems · UI/UX Design
        </p>
        <div className="footer-tech-row" aria-label="LankaX technologies">
          {footerTech.map((tech) => (
            <span key={tech} className="footer-tech-pill">
              {tech}
            </span>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default App
