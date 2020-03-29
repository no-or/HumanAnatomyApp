const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ');
    if(!token) return res.status(401).send(`Access Denied`);

    try{
        req.admin = jwt.verify(token[1], process.env.ACCESS_TOKEN_SECRET);
        next();
    } catch (e) {
        res.status(403).send('Invalid Token');
    }
};


