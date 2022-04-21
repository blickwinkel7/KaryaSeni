"use strict"

const { User, Profile, Art, Transaction } = require("../models")
const { formatedCurrency, formatedStatus } = require("../helpers/formated")
const bcrypt = require("bcryptjs")
const { redirect } = require("express/lib/response")
const sendEmail = require("../helpers/nodemailer")
const transaction = require("../models/transaction")


class Controller {
    static readArts(req, res) {
        Art.findAll({
            where: {
                status: false
            }
        })
            .then((data) => {
                return res.render("art", { data, formatedCurrency, formatedStatus })
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
                return res.render("profile", {user, transaction})
            })
            .catch(err => res.send(err))
    }

    //GET CREATE TABEL ARTS
    static formArt(req, res) {
        return res.render("arts-form", { errors: {}, newArt: {} })
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
                res.redirect("/")
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

    static getEditArts(req, res) {
        const { id } = req.params
        Art.findOne({ where: { id: id } })
            .then((data) => {
                return res.render("edit-arts", { data, errors: {} })
            })
            .catch(err => res.send(err))
    }

    static updateArt(req, res) {
        const { id } = req.params
        const { name, author, price, description, imageUrl } = req.body
        const editArt = {
            name,
            author,
            price,
            description,
            imageUrl
        }
        Art.update(editArt, {
            where:{
                id:id
            }
        })
        .then(() => {
            res.redirect("/")
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
                return res.render("arts-form", { errors })
            }
            res.send(err)
        })
    }

    static buyArt(req, res) {
        Art.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(art => {
                console.log(art)
                return Transaction.create({
                    price: art.price,
                    UserId: req.session.userId,
                    ArtId: req.params.id
                })
            })
            .then(result => {
                Art.update({
                    status: true
                }, {
                    where: {
                        id: result.ArtId
                    }
                })
            })
            .then(result2 => {
                res.redirect("/")
            })
            .catch(err => {
                res.send(err)
            })
    }

    static deleteArt(req, res) {
        const id = req.params.id
        Art.deleteArt(id)
            .then(result => {
                return res.redirect("/")
            })
            .catch(err => res.send(err))
    }
}

module.exports = Controller