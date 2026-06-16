import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

export default function defineUsers(sequelizeConn) {
  class Users extends Model {}
  Users.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        unique: true,
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      rawPassword: {
        type: DataTypes.VIRTUAL,
      },
      passwordHash: {
        allowNull: false,
        type: DataTypes.STRING(60), //front end validation
      },
    },
    {
      sequelize: sequelizeConn,
      tableName: "users",
      hooks: {
        beforeValidate: async (user, options) => {
          user.passwordHash = await bcrypt.hash(user.rawPassword, 15);
          user.rawPassword = null;
        },
      },
    },
  );
}
