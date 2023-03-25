const httpStatus = require("http-status")
const JWT = require("jsonwebtoken")


const authenticateToken = (req,res,next) => {
   const authHeader =  req.headers["authorization"]
   const token = authHeader && authHeader.split(" ")[1]
   if(token == null) {
    return res.status(httpStatus.UNAUTHORIZED).send({ error : "Bu işlemi yapmak için ilk olarak giriş yapmalısınız."})
   }
   

   JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, host) => {
    if(err) return res.status(httpStatus.FORBIDDEN).send({ error : err })
    req.host = host;
    next();
   })
}

module.exports = authenticateToken;