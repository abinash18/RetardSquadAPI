now = new Date;
const userModel = require('../../models');
const User = require('../../models/User');
const ServerSession = require('../../models/ServerSession');
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

const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
const multer = require('multer');
const checkAuth = require('../../middleware/auth/check-auth');
module.exports.addServer = (req, res) => {
    console.log("##########################################################".red);
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    console.log("Adding Server:" + req.params.ip + " Port: " + req.params.port);
    // res.send(now + ip + "Hello");
    var id = Math.floor(Math.random() * (99999 - 10000 + 1) + 1000);

    ServerSession.findOne({
        ip: req.params.ip,
        UDPport: req.params.udp,
        TCPport: req.params.tcp
    }, (err, doc) => {
        if (err) {
            return res.status(200).json({
                msg: "Error",
                raw: err
            });
        }

        if (doc) {
            return res.status(200).json({
                msg: "Server session Exists",
                id: doc.id,
                raw: doc
            });
        } else {
            ServerSession.create({
                ip: req.params.ip,
                UDPport: req.params.udp,
                TCPport: req.params.tcp,
                name: "Test",
                _id: mongoose.Types.ObjectId(),
                id: id
            }, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(200).json({
                        msg: "Error",
                        raw: err
                    });
                }

                if (result) {
                    res.status(200).json({
                        id: id,
                        raw: result
                    });
                }

                console.log(result);


            });
        }


    });

    // var sess = new ServerSession(req.params.ip, id, req.params.port);
    log(ip);
    console.log("##########################################################".red);
};

module.exports.getServerByCode = (req, res) => {
    var code = req.params.code;

    ServerSession.findOne({
        id: code
    }, (err, doc) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                err: "Internal Server Error",
                raw: err
            });
        }

        if (doc) {
            return res.status(200).json({
                name: doc.name,
                ip: doc.ip,
                udp: doc.UDPport,
                tcp: doc.TCPport,
                mp: doc.maxplayers,
                raw: doc
            })
        }

    });

}

module.exports.checkIn = (req, res) => {

    var id;
    var ip;

    var options;

    if (req.query.id != null){
        id = req.query.id;
        options = {
            id: id
        }
    } 
    if (req.query.ip != null){
        ip = req.query.ip;
        options = {
            ip: ip
        }
    }

    console.log("Server Checking in: " + options);
        ServerSession.find({}, 'id', (err, docs) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    err: "Internal Server Error",
                    raw: err
                });
            }
            return res.status(200).json({
                activeServers: docs
            });
        });
        


};
