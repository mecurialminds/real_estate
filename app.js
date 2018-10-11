const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: '35.227.84.25',
    user: 'admin',
    password: 'mysql',
    database: 'real_estate',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err,undefined, 2));
});

//Get all cities
app.get('/city', (req, res) => {
    mysqlConnection.query('SELECT * FROM city', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get all sectors against city
app.get('/sector', (req, res) => {
    var city = req.query.city_id;
    var sql = "SELECT * FROM sector WHERE city_id=" + city;
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//From property Table
app.get('/property', (req, res) => {

    var city = req.query.city_id;
    var sector = req.query.sector_id;
    var marla = req.query.marla;
    var room = req.query.room;
    var property = req.query.property_type;
    var deal = req.query.deal_type;

    //var sql = 'INSERT INTO notifications (user_id, weekday, sub_scribe, time) VALUES("' + user_id + '","' + weekday + '","' + sub_scribe + '","' + time + '")';
    var sql = `SELECT * FROM property WHERE city_id=${city} AND sector_id=${sector} AND marla=${marla} AND room=${room} AND property_type='${property}' AND deal_type='${deal}'`;
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Insert data
app.get('/insert', (req, res) => {

    var city = req.query.city_id;
    var sector = req.query.sector_id;
    var marla = req.query.marla;
    var room = req.query.room;
    var property = req.query.property_type;
    var deal = req.query.deal_type;
    var title = req.query.title;
    var image = req.query.image_url;
    var price = req.query.price;
    var detail = req.query.detail;



    var sql = 'INSERT INTO property (city_id, sector_id, marla, room, property_type, deal_type, title, image_url, price, detail) VALUES("' + city + '","' + sector + '","' + marla + '","' + room + '","' + property + '","' + deal + '","' + title + '","' + image + '","' + price + '","' + detail + '")';
    mysqlConnection.query(sql, (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.listen(3000, () => console.log('Express server is running at port no : 3000'));