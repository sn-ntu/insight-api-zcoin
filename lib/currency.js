'use strict';

var request = require('request');

function CurrencyController(options) {
    this.node = options.node;
    var refresh = options.currencyRefresh || CurrencyController.DEFAULT_CURRENCY_DELAY;
    this.currencyDelay = refresh * 60000;

    this.wci_zcoin_rate = 0;
    this.exchange_rates = {
        Price_usd: 0.00,
        Price_btc: 0.00,
        Price_eur: 0.00,
        Price_cny: 0.00
    }

    // this.bitstampRate = 0;
    /*
    this.exchange_rates = {
      zcoin_usd: 0.00,
      btc_usd: 0.00,
      btc_zcoin: 0.00
    };*/
    this.timestamp = Date.now();
}

CurrencyController.DEFAULT_CURRENCY_DELAY = 10;

CurrencyController.prototype.index = function (req, res) {
    var self = this;
    var currentTime = Date.now();
    if (self.exchange_rates.Price_usd === 0.00 || currentTime >= (self.timestamp + self.currencyDelay)) {
        self.timestamp = currentTime;
        //make price ticker for zcoin https://bittrex.com/api/v1.1/public/getticker?market=btc-xzc or BETTER ==>
        // https://www.worldcoinindex.com/apiservice/json?key={KEY}
        // output = { "Markets": {"Label":"XZC/BTC","Name":"Zcoin","Price_btc":0.00248279,"Price_usd":5.67297430,
        // "Price_cny":36.80273291,"Price_eur":5.14050839,"Price_gbp":4.46304568,"Price_rur":324.16345582,
        // "Volume_24h":298.50029830,"Timestamp":1496138220},
        request('WWW.ZCOINPRICETICKER.COM', function (err, response, body) {
            if (err) {
                self.node.log.error(err);
            }
            if (!err && response.statusCode === 200) {
                self.wci_zcoin_rate = parseFloat(JSON.parse(body).last);
                var response = JSON.parse(body);
                self.exchange_rates = response.Markets[-4]; // Zerocoin, start from last of the list, get zcoin array data put in vars.
                // self.bitstampRate = parseFloat(JSON.parse(body).last);
                /* var response = JSON.parse(body);
                 self.exchange_rates = response.exchange_rates;
                 self.exchange_rates.bitstamp = response.exchange_rates.zcoin_usd; //backward comp.
                */
            }
            res.jsonp({
                status: 200,
                data: self.exchange_rates
            });
        });
    } else {
        res.jsonp({
            status: 200,
            data: self.exchange_rates
        });
    }

};

module.exports = CurrencyController;
