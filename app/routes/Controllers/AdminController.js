const userModel = require('../../models');
const User = require('../../models/User');
const TradeMark = require('../../models/TradeMarks');
const Skins = require('../../models/Skins');
const bcrypt = require('bcrypt');
const AdminCodes = require('../../models/AdminCodes');
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

module.exports.registerAdmin = (req, res, next) => {
    var userCode = req.body.code;
    if (req.userData.admin == false) {
        AdminCodes.findOne({
            avalible: true,
            code: userCode
        }, (err, doc) => {
            if (err) return res.status(401).json({
                ms: 'Code UnAutherized',
                error: err
            });
            if (doc) {
                AdminCodes.update({
                    _id: doc._id
                }, {
                    avalible: false,
                    issuedTo: req.userData.dbId
                }, (err, result) => {
                    if (err) return res.status(500).json({
                        error: err
                    });
                    if (result) {
                        User.update({
                            _id: req.userData.dbId
                        }, {
                            admin: true,
                            roles: "admin"
                        }, (err, resultofu) => {
                            const payLoad = {
                                email: resultofu.email,
                                username: resultofu.username,
                                role: resultofu.roles,
                                profileid: resultofu.profileid,
                                dbId: resultofu.dbId,
                                admin: true
                            };
                            const options = {
                                expiresIn: "1h"
                            };
                            const cookieParams = {
                                expiresIn: '1h',
                                httpOnly: false,
                                path: '/'
                            };
                            const clientToken = jwt.sign(payLoad, process.env.JWT_KEY, options);
                            console.log("User Logged In: ".bgGreen.black + resultofu.username);
                            const user = {
                                username: resultofu.username,
                                email: resultofu.email,
                                profileId: resultofu.profileid,
                                dbId: resultofu.dbId
                            };
                            console.log("TOKEN: ".bgRed.black + clientToken);
                            var t = cryptr.encrypt(clientToken);
                            console.log("Ecrypted token: ".black.bgRed + t);
                            res.cookie('token', t, cookieParams);
                            res.cookie('user', user, cookieParams);
                            re.session.admin = true;
                            res.status(200).json({
                                status: "200",
                                raw: resultofu,
                                m: "s"
                            });
                        });
                    } else {
                        return res.status(401).json({
                            ms: 'UnAutherized Code',
                            code: req.body.code,
                            raw: {
                                issuedTo: req.userData.dbId
                            }
                        });
                    };
                });

            } else {
                return res.status(401).json({
                    ms: 'UnAutherized Code',
                    code: req.body.code,
                    raw: {
                        issuedTo: req.userData.dbId
                    }
                });
            };
        });
    } else {
        return res.status(500).json({
            ms: 'Already Admin',
            code: req.body.code
        });
    };
};

module.exports.registerCode = (req, res, next) => {

    var userCode = req.body.code;

    AdminCodes.findOne({
        code: userCode
    }, (err, doc) => {
        if (err) return res.status(200).json({
            ms: 'Code UnAutherized',
            error: err
        });
        if (doc) {
            return res.status(200).json({
                ms: 'Code Un-Autherized',
                error: err
            });
        } else {
            AdminCodes.create({
                    _id: mongoose.Types.ObjectId(),
                    code: userCode
                },
                (err, result) => {
                    if (err) return res.status(200).json({
                        ms: 'Error',
                        error: err
                    });
                    return res.status(200).json({
                        ms: 'Code Registered',
                        error: err
                    });
                });
        };
    });
};