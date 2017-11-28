/**
 * 网络请求的基础类，功能包含，发起请求、提示错误
 */
import 'isomorphic-fetch'; 
import { Toast } from 'antd-mobile'; 
 

class Agent {
  constructor() { 
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    this.headers.append("Accept", "application/json, text/javascript, */*; q=0.01"); 
    //改标识用来解决antd-moblie的Toast在同时显示多个时，调用hide不能关闭的问题
    this.loadingIsShow=false;
  }
  handleResponse = (response) => {
    this.hideLoading();
    if (!response||response.status >= 400) {
      this.showToast('网络出错，请稍后再试');      
      return {};
    } else {
      return response.json();
    }
  } 

  handleCatch = (error) => {
    this.hideLoading();
    console.log(error); 
    this.showToast('网络出错，请稍后再试');    
    return {};
  }
  /**
   * POST请求，params参数里面可以用noToken:true设置不带token
   */
  post = (url, params,noLoading) => {
    return this.sendRequest(url,params,'POST',false,noLoading);
  }
  /**
   * GET请求，params参数里面可以用noToken:true设置不带token
   */
  get = (url, params,noLoading) => { 
    return this.sendRequest(url,params,'GET',false,noLoading);
  }
  /**
   * 上传文件
   */
  postFile = (url,params,noLoading)=>{
    return this.sendRequest(url,params,'POST',true,noLoading)
  }

  ////统一请求 isFile判断是否是文件上传
  sendRequest(url,params,type,isFile,noLoading){
    (!noLoading)&&this.showLoading(); 
    let fullUrl= url;
    //type不传就默认为GET
    type=type?type:'GET'; 
    //组装参数
    params=params?params:{};  
    let form = []; 
    if(isFile){
        //上传文件是删除Content-Type,使用浏览器自动生成的
        this.headers.delete('Content-Type');
        form=new FormData();
        Object.keys(params).forEach(key=>{
          if(params[key] !== undefined){
            form.append(key,params[key])
          }
        });
    }else{
        this.headers.set('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
        Object.keys(params).forEach(key=>{
          if(params[key] !== undefined){
            form.push(key + '=' +encodeURIComponent(params[key]));
          }
        });
        form=form.join('&');
    } 

    let rq={ 
      method:type,
      headers: this.headers,
      //提交cookie
      credentials: "include",
      //允许跨域
      mode:'cors'
     };
    //如果是GET请求，就拼接URL
    if(type==='GET'){
      if (fullUrl.search(/\?/) === -1) {  
        fullUrl =`${fullUrl}?${form}`; 
      } else {  
        fullUrl =`${fullUrl}&${form}`; 
      }  
    } else{
      rq.body=form;
    }
    
    return fetch(fullUrl, rq)
      .then(this.handleResponse) 
      .then(json=>json)
      .catch(this.handleCatch)
  }


  /**
   * 显示提示信息，默认3秒
   * @param {*提示内容} msg 
   */
  showToast(msg){
    if(this.loadingIsShow)Toast.hide();
    Toast.info(msg,3,null,false); 
    this.loadingIsShow=true;
  }
  /**
   * 显示加载框，期间不可操作
   * @param {*下面显示的提示内容，默认‘加载中’} msg 
   */
  showLoading(msg){
    if(!this.loadingIsShow){
      msg=msg?msg:"加载中..."
      Toast.hide();
      Toast.loading(msg,0); 
      this.loadingIsShow=true;
    }
  }
  hideLoading(){
    Toast.hide(); 
    this.loadingIsShow=false;
  }
}

export default  Agent;