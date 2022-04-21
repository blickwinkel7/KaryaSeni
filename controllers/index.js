"use strict"
const { User, Profile, Art, Transaction } = require("../models")
const formatedCurrency = require("../helpers/formated")

class Controller {
    static readArts(req, res) {
        Art.findAll()
            .then((data) => {
                res.render("art", { data, formatedCurrency })
            })
            .catch(err => res.send(err))

    }
}

module.exports = Controller