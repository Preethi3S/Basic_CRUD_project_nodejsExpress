import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is connected successfully");
    console.log(connect.connection.host , connect.connection.name);
  } catch (error) {
    console.log("OOPS !! Unable to connect the database now .. try again later");
    process.exit(1);
  }
};

export default  connectDB;