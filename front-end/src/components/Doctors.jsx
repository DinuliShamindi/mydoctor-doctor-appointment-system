import React, { useState, useMemo, useEffect } from 'react'
import '../styles/Doctors.css'

const specialties = ['All', 'Cardiology', 'Neurology', 'Dentistry', 'Orthopedics', 'Ophthalmology', 'General']

function StarRating({ rating }) {
  return (
    <span className="star-rating">
      {'★'.repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? '½' : ''}
      <em>{rating.toFixed(1)}</em>
    </span>
  )
}

export default function Doctors({ setActivePage, setSelectedDoctor }) {
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('All')
  const [availableOnly, setAvailableOnly] = useState(false)

  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/doctors')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setDoctors(data);
      });
  }, []);


  const filtered = useMemo(() => {
    return doctors.filter(d => {
      const matchName = d.name.toLowerCase().includes(search.toLowerCase())
      const matchSpec = specialty === 'All' || d.specialty === specialty
      const matchAvail = !availableOnly || d.available
      return matchName && matchSpec && matchAvail
    })
  }, [doctors, search, specialty, availableOnly])

  const handleBook = (doctor) => {
    setSelectedDoctor(doctor)
    setActivePage('book')
  }

  return (
    <div className="page-fade doctors-page">
      <div className="container">
        <div className="doctors-page__header">
          <span className="section-label">Our specialists</span>
          <h1 className="section-heading">Find Your Doctor</h1>
          <p className="doctors-page__sub">Browse our network of verified, top-rated specialists.</p>
        </div>

        {/* Filters */}
        <div className="doctors-filters">
          <div className="doctors-search">
            <svg className="doctors-search__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="doctors-search__input"
            />
          </div>

          <div className="specialty-pills">
            {specialties.map(s => (
              <button
                key={s}
                className={`specialty-pill ${specialty === s ? 'active' : ''}`}
                onClick={() => setSpecialty(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <label className="avail-toggle">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={e => setAvailableOnly(e.target.checked)}
            />
            <span className="avail-toggle__track"/>
            Available today only
          </label>
        </div>

        {/* Count */}
        <p className="doctors-count">{filtered.length} doctor{filtered.length !== 1 ? 's' : ''} found</p>

        {/* Grid */}
        <div className="doctors-grid">
          {filtered.length === 0 ? (
            <div className="doctors-empty">
              <p>No doctors match your filters. Try adjusting your search.</p>
            </div>
          ) : (
            filtered.map(doc => (
              <div className="doctor-card" key={doc.id}>
                <div className="doctor-card__top">
                  <div className="doctor-card__avatar">
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                      <circle cx="28" cy="28" r="28" fill={doc.gender === 'Female' ? '#fce7f3' : '#dce8fb'}/>
                      <circle cx="28" cy="20" r="9" fill={doc.gender === 'Female' ? '#be185d' : '#1a4f9c'}/>
                      <path d="M9 49c0-10.5 8.5-18 19-18s19 7.5 19 18" fill={doc.gender === 'Female' ? '#be185d' : '#1a4f9c'}/>
                    </svg>
                  </div>
                  <div className="doctor-card__info">
                    <h3 className="doctor-card__name">{doc.name}</h3>
                    <p className="doctor-card__spec">{doc.specialty}</p>
                    <p className="doctor-card__loc">📍 {doc.location}</p>
                  </div>
                  <span className={`doctor-card__badge ${doc.available ? 'available' : 'unavailable'}`}>
                    {doc.available ? 'Available' : 'Busy'}
                  </span>
                </div>

                <div className="doctor-card__meta">
                  <div className="doctor-card__meta-item">
                    <StarRating rating={doc.rating} />
                    <span className="doctor-card__reviews">({doc.reviews})</span>
                  </div>
                  <div className="doctor-card__meta-item">
                    <span className="doctor-card__meta-label">Experience</span>
                    <span className="doctor-card__meta-value">{doc.experience}</span>
                  </div>
                  <div className="doctor-card__meta-item">
                    <span className="doctor-card__meta-label">Fee</span>
                    <span className="doctor-card__meta-value">Rs. {doc.fee.toLocaleString()}</span>
                  </div>
                </div>

                <div className="doctor-card__footer">
                  <span className="doctor-card__next">
                    🕐 Next: {doc.nextSlot}
                  </span>
                  <button className="btn-primary doctor-card__btn" onClick={() => handleBook(doc)}>
                    Book
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
