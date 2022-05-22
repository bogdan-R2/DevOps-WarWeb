const amqp = require("amqplib");

const producerQueue = "notification";


exports.Producer = async() =>{
    try{
        const connection = await amqp.connect("amqp://localhost");

    }
}
