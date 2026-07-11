import React, { useState, useEffect } from 'react'
import './MyAppointments.css'

const statusColors = {
  Confirmed: { bg: '#d1fae5', color: '#065f46' },
  Pending: { bg: '#fef3c7', color: '#92400e' },
  Cancelled: { bg: '#fee2e2', color: '#991b1b' },
  Completed: { bg: '#e0e7ff', color: '#3730a3' },
}

export default function MyAppointments({ appointments, setAppointments, setActivePage }) {
  const [cancelling, setCancelling] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5000/api/appointments')
      .then(res => res.json())
      .then(data => {
        setAppointments(data)
      })
      .catch(error => {
        console.log(error)
    })
}, [])

  const handleCancel = async (id) => {

  try {

    const response = await fetch(
      `http://localhost:5000/api/appointments/${id}`,
      {
        method: 'PUT'
      }
    );


    const updatedAppointment = await response.json();


    setAppointments(prev =>
      prev.map(a =>
        a.id === id
          ? { ...a, status: updatedAppointment.status }
          : a
      )
    );


    setCancelling(null);


  } catch(error) {

    console.log("Cancel error:", error);

  }

}

  if (appointments.length === 0) {
    return (
      <div className="page-fade appt-page">
        <div className="container">
          <span className="section-label">Your schedule</span>
          <h1 className="section-heading">My Appointments</h1>
          <div className="appt-empty">
            <div className="appt-empty__icon">📅</div>
            <h3>No appointments yet</h3>
            <p>You haven't booked any appointments. Book one now and it'll appear here.</p>
            <button className="btn-primary" onClick={() => setActivePage('book')}>
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-fade appt-page">
      <div className="container">
        <span className="section-label">Your schedule</span>
        <h1 className="section-heading">My Appointments</h1>
        <p className="appt-count">{appointments.length} appointment{appointments.length !== 1 ? 's' : ''} total</p>

        <div className="appt-list">
          {appointments.map(appt => {
            const s = statusColors[appt.status] || statusColors.Confirmed
            return (
              <div className="appt-card" key={appt.id}>
                <div className="appt-card__left">
                  <div className="appt-card__date-block">
                    <span className="appt-card__day">
                      {new Date(appt.date + 'T12:00').toLocaleDateString('en-GB', { day: 'numeric' })}
                    </span>
                    <span className="appt-card__month">
                      {new Date(appt.date + 'T12:00').toLocaleDateString('en-GB', { month: 'short' })}
                    </span>
                    <span className="appt-card__year">
                      {new Date(appt.date + 'T12:00').getFullYear()}
                    </span>
                  </div>
                </div>

                <div className="appt-card__body">
                  <div className="appt-card__top-row">
                    <div>
                      <p className="appt-card__doctor">{appt.doctor?.name}</p>
                      <p className="appt-card__spec">{appt.doctor?.specialty} · {appt.doctor?.location}</p>
                    </div>
                    <span
                      className="appt-card__status"
                      style={{ background: s.bg, color: s.color }}
                    >
                      {appt.status}
                    </span>
                  </div>

                  <div className="appt-card__meta">
                    <span>🕐 {appt.time}</span>
                    <span>{appt.type === 'in-person' ? '🏥 In-Person' : '📹 Video'}</span>
                    <span>Ref: <strong>{appt.ref}</strong></span>
                    {appt.reason && <span>💬 {appt.reason}</span>}
                  </div>
                </div>

                {appt.status === 'Confirmed' && (
                  <div className="appt-card__actions">
                    {cancelling === appt.id ? (
                      <div className="appt-confirm-cancel">
                        <p>Cancel this appointment?</p>
                        <div className="appt-confirm-cancel__btns">
                          <button className="btn-ghost appt-btn-sm" onClick={() => setCancelling(null)}>Keep</button>
                          <button className="appt-btn-cancel appt-btn-sm" onClick={() => handleCancel(appt.id)}>Yes, Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button className="appt-cancel-btn" onClick={() => setCancelling(appt.id)}>
                        Cancel
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="appt-footer">
          <button className="btn-primary" onClick={() => setActivePage('book')}>
            + Book New Appointment
          </button>
        </div>
      </div>
    </div>
  )
}
