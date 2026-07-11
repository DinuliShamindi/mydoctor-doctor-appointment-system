import React, { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Doctors from './components/Doctors.jsx'
import BookAppointment from './components/BookAppointment.jsx'
import MyAppointments from './components/MyAppointments.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [activePage, setActivePage] = useState('home')
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [appointments, setAppointments] = useState([])

  const addAppointment = (appt) => {
    setAppointments(prev => [appt, ...prev])
  }

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Hero setActivePage={setActivePage} />
      case 'doctors':
        return (
          <Doctors
            setActivePage={setActivePage}
            setSelectedDoctor={setSelectedDoctor}
          />
        )
      case 'book':
        return (
          <BookAppointment
            selectedDoctor={selectedDoctor}
            setSelectedDoctor={setSelectedDoctor}
            addAppointment={addAppointment}
          />
        )
      case 'appointments':
        return (
          <MyAppointments
            appointments={appointments}
            setAppointments={setAppointments}
            setActivePage={setActivePage}
          />
        )
      default:
        return <Hero setActivePage={setActivePage} />
    }
  }

  return (
    <div className="app">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="main-content">
        {renderPage()}
      </main>
      <Footer setActivePage={setActivePage} />
    </div>
  )
}
