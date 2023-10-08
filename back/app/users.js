const express = require('express');
const User = require("../modals/User");
const config = require("../config");
const axios = require("axios");
const {nanoid} = require("nanoid");
const auth = require("../middleWare/auth");
const {OAuth2Client} = require('google-auth-library');
const verifyGoogleToken = require('../server');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName,
    });
    user.generateToken();
    await user.save();
    return res.send(user);

  } catch (error) {
    return res.status(400).send(error)
  }
});

router.post('/sessions',  async (req, res) => {
  const user = await User.findOne({email: req.body.email});

  if (!user) {
    return res.status(401).send({error: 'Credentials are wrong'});
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(401).send({error: 'Credentials are wrong'});
  }

  user.generateToken();
  await user.save();

  return res.send({message: 'Email and password correct', user});
});



router.delete('/sessions', async (req, res) => {
  const token = req.get('Authorization');
  const success = {message: 'Success'};

  if (!token) return res.send(success);

  const user = await User.findOne({token});

  if (!user) return res.send(success);

  user.generateToken();
  await user.save();

  return res.send(success);
})

router.post('/googleLogin', async (req, res) => {
   try {


     if (req.body.credential) {
       console.log(req.body.credential)
       const verificationResponse = await verifyGoogleToken(req.body.credential);
       // console.log(verificationResponse)
       if (verificationResponse.error) {
         return res.status(400).json({
           message: verificationResponse.error,
         });
       }

       const {name, email, sub: profileUserId} = verificationResponse?.payload;

       let user = await User.findOne({email});

       if (!user) {
         user = new User({
           email,
           password: nanoid(),
           displayName: name,
           profileUserId
         });
       }

       user.generateToken();
       await user.save();
       res.send({message: "Success", user})
     }




  } catch (e) {
    return res.status(500).send({global: 'Server error. Please try again'})
  }
})
module.exports = router;
