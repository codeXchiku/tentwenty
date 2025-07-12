import MONGODB_URI from '../env.js'

import mongoose from 'mongoose';

const URI = MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDb;