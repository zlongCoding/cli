const path = require('path');
const fs = require("fs")
// exports.targetDir = path.resolve(__dirname, '..', 'perf');
const configFile = path.resolve(process.cwd(), 'rollup.config.js');

// try {
// 	fs.accessSync(configFile, fs.constants.R_OK);
// } catch (e) {
// 	console.error(`No valid "rollup.config.js" in ${process.cwd()}. Did you "npm run perf:init"?`);
// 	process.exit(1);
// }


exports.loadPerfConfig = async () => {
	console.log(configFile)
};