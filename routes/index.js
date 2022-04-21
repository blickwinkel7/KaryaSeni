"use strict"

const express = require("express")
const router = express.Router()
const Controller = require("../controllers")


// ROUTES ART


// GET REGISTER
router.get("/register", Controller.registerForm)
// POST REGISTER
router.post("/register", Controller.postRegister)

// GET LOGIN
router.get("/login", Controller.loginForm)
// POST LOGIN
router.post("/login", Controller.postLogin)

router.get("/",  Controller.readArts)

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
        return res.redirect(`/login?error=${error}`)
    }

    next()
})

router.get("/logout", Controller.getLogout)

router.get("/profile", Controller.profile)
router.get("/arts/add", isSeller, Controller.formArt)
router.post("/arts/add", Controller.createArt)
router.get("/arts/:id/edit", isSeller, Controller.getEditArts)
router.post("/arts/:id/edit",  Controller.updateArt)
router.get("/arts/:id/buy",  Controller.buyArt)
router.get("/arts/:id/delete", isSeller, Controller.deleteArt)





module.exports = router