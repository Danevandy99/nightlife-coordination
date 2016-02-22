'use strict';

var express = require('express');
var controller = require('./bars.controller');
var router = express.Router();
var yelp = require("node-yelp");
var Yelp = require('yelp');
var yelp = new Yelp({
    consumer_key: 'wYA9Izk_tQvRV9t1wPO3Ug',
    consumer_secret: 'fIz_SLypf3-Uz4ZSKc6XzmLR554',
    token: '6DRgJl2g6bfEo2RuDrJFz7MPXeIaK_eC',
    token_secret: 'serlUkiNtImO7d_Ht2Uyy3UzmOM',
});

router.get('/', function(req, res) {
    var query = require('url').parse(req.url,true).query;
    yelp.search({
            term: 'bars',
            location: query.loc
        })
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            console.error(err);
        });

});
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
