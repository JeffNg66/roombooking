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
   let id = req.params.id;
    if(parseInt(id) === req.body.booking_id){
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
                    let sql = 'SELECT *  FROM users WHERE name=' + "'" + user_name + "'" + 'AND password=' + "'" + user_password + "'"
                    con.query(sql, function (err, result) {

                        if (err) {
                            res.status(400).end();
                        } else {
                            if (result.length === 0) {
                                res.status(400).send("There is not user with this token information!");
                            } else {
                                let name = req.body.name;
                                let job = req.body.job;
                                let room_name = req.body.room_name;
                                var val = validateDate(req.body.booking_start_time, req.body.booking_end_time);
                                if(val===false){
                                    res.status(400).send("Booking date is not validated!");
                                }else {
                                    var sql1 = 'SELECT * FROM bookings WHERE id='+"'"+req.params.id+"'";
                                    con.query(sql1, function (err, result) {

                                        if (err) {
                                            res.status(400).end();
                                        } else {
                                            if (result.length === 0) {
                                                res.status(400).send("There is not user with this information!");
                                            } else {
                                                var sql2 ='UPDATE bookings SET user_id=(SELECT id FROM users where name='+"'"+name+"'"+' and job='+"'"+job+"'"+'), room_id=(SELECT room_id FROM rooms WHERE room_name='+"'"+room_name+"'"+
                                                    '), booking_start_time='+"'"+req.body.booking_start_time+"'"+', booking_end_time='+"'"+req.body.booking_end_time+"'"+' WHERE id ='+"'"+req.params.id+"'";
                                                con.query(sql2, function (err, result) {

                                                    if (err) {
                                                        res.status(400).end();
                                                    } else {
                                                        res.status(200).send({
                                                            'id':req.params.id,
                                                            'name': req.body.name,
                                                            'job':req.body.job,
                                                            'room_name': req.body.room_name,
                                                            'booking_start_time':req.body.booking_start_time,
                                                            'booking_end_time':req.body.booking_end_time
                                                        });
                                                    }
                                                    con.end();
                                                })
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
    }else{
        res.sendStatus(400);
    }
    function validateDate (date1, date2) {
        var val1 = new Date(date1).getTime();
        var val2 = new Date(date2).getTime();
        if((val1.toString()==='NaN')||(val2.toString()==='NaN')||(val2-val1<0)){
            return false
        }
        return true;
    }
};
