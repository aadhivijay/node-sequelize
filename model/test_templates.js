module.exports = (sequelize, type) => {
    return sequelize.define('test_templates', {
        template_id: {
            type: type.UUID,
            primaryKey: true,
            allowNull: false
        },
        template_data: {
            type: type.TEXT,
            allowNull: true
        },
        createdAt: type.DATE,
        updatedAt: type.DATE,
        deletedAt: type.DATE
    }, {
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        name: {
            singular: 'test_templates',
            plural: 'test_templates'
        },
        defaultScope: {
            attributes: {
                exclude: ['deletedAt', 'updatedAt'],
            },
        },
    });
}
