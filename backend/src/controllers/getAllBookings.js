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
            console.log(err);
        }else {
            let value = getToken.jwtDecode(req);
            if(value===undefined){
                res.status(400).send("There is not token information!");
            }else{
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
                            let sql = 'SELECT *  FROM users WHERE name=' + "'" + req.params.user_name + "'"
                            con.query(sql, function (err, result) {

                                if (err) {
                                    res.status(400).end();
                                } else {
                                    if (result.length === 0) {
                                        res.sendStatus(400);
                                    } else {
                                      //  if(result[0].role_id===1){                                 //admin
                                            let sql = 'SELECT bookings.id, users.name, users.job, rooms.room_name, bookings.booking_start_time, booking_end_time FROM ((bookings INNER JOIN users ON bookings.user_id = users.id) INNER JOIN rooms ON bookings.room_id = rooms.room_id)';
                                            con.query(sql, function (err, result) {

                                                if (err) {
                                                    res.status(400).end();
                                                } else {
                                                    if (result.length === 0) {
                                                        res.status(200).send(result);
                                                    } else {
                                                        let dateInfo = [];
                                                        for(let i=0;i<result.length;i++){

                                                           if((calDate(result[i].booking_start_time)===req.params.date)||(calDate(result[i].booking_end_time)===req.params.date)){
                                                               dateInfo.push(result[i]);
                                                               }
                                                        }
                                                        res.status(200).send(dateInfo);
                                                    }
                                                }
                                                con.end();
                                            })
                                        // }else {                                            //staff
                                        //
                                        //     let sql = 'SELECT bookings.id, users.name, users.job, rooms.room_name, bookings.booking_start_time, booking_end_time FROM ((bookings INNER JOIN users ON bookings.user_id = users.id) INNER JOIN rooms ON bookings.room_id = rooms.room_id) WHERE users.name ='+
                                        //         "'"+req.params.user_name +"'";
                                        //     con.query(sql, function (err, result) {
                                        //         if (err) {
                                        //             res.status(400).end();
                                        //         } else {
                                        //             if (result.length === 0) {
                                        //                 res.status(200).send(result);
                                        //             } else {
                                        //                 let dateInfo = [];
                                        //                 for(let i=0;i<result.length;i++){
                                        //                     if((calDate(result[i].booking_start_time)===req.params.date)||(calDate(result[i].booking_end_time)===req.params.date)){
                                        //                         dateInfo.push(result[i]);
                                        //                     }
                                        //                 }
                                        //                 res.status(200).send(dateInfo);
                                        //             }
                                        //         }
                                        //     })
                                        // }
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }

    });
    function calDate(date) {
        var val = date.substr(4, 11);
        var monthVal = val.substr(0, 3);
        var result1 = '';
        var result2 = [];
        var result = '';
        var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
        for (let i=0;i<month.length; i++){
            if(monthVal===month[i]){
                monthVal = i+1;
                result1= val.replace(month[i], monthVal);
                result2 = result1.split(' ');
                if(parseInt(result2[0])<10){
                    result2[0] = 0+result2[0];
                }
                result = result2[2]+'-'+result2[0]+'-'+result2[1];
            }
        }
        return result;
    }
};
