const mongoose = require("mongoose");

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const image1Id = mongoose.Types.ObjectId();
const image2Id = mongoose.Types.ObjectId();
const image3Id = mongoose.Types.ObjectId();

exports.images = [
  {
    _id: image1Id,
    cloudinaryId: "image1_cx67sa",
    url:
      "https://res.cloudinary.com/mrleewatch/image/upload/v1604982221/worldwatch/image1_cx67sa.jpg",
  },
  {
    _id: image2Id,
    cloudinaryId: "image2_wqlgz3",
    url:
      "https://res.cloudinary.com/mrleewatch/image/upload/v1604982221/worldwatch/image2_wqlgz3.jpg",
  },
  {
    _id: image3Id,
    cloudinaryId: "image3_w48n8l",
    url:
      "https://res.cloudinary.com/mrleewatch/image/upload/v1604982221/worldwatch/image3_w48n8l.jpg",
  },
];

exports.rentals = [
  {
    title: "Nice view on ocean",
    city: "Markham",
    street: "6 Whistler Ct",
    category: "house",
    image: image1Id,
    numOfRooms: 4,
    shared: true,
    description: "Very nice apartment in center of the city.",
    dailyPrice: 43,
    owner: user1Id,
  },
  {
    title: "Modern apartment in center",
    city: "New York",
    street: "Time Square",
    category: "apartment",
    image: image2Id,
    numOfRooms: 1,
    shared: false,
    description: "Very nice apartment in center of the city.",
    dailyPrice: 11,
    owner: user1Id,
  },
  {
    title: "Old house in nature",
    city: "Bratislava",
    street: "Letna 7",
    category: "condo",
    image: image3Id,
    numOfRooms: 5,
    shared: true,
    description: "Very nice apartment in center of the city.",
    dailyPrice: 23,
    owner: user2Id,
  },
];

exports.users = [
  {
    _id: user1Id,
    username: "Quan 1",
    email: "quan612@yahoo.com",
    password: "123456",
  },
  {
    _id: user2Id,
    username: "Quan 2",
    email: "quan613@yahoo.com",
    password: "123456",
  },
];
