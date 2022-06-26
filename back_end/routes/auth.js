const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchUser = require("../miidleware/fetchUser");
router = express.Router();
const JWT_SECRET = "Maihudonbete"; // used for Auhentication.

// Route 1 : create a user using api/auth/createUser   no login required
router.post(
  "/createUser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Enter a valid username").isLength({ min: 3 }),
    body("password", "password is not valid").isLength({ min: 3 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }
    // doublicate email check
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success:false, error: "Sorry this email already exist" });
      }
      // create a new user

      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secpass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({success:true, authToken });
    } catch (error) {
      console.log(error.massage);
      res.status(500).send({success:false, error: "Internal server error" });
    }
  }
);



//Route 2: authenticate a user using ./api/auth/login/  no login required
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success:false, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({success:false, error: "Please try to login with correct credentials" });
      }

      let passCompare = await bcrypt.compare(password, user.password);
      if (!passCompare) {
        return res
          .status(400)
          .json({success:false, error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({success:true, authToken });
    } catch (error) {
      console.log(error.massage);
      res.status(500).send({success:false, error: "Internal server error" });
    }
  }
);



//Route 3 : get details about user who has logged in. login required.  path : /api/auth/getUser/
router.post("/getUser", fetchUser ,async (req, res) => {
    let success = false
    try {
      let userid = req.user.id;
      const user = await User.findById(userid).select("-password");
      res.json(user)
    } catch (error) {
      console.log(error.massage);
      res.status(500).send({ error: "Internal server error" });
    }
  }
);
module.exports = router;
