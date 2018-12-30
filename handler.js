'use strict';
var http = require('http');
var _ = require('lodash');
var {
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
} = require('./config/sequelize-connection');

http.createServer(function (req, res) {

  startWork(JSON.stringify({
    user_id: 'b49de6eb-a3ff-4ed9-9bda-22104743ffa7',
    c_id: '33b71725-aee3-419e-a42d-fff047507946',
    t_id: 'acf09c38-f94f-4f47-9cb1-09f5ec3a2cfa',
    attempt_no: 1,
    client_data: {
      OS: {
        name: 'Linux',
        version: 'x86_64'
      },
      browser: {
        name: 'Chrome',
        version: '71.0.3578.98',
        major: '71'
      },
      cpu: { architecture: 'amd64' },
      Public_IP: '117.99.86.244'
    },
    test_type: 'normal'
  }));

  // method to get message from queue and process
  function startWork(data) {
    return new Promise((resolved, rejected) => {

      data = JSON.parse(data);
      console.log('event--->', data);

      if (data.test_type === 'dynamic') {

        frozenDataGeneratorForDynamicTest(data).then(() => {
          sequelize.close();
          resolved(true);
        });

      } else {

        frozenDataGeneratorForNormalTest(data).then(() => {
          sequelize.close();
          resolved(true);
        });

      }

    });
  }

  // method to generate frozen data for a student - normal test
  function frozenDataGeneratorForNormalTest(data) {
    return new Promise((resolved, rejected) => {

      try {

        student_course.findOne({
          where: {
            user_id: data.user_id,
            c_id: data.c_id,
            t_id: data.t_id,
            attempt_no: data.attempt_no
          }
        }).then((studentCourseDetails) => {

          let client_payload = [];

          if (
            studentCourseDetails
            && studentCourseDetails.client_data
            && studentCourseDetails.client_data.length
          ) {

            client_payload = studentCourseDetails.client_data;
            client_payload.push(data.client_data);

          } else {

            client_payload = [data.client_data];

          }

          if (
            studentCourseDetails
            && studentCourseDetails.frozen_test_data
          ) { // if frozen data already present

            // finalpayload.c_name = coursename;
            // finalpayload.frozen_test_data
            //   = JSON.parse(JSON.stringify(studentCourseDetails.frozen_test_data));
            // finalpayload =
            //     CryptoJS.AES.encrypt(JSON.stringify(finalpayload), data.user_id).toString();

            student_course.upsert({
              t_status: 1,
              user_id: data.user_id,
              c_id: data.c_id,
              t_id: data.t_id,
              attempt_no: data.attempt_no,
              start_time: new Date(),
              client_data: client_payload
            });

            resolved(finalpayload);

          } else { // if frozen data not present

            courses.findOne({
              where: {
                c_id: data.c_id
              },
              include: [
                {
                  model: course_modules,
                  attributes: [
                    'c_marks_data'
                  ]
                }
              ]
            }).then((courseDetails) => {

              if (courseDetails) {
                courseDetails = JSON.parse(JSON.stringify(courseDetails));

                // coursename = courseDetails.c_name;
                const questionmarks = {};

                _.forEach(courseDetails.course_modules.c_marks_data, (marksdata) => {
                  _.forEach(marksdata.data, (q) => {
                    questionmarks[q.q_id] = {};
                    questionmarks[q.q_id].p_mark = Number(q.marks);
                    questionmarks[q.q_id].n_mark = Number(q.negative_marks);
                  });
                });
                courseDetails.questionmarks = questionmarks;

                // include: [{
                //     model: student_course_metadata,
                //     attributes: ["show_rating"]
                // }],

                tests.findOne({
                  where: {
                    t_id: data.t_id
                  },
                  include: [
                    {
                      model: test_templates
                    }
                  ]
                }).then((testTemplates) => {
                  testTemplates = JSON.parse(JSON.stringify(testTemplates));

                  frozenDataGenerator(courseDetails, testTemplates, data).then(() => {
                    resolved(true);
                  });

                }, (failed) => {
                  console.log(failed);
                  rejected({
                    success: false,
                    message: 'Could not start test'
                  });
                }).catch((errored) => {
                  console.log(errored);
                  rejected({
                    success: false,
                    message: 'Could not start test'
                  });
                });

              } else {
                resolved({
                  success: false,
                  message: 'Could not start test'
                });
              }

            }, (failed) => {
              console.log(failed);
            }).catch((errored) => {
              console.log(errored);
            });

          }

        }, (failed) => {
          console.log(failed);
          rejected({
            success: false,
            message: 'Could not start test'
          });
        }).catch((errored) => {
          console.log(errored);
          rejected({
            success: false,
            message: 'Could not start test'
          });
        });

      } catch (error) {
        console.log('try-catch : ', error);
      }

    });
  }

  // method to generate frozen data for a student - dynamic test
  function frozenDataGeneratorForDynamicTest(data) {
    return new Promise((resolved, rejected) => {

      try {

        // const finalpayload = {};
        // let coursename;
        student_course.findOne({
          where: {
            user_id: data.user_id,
            c_id: data.c_id,
            t_id: data.t_id,
            attempt_no: data.attempt_no
          }
        }).then((studentCourseDetails) => {
          studentCourseDetails = JSON.parse(JSON.stringify(studentCourseDetails));

          let client_payload = [];

          if (
            studentCourseDetails
            && studentCourseDetails.client_data
            && studentCourseDetails.client_data.length
          ) {

            client_payload = studentCourseDetails.client_data;
            client_payload.push(data.client_data);

          } else {

            client_payload = [data.client_data];

          }

          if (
            studentCourseDetails
            && studentCourseDetails.frozen_test_data
          ) { // if frozen data already present

            // finalpayload.c_name = coursename;
            // finalpayload.frozen_test_data
            //   = JSON.parse(JSON.stringify(studentCourseDetails.frozen_test_data));
            // finalpayload =
            //     CryptoJS.AES.encrypt(JSON.stringify(finalpayload), data.user_id).toString();

            student_course.upsert({
              t_status: 1,
              user_id: data.user_id,
              c_id: data.c_id,
              t_id: data.t_id,
              attempt_no: data.attempt_no,
              start_time: new Date(),
              client_data: client_payload
            });

            // resolved(finalpayload);

          } else {

            courses.findOne({
              where: {
                c_id: data.c_id
              },
              include: [
                {
                  model: course_modules,
                  attributes: [
                    'c_marks_data'
                  ]
                }
              ]
            }).then((courseDetails) => {

              if (courseDetails) {

                // coursename = courseDetails.c_name;

                studentCourseDetails = JSON.parse(JSON.stringify(studentCourseDetails));

                tests.findOne({
                  attributes: [
                    'test_rules'
                  ],
                  include: [
                    {
                      model: test_templates
                    }
                  ],
                  where: {
                    t_id: data.t_id
                  }
                }).then((testDetails) => {
                  testDetails = JSON.parse(JSON.stringify(testDetails));
        
                  if (testDetails) {
        
                    const payload = {};
                    payload.t_id = data.t_id;
                    payload.sections = [];
                    if (
                      testDetails.test_templates
                      && testDetails.test_templates
                      && testDetails.test_templates.template_data
                    ) {
                      testDetails.test_templates.template_data
                        = JSON.parse(testDetails.test_templates.template_data);
                      payload.sectionarray = testDetails.test_templates.template_data.sections;
        
                      _.forEach(payload.sectionarray, (each) => {
                        if (_.includes(each.duration, 'mins')) {
                          each.duration = parseInt(each.duration, 10);
                        }
                      });
                    }
        
                    _.forEach(testDetails.test_rules, (eachSection, index) => {
                      const temprule = [];
                      _.forEach(eachSection, (eachRule) => {
                        const temppay = {};
                        temppay.total_questions = eachRule[0].total_questions;
                        temppay.ruleblock_id = eachRule[0].ruleblock_id;
                        temppay.question_type = eachRule[0].question_type;
                        temppay.question_subtype = eachRule[0].question_subtype;
                        temppay.negative_mark = eachRule[0].negative_mark;
                        temppay.mark = eachRule[0].mark_question;
                        temppay.manual_difficulty
                          = (eachRule[0].manual_difficulty && eachRule[0].manual_difficulty.length > 0)
                            ? eachRule[0].manual_difficulty : [];
                        temppay.variableOnly = eachRule[0].variable_only;
                        temppay.variableLimit = eachRule[0].variable_question_limit;
                        temppay.sub_topic = (eachRule[0].sub_topic && eachRule[0].sub_topic.length > 0)
                          ? _.map(eachRule[0].sub_topic, 'sub_topic_id') : [];
                        temppay.subject = (eachRule[0].subject && eachRule[0].subject.length > 0)
                          ? _.map(eachRule[0].subject, 'subject_id') : [];
                        temppay.topic = (eachRule[0].topic && eachRule[0].topic.length > 0)
                          ? _.map(eachRule[0].topic, 'topic_id') : [];
                        temppay.qb_id = _.map(eachRule[0].questionbank, 'qb_id');
                        temprule.push(temppay);
                      });
                      payload.sections.push({
                        sectionName: payload.sectionarray[index].name,
                        rules: temprule
                      });
                    });
        
                    testRepo.validateRules(payload).then((Dynamictest) => {
                      Dynamictest = JSON.parse(JSON.stringify(Dynamictest));
    
                      let error = false;
                      _.forEach(Dynamictest, (eachsec, i) => {
                        const tempresult = eachsec.results;
                        if (tempresult && tempresult.length > 0) {
                          _.forEach(tempresult, (block, j) => {
                            if (block.needed !== block.total) {
                              error = true;
                            }
                          });
                        }
                      });
        
                      if (error) {
        
                        resolved({
                          success: false,
                          message: 'Need question'
                        });
        
                      } else {
        
                        const sectionsList = [];
                        const questionmarks = {};
        
                        _.forEach(Dynamictest, (eachsec, i) => {
                          sectionsList.push({
                            sectionname: eachsec.name,
                            single_question: [],
                            group_question: [],
                          });
                          const tempresult = eachsec.results;
                          if (tempresult && tempresult.length > 0) {
                            sectionsList[i].single_question = [];
                            _.forEach(tempresult, (block, j) => {
                              _.forEach(block.results, (eachq_id) => {
                                questionmarks[eachq_id.q_id] = {};
                                questionmarks[eachq_id.q_id].p_mark
                                  = Number(data.sections[i].rules[j].mark);
                                questionmarks[eachq_id.q_id].n_mark = Number(
                                  data.sections[i].rules[j].negative_mark
                                );
                                questionmarks[eachq_id.q_id].ruleblock_id
                                  = data.sections[i].rules[j].ruleblock_id;
                                sectionsList[i].single_question.push({
                                  q_id: eachq_id.q_id
                                });
                              });
                            });
                          }
                        });
                        courseDetails.questionmarks = questionmarks;
        
                        const section_data = [];
                        const question_data = [];
                        let question_list = [];
                        const group_section = [];
                        for (const q of sectionsList) {
                          const group_list = [];
                          q.single_question.forEach((elem) => question_list.push(elem.q_id));
                          q.group_question.forEach((val) => {
                            const temp_list = [];
                            group_list.push({
                              g_id: val.g_id,
                              q_ids: temp_list
                            });
                            val.subQuestion.forEach((element) => {
                              question_list.push(element.q_id);
                              temp_list.push(element.q_id);
                            });
                          });
                          question_data.push({
                            sectionName: q.sectionname,
                            questionList: question_list.length ? question_list : null,
                          });
                          question_list = [];
                          group_section.push({
                            sectionName: q.sectionname,
                            groupList: group_list
                          });
                        }
        
                        if (payload.sectionarray && payload.sectionarray.length > 0) {
                          _.forEach(payload.sectionarray, (sec) => {
                            section_data.push({
                              name: sec.name,
                              duration: sec.duration,
                              additionalinfo: sec.additionalInformation
                            });
                          });
                        }
        
                        const template_data = {};
                        template_data.sections = section_data.length ? section_data : null;
                        template_data.questions = question_data.length ? question_data : null;
                        template_data.group = group_section.length ? group_section : null;
                        testDetails.test_templates.template_data = JSON.stringify(template_data);

                        frozenDataGenerator(courseDetails, testDetails, data).then(() => {
                          resolved(true);
                        });
        
                      }
                    }).catch((errored) => {
                      console.log(errored);
                      resolved(false);
                    });
        
                  }
        
                }, (failed) => {
                  console.log(failed);
                }).catch((errored) => {
                  console.log(errored);
                });

              } else {
                resolved({
                  success: false,
                  message: 'Validity expired'
                });
              }

            }, (failed) => {
              console.log(failed);
            }).catch((errored) => {
              console.log(errored);
            });

          }

        }, (failed) => {
          console.log(failed);
        }).catch((errored) => {
          console.log(errored);
        });

      } catch (error) {
        console.log('try-catch : ', error);
      }

    });
  }

  // method to generate actual frozen data
  function frozenDataGenerator(courseData, testData, studentData) {
    return new Promise((resolved, rejected) => {

      if (testData && testData.test_templates) {

        const variation = [];
        let tempdata;
        tempdata = JSON.parse(testData.test_templates.template_data);
        let tempgroup;
        tempgroup = tempdata.group;

        let temppayload;
        temppayload = tempdata.sections;
        let promisearray = [];
        promisearray = [];
        const c_data = courseData.course_modules;
        let qrandom = false;
        let orandom = false;

        _.forEach(c_data.c_module_data, (x) => {
          _.forEach(x.c_module_params, (x1) => {
            if (x1.t_id === studentData.t_id) {
              qrandom = x1.randomize_questions;
              orandom = x1.randomize_options;
            }
          });
          _.forEach(x.c_sub_modules, (x2) => {
            _.forEach(x2.sub_module_params, (x3) => {
              if (x3.t_id === studentData.t_id) {
                qrandom = x3.randomize_questions;
                orandom = x3.randomize_options;
              }
            });
          });
        });

        if (qrandom) {
          _.forEach(tempgroup, (x, i) => {
            let groupques = [];
            _.forEach(x.groupList, (y, j) => {
              tempdata.questions[i].questionList =
                _.filter(tempdata.questions[i].questionList, (o) => {
                  return !y.q_ids.includes(o);
                });
              groupques = groupques.concat(y.q_ids);
            });
            tempdata.questions[i].questionList = Utils.shuffle(
              tempdata.questions[i].questionList
            );
            const pos = Utils.getRandomInt(
              tempdata.questions[i].questionList.length
            );
            tempdata.questions[i].questionList
              = tempdata.questions[i].questionList
                .slice(0, pos).concat(groupques)
                .concat(tempdata.questions[i].questionList.slice(pos));
          });
        }

        _.forEach(tempdata.questions, (x, i) => {
          promisearray.push(
            new Promise((secQRes, SecQrej) => {
              questions.findAll({
                attributes: [
                  'q_id',
                  'g_id',
                  'question_type',
                  'question_data',
                  'hint',
                  'question_editor_type',
                  'question_media'
                ],
                where: {
                  q_id: x.questionList
                },
                include: [
                  {
                    model: mcq_questions,
                    attributes: [
                      'options',
                      'variable_questions_config'
                    ],
                  },
                  {
                    model: essay_email_writing_questions,
                    attributes: [
                      'name',
                      'directions',
                      'word_limit',
                      'externalkeyword'
                    ]
                  },
                  {
                    model: group_questions,
                    attributes: [
                      'g_id',
                      'common_content',
                      'question_media'
                    ]
                  },
                  {
                    model: programming_question,
                    attributes: [
                      'input_format',
                      'output_format',
                      'code_constraints',
                      'sample_io',
                      'run_time_limit',
                      'memory_limit',
                      'code_size',
                      'enablecustominput',
                      'multilanguage',
                      'solution'
                    ]
                  },
                  {
                    model: descriptive_answer_writing,
                    attributes: [
                      'word_limit',
                      'name',
                      'directions'
                    ]
                  }
                ]
              }).then((q_res) => {
                q_res = JSON.parse(JSON.stringify(q_res));

                const quesList = [];
                _.forEach(x.questionList, (value, ind) => {
                  const ques = _.cloneDeep(
                    _.find(q_res, { 'q_id': value })
                  );
                  ques.sort_order = x.questionList.indexOf(ques.q_id);
                  ques.marks = courseData.questionmarks[ques.q_id].p_mark;
                  ques.negative_marks = courseData.questionmarks[ques.q_id].n_mark;

                  if (
                    orandom
                    && ques.mcq_questions
                    && ques.mcq_questions.options
                  ) {
                    if (
                      ques.mcq_questions.variable_questions_config
                      && ques.mcq_questions.variable_questions_config.configs
                    ) {
                      const quesVariation
                        = _.find(variation, (val) => {
                          return val[ques.q_id];
                        });
                      let quesFound;
                      if (quesVariation) {
                        quesFound = quesVariation[ques.q_id];
                      } else {
                        quesFound = [];
                      }
                      const arr = Array.apply(null, {
                        length: ques.mcq_questions
                          .variable_questions_config
                          .configs.number_of_variation
                      }).map(Number.call, Number);
                      const genRand = _.difference(arr, quesFound);
                      const randno = Math.floor(
                        Math.random() * (genRand.length - 1)
                      );
                      const optionIndex = genRand[randno];
                      if (quesVariation) {
                        quesFound.push(optionIndex);
                      } else {
                        const keyvalue = {};
                        keyvalue[ques.q_id] = [optionIndex];
                        variation.push(keyvalue);
                      }
                      ques.question_data = ques.mcq_questions
                        .variable_questions_config
                        .options[optionIndex].question_expression;
                      ques.answer_data = ques.mcq_questions
                        .variable_questions_config
                        .options[optionIndex].answer_expression;

                      ques.options = Utils.shuffle(
                        ques.mcq_questions.variable_questions_config
                          .options[optionIndex].options
                      );
                      ques.variable_id = ques.mcq_questions
                        .variable_questions_config
                        .options[optionIndex].variable_id;
                    } else {
                      ques.options = Utils.shuffle(
                        JSON.parse(ques.mcq_questions.options)
                      );
                    }
                  } else {
                    if (ques.mcq_questions) {
                      if (
                        ques.mcq_questions.variable_questions_config
                        && ques.mcq_questions
                          .variable_questions_config.configs
                      ) {
                        const quesVariation
                          = _.find(variation, (val) => {
                            return val[ques.q_id];
                          });
                        let quesFound;
                        if (quesVariation) {
                          quesFound = quesVariation[ques.q_id];
                        } else {
                          quesFound = [];
                        }
                        const arr = Array.apply(null, {
                          length: ques.mcq_questions
                            .variable_questions_config
                            .configs.number_of_variation
                        }).map(Number.call, Number);
                        const genRand = _.difference(arr, quesFound);
                        const randno = Math.floor(
                          Math.random() * (genRand.length - 1)
                        );
                        const optionIndex = genRand[randno];
                        if (quesVariation) {
                          quesFound.push(optionIndex);
                        } else {
                          const keyvalue = {};
                          keyvalue[ques.q_id] = [optionIndex];
                          variation.push(keyvalue);
                        }
                        ques.question_data = ques.mcq_questions
                          .variable_questions_config
                          .options[optionIndex].question_expression;
                        ques.answer_data = ques.mcq_questions
                          .variable_questions_config
                          .options[optionIndex].answer_expression;

                        ques.options = ques.mcq_questions
                          .variable_questions_config
                          .options[optionIndex].options;
                        ques.variable_id = ques.mcq_questions
                          .variable_questions_config
                          .options[optionIndex].variable_id;
                      } else {

                        ques.options = JSON.parse(
                          ques.mcq_questions.options
                        );

                      }
                    }
                  }
                  // delete ques.mcq_questions;
                  quesList.push(ques);
                });

                temppayload[i].questions = quesList;
                let studentpayload;
                studentpayload = [];
                _.forEach(x.questionList, (x1, i1) => {
                  let variable_id = 0;
                  if (quesList && quesList[i1] && quesList[i1].variable_id) {
                    variable_id = quesList[i1].variable_id;
                  }
                  studentpayload.push({
                    user_id: studentData.user_id,
                    c_id: studentData.c_id,
                    t_id: studentData.t_id,
                    q_id: x1,
                    attempt_no: studentData.attempt_no,
                    marks: 0,
                    state: -1,
                    variable_id
                  });
                });
                student_questions.bulkCreate(studentpayload, {
                  ignoreDuplicates: true
                }).then((b_res) => {
                  secQRes(true);
                }).catch((error) => {
                  console.log(error);
                  SecQrej({
                    success: false,
                    message: 'Internal Error1'
                  });
                });
              }).catch((error) => {
                console.log(error);
                SecQrej({
                  success: false,
                  message: 'Not Found'
                });
              });
            }),
          );
        });

        Promise.all(promisearray).then(result => {
          const finalpayload = {};
          finalpayload.c_id = studentData.c_id;
          finalpayload.t_id = studentData.t_id;

          finalpayload.user_id = studentData.user_id;
          let tempgid = '';
          _.forEach(temppayload, (tvalue) => {
            tvalue.questions = _.sortBy(tvalue.questions, 'sort_order');
            _.forEach(tvalue.questions, (qvalue) => {
              if (qvalue.group_questions) {
                if (qvalue.group_questions.g_id &&
                  qvalue.group_questions.g_id === tempgid) {
                  // delete qvalue.group_questions.common_content;
                } else {
                  tempgid = qvalue.group_questions.g_id;
                }
              }
            });
          });
          finalpayload.frozen_test_data = temppayload;
          finalpayload.attempt_no = studentData.attempt_no;
          finalpayload.client_data = studentData.client_data;
          finalpayload.attempt_no = studentData.attempt_no;
          finalpayload.t_status = 1;
          finalpayload.start_time = new Date();

          student_course.upsert(finalpayload).then(async (res2) => {
            delete finalpayload.client_data;
            let pyload;
            pyload = {};
            pyload.c_name = courseData.c_name;
            pyload.frozen_test_data = temppayload;
            // pyload = CryptoJS.AES.encrypt(
            //     JSON.stringify(pyload), data.user_id
            // ).toString();

            resolved(pyload);
          }, (failed) => {
            console.log(failed);
            rejected({
              success: false,
              message: 'Internal Error2'
            });
          }).catch((errored) => {
            console.log(errored);
            rejected({
              success: false,
              message: 'Internal Error2'
            });
          });

        });

      } else {

        rejected({
          success: false,
          message: 'Not Found'
        });

      }

    });
  };
}).listen(3000);
