/**
 * Created by admin on 2016/3/26.
 */
import cUserService from '../service/sql/cUserService'

export default class {
	
	async login(request) {
		const {phone, password} = request._postParameter;
		
		let res = await cUserService.existPhone(phone);
		if (res.length === 0) {
			throw $error("用户不存在");
		} else {
			const user = res[0];
			
			if (user.password !== password) {
                throw $error("密码输入错误")
			} else {
				delete user.password;
				return $success(user);
			}
		}
		
	}
	
}




