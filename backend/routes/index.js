var express = require('express');
var router = express.Router();

var { getDatabase, ref, onValue, push } = require('firebase/database');
var firebase = require('../config-firebase');
var db = getDatabase(firebase);

var menu = ref(db, 'menu');

router.get('/', function(req, res, next) {
  res.status(200).json({
    title: "Syran Resto"
  });
});

router.get('/menu', function(req, res, next) {
  try {
    var data = [];
    onValue(menu, async (snap) => {
      await data.push(snap.val());
    }, (error) => {
      res.status(404).json({status: error});
    });

    if (data[0] != null) {
      res.status(200).json({menu: data[0]});
    } else {
      res.status(404).json({status: "Sedang menyiapkan data...."});
    }
  } catch (error) {
    res.status(404).json({status: error});
  }
})

router.post('/order', function(req, res, next) {
  try {
    console.log(req.body.order);
    if (req.body.order.nama !== '' && req.body.order.data !== null) {
      var order = ref(db, 'transaksi');
      push(order, req.body.order);
      res.status(200).json({status: "Data berhasil masuk"});
    } else {
      res.status(403).json({status: "Masukkan data yang kosong!"});
    }
  } catch (error) {
    res.status(404).json({status: error});
  }
})

module.exports = router;
