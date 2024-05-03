import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req,res) =>{
console.log("hai")


try {
    const { email, password, userName } = req.body;

    // Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({ email, password: hashedPassword, userName });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

//user login

export const login = async (req, res) => {
    try{
    
        const email = req.body.email
        const user = await User.findOne({email})

        
        if(!user){
            return res.status(404).json({success:false, message:'user not found'})
        }

        const correctPassword = await bcrypt.compare(req.body.password, user.password)

       if(!correctPassword){
            return res.status(401).json({success: false, message:'Incorrect email or password'})
        }

        const { password, role,  ...rest } = user._doc;

        const token = jwt.sign(
           {id: user._id, role:user.role },process.env.JWT_SECRET_KEY,{expiresIn:"15d"}
           
        );

        res.cookie("accessToken", token, {httpOnly: true, expires:token.expiresIn}).status(200).json({success: true, message: "Sucessfully login",token, data:{...rest}, role,});
        // req.session.user = user; 
        // res.status(200).json({ success: true, message: 'Successfully logged in' });  
        
    }catch(error){
        res.status(500).json({success: false, message:'failed to login'});
    }
};

export const getAllUser = async (req, res) =>{
  try{
    const userId = req.params.userId 
      const users = await User.find({userId:userId})

      res.status(200).json({success: true, message: "Sucessfully", data:users});

  }catch(err){

      res.status(404).json({success:false,message:"not found", });
      
  }
};