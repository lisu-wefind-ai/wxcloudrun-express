const { Sequelize, DataTypes } = require("sequelize");

// 从环境变量中读取数据库配置
const { PG_USERNAME, PG_PASSWORD, PG_ADDRESS = "" } = process.env;

const [host, port] = PG_ADDRESS.split(":");

const sequelize = new Sequelize("nodejs_demo", PG_USERNAME, PG_PASSWORD, {
  host,
  port,
  dialect: "postgres",
});

// 定义数据模型
const Counter = sequelize.define("Counter", {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

// 数据库初始化方法
async function init() {
  await Counter.sync({ alter: true });
}

// 导出初始化方法和模型
module.exports = {
  init,
  Counter,
};
