"use strict"

function formatedCurrency (price){

    return price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
}

module.exports = formatedCurrency