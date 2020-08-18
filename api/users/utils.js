const jwt = require('jsonwebtoken');

var authenticate = function(req,res,next){

    try {
        jwt.verify(req.headers.authorization,"s3nh453Cr3T4d4Ap1");
        next();
    } catch (err) {
        res.status(401).json({"Message":"Autenticação Falhou"});
    }

};

module.exports = { authenticate };
