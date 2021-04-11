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
        }
        let value = getToken.jwtDecode(req);
        if(value===undefined){
            res.status(400).send("There is not token information!");
        }else {
            let user_name = value['name'];
            let user_password = value['password'];

            let sql = 'SELECT *  FROM users WHERE name=' + "'" + user_name + "'" + 'AND password=' + "'" + user_password + "'";
            con.query(sql, function (err, result) {

                if (err) {
                    res.status(400).end();
                } else {
                    if (result.length === 0) {
                        res.status(400).send("There is not user with this token information!");
                    } else {
                        let query = 'SELECT *  FROM rooms WHERE room_id = '+"'"+req.params.id+"'";
                        con.query(
                            query,
                            function(err, result) {

                                if (err) {
                                    res.status(400).end();
                                } else {
                                    if(result.length>0){
                                        let status = 'false';
                                        let query1 = 'UPDATE rooms SET  room_status='+"'"+status+"'"+'WHERE room_id='+"'"+req.params.id+"'";
                                        con.query(
                                            query1,
                                            function(err) {

                                                if (err) {
                                                    res.status(400).end();

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
    });
};
