// Summary page that grabs/defines home routes and api routes and exports them for server.js //
// Home routes help with rendering pages and api routes help with data //
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;