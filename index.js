import express  from "express";
import data from "./data/mock.json" assert { type: "json" };

const app = express()

const PORT = 3000;

// Using public folder
app.use('/images', express.static('public'))

// Get - redirect method
app.get('/redirect', (req, res) => {
  res.redirect('http://www.linkedin.com')
 })

// Route Chaining 
app.route("/class")
    .get((req, res) => {
        res.send('Retrive Class Info')
    })
    .post((req, res) => {
        res.send("Create Class Info")
    })
    .put((req, res) => {
        res.send("Update Class Info")
    })

// Get with Next
app.get('/', (req, res, next) => {
    console.log('The respond will be sent by Next Function.');
    next();
 }, (req, res) => {
    res.send("I just set up a rout with a second callback.");
 })
 
app.get('/class/:id', (req, res) => {
   const studentID = Number(req.params.id);

   const student = data.filter((student) => student.id === studentID);

   res.send(student);
   console.log('student: ', student);
   console.log('params -->', studentID);
})

app.post('/create', (req, res) => {
    res.send('This is a POST request at /create')
})

app.put('/update', (req, res) => {
    res.send('This is a PUT request at /update')
})

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
})