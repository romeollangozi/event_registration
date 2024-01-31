module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    firstName: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name cannot be null",
        },
        notEmpty: {
          msg: "Name cannot be empty",
        },
        len: {
          args: [4, 20],
          msg: "Name must be between 4 and 20 characters",
        },
      },
    },
    lastName: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Lastname cannot be null",
        },
        notEmpty: {
          msg: "Lastname cannot be empty",
        },
        len: {
          args: [4, 20],
          msg: "Lastname must be between 4 and 20 characters",
        },
      },
    },
    email: {
      type: DataTypes.STRING(128),
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email cannot be null",
        },
        isEmail: {
          msg: "Invalid email format",
        },
      },
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be null",
        },
        notEmpty: {
          msg: "Password cannot be empty",
        },
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(64),
      allowNull: false,
      validate: {
        is: {
          args: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
          msg: "Invalid phone number format.",
        },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  });
  return User;
};
;
