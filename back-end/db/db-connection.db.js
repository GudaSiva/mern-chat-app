import mongoose from "mongoose";

const mongoDBConnection = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
    console.log("Connected to MongoDB")
  } catch (error) {
    console.log("Some thing getting error while connecting DB");
  }
};

export default mongoDBConnection;
