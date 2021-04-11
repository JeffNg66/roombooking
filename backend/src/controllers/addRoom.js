let getToken = require('./../util/jwt');
var moment = require('moment');
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
                            let name = req.body.room_name;
                            let seat = req.body.no_of_seat;
                            let status = req.body.room_status;
                            let start_time = req.body.room_start_time;
                            let end_time = req.body.room_end_time;
                            var val = validateDate(start_time, end_time);
                            if(val===false){
                                res.status(400).send("Room time is not validated!");
                            }else {
                                let sql1 =  'SELECT *  FROM rooms WHERE room_name=' + "'" +name + "'";
                                con.query(sql1, function (err, result) {

                                    if (err) {
                                        res.sendStatus(400);
                                    } else {
                                        if (result.length > 0) {
                                            res.sendStatus(409);
                                        } else {
                                            let query =
                                                'INSERT INTO rooms (room_name, no_of_seat, room_status, room_start_time, room_end_time) VALUES (' +
                                                "'" +
                                                name +
                                                "'" +
                                                ',' +
                                                "'" +
                                                seat +
                                                "'"+
                                                ',' +
                                                "'" +
                                                status +
                                                "'"+
                                                ',' +
                                                "'" +
                                                start_time +
                                                "'"+
                                                ',' +
                                                "'" +
                                                end_time +
                                                "'"+
                                                ');';
                                            con.query(query, function(err) {


                                                if (err) {
                                                    res.sendStatus(400);
                                                } else {
                                                    let sql1 =  'SELECT *  FROM rooms WHERE room_name=' + "'" +name + "'" + 'AND no_of_seat=' + "'" + seat + "'"+'AND room_status='+"'"+status+"'";
                                                    con.query(sql1, function (err, result) {

                                                        if (err) {
                                                            res.sendStatus(400);
                                                        } else {
                                                            res.status(201).send({
                                                                'room_id': result[0].room_id,
                                                                'room_name': result[0].room_name,
                                                                'no_of_seat': result[0].no_of_seat,
                                                                'room_status':result[0].room_status,
                                                                'room_start_time': result[0].room_start_time,
                                                                'room_end_time':result[0].room_end_time
                                                            });
                                                        }
                                                        con.end();
                                                    })
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            }
        }
    });
    function validateDate (date1, date2) {
        var val1 = new Date(date1).getTime();
        var val2 = new Date(date2).getTime();
        if((val1.toString()==='NaN')||(val2.toString()==='NaN')||(val2-val1<0)){
            return false
        }
        return true;
    }

};
