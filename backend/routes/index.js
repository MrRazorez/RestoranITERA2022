var express = require('express');
var router = express.Router();

var menuController = require('../controllers/menuController');
var menuControlled = new menuController();

router.get('/', function(req, res, next) {
  res.status(200).json({
    title: "Syran Resto"
  });
});

router.get('/menu', function(req, res, next) {
  try {
    menuControlled.getMenu();
    res.status(200).json({menu: menuControlled.menu});
  } catch (error) {
    res.status(404).json({status: error});
  }
});

router.get('/menu/:uid', function(req, res, next) {
  try {
    (async () => {
      res.status(200).json({menu: await menuControlled.getSpecMenu(req.params['uid'])});
    })(null);
  } catch (error) {
    res.status(404).json({status: error});
  }
});

router.post('/addmenu', function(req, res, next) {
  try {
    menuControlled.insertMenu(req.body);
    res.status(200).json({status: "Berhasil"});
  } catch (error) {
    res.status(404).json({status: error});
  }
});

router.put('/updatemenu/:uid', function(req, res, next) {
  try {
    menuControlled.updateMenu(req.params['uid'], req.body);
    res.status(200).json({status: "Berhasil"});
  } catch (error) {
    res.status(404).json({status: error});
  }
});

router.delete('/deletemenu/:uid', function(req, res, next) {
  try {
    menuControlled.deleteMenu(req.params['uid']);
    res.status(200).json({status: "Berhasil"});
  } catch (error) {
    res.status(404).json({status: error});
  }
});

module.exports = router;
