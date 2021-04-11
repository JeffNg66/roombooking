const jwt = require('jwt-simple');
const secret ='xxx';

exports.jwtDecode = function (request) {
    var header = request.headers['authorization'];

    if(header=== undefined ){
        return header;
    }else {
        var token = header.split("Bearer ");
        let decoded = jwt.decode(token[1], secret);
        return decoded;
    }

}