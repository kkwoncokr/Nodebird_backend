const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models') // 구조분해 할당
const router = express.Router();

router.post('/', async (req,res,next)=> {
    try {
       const exUser = await User.findOne({
            where : {
                email: req.body.email,
            }
        }); // 비동기 fidOne 찾는 함수
        if (exUser) {
           return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12)
        await User.create({
            email: req.body.email,
            password: hashedPassword,
            nickname: req.body.nickname,
        })
    res.status(200).send('success');
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports  = router;