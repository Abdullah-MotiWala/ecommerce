import mongoose from "mongoose";

// const { DB_NAME, DB_PASSWORD, DB_DATABASE } = process.env;
// const mongURI = `mongodb+srv://${DB_NAME}:${DB_PASSWORD}@cluster0.4fz1u.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`;
const mongURI = "mongodb://localhost/amazon";
const connectingMongoose = () => {
  mongoose.connect(mongURI, () => {
    console.log("Connect to mongoose");
  });
};

export default connectingMongoose;
