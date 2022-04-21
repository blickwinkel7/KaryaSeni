"use strict"

const express = require("express")
const router = express.Router()
const Controller = require("../controllers")


// ROUTES ART
router.get("/arts",  Controller.readArts)
router.get("/arts/add", Controller.formArt)
router.post("/arts/add", Controller.createArt)


// GET REGISTER
router.get("/register", Controller.registerForm)
// POST REGISTER
router.post("/register", Controller.postRegister)

// GET LOGIN
router.get("/login", Controller.loginForm)
// POST LOGIN
router.post("/login", Controller.postLogin)

router.get("/logout", Controller.getLogout)

const isSeller = function (req, res, next) {
    if (req.session.userId && req.session.role !== "seller") {
        const error = "You have no access"
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
}

router.use((req, res, next) => {
    if (!req.session.userId) {
        const error = "Please login first!"
        res.redirect(`/login?error=${error}`)
    }

    next()
})

router.get("/", Controller.home)




module.exports = router