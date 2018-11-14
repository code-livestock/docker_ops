const router = require('koa-router')();
const model = require("../model/index")
const utils = require("../utils/utilsSsh");
const _ = require('loadsh');
router.prefix('/ops/server');
router.post("/test", async ctx => {
  ctx.error("不存在")
})
router.post("yumDocker", async ctx => {
  let id = ctx.query.server_id;
  // let serverOption = ctx.request.body;
  let checkDockerSh = "docker version";
  let chcek = "bash: docker: command not found";
  let sh = "echo 'success'";
  try {
    let data = await model.findById(id);
    if (data.is_docker == "no") {
      let serverData = await utils.ssh2serverFromSH(sh, server);
      if (serverData == "success") {
        let serverOption = {
          username: data.username,
          passwd: data.passwd,
          ip: data.ip,
          port: data.port
        }
        let checkResult = await utils.ssh2serverFromSH(checkDockerSh, serverOption);
        if (checkResult == chcek) {
          let installSh = "sudo yum install -y yum-utils device-mapper-persistent-data lvm2&&" +
            "sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo&&" +
            "sudo yum install docker-ce&&" + "sudo systemctl enable docker&&" +
            "sudo systemctl start docker&&" + "docker info";
          let installResult = await utils.ssh2serverFromSH(installSh, serverOption);
          if (installResult != chcek) {
            model.update()
          }

        } else {

          throw new Error("该服务器已经安装了docker服务");
        }
      } else {
        throw new Error("没找到该服务");
      }
    } else {
      throw new Error("该服务已安装了docker服务")
    }
    ctx.body = {
      errcode: 0,
      errmsg: "安装成功"
    }

  } catch (error) {
    ctx.body = {
      errcode: 0,
      errmsg: error.message
    }
  }
})
router.post("/create", async  ctx => {
  let server = ctx.request.body;
  try {
    let sh = "echo 'success'";
    let serverData = await utils.ssh2serverFromSH(sh, server);
    if (serverData == "success") {
      await model.insert(server);
    } else {
      throw new Error("没找到该服务")
    }
    ctx.body = {
      errcode: 0,
      errmsg: "创建成功"
    }
  } catch (error) {
    ctx.body = {
      errcode: 0,
      errmsg: error.message
    }
  }
})


module.exports = router
