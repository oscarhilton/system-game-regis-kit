import Redis from 'ioredis';

const DEAULT_CONFIG = {
	port: 6379,
	host: 'localhost',
	family: 4,
	db: 0,
	enableReadyCheck: true
};

export class RedisInstance {
	constructor(configuration = DEAULT_CONFIG) {
		this.redis = new Redis(configuration);

		this.ready = false;
		this.pub = this.redis.duplicate();
		this.handler = null;
		this.channel = 'test_channel';

		this.redis.on('connect', this.handleConnection);
		this.redis.on('ready', this.handleReady);
		this.redis.on('error', this.handleError);
		this.redis.on('close', this.handleClose);
		this.redis.on('reconnecting', this.handleReconnecting);

		this.redis.subscribe('message', (err) => {
			if (err) console.log(err);
		});
	}

	handleConnection() {
		console.log('CONNECTED!');
	}

	handleReady() {
		console.log('READY');
		// this.registerHandlers();
		console.log(this)
		this.ready = true;
	}

	handleError(error) {
		console.log('REDIS HAS ERRORED: %s', error);
		this.ready = false;
	}

	handleClose() {
		console.log('REDIS HAS CLOSED');
		this.ready = false;
	}

	handleReconnecting() {
		console.log('REDIS IS RECONNECTING');
		this.ready = false;
	}

	publish(channel, message) {
		this.pub.publish('message', JSON.stringify(message));
	}

	// gets a specific user
	async getUser(id, cb) {
		return await this.redis.hgetall(id, (err, user) => {
			if (err) return cb(err);
			if (!user.id) return cb();
			return cb(null, user);
		});
	}
}