'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  success(data){
    this.ctx.body={
      code:0,
      data
    }
  }
  message(msg){
    this.ctx.body={
      code:0,
      message:msg
    }
  }
  error(error){
    this.ctx.body={
      code:0,
      error:error
    }
  }
}

module.exports = BaseController;
