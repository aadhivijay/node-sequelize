module.exports = (sequelize, type) => {
    return sequelize.define('descriptive_answer_writing', {
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
        name: {
            type: type.STRING,
            allowNull: false
        },
        directions: {
            type: type.TEXT,
            allowNull: false
        },
        word_limit: {
            type: type.INTEGER,
            allowNull: true
        },
        internalkeyword: {
            type: type.TEXT,
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
            singular: 'descriptive_answer_writing',
            plural: 'descriptive_answer_writing'
        },
        defaultScope: {
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt', 'id'],
            },
        },
    });
}
