import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
//login user
const loginUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await userModel.findOne({ name });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "User credential don't match",
      });
    }

    const token = createToken(user._id);
    //console.log(token)
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};


//validate password
const validatePassword = (password) => {
    // Define password requirements
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    // Check if password meets all requirements
    if (password.length < minLength) {
      return {
        success: false,
        message: "Password must be at least 8 characters long",
      };
    }
    if (!hasUpperCase) {
      return {
        success: false,
        message: "Password must contain at least one uppercase letter",
      };
    }
    if (!hasLowerCase) {
      return {
        success: false,
        message: "Password must contain at least one lowercase letter",
      };
    }
    if (!hasNumbers) {
      return {
        success: false,
        message: "Password must contain at least one number",
      };
    }
    if (!hasSpecialChars) {
      return {
        success: false,
        message: "Password must contain at least one special character",
      };
    }
  
    // If password passes all checks
    return {
      success: true,
      message: "Password is strong",
    };
  };
  
  //register user
  const registerUser = async (req, res) => {
    const { name, password } = req.body;
    try {
      //checking if the user already exists
      const exists = await userModel.findOne({ name });
      if (exists) {
        return res.json({ success: false, message: "User already exists" });
      }
  
      //Validating strong password
      const validation = validatePassword(password);
      if (!validation.success) {
        return res.json(validation);
      }
  
      //hashing user password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = new userModel({
        name: name,
        password: hashedPassword,
      });
  
      const user = await newUser.save();
      const token = createToken(user._id);
      res.json({ success: true, token });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" });
    }
  };
  

export { loginUser, registerUser };
