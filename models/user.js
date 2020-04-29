// Create User model for sequelize
module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 20]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,50]
            }
        },
        password: {
            type: DataTypes.String,
            allowNull: false,
            validate: {
                len: [1,20]
            }
        },
        favorites: {
            type: DataTypes.STRING,
        },
        hasReview: DataTypes.BOOLEAN
    });

    User.associate = function (models) {
        models.User.hasMany(models.blog, { onDelete: 'cascade' });   
    };

    return User;
}
