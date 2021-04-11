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
        } else{
            let value = getToken.jwtDecode(req);
            if(value === undefined){
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
                            let user_name = req.body.name;
                            let user_job = req.body.job;
                            let room_name = req.body.room_name;
                            let start_time = req.body.booking_start_time;
                            let end_time = req.body.booking_end_time;

                                var sql1= 'SELECT *  FROM users WHERE name=' + "'" + user_name + "'" + 'AND job=' + "'" + user_job + "'";
                                con.query(sql1, function (err, result) {

                                    if (err) {
                                        res.sendStatus(400);
                                    } else {
                                        if (result.length === 0) {
                                            res.status(400).send('There is no user with this booking information!');
                                        } else {
                                            if (result[0].status === 'false') {
                                                res.status(400).send({
                                                    message: "This staff is disabled user!"
                                                });
                                            } else {
                                                let sql2 = 'SELECT * FROM ((bookings  INNER JOIN users ON bookings.user_id = users.id)  INNER JOIN rooms ON bookings.room_id = rooms.room_id)  ';
                                               // let sql2 = 'SELECT * from bookings where  room_id in (SELECT room_id from rooms where room_name=' + "'" + room_name + "'" + ') ';
                                                con.query(sql2, function (err, result) {

                                                    if (err) {
                                                        res.sendStatus(400);
                                                    } else {
                                                        if (result.length === 0) {
                                                            var sql =
                                                                'INSERT INTO bookings (user_id, room_id, booking_start_time, booking_end_time) VALUES ((SELECT id from users where name=' + "'" + user_name + "'" + 'AND job=' + "'" + user_job + "'" + '), (SELECT room_id from rooms where room_name=' + "'" + room_name + "'" + '),' + "'" + start_time + "'" + ',' + "'" + end_time + "'" + ')';
                                                            con.query(sql, function (err) {

                                                                if (err) {
                                                                    res.status(400).end();
                                                                } else {
                                                                    var sql3 = 'SELECT * from bookings where user_id in (SELECT id from users where name=' + "'" +
                                                                        user_name + "'" + 'AND job=' + "'" + user_job + "'" + ') and room_id in (SELECT room_id from rooms where room_name=' + "'" + room_name + "'" + ')';
                                                                    'AND start_time=' + "'" + start_time + "'" + 'AND end_time=' + "'" + end_time + "'";
                                                                    con.query(sql3, function (err, result) {

                                                                            if (err) {
                                                                                res.status(400).end();
                                                                            } else {
                                                                                res.status(201).send({
                                                                                    'id': result[0].id,
                                                                                    'name': user_name,
                                                                                    'job': user_job,
                                                                                    'room_name': room_name,
                                                                                    'booking_start_time': result[0].booking_start_time,
                                                                                    'booking_end_time': result[0].booking_end_time
                                                                                });
                                                                            }
                                                                        }
                                                                    )
                                                                }
                                                            });
                                                        } else {
                                                            var validateResult=0;
                                                            for (let i=0;i<result.length; i++){
                                                                validateResult = validateBookingInfo(req.body.room_name, result[i].room_name, start_time, end_time, result[i].booking_start_time, result[i].booking_end_time, result[i].room_start_time, result[i].room_end_time);
                                                                if (validateResult !==0){
                                                                    break;
                                                                }
                                                            }
                                                                if(validateResult === 1){
                                                                    res.status(400).send('Booking end time must be late than booking start time!');
                                                                }else  if(validateResult ===2){
                                                                    res.status(400).send('Booking time was duplicated!');
                                                                }else if(validateResult === 3) {
                                                                    res.status(400).send('Booking time is out of room start time and end time!');
                                                                }else {
                                                                var sql =
                                                                    'INSERT INTO bookings (user_id, room_id, booking_start_time, booking_end_time) VALUES ((SELECT id from users where name=' + "'" + user_name + "'" + 'AND job=' + "'" + user_job + "'" + '), (SELECT room_id from rooms where room_name=' + "'" + room_name + "'" + '),' + "'" + start_time + "'" + ',' + "'" + end_time + "'" + ')';
                                                                con.query(sql, function (err) {

                                                                    if (err) {
                                                                        res.status(400).end();
                                                                    } else {
                                                                        var sql3 = 'SELECT * from bookings where user_id in (SELECT id from users where name=' + "'" +
                                                                            user_name + "'" + 'AND job=' + "'" + user_job + "'" + ') and room_id in (SELECT room_id from rooms where room_name=' + "'" + room_name + "'" + ')';
                                                                        'AND start_time=' + "'" + start_time + "'" + 'AND end_time=' + "'" + end_time + "'";
                                                                        con.query(sql3, function (err, result) {
                                                                                if (err) {
                                                                                    res.status(400).end();
                                                                                } else {
                                                                                    res.status(201).send({
                                                                                        'id': result[0].id,
                                                                                        'name': user_name,
                                                                                        'job': user_job,
                                                                                        'room_name': room_name,
                                                                                        'booking_start_time': result[0].booking_start_time,
                                                                                        'booking_end_time': result[0].booking_end_time
                                                                                    });
                                                                                }
                                                                            }
                                                                        )
                                                                    }
                                                                    con.end();
                                                                });
                                                            }
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
            }
        }
    });



    function validateBookingInfo( reqRoomName, roomName, startTime, endTime, bookingStartTime, bookingEndTime, roomStartTime, roomEndTime) {
        var start=(startTime).substr(16, 8).split(":");
        var end = (endTime).substr(16, 8).split(":");
        var startTimeVal = parseInt(start[0])*3600+parseInt(start[1])*60;  // +parseInt(start[2]);
        var endTimeVal = parseInt(end[0])*3600+parseInt(end[1])*60;   // +parseInt(end[2]);

        var bookingStart=(bookingStartTime).substr(16, 8).split(":");
        var bookingEnd = (bookingEndTime).substr(16, 8).split(":");
        var bookingStartTimeVal = parseInt(bookingStart[0])*3600+parseInt(bookingStart[1])*60;    // +parseInt(bookingStart[2]);
        var bookingEndTimeVal = parseInt(bookingEnd[0])*3600+parseInt(bookingEnd[1])*60;   // +parseInt(bookingEnd[2]);

        var roomStart=(roomStartTime).substr(16, 8).split(":");
        var roomEnd = (roomEndTime).substr(16, 8).split(":");
        var roomStartTimeVal = parseInt(roomStart[0])*3600+parseInt(roomStart[1])*60;   // +parseInt(roomStart[2]);
        var roomEndTimeVal = parseInt(roomEnd[0])*3600+parseInt(roomEnd[1])*60;   // +parseInt(roomEnd[2]);

        if(reqRoomName===roomName){
            if((new Date(startTime).getFullYear()===new Date(bookingStartTime).getFullYear())&&(new Date(startTime).getMonth()===new Date(bookingStartTime).getMonth())&&(new Date(startTime).getDate()===new Date(bookingStartTime).getDate())){
                        if((startTimeVal.toString()==='NaN')||(endTimeVal.toString()==='NaN')||(endTimeVal-startTimeVal<0)) {
                            return 1
                        }
                        else if((bookingStartTimeVal<startTimeVal&&startTimeVal<bookingEndTimeVal)||(bookingStartTimeVal<endTimeVal&&endTimeVal<bookingEndTimeVal)||(startTimeVal<bookingStartTimeVal&&bookingStartTimeVal<endTimeVal)||(bookingStartTimeVal===startTimeVal||bookingEndTimeVal===endTimeVal)) {
                            return 2;
                        }else if(roomStartTimeVal>startTimeVal||endTimeVal>roomEndTimeVal){
                            return 3;
                        }else {
                            return 0;
                        }
                    }
                    else {
                if((startTimeVal.toString()==='NaN')||(endTimeVal.toString()==='NaN')||(endTimeVal-startTimeVal<0)) {
                    return 1
                }
               else if(roomStartTimeVal>startTimeVal||endTimeVal>roomEndTimeVal){
                    return 3;
                }else {
                    return 0;
                }
            }

        }
        return 0;

    }

};
