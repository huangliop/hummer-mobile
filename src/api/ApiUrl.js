//发布后的相对根目录
const ROOT = `${process.env.PUBLIC_URL}/api`;
const urls = {
    LOGIN: '/login', //密码登录   示例代码，可以删除
    REGISTER: '/login' //用户注册  示例代码，可以删除
};
for (let key in urls) {
    if (Object.prototype.hasOwnProperty.call(urls, key)) {
        let v = urls[key];
        if (v.indexOf('/') > 0) v = `/${v}`;
        urls[key] = `${ROOT}${v}`;
    }
}
export default urls;
