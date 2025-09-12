PORT=3001 WORKER_FIELD=worker_0 nodemon index.js &
PORT=3002 WORKER_FIELD=worker_1 nodemon index.js &
PORT=3003 WORKER_FIELD=worker_2 nodemon index.js &



# docker run -e password_redis="e5qUny4OV6WiMnOPWt4bRM9NmEmOYa91" -e host_redis="redis-19417.c270.us-east-1-3.ec2.redns.redis-cloud.com" -p 5000:5000