module.exports = exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: { type: DataTypes.STRING(50), primaryKey: true },
        username: { type: DataTypes.STRING(50) },
        phone: { type: DataTypes.STRING(20), allowNull: false },
        password: { type: DataTypes.STRING(50), allowNull: false },
        email: { type: DataTypes.STRING(50), allowNull: false },
        age: { type: DataTypes.INTEGER, allowNull: true },
        sex: { type: DataTypes.STRING(10), allowNull: true },
        create_time: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.NOW }, // 到账时间
        update_time: { type: DataTypes.DATE, allowNull: true },
    }, { timestamps: false, tableName: "test_user" });
    return User;
}