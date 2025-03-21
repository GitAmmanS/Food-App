const User = require('../models/t4UserSchema');
const bcrypt = require('bcryptjs');


exports.createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if ( !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userState = email === "ammansajjad42@gmail.com" ? "admin" : "manager";

        const newUser = await User.create({
            email,
            password: hashedPassword,
            userState
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "No record existed" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "The password is incorrect" });
        }

        res.json({ message: "Success", userState: user.userState, _id: user._id });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getUser=async (req,res)=>{
    const {userId} =req.query;
    let query={}
    if(userId){
        query._id=userId
    }
    const user=await User.find(query);
    if(!user){
        res.send(404).json({error});
    }
    res.send(200).json(user);

}