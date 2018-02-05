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

export {
	success,
	error,
}