"use strict"

const { User, Profile, Art, Transaction } = require("../models")
const formatedCurrency = require("../helpers/formated")
const bcrypt = require("bcryptjs")
const { redirect } = require("express/lib/response")
const sendEmail = require("../helpers/nodemailer")


class Controller {
    static readArts(req, res) {
        Art.findAll()
            .then((data) => {
                res.render("art", { data, formatedCurrency })
            })
            .catch(err => res.send(err))
    }

    static registerForm(req, res) {
        res.render("auth-pages/register-form")
    }

    static postRegister(req, res) {
        const { userName, email, password, isSeller } = req.body
        User.create({ userName, email, password, isSeller })
            .then(newUser => {
                sendEmail(email, userName)
                res.redirect("/login")
            })
            .catch(err => res.send(err))
    }

    static loginForm(req, res) {
        const { error } = req.query
        res.render("auth-pages/login-form", { error })
    }

    static postLogin(req, res) {
        const { userName, password } = req.body

        User.findOne({ where: { userName } })
            .then(user => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password)

                    if (isValidPassword) {
                        return redirect("/")
                    } else {
                        const error = "Invalid username / password"
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = "Invalid username / password"
                    return res.redirect(`/login?error=${error}`)
                }
            })
            .catch(err => res.send("aasdd"))
    }

    static home(req, res) {
        res.send("Login success")
    }
}

module.exports = Controller