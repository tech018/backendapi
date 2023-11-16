import mongoose from "mongoose";
import config from ".";

const options: mongoose.ConnectOptions = {
  autoIndex: false,
};

const mongoConnect = async (): Promise<mongoose.Connection> => {
  try {
    mongoose.set("debug", config.env === "dev");
    mongoose.set("strictQuery", false);

    await mongoose.connect(config.mongouri, options);
    console.log("<<<< Connected to MongoDB >>>>");

    mongoose.Promise = global.Promise;
    const db: mongoose.Connection = mongoose.connection;
    return db;
  } catch (error) {
    console.error("MongoDB Connection Error: ", error);
    process.exit(1);
  }
};

export default mongoConnect;
