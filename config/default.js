module.exports = {
	port: 3000,
	session: {
		cookieSecret: 'ysraccoon',
		key: 'ysraccoon',
		maxAge: 2592000000
	},
	cookie: {
		maxAge: 2592000000,
		httpOnly: true,
		signed: true
	},
	mongodb: {
		development: {
			connectionString: 'mongodb://localhost:27017/ysraccoon'
		},
		production: {
			connectionString: 'mongodb://localhost:27017/ysraccoon-test'
		}
	}
};