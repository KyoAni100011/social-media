import express from "express";
import "dotenv/config";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import postRouter from "./routers/postRouter.js";
import mongoose from "mongoose";
import { uploadImage, upload } from "./utils/image.js";

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
app.use("/post", postRouter);
app.post("/upload-image", upload, uploadImage);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to DB."))
  .catch((err) => console.log(err));
