const Partipicant = require('../models/Participants');
const httpStatus = require("http-status");
const Room = require("../models/Rooms");

const partipicantSocket = (io) => {

    const participants = {};

    io.on('connection', (socket) => {
        console.log('Yeni bir bağlantı oluşturuldu:', socket.id);

        socket.on('partipicant', async (data) => {
            try {
                let room;
                if (data.roomCode) {
                     room = await Room.findOne({ code: data.roomCode });

                if (!room) {
                    const errorMessage = 'Oda kodu yanlış!';
                    socket.emit('newParticipant', errorMessage);
                    return;
                  }
                }

                const partipicant = new Partipicant({
                    name: "anonymous-" + socket.id.slice(1, 5),
                    room: data?.roomId||room.id,
                });

                await partipicant.save();

                    if (data.roomId) {
                        socket.join(data.roomId);
                    } else {
                        socket.join(room.id);
                    }

                const response = {
                    name: partipicant.name,
                    _id: socket.id,
                  };
                  
                  io.to(data?.roomId||room.id).emit('newParticipant', response);

            } catch (error) {
                console.error('Katılımcı kaydedilirken bir hata oluştu:', error);
            }
        });

        socket.on('disconnecting', () => {
            console.log(socket.rooms);
            socket.rooms.forEach(async (room) => {
                socket.leave(room);
                console.log(room);
                console.log("Socketten çıktın.")
                io.to(room).emit('disconnectParticipant', { _id: socket.id });
            });
        });

        socket.on('disconnect', () => {
            console.log('Bir bağlantı sonlandırıldı:', socket.id);
            console.log(socket.rooms);

        });
    });
};


const getAllPartipicants = async (req, res) => {
    try {
        const partipicants = await Partipicant.find();
        res.status(httpStatus.OK).send(partipicants);
    } catch (error) {
        console.error('Katılımcılar alınırken bir hata oluştu:', error);
        throw error;
    }
};

const getAllPartipicantsInRoom = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const partipicants = await Partipicant.find({ room: roomId });
        res.status(httpStatus.OK).send({ participantLenght: partipicants.length });
    } catch (error) {
        console.error('Odaya özgü katılımcılar alınırken bir hata oluştu:', error);
        throw error;
    }
};

module.exports = {
    partipicantSocket,
    getAllPartipicants,
    getAllPartipicantsInRoom

}

