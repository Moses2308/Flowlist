import sequelizeConn from "../config/dbconfig.js";
import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

class User extends Model {
  //helper functions to verify, update, and set passwords
  async verifyPassword(rawPassword) {
    const result = await bcrypt.compare(rawPassword, this.password_hash);
    return result;
  }
  async updatePassword(rawPassword, newPassword) {
    if (await this.verifyPassword(rawPassword)) {
      this.password_hash = await bcrypt.hash(rawPassword, 13);
    }
  }
  async setPasswordHash(rawPassword) {
    this.password_hash = await bcrypt.hash(rawPassword, 13);
  }
}
User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConn,
    timestamps: false,
    modelName: "User",
  }
);

export default User;
