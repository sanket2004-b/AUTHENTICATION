const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

/* PAGES */
router.get("/signup", (req, res) => res.render("signup"));
router.get("/login", (req, res) => res.render("login"));
router.get("/home", (req, res) => res.render("home"));

/* SIGNUP */
router.post("/signup", async (req, res) => {
  console.log("BODY 👉", req.body); 

  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.send("All fields are required");
  }

  const userExist = await User.findOne({ email });
  if (userExist) return res.send("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    fullName,
    email,
    password: hashedPassword
  });

  res.redirect("/user/login");
});

/* LOGIN */
router.post("/login", async (req, res) => {
  console.log("BODY 👉", req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.send("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.send("Invalid credentials");

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, { httpOnly: true });
  res.redirect("/user/home");
});

module.exports = router;

