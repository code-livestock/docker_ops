const log4js = require("log4js");
const path = require("path");
//日志根目录
const baseLogPath = path.resolve(__dirname, '../logs');
//错误日志目录
const errorPath = "/error";
//错误日志文件名
const errorFileName = "error";
//错误日志输出完整路径
const errorLogPath = baseLogPath + errorPath + "/" + errorFileName;
// 打印日志目录
const consolePath = "/console";
// 打印日志文件名
const consoleFileName = "console";
//打印日志输出完整目录
const consoleLogPath = baseLogPath + consolePath + "/" + consoleFileName;
//响应日志目录
const responsePath = "/response";
//响应日志文件名
const responseFileName = "response";
//响应日志输出完整路径
const responseLogPath = baseLogPath + responsePath + "/" + responseFileName;
const log_config = {
    appenders: {
        "rule-console": {
            "type": "console"
        },
        // 重要数据保存到日志文件
        "rule-console-data": {
            "type": "dateFile",
            "filename": consoleLogPath,
            "pattern": "-yyyy-MM-dd-hh.log",
            "alwaysIncludePattern": true,
            "encoding": "utf-8",
            "maxLogSize": 1000,
            "numBackups": 3,
            "path": consolePath
        },
        "errorLogger": {
            "type": "dateFile",
            "filename": errorLogPath,
            "pattern": "-yyyy-MM-dd-hh.log",
            "alwaysIncludePattern": true,
            "encoding": "utf-8",
            "maxLogSize": 1000,
            "numBackups": 3,
            "path": errorPath
        },
        "resLogger": {
            "type": "dateFile",
            "filename": responseLogPath,
            "pattern": "-yyyy-MM-dd-hh.log",
            "alwaysIncludePattern": true,
            "encoding": "utf-8",
            "maxLogSize": 1000,
            "numBackups": 3,
            "path": responsePath
        },
    },
    categories: {
        "rule-console-data": { "appenders": ["rule-console-data"], "level": "info" },
        "default": { "appenders": ["rule-console"], "level": "all" },
        "resLogger": { "appenders": ["resLogger"], "level": "info" },
        "errorLogger": { "appenders": ["errorLogger"], "level": "error" },
    },
    "baseLogPath": baseLogPath
}
log4js.configure(log_config);
module.exports = {
    logger: log4js.getLogger(), // 默认的日志记录
    pLogger: log4js.getLogger("rule-console-data"),
    aLogger: log4js.getLogger("resLogger"),
    eLogger: log4js.getLogger("errorLogger"), // 用于关键的错误地方
    log4js
};
