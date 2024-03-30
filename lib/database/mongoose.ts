import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// check if it already exists in the global object
let cached: MongooseConnection = (global as any).mongoose;

// if not create it
if (!cached) {
  cached = {
    conn: null,
    promise: null,
  };
}

// create a mongo connection
export const connectToDatabase = async () => {
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside.env.local"
    );
  }

  if (cached.conn) return cached.conn;

  cached.promise = cached.promise || mongoose.connect(MONGO_URI);
  cached.conn = await cached.promise;

  return cached.conn;
};
