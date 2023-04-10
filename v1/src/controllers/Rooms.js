const httpStatus = require("http-status");
const { insert, list, listIdRoom, remove } = require("../services/Rooms");
const { passwordToHash } = require("../scripts/utils/helper");
const Rooms = require("../models/Rooms");
const Participant = require('../models/Participants');

const create = (req, res) => {
    //req.body.password = passwordToHash(req.body.password);
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
            return res.status(httpStatus.NOT_FOUND).send({message: "Böyle bir oda bulunmamaktadır.",});
        }
        res.status(httpStatus.OK).send({message: "Oda silinmiştir.",
        });
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Silme işlemi sırasında hata ile karşılaşıldı." }));
}

const JoinRoom = async (req, res) => {
    try {
        const roomId = req.params.id // roomId'yi parametre olarak al
        console.log("roomId : ",roomId);
        const password = req.body.password; // password'u istek gövdesinden al
        console.log("req body password : ", password);
        const anonymousName = "anonymous-" + Math.random().toString(36).substring(7);
        
        // Oda ID'sini kullanarak odayı bul
        const room = await Rooms.findById(roomId);
        console.log("room password: " + room.password);
        if (!room) {
          return res.status(404).json({ message: 'Oda bulunamadı' });
        }
        
        // Şifreyi kontrol et
        if (room.password !== password) {
          return res.status(401).json({ message: 'Geçersiz şifre' });
        }
        
        // Yeni bir katılımcı oluştur ve odaya ekle
        const participant = new Participant({ name : anonymousName ,room: room.id });
        await participant.save();
        console.log(participant.name);
        room.participants.push(participant.id);
        await room.save();
    
        return res.status(201).json({ message: 'Katılımcı başarıyla eklendi' });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Sunucu hatası' });
      }
    };




module.exports = {
    create,
    index,
    getByIdRoom,
    deleteRoom,
    JoinRoom,
}