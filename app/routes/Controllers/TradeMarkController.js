const userModel = require('../../models');
const User = require('../../models/User');
const TradeMark = require('../../models/TradeMarks');
const Skins = require('../../models/Skins');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sha256 = require('sha256');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
bodyParser.json();
const session = require('express-session');
const Cryptr = require('cryptr');
var cryptr = new Cryptr(process.env.AES_256_KEY);

const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
const multer = require('multer');
const checkAuth = require('../../middleware/auth/check-auth');
module.exports.submittm = (req, res, next) => {
    console.log("Submit Trade Mark: ".black.bgRed);
    var SkinName = req.body.name;
    var SkinId = req.body.id;
    var backBling = req.body.backBling;
    var cape = req.body.cape;
    var username = req.body.username;
    var pickaxe = req.body.pickaxe;
    var ign = req.body.ign;
    var imagePreview = req.body.prev;
    var rarity = req.body.rarity;
    var season = req.body.season;
    var tier = req.body.tier;
    var chall = req.body.chall;

    tmb = req.userData.dbId;
    if (!SkinId) {
        return res.status(200).json({
            raw: "No Data Specified",
        });
    };
    options = {
        _id: SkinId
    };
    Skins.findById({
        _id: SkinId
    }, (err, doc) => {
        console.log(doc);
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: err
            });
        };
        if (doc) {
            if (doc.trademarked == false) {
                Skins.update({
                        _id: doc._id
                    }, {
                        trademarked: true,
                        tradeMarkedBy: tmb
                    },
                    (err, result) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                error: err
                            });
                        };
                        console.log("Skin Trade Marked: ".bgGreen.black + doc._id + " By: ".bgGreen.black + tmb);
                        return res.status(200).json({
                            ms: 'Trade Mark Succ',
                            raw: doc
                        });
                    });
            } else {
                return res.status(200).json({
                    ms: 'Skin Already Trade Marked',
                    raw: doc,
                    tmBy: doc.tradeMarkedBy
                });
            };

        } else {
            return res.status(200).json({
                ms: 'Skin Not Found',
                error: err
            });
        };
    });

};

module.exports.updateSkin = (req, res, next) => {

};

module.exports.submitSkin = (req, res, next) => {
    console.log("Submit Skin: ".black.bgRed);
    var SkinName = req.body.name;
    var backBling = req.body.backBling;
    var cape = req.body.cape;
    var username = req.body.username;
    var pickaxe = req.body.pickaxe;
    var ign = req.body.ign;
    var imagePreview = req.body.prev;
    var rarity = req.body.rarity;
    var season = req.body.season;
    var tier = req.body.tier;
    var chall = req.body.chall;


    const skinData = {
        _id: new mongoose.Types.ObjectId(),
        name: SkinName,
        imagePreview: imagePreview,
        skinSeason: season,
        rarity: rarity,
        tier: tier,
        challenges: chall
    };

    console.log(req.body)
    Skins.findOne({
        name: SkinName
    }, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: err
            });
        };
        if (result) {
            return res.status(404).json({
                ms: "Skin Already Exists",
            });
        } else {
            Skins.create(skinData, (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: err
                    });
                }
                return res.status(200).json({
                    ms: "Skin Created",
                    raw: doc
                });
            });
        };
    });
};
module.exports.gettrademarks = (req, res, next) => {
    console.log("Get Trade Marks: ".black.bgRed);
    var SkinName = req.body.name;
    var backBling = req.body.backBling;
    var cape = req.body.cape;
    var username = req.body.username;
    var pickaxe = req.body.pickaxe;
    var ign = req.body.ign;
    var imagePreview = req.body.prev;
    var rarity = req.body.rarity;
    var season = req.body.season;
    var tier = req.body.tier;
    var chall = req.body.chall;
    var t = req.cookies['token'];



    Skins.find({
        trademarked: true
    }, (err, docs) => {
        if (err) return res.status(200).json({
            error: err,
        });
        return res.status(200).json({
            ms: 'Trade Marks',
            skins: docs
        });

    });

};
module.exports.getskinsnottrademarked = (req, res, next) => {
    console.log("Get Skins: ".black.bgRed);
    // var SkinName = req.body.name;
    // var backBling = req.body.backBling;
    // var cape = req.body.cape;
    // var username = req.body.username;
    // var pickaxe = req.body.pickaxe;
    // var ign = req.body.ign;
    // var imagePreview = req.body.prev;
    // var rarity = req.body.rarity;
    // var season = req.body.season;
    // var tier = req.body.tier;
    // var chall = req.body.chall;

    Skins.find({
        trademarked: false
    }, (err, docs) => {
        if (err) return res.status(200).json({
            error: err,
        });
        return res.status(200).json({
            ms: 'Skins',
            skins: docs
        })
    });
};

module.exports.getskins = (req, res, next) => {
    console.log("Get Skins: ".black.bgRed);
    var SkinName = req.body.name;
    var backBling = req.body.backBling;
    var cape = req.body.cape;
    var username = req.body.username;
    var pickaxe = req.body.pickaxe;
    var ign = req.body.ign;
    var imagePreview = req.body.prev;
    var rarity = req.body.rarity;
    var season = req.body.season;
    var tier = req.body.tier;
    var chall = req.body.chall;



    Skins.find({}, (err, docs) => {
        if (err) return res.status(200).json({
            error: err,
        });
        return res.status(200).json({
            ms: 'Skins',
            skins: docs
        });
    });
};
module.exports.skinById = (req, res) => {
    console.log("Get skin".black.bgRed);
    const dbid = req.query.s;
    console.log(req.query.s);
    const details = {
        _id: dbid
    };
    Skins.findById(details, (err, result) => {
        console.log("Result:".bgMagenta.black + result);
        if (result) {
            console.log("DbID:".bgGreen.black + result._id);
            return res.status(200).json({
                raw: result
            });

        } else {
            if (err) console.log("Error:".bgRed.black + err);
            if (result) console.log("Result:".bgMagenta.black + result);
            res.status(404).json({
                message: "Profile Not Found"
            });
        };
    });
};

// docs.map(doc => {
//     return {
//         name: doc.name,
//         id: doc._id,
//         tmb: doc.tradeMarkedBy,
//         tm: doc.trademarked,
//         imagePreview: doc.imagePreview
//     }
module.exports.updateSkin = (req, res, next) => {
    console.log("Submit Skin: ".black.bgRed);
    var SkinName = req.body.name;
    var backBling = req.body.backBling;
    var cape = req.body.cape;
    var username = req.body.username;
    var pickaxe = req.body.pickaxe;
    var ign = req.body.ign;
    var imagePreview = req.body.prev;
    var rarity = req.body.rarity;
    var season = req.body.season;
    var tier = req.body.tier;
    var chall = req.body.chall;


    const skinData = {
        _id: new mongoose.Types.ObjectId(),
        name: SkinName,
        imagePreview: imagePreview,
        skinSeason: season,
        rarity: rarity,
        tier: tier,
        challenges: chall
    };


    Skins.findOne({
        name: SkinName
    }, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: err
            });
        };
        if (result) {
            return res.status(404).json({
                ms: "Skin submit no succ",
            });
        } else {
            Skins.create(skinData, (err, doc) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: err
                    });
                }
                return res.status(200).json({
                    ms: "Skin Submit succ",
                    raw: doc
                });
            });
        };
    });
};