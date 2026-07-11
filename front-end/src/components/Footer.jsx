import React from 'react'
import '../styles/Footer.css'

export default function Footer({ setActivePage }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <button className="footer__logo" onClick={() => setActivePage('home')}>
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="#1a4f9c"/>
              <path d="M14 7v14M7 14h14" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span>My<em>Doctor</em></span>
          </button>
          <p>Connecting patients with trusted healthcare professionals. Book fast, get care faster.</p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4>Navigate</h4>
            <ul>
              <li><button onClick={() => setActivePage('home')}>Home</button></li>
              <li><button onClick={() => setActivePage('doctors')}>Find Doctors</button></li>
              <li><button onClick={() => setActivePage('book')}>Book Appointment</button></li>
              <li><button onClick={() => setActivePage('appointments')}>My Appointments</button></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Specialties</h4>
            <ul>
              <li><span>Cardiology</span></li>
              <li><span>Neurology</span></li>
              <li><span>Dentistry</span></li>
              <li><span>Orthopedics</span></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li><span>📞 +94 11 234 5678</span></li>
              <li><span>✉️ hello@mydoctor.lk</span></li>
              <li><span>📍 Colombo 03, Sri Lanka</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>© 2026 MyDoctor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
