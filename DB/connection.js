import mongoose from "mongoose";

const connectDB = async () => {
  return await mongoose
    .connect(`${process.env.DB_URL}`)
    .then((result) => {
      console.log("Connected DB Success");
    })
    .catch((error) => {
      console.log("Failed to connect DB", error);
    });
};

export default connectDB;
