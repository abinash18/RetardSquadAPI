now = new Date;
const userModel = require('../../models');
const User = require('../../models/User');
const TradeMark = require('../../models/TradeMarks');
const Skins = require('../../models/Skins');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const pathRoutes = require('../../models/pathRoutes');
const sha256 = require('sha256');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
bodyParser.json();
const session = require('express-session');
const Cryptr = require('cryptr');
var cryptr = new Cryptr(process.env.AES_256_KEY);
const publicIp = require('public-ip');
var request = require("request");
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
const multer = require('multer');
const checkAuth = require('../../middleware/auth/check-auth');
exports.getTime = (req, res) => {
    console.log("##########################################################".red);
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    // console.log(now + " " + ip .red);
    // res.send(now + ip + "Hello");
    res.send(now + " " + ip);
    log(ip);
    console.log("##########################################################".red);
};

module.exports.getIp = (req, res) => {
    var ip;

    // var options = {
    //     method: 'GET',
    //     url: 'http://bot.whatismyipaddress.com/',
    // };

    // request(options, function (error, response, body) {
    //     if (error) {
    //         console.log(error);
    //         return res.status(500).json({
    //             err: "Internal Server Error",
    //             raw: error
    //         });
    //     };

    //     ip = body;

    //     console.log(body);
    // });

    var options = {
        method: 'GET',
        url: 'http://bot.whatismyipaddress.com/'
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return res.send(body);
        console.log(body);
    });

    // console.log(now + " " + ip .red);
    // res.send(now + ip + "Hello");
    
    log(ip);
};

module.exports.getPages = (req, res) => {
    var admin = false;
    var t = req.cookies['token'];
    if (t) {
        var t = req.cookies['token'];
        if (t) {
            var token = cryptr.decrypt(t);
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.userData = decoded;
            if (req.userData.admin) {
                admin = true;
            } else {
                admin = false;
            }
        } else if (req.session.admin) {
            admin = true;
        } else {
            admin = false;
        };
    }
    if (admin) {
        pathRoutes.find({}, (err, docs) => {
            if (err) {
                console.log(err);
                return res.status(200).json({
                    msg: 'Internal Server Error',
                    err: {
                        code: 500,
                        error: err
                    }
                })
            };
            if (docs[0] != null) {
                res.status(200).json({
                    sitemap: {
                        paths: docs
                    },
                    code: 200
                });
            } else {
                return res.status(200).json({
                    msg: 'No Routes'
                });
            };
        });
    } else {
        pathRoutes.find({
            admin: false
        }, (err, docs) => {
            if (err) {
                console.log(err);
                return res.status(200).json({
                    msg: 'Internal Server Error',
                    err: {
                        code: 500,
                        error: err
                    }
                })
            };
            if (docs[0] != null) {
                return res.status(200).json({
                    sitemap: {
                        paths: docs,
                        code: 200
                    }
                });
            } else {
                return res.status(200).json({
                    msg: 'No Routes'
                });
            };
        });
    }


};

module.exports.addPages = (req, res) => {
    const pathData = {
        _id: mongoose.Types.ObjectId(),
        route: req.body.route,
        name: req.body.name,
        admin: req.body.adminPage
    };
    console.log(req.body.route);
    pathRoutes.findOne({
        route: pathData.route
    }, (err, doc) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                msg: 'Internal Server Error',
                err: {
                    code: 500,
                    error: err
                }
            })
        };
        if (doc) {
            return res.status(200).json({
                msg: 'Route Exists',
                code: 401
            });
        } else {
            pathRoutes.create(pathData, (err, succ) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        msg: 'Internal Server Error',
                        err: {
                            code: 500,
                            error: err
                        }
                    });
                };
                if (succ) {
                    console.log(succ);
                    return res.status(200).json({
                        msg: 'Route Created',
                        code: 200,
                        raw: succ
                    });
                } else {
                    return res.status(500).json({
                        msg: 'Internal Server Error',
                        err: {
                            code: 500,
                            error: err
                        }
                    });
                }
            });
        };
    });
}

module.exports.deletePage = (req, res) => {
    var id = req.body.id;

    pathRoutes.findById({
        _id: id
    }, (err, doc) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                msg: 'Internal Server Error',
                err: {
                    code: 500,
                    error: err
                }
            })
        };

        if (doc) {
            pathRoutes.deleteOne({
                _id: doc._id
            }, (err, succ) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        msg: 'Internal Server Error',
                        err: {
                            code: 500,
                            error: err
                        }
                    })
                };
                if (succ) {
                    console.log(succ);
                    return res.status(200).json({
                        msg: 'Route Deleted',
                        code: 200,
                        raw: succ
                    });
                } else {
                    return res.status(500).json({
                        msg: 'Internal Server Error',
                        err: {
                            code: 500,
                            error: err
                        }
                    });
                }
            })
        } else {

        }

    });

}