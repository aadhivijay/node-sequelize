module.exports = (sequelize, type) => {
    return sequelize.define('courses', {
        c_id: {
            type: type.UUID,
            primaryKey: true,
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
        c_name: {
            type: type.STRING,
            allowNull: false,
        },
        price: {
            type: type.DOUBLE,
            allowNull: true
        },
        is_sku_present: {
            type: type.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        enroll_branch: {
            type: type.UUID,
            allowNull: true
        },
        enroll_batch: {
            type: type.UUID,
            allowNull: true
        },
        enroll_degree: {
            type: type.UUID,
            allowNull: true
        },
        enroll_department: {
            type: type.UUID,
            allowNull: true
        },
        c_description: {
            type: type.TEXT,
            allowNull: true
        },
        c_validity_type: {
            type: type.ENUM('Range', 'Months'),
            allowNull: true
        },
        c_type: {
            type: type.ENUM('Drive', 'Contest', 'Normal'),
            allowNull: true
        },
        c_validity_start: {
            type: type.STRING,
            allowNull: true
        },
        c_validity_end: {
            type: type.STRING,
            allowNull: true
        },
        c_validity_months: {
            type: type.STRING,
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
        c_students_assigned: {
            type: type.INTEGER,
            allowNull: true
        },
        c_number_of_modules: {
            type: type.INTEGER,
            allowNull: true
        },
        c_sub_number_of_modules: {
            type: type.INTEGER,
            allowNull: true
        },
        c_publish_status: {
            type: type.BOOLEAN,
            allowNull: true
        },
        c_taken_status: {
            type: type.BOOLEAN,
            allowNull: true
        },
        is_drive: {
            type: type.BOOLEAN,
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
            singular: 'courses',
            plural: 'courses'
        },
        defaultScope: {
            attributes: {
                exclude: ['deletedAt'],
            },
        },
    });
}
