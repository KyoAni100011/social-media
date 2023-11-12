import { instance } from "./config";

const uploadImage = async (image) => {
  try {
    const respone = await instance.post("/upload-image", image);
    return respone;
  } catch (err) {
    throw err;
  }
};

export { uploadImage };
