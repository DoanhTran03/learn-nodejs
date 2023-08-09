/*Module is wrapped inside a wrapper function consist of following parameter: exports, require, module, __filename, __dirname*/
const url = "http://localhost:5173";
const path = require("path");
const pathObj = path.parse(__filename);

const moduleServices = {
  name: "Hello",
  printAddress: () => {
    console.log(pathObj);
  },
  printExports: () => {
    consolt.log(exports);
  }
};
module.exports.printAddress = this.printAddress;
module.exports = moduleServices;
