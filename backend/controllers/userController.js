import { User } from "../models/userModel.js";

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user)
      return res.status(404).json({ message: "This user doesn't exist" });
    if (user.password !== password)
      return res.status(403).json({ message: "Your password is incorrect" });

    const response = await User.findOne(
      { email: email },
      "email username dateOfBirth"
    );
    return res.status(200).json({ message: "OK", user: response });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const Register = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      if (user.email === email)
        res
          .status(404)
          .json({ message: "This email has already been registered" });
      return;
    } else {
      const newUser = new User(req.body);
      await newUser.save();
    }

    const response = await User.findOne(
      { email: email },
      "email username dateOfBirth"
    );

    res.status(200).json({ message: "OK", user: response });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id } = req.body;
    await User.findOneAndUpdate({ _id: _id }, req.body);
    const newUser = await User.findOne(
      { _id: _id },
      "email username dateOfBirth"
    );
    res.status(200).json({ message: "OK", user: newUser });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export { Login, Register, updateUser };
