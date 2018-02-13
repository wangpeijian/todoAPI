/*
 * 路由类，处理静态文件及用户请求的工具类
 */

import url from "url"
import path from 'path'
import util from 'util'
import handle from './handle'
import {controllerMap} from '../controllerMap'

//解析路径，路由核心
function route(request, response) {
	const pathname = url.parse(request.url).pathname;
	const extensionName = path.extname(pathname).replace(".", "");

	//处理用户请求的方法
	if (extensionName === '') {
		$log.i('用户请求端口:' + $config.port, '用户请求接口:' + pathname, '请求方式:' + request.method);
		dispense(request, response, pathname);
		return;
	}

	const filePath = path.normalize($config.basePath + pathname);
	$log.i('用户请求端口:' + $config.port, '用户请求文件:' + filePath)

	handle.returnFile(request, response, filePath, extensionName);
}


/**
 * 分发用户请求
 * @param {Object} request
 * @param {Object} response
 * @param pathname
 */
async function dispense(request, response, pathname) {
    pathname = pathname.substr(1, pathname.length);

    const path = pathname.split("/");
	if (path.length !== 3) {
		handle.notFound(response);
		return;
	}

    const project = path[0];
	const controller = controllerMap.get(path[1]);
	const action = controller[path[2]];
	
	if (project !== $config.project || controller === undefined || action === undefined) {
		handle.notFound(response);
	} else {
		
		request._getParameter = handle.getData(request);
		request._postParameter = await handle.postData(request);
		
		$log.i(`post请求内容: ${util.inspect(request._postParameter, false, null, false)}`,
			`get请求内容:${util.inspect(request._getParameter, false, null, false)}`);
		
		action(request, response).then(function (obj) {
			if(obj){
                handle.response(response, obj);
			}
		}).catch(function (err) {
			handle.response(response, {msg: err.message, code: err.code});
		})
	}
}

export default route;
