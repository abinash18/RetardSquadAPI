const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
var cryptr = new Cryptr(process.env.AES_256_KEY);

module.exports = (req, res, next) => {
    console.log("Check Auth: ".bgRed.black);
    try {
        // const token = req.headers.authorization.split(" ")[1];
        var t = req.cookies['token'];
        var token = cryptr.decrypt(t);
        console.log("AUTH SUCCESS".black.bgGreen);
        console.log("Token: ".black.bgMagenta + token);
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        req.userData = decoded;
        console.log(req.userData);
        console.log(req.userData.email);
        next();
    } catch (error) {
        // console.log(error);
        console.log("AUTH FAILURE".black.bgRed);
        return res.status(401).json({
            error: "Auth Failed",
            status: "401"
        });
    }
};

module.exports.getuser = (req, res, next) => {
    console.log("Get User: ".bgRed.black);
    try {
        // const token = req.headers.authorization.split(" ")[1];
        if (req.cookies['token']) {
            var t = req.cookies['token'];
            var token = cryptr.decrypt(t);
            console.log("Token: ".black.bgMagenta + token);
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.userData = decoded;
            console.log("s" + req.userData.email);
            next();
        } else if (req.session.dbId) {
            req.userData = {
                email: req.session.email,
                username: req.session.username,
                role: req.session.roles,
                userid: req.session.profileid,
                dbId: req.session.dbId
            };
            console.log(req.userData.dbId);
            next();
        } else {
            req.userData == null;
            next();
        };
    } catch (error) {
        // console.log(error);
        console.log("AUTH FAILURE".black.bgRed);
        return res.status(401).json({
            error: "Auth Failed",
            status: "401"
        });
    }
};
// const payLoad = {
//     email: resultofcheck.email,
//     username: resultofcheck.username,
//     role: resultofcheck.roles,
//     userid: resultofcheck.profileid,
//     dbId: resultofcheck._id
// };
module.exports.admin = (req, res, next) => {
    console.log("Get admin: ".bgRed.black);
    try {
        // const token = req.headers.authorization.split(" ")[1];
        var t = req.cookies['token'];
        if (t) {
            var token = cryptr.decrypt(t);
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.userData = decoded;
            if (req.userData.admin == false) {
                res.redirect('/pages/login.html?m=Not Admin restricted Area');
                console.log(req.userData);
                console.log(req.userData.email);
                console.log("AUTH Failiure".black.bgRed);
                console.log("Token: ".black.bgMagenta + token);
                console.log("User: ".black.bgMagenta + req.userData.username);
                return res.status(200).json({
                    status: "200",
                    raw: req.userData,
                    m: 'Not Admin restricted Area',
                    admin: false
                });
            } else {
                console.log("AUTH SUCCESS".black.bgGreen);
                console.log("Token: ".black.bgMagenta + token);
                console.log("User: ".black.bgMagenta + req.userData.username);
                return res.status(200).json({
                    status: "200",
                    url: '/AdminCP/?t=' + t,
                    admin: true
                });
            };
        } else if (req.session) {
            if (req.session.admin == true) {
                console.log("AUTH SUCCESS".black.bgGreen);
                console.log("Token: ".black.bgMagenta + token);
                console.log("User: ".black.bgMagenta + req.session.username);
                // next();
                return res.status(200).json({
                    status: "200",
                    raw: req.session,
                    admin: true
                });
            } else {
                console.log("AUTH FAILURE".black.bgRed);
                console.log(req.session.admin);
                return res.status(200).json({
                    status: "200",
                    raw: req.session,
                    admin: false
                });
            };
            ////////////////////////////////////////////////////////////////////////////
            // if (req.session.admin == false) {
            //     console.log("AUTH FAILURE".black.bgRed);
            //     res.redirect('/pages/login.html?m=NotAdminrestrictedArea', 401);
            //     return res.status(200).json({
            //         status: "401",
            //         m: 'Not Admin restricted Area',
            //         admin: false
            //     });
            // } else {
            //     console.log("AUTH SUCCESS".black.bgGreen);
            //     console.log("Session: ".black.bgMagenta + req.session);
            //     return res.status(200).json({
            //         status: "200",
            //         raw: req.session,
            //         admin: true
            //     });
            // };
        } else {
            console.log("AUTH FAILURE".black.bgRed);
            res.redirect('/pages/login.html?m=Not Admin restricted Area', 401);
            return res.status(200).json({
                status: "401",
                m: 'Not Admin restricted Area',
                admin: false
            });
        }

    } catch (error) {
        // console.log(error);
        console.log("AUTH FAILURE".black.bgRed);
        return res.status(200).json({
            error: "Auth Failed",
            status: "401"
        });
    };
};

module.exports.session = (req, res, next) => {
    console.log("Get session: ".bgRed.black);
    try {
        var t = req.cookies['token'];
        var token = cryptr.decrypt(t);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        console.log(req.userData);
        console.log(req.userData.email);
        console.log(req.session);
        if (req.session.dbId == req.userData.dbId) {
            console.log("AUTH SUCCESS".black.bgGreen);
            console.log("Token: ".black.bgMagenta + token);
            console.log("User: ".black.bgMagenta + req.userData.username);
            next();
        } else {
            console.log("AUTH FAILURE".black.bgRed);
            return res.redirect(401, '/login.html?m=AuthFailureSessionInvalid');
        };
    } catch (error) {
        console.log("AUTH FAILURE".black.bgRed);
        return res.status(200).json({
            error: "Auth Failed",
            status: "401"
        });
    };
};
module.exports.sessionAndTokenAdmin = (req, res, next) => {
    console.log("Get sessionOrTokenAdmin: ".bgRed.black);
    try {
        if (req.cookies['token']) {
            var t = req.cookies['token'];
            var token = cryptr.decrypt(t);
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.userData = decoded;
            if (req.userData.admin == true) {
                console.log("AUTH SUCCESS".black.bgGreen);
                console.log("Token: ".black.bgMagenta + token);
                console.log("User: ".black.bgMagenta + req.userData.username);
                next();
            } else {
                console.log("AUTH FAILURE".black.bgRed);
                // return res.status(200).json({
                //     error: "Auth Failed",
                //     status: "401"
                // });
                return res.redirect('/login.html?m=Ristricted Area');
            }

        } else if (req.session) {
            if (req.session.admin == true) {
                console.log("AUTH SUCCESS".black.bgGreen);
                console.log("User: ".black.bgMagenta + req.session.username);
                next();
            } else {
                console.log("AUTH FAILURE".black.bgRed);
                console.log(req.session.admin);
                return res.redirect('/pages/login.html?m=Ristricted Area');
            };
        } else {
            console.log("AUTH FAILURE".black.bgRed);
            // return res.status(200).json({
            //     error: "Auth Failed",
            //     status: "401"
            // });
            return res.redirect('/pages/login.html?m=Ristricted Area');
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            error: "Auth Failed",
            status: "401"
        });
    };
};

module.exports.checkLoggedIn = (req, res, next) => {
    console.log("Check Logged In: ".bgRed.black);

    var t = req.cookies['token'];
    if (t) {
        var token = cryptr.decrypt(t);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } else if (req.session) {
        next();
    };
};

module.exports.checkSessionLogin = (req, res, next) => {
    console.log("Check session login: ".bgRed.black);
    try {
        var t = req.cookies['token'];
        var token = cryptr.decrypt(t);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        console.log(req.userData);
        console.log(req.userData.email);
        console.log(req.session);
        if (t) {
            if (req.session.dbId == req.userData.dbId) {
                console.log("AUTH SUCCESS".black.bgGreen);
                console.log("Token: ".black.bgMagenta + token);
                console.log("User: ".black.bgMagenta + req.userData.username);
                next();
            } else {
                console.log("AUTH FAILURE".black.bgRed);
                return res.redirect(401, '/login.html?m=AuthFailureSessionInvalid');
            };
        } else {
            return res.redirect(401, '/pages/login.html?m=AuthFailureTokenExpired');
        };

    } catch (error) {
        console.log("AUTH FAILURE".black.bgRed);
        return res.status(200).json({
            error: "Auth Failed",
            status: "401"
        });
    };
};
module.exports.logout = (req, res, next) => {
    console.log("Logout: ".bgRed.black);
    try {
        var t = req.cookies['token'];
        // var token = cryptr.decrypt(t);
        // const decoded = jwt.verify(token, process.env.JWT_KEY);
        // req.userData = decoded;
        if (t) {
            res.clearCookie("token");
            res.clearCookie("id");
            res.clearCookie("role");
            res.clearCookie("username");
            res.clearCookie("admin");
            req.session.destroy();
            return res.redirect('/pages/login.html?m=Logout Successfull');
        } else if (req.session) {
            req.session.destroy();
            res.clearCookie("id");
            res.clearCookie("role");
            res.clearCookie("username");
            res.clearCookie("admin");
            res.clearCookie("connect.sid");
            return res.redirect('/pages/login.html?m=Logout Successfull');
        };
        // console.log(req.userData);
        // console.log(req.userData.email);
        // console.log(req.session);
        // if (t) {
        //     if (req.session.dbId == req.userData.dbId) {
        //         console.log("AUTH SUCCESS".black.bgGreen);
        //         console.log("Token: ".black.bgMagenta + token);
        //         console.log("User: ".black.bgMagenta + req.userData.username);
        //         next();
        //     } else {
        //         console.log("AUTH FAILURE".black.bgRed);
        //         return res.redirect(401, '/pages/login.html?m=AuthFailureSessionInvalid');
        //     };
        // } else {
        //     return res.redirect(401, '/pages/login.html?m=AuthFailureTokenExpired');
        // };

    } catch (error) {
        console.log("LOGOUT FAILURE".black.bgRed);
        return res.status(200).json({
            error: "LOGOUT Failed",
            status: "401"
        });
    };
};