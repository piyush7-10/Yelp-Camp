const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    /* const c = new Campground({ title: 'purple field' });
    await c.save(); */
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6197d05eaf19ba70b6e0fd10',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dg1b6rfhr/image/upload/v1637956641/YelpCamp/wdxbpz6rlhco75zrjbtj.jpg',
                    filename: 'YelpCamp/wdxbpz6rlhco75zrjbtj'
                },
                {
                    url: 'https://res.cloudinary.com/dg1b6rfhr/image/upload/v1637956641/YelpCamp/wee9fec73cnyfxt2y3ou.jpg',
                    filename: 'YelpCamp/wee9fec73cnyfxt2y3ou'
                },
                {
                    url: 'https://res.cloudinary.com/dg1b6rfhr/image/upload/v1637956641/YelpCamp/tkaam6fas68iz1s7hiaa.jpg',
                    filename: 'YelpCamp/tkaam6fas68iz1s7hiaa'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
