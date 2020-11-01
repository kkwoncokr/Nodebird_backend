module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { //Mysql 에는 users로 생성
        
        // id가 기본적으로 들어있음
        email: {
            type:DataTypes.STRING(30),
            allowNull:false, // 필수 항목 false 여야한다.
            unique: true, // 고유한 값 중복 x
        },
        nickname: {
            type:DataTypes.STRING(30),
            allowNull:false, // 필수 항목 false 여야한다.
        },
        password: {
            type:DataTypes.STRING(100),
            allowNull:false, //필수 항목 false 여야한다.
        },
    }, {
        charset:'utf8',
        collate:'utf8_general_ci', //한글저장
    });
    User.associate = (db) => {
        db.User.hasMany(db.Post); // 
        db.User.hasMany(db.Comment); // 
        db.User.belongsToMany(db.Post, {through : 'Like', as:'Liked'}); // 사용자와 게시글에 좋아요 관계
        db.User.belongsToMany(db.User, {through : 'Follow', as:'Followers', foreignKey: 'FollowingId'})
        db.User.belongsToMany(db.User, {through : 'Follow', as:'Followings', foreignKey: 'FollowerId'})
    };

    return User;
}
