//发布后的相对根目录
const ROOT=`${process.env.PUBLIC_URL}`; 
const urls = { 
    LOGIN: '/login',//密码登录   示例代码，可以删除
    REGISTER:'/login',//用户注册  示例代码，可以删除
};
for (var key in urls) {
    let v=urls[key];
    if(v.indexOf('/')>0)v=`/${v}`;
    urls[key] = `${ROOT}${v}`;
}
export default urls;