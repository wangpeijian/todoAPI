/**
 * Created by admin on 2016/3/26.
 */

import appService from '../service/sql/appService'


async function login(request, response){
	let res = await appService.login({
		username: "1",
		password: "1"
	});
	console.log(res);
	return {
		answer: res[0]
	}
}

export default {
	login
}