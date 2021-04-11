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
            var value = getToken.jwtDecode(req);
            if(value===undefined){
                res.status(400).send("There is not token information!");
            }else {
                var user_name = value['name'];
                var user_password = value['password'];
                var sql = 'SELECT *  FROM users WHERE name=' + "'" + user_name + "'" + 'AND password=' + "'" + user_password + "'"
                con.query(sql, function (err, result) {

                    if (err) {
                        res.status(400).end();
                    } else {
                        if (result.length === 0) {
                            res.status(400).send("There is not user with this token information!");
                        } else {
                            let query = 'UPDATE users SET status='+"'"+ req.body.status+"'"+' where id ='+"'"+parseInt(req.params.id)+"'";
                            con.query(
                                query,
                                function(err) {

                                    if (err) {
                                        res.status(400).end();
                                    } else {
                                        let query1 = 'SELECT * FROM users where id ='+"'"+parseInt(req.params.id)+"'";
                                        con.query(
                                            query1,
                                            function(err, result) {

                                                if (err) {
                                                    res.status(400).end();
                                                } else {
                                                    res.status(200).send({
                                                        'id': result[0].id,
                                                        'name': result[0].name,
                                                        'job': result[0].job,
                                                        'phone_no':result[0].phone_no,
                                                        'email':result[0].email,
                                                        'password':result[0].password,
                                                        'status':result[0].status,
                                                        'role_id': result[0].role_id
                                                    });
                                                }
                                                con.end();
                                            }
                                        );
                                    }
                                });
                        }
                    }
                });
            }
        }
    });
};
