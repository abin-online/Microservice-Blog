const kafka = require("./config")
const { Partitioners } = require('kafkajs')

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });

    (async function () {
        await producer.connect()
        await producer.send({
            topic: 'test-topic',
            messages: [
                { value: 'Hello KafkaJS user9525961!' },
            ],
        })

        await producer.disconnect()
    })()