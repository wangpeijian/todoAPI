/**
 * Created by dx on 16-8-30.
 */
import log4js from 'log4js'

/**
 * 打印日志方法
 * @param path
 * @returns {{l: l, e: e}}
 */
log4js.configure({
	appenders: {
		console: {type: 'console'},
		infoOuter: {
			type: 'dateFile', filename: `${$config.logPath}info`, pattern: '.yyyy-MM-dd.log', alwaysIncludePattern: true,
		},
		errorOuter: {
			type: 'dateFile', filename: `${$config.logPath}error`, pattern: '.yyyy-MM-dd.log',
			alwaysIncludePattern: true,
		}
	},
	categories: {
		default: {appenders: ['console'], level: $config.logLevel.debug},
		level_info: {appenders: ['console', 'infoOuter'], level: $config.logLevel.info},
		level_error: {appenders: ['console', 'infoOuter', 'errorOuter'], level: $config.logLevel.error}
	}
});

const loggerDebug = log4js.getLogger();
const loggerInfo = log4js.getLogger("level_info");
const loggerError = log4js.getLogger("level_error");


function e(...arr) {
	arr.map(item => {
		loggerError.error(item);
	});
	loggerError.error("\n");
}

function i(...arr) {
	arr.map(item => {
		loggerInfo.info(item);
	});
	loggerInfo.info("\n");
}

function d(...arr) {
	arr.map(item => {
		loggerDebug.debug(item);
	});
	loggerDebug.debug("\n");
}

export default {
	e,
	i,
	d
}
