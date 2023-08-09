const logger = (req,res,next) => {
    console.log("Hello, Iam middeware");
    next();
}
module.exports = logger;