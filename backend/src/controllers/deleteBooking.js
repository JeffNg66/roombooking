let getToken = require('./../util/jwt');
var mysql = require('mysql');
var database = require('./../config/db');

module.exports.confirm = function(req, res) {
    var db=database.database;
    var con = mysql.createConnection({
        host: db.host,
        user: db.user,
        password: db.password,
        database: db.database
    });
    con.connect(function(err) {
        if (err) {
            res.status(500).end();
        }else {
            let value = getToken.jwtDecode(req);
            if(value===undefined){
                res.status(400).send("There is not token information!");
            }else {
                let user_name = value['name'];
                let user_password = value['password'];
                let sql = 'SELECT *  FROM users WHERE name=' + "'" + user_name + "'" + 'AND password=' + "'" + user_password + "'";
                con.query(sql, function (err, result) {

                    if (err) {
                        res.sendStatus(400);
                    } else {
                        if (result.length === 0) {
                            res.status(400).send("There is not user with this token information!");
                        } else {
                            let query = 'SELECT *  FROM bookings WHERE id = '+"'"+req.params.id+"'";

                            con.query(
                                query,
                                function(err, result) {

                                    if (err) {
                                        res.sendStatus(400);
                                    } else {
                                        if(result.length>0){
                                            let query = 'DELETE  FROM bookings WHERE id = '+"'"+req.params.id+"'";
                                            con.query(
                                                query,
                                                function(err) {

                                                    if (err) {
                                                        res.sendStatus(400);
                                                    } else {
                                                        res.sendStatus(204);
                                                    }
                                                }
                                            );
                                        }   else {
                                            res.sendStatus(404);
                                        }
                                    }
                                    con.end();
                                }
                            );
                        }
                    }
                });
            }
        }
    });
};
