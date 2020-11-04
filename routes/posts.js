const express = require('express');
const { Post, User , Image ,Comment } = require('../models')
const router = express.Router();

router.get('/', async (req,res,next) => { // GET /posts
    try {
        const posts = await Post.findAll({
            limit:10, // 몇개를 불러올것인지
            order:[['createdAt','DESC']],
            include:[{
                model:User,
                attributes:['id','nickname'],
            },{
                model:Image,
                attributes:['id'],
            },{
                model:Comment,
                include: [{
                    model:User,
                    attributes:['id','nickname']
                }]
            }]
        })
        res.status(200).json(posts)
    }catch(error) {
        console.error(error);
        next(error);
    }
})

module.exports  = router;