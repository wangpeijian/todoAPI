/*
 * 路由类，处理静态文件及用户请求的工具类
 */

import url from "url"
import path from 'path'
import util from 'util'
import Promise from 'promise'

import config from '../config'
import log from '../tools/myLog'
import handle from './handle'
import controllerMap from '../controllerMap'

//解析路径，路由核心
function route(request, response) {
	const pathname = url.parse(request.url).pathname;
	const extensionName = path.extname(pathname).replace(".", "");
	
	//处理用户请求的方法
	if (extensionName === '') {
		log.i('用户请求端口:' + config.port, '用户请求接口：' + pathname, '请求方式:' + request.method);
		dispense(request, response, pathname);
		return;
	}
	
	const filePath = path.normalize(config.basePath + pathname);
	log.i('用户请求端口:' + config.port, '用户请求文件：' + filePath)
	
	handle.returnFile(request, response, filePath, extensionName);
}


/**
 * 分发用户请求
 * @param {Object} request
 * @param {Object} response
 * @param pathname
 */
function dispense(request, response, pathname) {
	const path = pathname.split("/");
	
	if (path.length < 3) {
		handle.notFound(response);
		return;
	}
	
	const controller = controllerMap[path[1]];
	const action = controller[path[2]];
	
	if (controller === undefined || action === undefined) {
		handle.notFound(response);
	} else {
		//使用promise封装action操作
		new Promise.resolve().then(function () {
			
			//将get请求内容放入request
			request._getParameter = handle.getData(request);
			
			//将post请求内容放入request
			return handle.postData(request).then(function (parameter) {
				request._postParameter = parameter;
			})
			
		}).then(function () {
			
			log.i(`post请求内容： ${util.inspect(request._postParameter, false, null, false)}`,
				`get请求内容：${util.inspect(request._getParameter, false, null, false)}`);
			
			return action(request, response);
			
		}).then(function (obj) {
			if (obj) {
				handle.response(response, obj.answer, obj.answerType);
			}
			
		}).catch(function (err) {
			handle.sendError(response, err);
		})
	}
}

export default route;
