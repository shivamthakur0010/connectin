const express = require('express');

const auth = require('../../middleware/auth');

const User = require('../../models/Users');

const config = require('config');

const { check, validationResult } = require("express-validator");

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const router = express.Router();

// @route  GET api/auth
// @desc  Test Route
// @access  public

router.get('/',auth,async (req, res)=>{
    // res.send('auth data');
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    } 
})

// ------------------------------------------------------------------
// @route  POST api/auth
// @desc  authebtcate user and get token
// @access  public

router.post(
    "/",
    check('email','enter a valid email').isEmail(),
    check('password','password required').exists(),
    async (req, res) => {
      // console.log(req.body);
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({errors:errors.array()})
      }
  
      const {email, password} = req.body;
      try{
        let user = await User.findOne({email})
        if(!user){
          res.status(400).json({errors:[{msg:"Invalid credentials"}]});
        }
  
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            res.status(400).json({errors:[{msg:"Invalid credentials"}]});
        }

        const payload = {
          user:{
            id:user.id,
          }
        }
  
        jwt.sign(payload, config.get('jwtSecret'),{expiresIn:36000},(err, token)=>{
          if(err) throw err;
          res.json({token});
        })
  
      }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
      }
  
    }
  );

module.exports = router;