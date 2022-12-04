var fireDB = require('firebase/database');
var fireStorage = require('firebase/storage');
var config = require('../config-firebase');
var db = fireDB.getDatabase(config);
var storage = fireStorage.getStorage(config);
var path = require('path');

class menuController {
    constructor() {
        this.menu = [];
        this.getMenu();
    }

    async getMenu() {
       var dbGet = await fireDB.get(fireDB.child(fireDB.ref(db), "menu"));

       this.menu = dbGet.val();
    }

    async getSpecMenu(uid) {
        var dbGet = await fireDB.get(fireDB.child(fireDB.ref(db, 'menu'), uid));

        return dbGet.val();
    }

    async insertMenu(req) {
        var file = req.files.foto;
        var allowedType = ['.png','.jpg','.jpeg'];
        var ext = path.extname(file.name);
        var fileName = file.md5 + ext;

        if(!allowedType.includes(ext.toLowerCase())) {
            console.log("Invalid Images");
            return;
        };

        if(file.size > 5000000) {
            console.log("Image must be less than 5 MB");
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

        this.getMenu();
    }

    async updateMenu(req) {
        var fotoName = '';
        var fotoRef = '';

        if (req.files) {
            var file = req.files.updatefoto;
            var allowedType = ['.png','.jpg','.jpeg'];
            var ext = path.extname(file.name);
            var fileName = file.md5 + ext;

            if(!allowedType.includes(ext.toLowerCase())) {
                console.log("Invalid Images");
                return;
            };

            if(file.size > 5000000) {
                console.log("Image must be less than 5 MB");
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

        this.getMenu();
    }

    deleteMenu(uid, fileName) {
        fireDB.set(fireDB.ref(db, 'menu/'+uid), null);
        fireStorage.deleteObject(fireStorage.ref(storage, 'foto/'+fileName));
        this.getMenu();
    }
}

module.exports = menuController;