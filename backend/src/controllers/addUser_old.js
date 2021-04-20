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
        } else{
            let name = req.body.name;
            let job =  req.body.job;
            let phone = req.body.phone_no;
            let email = req.body.email;
            let password = req.body.password;
            let status = "false";
            let role_id = req.body.role_id;
            let sql = 'SELECT *  FROM users WHERE name=' + "'" + name + "'" + 'AND password=' + "'" + password + "'"
            con.query(sql, function (err, result) {

                if (err) {
                    res.sendStatus(400);
                } else {
                    if (result.length > 0) {
                        res.sendStatus(409);
                    } else {
                        let sql =
                            'INSERT INTO users (name, job, phone_no, email, password, status, role_id) VALUES (' +
                            "'" +
                            name +
                            "'" +
                            ',' +
                            "'" +
                            job +
                            "'" +
                            ',' +
                            "'" +
                            phone +
                            "'" +
                            ',' +
                            "'" +
                            email +
                            "'" +
                            ',' +
                            "'" +
                            password +
                            "'" +
                            ',' +
                            "'" +
                            status +
                            "'"+
                            ',' +
                            "'" +
                            role_id +
                            "'"+
                            ');';
                        con.query(sql, function(err) {

                            if (err) {
                                res.sendStatus(400);
                            } else {
                                let sql = 'SELECT *  FROM users WHERE name=' + "'" + name + "'" + 'AND password=' + "'" + password + "'"
                                con.query(sql, function (err, result) {
                                    if (err) {
                                        res.sendStatus(400);
                                    } else {
                                        res.status(201).send({
                                            'id': result[0].id,
                                            'name': result[0].name,
                                            'job': result[0].job,
                                            'phone_no':result[0].phone_no,
                                            'email':result[0].email,
                                            'password':result[0].password,
                                            'status':result[0].status,
                                            'role_id':result[0].role_id
                                        });
                                    }
                                })
                            }
                            con.end();
                        });
                    }
                }
            });
        }
    });
};
