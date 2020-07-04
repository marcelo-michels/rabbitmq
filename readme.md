# RabbitMQ

## Install RabbitMQ

Install using Docker (docker-compose.yml in this repo)
```
docker-compose up -d
```

Install plugin for web browser suporting
```
docker exec -it rabbitmq rabbitmq-plugins enable rabbitmq_web_stomp
```

Access manager web interface
[localhost:15672](http://localhost:15672/)

## Install dependencies

```
npm install
```

## Run examples:

### Send messages to the queue

This send messages to queue "queue_simple"
```
node src/simple-sender.js
```

### Consume messages from the queue

This receives messages from the queue "queue_simple"  
Can run multiple processes this  
```
node src/simple-worker.js
```


### Send messages to the exchange

This send messages to exchange "exchange_test"  
For each message sent to that exchange, it will be delivered to the queues (queue_1, queue_2)
```
node src/exchange-sender.js
```

To consume messages from an exchange you must consume the queues directly  

```
# Terminal 1, consume messages from queue_1
node src/exchange-worker.js queue_1
```

```
# Terminal 2, consume messages from queue_2
node src/exchange-worker.js queue_2
```
