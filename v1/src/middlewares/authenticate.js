const httpStatus = require("http-status")
const JWT = require("jsonwebtoken")


// const authenticateToken = (req,res,next) => {
//    const authHeader =  req.headers["authorization"]
//    const token = authHeader && authHeader.split(" ")[1]
//    if(token == null) {
//     return res.status(httpStatus.UNAUTHORIZED).send({ error : "Bu işlemi yapmak için ilk olarak giriş yapmalısınız."})
//    }
   

//    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
//     if(err) return res.status(httpStatus.FORBIDDEN).send({ error : err })
//     req.user = user?.doc;
//     next();
//    })
// }

const authenticateToken = (req, res, next) => {
   const authHeader = req.headers["authorization"];
   if (!authHeader) {
     return res.status(httpStatus.UNAUTHORIZED).send({ error: "Bu işlemi yapmak için ilk olarak giriş yapmalısınız."});
   }
   const token = authHeader.split(" ")[1];
   JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
     if (err) {
       return res.status(httpStatus.FORBIDDEN).send({ error: err.message });
     }
     req.user = user.doc;
     next();
   });
 };

module.exports = authenticateToken;