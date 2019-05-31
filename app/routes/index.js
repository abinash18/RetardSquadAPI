const Routes = require('./routes');
const TradeMarkRoutes = require('./TradeMarkRoutes');
const AdminRoutes = require('./adminRoutes');
module.exports = function(app, db) {
    Routes(app, db);
    TradeMarkRoutes(app, db);
    AdminRoutes(app, db);
};