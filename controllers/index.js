"use strict"

const { User, Profile, Art, Transaction } = require("../models")
const formatedCurrency = require("../helpers/formated")
const bcrypt = require("bcryptjs")
const { redirect } = require("express/lib/response")
const sendEmail = require("../helpers/nodemailer")
const transaction = require("../models/transaction")


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
        const { userName, email, password, isSeller, firstName, lastName, dateOfBirth, imagerUrl } = req.body
        User.create({ userName, email, password, isSeller })
            .then(newUser => {
                const UserId = newUser.id
                sendEmail(email, userName)
                return Profile.create({firstName, lastName, dateOfBirth, imagerUrl, UserId})
            })
            .then(newProfile => {
                res.redirect("/login")
            })
            .catch(err => res.send(err))
    }

    static loginForm(req, res) {
        const { error } = req.query
        res.render("auth-pages/login-form", { error })
    }

    static postLogin(req, res) {
        const {userName, password} = req.body
        User.findOne({
            where: {userName: userName}
        })
            .then(user => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password)

                    if (isValidPassword) {
                        req.session.userId = user.id
                        req.session.role = user.isSeller
                        return res.redirect("/")
                    } else {
                        const error = "Invalid username / password"
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = "Invalid username / password"
                    return res.redirect(`/login?error=${error}`)
                }
            })
            .catch(err => res.send(err))
    }

    static home(req, res) {
        res.render("home", {id: req.session.userId})
    }

    static getLogout(req, res) {
        req.session.destroy(err => {
            if (err) {
                res.send(err)
            } else {
                res.redirect("/login")
            }
        })
    }

    static profile(req, res) {
        let user
        User.findOne(
            {where: {
                id: req.session.userId
            }, include: [
                {
                    model: Profile
                },
                {
                    model: Transaction,
                    required: false,
                },
            ]
        })
            .then(userData => {
                user = userData
                return Transaction.findAll({
                    where: {
                        UserId: req.session.userId
                    }, include: {
                        model: Art,
                        required: false
                    }
                })
            })
            .then(transaction => {
                res.render("profile", {user, transaction})
            })
            .catch(err => res.send(err))
    }

    static buyArt(req, res) {
        Transaction.create()
    }
}

module.exports = Controller