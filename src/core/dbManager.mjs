import mysql from 'mysql'
import Promise from 'promise'

//使用数据库连接池
const pool = mysql.createPool({
    host: $config.DB_host,
    user: $config.DB_username,
    password: $config.DB_password,
    database: $config.DB_database,
    port: $config.DB_port
});


/**
 * 获取数据链接
 * @returns {*}
 */
async function getConnect() {
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
                    if (err) {
                        $log.e(`数据库SQL错误: ${query.sql}`, err);
                        resolve(null);
                    } else {
                        $log.i(`数据库SQL执行完毕: ${query.sql}`);
                        resolve(results);
                    }
                });
            } catch (err) {
                $log.e(`数据库查询错误:`, err);
                resolve(null);
            } finally {
	            //释放数据库连接
	            conn.release();
            }
        })
    }).catch(function(err){
	    $log.e(`连接数据库失败！:`, err);
    });
}

async function sqlResult(sql, values){
	return await query(sql, values);
}

export default {
	sqlResult
}











