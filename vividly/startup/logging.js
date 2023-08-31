const config = require('config');
module.exports = function () {
    if(!config.get('jwtPrivateKey')) {
        throw Error ('Private Key is missing');
    }
}