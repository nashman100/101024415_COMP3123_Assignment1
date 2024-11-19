const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const JWT_TOKEN = process.env.JWT_SECRET;

router.post('/signup', [
    body('username', 'Username must be atleast 3 characters').isLength({min: 3}),
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be at least 8 characters long').isLength({min: 8})
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    try{
        
        const {username, email, password} = req.body;

        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({username, email, password: hashedPassword});

        await user.save();

        res.status(201).json({message: 'User created successfully', user_id: user._id});

    } catch(err){

        res.status(500).json({message: 'Server error'});

    }
});

router.post('/login', [
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Password is required').exists()
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try{
        
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const pass = await bcrypt.compare(password, user.password);
        if(!pass){
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({message: 'Login successful', token});
    } catch(err){
        res.status(500).json({message: 'Server error'});
    }
});

module.exports = router;