const amqp = require('amqplib/callback_api');
const { getConfig } = require('./config');

amqp.connect('amqp://localhost:5672', (err, conn) => {

  if (err) throw new Error('err to connect')

  conn.createChannel((err, ch) => {

    const queue = 'queue_simple';
    ch.assertQueue(queue, { durable: true });

    let ctd = 0;

    const sendMsg = () => {
      let msg = `msg ${++ctd}`;
      ch.sendToQueue(queue, new Buffer.from(msg), { persistent: true });
      console.log('send', msg);
      setTimeout(sendMsg, getConfig().intervalToSend)
    }
    sendMsg();
  });

});
