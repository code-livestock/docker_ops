const router = require('koa-router')();
const model = require("../model/index")
const _ = require('lodash');
const snowflake = require("../common/snowflake");
const error = require("../common/error");
const querystring = require("querystring");
router.post("/users", async ctx => {
  let params = ctx.request.body;
  if (_.isEmpty(params.username)) { ctx.throw(error.ValidateCode, error.UsernameNotNull) };
  if (_.isEmpty(params.password)) { ctx.throw(error.ValidateCode, error.PasswdNotNull) };
  let user = await model.findOne("User", { username: params.username });
  if (!_.isEmpty(user)) { ctx.throw(error.ValidateCode, error.UsernameExist) };
  params.create_time = new Date();
  params.id = snowflake.nextId();
  await model.insert("User", params);
  ctx.body = {
    errmsg: error.CreateSuccess
  }
})
router.delete("/users/:user_id", async ctx => {
  let user_id = ctx.params.user_id;
  let user = await model.findById("User", user_id);
  if (_.isEmpty(user)) { ctx.throw(error.ValidateCode, error.IdNotExist) };
  await model.delete("User", { id: user_id });
  ctx.body = {
    errmsg: error.DeleteSuccess
  }
});
router.put("/users/:user_id", async ctx => {
  let user_id = ctx.params.user_id;
  let params = ctx.request.body;
  params.update_time = new Date();
  let user = await model.findById("User", user_id);
  if (_.isEmpty(user)) { ctx.throw(error.ValidateCode, error.IdNotExist) };
  await model.update("User", params, { id: user_id });
  ctx.body = {
    errmsg: error.UpdateSuccess
  }
});
router.get("/users", async ctx => {
  let params = ctx.request.query;
  let options = {};
  options.offset = params.start || 0;
  options.limit = params.length || 10;
  options.where = params;
  let result = await model.findAndCount("User", options);
  let data = result.rows;
  let total = result.count;
  ctx.set("X-Total", total);
  ctx.body = {
    results: data
  }
})
module.exports = router;
