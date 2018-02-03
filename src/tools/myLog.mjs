/**
 * Created by dx on 16-8-30.
 */
import config from '../config';
import log4js from 'log4js'

/**
 * 打印日志方法
 * @param path
 * @returns {{l: l, e: e}}
 */
log4js.configure({
	appenders: [
		{
			type: 'console',     //控制台输出
			layout: {
//                type: 'pattern',
				pattern: '[%d] [%[%p%]] %c  - %m%n',
			}
		},
		{
			type: 'logLevelFilter',
			level: config.logLevel.info,        //定义项目日志输出级别
			appender: {
				type: 'dateFile', //文件输出
				filename: config.logPath,
				pattern: "yyyy-MM-dd.log",
				alwaysIncludePattern: true,
			},
		}]
});

const logger = log4js.getLogger();

export default {
	e: function (...arr) {
		arr.map(item => {
			logger.error(item);
		});
		logger.error("\n");
	},
	
	i: function (...arr) {
		arr.map(item => {
			logger.info(item);
		});
		logger.info("\n");
	},
	
	d: function (...arr) {
		arr.map(item => {
			logger.debug(item);
		});
		logger.debug("\n");
	}
}
