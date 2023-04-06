const { insert, list, loginHost, modify, remove} = require("../services/Hosts");
const httpStatus = require("http-status");
const uuid = require("uuid");
const { passwordToHash, generateAccessToken, generateRefreshToken } = require("../scripts/utils/helper");
const eventEmitter = require("../scripts/events/eventEmitter");
const path = require("path");

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
            res.status(httpStatus.OK).send(updatedHost);
        })
        .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Güncelleme işlemi sırasında bir problem oluştu."}))
}

const deleteHost = (req, res) => {
    if(!req.params?.id) {
        return res.status(httpStatus.BAD_REQUEST).send({
            message : "ID Bilgisi Eksik.",
        });
    }
    remove(req.params?.id)
        .then((deletedItem) => {
            if(!deletedItem) {
                return res.status(httpStatus.NOT_FOUND).send({
                    message : "Böyle bir kayıt bulunmamaktadır.",
                });
            }
            res.status(httpStatus.OK).send({
                message : "Kayıt silinmiştir.",
            });
        })
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Silme işlemi sırasında hata ile karşılaşıldı."}));
}

 const changePassword = (req, res) => {
      req.body.password = passwordToHash(req.body.password);
      modify({ _id : req.user?._id }, { password: req.body.password })
          .then((updatedHost) => {
              res.status(httpStatus.OK).send(updatedHost);
          })
          .catch(() => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error : "Güncelleme işlemi sırasında bir problem oluştu."}))
 }


const updateProfileImage = (req,res) => {
    //Resim Kontrol
   if(!req?.files?.profile_image) {
        return res.status(httpStatus.BAD_REQUEST).send({error : "Bu işlemi yapabilmek için yeterli veriye sahip değilsiniz."})
    }

    //Upload İşlemi
    const extension = path.extname(req.files.profile_image.name);
    const fileName = `${req?.host._id}${extension}`;
    const folderPath = path.join(__dirname, "../", "uploads/hosts", fileName);
    req.files.profile_image.mv(folderPath, function (err) {
        if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err});
        modify({ id : req.host._id}, {profile_image: fileName})
            .then((updatedHost) => {
                res.status(httpStatus.OK).send(updatedHost);
            })
            .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error : "Upload başarılı fakat kayıt sırasında bir problem oluştu."}))
    });
}

module.exports = {
    create,
    index,
    login,
    resetPassword,
    update,
    deleteHost,
    changePassword,
    updateProfileImage,
}