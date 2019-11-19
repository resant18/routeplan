const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const router = express.Router();

router.get("/test", (req, res) =>
  res.json({ msg: "This is the tweets route" })
);

