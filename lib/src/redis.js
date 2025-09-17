import { createClient } from 'redis';

const connectredis = async()=>{
    const client = createClient({
        username: 'default',
        password: process.env.password_redis,
        socket: {
            host: process.env.host_redis,
            port: process.env.redis_port
        }
    });
    
    client.on('error', err => console.log('something went wrong with server pls contact to team lead'));

    await client.connect()
        .then(() => {
            console.log();
        })
        .catch((err)=>{
            console.log('something went wrong with server pls contact to team lead')
        })

    return client;
}

export {connectredis};