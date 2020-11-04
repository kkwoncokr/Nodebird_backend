const express = require('express');
const { Post, User, Image, Comment } = require('../models');
const {isLoggedIn} = require('./middlewares')


const router = express.Router();
router.post('/', isLoggedIn, async (req,res,next) => {
    try {
       const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
        const fullPost = await Post.findOne({
            where: { id: post.id },
            include: [{
              model: Image,
            }, {
              model: Comment,
              include: [{
                model: User, // 댓글 작성자
                attributes: ['id', 'nickname'],
              }],
            }, {
              model: User, // 게시글 작성자
              attributes: ['id', 'nickname'],
            }, {
              model: User, // 좋아요 누른 사람
              as: 'Likers',
              attributes: ['id'],
            }]
          })
          res.status(201).json(fullPost);
        } catch (error) {
          console.error(error);
          next(error);
        }
    });
router.post(`/:postId/comment`,isLoggedIn, async (req,res,next) => {
    try {
       const post = await Post.findOne ({
            where: {id: req.params.postId},
        })
        console.debug(post);
        if(!post) {
            return res.status(403).send('존재하지 않는 게시글 입니다.');
        }
        const comment = await Comment.create({
          content: req.body.content,
          UserId: req.user.id,
          PostId: parseInt(req.params.postId,10),
      });
      const fullCommnet = await Comment.findOne ({
        where : {id: comment.id},
        include : [{
          model:User,
          attributes:['id','nickname']
        }]
      })
       res.status(201).json(fullCommnet);
    } catch (error) {
        console.error(error);
        next(error)
    }
});



module.exports = router;