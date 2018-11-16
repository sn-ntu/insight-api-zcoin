'use strict';

var request = require('request');
var Common = require('./common');

function ZerocoinController(node) {
  this.node = node;
  this.common = new Common({log: this.node.log});
}

ZerocoinController.prototype.gettotalzeromint = function (req, res) {
  this.node.getAddressBalance("Zeromint", false, function (err, data) {
    if (err) {
      self.node.log.error(err);
    } else {
      res.jsonp({
        total: data.balance / 1e+8,
      });
    }
  });
};

ZerocoinController.prototype.gettotalzerospend = function (req, res) {
  this.node.getAddressBalance("Zerospend", false, function (err, data) {
    if (err) {
      self.node.log.error(err);
    } else {
      res.jsonp({
        total: data.balance / -1e+8,
      });
    }
  });
};

ZerocoinController.prototype.getrealsupply = function (req, res) {
  var ltotal = 0;

  this.node.getAddressBalance("Zeromint", false, function (err, data) {
    if (err) {
      self.node.log.error(err);
      throw err;
    } else {
      ltotal -= data.balance / 1e+8;
    }
  });
  this.node.getAddressBalance("Zerospend", false, function (err, data) {
    if (err) {
      self.node.log.error(err);
      throw err;
    } else {
      ltotal += data.balance / -1e+8;
    }
  });

  this.node.getTotalSupply(function (err, data) {
    if (err) {
      self.node.log.error(err);
      throw err;
    } else {
      ltotal += data.balance / 1e+8;
      res.jsonp({
        total: ltotal,
      });
    }
  });
};

module.exports = ZerocoinController;
