import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER

export const userRegister = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        // validation
        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please fill all the details"
            })
        }

        // hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const user = await userModel.create(
            {
                name,
                email,
                password: hashedPassword
            });

        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registering user",
            error: error.message
        })
    }
}

// LOGIN
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please add email or password"
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User is not registered"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(402).send({
                success: false,
                message: "Invalid Password"
            })
        }

        //TOKEN
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });


        res.status(200).send({
            success: true,
            message: "Login Successful",
            token,
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error: error.message
        })
    }
}

// UPDATE user details

export const updateUser = async (req, res) => {

    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({
                success: false,
                message: "User id not found"
            })
        }
        const { name, phone, dob, image, gender, address } = req.body;
        const photoToBase64 = req.file && req.file.buffer.toString('base64');
        const user = await userModel.findByIdAndUpdate(id,
            {
                $set: { name, dob, address, phone, gender, image: photoToBase64, }
            }, { returnOriginal: false })

        res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            user,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error: error.message
        })
    }
}

// update password

export const updatePassword = async (req, res) => {
    try {
        
        const { id } = req.params;
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "User id not found"
            })
        }
        //req.body

        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).send({
                success: false,
                message: "Please add old or new password"
            })
        }

        //find user
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(402).send({
                success: false,
                message: "User not found"
            })
        }

        //check old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(402).send({
                success: false,
                message: "Invalid Password"
            })
        }

        //hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

      //update password
      user.password = hashedPassword;
      await user.save();
        res.status(200).send({
            success: true,
            message: "Password Updated Successfully",
        })

    }
        catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error in Updating Password",
                error: error.message
            })
        }
    }