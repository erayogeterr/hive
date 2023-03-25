const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

const passwordToHash = (password) => {
    return CryptoJS.HmacSHA256(password, CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH).toString()).toString();
 };
 
 const generateAccessToken = (host) => {
    return JWT.sign({name : host.email, ...host}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: "1w"}) //şifrelendiriyor ama isimlendirmekde gerekiyor. key'i name.
   
}
const generateRefreshToken = (host) => {
    return JWT.sign({name : host.email, ...host}, process.env.REFRESH_TOKEN_SECRET_KEY)
}


module.exports = {
    passwordToHash,
    generateAccessToken,
    generateRefreshToken,
};