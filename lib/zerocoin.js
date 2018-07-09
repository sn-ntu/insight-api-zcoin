'use strict';

var request = require('request');

function ZerocoinController(options) {
    this.node = options.node;
}

ZerocoinController.prototype.gettotalzeromint = function (req, res) {
    // https://explorer.zcoin.io/zero/gettotalzeromint/
    // output = 224909
    request('https://explorer.zcoin.io/zero/gettotalzeromint', function (err, response, body) {
	if (err) {
	    self.node.log.error(err);
	} else {
	    res.jsonp({
		total: parseFloat(body),
	    });
	}
    });
};

ZerocoinController.prototype.gettotalzerospend = function (req, res) {
    // https://explorer.zcoin.io/zero/gettotalzerospend
    // output = 224909
    request('https://explorer.zcoin.io/zero/gettotalzerospend', function (err, response, body) {
	if (err) {
	    self.node.log.error(err);
	} else {
	    res.jsonp({
		total: parseFloat(body),
	    });
	}
    });
};

ZerocoinController.prototype.getrealsupply = function (req, res) {
    // https://explorer.zcoin.io/zero/getrealsupply/
    // output = 224909
    request('https://explorer.zcoin.io/zero/getrealsupply', function (err, response, body) {
	if (err) {
	    self.node.log.error(err);
	} else {
	    res.jsonp({
		total: parseFloat(body),
	    });
	}
    });
};

module.exports = ZerocoinController;
