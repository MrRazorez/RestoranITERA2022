var fireDB = require('firebase/database');
var fireStorage = require('firebase/storage');
var config = require('../config-firebase');
var db = fireDB.getDatabase(config);
var storage = fireStorage.getStorage(config);
var path = require('path');

async function getMenu(req, res, next) {
    try {
        var dbGet = await fireDB.get(fireDB.child(fireDB.ref(db), "menu"));
        res.status(200).json({menu: dbGet.val()});
    } catch (error) {
        res.status(400).json({status: error});
    }
}

async function getSpecMenu(req, res, next) {
    try {
        var dbGet = await fireDB.get(fireDB.child(fireDB.ref(db, 'menu'), req.params['uid']));
        res.status(200).json({menu: dbGet.val()});
    } catch (error) {
        res.status(400).json({status: error});
    }
}

async function insertMenu(req, res, next) {
    try {
        var file = req.files.foto;
        var allowedType = ['.png','.jpg','.jpeg'];
        var ext = path.extname(file.name);
        var fileName = file.md5 + ext;

        if(!allowedType.includes(ext.toLowerCase())) {
            res.status(415).json({status: "Invalid Images"});
            return;
        };

        if(file.size > 5000000) {
            res.status(416).json({status: "Image must be less than 5 MB"});
            return;
        };

        await fireStorage.uploadBytes(fireStorage.ref(storage, 'foto/'+fileName), file.data);
        
        var fotoRef = '';
        await fireStorage.getDownloadURL(fireStorage.ref(storage, 'foto/'+fileName)).then(
            (url) => {
                fotoRef = String(url);
            }
        );

        await fireDB.push(fireDB.ref(db, 'menu'), {
            nama: req.body.nama,
            jenis: req.body.jenis,
            harga: Number(req.body.harga),
            foto: fileName,
            ref: fotoRef
        });

        res.status(201).json({status: "Berhasil"});
    } catch (error) {
        res.status(400).json({status: error});
    }
}

async function updateMenu(req, res, next) {
    try {
        var fotoName = '';
        var fotoRef = '';

        if (req.files) {
            var file = req.files.updatefoto;
            var allowedType = ['.png','.jpg','.jpeg'];
            var ext = path.extname(file.name);
            var fileName = file.md5 + ext;

            if(!allowedType.includes(ext.toLowerCase())) {
                res.status(415).json({status: "Invalid Images"});
                return;
            };

            if(file.size > 5000000) {
                res.status(416).json({status: "Image must be less than 5 MB"});
                return;
            };

            fireStorage.deleteObject(fireStorage.ref(storage, 'foto/'+req.body.foto));
            
            await fireStorage.uploadBytes(fireStorage.ref(storage, 'foto/'+fileName), file.data);
            
            await fireStorage.getDownloadURL(fireStorage.ref(storage, 'foto/'+fileName)).then(
                (url) => {
                    fotoRef = String(url);
                }
            );

            fotoName = fileName;
        } else {
            fotoRef = req.body.ref;
            fotoName = req.body.foto;
        }

        var updates = {};
        updates[req.params['uid']] = {
            nama: req.body.nama,
            jenis: req.body.jenis,
            harga: Number(req.body.harga),
            foto: fotoName,
            ref: fotoRef
        };
        fireDB.update(fireDB.ref(db, 'menu'), updates);

        res.status(201).json({status: "Berhasil"});
    } catch (error) {
        res.status(400).json({status: error});
    }
}

async function deleteMenu(req, res, next) {
    try {
        fireDB.set(fireDB.ref(db, 'menu/'+req.params['uid']), null);
        fireStorage.deleteObject(fireStorage.ref(storage, 'foto/'+req.params['foto']));
        res.status(202).json({status: "Berhasil"});
    } catch (error) {
        res.status(400).json({status: error});
    }
}

module.exports = {
    getMenu,
    getSpecMenu,
    insertMenu,
    updateMenu,
    deleteMenu
}