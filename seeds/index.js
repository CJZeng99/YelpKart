const mongoose = require('mongoose')
const cities = require('./cities')
const Track = require('../models/track')

mongoose.connect('mongodb://localhost:27017/yelp-kart')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database conencted!')
})

const seedDB = async () => {
    await Track.deleteMany({})
    for (let i = 0; i < 60; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const track = new Track({
            name: `K1 Speed ${cities[random1000].city}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`
        })
        await track.save()
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close()
    })