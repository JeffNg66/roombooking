var jwt = require('jwt-simple');
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
        if (err){
           res.status(500).end();
        }
        else{
            var user_name = req.body.name;
            var user_password = req.body.password;

            var sql = 'SELECT *  FROM users WHERE name='+"'"+user_name+"'"+'AND password='+"'"+user_password+"'"
            con.query(sql, function(err, result) {
                if (err) {
                    throw err;
                } else{
                    if(result.length === 0){
                        //res.status(400).send("There is not user with this login information!");
                       res.status(400).send(
                            'There is not user with this login information'
                      )
                    }
                    else {
                        var secret = 'xxx';
                        var payload = req.body;
                        var getToken =jwt.encode(payload, secret);
                        res.status(200).send({
                            'id': result[0].id,
                            'name': result[0].name,
                            'sex': result[0].sex,
                            'job':result[0].job,
                            'phone_no': result[0].phone_no,
                            'email': result[0].email,
                            'password': result[0].password,
                            'status': result[0].status,
                            'role_id': result[0].role_id,
                            'accessToken': getToken
                        });

                    }
                }
            });
        }
        con.end();
    });

};
