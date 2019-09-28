const Mongoose = require('mongoose');
const moment = require('moment');

const menuSchema = Mongoose.Schema({
    name: String,
    price: String
}, 
{
    collection: 'menu_ruzinov_' + moment().format("MMM Do YY")
})

module.exports = Mongoose.model('Menu', menuSchema);