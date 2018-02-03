/**
 * Created by admin on 2016/3/27.
 */
import dbManager from '../../core/dbManager'
import base from '../../tools/base'

// function getMsgList(parameter){
//     const sql = "select * from  app_message";
//     const values = [];
//
//     //请求数据库操作
//     return dbManager.sqlResult(sql, values);
// }
//
// function addOne(parameter){
//     const sql = "insert into app_message (message, type) values (?, ?)";
//     const values = [parameter.msg, base.checkNull(parameter.type)];
//
//     //请求数据库操作
//     return dbManager.sqlResult(sql, values);
// }

function login(parameter){
    const sql = " select * from c_user where phone = ? and password = ? ";
    const values = [parameter.username, parameter.password];

    return dbManager.sqlResult(sql, values).then(function(res){
        return res;
    });
}

export default {
	login,
}