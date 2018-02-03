/*
 * 服务类
 */
import Http from 'http'
import route from './route';

export default function (port) {
    //创建一个http服务器
    const webSvr = Http.createServer(route);
	
    //开始侦听8080端口
    webSvr.listen(port);
}