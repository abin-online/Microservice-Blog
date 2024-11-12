const kafka = require("./config");

const consumer = kafka.consumer({ groupId: 'test-group' });

    (async function () {
        await consumer.connect()
        await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    value: message.value.toString(),
                })
            },
        })
    })()