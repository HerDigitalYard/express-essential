import express  from "express";
import data from "./data/mock.json" assert { type: "json" };

const app = express()

const PORT = 3000;

// Using public folder
app.use('/images', express.static('public'))

// Using express.json and express.urlencoded
//app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Get - redirect method
app.get('/redirect', (req, res) => {
  res.redirect('http://www.linkedin.com')
 })

// Route Chaining 
app.route("/class")
    .get((req, res) => {
        throw new Error();
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
   // Middleware: Access the routing Parameter  
   const studentID = Number(req.params.id);

   const student = data.filter((student) => student.id === studentID);

   // Everything above this line is middleware
   res.send(student);
})

// POST - express.json and express.urlencoded
app.post('/item', (req,res) => {
    console.log(req.body);

    res.send(req.body);
})

app.post('/create', (req, res) => {
    res.send('This is a POST request at /create')
})

app.put('/update', (req, res) => {
    res.send('This is a PUT request at /update')
})

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).send('Something is Broken!!')
})

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
})

/** Build-In Middleware Functions
  
 express.static     : Serverless static assets
 express.json       : Parses incoming requests with JSON payloads
 express.urlencoded : Parses incoming requests with URL-encoded payloads
 
 */