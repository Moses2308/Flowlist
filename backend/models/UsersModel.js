import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

export default function defineUsers(sequelizeConn) {
  class Users extends Model {
    //instance method to update fields
    patchFields(fieldsObj) {
      const fields = Object.entries(fieldsObj);
      const fieldsUpdated = [];

      fields.forEach((field) => {
        switch (field[0]) {
          case "password":
            this.rawPassword = field[1];
            fieldsUpdated.push(field[0]);
            break;
          case "email":
            this.email = field[1];
            fieldsUpdated.push(field[0]);
            break;
          default:
            break;
        }
      });

      return fieldsUpdated;
    }

    //instance method to delete password hash before resposne
    deletePassHash() {
      delete this.dataValues.passwordHash;
      return this;
    }

    //instance method to delete password before response
    deleteRawPassword() {
      delete this.dataValues.rawPassword;
      return this;
    }

    async verifyPassword(rawPassword) {
      return await bcrypt.compare(rawPassword, this.passwordHash);
    }
  }

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
        //TODO: notify users of this restriction through frontend
        type: DataTypes.STRING(60),
      },
    },
    {
      sequelize: sequelizeConn,
      tableName: "users",
      /*
        TODO: Refactor hooks to use delete instance methods to delete sensitive
        data on save.
      */
      hooks: {
        beforeValidate: async (user, options) => {
          if (user.rawPassword) {
            user.passwordHash = await bcrypt.hash(user.rawPassword, 15);
            user.rawPassword = null;
          }
        },
      },
    },
  );
}
