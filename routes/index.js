const bodyparser = require('koa-bodyparser');
const Koa = require('koa');
const app = new Koa();
const claim = require("./server");
const helmet = require("koa-helmet");
const cors = require("koa2-cors");
app.use(cors());
app.use(helmet());
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(claim.routes(), claim.allowedMethods);
module.exports = app;
