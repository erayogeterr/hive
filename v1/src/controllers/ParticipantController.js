const Partipicant = require('../models/Participants');
const httpStatus = require("http-status");

// const partipicantSocket = (io) => {
    
//     io.on('connection', (socket) => {
//         console.log('Yeni bir bağlantı oluşturuldu:', socket.id);

//         socket.on('partipicant', async (data) => {
//             try {
//                 const partipicant = new Partipicant({
//                     name: data.name,
//                     room: data.roomId,
//                 });
//                 await partipicant.save();
//                 socket.join(data.roomId);
//                 // io.to(data.roomId).emit('newPartipicant', {name : socket.id,});
//                 io.to(data.roomId).emit('newPartipicant', { name: partipicant.name, _id : socket.id });
//                 console.log({ name: partipicant.name, _id : socket.id });
//             } catch (error) {
//                 console.error('Katılımcı kaydedilirken bir hata oluştu:', error);
//             }
//         })

//         socket.on("disconnecting", () => {
//             console.log(socket.rooms);
//             socket.rooms.forEach(async (room) => {
//                 socket.leave(room);
//                 io.to(room).emit('disconnectParticipant', socket.id);

//             });
//         });

//         socket.on('disconnect', () => {
//             console.log('Bir bağlantı sonlandırıldı:', socket.id);
//             console.log(socket.rooms);
        
//         });
//     });
// }

const partipicantSocket = (io) => {

    const participants = {}; // Katılımcıları saklamak için bir nesne

    io.on('connection', (socket) => {
        console.log('Yeni bir bağlantı oluşturuldu:', socket.id);

        // Eğer aynı socketId'ye sahip bir katılımcı zaten varsa, bağlantıyı kapat
        console.log("Görünüşe göre ilk defa katılıyorsun. Sana yeni bir katılımcı nick veriyorum.")
        if (participants[socket.id]) {
            console.log("Socket.id numaran aynı olduğundan yeniden katılamazsın.")
            console.log("Socket'ini kapatıyorum.")
            socket.disconnect();
            return;
        }

        socket.on('partipicant', async (data) => {
            try {
                // Eğer aynı socketId'ye sahip bir katılımcı zaten varsa, işlemi sonlandır
                if (participants[socket.id]) {
                    return;
                }

                const partipicant = new Partipicant({
                    name: data.name,
                    room: data.roomId,
                });
                await partipicant.save();
                socket.join(data.roomId);
                participants[socket.id] = partipicant;
                io.to(data.roomId).emit('newPartipicant', { name: partipicant.name, _id : socket.id });
                console.log({ name: partipicant.name, _id : socket.id });
            } catch (error) {
                console.error('Katılımcı kaydedilirken bir hata oluştu:', error);
            }
        });

        socket.on('disconnecting', () => {
            console.log(socket.rooms);
            socket.rooms.forEach(async (room) => {
                socket.leave(room);
                console.log(room);
                if (participants[socket.id]) {
                    delete participants[socket.id];
                    io.to(room).emit('disconnectParticipant', socket.id);
                }
            });
        });

        socket.on('disconnect', () => {
            console.log('Bir bağlantı sonlandırıldı:', socket.id);
            console.log(socket.rooms);
            if (participants[socket.id]) {
                delete participants[socket.id];
            }
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

