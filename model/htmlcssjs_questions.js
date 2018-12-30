module.exports = (sequelize, type) => {
    return sequelize.define('htmlcssjs_questions', {
        id: {
            type: type.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        q_id: {
            type: type.UUID,
            allowNull: false,
            references: {
                model: 'questions',
                key: 'q_id'
            }
        },
        createdAt: type.DATE,
        updatedAt: type.DATE,
        deletedAt: type.DATE
    }, {
        timestamps: true,
        paranoid: true,
        freezeTableName: true,
        name: {
            singular: 'htmlcssjs_questions',
            plural: 'htmlcssjs_questions'
        },
        defaultScope: {
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt', 'id'],
            },
        },
    });
}
