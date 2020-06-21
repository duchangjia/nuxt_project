import Vue from 'vue'
import axios from 'axios'
import {Loading} from 'element-ui'

let service = axios.create({
  timeout:5000,
  baseURL:'',
})
// 拦截器 请求
service.interceptors.request.use(
  config=>{
    //qingqiu
    Loading.service({
      lock: true
    });
    return config
  },
  err=>{
    return Promise.reject
  }
)
// 响应
service.interceptors.response.use(
  async response=>{
    Loading.service().close()
    let {data}=response
    // if(data){}
    return data
  },
  error=>{
    if(error.response){
      Loading.service().close()
      switch (error.response.status) {
        case 404: {
          if (error.response && error.response.data) {
            $nuxt.$router.push({path:'/cart'});
          }
          break
        }
      }
    }
  }
)
Vue.prototype.$http=service

export const http=service

