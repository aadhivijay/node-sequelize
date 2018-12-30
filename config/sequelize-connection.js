const Sequelize = require('sequelize');
const dbport = Number(process.env.dbport);

const usersModel = require('../model/users');
const student_courseModel = require('../model/student_course');
const coursesModel = require('../model/courses');
const course_modulesModel = require('../model/course_modules');
const testsModel = require('../model/tests');
const test_templatesModel = require('../model/test_templates');
const questionsModel = require('../model/questions');
const group_questionsModel = require('../model/group_questions');
const mcq_questionsModel = require('../model/mcq_questions');
const fill_questionsModel = require('../model/fillup_questions');
const programming_questionModel = require('../model/programming_question');
const descriptive_answer_writingModel = require('../model/descriptive_answer_writing');
const essay_email_writing_questionsModel = require('../model/essay_email_writing_questions');
const htmlcssjs_questionsModel = require('../model/htmlcssjs_questions');
const student_questionsModel = require('../model/student_questions');

const sequelize = new Sequelize({
    database: 'db',
    databaseVersion: '5.7.12',
    dialect: 'mysql',
    // replication: {
    //     read: {
    //         host: process.env.readhost
    //     },
    //     write: {
    //         host: process.env.writehost
    //     }
    // },
    username: 'name',
    password: 'pwd',
    port: dbport,
    pool: {
        max: 100,
        min: 0,
        idle: 20000,
        acquire: 50000,
        evict: 1000,
        handleDisconnects: true,
    },
    retry: {
        match: [
            'Sequelize.ConnectionError',
            'Sequelize.ConnectionRefusedError',
            'Sequelize.ConnectionTimedOutError',
            'Sequelize.TimeoutError',
            '/Deadlock/i'
        ],
        max: 2
    },
    define: {
        freezeTableName: true
    },
});

const users = usersModel(sequelize, Sequelize);
const student_course = student_courseModel(sequelize, Sequelize);
const courses = coursesModel(sequelize, Sequelize);
const course_modules = course_modulesModel(sequelize, Sequelize);
const tests = testsModel(sequelize, Sequelize);
const test_templates = test_templatesModel(sequelize, Sequelize);
const questions = questionsModel(sequelize, Sequelize);
const group_questions = group_questionsModel(sequelize, Sequelize);
const mcq_questions = mcq_questionsModel(sequelize, Sequelize);
const fillup_questions = fill_questionsModel(sequelize, Sequelize);
const programming_question = programming_questionModel(sequelize, Sequelize);
const descriptive_answer_writing = descriptive_answer_writingModel(sequelize, Sequelize);
const essay_email_writing_questions = essay_email_writing_questionsModel(sequelize, Sequelize);
const htmlcssjs_questions = htmlcssjs_questionsModel(sequelize, Sequelize);
const student_questions = student_questionsModel(sequelize, Sequelize);

courses.belongsTo(users, {foreignKey: 'user_id'});
courses.hasOne(course_modules, {foreignKey: 'c_id'});
course_modules.belongsTo(users, {foreignKey: 'user_id'});
tests.belongsTo(users, {foreignKey: 'user_id'});
tests.belongsTo(test_templates, {foreignKey: 'template_id'});
group_questions.hasMany(questions, {foreignKey: 'g_id'});
questions.belongsTo(group_questions, {foreignKey: 'g_id'});
questions.hasOne(mcq_questions, {foreignKey: 'q_id'});
questions.hasOne(fillup_questions, {foreignKey: 'q_id'});
questions.hasOne(programming_question, {foreignKey: 'q_id'});
questions.hasOne(descriptive_answer_writing, {foreignKey: 'q_id'});
questions.hasOne(essay_email_writing_questions, {foreignKey: 'q_id'});
questions.hasOne(htmlcssjs_questions, {foreignKey: 'q_id'});
student_course.belongsTo(users, {foreignKey: 'user_id'});
student_course.belongsTo(courses, {foreignKey: 'c_id'});
student_course.belongsTo(tests, {foreignKey: 't_id'});
student_questions.belongsTo(questions, {foreignKey: 'q_id'});
student_questions.belongsTo(courses, {foreignKey: 'c_id'});
student_questions.belongsTo(tests, {foreignKey: 't_id'});

module.exports = {
    users,
    student_course,
    courses,
    course_modules,
    tests,
    test_templates,
    questions,
    group_questions,
    mcq_questions,
    fillup_questions,
    programming_question,
    descriptive_answer_writing,
    essay_email_writing_questions,
    htmlcssjs_questions,
    student_questions,
    sequelize
};