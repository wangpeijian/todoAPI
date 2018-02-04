/**
 * Created by dx on 16-8-30.
 */
import log4js from 'log4js'

/**
 * 打印日志方法
 * @param path
 * @returns {{l: l, e: e}}
 */

export default class {
	constructor(){
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
		
		this.loggerDebug = log4js.getLogger();
		this.loggerInfo = log4js.getLogger("level_info");
		this.loggerError = log4js.getLogger("level_error");
	}
	
	e(...arr) {
		arr.map(item => {
			this.loggerError.error(item);
		});
		this.loggerError.error("\n");
	}
	
	i(...arr) {
		arr.map(item => {
			this.loggerInfo.info(item);
		});
		this.loggerInfo.info("\n");
	}
	
	d(...arr) {
		arr.map(item => {
			this.loggerDebug.debug(item);
		});
		this.loggerDebug.debug("\n");
	}
}





