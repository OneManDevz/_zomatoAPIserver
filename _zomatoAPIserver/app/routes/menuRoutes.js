module.exports = (app) => {
    const menus = require('../controllers/menuController.js');

    app.get('/menus', menus.findAll);
}
