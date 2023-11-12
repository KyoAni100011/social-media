import { instance } from "./config";

const loginUser = async (user) => {
  try {
    const response = await instance.post("/auth/login", user);
    return response;
  } catch (err) {
    throw err;
  }
};

const registerUser = async (user) => {
  try {
    const respone = await instance.post("/auth/register", user);

    return respone;
  } catch (err) {
    throw err;
  }
};

const updateUser = async (user) => {
  try {
    const respone = await instance.post("/auth/update", user);

    return respone;
  } catch (err) {
    throw err;
  }
};

const logOutUser = () => {
  localStorage.clear();
};

export { loginUser, registerUser, logOutUser, updateUser };
