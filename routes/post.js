const express = require('express');
const { Post } = require('../models');
const {isLoggedIn} = require('./middlewares')


const router = express.Router();
router.post('/', async (req,res,next) => {
    try {
       const post = await Post.create({
            content: req.body.content,
            UserId: req.user.id,
        });
       res.status(201).json(post)
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.post('/:postId/comment', async (req,res,next) => {
    try {
       const post = await Post.findOne ({
            where: {id:req.params.postId}
        })
        if(!post) {
            return res.status(403).send('존재하지 않는 게시글 입니다.');
        }
       const comment = await Comment.create({
            content: req.body.content,
            UserId: req.user.id,
            postId: req.params.postId,
        });
       res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        next(error)
    }
})



module.exports = router;