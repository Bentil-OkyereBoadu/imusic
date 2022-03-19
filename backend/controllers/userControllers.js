const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require('../config/generateToken')

const registerUser = asyncHandler (async (req, res) => {
    const { name, id, password } = req.body;

    if(!name || !password || !id){
        res.status(400)
        throw new Error("Please fill all the fields");
    }

    const userExists = await User.findOne({ email });
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else{
        res.status(400);
        throw new Error(" Failed to create user")
    }
});

module.exports = {registerUser}