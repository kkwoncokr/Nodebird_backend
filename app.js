// get 가져오다
// post 생성하다
// put 전체수정
// delete 제거
// patch 부분 수정
// options 찔러보기 요청 보낼수 있니?
// head 헤더만 가져오기
//  npx sequelize db:create db 생성
const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const dotenv = require('dotenv');
const path = require('path')

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');
const morgan = require('morgan')

dotenv.config();

db.sequelize.sync()
    .then(() => {
        console.log('db연결 성공!')
    })
    .catch(console.error);
passportConfig();
app.use(morgan('dev'))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave:false,
    secret:process.env.COOKIE_SECRET,
}))

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req,res) => {
    res.send('hello express')
})


app.use('/post',postRouter);
app.use('/posts',postsRouter);
app.use('/user',userRouter);


app.listen(3065, () => {
    console.log('서버 실행중');
});