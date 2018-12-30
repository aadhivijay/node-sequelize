module.exports = (sequelize, type) => {
    return sequelize.define('mcq_questions', {
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
        options: {
            type: type.TEXT,
            allowNull: true
        },
        answer: {
            type: type.TEXT,
            allowNull: true
        },
        variable_questions_config: {
            type: type.JSON,
            defaultValue: null,
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
            singular: 'mcq_questions',
            plural: 'mcq_questions'
        },
        defaultScope: {
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt', 'id'],
            },
        },
    });
}
