/**
 * Created by admin on 2016/3/27.
 */
import dbManager from '../../core/dbManager'

async function findOne(appid, type) {
    const sql = "select wxt.* from wx_token as wxt where wxt.appid = ? and type = ?";
    return await dbManager.sqlResult(sql, [appid, type]);
}

async function add({
                       appid,
                       accessToken,
                       expiresTime,
                   }, type) {
    const sql = "insert into wx_token (appid, accessToken, expiresTime, type) values(?, ?, ?, ?)";
    return await dbManager.sqlResult(sql, [appid, accessToken, expiresTime, type]);
}

async function update({
                          appid,
                          accessToken,
                          expiresTime,
                      }, type) {
    const sql = "update wx_token set accessToken = ?, expiresTime = ? where appid = ? and type = ?";
    return await dbManager.sqlResult(sql, [accessToken, expiresTime, appid, type]);
}

export default {
    findOne,
    add,
    update,
}