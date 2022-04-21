"use strict"

function formatedCurrency (price){

    return price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
}

function formatedStatus(status){
    if(status === true){
        return 'Available'
    } else {
        return 'Sold'
    }
}

module.exports = {
    formatedCurrency, 
    formatedStatus
}