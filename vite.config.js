import { sveltekit } from '@sveltejs/kit/vite';
import { Server } from 'socket.io';
import { RedisInstance } from './src/lib/redis';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit(),
		{
			name: 'sveltekit-socket-io',
			configureServer(server) {
				const io = new Server(server.httpServer, {
					cors: {
						origin: 'http://127.0.0.1:5173',
						methods: ['GET', 'POST']
					}
				});

				const redis = new RedisInstance();

				console.log(redis);

				// Socket.IO stuff goes here
				io.on('connection', (socket) => {
					// Generate a random username and send it to the client to display it
					let username = `User ${Math.round(Math.random() * 999999)}`;
					socket.emit('name', username);

					// Receive incoming messages and broadcast them
					socket.on('chatMessage', (message) => {
						redis.publish('chatMessage', message);
					});
					redis.redis.on('message', (channel, message) => {
						socket.emit('newMessage', message);
						console.log('new message: %s', message);
					});
				});

				console.log('SocketIO injected');
			}
		}
	]
};

export default config;
