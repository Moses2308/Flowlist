import { Users, Lists, ListItems } from "../models.js";
import { DataTypes } from "sequelize";

export default function defineAssociations() {
  //USERS ASSOCIATIONS
  Users.hasMany(Lists, {
    foreignKey: {
      name: "userId",
      type: DataTypes.UUID,
      allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  //LISTS ASSOCIATIONS
  Lists.belongsTo(Users, {
    foreignKey: {
      name: "userId",
      type: DataTypes.UUID,
      allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Lists.hasMany(ListItems, {
    foreignKey: {
      name: "ListId",
      type: DataTypes.UUID,
      allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  //ITEMS ASSOCIATIONS
  ListItems.belongsTo(Lists, {
    foreignKey: {
      name: "ListId",
      type: DataTypes.UUID,
      allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
}
