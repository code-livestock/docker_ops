const router = require('koa-router')();
const model = require("../model/index")
const _ = require('lodash');
const snowflake = require("../common/snowflake");
const error = require("../common/error");
router.prefix('/test/user');
router.post("/create", async ctx => {
  let params = ctx.request.body;
  params.create_time = new Date();
  params.id = snowflake.nextId();
  if (_.isEmpty(params.username)) { ctx.throw(error.StatusCode, error.UsernameNotNull) };
  if (_.isEmpty(params.password)) { ctx.throw(error.StatusCode, error.PasswdNotNull) };
  let user = await model.findOne("User", { username: params.username });
  if (!_.isEmpty(user)) { ctx.throw(error.StatusCode, error.UsernameExist) }
  await model.insert("User", params);
  ctx.body = {
    errcode: 0,
    errmsg: error.CreateSuccess
  }
})
router.post("/delete/:user_id", async ctx => {
  let user_id = ctx.params.user_id;
  let user = await model.findById("User", user_id);
  if (_.isEmpty(user)) { ctx.throw(error.StatusCode, error.IdNotExist) };
  await model.delete("User", { id: user_id });
  ctx.body = {
    errcode: 0,
    errmsg: error.DeleteSuccess
  }
});
router.post("/update/:user_id", async ctx => {
  let user_id = ctx.params.user_id;
  let params = ctx.request.body;
  params.update_time = new Date();
  let user = await model.findById("User", user_id);
  if (_.isEmpty(user)) { ctx.throw(error.StatusCode, error.IdNotExist) };
  await model.update("User", params, { id: user_id });
  ctx.body = {
    errcode: 0,
    errmsg: error.UpdateSuccess
  }
});
router.post("/query", async ctx => {
  let params = ctx.request.body;
  let options = {};
  options.offset = params.start || 0;
  options.limit = params.length || 10;
  _.omit(params, "start");
  _.omit(params, "length");
  options.where = params;
  let result = await model.findAndCount("User", options);
  let data = result.rows;
  let total = result.count;
  ctx.body = {
    errcode: 0,
    result: { data: data, total: total }
  }
})
module.exports = router;
