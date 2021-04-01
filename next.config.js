const path = require('path')
//const withVideos = require('next-videos')
//module.exports = withVideos()
const allowedImageWordPressDomain = new URL(process.env.GRAPHQL_HOST).hostname


module.exports = {
	trailingSlash: false,
	webpackDevMiddleware: config => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300
		}

		return config
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')]
	},
	images: {
		domains: [ allowedImageWordPressDomain, 'via.placeholder.com' ],
	},
}

