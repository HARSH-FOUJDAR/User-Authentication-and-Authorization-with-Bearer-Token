const mongoose = require("mongoose");

const DataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb is connected Succesfully");
  } catch (error) {
    console.log("MoggoDb is not connected");
    console.log(error.message);
  }
};

module.exports = DataBase;
