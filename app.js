const express = require('express')
const app = express()
const data = require('./data.js')

app.use(express.json())

app.get('/all-doctors', (req, res) => {
  res.send(data);
})

app.get('/all-appointments', (req, res) => {
  const requestedDoctor = req.body.doctor;
  let appointments = null;

  for (var i = 0; i < data.length; i++) {
    if (data[i].doctor === requestedDoctor) {
      appointments = data[i].patients;
      break;
    }
  }

  res.send(appointments)

})

app.delete('/remove-appt', (req, res) => {
  const requestedDoctor = req.body.doctor;
  const patientName = req.body.patient;
  const apptDate = req.body.date;

  for (let i = 0; i < data.length; i++) {
    if (data[i].doctor === requestedDoctor) {
      for (var x = 0; x < data[i].patients.length; x++) {
        currentAppt = data[i].patients[x]
        if (currentAppt.patient === patientName && currentAppt.date === apptDate) {
          data[i].patients.splice(x, 1)
          break;
        }
      }
    }
  }

  res.send("appointment removed")
})

app.post('/add-appt', (req, res) => {
  const requestedDoctor = req.body.doctor;
  const patientName = req.body.patient;
  const time = req.body.time;
  const minutes = time.slice(3, 5)

  const newPatient = req.body.new_patient;
  const apptDate = req.body.date;

  const newAppt = {
    patient: patientName,
    time: time,
    date: apptDate,
    new_patient: req.body.new_patient,
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].doctor === requestedDoctor && minutes % 15 === 0) {
      data[i].patients.unshift(newAppt)
    }
  }

  res.send('appointment added')
})


module.exports = app