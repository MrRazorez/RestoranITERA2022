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

        res.status(200).json({customer: spray.customer, order: spray.value});
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

async function reporter(req, res, next) {
    try {
        var dbGet = await fireDB.get(fireDB.child(fireDB.ref(db), "report"));

        res.status(200).json({report: dbGet.val()});
    } catch (error) {
        res.status(400).json(error);
    }
}

async function assignOrder(req, res, next) {
    try {
        var { uid, customer, total, pay, charge } = req.body;
        const date = new Date();

        await fireDB.push(fireDB.ref(db, 'report'), {
            customer, total, pay, charge,
            date: date.toLocaleDateString("id-ID")
        });

        await fireDB.set(fireDB.ref(db, 'order/'+uid), null);

        res.status(201).json({msg: "Laporan telah terekam!"});        
    } catch (error) {
        res.status(404).json({msg: "GAGAL!"});
    }
}

module.exports = {
    getOrder,
    getSpecOrder,
    sendOrder,
    reporter,
    assignOrder
}