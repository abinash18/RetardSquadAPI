const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const ejs = require('ejs');
const nodemail = require('nodemailer');
const mongoose = require('mongoose');
const db = require('./app/config/db');
const colors = require('colors');
const morgan = require('morgan');
const multer = require('multer');
const session = require('express-session');
mongoose.set('useCreateIndex', true);
const port = process.env.APP_PRT;
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
var passport = require('passport');

var options = {
    mongooseConnection: mongoose.connection
};
// "mongodb://abinash:" + process.env.MONGO_PWD + "@ds247830.mlab.com:47830/mongo"
mongoose.connect("mongodb://abinash:" + process.env.MONGO_PWD + "@ds247830.mlab.com:47830/mongo", ({
    useNewUrlParser: true
}), (err, database) => {
    console.log("database ready");
    if (err) throw err;
    require('./app/routes')(app, database);
    app.listen(port, () => {
        console.log("Les go it be workin on de port " + port);
    });
    app.use((req, res, next) => {
        const error = new Error('Not Found');
        error.status = 404;
        next(error);
    });

    app.use((error, req, res, next) => {
        // res.status(error.status || 500).json({
        //     error: {
        //         message: error.message
        //     }
        // });
    });
    // https.createServer(app).listen(sslport);
});
app.use(morgan('dev'));
app.use(session({
    secret: process.env.SESSION_SCRT,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore(options),
    cookie: {
        maxAge: 14 * 24 * 60 * 60
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('Public'));
app.use(cookieParser());
app.use('/Public/default', express.static('/Public/default'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', '*');
        return res.status(200).json({});
    }
    res.locals.session = req.session;

    next();
});
app.set('view engine', 'ejs');
