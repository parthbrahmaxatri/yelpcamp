const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20 + 10);
    const camp = new Campground({
      author: "6704a6d9118dcc59d98923fe",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum voluptatibus quasi perferendis alias iste corporis debitis voluptas totam, sed suscipit consectetur iure dolorem corrupti quae, facilis quidem minima asperiores nemo!",
      price,
      images: [
        {
          url: "https://res.cloudinary.com/dsb3v7hog/image/upload/v1729019802/YelpCamp/uhouoownnpq2fsxledmx.jpg",
          filename: "YelpCamp/uhouoownnpq2fsxledmx",
        },
        {
          url: "https://res.cloudinary.com/dsb3v7hog/image/upload/v1729019801/YelpCamp/wtuyxqfkhctebxyhkujt.jpg",
          filename: "YelpCamp/wtuyxqfkhctebxyhkujt",
        },
        {
          url: "https://res.cloudinary.com/dsb3v7hog/image/upload/v1729019802/YelpCamp/ufcnbbtvzrz3y7y0mlv5.jpg",
          filename: "YelpCamp/ufcnbbtvzrz3y7y0mlv5",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
