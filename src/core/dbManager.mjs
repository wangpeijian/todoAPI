import mysql from 'mysql'
import config from '../config'
import Promise from 'promise'
import log from '../tools/myLog'


//使用数据库连接池
const pool = mysql.createPool({
    host: config.DB_host,
    user: config.DB_username,
    password: config.DB_password,
    database: config.DB_database,
    port: config.DB_port
});


/**
 * 获取数据链接
 * @returns {*}
 */
function getConnect() {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, conn) {
            if (err) {
	            reject(err);
            } else {
                resolve(conn)
            }
        });
    });
}

/**
 * 查询数据库
 * @param sql
 * @param values
 */
function query(sql, values) {
    return getConnect().then(function (conn) {
        return new Promise(function (resolve, reject) {
            try {
                const query = conn.query(sql, values, function selectCb(err, results, fields) {
                    //释放数据库连接
                    conn.release();
                    if (err) {
                        log.e(`数据库SQL错误: ${query.sql}`, err);
                        resolve(null);
                    } else {
                        log.i(`数据库SQL执行完毕: ${query.sql}`);
                        resolve(results);
                    }
                });
            } catch (err) {
                log.e(`数据库查询错误:`, err);
                resolve(null);
            }
        })
    }).catch(function(err){
	    log.e(`连接数据库失败！:`, err);
    });
}

function sqlResult(sql, values){
	return new Promise(function(res, rej){
		query(sql, values).then(function(result){
			res(result);
		})
	})
}

export default {
	sqlResult
}











