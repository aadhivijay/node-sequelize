module.exports = (sequelize, type) => {
    return sequelize.define('course_modules', {
        c_module_id: {
            type: type.UUID,
            primaryKey: true,
            allowNull: false
        },
        c_id: {
            type: type.UUID,
            allowNull: false,
            references: {
                model: 'courses',
                key: 'c_id'
            }
        },
        c_module_data: {
            type: type.JSON,
            allowNull: true
        },
        createdBy: {
            type: type.STRING,
            allowNull: false
        },
        createdAt: type.DATE,
        updatedAt: type.DATE,
        deletedAt: type.DATE
    }, {
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        name: {
            singular: 'course_modules',
            plural: 'course_modules'
        },
        defaultScope: {
            attributes: {
                exclude: ['deletedAt', 'updatedAt'],
            },
        },
    });
}
