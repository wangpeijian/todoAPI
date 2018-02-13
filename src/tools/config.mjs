import path from 'path'
const config = {};

/*----------项目配置信息-----------*/
//项目名
config.project = 'api';

//监听端口号
config.port = 8088;

/*----------数据库配置信息-----------*/
//数据库地址
config.DB_host = 'localhost';
//数据库端口号
config.DB_port = '3306';
//数据库用户名
config.DB_username = 'root';
//数据库密码
config.DB_password = '';
//数据库名
config.DB_database = 'todo';

/*----------微信配置信息-----------*/
config.domain = "http://wpj-920417.eicp.net";
config.appid = "wxa1b636191d0d98f2";
config.appsecret = "c43f3c10bc3e366102a4608a71234fe4";

/*--------------路径配置------------*/
//项目跟路径
config.basePath = path.normalize(process.cwd() + "/" );

//log路径
config.logPath = config.basePath + "sys/log/";
//tmp路径
// config.tmpPath = config.basePath + "sys/tmp/";
config.tmpPath = "D:/nginx-1.13.6/html/temp/";

//storage路径
// config.storagePath = config.basePath + "sys/storage/";
config.storagePath = "D:/nginx-1.13.6/html/file/";

/*--------------枚举类型配置------------*/

/**
 * 日志级别
 */
config.logLevel = {
	"all": "ALL",
	"trace": "TRACE",
	"debug": "DEBUG",
	"info": "INFO",
	"warn": "WARN",
	"error": "ERROR",
	"fatal": "FATAL",
	"mark": "MARK",
	"off": "OFF",
};


/**
 * 文件后缀对应的数据格式
 */
config.mime = {
    "html" : "text/html",
    "css"  : "text/css",
    "js"   : "text/javascript",
    "json" : "application/json",
    "ico"  : "image/x-icon",
    "gif"  : "image/gif",
    "jpeg" : "image/jpeg",
    "jpg"  : "image/jpeg",
    "png"  : "image/png",
    "pdf"  : "application/pdf",
    "svg"  : "image/svg+xml",
    "swf"  : "application/x-shockwave-flash",
    "tiff" : "image/tiff",
    "txt"  : "text/plain",
    "wav"  : "audio/x-wav",
    "wma"  : "audio/x-ms-wma",
    "wmv"  : "video/x-ms-wmv",
    "xml"  : "text/xml",
    "ts": "video/MP2T",
    "m3u8": "application/vnd.apple.mpegurl",
};

export default config
