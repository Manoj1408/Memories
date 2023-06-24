import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";


export const signin = async (req,res) => {
    const {email,password} = req.body;
    try {
        const existinguser = await User.findOne({email});
        if(!existinguser) return res.status(404).json({message:"User doesn't exist"});

        const isPasswordCorrect = bcrypt.compare(password,existinguser.password);

        if(!isPasswordCorrect) return res.status(404).json({ message: "Invalide Credentials" });

        const token = jwt.sign({email : existinguser.email,id:existinguser._id},"test",{expiresIn:'1h'});
        res.status(200).json({result:existinguser,token });
    } catch (error) {
        res.status(500).json({ message: "Something went Wrong" });
        
    }
    
}



export const signup = async (req, res) => {
        const { email, password,confirmPassword, firstName, lastName } = req.body;

        try {
          const oldUser = await User.findOne({ email });

          if (oldUser)  return res.status(400).json({ message: "User already exists" });
          
          
          if (password != confirmPassword)  return res.status(400).json({ message: "Password doen't match" });

          const hashedPassword = await bcrypt.hash(password, 12);

          const result = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
          });

          const token = jwt.sign(
            { email: result.email, id: result._id },
            'test',
            { expiresIn: "1h" }
          );

          res.status(201).json({ result, token });
        } catch (error) {
          res.status(500).json({ message: "Something went wrong" });

          console.log(error);
        }
};