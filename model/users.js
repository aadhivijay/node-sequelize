module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        user_id: {
            type: type.UUID,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: type.STRING,
            allowNull: false,
            unique: true
        },
        email_verified: {
            type: type.BOOLEAN
        },
        name: {
            type: type.STRING
        },
        hash_password: {
            type: type.STRING,
            allowNull: false,
        },
        salt: {
            type: type.STRING,
            allowNull: false,
        },
        phone: {
            type: type.STRING,
            allowNull: true,
        },
        phone_verified: {
            type: type.BOOLEAN
        },
        profile_pic: {
            type: type.STRING,
            allowNull: true,
        },
        createdAt: type.DATE,
        updatedAt: type.DATE,
        deletedAt: type.DATE
    }, {
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        name: {
            singular: 'users',
            plural: 'users'
        },
        defaultScope: {
            attributes: {
                exclude: ['deletedAt'],
            },
        },
    });
}
