const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.json())
app.use(express.static('public'))

MongoClient.connect('mongodb+srv://jadavila9:jayxx892@cluster0.ij5cahp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(client => {
    console.log("Connected to Database")
    const db = client.db('quoteGenerator')
    const quoteCollection = db.collection("quotes")
    
    app.use(bodyParser.urlencoded({extended: true}))

    app.get('/', (req, res) => { 
        db.collection('quotes')
            .find()
            .toArray()
            .then(results => {
                res.render('index.ejs', {quotes: results })
            })
            .catch(error => console.error(error))
    })
    
    app.put('/quotes', (req, res) => {
        console.log(req.body)
    })

    app.post('/quotes', (req, res) => {
        quoteCollection
            .insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })

    app.set('view engine', 'ejs')


    app.listen(3000, function(){
        console.log('listening on 3000')
    });

})
.catch(error => console.error(error))
     

console.log('May Node be with you')