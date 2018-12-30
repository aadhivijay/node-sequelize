module.exports = (sequelize, type) => {
    return sequelize.define('group_questions', {
        g_id: {
            type: type.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        m_id: {
            type: type.UUID,
            allowNull: true
        },
        common_content: {
            type: type.TEXT,
            allowNull: false
        },
        question_media: {
            type: type.JSON,
            allowNull: true
        },
        question_order: {
            type: type.JSON,
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
            singular: 'group_questions',
            plural: 'group_questions'
        },
        defaultScope: {
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt'],
            },
        },
    });
}
