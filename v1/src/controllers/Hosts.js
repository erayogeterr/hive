const { insert, list, loginHost, modify} = require("../services/Hosts");
const httpStatus = require("http-status");
const uuid = require("uuid");
const { passwordToHash, generateAccessToken, generateRefreshToken } = require("../scripts/utils/helper");
const eventEmitter = require("../scripts/events/eventEmitter");

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

const resetPassword = (req,res) => {
    const new_password = uuid.v4()?.split("-")[0] || `usr-${new Date().getTime()}`;
    modify({email : req.body.email}, {password : passwordToHash(new_password)})
        .then((updatedHost) => {
            if(!updatedHost) {
                return res.status(httpStatus.NOT_FOUND).send({ error : "Böyle bir kullanıcı bulunmamaktadır."});
            }
            eventEmitter.emit("send_email", {
                to: updatedHost.email,
                subject: "Şifre Sıfırlama",
                html : `Talebiniz üzerine şifre sıfırlama işleminiz gerçekleşmiştir. <br /> Giriş yaptıktan sonra şifrenizi değiştirmeyi unutmayım! <br /> Yeni Şifreniz : <b>${new_password}`
            });
            res.status(httpStatus.OK).send({
                message: "Şifre sıfırlama işlemi için sisteme kayıtlı e-posta adresinize gereken bilgileri gönderdik."
            })
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error : "Şifre resetleme sırasında bir problem oluştu."}));
}


const update = (req, res) => {
    modify({ _id : req.host?._id }, req.body)
        .then((updatedHost) => {
            res.status(httpStatus.OK).send(update);
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Güncelleme işlemi sırasında bir problem oluştu."}))
}

module.exports = {
    create,
    index,
    login,
    resetPassword,
    update,
}