/*
 * 处理请求及响应的工具类
 * 1.解析请求数据
 * 2.处理响应
 */

import zlib from 'zlib'
import fs from 'fs'
import formidable from 'formidable'
import Promise from 'promise'
import util from 'util'
import url from 'url'
import config from '../config'
import path   from 'path'

/**
 * 获取get请求数据，获取后执行回调函数
 * @param {Object} request
 * @param {Object} callback
 */
function getData(request){
	return url.parse(request.url, true).query;
}

/**
 * 使用promise封装的获取post请求数据的方法
 * @param request
 * @returns {Promise.<TResult>}
 */
function postData(request) {
	return resolvePostData(request);
}

/**
 * 获取post请求数据，获取后执行回调函数
 * @param {Object} request
 */
const resolvePostData = function(request){
    return new Promise(function(resolve, reject){
        let headers = request.headers;
	    let parameter = {};          //需要返回的post数据

        if(headers['content-type'] !== undefined && headers['content-type'].indexOf("multipart/form-data") !== -1){

            const tmpPath = config.tmpPath + new Date().Format("yyyy-MM-dd");

            if (!fs.existsSync(tmpPath)) {
                fs.mkdirSync(tmpPath);
            }

            //form表单提交，使用其他库解析请求
	        const postForm = new formidable.IncomingForm();

            postForm.encoding = 'utf-8';
            postForm.uploadDir = tmpPath;
            postForm.multiples = true;
            postForm.hash = "md5";

            //对上传的文件单做处理，将上传好的文件从临时目录放到正式目录下
            postForm.on('file', function(name, file) {
                fs.renameSync(file.path, config.storagePath + file.hash+ "-" +file.name);
            });

            postForm.parse(request, function(err, fields, files) {
                parameter = fields;
                parameter.files = files;
                resolve(parameter);
            });

        }else {
            //设置编码格式防止乱码
            request.setEncoding("utf8");

            //post请求信息
            let postDataStr = '';     //定义了一个post变量，用于暂存请求体的信息

            request.on('data', function(chunk){    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
                postDataStr += chunk;
            });

            request.on('end', function(){    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
                //$log.i('post请求数据:', postDataStr);

                //url编码数据解析
                if(headers['content-type'] !== undefined && headers['content-type'].indexOf("application/x-www-form-urlencoded") !== -1){
                    postDataStr = decodeURI(postDataStr);

                    const parameterArray = postDataStr.split("&");

                    parameterArray.forEach(function(i, o){
	                    const k_v = i.split("=");
                        parameter[k_v[0]] = k_v[1];
                    })

                }else{

                    //以json格式解析数据
                    try{
                        parameter = JSON.parse(postDataStr);
                    }catch (e){
                        parameter = {};
                    }
                }

                resolve(parameter);
            });

        }

    })
}

/**
 * 响应用户请求，contentType默认为json，以指定类型返回数据
 * @param {Object} response
 * @param {Object} answer
 * @param {Object} contentType
 */
function response(response, answer, contentType = config.mime.json){
	if(contentType === undefined){
        contentType = config.mime.json;
	}

	//根据不同的数据类型，执行不同的输出方式
	switch(contentType){
		case config.mime.json:
			/*设置ajax跨域请求头*/
			response.writeHead(200,
				{	'Content-Type': contentType + ";charset=utf-8",
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Headers': 'X-Requested-With',
					'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
					'X-Powered-By': '3.2.1',
				}
			);
			const res = JSON.stringify(answer);
			response.write(res);
			$log.i(`响应结果:${res}`);
			break;
		default:
			response.writeHead(200, {
			    'Content-Type': contentType + ";charset=utf-8",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'X-Requested-With',
                'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
                'X-Powered-By': '3.2.1',
            });
            response.write(util.inspect(answer));
			break;
	}
	response.end();
}

const fileGzip = function(request,response, realPath, msg, status, head, extensionName){
	var acceptEncoding = request.headers['accept-encoding'] || "";
	var raw = fs.createReadStream(realPath);
	
	if(extensionName.match(/css|js|html|json/ig) && acceptEncoding.match(/\bgzip\b/)){
		
		head["Content-Encoding"] = "gzip";
		response.writeHead(status, msg, head);
		raw.pipe(zlib.createGzip()).pipe(response);
		
	}else if(extensionName.match(/css|js|html|json/ig) && acceptEncoding.match(/\bdeflate\b/)){
		
		head["Content-Encoding"] = "deflate";
		response.writeHead(status, msg, head);
		raw.pipe(zlib.createDeflate()).pipe(response);
		
	}else{
		
		response.writeHead(status, msg, head);
		raw.pipe(response);
	}
}

/**
 * 返回请求文件内容
 * @param request
 * @param {Object} response
 * @param filePath
 * @param extensionName
 */
function returnFile(request, response, filePath, extensionName){
    fs.exists(filePath, function(exists){
	    let realPath = filePath;
	
	    let contentType = config.mime[extensionName];
        if(contentType === undefined){
            contentType = extensionName;
        }
	
	    let head = {	'Content-Type': contentType + ";charset=utf-8",
                        'Access-Control-Allow-Headers': 'X-Requested-With',
                        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
	                    'Access-Control-Allow-Origin': '*',
                    }
	    let status = 200;
	    let msg = "Ok";
	    
	    if(exists){
        	//如果文件存在则开始设置并判断是否失效
		    fs.stat(filePath, function(err, stat){
			    const lastModified = stat.mtime.toUTCString();
			    head['Last-Modified'] = lastModified;
			    head['Cache-Control'] = 'max-age=' + (config.expires * 1000);
			    head["Expires"] = new Date(new Date().getTime() + config.expires * 1000).toUTCString();
		    	
			    //判断是否失效
			    const ifModifiedSince = "If-Modified-Since".toLowerCase();
			    if(request.headers[ifModifiedSince] && lastModified === request.headers[ifModifiedSince]){
				    response.writeHead(304, "Not Modified", head);
				    response.end();
				    
			    }else{
				    fileGzip(request,response, realPath, msg, status, head, extensionName);
				    
			    }
		    })
        	
	    }else{
            //未找到文件
		    realPath = path.normalize("views/error/404.html");
            head = {'Content-Type': config.mime.html};
            status = 404;
		    msg = "Not Found";
		
		    fileGzip(request,response, realPath, msg, status, head, extensionName);
        }
    })
}

/**
 * 返回404
 * @param response
 */
function notFound(response){
    const result = {};
    result.code = 404;
    result.msg = 'request not found';

    response.writeHead(404, {'Content-Type': 'application/json'});
    response.write(util.inspect(result));
    response.end();
}

function sendError(response, err){
	const result = {};
    result.code = 500;
    result.msg = err;

    response.writeHead(500, {'Content-Type': 'application/json'});
    response.write(util.inspect(result));
    response.end();
}

export default {
	sendError,
	notFound,
	returnFile,
	response,
	postData,
	getData,
}