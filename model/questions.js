module.exports = (sequelize, type) => {
    return sequelize.define('questions', {
        q_id: {
            type: type.UUID,
            primaryKey: true,
            allowNull: false
        },
        feedback: {
            type: type.JSON,
            defaultValue: null,
            allowNull: true
        },
        question_editor_type: {
            type: type.INTEGER,
            allowNull: true
        },
        qb_id: {
            type: type.UUID,
            allowNull: false
        },
        imported: {
            type: type.BOOLEAN,
            defaultValue: false
        },
        g_id: {
            type: type.BIGINT,
            allowNull: true,
            references: {
                model: 'group_questions',
                key: 'g_id'
            }
        },
        m_id: {
            type: type.UUID,
            allowNull: true
        },
        question_type: {
            type: type.ENUM(
                'mcq_single_correct',
                'mcq_multiple_correct',
                'fillup_single_correct',
                'fillup_multiple_correct',
                'essay',
                'programming',
                'descriptive_answer_writing'
            ),
            allowNull: false
        },
        marking_scheme: {
            type: type.ENUM('split_equally', 'split_manually', 'atleast_one', 'all_correct'),
            allowNull: true
        },
        question_data: {
            type: type.TEXT,
            allowNull: false
        },
        hint: {
            type: type.TEXT,
            allowNull: false
        },
        answer_explanation: {
            type: type.TEXT,
            allowNull: false
        },
        subject_id: {
            type: type.UUID,
            allowNull: true
        },
        topic_id: {
            type: type.UUID,
            allowNull: true
        },
        sub_topic_id: {
            type: type.UUID,
            allowNull: true
        },
        manual_difficulty: {
            type: type.ENUM('Easy', 'Medium', 'Hard'),
            allowNull: false
        },
        automatic_difficulty: {
            type: type.DOUBLE,
            defaultValue: 5.0,
            allowNull: false
        },
        linked_concepts: {
            type: type.TEXT,
            allowNull: false
        },
        question_status: {
            type: type.ENUM('Dependent', 'Independent'),
            defaultValue: 'Independent',
            allowNull: false
        },
        isAdaptive: {
            type: type.BOOLEAN,
            defaultValue: false,
            allowNull: true
        },
        verification_status: {
            type: type.BOOLEAN,
            defaultValue: false,
            allowNull: true
        },
        question_rating: {
            type: type.DOUBLE,
            defaultValue: 0.0,
            allowNull: false
        },
        createdBy: {
            type: type.STRING,
            allowNull: false
        },
        question_media: {
            type: type.JSON,
            allowNull: true
        },
        video_solution: {
            type: type.JSON,
            allowNull: true
        },
        blooms_taxonomy: {
            type: type.ENUM(
                'Evaluation',
                'Synthesis',
                'Analysis',
                'Application',
                'Comprehension',
                'Knowledge'
            ),
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
            singular: 'questions',
            plural: 'questions'
        },
        defaultScope: {
            attributes: {
                exclude: ['deletedAt', 'createdAt', 'updatedAt'],
            },
        },
    });
}
