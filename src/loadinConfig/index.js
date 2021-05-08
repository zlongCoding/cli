const path = require('path');
const fs = require("fs")
// exports.targetDir = path.resolve(__dirname, '..', 'perf');
const configFile = path.resolve(__dirname, 'daily.config.js');
const rollup = require('./dist/rollup.js');
try {
	fs.accessSync(configFile, fs.constants.R_OK);
	// console.log(configFile)
	
} catch (e) {
	console.log(e)
	// console.error(`No valid "daily.config.js" in ${process.cwd()}. Did you "npm run perf:init"?`);
	process.exit(1);
}
function loadConfigFromCode(code) {
	const defaultLoader = require.extensions['.js'];
	require.extensions['.js'] = (module, filename) => {
		if (filename === configFile) {
			module._compile(code, filename);
		} else {
			defaultLoader(module, filename);
		}
	};
	delete require.cache[configFile];
	return require(configFile);
}

console.log("fsadafa")
;(
	async () => {
		const bundle = await rollup.rollup({
			input: configFile,
			external: id => (id[0] !== '.' && !path.isAbsolute(id)) || id.slice(-5, id.length) === '.json',
			onwarn: warning => console.error(warning.message)
		});
	     let aa = (await bundle.generate({ format: 'cjs' })).output[0].code
		let config = loadConfigFromCode((await bundle.generate({ format: 'cjs' })).output[0].code);
		// console.log(aa)
		// console.log("================")
		// console.log(config)
		// config = typeof config === 'function' ? config({}) : config;
		// return Array.isArray(config) ? config[0] : config;
	}
)() 

// exports.loadPerfConfig = async () => {
// 	console.log(configFile)
// };