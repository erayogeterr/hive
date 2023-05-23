const Question = require('../models/Questions');
const httpStatus = require("http-status");

const questionSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('Yeni bir bağlantı oluşturuldu:', socket.id);

    // Yeni bir soru gönderildiğinde
    socket.on('question', async (data) => {
      try {
        // Question modelinden yeni bir soru oluştur
        const question = new Question({
          text: data.text,
          participant: data.participantId,
          room: data.roomId,
        });

        // Soruyu kaydet
        await question.save();

        // Yeni soruyu tüm bağlantılara yayınla
       // io.emit('newQuestion', question);
       io.to(data.roomId).emit('newQuestion', question);
        console.log(data.roomId);
      } catch (error) {
        console.error('Soru kaydedilirken bir hata oluştu:', error);
      }
    });


    socket.on('partipicant',async (data) => {
      socket.join(data.roomId);
      io.to(data.roomId).emit('newPartipicant', {name : "anonymous" + socket.id});
    })

    socket.on('disconnect', () => {
      console.log('Bir bağlantı sonlandırıldı:', socket.id);
    });
  });
};

const getAllQuestions = async (req,res) => {
  try {
    const questions = await Question.find({});
    //return questions;
    res.status(httpStatus.OK).send(questions);
  } catch (error) {
    console.error('Sorular alınırken bir hata oluştu:', error);
    throw error;
  }
};

const getAllQuestionsInRoom = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const questions = await Question.find({ room: roomId });
    res.status(httpStatus.OK).send(questions);
  } catch (error) {
    console.error('Odaya özgü sorular alınırken bir hata oluştu:', error);
    throw error;
  }
};

module.exports = {
  questionSocket,
  getAllQuestions,
  getAllQuestionsInRoom,
}