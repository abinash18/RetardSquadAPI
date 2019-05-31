module.exports = function(app, db) {
    const baseController = require('./Controllers/baseController');
    const UserController = require('./Controllers/UserController');
    const TradeMarkController = require('./Controllers/TradeMarkController');
    const now = new Date;
    const checkAuth = require('../middleware/auth/check-auth');
    const jwt = require('jsonwebtoken');
    const bodyParser = require('body-parser');
    const colors = require('colors');
    const urlencodedParser = bodyParser.urlencoded({ extended: true });
    const ejs = require('ejs');
    const sha256 = require('sha256');
    const crypto = require('crypto');
    const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bytes (32 characters)
    const IV_LENGTH = 16; // For AES, this is always 16
    var ObjectID = require('mongodb').ObjectID;
    const multer = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'Public/ProfilePics')
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname)
        }
      });
      const fileFilter = (req, file, cb) => {
          if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/gif'){
              cb(null, true);
          } else {
              cb(null, false);
          }
      }
      var upload = multer({
        storage: storage,
        limits: {
            filesize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    }).single('pic');

    app.post('/fstm/submittrademark', checkAuth.session, TradeMarkController.submittm);
    app.post('/fstm/submitskin', checkAuth.sessionAndTokenAdmin, TradeMarkController.submitSkin);
    app.get('/fstm/gettrademarks', TradeMarkController.gettrademarks);
    app.get('/fstm/getskins', TradeMarkController.getskins);
    app.get('/fstm/getskinsnottrademarked', TradeMarkController.getskinsnottrademarked);
    app.get('/fstm/skinById', TradeMarkController.skinById);
    app.post('/fstm/updateskin', checkAuth.admin, TradeMarkController.updateSkin);
};
