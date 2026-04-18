const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const CartItem = sequelize.define("CartItem", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: "cart_items",
  timestamps: false
});

module.exports = CartItem;