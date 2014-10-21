"use strict";

module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    blog: DataTypes.STRING,
    AuthorId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(db) {
        // associations can be defined here
        Post.belongsTo(db.Author);
      }
    }
  });

  return Post;
};
