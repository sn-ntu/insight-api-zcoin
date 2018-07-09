'use strict';

var request = require('request');

function ExtendedController(options) {
    this.node = options.node;
}

ExtendedController.prototype.getmoneysupply = function (req, res) {
    // https://explorer.zcoin.io/zero/gettotalzeromint/
    // output = 224909
    request('https://explorer.zcoin.io/ext/getmoneysupply', function (err, response, body) {
	if (err) {
	    self.node.log.error(err);
	} else {
	    res.jsonp({
		total: parseFloat(body),
	    });
	}
    });
};

module.exports = ExtendedController;
