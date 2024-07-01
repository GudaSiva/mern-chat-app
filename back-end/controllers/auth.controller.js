import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generate-token.util.js";

export const login = async (req, res) => {
  try {
    // request user details
    const { user_name, password } = req.body;
    // find user details into the db
    const userDetails = await User.findOne({ user_name });
    // compare input password and db password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userDetails?.password || ""
    );
    // if user details correct
    if (!userDetails || !isPasswordCorrect) {
      return res.status(404).json({
        error: "INVALID USER DETAILS",
      });
    }
    generateTokenAndSetCookie(userDetails._id, res);
    const responseDetails = {
      user_name: userDetails.user_name,
      user: userDetails,
    };
    // success response
    return res.status(200).json(responseDetails);
  } catch (error) {
    console.error("Something went wrong while login to the DB", error);
    return res.status(500).json({
      error: "SOMETHING WENT WRONG WHILE LOGIN",
    });
  }
};

export const signUp = async (req, res) => {
  try {
    // User required body details
    const { full_name, user_name, email, password, confirmPassword, gender } =
      req.body;
    // user password and confirm password should match
    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "PASSWORD AND CONFIRM PASSWORD SHOULD BE SAME",
      });
    }
    // finds if user exists in db
    const userDetails = await User.findOne({ email });
    if (userDetails) {
      return res.status(403).json({
        error: "USER ALREADY EXISTS",
      });
    }
    // converted hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // default avatar emoji's from google
    const maleProfileImage = `https://avatar.iran.liara.run/public/boy?username=${user_name}`;
    const femaleProfileImage = `https://avatar.iran.liara.run/public/girl?username=${user_name}`;

    const userData = new User({
      full_name,
      user_name,
      email,
      password: hashPassword,
      gender,
      profile_img: gender === "male" ? maleProfileImage : femaleProfileImage,
    });

    if (userData) {
      generateTokenAndSetCookie(userData._id, res);
      // user data saved in db
      await userData.save();

      const response = {
        full_name: userData.full_name,
        user_name: userData.user_name,
        email: userData.email,
        gender: userData.gender,
        profile_img: userData.profile_img,
      };
      // success response
      return res.status(201).json(response);
    } else {
      return res.status(500).json({
        error: "INVALID USER DATA",
      });
    }
  } catch (error) {
    console.error("Something went wrong while signing up to the DB", error);
    return res.status(500).json({
      error: "SOMETHING WENT WRONG WHILE SIGNING UP",
    });
  }
};

export const logOut = (req, res) => {
  try {
    res.cookie("jwt", "", { magAge: 0 });
    res.status(200).json({ message: "LOGGED OUT SUCCESSFULLY" });
  } catch (error) {
    console.log("Some thing went wrong while logout", error.message);
    return res.status(500).json({
      error: "SOME THING WENT WRONG WHILE LOGOUT",
    });
  }
};
