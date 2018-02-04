/**
 * Created by admin on 2016/3/26.
 */
import cTodoService from '../service/sql/cTodoService'

export default class {
	async add(request) {
		const {userId, id, content} = request._postParameter;
		let res = null;
		
		if(id){
			res = await cTodoService.update({id, content, userId});
		}else {
			res = await cTodoService.add({userId, content});
		}
		
		return $success(res);
		
	}
	
	async getList(request) {
		const {userId, page} = request._postParameter;
		let res = await cTodoService.getList({userId, page});
		return $success(res);
		
	}
}