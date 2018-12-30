module.exports = (sequelize, type) => {
    return sequelize.define('programming_question', {
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
        multilanguage: {
            type: type.JSON,
            allowNull: false
        },
        enablecustominput: {
            type: type.JSON,
            allowNull: true
        },
        input_format: {
            type: type.TEXT,
            allowNull: true
        },
        output_format: {
            type: type.TEXT,
            allowNull: true
        },
        sample_io: {
            type: type.TEXT('medium'),
            allowNull: true
        },
        code_constraints: {
            type: type.TEXT,
            allowNull: true
        },
        run_time_limit: {
            type: type.INTEGER(),
            allowNull: true
        },
        memory_limit: {
            type: type.FLOAT(),
            allowNull: true
        },
        code_size: {
            type: type.FLOAT(),
            allowNull: true
        },
        solution: {
            type: type.JSON,
            allowNull: true
        },
        testcases: {
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
            singular: 'programming_question',
            plural: 'programming_question'
        },
        defaultScope: {
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt', 'id'],
            },
        },
    });
}
