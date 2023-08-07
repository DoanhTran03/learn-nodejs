/*HTTP module contains all EventEmitter methods*/
const http = require("http");   
const server = http.createServer((req,res) => {
    if(req = "/") {
        res.write("This is backend");
        res.end();
    }
    if (req = "/books") {
        res.write("Book list");
        res.end();
    }
})
server.listen(3000, () => {
    console.log(`server is listening on: http://localhost:3000`)
})