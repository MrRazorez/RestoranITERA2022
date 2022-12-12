var express = require('express');
var router = express.Router();

var menuController = require('../controllers/menuController');

router.get('/', function(req, res, next) {
  res.status(200).json({
    title: "Syran Resto"
  });
});

router.get('/menu', menuController.getMenu);
router.get('/menu/:uid', menuController.getSpecMenu);
router.post('/menu', menuController.insertMenu);
router.put('/menu/:uid', menuController.updateMenu);
router.delete('/menu/:uid/:foto', menuController.deleteMenu);


module.exports = router;