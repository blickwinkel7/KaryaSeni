"use strict"

const express = require("express")
const router = express.Router()
const Controller = require("../controllers")

router.get("/arts", Controller.readArts)



module.exports = router