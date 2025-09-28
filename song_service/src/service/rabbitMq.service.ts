import amq from "amqplib"

let connection = null
let channel = null
const EX_CHANGE_NAME = 'DELETE_SONG_EVENT'

async function connectToMQ() {
    try {
        connection  = await amq.connect(process.env.RABBITMQ_URL)
        channel  = await connection.createChannel()
        await channel.assertExchange(EX_CHANGE_NAME,'topic',{durable:false})
        console.info("✅ Connected to RabbitMQ successfully")
        return channel
    } catch (error) {
        console.error("❌  Error while connecting to the RabbitMQ \n",error )
        throw error
    }
}

export const publishEvent = async(routingKey,message)=>{
    try {
        if(!connection) await connectToMQ()
        channel.publish(EX_CHANGE_NAME,routingKey,Buffer.from(JSON.stringify(message)))

        console.log("✅ event published succesfully")
            
    } catch (error) {
     console.error("❌  Error while publishing the event through rabbitMQ \n",error )

        throw error
    }
}