const amqp = require('amqplib/callback_api');
const { getConfig } = require('./config');

amqp.connect('amqp://localhost:5672', (err, conn) => {

  if (err) throw new Error('err to connect')

  conn.createChannel((err, ch) => {

    const ex = 'exchange_test';
    ch.assertExchange(ex, 'fanout', { durable: false });

    let ctd = 0;
    const sendMsg = () => {
      let msg = `msg ${++ctd}`;
      ch.publish(ex, '', new Buffer.from(msg));
      console.log('send', msg);
      setTimeout(sendMsg, getConfig().intervalToSend)
    }
    sendMsg();

    ch.assertQueue('queue_1', { durable: true }, (err, q) => {
      ch.bindQueue(q.queue, ex, '');
    });
    ch.assertQueue('queue_2', { durable: true }, (err, q) => {
      ch.bindQueue(q.queue, ex, '');
    });

  });

})