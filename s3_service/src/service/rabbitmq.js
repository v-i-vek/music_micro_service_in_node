import amq from "amqplib"

let connection = null
let channel = null

const EX_CHANGE_NAME = 'DELETE_SONG_EVENT'

async function connectToMQ() {
  console.log("++++++",process.env.RABBITMQ_URL)
    try {
        connection = await amq.connect(process.env.RABBITMQ_URL)
        channel = await  connection.createChannel()
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
        if(!channel)await connectToMQ()

        channel.publish(EX_CHANGE_NAME,routingKey,Buffer.from(JSON.stringify(message)))
    } catch (error) {
         console.log("Error while exeucting publishEvent() \n", error);
    throw error;
    }
}

export const consumeEvent = async(routingKey,callback)=>{
    try {
        if(!channel) await connectToMQ()
     const q = await channel.assertQueue("",{exclusive:true})
     await channel.bindQueue(q.queue,EX_CHANGE_NAME,routingKey)
     channel.consume(q.queue,(msg)=>{
        if(msg !==null){
            const content = JSON.parse(msg.content.toString())
            console.log("---->",content)
            callback(content)
            channel.ack(msg)

        }
     }) 
        
    } catch (error) {
          console.log("Error while exeucting consumeEvent() \n", error);
    throw error;  
    }
}

