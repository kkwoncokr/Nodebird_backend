module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', { //Mysql 에는 users로 생성
        
        // id가 기본적으로 들어있음
        content:{
            type:DataTypes.TEXT, // 무제한
            allowNull: false, // 필수값
        },
    }, {
        charset:'utf8mb4',
        collate:'utf8mb4_general_ci', //한글저장
    });
    Comment.associate = (db) => {
        db.Comment.belongsTo(db.User)
        db.Comment.belongsTo(db.Post)
    };

    return Comment;
}
