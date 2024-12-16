import mongoose from "mongoose";
// import jsonProcessor from "@jaybhanushali01/file-json-processor";

// const mongoConfig = {
//   uri: process.env.MONGODB_URL,
//   dbName: "chatEZ",
// };

// const jsonData = [
//   { name: "Alice", email: "alice@example.com" },
//   { name: "Bob", email: "bob@example.com" },
// ];

// processData({
//   dbType: "mongodb",
//   dbConfig: mongoConfig,
//   filePath: false,
//   jsonData: jsonData,
//   collectionName: "chatEZ",
//   customHandler: null,
// });

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "*.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
