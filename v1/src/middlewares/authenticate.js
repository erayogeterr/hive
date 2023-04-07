const httpStatus = require("http-status")
const JWT = require("jsonwebtoken")


 const authenticateToken = (req,res,next) => {
    const authHeader =  req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if(token == null) {
     return res.status(httpStatus.UNAUTHORIZED).send({ error : "Bu işlemi yapmak için ilk olarak giriş yapmalısınız."})
    }
   

   //  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
   //   if(err) return res.status(httpStatus.FORBIDDEN).send({ error : err })
   //   //req.user = user?.doc;
   //   req.user = user;
   //   next();
   //  })
   try {
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // req.user özelliğini ayarla
      next(); // bir sonraki işleve geç
    } catch (ex) {
      res.status(httpStatus.BAD_REQUEST).send("Invalid token.");
    }
 }


module.exports = authenticateToken;