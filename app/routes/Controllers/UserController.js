const userModel = require('../../models');
const UserController = {};
const User = require('../../models/User')
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
module.exports.validateregistration = (req, res) => {
    console.log(req.file);
    console.log("validate registration".black.bgRed);
    console.log("##########################################################".red);
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    if (req.body.encodedUsername && req.body.encodedPassword && req.body.encodedEmail) {
        log(ip);

        var buffU = new Buffer(req.body.encodedUsername, 'base64');
        var buffP = new Buffer(req.body.encodedPassword, 'base64');
        var buffE = new Buffer(req.body.encodedEmail, 'base64');
        var Username = buffU.toString('ascii');
        var Pass = buffP.toString('ascii');
        var Email = buffE.toString('ascii');
        bcrypt.hash(Pass, 10, (err, hash) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    message: "failed to hash pass",
                    error: err
                })
            } else {
                var hashPass = hash;
                console.log("Register request for " + "Username: " + Username);
                const userData = {
                    _id: mongoose.Types.ObjectId(),
                    username: Username,
                    password: hashPass,
                    email: Email,
                    profileid: sha256(buffU)
                };
                User.findOne({
                    username: Username,
                    email: Email
                }, (err, resultofcheck) => {
                    if (err) {
                        res.status(500).json({
                            error: "An error has occured"
                        });
                        return console.log(err);
                    };
                    console.log("Result of check: ".bgMagenta.black + resultofcheck);
                    if (resultofcheck) {
                        console.log(Username + " is taken");

                        return res.json({
                            Message: "User taken",
                            Username: userData.username
                        });
                    } else {
                        User.create(userData, function (err, success) {
                            if (err) {
                                res.status(500).json({
                                    err: "Internal Server Error Try again later"
                                });
                            } else {
                                console.log("User Registered: ".black.bgMagenta + userData);
                                console.log("New user created: ".green + userData.username + " Profile id:  ".bgGreen.black + userData.profileid + "Hash: " + hash);
                                console.log(success);
                                ///////////////////////////////////////////////////////////////
                                const payLoad = {
                                    email: userData.email,
                                    username: userData.username,
                                    role: userData.roles,
                                    profileid: userData.profileid,
                                    dbId: userData._id,
                                    admin: userData.admin
                                };
                                ///////////////////////////////////////////////////////////////
                                const options = {
                                    expiresIn: "1h"
                                };
                                ///////////////////////////////////////////////////////////////
                                const cookieParams = {
                                    expiresIn: '1h',
                                    httpOnly: false,
                                    path: '/'
                                };
                                const clientToken = jwt.sign(payLoad, process.env.JWT_KEY, options);
                                ///////////////////////////////////////////////////////////////
                                console.log("User Logged In: ".bgGreen.black + userData.username);
                                ///////////////////////////////////////////////////////////////
                                const user = {
                                    username: userData.username,
                                    email: userData.email,
                                    profileId: userData.profileid,
                                    dbId: userData._id
                                };
                                console.log("TOKEN: ".bgRed.black + clientToken);
                                ///////////////////////////////////////////////////////////////
                                var t = cryptr.encrypt(clientToken);
                                ///////////////////////////////////////////////////////////////
                                console.log("Ecrypted token: ".black.bgRed + t);
                                ///////////////////////////////////////////////////////////////
                                res.cookie('token', t, cookieParams);
                                res.cookie('user', userData);
                                ///////////////////////////////////////////////////////////////
                                req.session.dbId = userData._id;
                                req.session.username = userData.username;
                                req.session.email = userData.email;
                                req.session.token = clientToken;
                                ///////////////////////////////////////////////////////////////
                                res.status(200).json({
                                    status: 'OK',
                                    url: "/api/profile/" + userData.profileid
                                });
                            }
                        });
                    };
                });
            }

        });
    }

    console.log("##########################################################".red);
};

function log(ip) {
    var date = new Date;
    console.log("##########################################################".green);
    console.log(date);
    console.log("Request from: ".green + ip.red);
    console.log("##########################################################".green);
};
module.exports.checkUsername = (req, res) => {
    console.log("Check username".black.bgRed);
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    var uname = req.body.username;
    User.findOne({
        username: uname
    }, (err, resultofcheck) => {
        console.log("Result of check: ".bgGreen.black + resultofcheck)
        if (err) return console.log(err);
        if (resultofcheck == null) {
            res.json({
                Avalible: true
            })
        } else {
            console.log("Username Not AVALIBLE".bgRed.black);
            res.json({
                Avalible: false
            });
        };
    });
    // if (!req.body) return res.sendStatus(400);
    console.log("##########################################################".red);
    console.log("Register request for " + "Username: " + req.body.username.red);
    // res.send(result);
    log(ip);
    console.log("##########################################################".red);
}
module.exports.GetProfile = (req, res) => {
    console.log("Get profile".black.bgRed);
    const id = req.params.id;
    const details = {
        "profileid": id
    };
    const collection = {
        name: 'users'
    };
    User.findOne(details, 'username email profileid profilePic', (err, result) => {
        console.log("Result:".bgMagenta.black + result);
        if (result) {
            console.log("ProfileID:".bgGreen.black + result.profileid);
            res.render('profile.ejs', {
                data: result,
                session: req.session
            });
        } else {
            if (err) console.log("Error:".bgRed.black + err);
            if (result) console.log("Result:".bgMagenta.black + result);
            res.status(404).json({
                message: "Profile Not Found"
            });
        }
    });
};

module.exports.GetProfileByDbId = (req, res) => {
    console.log("Get profile".black.bgRed + req.userData);
    var dbid;
    if (req.query.u == "self") {
        dbid = req.userData.dbId;
    } else {
        dbid = req.query.u;
        console.log(req.query.u);
    };    
    const details = {
        _id: dbid
    };
    User.findOne(details, 'username email profileid profilePic ign roles', (err, result) => {
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

module.exports.GetUsers = (req, res) => {
    console.log("Get users".black.bgRed);

    User.find({}, 'username profileid email roles', function (err, docs) {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        } else {
            // console.log(docs);
            res.status(200).json({
                users: docs
            })
        }
    });
};
module.exports.UploadProfilePic = (req, res, next) => {
    console.log("Check upload".black.bgRed);
    console.log(req.body.email);
    console.log(req.file);
    var conditions = {
            email: req.body.email
        },
        update = {
            $set: {
                profilePic: '/ProfilePics/' + req.file.originalname
            }
        },
        options = {
            multi: true
        };
    User.findOne(conditions, 'profileid', (err, resultofcheck) => {
        if (resultofcheck) {
            User.updateOne(conditions, update, options, (err, result) => {
                if (err) return console.log(err);
                res.status(200).json({
                    name: req.body.uname,
                    email: req.body.email,
                    file: req.file,
                    url: resultofcheck.profileid,
                    pic: result.profilePic
                });
                console.log(result);
            });
        } else {
            console.log(err);
            return res.status(500).json({
                error: "user not found"
            });
        }
    });
};

module.exports.Login = (req, res, next) => {
    console.log("Login user ".black.bgRed);
    console.log(req.body.email + " " + req.body.pass);
    var buffP = new Buffer(req.body.pass, 'base64');
    var buffE = new Buffer(req.body.email, 'base64');
    var Pass = buffP.toString('ascii');
    var Email = buffE.toString('ascii');
    // var Pass = req.body.pass;
    // var Email = req.body.email;
    console.log(Pass + " " + Email)
    User.findOne({
        email: Email
    }, (err, resultofcheck) => {
        if (!resultofcheck) {
            res.status(401).json({
                message: "Auth Failed"
            });
            return console.log(resultofcheck);
        }
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "An Error Has Occured"
            });
        }
        if (resultofcheck.length < 1) {
            return res.status(401).json({
                error: "Auth Failed"
            });
        }
        bcrypt.compare(req.body.pass, resultofcheck.password, (err, result) => {
            console.log("Password Match Result: ".black.bgMagenta + result);
            if (err) {
                console.log(err);
                return res.status(401).json({
                    error: "Auth Failed"
                });
            };
            if (result) {
                const payLoad = {
                    email: resultofcheck.email,
                    username: resultofcheck.username,
                    role: resultofcheck.roles,
                    userid: resultofcheck.profileid,
                    dbId: resultofcheck._id
                };
                const options = {
                    expiresIn: "1h"
                };
                const clientToken = jwt.sign(payLoad, process.env.JWT_KEY, options);
                console.log("User Logged In: ".bgGreen.black + resultofcheck.username)
                console.log("TOKEN: ".bgRed.black + clientToken);
                // req.session.token = clientToken;
                return res.status(200).json({
                    result: "Auth Successful",
                    ct: clientToken,
                    status: "OK",
                    url: resultofcheck.profileid
                });
            };
            res.status(401).json({
                error: "Auth Failed"
            });
        });
    });
};
module.exports.LoginDev = (req, res, next) => {
    console.log("Login user ".black.bgRed);
    console.log(req.body.email + " " + req.body.pass);
    // var buffP = new Buffer(req.body.pass, 'base64');
    // var buffE = new Buffer(req.body.email, 'base64');
    // var Pass = buffP.toString('ascii');
    // var Email = buffE.toString('ascii');
    var Pass = req.body.pass;
    var Email = req.body.email;
    console.log(req.body);
    console.log(Pass + " " + Email)
    User.findOne({
        email: Email
    }, (err, resultofcheck) => {
        if (!resultofcheck) {
            res.status(401).json({
                message: "Auth Failed"
            });
            return console.log(resultofcheck);
        }
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "An Error Has Occured"
            });
        }
        if (resultofcheck.length < 1) {
            return res.status(401).json({
                error: "Auth Failed"
            });
        }
        bcrypt.compare(req.body.pass, resultofcheck.password, (err, result) => {
            console.log("Password Match Result: ".black.bgMagenta + result);
            if (err) {
                console.log(err);
                return res.status(401).json({
                    error: "Auth Failed"
                });
            };
            if (result) {
                const payLoad = {
                    email: resultofcheck.email,
                    username: resultofcheck.username,
                    role: resultofcheck.roles,
                    profileid: resultofcheck.profileid,
                    dbId: resultofcheck._id,
                    admin: resultofcheck.admin
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
                console.log("User Logged In: ".bgGreen.black + resultofcheck.username);
                const user = {
                    username: resultofcheck.username,
                    email: resultofcheck.email,
                    profileId: resultofcheck.profileid,
                    dbId: resultofcheck._id
                };
                if (req.body.rememberme) {
                    console.log("User Stored In cookie Storage" .bgRed.black + user)
                    console.log("TOKEN: ".bgRed.black + clientToken);
                    var t = cryptr.encrypt(clientToken);
                    console.log("Ecrypted token: ".black.bgRed + t);
                    res.cookie('token', t, cookieParams);
                    req.session.email = resultofcheck.email,
                    req.session.username = resultofcheck.username,
                    req.session.role = resultofcheck.roles,
                    req.session.profileid = resultofcheck.profileid,
                    req.session.dbId = resultofcheck._id,
                    req.session.admin = resultofcheck.admin
                } else {                    
                    req.session.email = resultofcheck.email,
                    req.session.username = resultofcheck.username,
                    req.session.role = resultofcheck.roles,
                    req.session.profileid = resultofcheck.profileid,
                    req.session.dbId = resultofcheck._id,
                    req.session.admin = resultofcheck.admin
                    console.log("User Stored In Session Storage" .bgRed.black + user)
                };
                res.cookie('username', user.username);
                res.cookie('id', user.dbId);
                if (resultofcheck.admin == true){
                    res.cookie('admin', resultofcheck.admin);
                };                
                // return res.status(200).json({
                //     result: "Auth Successful",
                //     ct: clientToken,
                //     status: "OK",
                //     RedirectURL: '/profile.html?u=' + resultofcheck._id
                // });
                return res.status(200).redirect('/pages/profile.html?u=' + resultofcheck._id)
            };
            return res.status(401).json({
                error: "Auth Failed"
            });

        });
    });
};