/*Note: event needed to be rasied by same emitter to be catched
Solution:
creating a class that extending EventEmitter
*/
const EventEmitter = require ("events");
const emitter = new EventEmitter();

emitter.on("log", () => {
    console.log("logged")
} )
emitter.emit("log")

