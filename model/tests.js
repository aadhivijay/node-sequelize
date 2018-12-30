module.exports = (sequelize, type) => {
    return sequelize.define('tests', {
        t_id: {
            type: type.UUID,
            primaryKey: true,
            allowNull: false
        },
        template_id: {
            type: type.UUID,
            allowNull: false,
            references: {
                model: 'test_templates',
                key: 'template_id'
            }
        },
        user_id: {
            type: type.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'user_id'
            }
        },
        t_description: {
            type: type.TEXT,
            allowNull: true
        },
        t_name: {
            type: type.STRING,
            allowNull: false
        },
        test_rules: {
            type: type.JSON,
            allowNull: true
        },
        t_type: {
            type: type.ENUM('Manual Assessment Test', 'Psychometric Test', 'Rule Based Test'),
            allowNull: false
        },
        t_sub_type: {
            type: type.ENUM('Big 5 Test'),
            allowNull: true
        },
        price: {
            type: type.DOUBLE,
            allowNull: true
        },
        visibility: {
            type: type.ENUM(
                'Only me',
                'Within Branch',
                'Within Department',
                'Across Branches',
                'Public Paid',
                'Public Free',
                'All',
            ),
            allowNull: false
        },
        t_times_attempted: {
            type: type.INTEGER,
            allowNull: false
        },
        t_publish_status: {
            type: type.BOOLEAN,
            defaultValue: false,
            allowNull: true,
        },
        isTestruletype: {
            type: type.ENUM('Static' , 'Dynamic'),
            allowNull: true
        },
        createdBy: {
            type: type.STRING,
            allowNull: false
        },
        user_role: {
            type: type.ENUM('admin', 'Head', 'admin-Head', 'Staff', 'admin-Staff'),
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
            singular: 'tests',
            plural: 'tests'
        },
        defaultScope: {
            attributes: {
                exclude: ['deletedAt'],
            },
        },
    });
}
