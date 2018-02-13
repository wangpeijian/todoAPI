/**
 * Created by admin on 2016/3/27.
 */
import dbManager from '../../core/dbManager'

async function findOne(openid) {
    const sql = " select wxu.* from wx_user as wxu where wxu.openid = ? ";
    const values = [openid];
    return await dbManager.sqlResult(sql, values);
}

async function add({
                       openid,
                       nickname,
                       sex,
                       province,
                       city,
                       country,
                       headimgurl,
                       privilege,
                       unionid
                   }) {
    const sql = " insert into wx_user (openid, nickname, sex, province, city, country, headimgurl, privilege, unionid) values(?, ?, ?,?, ?, ?,?, ?, ?)  ";
    const values = [openid, nickname, sex, province, city, country, headimgurl, privilege, unionid];
    return await dbManager.sqlResult(sql, values);
}

async function update({
                          openid,
                          nickname,
                          sex,
                          province,
                          city,
                          country,
                          headimgurl,
                          privilege,
                          unionid
                      }) {
    const sql = " update wx_user set nickname = ?, sex = ?, province = ?, city = ?, country = ?, headimgurl = ?, privilege = ?, unionid = ? where openid = ?, ";
    const values = [nickname, sex, province, city, country, headimgurl, privilege, unionid, openid];
    return await dbManager.sqlResult(sql, values);
}

export default {
    findOne,
    add,
    update,
}