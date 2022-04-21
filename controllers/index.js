"use strict"

const { User, Profile, Art, Transaction } = require("../models")
const { formatedCurrency, formatedStatus } = require("../helpers/formated")
const bcrypt = require("bcryptjs")
const { redirect } = require("express/lib/response")
const sendEmail = require("../helpers/nodemailer")


class Controller {
    static readArts(req, res) {
        Art.findAll()
            .then((data) => {
                res.render("art", { data, formatedCurrency, formatedStatus })
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
        User.findOne({
            where: { userName: userName }
        })
            .then(user => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password)

                    if (isValidPassword) {
                        req.session.userId = user.id
                        req.session.role = user.isSeller
                        return res.redirect("/arts")
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
        res.render("home")
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

    //GET CREATE TABEL ARTS
    static formArt(req, res) {
        res.render("arts-form", { errors: {}, newArt: {} })
    }

    static createArt(req, res) {
        const { name, author, price, description, imageUrl } = req.body
        const newArt = {
            name,
            author,
            price,
            description,
            imageUrl
        }
        Art.create(newArt, {
            individualHooks: true
        })
            .then(() => {
                res.redirect("/arts")
            })
            .catch(err => {
                if (err.name == 'SequelizeValidationError') {
                    const errors = {}
                    err.errors.forEach(el => {
                        if (errors[el.path]) {
                            errors[el.path].push(el.message)
                        } else {
                            errors[el.path] = [el.message]
                        }
                    })
                    return res.render("arts-form", { errors, newArt })
                }
                res.send(err)
            })
    }
}

module.exports = Controller