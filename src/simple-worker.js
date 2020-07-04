const amqp = require('amqplib/callback_api');
const { getConfig } = require('./config');

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms))

amqp.connect('amqp://localhost:5672', (err, conn) => {

  if (err) throw new Error('err to connect')

  conn.createChannel((err, ch) => {

    const queue = 'queue_simple';
    ch.assertQueue(queue, { durable: true });
    ch.prefetch(1);

    ch.consume(queue, async (msg) => {
      try {
        await sleep(getConfig().timeToProcess)
        //console.log(msg);
        console.log(msg.content.toString());
        //throw new Error('Error on consume message')
        ch.ack(msg);
      } catch (error) {
        ch.nack(msg);
      }
    });
  });

});
