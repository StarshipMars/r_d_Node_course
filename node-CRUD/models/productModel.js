let products = require('../data/products')

const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id === id)
        resolve(product)
    })
}

function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id)
        products[index] = {id, ...product}
        resolve(products[index])
    })
}


function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {id: products.length + 1 + '', ...product}
        products.push(newProduct)
        writeDataToFile('./data/products.json', products);
        resolve(newProduct)
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((p) => p.id !== id)
        resolve()
    })
}

module.exports = {findAll , create, findById, update, remove}