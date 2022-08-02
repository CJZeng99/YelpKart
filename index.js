const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Track = require('./models/track')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost:27017/yelp-kart')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database conencted!')
})

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/tracks', async (req, res) => {
    const tracks = await Track.find({})
    res.render('tracks/index', { tracks })
})

app.get('/tracks/new', (req, res) => {
    res.render('tracks/new')
})

app.get('/tracks/:id', async (req, res) => {
    const track = await Track.findById(req.params.id)
    res.render('tracks/show', { track })
})

app.post('/tracks', async (req, res) => {
    const track = new Track(req.body.track)
    await track.save()
    res.redirect(`/tracks/${track._id}`)
})

app.get('/tracks/:id/edit', async (req, res) => {
    const track = await Track.findById(req.params.id)
    res.render('tracks/edit', { track })
})

app.put('/tracks/:id', async (req, res) => {
    const track = await Track.findByIdAndUpdate(req.params.id, { ...req.body.track })
    res.redirect(`/tracks/${track._id}`)
})

app.delete('/tracks/:id', async (req, res) => {
    const track = await Track.findByIdAndRemove(req.params.id)
    res.redirect('/tracks')
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})