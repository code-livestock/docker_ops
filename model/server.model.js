module.exports = exports = (sequelize, DataTypes) => {
    const Server = sequelize.define("Claim", {
        id: { type: DataTypes.STRING(50), primaryKey: true },
        node_name: { type: DataTypes.STRING(50) },
        node_user: { type: DataTypes.STRING(20), allowNull: false },
        password: { type: DataTypes.STRING(50), allowNull: false },
        ip: { type: DataTypes.STRING(50), allowNull: false },
        server_area: { type: DataTypes.STRING(50), allowNull: true },
        domain_name: { type: DataTypes.STRING(50), allowNull: true },
        create_time: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.NOW }, // 到账时间
        update_time: { type: DataTypes.DATE, allowNull: true },
        user_id: { type: DataTypes.STRING(50), allowNull: true },
        port: { type: DataTypes.STRING(20), allowNull: true },
        is_docker: { type: DataTypes.STRING(10), allowNull: true, defaultValue: "no" },
    }, { timestamps: false, tableName: "test_server" });
    return Server;
}