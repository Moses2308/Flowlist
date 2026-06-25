import { DataTypes } from "sequelize";

export default function defineAssociations(sequelizeConn) {
  const { Users, Lists, ListItems } = sequelizeConn.models;

  //USERS ASSOCIATIONS
  Users.hasMany(Lists, {
    foreignKey: {
      name: "userId",
      type: DataTypes.UUID,
      allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    as: "list",
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
    as: "user",
  });
  Lists.hasMany(ListItems, {
    foreignKey: {
      name: "ListId",
      type: DataTypes.UUID,
      allowNull: false,
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    as: "listItem",
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
    as: "list",
  });
}
