const Question = require('../models/Questions');

const questionSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('Yeni bir bağlantı oluşturuldu:', socket.id);

    // Yeni bir soru gönderildiğinde
    socket.on('question', async (data) => {
      console.log(data);
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
        io.emit('newQuestion', question);
      } catch (error) {
        console.error('Soru kaydedilirken bir hata oluştu:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Bir bağlantı sonlandırıldı:', socket.id);
    });
  });
};

module.exports = {
  questionSocket,
}