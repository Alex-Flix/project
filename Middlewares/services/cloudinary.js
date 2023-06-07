// cloudinary
// alexx.flixx@gmail.com
// Mearn-Q1
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: "djfej0qrv",
  api_key: "634469399472513",
  api_secret: "5JUhw2E5tD_s4Q7Hj86iSFgE6DA",
});

module.exports = cloudinary;
