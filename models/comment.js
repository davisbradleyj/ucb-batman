// Export comment model
module.exports = function (sequelize, DataTypes) {
    const Comment = sequelize.define("Comment", {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        commentText: {
            type: DataTypes.TEXT
        },
        userId: {
            type: DataTypes.INTEGER
        }
    });

    Comment.associate = function(models) {
        models.Comment.belongsTo(models.Review);
    }

    return Comment;
}