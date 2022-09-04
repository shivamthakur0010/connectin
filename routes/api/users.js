const express = require("express");

const { check, validationResult } = require("express-validator");

const gravatar = require('gravatar');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../../models/Users')

const config = require('config');

const router = express.Router();

// @route  POST api/users
// @desc  Test Route
// @access  public

router.post(
  "/",
  [check("name", "Name is required").not().isEmpty()],
  check('email','enter a valid email').isEmail(),
  check('password','please enter a password with min 6 letters').isLength({min:6}),
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {name, email, password} = req.body;
    try{
      let user = await User.findOne({email})
      if(user){
        res.status(400).json({errors:[{msg:"User already exists"}]});
      }
      const avatar = gravatar.url(email,{
        s:'200',
        r:'pg',
        d:'mm',
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      })
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // res.send("users has been registered");
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
