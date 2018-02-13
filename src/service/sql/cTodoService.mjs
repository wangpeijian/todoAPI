/**
 * Created by admin on 2016/3/27.
 */
import dbManager from '../../core/dbManager'

async function getList({userId, page, size}){
    const sql = " select ct.id, ct.content, ct.updateTime from c_todo as ct where userId = ? limit ?, ?";
    const values = [userId, ...$helper.getLimit(page, size)];
	return await dbManager.sqlResult(sql, values);
}

async function exist(id){
	const sql = " select * from c_todo where id = ? ";
	const values = [id];
	return await dbManager.sqlResult(sql, values);
}

async function add({userId, content}){
	const sql = " insert into c_todo (userId, content, updateTime) values(?, ?, ?) ";
	const values = [userId, content, new Date()];
	return await dbManager.sqlResult(sql, values);
}

async function update({content, id, userId}){
	const sql = " update c_todo set content = ?, updateTime = ? where id = ? and userId = ? ";
	const values = [content, new Date(), id, userId];
	return await dbManager.sqlResult(sql, values);
}

export default {
	getList,
	exist,
	add,
	update
}