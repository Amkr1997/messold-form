const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });
const mongo_uri = process.env.MONGO_URI;

const initialisation = async () => {
  try {
    const connectDB = await mongoose.connect(mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 seconds
      socketTimeoutMS: 45000, // 45 seconds
    });

    if (connectDB) {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { initialisation };
