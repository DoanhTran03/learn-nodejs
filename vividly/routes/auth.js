const express = require('express');
const router = express.Router();
const {User, validateUser} = require('../model/user');
const bcrypt = require('bcrypt');

router.post('/', async (req,res) => {
    const {error} = validateUser(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if (!user) return res.send('The user with given email was not found');

    const validPassword = await bcrypt.compare(req.body.password, user.password );
    if (!validPassword) return res.status(404).send('Password is not correct');
    
    return res.send(true);
})

module.exports   = router;
