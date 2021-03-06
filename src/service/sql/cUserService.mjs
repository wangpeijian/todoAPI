/**
 * Created by admin on 2016/3/27.
 */
import dbManager from '../../core/dbManager'

async function existPhone(phone){
	const sql = " select cu.id, cu.name, cu.phone, cu.password from c_user as cu where phone = ? ";
	const values = [phone];
	return await dbManager.sqlResult(sql, values);
}

async function add({id, phone, name, password}){
	const sql = " insert into c_user (id, phone, updateTime, name, password) values(?, ?, ?, ?, ?) ";
	const values = [id, phone, new Date(), name, password];
	return await dbManager.sqlResult(sql, values);
}

export default {
	existPhone,
	add
}