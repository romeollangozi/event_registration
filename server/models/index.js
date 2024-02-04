const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
require("dotenv").config({ path: "../.env" });

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: process.env.DB_PORT,

    pool: {
      max: 5,
      min: 0,
      acquuire: 30000,
      idle: 10000,
    },
  }
);

const User = require("./user.model.js")(sequelize, DataTypes);
const Event = require("./event.model.js")(sequelize, DataTypes);

User.hasMany(Event, {
  as: "organizedEvents",
  foreignKey: "organizerId",
  onDelete: "CASCADE",
});
Event.belongsTo(User, {
  as: "organizer",
  foreignKey: "organizerId",
});
Event.belongsToMany(User, { as: "attendees", through: "event_attendees" });
User.belongsToMany(Event, {
  as: "myEvents",
  through: "event_attendees",
});

sequelize.sync();
module.exports = { Event, User, sequelize };
