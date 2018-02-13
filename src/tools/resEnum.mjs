const cError = new Error();

const
	OK = 0,
	FAIL = -1
;

function success(data) {
	return {
		code: OK,
		data,
	}
}

function error(msg = "未知错误", code = FAIL) {
    cError.message = msg;
    cError.code = code;
	return cError;
}

function redirect(response, url){
    $log.i(`页面重定向,地址:${url}`);
    response.writeHead("301", {'Location': url});
    response.end();
}

export {
	success,
	error,
    redirect,
}