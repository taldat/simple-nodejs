const express = require('express')
const { create, update, destroy, get } = require('./controller')

module.exports = function(app) {
    
    const router = express.Router()
    
    router.get('/', get)
    router.post('/create', create)
    router.patch('/update/:id', update)
    router.delete('/delete/:id', destroy)

    app.use('/', router)
}