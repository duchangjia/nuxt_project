<template>
<div>
  <div>我是头部 {{$route.fullPath}}
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh">中文</el-dropdown-item>
        <el-dropdown-item command="en">英文</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
    <nuxt />
  <div>我是底部</div>
</div>
</template>
<script>
import {mapState,mapMutations}from 'vuex'
export default {
  computed:{
    ...mapState({	//前面三个 . 不是多余的！！ 第一个参数是模块名称（就是js文件名），后面是{变量名：state => 回调函数 }  这个在后面还会讲一下
      locales:state=>state.locales
    }),
  },
  methods:{
    handleCommand(command) {
      this.$i18n.locale === command
      console.log(this.$store.fullPath)
      if(this.$route.fullPath.includes(command)){
        return false
      }
      let params = ''
      // command=='zh'? params= this.$route.fullPath :
      console.log(this.locales)
      if(command=='zh'){
        params = this.$route.fullPath.replace(/^\/[^\/]+/, '')
      }else{
        let t = this.locales.some((item=>{
          return this.$route.fullPath.includes(item)
        }))
        if(t){
          params = this.$route.fullPath.replace(/^\/[^\/]+/, '')
          params = `${command}${params}`
        }else{
          params = `${command}${this.$route.fullPath}`
        }
      }
      this.$router.push(params)
      // this.$router.push(`${command}${this.$route.fullPath}`)
    }
  },
  // getUrl(url,isTrue,lang){
  //   let getUrl=''
  //   if(isTrue){
  //     let arr=url.split('/')
  //     arr[1]=lang
  //     arr.forEach((item)=>{
        
  //     })
  //   }
  // }
}
</script> 
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
