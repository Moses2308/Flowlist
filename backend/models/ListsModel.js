import { Model, DataTypes } from "sequelize";

export default function defineLists(sequelizeConn) {
  class Lists extends Model {}
  Lists.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      isChecklist: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize: sequelizeConn,
      tableName: "lists",
    },
  );
}
