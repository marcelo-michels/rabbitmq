const amqp = require('amqplib/callback_api');
const { getConfig } = require('./config');

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms))

amqp.connect('amqp://localhost:5672', (err, conn) => {

  if (err) throw new Error('err to connect')

  conn.createChannel((err, ch) => {

    const queue = process.argv[2];
    if (!queue) throw new Error('invalid consumer queue');

    ch.assertQueue(queue);
    ch.prefetch(1);

    ch.consume(queue, async (msg) => {
      try {

        await sleep(getConfig().timeToProcess);
        console.log(msg.content.toString());
        ch.ack(msg);

      } catch (error) {
        ch.nack(msg);
      }

    }, { durable: true });
  });

});