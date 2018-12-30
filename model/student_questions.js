module.exports = (sequelize, type) => {
    return sequelize.define('student_questions', {
        s_question_id: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: type.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        c_id: {
            type: type.UUID,
            allowNull: false,
            references: {
                model: 'courses',
                key: 'c_id'
            }
        },
        t_id: {
            type: type.UUID,
            allowNull: false,
            references: {
                model: 'tests',
                key: 't_id'
            }
        },
        q_id: {
            type: type.UUID,
            allowNull: false,
            references: {
                model: 'questions',
                key: 'q_id'
            }
        },
        attempt_no: {
            type: type.INTEGER,
            allowNull: false
        },
        marks: {
            type: type.DOUBLE,
            allowNull: false
        },
        answer: {
            type: type.TEXT('medium'),
            allowNull: true
        },
        state: {
            type: type.INTEGER,
            allowNull: true
        },
        bookmarked: {
            type: type.BOOLEAN,
            allowNull: true
        },
        total_hints_shown: {
            type: type.INTEGER,
            allowNull: true
        },
        timespent: {
            type: type.INTEGER,
            allowNull: false
        },
        options_switched_count: {
            type: type.INTEGER,
            allowNull: false
        },
        compiled_count: {
            type: type.INTEGER,
            allowNull: false
        },
        program_submitted_count: {
            type: type.INTEGER,
            allowNull: false
        },
        penalty_points: {
            type: type.DOUBLE,
            allowNull: false
        },
        variable_id: {
            type: type.STRING(36),
            allowNull: false
        },
        is_Used_AD: {
            type: type.DATE,
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
