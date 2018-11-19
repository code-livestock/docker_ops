const bodyparser = require('koa-bodyparser');
const Koa = require('koa');
const app = new Koa();
const user = require("./user");
const helmet = require("koa-helmet");
const cors = require("koa2-cors");
app.use(cors());
app.use(helmet());
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {
            errcode: 0,
            errmsg: err.message
        }
    }
});

app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(user.routes(), user.allowedMethods);
module.exports = app;
