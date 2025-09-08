import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: 'e5qUny4OV6WiMnOPWt4bRM9NmEmOYa91',
    socket: {
        host: 'redis-19417.c270.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 19417
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result)  // >>> bar

