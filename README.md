# 🩺 MyDoctor – Doctor Appointment Booking System

MyDoctor is a full-stack doctor appointment booking application that allows users to browse doctors, schedule appointments, view their bookings, and manage appointment status. The project was built to strengthen my full-stack development skills using React, Node.js, Express, and PostgreSQL.

---

## 🚀 Features

* View available doctors
* Fetch doctor information from PostgreSQL
* Book appointments through a user-friendly interface
* Store appointments permanently in PostgreSQL
* View booked appointments
* Cancel appointments (updates database status)
* Form validation for appointment booking
* Responsive and modern UI

---

## 🛠️ Tech Stack

### Frontend

* React
* JavaScript (ES6+)
* CSS3
* Fetch API

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

---

## 📂 Project Structure

```
myDoctor/
│
├── frontend/
│   ├── src/
│   ├── components/
│   └── assets/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   └── package.json
│
└── README.md
```

---

## 🗄️ Database

The project uses PostgreSQL to store:

* Doctor information
* Appointment details
* Appointment status

The backend communicates with the database using SQL queries and connection pooling.

---

## 📌 Main Functionality

### Doctors

* Retrieve doctor information from PostgreSQL
* Display specialties, ratings, locations, consultation fees, and availability

### Appointment Booking

* Select a doctor
* Choose a date and time
* Enter patient information
* Save appointment to PostgreSQL

### My Appointments

* Retrieve appointments from the database
* Display appointment details
* Cancel appointments by updating the database status

---

## 🔄 REST API

### Doctors

| Method | Endpoint     | Description          |
| ------ | ------------ | -------------------- |
| GET    | /api/doctors | Retrieve all doctors |

### Appointments

| Method | Endpoint              | Description               |
| ------ | --------------------- | ------------------------- |
| GET    | /api/appointments     | Retrieve all appointments |
| POST   | /api/appointments     | Create a new appointment  |
| PUT    | /api/appointments/:id | Cancel an appointment     |

---

## 📷 Screenshots

Add screenshots here:

* Home Page
* Doctors Page
* Book Appointment
* My Appointments
* PostgreSQL Database

---

## 💻 Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/MyDoctor.git
```

### Install frontend dependencies

```bash
npm install
```

### Install backend dependencies

```bash
npm install
```

### Configure PostgreSQL

Create a PostgreSQL database and update the database credentials in:

```
backend/db.js
```

### Start backend

```bash
node server.js
```

### Start frontend

```bash
npm run dev
```

---

## 🎯 Learning Outcomes

This project helped me gain hands-on experience with:

* Building RESTful APIs
* Connecting React with Express
* PostgreSQL database design
* SQL CRUD operations
* JOIN queries
* API integration
* Full-stack application architecture

---

## 📄 License

This project was developed as a personal portfolio project for learning and demonstrating full-stack web development skills.
