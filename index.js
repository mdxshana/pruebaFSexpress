
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use(cors());


app.get('/', function (req, res) {    
    res.send('Server start');
})

app.use(require('./routes/authRoutes'));
app.use(require('./routes/taskRoutes'));


mongoose.connect("mongodb://localhost:27017/task", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) throw err;
    console.log("Base de datos online");
});


app.listen(3000, () => {
    console.log("Escuchando en puerto 3000");
})