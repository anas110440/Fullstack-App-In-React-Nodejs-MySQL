const express = require("express");
const router = express.Router();
const { Posts ,Likes} = require("../models")
const { validateToken } = require('../middlewares/AuthMiddleware')

router.get('/', validateToken, async (req,res)=>{
    const listOfPosts = await Posts.findAll({
        order: [
      ['id', 'DESC'], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
],
include:[Likes]
    });
    const likedPosts = await Likes.findAll({where : {UserId: req.user.id}})
    res.json({listOfPosts : listOfPosts , likedPosts: likedPosts })

});

router.get('/byId/:id', async (req,res)=>{
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);

});


router.post('/',validateToken , async (req,res)=>{
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post);
    res.json(post)
});

router.put('/title',validateToken , async (req,res)=>{
    const {newTitle , id} = req.body;
    Posts.update({title:newTitle},{where:{id:id}});
    res.json(newTitle);
});

router.put('/postText',validateToken , async (req,res)=>{
const {newText , id} = req.body;
    Posts.update({postText:newText},{where:{id:id}});
    res.json(newText);
});

router.delete("/:postid" , validateToken , async (req,res)=>{
    const postId = req.params.postid;
    await Posts.destroy({
        where: {
            id: postId ,
        },
    });
    res.json("Deleted Successfully")
})


router.get('/byuserId/:id', async (req,res)=>{
    const id = req.params.id;
    const ListOfPost = await Posts.findAll({
        where: {
            UserId: id
        }
    });
    res.json(ListOfPost);

});


module.exports= router