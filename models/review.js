// Export review model
module.exports = function(sequelize, DataTypes) {
    const Review = sequelize.define("Review", {

        reviewTitle: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 500]
            }
        },

        reviewText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user: {
            type: DataTypes.STRING
        },
        trailLocation: {
            type: DataTypes.STRING
        },
        trailName: {
            type: DataTypes.STRING
        }
    });

    Review.associate = function(models) {
        models.Review.hasMany(models.Comment, { onDelete: 'cascade'});
    };

    Review.associate = function(models) {
        models.Review.belongsTo(models.User);
    }

    return Review;
}