module.exports = function(app, db) {
    const baseController = require('./Controllers/baseController');
    const UserController = require('./Controllers/UserController');
    const BTDController = require('./Controllers/BTDController');
    const now = new Date;
    const checkAuth = require('../middleware/auth/check-auth');
    const jwt = require('jsonwebtoken');
    const bodyParser = require('body-parser');
    const colors = require('colors');
    const urlencodedParser = bodyParser.urlencoded({ extended: true });
    const ejs = require('ejs');
    const sha256 = require('sha256');
    const crypto = require('crypto');
    const algorithm = "aes-256-ctr";
    const salt = "EzCl4p6123458qwertyuijhgfdzszxzasexdrcftvgbhnjkmlwsedrfghbnjmkedfcvgbsxdfcgaihlsbfkzjsxghiugksgudftasfytfashgffhgsxfhkgfhgkffkyfdxkuugaskudgkuah";
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

    log = function(ip) {
        var date = new Date;
        console.log("##########################################################".green);
        console.log(date);
        console.log("Request from: ".green + ip .red); 
        console.log("##########################################################".green);
    };
    function encrypt(text) {
        let iv = crypto.randomBytes(IV_LENGTH);
        let cipher = crypto.createCipheriv('aes-256-cbc', new Buffer(ENCRYPTION_KEY), iv);
        let encrypted = cipher.update("text");
       
        encrypted = Buffer.concat([encrypted, cipher.final()]);
       
        return iv.toString('hex') + ':' + encrypted.toString('hex');
       }
       
      function decrypt(text){
        var textbuff = new Buffer(text);
        var bufftext = text.toString('ascii');
        var cipher = crypto.createDecipher(algorithm, salt).update(bufftext,"hex","utf8");
        return cipher;
      }
      function findone(details, collection){
        const objectdetails = details;
        console.log(objectdetails);
        db.collection('users').findOne(objectdetails, (err, result) => {
            if (err) {
                console.log(err);
                return ({ err: err });
                // console.log(err);
                // log(ip);
                
            } else {
                console.log(result.ops[0]);
                return ({ ops: result.ops[0] });
                
            };
        });
      }
    app.post('/checkunamescript', UserController.checkUsername);
    app.post('/validateregistration', UserController.validateregistration);
    // app.post('/uploadprofilepic', UserController.UploadProfilePic);
    app.post('/uploadprofilepic', checkAuth, upload, UserController.UploadProfilePic );


    app.post('/validatelogin', (req, res) => {
        console.log("##########################################################".red);
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        // res.send(result);
        log(ip);
        
        res.sendStatus(200);
        
        var uname = req.body.usernameinput;
        var pass = req.body.passwordinput;
        console.log("user: ".bgGreen .black + uname + " Pass: ".bgRed .black+ pass);
        var cookieuname = sha256(uname);
        var cookiepass = sha256.x2(pass);
        var cookieip = sha256.x2(ip);
        console.log("Cookie Hashes: " + cookieuname .bgWhite .black + " " + cookiepass .bgWhite .black + " " + cookieip .bgWhite .black + " ");

    }); 
    app.get('/profile/:id', UserController.GetProfile);
    app.get('/profileById', checkAuth.getuser, UserController.GetProfileByDbId);    
    app.get('/profiles', checkAuth, UserController.GetUsers);
    app.post('/login', UserController.Login);
    app.post('/logindev', UserController.LoginDev);
    app.get('/checklogin', checkAuth.checkSessionLogin);
    app.get('/logout', checkAuth.logout);
    app.get('/avalPages', checkAuth.checkLoggedIn, baseController.getPages);
    app.post('/makePage', checkAuth.sessionAndTokenAdmin, baseController.addPages);
    app.post('/deletePage/', checkAuth.sessionAndTokenAdmin, baseController.deletePage);
    app.get('/getIp/', baseController.getIp);
    app.get('/addServer/:ip/:tcp/:udp', BTDController.addServer);
    app.get('/checkIn', BTDController.checkIn);
    app.get('/getServerByCode/:code', BTDController.getServerByCode);
};