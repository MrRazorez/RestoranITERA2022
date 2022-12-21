var fireDB = require('firebase/database');
var config = require('../config-firebase');
var db = fireDB.getDatabase(config);

async function getOrder(req, res, next) {
    try {
        var dbGet = await fireDB.get(fireDB.child(fireDB.ref(db), "order"));
        const value = dbGet.val();
        const key = Object.keys(value);

        var store = {};

        for (let i in key) {
            store[key[i]] = value[key[i]].customer;
        }

        res.status(200).json({order: store});   
    } catch (error) {
        res.status(400).json({status: error});
    }
}

async function getSpecOrder(req, res, next) {
    try {
        var dbGet = await fireDB.get(fireDB.child(fireDB.ref(db, "order"), req.params["uid"]));
        const spray = dbGet.val();

        res.status(200).json({order: spray.value});
    } catch (error) {
        res.status(400).json({status: error});
    }
}

async function sendOrder(req, res, next) {
    var { customer, table, value } = req.body;

    if (customer && table && Object.keys(value).length !== 0) {
        await fireDB.push(fireDB.ref(db, 'order'), {
            customer, table, value
        });
        res.status(201).json({msg: "Pesanan telah terkirim!"});
    } else {
        res.status(412).json({msg: "Data belum lengkap!"});
    }
}

module.exports = {
    getOrder,
    getSpecOrder,
    sendOrder
}