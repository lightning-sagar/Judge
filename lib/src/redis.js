import { createClient } from 'redis';
import { host_redis, password_redis } from './constrants/co.js';

const connectredis = async()=>{
    const client = createClient({
        username: 'default',
        password: password_redis,
        socket: {
            host: host_redis,
            port: 19417
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