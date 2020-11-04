module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { //Mysql 에는 users로 생성
        
        // id가 기본적으로 들어있음
        content: {
            type:DataTypes.TEXT, // 무제한
            allowNull: false, // 필수값
        },
    }, {
        charset:'utf8mb4',
        collate:'utf8mb4_general_ci', //한글저장, 이모티콘까지 저장
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User); // 게시글은 유저에게 포함된다.
        db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsTo(db.Post, {as : 'Retweet'}); // as는 별칭
        db.Post.belongsToMany(db.User, {through : 'Like', as:'Likers'}); // 사용자와 게시글에 좋아요 관계 through => 중간테이블 이름 바꾸기
    };

    return Post;
}
