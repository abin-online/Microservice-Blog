const kafka = require('./kafkaConfig')
const { Partitioners } = require('kafkajs')


async function produce(topic, value) {
    try {
        const producer = kafka.producer({createPartitioner: Partitioners.LegacyPartitioner})
        await producer.connect()
        await producer.send({
            topic,
            messages: [{
                value
            }]
        })
        await producer.disconnect()
    } catch (error) {
        console.log(error);
    }
}

module.exports = produce