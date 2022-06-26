const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

// register
const register = async(req, res, next)=>{
    const { name, email, password } = req.body;
    // check email
    let existingUser;
    try{
        existingUser = await User.findOne({email: email})
    }catch(err){
        console.log(err)
    }
    if(existingUser){
        return res.status(403).json({status: false, msg: "Already exist! Choose another email"})
    }

    // create new user
    const hashedPassword = bcrypt.hashSync(password, 10)
    const user = new User({
        name,
        email,
        password: hashedPassword
    })
    try{
        await user.save();
    }catch(err){
        console.log(err)
    }    

    res.status(201).json({status: true, user})
}

// login
const login = async(req, res, next)=>{
    const {email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email: email})
    }catch(err){
        return res.status(404).json({status: false, msg: "Error!"})
    }
    if(!existingUser){
        return res.status(402).json({status: false, msg: "Invalid email! Sign up please"})
    }
    // check password
    const isCorrectPassword = bcrypt.compareSync(password, existingUser.password);

    if(!isCorrectPassword){
        return res.status(403).json({status: false, msg: "Password is incorrect!"})
    }
    // generate token
    const token = jwt.sign({
        id: existingUser.id
    }, JWT_SECRET_KEY, {
        expiresIn: '24h'
    })
    // create cookie
    res.cookie(String(existingUser._id), token, {
        path: '/',
        expires: new Date(Date.now() + 1000*3600*24),
        httpOnly: true,
        sameSite: 'lax'
    })
    return res.status(200).json({status: true, msg: "Successfully login!", user: existingUser, token})
}

// token verify
const verifyToken = async(req, res, next)=>{
    const cookie = req.headers.cookie;
    const token = cookie.split('=')[1];

    if(!token){
        res.status(404).json({status: false, msg: "No Token Found!"});
    }
    jwt.verify(String(token), JWT_SECRET_KEY, (err, user)=>{
        if(err){
            return res.status(400).json({status: false, msg: "Invalid Token!"})
        }
        req.id = user.id
    })
    next();
}

// get user info from id
const getUser = async(req, res, next)=>{
    const userId = req.id;
    let user;
    try{
        user = await User.findById(userId, "-password")
    }catch(err){
        console.log(err)
    }
    if(!user){
        return res.status(404).json({status: false, msg: "Cannot find user by this id"})
    }
    return res.status(200).json({status: true, user})
}

// logout
const logout = async(req, res, next)=>{
    const cookie = req.headers.cookie;
    const token = cookie.split('=')[1];
    if(!token){
        res.status(404).json({status: false, msg: "No token found"})
    }
    jwt.verify(String(token), JWT_SECRET_KEY, (err, user)=>{
        if(err){
            return res.status(400).json({status: false, msg: "Invalid Token!"})
        }
        res.clearCookie(`${user.id}`)
        req.cookies[`${user.id}`] = ""

        return res.status(200).json({status: false, msg: "Successfully logged out"})
    })
}

// set Avatar
const setAvatar = async(req, res)=>{
    try{
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage
        })
        return res.status(200).json({isSet: userData.isAvatarImageSet, image: userData.avatarImage})
    }catch(err){
        console.log(err);
    }
}

// get all users
const getAllUsers = async(req, res)=>{
    const users = await User.find({_id: {$ne:req.params.id}}).select([
        "_id", "name", "email", "avatarImage"
    ])
    return res.status(200).json(users)
}

module.exports = {
    register,
    login,
    verifyToken,
    getUser,
    logout,
    setAvatar,
    getAllUsers
}