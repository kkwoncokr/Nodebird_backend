module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', { //Mysql 에는 users로 생성
        
        // id가 기본적으로 들어있음
        src:{
            type:DataTypes.STRING(200),
        },
    }, {
        charset:'utf8',
        collate:'utf8_general_ci', //한글저장
    });
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post)
    };

    return Image;
}