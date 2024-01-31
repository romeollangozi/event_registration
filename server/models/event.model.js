module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define("events", {
    eventName: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Event name cannot be null",
        },
        notEmpty: {
          msg: "Event name cannot be empty",
        },
        len: {
          args: [3, 128],
          msg: "Event name must be between 3 and 128 characters",
        },
      },
    },
    eventLocation: {
      type: DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Event location cannot be null",
        },
        notEmpty: {
          msg: "Event location cannot be empty",
        },
        len: {
          args: [5, 128],
          msg: "Event location must be between 5 and 128 characters",
        },
      },
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Event date cannot be null",
        },
      },
    },
    duration: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Event duration cannot be null",
        },
      },
    },
    eventDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Event description cannot be null",
        },
        notEmpty: {
          msg: "Event description cannot be empty",
        },
        len: {
          args: [30],
          msg: "Event description must be more that 30 characters",
        },
      },
    },
    eventPicture: {
      type: DataTypes.TEXT(),
      allowNull: true,
      defaultValue:
        "https://media.istockphoto.com/id/479977238/photo/table-setting-for-an-event-party-or-wedding-reception.jpg?s=612x612&w=0&k=20&c=yIKLzW7wMydqmuItTTtUGS5cYTmrRGy0rXk81AltdTA=",
    },
    eventCategory: {
      type: DataTypes.ENUM(
        "Art & Culture",
        "Technology",
        "Concert",
        "NightLife",
        "Sports"
      ),
      allowNull: false,
      validate: {
        isIn: {
          args: [
            ["Art & Culture", "Technology", "Concert", "NightLife", "Sports"],
          ],
          msg: "Invalid event category",
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
  return Event;
};
