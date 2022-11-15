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
            foto: fotoRef
        });

        this.getMenu();
    }

    updateMenu(uid, data) {
        var updates = {};
        updates[uid] = {
            nama: data.nama,
            jenis: data.jenis,
            harga: Number(data.harga)
        };
        fireDB.update(fireDB.ref(db, 'menu'), updates);

        this.getMenu();
    }

    deleteMenu(uid) {
        fireDB.set(fireDB.ref(db, 'menu/'+uid), null);
        this.getMenu();
    }
}

module.exports = menuController;