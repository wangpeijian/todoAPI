/**
 * Created by admin on 2016/3/26.
 */
import wxUserService from '../service/sql/wxUserService'
import wxTokenService from '../service/sql/wxTokenService'
import config from "../tools/config.mjs";

const appid = $config.appid;
const appsecret = $config.appsecret;

const ACCOUNT_TOKEN = "ACCOUNT_TOKEN";
const JS_SDK_TICKET = "JS_SDK_TICKET";
const getCodeURL = `${config.domain}/${config.project}/wx/getCode`;

const authURL = "https://open.weixin.qq.com/connect/oauth2/authorize";
const accessTokenURL = "https://api.weixin.qq.com/sns/oauth2/access_token";
const refreshTokenURL = "https://api.weixin.qq.com/sns/oauth2/refresh_token";
const userinfoURL = "https://api.weixin.qq.com/sns/userinfo";
const tokenURL = "https://api.weixin.qq.com/cgi-bin/token";
const getticketURL = "https://api.weixin.qq.com/cgi-bin/ticket/getticket";

/**
 * 刷新AccessToken
 */
async function getAccessToken(){
    //系统启动时先检查一次是否已经过期
    let tokenInfo = await wxTokenService.findOne(appid, ACCOUNT_TOKEN);
    let needRefresh = null;
    let AccessToken = "";
    let now = new Date().getTime();

    //有token信息，判断是否超时
    if(tokenInfo.length === 1){
        let {appid, expiresTime, accessToken} = tokenInfo[0];
        expiresTime = new Date(expiresTime).getTime();

        $log.i(`${ACCOUNT_TOKEN}过期时间: ${new Date(expiresTime).Format("yyyy-MM-dd hh:mm:ss")}`);

        if(expiresTime <= now){
            needRefresh = true;
        }else {
            AccessToken = accessToken;
            needRefresh = false;

            $log.i(`不用立即刷新${ACCOUNT_TOKEN}, ${(parseInt((expiresTime - now) / 1000) + 60)}秒后更新`);
            setTimeout(getAccessToken, (parseInt((expiresTime - now) / 1000) + 60) * 1000);
        }

    }else {
        needRefresh = true;
    }

    //需要立即更新token
    if(needRefresh){
        const tokenRes = await $get(`${tokenURL}?grant_type=client_credential&appid=${appid}&secret=${appsecret}`);
        AccessToken = tokenRes.access_token;

        //7000秒后超时
        let expiresTime = now + 7000 * 1000;

        if(tokenInfo.length === 1){
            wxTokenService.update({appid, accessToken: AccessToken, expiresTime: new Date(expiresTime)}, ACCOUNT_TOKEN);
        }else {
            wxTokenService.add({appid, accessToken: AccessToken, expiresTime: new Date(expiresTime)}, ACCOUNT_TOKEN);
        }

        //7060秒后重新获取token
        $log.i(`${ACCOUNT_TOKEN}已经更新, ${7060}秒后更新`);
        setTimeout(getAccessToken, 7060 * 1000);
    }

    global.$AccessToken = AccessToken;

    return AccessToken;
}

async function getTicket(wxAccessToken = global.$AccessToken){
    //系统启动时先检查一次是否已经过期
    let tokenInfo = await wxTokenService.findOne(appid, JS_SDK_TICKET);
    let needRefresh = null;
    let AccessToken = "";
    let now = new Date().getTime();

    //有token信息，判断是否超时
    if(tokenInfo.length === 1){
        let {appid, expiresTime, accessToken} = tokenInfo[0];
        expiresTime = new Date(expiresTime).getTime();

        $log.i(`${JS_SDK_TICKET}过期时间: ${new Date(expiresTime).Format("yyyy-MM-dd hh:mm:ss")}`);

        if(expiresTime <= now){
            needRefresh = true;
        }else {
            AccessToken = accessToken;
            needRefresh = false;

            $log.i(`不用立即刷新${JS_SDK_TICKET}, ${(parseInt((expiresTime - now) / 1000) + 60)}秒后更新`);
            setTimeout(getTicket, (parseInt((expiresTime - now) / 1000) + 60) * 1000);
        }

    }else {
        needRefresh = true;
    }

    //需要立即更新token
    if(needRefresh){
        const ticketRes = await $get(`${getticketURL}?access_token=${wxAccessToken}&type=jsapi`);
        AccessToken = ticketRes.ticket;

        //7000秒后超时
        let expiresTime = now + 7000 * 1000;

        if(tokenInfo.length === 1){
            wxTokenService.update({appid, accessToken: AccessToken, expiresTime: new Date(expiresTime)}, JS_SDK_TICKET);
        }else {
            wxTokenService.add({appid, accessToken: AccessToken, expiresTime: new Date(expiresTime)}, JS_SDK_TICKET);
        }

        //7060秒后重新获取token
        $log.i(`${JS_SDK_TICKET}已经更新, ${7060}秒后更新`);
        setTimeout(getTicket, 7060 * 1000);
    }

    global.$JsSdkTicket = AccessToken;
}

export default class {
    constructor(){
        getAccessToken().then(getTicket);
    }

    async auth(request, response){
        let {url, state} = request._getParameter;
        url = encodeURIComponent(`${getCodeURL}?url=${url}`);
        const redirectURL = `${authURL}?appid=${appid}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`;
        return $success({
            url: redirectURL
        });
    }

	async getCode(request, response) {
        const {url, state, code} = request._getParameter;
        const {
            access_token,
            expires_in,
            refresh_token,
            openid,
            scope
        } = await $get(`${accessTokenURL}?appid=${appid}&secret=${appsecret}&code=${code}&grant_type=authorization_code`);

        const userIInfo = await $get(`${userinfoURL}?access_token=${access_token}&openid=${openid}&lang=zh_CN`);
        userIInfo.privilege = userIInfo.privilege.join(",");

        const userRow = wxUserService.findOne(openid);
        if(userRow.length !== 0){
            wxUserService.add(userIInfo)
        }else {
            wxUserService.update(userIInfo);
        }

        //默认刷新一次token
        $get(`${refreshTokenURL}?appid=${appid}&grant_type=refresh_token&refresh_token=${refresh_token}`).then(res=>{});

        $redirect(response, url + `?openid=${openid}`);
	}

    async getUserInfo(request) {
        const {openid} = request._getParameter;
        const userRow = await wxUserService.findOne(openid);
        if(userRow.length === 0){
            throw $error("错误的openid");
        }
        return $success(userRow[0]);
    }

    async getJsTicket(request) {
        let {url} = request._getParameter;
        url = url.split("#")[0];

        const noncestr = $helper.getRandomString(16);
        const jsapi_ticket = global.$JsSdkTicket;
        const timestamp = parseInt(new Date().getTime() / 1000);
        const str = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`;
        const sha1 = $crypto.getSha1(str);

        return $success({
            appId: appid,
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: noncestr, // 必填，生成签名的随机串
            signature: sha1,// 必填，签名
        });
    }

    async uploadImage(request){
        const file = request._postParameter.files.file;
        const url = `${config.domain}/file/${file.hash}-${file.name}`;
        return $success(url)
    }
}




