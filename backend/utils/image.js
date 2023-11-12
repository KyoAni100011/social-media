import cloudinary from "../cloudinary/config.js";
import multer from "multer";
import "dotenv/config";

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("file");

const uploadImage = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const response = await cloudinary.uploader.upload(dataURI, {
      upload_preset: process.env.PRESET_NAME,
    });

    res.status(200).json({
      message: "Success uploading image",
      image: {
        url: response.url,
        public_id: response.public_id,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

const deleteImage = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    return error;
  }
};

export { uploadImage, deleteImage, upload };
