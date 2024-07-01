import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUsers = req.user._id;
    const findAllUsers = await User.find({
      _id: { $ne: loggedInUsers },
    }).select("-password");

    res.status(200).json(findAllUsers);
  } catch (error) {
    console.error("Error : Some thing went wrong while getting users", error);
    req.status(500).json({
      error: "INTERNAL SERVER ERROR",
    });
  }
};
