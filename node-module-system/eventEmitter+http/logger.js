const EventEmitter = require("events");
class Logger extends EventEmitter {
    log () {
        this.emit('log');
    }
    lisent () {
        this.on('log', () => {
            console.log("Logged")
        })
    }
}
const logger = new Logger();
logger.lisent();
logger.log();
module.exports.Logger = Logger;