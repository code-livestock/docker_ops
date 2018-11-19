var snowflake = require('node-snowflake').Snowflake;
snowflake.init({ worker_id: 1, data_center_id: 1, sequence: 0 });
// >//var id = snowflake.nextId()
module.exports = snowflake;