var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// application routing
var router = express.Router();

// body-parser middleware for handling request variables
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'PaginationAPIDb',
        charset  : 'utf8'
    }
});
var Bookshelf = require('bookshelf')(knex);

// User model
var User = Bookshelf.Model.extend({
    tableName: 'users'
});

//Users Collection
var Users = Bookshelf.Collection.extend({
        model: User
});

router.route('/users')
    .post(function (req, res) {
        var qb = User.query();
        qb.orderBy(req.body.sortkey,req.body.sortorder).limit(50).offset((req.body.page-1)*50).select().then(function (collection) {

//            Users.forge().orderBy('firstName', 'desc').limit(50).fetch().then (function (collection) {
                res.json(collection);
            })
            .catch(function (err) {
                res.status(500).json({error: true, data: {message: err.message}});
            });
    });

app.use('/api', router);

app.listen(8080, function() {
    console.log("✔ Express server listening on port %d in %s mode", 8080, app.get('env'));
});