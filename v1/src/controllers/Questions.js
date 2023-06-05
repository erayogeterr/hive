const Question = require('../models/Questions');
const httpStatus = require("http-status");

const questionSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('Yeni bir bağlantı oluşturuldu:', socket.id);

    socket.on('question', async (data) => {
      try {
        const question = new Question({
          text: data.text,
          participant: "anonymous-" + socket.id.slice(1, 5),
          room: data.roomId,
        });
        await question.save();

        const response = {
          name: "anonymous-" + socket.id.slice(1, 5),
          _id: socket.id,
          text: data.text,
          questionId: question._id,
        };

        socket.emit('newQuestion', response);
        io.to(data.roomId).emit('newQuestion', response);

      } catch (error) {
        console.error('Soru kaydedilirken bir hata oluştu:', error);
      }
    });

    socket.on('toggleLikeQuestion', async (data) => {
      try {
        const questionId = data.questionId;
        const participantName = data.participantName;

        const question = await Question.findById(questionId);
        if (!question) {
          return;
        }

        const alreadyLiked = question.likedBy.includes(participantName);
        
        console.log("Aynı soruyu beğenmiş mi? : " + alreadyLiked);

        if (alreadyLiked) {
          question.likeCount -= 1;
          question.likedBy = question.likedBy.filter(name => name !== participantName.toString());
        } else {
          if (!question.likedBy.includes(participantName)) {
            question.likeCount += 1;
            question.likedBy.push(participantName);
          }
        }
        await question.save();
        const sortedQuestions = await Question.find({ room: data.roomId }).sort({ likeCount: -1 });

        const response = {
          questionId: questionId,
          likeCount: question.likeCount,
          sortedQuestions: sortedQuestions,
        };

        socket.emit('questionLiked', response);
        io.to(data.roomId).emit('questionLiked', response);

      } catch (error) {
        console.log('Soru beğenilirken bir hata oluştu:', error);
      }
    });
  });
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({});
    res.status(httpStatus.OK).send(questions);
  } catch (error) {
    console.error('Sorular alınırken bir hata oluştu:', error);
    throw error;
  }
};

const getAllQuestionsInRoom = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const questions = await Question.find({ room: roomId }).sort({ likeCount: -1 }); // En yüksek beğeni alan en üstte.
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