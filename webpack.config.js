const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	entry: {
		'local-business': path.resolve( process.cwd(), 'src/local-business/index.js' ),
		rating: path.resolve( process.cwd(), 'src/rating/index.js' ),
		faq: path.resolve( process.cwd(), 'src/faq/index.js' ),
	},
};
