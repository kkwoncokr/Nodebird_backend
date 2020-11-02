const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport')
const { User,Post } = require('../models') // 구조분해 할당
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

router.post('/', isNotLoggedIn, async (req,res,next)=> {
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

  router.post('/login',isNotLoggedIn, (req,res,next) => {
    passport.authenticate('local', (err,user,info) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if(info) {
        return res.status(401).json(info.reason);
      }
      return req.login(user, async (loginErr) => {
          if(loginErr) {
          return next(loginErr);
        }
        const fullUserWithoutPassword = await User.findOne({ // 비밀번호 제외, db에서 없는 것들 불러오기
          where : { id :user.id },
          attributes: {
            exclude: ['password'] // 비밀번호 제외 가져오겠다.
          },  
          include: [{
            model:Post,
          },{
            model:User,
            as: 'Followings',
          }, {
            model:User,
            as: 'Followers'
          }]
        })
        return res.status(200).json(fullUserWithoutPassword);
      })
    })(req,res,next);
  });
  router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
  });
module.exports  = router;