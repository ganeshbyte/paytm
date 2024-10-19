import mongoose from "mongoose";

export const connectToDb = (url) => {
  return mongoose.connect(url);
};
