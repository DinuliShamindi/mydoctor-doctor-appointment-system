import React from 'react'
import HeroImage from '../assets/HeroImage.png'
import '../styles/Hero.css'

const specialties = [
  { icon: '🫀', name: 'Cardiology' },
  { icon: '🧠', name: 'Neurology' },
  { icon: '🦷', name: 'Dentistry' },
  { icon: '👁️', name: 'Ophthalmology' },
  { icon: '🦴', name: 'Orthopedics' },
  { icon: '🩺', name: 'General' },
]

export default function Hero({ setActivePage }) {
  return (
    <div className="home-page">
      
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <h1 className="hero-heading">
              Your health is<br/>
              <em>our priority.</em>
            </h1>
            <p className="hero-desc">
              Book appointments with top-rated specialists near you. Fast, easy, and reliable healthcare at your fingertips.
            </p>

            <div className="hero-btns">
              <button className="btn-primary" onClick={() => setActivePage('book')}>
                Book Appointment
              </button>
              <button className="btn-ghost" onClick={() => setActivePage('doctors')}>
                Browse Doctors
              </button>
            </div>
          </div>

          <div className="hero-image">
            <img src={HeroImage} alt="Doctor" />
          </div>
        </div>
      </section>

      <section className="specialties">
        <div className="container">
          <span className="section-label">What we cover</span>
          <h2 className="section-heading">Browse by Specialty</h2>
          <div className="specialties-grid">
            {specialties.map(s => (
              <button
                key={s.name}
                className="specialty-card"
                onClick={() => setActivePage('doctors')}
              >
                <span className="specialty-card__icon">{s.icon}</span>
                <span className="specialty-card__name">{s.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="how">
        <div className="container">
          <span className="section-label">Simple process</span>
          <h2 className="section-heading">How to book</h2>
          <div className="how-steps">
            {[
              { num: '01', title: 'Find a doctor', desc: 'Search by specialty, name, or location and read verified patient reviews.' },
              { num: '02', title: 'Choose a slot', desc: 'Pick any open time that fits your schedule' },
              { num: '03', title: 'Get care', desc: 'Visit in person or join a video consult. Reminders sent automatically.' },
            ].map(step => (
              <div className="how-step" key={step.num}>
                <span className="how-num">{step.num}</span>
                <h3 className="how-title">{step.title}</h3>
                <p className="how-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-banner">
        <div className="container cta-banner-inner">
          <div>
            <h2 className="cta-banner-heading">Ready to see a doctor?</h2>
            <p className="cta-banner-sub">No queues. No paperwork. Just care.</p>
          </div>
          <button className="btn-primary cta-banner-btn" onClick={() => setActivePage('book')}>
            Book Appointment →
          </button>
        </div>
      </section>
    </div>
  )
}
