const Menu = require('../models/menuModel');

exports.findAll = (req, res) => {
    Menu.find({})
        .then(menus => {
            res.send(menus);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving menus."
            })
        })
}