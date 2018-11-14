var fs = require("fs");
var path = require("path");
var config = require("config");
var Sequelize = require("sequelize");
var dbconfig = config.get("global.mysql");
const sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, dbconfig);
var tables = {};
fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".model.js") !== -1);
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file));
        tables[model.name] = model;
    });
var stand = {
    count: 0,
    target: 0,
    pin: function () {
        this.count++;
    },
    updateTarget: function () {
        this.target++;
    }
};

for (var pro in tables) {
    if (tables.hasOwnProperty(pro)) {
        stand.updateTarget();
    }
}
exports.findOne = function (modelName, options) {
    var model = tables[modelName];
    if (model) {
        return model.findOne({ where: options });
    }
}
exports.findById = function (modelName, id) {
    var model = tables[modelName];
    if (model) {
        return model.findById(id);
    }
}
exports.query = function (modelName, options) {
    var model = tables[modelName];
    if (model) {
        return model.findAll(options);
    }
};
exports.insert = function (modelName, object) {
    var model = tables[modelName];
    if (model) {
        return model.create(object);
    }
};
exports.batchInsert = function (modelName, objects) {
    var model = tables[modelName];
    if (model) {
        if (objects.length > 0) {
            return model.bulkCreate(objects);
        }
    }
}
exports.update = function (modelName, value, options) {
    var model = tables[modelName];
    if (model) {
        return model.update(value, { "where": options })
    }
}
exports.delete = function (modelName, options) {
    var model = tables[modelName];
    if (model) {
        return model.destroy({ "where": options })
    }
}
exports.queryFromSql = function (sql, options) {
    return sequelize.query(sql, { replacements: options, type: sequelize.QueryTypes.SELECT })
}
exports.findAndCount = function (modelName, options) {
    var model = tables[modelName];
    if (model) {
        return model.findAndCount(options);
    }
}
var onReady = function () {
    return Promise.resolve().then(() => {
        for (var key in tables) {
            var model = tables[key];
            model.sync().then(function () {
                stand.pin();
                if (stand.count == stand.target) {
                    return Promise.resolve();
                }
            });
        }
    })

}
onReady();
// exports.onReady = onReady;
