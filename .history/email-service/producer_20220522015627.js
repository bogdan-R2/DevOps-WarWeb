const amqp = require("amqplib");

const producerQueue = "notification";


exports.Producer = async() =>{
    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();

        await channel.assertQueue(producerQueue, {durable: true});
        await channel.assertToQueue(producerQueue, Buffer.from(JSON.stringify(data)), {persistent: true});
    } catch(error) {
        logger.error("An error occured ", error);
    }
}
