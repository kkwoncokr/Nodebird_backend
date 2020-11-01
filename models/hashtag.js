module.exports = (sequelize, DataTypes) => {
    const Hashtag = sequelize.define('Hashtag', { //Mysql 에는 users로 생성
        
        // id가 기본적으로 들어있음
        name:{
            type:DataTypes.STRING(20), 
            allowNull: false, // 필수값
        },
    }, {
        charset:'utf8mb4',
        collate:'utf8mb4_general_ci', //한글저장
    });
    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'})
    };

    return Hashtag;
}