module.exports = (sequelize, type) => {
    return sequelize.define('student_course', {
        id: {
            type: type.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        t_restart_status: {
            type: type.INTEGER,
            defaultValue: 0,
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
        t_status: {
            type: type.INTEGER,
            allowNull: true
        },
        c_enroll_status: {
            type: type.STRING,
            allowNull: true
        },
        c_activation_status: {
            type: type.INTEGER,
            allowNull: true
        },
        t_marks: {
            type: type.DOUBLE,
            allowNull: true
        },
        t_total_marks: {
            type: type.DOUBLE,
            allowNull: true
        },
        frozen_test_data: {
            type: type.JSON,
            allowNull: true
        },
        section_wise_marks: {
            type: type.JSON,
            allowNull: true
        },
        test_tracking_data_analysis: {
            type: type.JSON,
            allowNull: true
        },
        test_tracking_data: {
            type: type.JSON,
            allowNull: true
        },
        client_data: {
            type: type.JSON,
            allowNull: true
        },
        attempt_no: {
            type: type.INTEGER,
            allowNull: false
        },
        course_completion: {
            type: type.DOUBLE,
            defaultValue: 0.0,
            allowNull: false
        },
        start_time: {
            type: type.DATE,
            allowNull: true
        },
        submit_time: {
            type: type.DATE,
            allowNull: true
        },
        test_duration: {
            type: type.STRING(10),
            allowNull: true
        },
        test_ranks: {
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
            singular: 'student_course',
            plural: 'student_course'
        },
        defaultScope: {
            attributes: {
                exclude: ['deletedAt', 'updatedAt'],
            },
        },
    });
}
