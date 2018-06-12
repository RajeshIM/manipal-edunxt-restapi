var router = require('express').Router(),
	LND = require('./LND');

router.use('/api/v1/lnd', LND);

module.exports = router;
