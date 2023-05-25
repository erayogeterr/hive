const Partipicant = require('../models/Participants');
const httpStatus = require("http-status");

const participants = {};
const partipicantSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('Yeni bir bağlantı oluşturuldu:', socket.id);

        socket.on('partipicant', async (data) => {
            try {
                const partipicant = new Partipicant({
                    name: data.name,
                    room: data.roomId,
                });
                await partipicant.save();
                participants[socket.id] = partipicant;
                socket.join(data.roomId);
                // io.to(data.roomId).emit('newPartipicant', {name : socket.id,});
                io.to(data.roomId).emit('newPartipicant', { name: partipicant.name, _id : socket.id });
            } catch (error) {
                console.error('Katılımcı kaydedilirken bir hata oluştu:', error);
            }
        })

        socket.on("disconnecting", () => {
            console.log(socket.rooms);
            socket.rooms.forEach((room) => {
                socket.leave(room);
                console.log(room);
                io.to(room).emit('disconnectParticipant', socket.id);
                const participant = participants[socket.id];
                if (participant) {
                    delete participants[socket.id];
                    delete participants[participant.name];
                }

            });
        });

        socket.on('disconnect', () => {
            console.log('Bir bağlantı sonlandırıldı:', socket.id);
            console.log(socket.rooms);
            const participant = participants[socket.id];
            if (participant) {
                delete participants[socket.id];
                delete participants[participant.name];
            }
        });
    });
}

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
        res.status(httpStatus.OK).send(partipicants);
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

