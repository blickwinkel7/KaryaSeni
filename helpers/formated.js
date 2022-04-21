"use strict"

function formatedCurrency (price){

    return `Rp. ${price.toLocaleString('id-ID')},00`
}

function formatedStatus(status){

    if(status === false){
        return 'Available'
    } else {
        return 'sold'
    }
}

module.exports = {
    formatedCurrency, 
    formatedStatus
}