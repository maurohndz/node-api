import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _lottery from  "./Lottery.js";
import _user from  "./User.js";

export default function initModels(sequelize) {
  const lottery = _lottery.init(sequelize, DataTypes);
  const user = _user.init(sequelize, DataTypes);

  lottery.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(lottery, { as: "lotteries", foreignKey: "user_id"});

  return {
    lottery,
    user,
  };
}
