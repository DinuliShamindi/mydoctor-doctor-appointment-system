const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;
const pool = require('./db');

app.use(cors());
app.use(express.json());


app.get('/', (req,res) => {
    res.send("Backend is working");
});

app.get('/api/doctors', async (req,res) => {
    try {
        const result = await pool.query(
             `
            SELECT 
                id,
                name,
                specialty,
                experience,
                rating::float,
                reviews,
                available,
                gender,
                location,
                next_slot AS "nextSlot",
                fee
            FROM doctors
            `
        );

        res.json(result.rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: 'Database Error'
        });
    }
});

app.post('/api/appointments', async (req, res) => {
    try {
        const {
            reference,
            doctor_id,
            patient_name,
            patient_phone,
            patient_email,
            appointment_date,
            appointment_time,
            appointment_type,
            reason
        } = req.body;


        const result = await pool.query(
            `
            INSERT INTO appointments
            (
                reference,
                doctor_id,
                patient_name,
                patient_phone,
                patient_email,
                appointment_date,
                appointment_time,
                appointment_type,
                reason
            )
            VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING *
            `,
            [
                reference,
                doctor_id,
                patient_name,
                patient_phone,
                patient_email,
                appointment_date,
                appointment_time,
                appointment_type,
                reason
            ]
        );


        res.json(result.rows[0]);

    } catch(error) {
        console.log(error);

        res.status(500).json({
            error: "Database error"
        });
    }
});

app.get('/api/appointments', async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT 
                appointments.id,
                appointments.reference,
                appointments.appointment_date,
                appointments.appointment_time,
                appointments.appointment_type,
                appointments.reason,
                appointments.status,

                doctors.name,
                doctors.specialty,
                doctors.location

            FROM appointments

            JOIN doctors
            ON appointments.doctor_id = doctors.id
        `);


        const appointments = result.rows.map(appt => ({
            id: appt.id,
            ref: appt.reference,
            date: appt.appointment_date.toISOString().split('T')[0],
            time: appt.appointment_time,
            type: appt.appointment_type,
            reason: appt.reason,
            status: appt.status,

            doctor: {
                name: appt.name,
                specialty: appt.specialty,
                location: appt.location
            }
        }));


        res.json(appointments);


    } catch(error) {
        console.log(error);

        res.status(500).json({
            error: "Database error"
        });
    }
});

app.put('/api/appointments/:id', async (req, res) => {

    const { id } = req.params;

    try {

        const result = await pool.query(
            `
            UPDATE appointments
            SET status = 'Cancelled'
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );

        res.json(result.rows[0]);

    } catch(error) {

        console.log(error);

        res.status(500).json({
            error: "Database error"
        });
    }

});


app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});