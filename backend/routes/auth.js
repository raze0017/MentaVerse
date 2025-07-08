const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const pool = require("../db/pool");
const bcrypt = require("bcrypt");
router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const exist = await pool.query("SELECT * from users where username = $1", [
      username,
    ]);
    if (exist.rows.length > 0) {
      return res.status(400).json({ message: "username not available" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
      [username, hashedPassword]
    );

    res.status(201).json({
      message: "user created successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server internal error" });
    return next(error);
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const results = await pool.query("select * from users where username=$1", [
    username,
  ]);
  const user = results.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match:", isMatch);
    }
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
