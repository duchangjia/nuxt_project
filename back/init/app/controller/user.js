'use strict';
const md5= require('md5')
const BaseController = require('./base');

class UserController extends BaseController {
  async info() {
    this.success({
      name:'aduker123'
    })
  }
  async captcha() {
    const {ctx}=this
    const captcha=this.service.tools.captcha()
    ctx.session.captcha=captcha.text
    console.log(ctx.session)
    ctx.response.type = 'image/svg+xml'
    ctx.body=captcha.data
  }
  async checkEmail(email){
    const user = await this.ctx.model.User.findOne({email})
    return user
  }
  async create() {
    const {ctx}=this
    const {captcha,email, password,nickname} =ctx.request.body
    console.log(captcha, ctx.session)
    if(captcha.toUpperCase() == ctx.session.captcha.toUpperCase()){
      // 新增用户
      if(await this.checkEmail(email)){
        return this.success('邮箱重复了')
      }
      let ret = await ctx.model.User.create({
        email,
        nickname,
        password:md5(password+'Kaikeba')
      })
      if (ret._id) {
        this.success('新建成功')
      }
      
    }else{
      this.error("验证码错误")
    }
  }
}

module.exports = UserController;
