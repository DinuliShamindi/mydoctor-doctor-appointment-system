import React, { useState, useEffect } from 'react'
import './BookAppointment.css'

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
]

const initialForm = {
  patientName: '',
  phone: '',
  email: '',
  doctorId: '',
  date: '',
  time: '',
  type: 'in-person',
  reason: '',
}

export default function BookAppointment({ selectedDoctor, setSelectedDoctor, addAppointment }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [bookedRef, setBookedRef] = useState('')

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/doctors")
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, []);

  // Pre-fill if a doctor was selected from the Doctors page
  useEffect(() => {
    if (selectedDoctor) {
      setForm(f => ({ ...f, doctorId: String(selectedDoctor.id) }))
    }
  }, [selectedDoctor])

  const today = new Date().toISOString().split('T')[0]

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.patientName.trim()) e.patientName = 'Full name is required'
    if (!form.phone.trim()) e.phone = 'Phone number is required'
    else if (!/^\d{9,10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid phone number'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.doctorId) e.doctorId = 'Please select a doctor'
    if (!form.date) e.date = 'Please select a date'
    if (!form.time) e.time = 'Please select a time slot'
    return e
  }

  const handleSubmit = async () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    const doctor = doctors.find(d => d.id === Number(form.doctorId))
    const ref = 'MB' + Math.random().toString(36).substring(2, 8).toUpperCase()

    const appointment = {
      reference: ref,
      doctor_id: Number(form.doctorId),
      patient_name: form.patientName,
      patient_phone: form.phone,
      patient_email: form.email,
      appointment_date: form.date,
      appointment_time: form.time,
      appointment_type: form.type,
      reason: form.reason
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/appointments',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(appointment)
        }
      )

      const data = await response.json()

      console.log("Saved appointment:", data)

      addAppointment(data)
      setBookedRef(ref)
      setSubmitted(true)
      setSelectedDoctor(null)
    
    } catch(error) {
      console.log("Error saving appointment:", error)
  }}



  const handleReset = () => {
    setForm(initialForm)
    setErrors({})
    setSubmitted(false)
    setBookedRef('')
  }

  const chosenDoctor = doctors.find(d => d.id === Number(form.doctorId))

  if (submitted) {
    return (
      <div className="page-fade book-page">
        <div className="container">
          <div className="book-success">
            <div className="book-success__icon">✅</div>
            <h2 className="book-success__heading">Appointment Confirmed!</h2>
            <p className="book-success__ref">Reference: <strong>{bookedRef}</strong></p>
            <div className="book-success__details">
              <div className="book-success__row">
                <span>Doctor</span>
                <strong>{chosenDoctor?.name}</strong>
              </div>
              <div className="book-success__row">
                <span>Date</span>
                <strong>{new Date(form.date + 'T12:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</strong>
              </div>
              <div className="book-success__row">
                <span>Time</span>
                <strong>{form.time}</strong>
              </div>
              <div className="book-success__row">
                <span>Type</span>
                <strong>{form.type === 'in-person' ? '🏥 In-Person Visit' : '📹 Video Consult'}</strong>
              </div>
            </div>
            <p className="book-success__note">A confirmation will be sent to <strong>{form.email}</strong></p>
            <button className="btn-primary" onClick={handleReset}>Book Another Appointment</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-fade book-page">
      <div className="container">
        <span className="section-label">Schedule a visit</span>
        <h1 className="section-heading">Book Appointment</h1>

        <div className="book-layout">
          {/* Form */}
          <div className="book-form-card">
            {/* Patient Info */}
            <fieldset className="book-section">
              <legend className="book-section__title">Patient Information</legend>
              <div className="book-row">
                <div className={`book-field ${errors.patientName ? 'error' : ''}`}>
                  <label>Full Name *</label>
                  <input name="patientName" value={form.patientName} onChange={handleChange} placeholder="Your full name" />
                  {errors.patientName && <span className="book-field__error">{errors.patientName}</span>}
                </div>
              </div>
              <div className="book-row book-row--2">
                <div className={`book-field ${errors.phone ? 'error' : ''}`}>
                  <label>Phone *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="07X XXX XXXX" />
                  {errors.phone && <span className="book-field__error">{errors.phone}</span>}
                </div>
                <div className={`book-field ${errors.email ? 'error' : ''}`}>
                  <label>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" />
                  {errors.email && <span className="book-field__error">{errors.email}</span>}
                </div>
              </div>
            </fieldset>

            {/* Doctor & Schedule */}
            <fieldset className="book-section">
              <legend className="book-section__title">Doctor & Schedule</legend>

              <div className={`book-field ${errors.doctorId ? 'error' : ''}`}>
                <label>Select Doctor *</label>
                <select name="doctorId" value={form.doctorId} onChange={handleChange}>
                  <option value="">— Choose a doctor —</option>
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.specialty}
                    </option>
                  ))}
                </select>
                {errors.doctorId && <span className="book-field__error">{errors.doctorId}</span>}
              </div>

              <div className="book-row book-row--2">
                <div className={`book-field ${errors.date ? 'error' : ''}`}>
                  <label>Date *</label>
                  <input name="date" type="date" value={form.date} onChange={handleChange} min={today} />
                  {errors.date && <span className="book-field__error">{errors.date}</span>}
                </div>
                <div className="book-field">
                  <label>Appointment Type</label>
                  <div className="type-toggle">
                    <button
                      type="button"
                      className={form.type === 'in-person' ? 'active' : ''}
                      onClick={() => setForm(f => ({ ...f, type: 'in-person' }))}
                    >🏥 In-Person</button>
                    <button
                      type="button"
                      className={form.type === 'video' ? 'active' : ''}
                      onClick={() => setForm(f => ({ ...f, type: 'video' }))}
                    >📹 Video</button>
                  </div>
                </div>
              </div>

              {/* Time slots */}
              <div className={`book-field ${errors.time ? 'error' : ''}`}>
                <label>Time Slot *</label>
                <div className="time-slots">
                  {timeSlots.map(slot => (
                    <button
                      key={slot}
                      type="button"
                      className={`time-slot ${form.time === slot ? 'selected' : ''}`}
                      onClick={() => { setForm(f => ({ ...f, time: slot })); setErrors(e => ({ ...e, time: '' })) }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
                {errors.time && <span className="book-field__error">{errors.time}</span>}
              </div>

              <div className="book-field">
                <label>Reason for Visit <span className="book-field__opt">(optional)</span></label>
                <textarea name="reason" value={form.reason} onChange={handleChange} placeholder="Brief description of your symptoms or reason..." rows="3" />
              </div>
            </fieldset>

            <button className="btn-primary book-submit" onClick={handleSubmit}>
              Confirm Appointment →
            </button>
          </div>

          {/* Summary sidebar */}
          <div className="book-summary">
            <h3 className="book-summary__title">Appointment Summary</h3>
            {chosenDoctor ? (
              <div className="book-summary__doctor">
                <svg width="48" height="48" viewBox="0 0 56 56" fill="none">
                  <circle cx="28" cy="28" r="28" fill={chosenDoctor.gender === 'Female' ? '#fce7f3' : '#dce8fb'}/>
                  <circle cx="28" cy="20" r="9" fill={chosenDoctor.gender === 'Female' ? '#be185d' : '#1a4f9c'}/>
                  <path d="M9 49c0-10.5 8.5-18 19-18s19 7.5 19 18" fill={chosenDoctor.gender === 'Female' ? '#be185d' : '#1a4f9c'}/>
                </svg>
                <div>
                  <p className="book-summary__doc-name">{chosenDoctor.name}</p>
                  <p className="book-summary__doc-spec">{chosenDoctor.specialty}</p>
                  <p className="book-summary__doc-fee">Consultation: Rs. {chosenDoctor.fee.toLocaleString()}</p>
                </div>
              </div>
            ) : (
              <p className="book-summary__placeholder">Select a doctor to see details.</p>
            )}

            <div className="book-summary__rows">
              <div className="book-summary__row">
                <span>Date</span>
                <strong>{form.date ? new Date(form.date + 'T12:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</strong>
              </div>
              <div className="book-summary__row">
                <span>Time</span>
                <strong>{form.time || '—'}</strong>
              </div>
              <div className="book-summary__row">
                <span>Type</span>
                <strong>{form.type === 'in-person' ? '🏥 In-Person' : '📹 Video'}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
