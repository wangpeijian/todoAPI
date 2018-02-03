import os from 'os';
import config from './src/config';
import log from './src/tools/myLog'
import server from './src/core/server'

const port = config.port;
const sTime = new Date().getTime();
const numCPUs = os.cpus().length;

log.i('准备启动服务器.....');
server(port);
log.i(`服务器启动耗时:${(new Date().getTime() - sTime)}ms,监听端口：${port},系统核心数量：${numCPUs}`);
