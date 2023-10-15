module.exports = (sequelize,DataTypes)=>{
const Posts = sequelize.define("Posts",{
    title:{
    type : DataTypes.STRING,
    allowNull: false,
},
postText:{
    type:DataTypes.STRING(255),
    allowNull: false,
},
username:{
    type:DataTypes.STRING,
    allowNull: false,
},

});


  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: "cascade",
    });
  };

    Posts.associate = (models) => {
    Posts.hasMany(models.Likes, {
      onDelete: "cascade",
    });
  };

return Posts;
}