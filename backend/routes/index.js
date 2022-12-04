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
    res.status(400).json({status: error});
  }
});

router.get('/menu/:uid', function(req, res, next) {
  try {
    (async () => {
      res.status(200).json({menu: await menuControlled.getSpecMenu(req.params['uid'])});
    })(null);
  } catch (error) {
    res.status(400).json({status: error});
  }
});

router.post('/menu', function(req, res, next) {
  try {
    menuControlled.insertMenu(req);
    res.status(201).json({status: "Berhasil"});
  } catch (error) {
    res.status(400).json({status: error});
  }
});

router.put('/menu/:uid', function(req, res, next) {
  try {
    menuControlled.updateMenu(req);
    res.status(201).json({status: "Berhasil"});
  } catch (error) {
    res.status(400).json({status: error});
  }
});

router.delete('/menu/:uid/:foto', function(req, res, next) {
  try {
    menuControlled.deleteMenu(req.params['uid'], req.params['foto']);
    res.status(201).json({status: "Berhasil"});
  } catch (error) {
    res.status(400).json({status: error});
  }
});

module.exports = router;
