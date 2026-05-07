var express = require('express');
var router = express.Router();
const {getConnection} = require('../connect');
const oracledb = require('oracledb');
/* 교수페이지 이동 */
router.get('/pro', function(req, res, next) {
  res.render('index', { title: '교수관리' , pageName: "haksa/professors.ejs"});
});
/* 교수데이터 출력 */
router.get('/pro/list.json', async function(req,res){
  //res.send('교수 데이터 출력...');
  let con;
  try{
    con= await getConnection();
    const sql = "select p.*, to_char(hiredate,'YYYY-MM-DD') fdate,to_char(salary,'99,999,999') fsalary from professors p";
    const result = await con.execute(sql,{},{outFormat:oracledb.OUT_FORMAT_OBJECT});
    res.send(result.rows);
  }catch(err){

  }finally{
    if(con) await con.close();
  }
});
/* 교수목록 데이터 */
router.get('/pro/list.json',async function(req,res){
  let con;
  try{
    con = await getConnection();
    const sql ="select * from professors";
    const result = await con.execute(sql,{},{outFormat:oracledb.OUT_FORMAT_OBJECT});h
    res.send(result.rows);
  }
  catch(err){

  }finally{
    if(con) await con.close();
  }
}); 
/* 교수 등록 페이지 이동 */
router.get('/pro/insert',async function(req,res){
  let code;
  let con;
  try{
    con = await getConnection();
    const sql = "select max(pcode)+1 newcode from professors";
    const result = await con.execute(sql);
    code = result.rows[0][0];
  }catch(err){

  }finally{
    if(con) await con.close();
  }
  res.render('index', {title:'교수등록' , pageName:'haksa/professors_insert',code});
});
/*교수 데이터 입력 */
router.post('/pro/insert' , async function(req,res){
  const pcode = req.body.pcode;
  const pname = req.body.pname;
  const dept = req.body.dept;
  const title = req.body.title;
  const hiredate = req.body.hiredate;
  const salary = req.body.salary;
  console.log(pcode,pname,dept,title,hiredate,salary);
  let con;
  try{
    con = await getConnection();
    let sql =`insert into professors(pcode,pname,dept,hiredate,title,salary)`;
    sql += `values('${pcode}','${pname}','${dept}','${hiredate}','${title}',${salary})`;
    await con.execute(sql,{},{autoCommit:true});
  }catch(err){
    console.log(err);
    res.sendStatus(500);
  }finally{
     if(con) await con.close();
  }
  res.sendStatus(200);
});
/*교수 데이터 삭제*/ 
router.post('/pro/delete', async function(req,res){
  const pcode=req.body.pcode;
  let con;
  try{
    con = await getConnection();
    const sql ='delete from professors where pcode=:pcode';
    await con.execute(sql,{pcode},{autoCommit:true});
    res.sendStatus(200);
  }catch(err){
    res.sendStatus(500);
  }finally{
    if(con) await con.close();
  }
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
