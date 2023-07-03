import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../models/authModel.js'


export const register = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation,
      } = req.body;
  
      if (
        firstName &&
        lastName &&
        email &&
        password &&
        picturePath &&
        location &&
        occupation
      ) {
        const existingUser = await UserModel.findOne({ email });
  
        if (existingUser) {
          return res.status(200).json({
            success: false,
            message: 'Already registered. Please login.',
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
  
          const newUser = new UserModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
          });
  
          const isSaved = await newUser.save();
  
          if (isSaved) {
            res.status(201).json(isSaved);
          }
        }
      } else {
        res.status(400).json({
          message: 'All fields are required.',
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
  
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ msg: "All fields are required." });
      }
  
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "User does not exist." });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials." });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET , {
          expiresIn:"2d"
      } );
  
      delete user.password;
  
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  