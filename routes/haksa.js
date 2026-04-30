var express = require('express');
var router = express.Router();

/* 교수페이지 이동 */
router.get('/pro', function(req, res, next) {
  res.render('index', { title: '교수관리' , pageName: "haksa/professors.ejs"});
});

/* 학생페이지 이동 */
router.get('/stu', function(req, res, next) {
  res.render('index', { title: '학생관리' , pageName: "haksa/students.ejs"});
});

/* 강좌페이지 이동 */
router.get('/cou', function(req, res, next) {
  res.render('index', { title: '강좌관리' , pageName: "haksa/courses.ejs"});
});
module.exports = router;
