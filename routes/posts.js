const express = require('express');
const {Op} = require('sequelize')
const { Post, User , Image ,Comment } = require('../models');
const image = require('../models/image');
const router = express.Router();

router.get('/', async (req,res,next) => { // GET /posts
    try {
        const where  = {};
        if (parseInt(req.query.lastId, 10)) {
            where.id = {[Op.lt]: parseInt(req.query.lastId,10)}
        }
        const posts = await Post.findAll({
            where,
            limit:10, // 몇개를 불러올것인지
            order:[['createdAt','DESC']],
            include:[{
                model:User,
                attributes:['id','nickname'],
            },{
                model:Image,
            },{
                model:User,
                as: 'Likers',
                attributes:['id'],
            },{
                model:Comment,
                include: [{
                    model:User,
                    attributes:['id','nickname']
                }],
            },{
                model: Post,
                as:'Retweet',
                include : [{
                    model:User,
                    attributes:['id','nickname'],
                },{
                    model:Image,
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