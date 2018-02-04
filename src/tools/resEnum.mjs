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

function error(msg = "请求失败", code = FAIL) {
	return {
		code,
		msg,
	}
}

export {
	success,
	error,
}