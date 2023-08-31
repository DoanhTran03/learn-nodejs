
function admin (req,res,next) {
    console.log(req.user);
    if(!req.user.isAdmin) return res.status(403).send('The user does not have authorization for this access');
    
    next();
}
module.exports = admin;