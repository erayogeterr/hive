const httpStatus = require("http-status");
const { insert, list, listIdRoom, remove } = require("../services/Rooms");
const { passwordToHash } = require("../scripts/utils/helper");
const Rooms = require("../models/Rooms");
const Participant = require('../models/Participants');

const create = (req, res) => {
    req.body.password = passwordToHash(req.body.password);
    insert(req.body)
        .then((response) => {
            res.status(httpStatus.CREATED).send(response);
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
        });
}

const index = (req, res) => {
    list()
        .then((response) => {
            res.status(httpStatus.OK).send(response);
        })
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

const getByIdRoom = (req, res) => {
    if (req.params.id) {
        listIdRoom(req.params.id)
            .then((response) => {
                res.status(httpStatus.OK).send(response);
            })
            .catch((e) => res.status(httpStatus.NOT_FOUND).send({ error: "Aradığınız Oda Bulunamadı." }))
    } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Oda Getirilirken Hata Oluştu." });
    }
}

const deleteRoom = (req, res) => {
    remove(req.params.id)
        .then((deletedItem) => {
            if (!deletedItem) {
                return res.status(httpStatus.NOT_FOUND).send({ message: "Böyle bir oda bulunmamaktadır.", });
            }
            res.status(httpStatus.OK).send({
                message: "Oda silinmiştir.",
            });
        })
        .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Silme işlemi sırasında hata ile karşılaşıldı." }));
}

const JoinRoom = async (req, res) => {
    try {
        const roomId = req.params.id // roomId'yi parametre olarak al
        const password = passwordToHash(req.body.password); // password'u istek gövdesinden al

        // Oda ID'sini kullanarak odayı bul
        const room = await Rooms.findById(roomId);

        // Şifreyi kontrol et
        if (room.password !== password) {
            return res.status(httpStatus.UNAUTHORIZED).send({ message: 'Geçersiz şifre' });
        }

        // Yeni bir katılımcı oluştur ve odaya ekle
        const participant = new Participant({room: room.id});
        await participant.save();

        let participants = room.participants || [];
        participants.push(participant.name);
        room.participants = participants;

        await room.save();

        return res.status(httpStatus.CREATED).send({ message: 'Katılımcı başarıyla eklendi' });
    } catch (err) {
        console.error(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Sunucu hatası' });
    }
};


module.exports = {
    create,
    index,
    getByIdRoom,
    deleteRoom,
    JoinRoom,
}