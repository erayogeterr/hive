const { insert, list, loginHost} = require("../services/Hosts");
const httpStatus = require("http-status");
const { passwordToHash, generateAccessToken, generateRefreshToken } = require("../scripts/utils/helper");


const create = (req, res) => {
    req.body.password = passwordToHash(req.body.password);
    insert(req.body)
        .then((response) => {
            res.status(httpStatus.CREATED).send(response);
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
        });
};

const index = (req, res) => {
   list()
    .then((response) => {
        res.status(httpStatus.OK).send(response);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

const login = (req, res) => {
   req.body.password = passwordToHash(req.body.password);
    loginHost(req.body) 
        .then((host) => {
            if(!host) return res.status(httpStatus.NOT_FOUND).send({ message : "Böyle bir kullanıcı bulunmamaktadır."})
            host = {
                ...host.toObject(),
                tokens : {
                    access_token : generateAccessToken(host),
                    refresh_token : generateRefreshToken(host),
                }
            }
            res.status(httpStatus.OK).send(host);
        })
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
}


module.exports = {
    create,
    index,
    login,
}