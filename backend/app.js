var {
  BASE_URL,
  GETALLUSERS,
  UPDATEUSER,
    LOGINUSER,
    GETALLROOMS,
    UPDATEROOM,
    GETALLBOOKINGS,
    DELETEBOOKING,
    ADDBOOKING,
    GETALLBOOKINGDATES
} = require('./src/config/index');


var getAllUsers = require('./src/controllers/getAllUsers');
var addUser= require('./src/controllers/addUser');
var updateUser = require('./src/controllers/updateUser');
var logInUser = require('./src/controllers/logInUser');
var getAllRooms = require('./src/controllers/getAllRooms');
var addRoom = require('./src/controllers/addRoom');
var updateRoom = require('./src/controllers/updateRoom');
var deleteRoom = require('./src/controllers/deleteRoom');
var getAllBookings = require('./src/controllers/getAllBookings');
var addBooking = require('./src/controllers/addBooking');
var deleteBooking = require('./src/controllers/deleteBooking');
var updateBooking = require('./src/controllers/updateBooking');
var getAllDateInfo = require('./src/controllers/getAllDateInfo');

const upload = require('express-fileupload');

var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');
var http = express();
const router = express.Router();
//Setting static folder
http.use(express.static('public'));
//server router
http.use(router);

const PORT = process.env.PORT || 8088;


http.options('*', cors());
http.use(cors());
http.use(upload());
http.use(bodyParser.urlencoded({ extended: false }));
var jsonParser = bodyParser.json();



// log in user
http.post(`${BASE_URL}${LOGINUSER}`, jsonParser, function(req, res) {
    logInUser.confirm(req, res);
});

//get all users information
http.get(`${BASE_URL}${GETALLUSERS}`, jsonParser, function(req, res) {
    getAllUsers.confirm(req, res);
});

//add users information
http.put(`${BASE_URL}${GETALLUSERS}`, jsonParser, function(req, res) {
  addUser.confirm(req, res);
});

//update user information by id
http.post(`${BASE_URL}${UPDATEUSER}`, jsonParser, function(req, res) {
  updateUser.confirm(req, res);
});

//get all rooms information
http.get(`${BASE_URL}${GETALLROOMS}`, jsonParser, function(req, res) {
    getAllRooms.confirm(req, res);
});

//add new room information
http.put(`${BASE_URL}${GETALLROOMS}`, jsonParser, function(req, res) {
    addRoom.confirm(req, res);
});

//update room information by id
http.post(`${BASE_URL}${UPDATEROOM}`, jsonParser, function(req, res) {
    var id = req.params.id;
    updateRoom.confirm(req, res);
});

//delete room information by id
http.delete(`${BASE_URL}${UPDATEROOM}`, jsonParser, function(req, res) {
    deleteRoom.confirm(req, res);
});

//get all bookings information
http.get(`${BASE_URL}${GETALLBOOKINGS}`, jsonParser, function(req, res) {
    getAllBookings.confirm(req, res);
});

//add new booking information
http.put(`${BASE_URL}${ADDBOOKING}`, jsonParser, function(req, res) {
    addBooking.confirm(req, res);
});

//update booking information by id
http.post(`${BASE_URL}${DELETEBOOKING}`, jsonParser, function(req, res) {
    updateBooking.confirm(req, res);
});

//delete booking information by id
http.delete(`${BASE_URL}${DELETEBOOKING}`, jsonParser, function(req, res) {
    deleteBooking.confirm(req, res);
});

//get all booking date information by user name
http.get(`${BASE_URL}${GETALLBOOKINGDATES}`, jsonParser, function(req, res) {
    getAllDateInfo.confirm(req, res);
});

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} at ${new Date()}.`);
});
