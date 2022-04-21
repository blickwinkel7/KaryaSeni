"use strict"

const express = require("express")
const router = express.Router()
const Controller = require("../controllers/")

// GET REGISTER
router.get("/register", Controller.registerForm)
// POST REGISTER
router.post("/register", Controller.postRegister)

// GET LOGIN
router.get("/login", Controller.loginForm)
// POST LOGIN
router.post("/login", Controller.postLogin)


router.get("/", Controller.home)



module.exports = router