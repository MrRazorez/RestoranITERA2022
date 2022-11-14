var { getDatabase, ref, child, get, set, push, update } = require('firebase/database');
var { getStorage } = require('firebase/storage');
var firebase = require('../config-firebase');
var db = getDatabase(firebase);
var storage = getStorage(firebase);

class menuController {
    constructor() {
        this.menu = [];
        this.getMenu();
    }

    async getMenu() {
       var dbGet = await get(child(ref(db), "menu"));

       this.menu = dbGet.val();
    }

    async getSpecMenu(uid) {
        var dbGet = await get(child(ref(db, 'menu'), uid));

        return dbGet.val();
    }

    insertMenu(data) {
        push(ref(db, 'menu'), {
            nama: data.nama,
            jenis: data.jenis,
            harga: Number(data.harga)
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
        update(ref(db, 'menu'), updates);

        this.getMenu();
    }

    deleteMenu(uid) {
        set(ref(db, 'menu/'+uid), null);
        this.getMenu();
    }
}

module.exports = menuController;