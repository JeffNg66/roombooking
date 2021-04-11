module.exports = {
    database:{
        host: process.env.HOST || 'localhost',
        user: process.env.USER || 'room_admin',
        password: process.env.PASSWORD || 'room@123',
        database: process.env.DB || 'room_booking'
    }
};

