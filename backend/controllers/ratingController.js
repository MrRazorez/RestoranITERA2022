var fireDB = require('firebase/database');
var config = require('../config-firebase');
var db = fireDB.getDatabase(config);

async function getFeedback(req, res, next) {
    try {
        var dbGet = await fireDB.get(fireDB.child(fireDB.ref(db), "feedback"));
        const value = dbGet.val();
        const key = Object.keys(value);

        var feedback = [];

        for (let i in key) {
            feedback.push(value[key[i]]);
        }

        res.status(200).json({feedback: feedback});
    } catch (error) {
        res.status(400).json({status: error});
    }
}

async function sendFeedback(req, res, next) {
    const { desc, rating } = req.body;

    if (desc && rating) {
        await fireDB.push(fireDB.ref(db, 'feedback'), {
            desc, rating
        });
        res.status(201).json({msg: "Terima kasih sudah memberikan saran dan kritik anda! Semoga kedepan kami akan memperbaiki dengan sebaik mungkin!"});
    } else {
        res.status(412).json({msg: "Data belum lengkap!"});
    }
}

module.exports = {
    getFeedback,
    sendFeedback
}