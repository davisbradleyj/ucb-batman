// Export comment model
module.exports = function (sequelize, DataTypes) {
    const Comment = sequelize.define("Comment", {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.INTEGER
        }
    });

    Comment.associate = function(models) {
        models.Comment.belongsTo(models.Blog);
    }

    return Comment;
}