import { MongoClient } from "mongodb";
const url =
  "mongodb+srv://han0911:a36936@cluster0.swfhspa.mongodb.net/?appName=Cluster0";
const options = {};
let connectDB;

if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options)
      .connect()
      .then((client) => {
        return client;
      })
      .catch((err) => {
        console.error(err.message);
      });
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect()
}
export { connectDB };
