"use strict"

function formatedCurrency (price){

    return `Rp. ${price.toLocaleString('id-ID')},00`
}

function formatedStatus(status){
    if(status === true){
        return 'Sold'
    } else {
        return 'Available'
    }
}

module.exports = {
    formatedCurrency, 
    formatedStatus
}