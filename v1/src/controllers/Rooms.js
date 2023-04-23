const httpStatus = require("http-status");
const { insert, list, listIdRoom, remove } = require("../services/Rooms");
const { passwordToHash } = require("../scripts/utils/helper");
const Rooms = require("../models/Rooms");
const User = require("../models/Users");
const Participant = require('../models/Participants');


const create = (req, res) => {
    const { eventName, eventDescription, lessonName } = req.body;

    if (!eventName || !eventDescription || !lessonName) {
        return res.status(httpStatus.BAD_REQUEST).send({ error: "Aktivite adı, aktivete açıklaması ve Ders adı girilmesi zorunludur." });
    }

    const room = {
        eventName,
        eventDescription,
        lessonName,
        createdBy: req.user._doc._id 
    };

    insert(room)
        .then((response) => {
            res.status(httpStatus.CREATED).send(response);
        })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
        });
}

//  const index = (req, res) => {
//      list()
//          .then((response) => {
//              res.status(httpStatus.OK).send(response);
//          })
//          .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
//  };

const index = (req, res) => {
    Rooms.find({})
      .populate({
        path: 'createdBy',
        model: User,
        select: 'email firstName lastName'
      })
      .then((rooms) => {
        if (!rooms) {
          return res.status(httpStatus.NOT_FOUND).send({ error: "Hiçbir Oda Bulunamadı." });
        }
  
        const roomsList = rooms.map((room) => {
            let createdBy = null; 
            if (room.createdBy) { // // createdBy özelliğinin id özelliğine erişmeden önce kontrol edilir.
              createdBy = {
                id: room.createdBy.id,
                email: room.createdBy.email,
                firstName: room.createdBy.firstName,
                lastName: room.createdBy.lastName,
              };
            }
          
            return {
              id: room.id,
              eventName: room.eventName,
              eventDescription: room.eventDescription,
              lessonName: room.lessonName,
              participants: room.participants,
              code: room.code,
              createdAt: room.createdAt,
              updatedAt: room.updatedAt,
              createdBy: createdBy,
            };
          });
  
        res.status(httpStatus.OK).send(roomsList);
      })
      .catch((e) => {
        console.log(e);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Odalar Getirilirken Hata Oluştu." });
      });
  }


const getByIdRoom = (req, res) => {
    if (req.params.id) {
        Rooms.findById(req.params.id)
            .populate({
                path: 'createdBy',
                model: User,
                select: 'email firstName lastName'
            })
            .then((room) => {
                if (!room) {
                    return res.status(httpStatus.NOT_FOUND).send({ error: "Aradığınız Oda Bulunamadı." });
                }
                if (!room.createdBy) {
                    return res.status(httpStatus.NOT_FOUND).send({ error: "Oda Sahibi Bulunamadı." });
                }
                res.status(httpStatus.OK).send({
                    id: room.id,
                    eventName : room.eventName,
                    eventDescription : room.eventDescription,
                    lessonName : room.lessonName,
                    participants : room.participants,
                    code : room.code,
                    createdAt: room.createdAt,
                    updatedAt: room.updatedAt,
                    createdBy: {
                        id : room.createdBy.id,
                        email: room.createdBy.email,
                        firstName: room.createdBy.firstName,
                        lastName: room.createdBy.lastName,
                    }
                });
            })
            .catch((e) => {
                console.log(e);
                res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Oda Getirilirken Hata Oluştu." });
            });
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

    const code = req.params.code;

    const room = await Rooms.findOne({ code });

    if (!room) {
        return res.status(httpStatus.NOT_FOUND).send({ message: 'Geçersiz kod' });
    }
    const participant = new Participant({ room: room.id });
    await participant.save();

    let participants = room.participants || [];
    participants.push(participant.name);
    room.participants = participants;

    await room.save();

    return res.status(httpStatus.OK).send({ message: 'Katılım başarılı.', participant });
};


const getUserRooms = (req, res) => {
    const { id } = req.params;
  
    Rooms.find({ createdBy: id })
      .then((rooms) => {
        res.status(httpStatus.OK).send(rooms);
      })
      .catch((err) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Oda getirilirken hata ile karşılaşlıldı." });
      });
  }

module.exports = {
    create,
    index,
    getByIdRoom,
    deleteRoom,
    JoinRoom,
    getUserRooms,
}