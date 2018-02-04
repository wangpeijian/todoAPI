/**
 * Created by admin on 2016/2/20.
 * 此类处理项目中的一些基本操作
 */

{
	// 对Date的扩展，将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
	// 例子:
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
	// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
	//支持时间格式化
	Date.prototype.Format = function (fmt) { //author: meizz
		const o = {
			"M+": this.getMonth() + 1, //月份
			"d+": this.getDate(), //日
			"h+": this.getHours(), //小时
			"m+": this.getMinutes(), //分
			"s+": this.getSeconds(), //秒
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度
			"S": this.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (let k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}

	//获取星期几的扩展方法
	Date.prototype.getWeek = function () {
		switch (this.getDay()) {
			case 0:
				return "星期日";
			case 1:
				return "星期一";
			case 2:
				return "星期二";
			case 3:
				return "星期三";
			case 4:
				return "星期四";
			case 5:
				return "星期五";
			case 6:
				return "星期六";
			default:
				return "";
		}
	}
}


export default class {
	/**
	 * 计算mysql limit的值
	 * @param page
	 * @param size
	 * @returns {Array}
	 */
	getLimit(page, size = 10) {
		if (page < 0) {
			page = 1;
		}
		return [(page - 1) * size, size];
	}
	
	/**
	 * 字符串检查工具
	 */
	checkNull(obj) {
		
		const type = typeof obj;
		
		switch (type) {
			case 'undefined':
				return null;
			
			case 'boolean':
				return obj;
			
			case 'string':
				if (obj !== "") {
					return obj;
				} else {
					return null;
				}
			
			case 'number':
				return obj;
			
			case 'object':
				return obj;
			
			case 'function':
				return obj;
			
			default:
				return null;
		}
	}
	
	/**
	 * 获取制定长度的随机字符串
	 * @param a
	 * @returns {string}
	 */
	getRandomString(a) {
		let d,
			e,
			b = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
			c = "";
		for (d = 0; a > d; d += 1)
			e = Math.random() * b.length, e = Math.floor(e), c += b.charAt(e);
		return c
	}
}
