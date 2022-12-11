var fireDB = require('firebase/database');
var config = require('../config-firebase');
var db = fireDB.getDatabase(config);

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

async function Login(req, res, next) {
    const { email, password } = req.body;

    try {
        var dbGet = await fireDB.get(fireDB.child(fireDB.ref(db), "users/user1"));
        var user = dbGet.val();

        if (email !== user.email) {
            res.status(401).json({status: "Email tidak ditemukan!!!"});
            return;
        }

        const match = bcrypt.compare(password, user.password);

        if (!match) {
            res.status(401).json({status: "Password Salah!!!"});
            return;
        }

        var userId = "user1";
        var userName = user.name;
        var userEmail = user.email;

        const token = jwt.sign({userId, userName, userEmail}, "fbe0e8cc3c0334c186f871402686b2ee");

        var updates = {};
        updates["jwt"] = { token };
        fireDB.update(fireDB.child(fireDB.ref(db), "users/user1"), updates);

        res.status(201).json({token});
    } catch (error) {
        res.status(404).json({status: "ERROR"});
    }
}

async function Tokens(req, res, next) {
    const { token } = req.body;

    if (!token) {
        res.sendStatus(401);
        return;
    }

    try {
        var dbGet = await fireDB.get(fireDB.child(fireDB.ref(db), "users/user1"));
        var user = dbGet.val();

        if (token !== user.jwt.token) {
            res.sendStatus(403);
            return;
        }
        jwt.verify(token, "fbe0e8cc3c0334c186f871402686b2ee", (error) => {
            if (error) {
                res.sendStatus(403);
                return;
            }

            res.sendStatus(202);
        })
    } catch (error) {
        res.sendStatus(404);
    }
}

async function Logout(req, res, next) {
    const { token } = req.body;

    if (!token) {
        res.sendStatus(401);
        return;
    }

    try {
        var dbGet = await fireDB.get(fireDB.child(fireDB.ref(db), "users/user1"));
        var user = dbGet.val();

        if (token !== user.jwt.token) {
            res.sendStatus(403);
            return;
        }
        fireDB.set(fireDB.child(fireDB.ref(db), "users/user1/jwt"), null);
        res.sendStatus(202);
    } catch (error) {
        res.sendStatus(404);
    }
}

module.exports = {
    Login,
    Tokens,
    Logout
}