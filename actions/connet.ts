import mongoose from "mongoose";
let cached = (global as any).mongoose || { conn: null, promise: null };
const connect = async () => {
  if (cached.conn) return cached.conn;
  cached.promise =
    cached.promise ||
    mongoose
      .connect(process.env.MONGODB_URL!, { dbName: "gamingApp", bufferCommands: false })
      .then(() => console.log("DB connected succesfully !"))
      .catch((err) => console.log(err));
  cached.conn = await cached.promise;
  return cached.conn;
};
export default connect;
