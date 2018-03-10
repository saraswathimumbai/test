var express = require('express');
var session = require('express-session');
var sql = require('mssql');
var formidable = require('formidable');
var router = express.Router();

var dbConfig = {
	server: '10.205.10.122',
	database: 'TaskTracker',
	//database: 'TaskTrackerDev',
	user: 'sa',
	password: 'pass@123!',
	port: 1433
};

router.get('/', function(req, res, next) {
	var currSession = req.session;
	if(currSession.userId && currSession.userType)
	{
		getMasterList(res, currSession);
	}
	else
	{
		res.redirect("/");
	}
});

router.get('/gettasklist', function(req, res, next) {
	getTaskList(req, res);
});

router.get('/gettasklistcount', function(req, res, next) {
	getTasklistCount(res);
});

router.post('/start', function(req, res) {
	var jsonData;
	var form = new formidable.IncomingForm();
	form.parse(req);
	form.on('field', function(name, field){
		jsonData = JSON.parse(field);
    });
	form.on('error', function(err) {
        console.log('Post /report/start | Error :' + err);
        res.send({status : "failed"});
    });
	form.on('end', function() {
		//startTask(res, jsonData.userid, jsonData.projectid, jsonData.systemId, jsonData.mediaTypeId, jsonData.taskId, jsonData.workTypeId, 
		//	jsonData.totalTitleCount, jsonData.stateId, jsonData.trasctionDate);
		console.log("jsonData.subSystemList :: ")
		console.log(jsonData.subSystemList)
		startTask(res, jsonData.userid, jsonData.projectid, jsonData.systemId, jsonData.subSystemList, jsonData.mediaTypeId, jsonData.taskId, jsonData.workTypeId, 
			0, jsonData.stateId, jsonData.trasctionDate);
		//startTask(res, jsonData.userid, jsonData.projectid, jsonData.systemId, jsonData.mediaTypeId, jsonData.taskId, jsonData.workTypeId, 
		//jsonData.stateId, jsonData.trasctionDate);
    });
});

function startTask(res, userid, projectid, systemId, subSystemList, mediaTypeId, taskId, workTypeId, totalTitleCount, stateId, time)
//function startTask(res, userid, projectid, systemId, mediaTypeId, taskId, workTypeId, stateId, time)
{
	sql.connect(dbConfig, err1 => {
		if(err1)
		{
			console.log("Problem in connecting to DB. " + err1);
			sql.close();
		}
		else
		{
			//Using stored procedure
			var request = new sql.Request()
			.input('userid', sql.Int, parseInt(userid,10))
			.input('projectid', sql.Int, parseInt(projectid,10))
			.input('systemId', sql.Int, parseInt(systemId,10))
			.input('mediaTypeId', sql.Int, parseInt(mediaTypeId,10))
			.input('taskId', sql.Int, parseInt(taskId,10))
			.input('workTypeId', sql.Int, parseInt(workTypeId,10))
			.input('totalTitleCount', sql.Int, parseInt(totalTitleCount,10))
			.input('stateId', sql.Int, parseInt(stateId,10))
			.input('trasctionDate', sql.BigInt, time)
			.input('subSystem', sql.VarChar(500), subSystemList)
			.execute('dbo.StartTask', (err2, result) => {
				if(err2)
				{
					console.log("Problem while executing the stored procedure. " + err2);
					//Need to send this info to FE
					sql.close();
					res.send({status : "failed"});
				}
				else
				{
					//console.dir(result);
					//console.log(result.recordset[0].parentTaskdid);
					sql.close();
					res.send({status : "success", "parentTaskdid" : result.recordset[0].parentTaskdid});
				}
			})
		}
	});
}

router.post('/complete', function(req, res) {
	var jsonData;
	var form = new formidable.IncomingForm();
	form.parse(req);
	form.on('field', function(name, field){
		//console.log("data:")
		//console.log(field)
		jsonData = JSON.parse(field);
    });
	form.on('error', function(err) {
        console.log('Post /report/complete | Error :' + err);
        res.send({status : "failed"});
    });
	form.on('end', function() {
		console.log("report.js |  jsonData.comment : " + jsonData.comment)
		completeTask(res, jsonData.userid, jsonData.projectid, jsonData.systemId, jsonData.subSystemList, jsonData.mediaTypeId, jsonData.taskId, jsonData.workTypeId, 
		jsonData.totalTitleCount, jsonData.comment, jsonData.stateId, jsonData.trasctionDate, jsonData.parentTaskdid);
	});
});

function completeTask(res, userid, projectid, systemId, subSystemList, mediaTypeId, taskId, workTypeId, totalTitleCount, comment, stateId, time, parentTaskdid)
{
	console.log("report.js |  completeTask() | comment : " + comment)
	sql.connect(dbConfig, err1 => {
		if(err1)
		{
			console.log("Problem in connecting to DB. " + err1);
			sql.close();
		}
		else
		{
			var query = "insert into taskDetails ( userid , projectid, systemId, subSystem, mediaTypeId, taskId, workTypeId, totalTitleCount, comment, stateId, trasctionDate, parentTaskdid) VALUES (" + userid + ", " + projectid + ", " + systemId + ", '" + subSystemList + "', " + mediaTypeId + ", " + taskId +  ", " + workTypeId + ", " + totalTitleCount + ", '" + comment + "', " + stateId + ", " + time + ", " + parentTaskdid + ");";
			console.log("report.js |  query : " + query);
			new sql.Request().query(query, (err2) => {
				if(err2)
				{
					console.log("Problem while quering the DB. " + err2);
					//Need to send this info to FE
					sql.close();
					res.send({status : "failed"});
				}
				else
				{
					sql.close();
					res.send({status : "success"});
				}
			});
		}
	});
}

router.post('/pause', function(req, res) {
	var jsonData;
	var form = new formidable.IncomingForm();
	form.parse(req);
	form.on('field', function(name, field){
		jsonData = JSON.parse(field);
    });
	form.on('error', function(err) {
        console.log('Post /report/parse | Error :' + err);
        res.send({status : "failed"});
    });
	form.on('end', function() {
		//pauseTask(res, jsonData.userid, jsonData.projectid, jsonData.systemId, jsonData.mediaTypeId, jsonData.taskId, jsonData.workTypeId, 
		//	jsonData.totalTitleCount, jsonData.stateId, jsonData.trasctionDate, jsonData.parentTaskdid);
		pauseTask(res, jsonData.userid, jsonData.projectid, jsonData.systemId, jsonData.subSystemList, jsonData.mediaTypeId, jsonData.taskId, jsonData.workTypeId, 
			jsonData.stateId, jsonData.trasctionDate, jsonData.parentTaskdid);
	});
});

//function pauseTask(res, userid, projectid, systemId, mediaTypeId, taskId, workTypeId, totalTitleCount, stateId, time, parentTaskdid)
function pauseTask(res, userid, projectid, systemId, subSystemList, mediaTypeId, taskId, workTypeId, stateId, time, parentTaskdid)
{
	console.log("In pause")
	sql.connect(dbConfig, err1 => {
		if(err1)
		{
			console.log("Problem in connecting to DB. " + err1);
			sql.close();
		}
		else
		{
			//var query = 'insert into taskDetails ( userid , projectid, systemId, mediaTypeId, taskId, workTypeId, totalTitleCount, stateId, trasctionDate, parentTaskdid) VALUES (' + userid + ', ' + projectid + ', ' + systemId + ', ' + mediaTypeId + ', ' + taskId +  ', ' + workTypeId + ', ' + totalTitleCount + ', ' + stateId + ', ' + time + ', ' + parentTaskdid + ');';
			var query = "insert into taskDetails ( userid , projectid, systemId, subSystem, mediaTypeId, taskId, workTypeId, stateId, trasctionDate, parentTaskdid) VALUES (" + userid + ", " + projectid + ", " + systemId + ", '" +  subSystemList + "' , " +  mediaTypeId + ", " + taskId +  ", " + workTypeId + ", " +  stateId + ", " + time + ", " + parentTaskdid + ");";
			console.log(query);
			new sql.Request().query(query, (err2) => {
				if(err2)
				{
					console.log("Problem while quering the DB. " + err2);
					//Need to send this info to FE
					sql.close();
					res.send({status : "failed"});
				}
				else
				{
					sql.close();
					res.send({status : "success"});
				}
			});
		}
	});
}

router.post('/resume', function(req, res) {
	var jsonData;
	var form = new formidable.IncomingForm();
	form.parse(req);
	form.on('field', function(name, field){
		jsonData = JSON.parse(field);
    });
	form.on('error', function(err) {
        console.log('Post /report/resume | Error :' + err);
        res.send({status : "failed"});
    });
	form.on('end', function() {
		//resumeTask(res, jsonData.userid, jsonData.projectid, jsonData.systemId, jsonData.mediaTypeId, jsonData.taskId, jsonData.workTypeId, 
		//	jsonData.totalTitleCount, jsonData.stateId, jsonData.trasctionDate, jsonData.parentTaskdid);
		resumeTask(res, jsonData.userid, jsonData.projectid, jsonData.systemId, jsonData.subSystemList, jsonData.mediaTypeId, jsonData.taskId, jsonData.workTypeId, 
			jsonData.stateId, jsonData.trasctionDate, jsonData.parentTaskdid);
	});
});

//function resumeTask(res, userid, projectid, systemId, mediaTypeId, taskId, workTypeId, totalTitleCount, stateId, time, parentTaskdid)
function resumeTask(res, userid, projectid, systemId, subSystemList, mediaTypeId, taskId, workTypeId, stateId, time, parentTaskdid)
{
	sql.connect(dbConfig, err1 => {
		if(err1)
		{
			console.log("Problem in connecting to DB. " + err1);
			sql.close();
		}
		else
		{
			//var query = 'insert into taskDetails ( userid , projectid, systemId, mediaTypeId, taskId, workTypeId, totalTitleCount, stateId, trasctionDate, parentTaskdid) VALUES (' + userid + ', ' + projectid + ', ' + systemId + ', ' + mediaTypeId + ', ' + taskId +  ', ' + workTypeId + ', ' + totalTitleCount + ', ' + stateId + ', ' + time + ', ' + parentTaskdid + ');';
			var query = "insert into taskDetails ( userid , projectid, systemId, subSystem, mediaTypeId, taskId, workTypeId, stateId, trasctionDate, parentTaskdid) VALUES (" + userid + ", " + projectid + ", " + systemId + ", '" + subSystemList + "', " +  mediaTypeId + ", " + taskId +  ", " + workTypeId + ", " + stateId + ", " + time + ", " + parentTaskdid + ");";
			new sql.Request().query(query, (err2) => {
				if(err2)
				{
					console.log("Problem while quering the DB. " + err2);
					//Need to send this info to FE
					sql.close();
					res.send({status : "failed"});
				}
				else
				{
					sql.close();
					res.send({status : "success"});
				}
			});
		}
	});
}

function getMasterList(res, currSession)
{
	sql.connect(dbConfig, err1 => {
		if(err1)
		{
			console.log("Problem in connecting to DB. " + err1);
			sql.close();
		}
		else
		{
			new sql.Request().query('select * from TaskListMaster', (err2, taskMasterList) => {
				if(err2)
				{
					console.log("Problem while quering the DB. " + err2);
					//Need to send this info to FE
					sql.close();
				}
				else
				{
					//console.log("taskMasterList::");
					//console.log(JSON.stringify(taskMasterList));
					new sql.Request().query('select * from Projects', (err3, projectList) => {
						if(err3)
						{
							console.log("Problem while quering the DB. " + err3);
							//Need to send this info to FE
							sql.close();
						}
						else
						{
							//console.log("projectList::");
							//console.log(JSON.stringify(projectList));
							new sql.Request().query('select * from TaskStateMaster', (err4, stateList) => {
								if(err4)
								{
									console.log("Problem while quering the DB. " + err4);
									//Need to send this info to FE
									sql.close();
								}
								else
								{
									new sql.Request().query('select * from Systems', (err5, systemList) => {
										if(err5)
										{
											console.log("Problem while quering the DB. " + err5);
											//Need to send this info to FE
											sql.close();
										}
										else
										{
											new sql.Request().query('select * from MediaType', (err6, MediaTypeList) => {
												if(err6)
												{
													console.log("Problem while quering the DB. " + err6);
													//Need to send this info to FE
													sql.close();
												}
												else
												{
													new sql.Request().query('select * from WorkType', (err7, WorkTypeList) => {
														if(err7)
														{
															console.log("Problem while quering the DB. " + err7);
															//Need to send this info to FE
															sql.close();
														}
														else
														{
															var employeeList = 
															{"recordsets":[[{},	{},	{}]],
															
																"recordset":[
																	{"employeeId":10581, "name":"Pooja Arya"},
																	{"employeeId":10620, "name":"Pooja Saini"},
																	{"employeeId":10622, "name":"Kiran Pillai"},
																	{"employeeId":10625, "name":"Vinay Nadkarni"},
																	{"employeeId":10425, "name":"Pravin Sah"},
																	{"employeeId":10258, "name":"Sonal Saraf"},
																	{"employeeId":10256, "name":"Akshita Fulwani"},
																	{"employeeId":10071, "name":"Allan Pereira"},
																	{"employeeId":10244, "name":"Ekta Patel"},
																	{"employeeId":10072, "name":"V.G.Harish"},
																	{"employeeId":10585, "name":"Trushita Redij"},
																	{"employeeId":10579, "name":"Anubha Barhate"},
																	//{"employeeId":10578, "name":"Daisy Fernandes"},
																	{"employeeId":10324, "name":"Deepti Parulekar"},
																	{"employeeId":10595, "name":"Dhruvika Joshi"},
																	{"employeeId":10559, "name":"Madhuri Chhatbar"},
																	{"employeeId":10594, "name":"Nishma Shaikh"},
																	{"employeeId":10610, "name":"Omkar Mhatre"},
																	{"employeeId":10611, "name":"Roshan Arunan"},
																	{"employeeId":10589, "name":"Siddhesh Palav"},
																	{"employeeId":10584, "name":"Silvia Pereira"},
																	{"employeeId":10609, "name":"Swati Shetty"},
																	{"employeeId":10592, "name":"Valentina D abreo"},
																	{"employeeId":10058, "name":"Krishnan V.R"},
																	{"employeeId":10335, "name":"Nalini Sanap"}
															],
															"output":{},"rowsAffected":[3]};

															var normalUsers = 
															{"recordsets":[[{},	{},	{}]],
															//"recordset":[10579, 10578, 10595, 10559, 10594,10610,10581, 10611,10589, 10584,10609,10585,10592],
															"recordset":[10579, 10595, 10559, 10594,10610,10581, 10611,10589, 10584,10609,10585,10592],
															"output":{},"rowsAffected":[3]}
															
															var subSystems = 
															{"recordsets":[[{},	{},	{}]],
																"recordset":[
																	{"id":1, "name":"i4000---dcms"},
																	{"id":2, "name":"i4500---dcms"},
																	{"id":3, "name":"i5000---dcms"},
																	{"id":4, "name":"i8000---dcms"},
																	{"id":5, "name":"AVANT---dcms"},
																	{"id":6, "name":"DMPES---dcms"},
																	{"id":7, "name":"EFX"},
																	{"id":8, "name":"EX2"},
																	{"id":9, "name":"EX3"},
																	{"id":10, "name":"EXK"},
																	{"id":11, "name":"EXW"},
																	{"id":12, "name":"EFX_001"},
																	{"id":13, "name":"EFX_002"},
																	{"id":14, "name":"EFX QT"},
																	{"id":15, "name":"EX3 P6"},
																	{"id":16, "name":"eX2 Android QT"},
																	{"id":17, "name":"eX2 eX3 Android"},
																	{"id":18, "name":"eX2 Presidential_B777"},
																	{"id":19, "name":"eX2 eFX Hybrid"},
																	{"id":20, "name":"eX2 2nd Config"},
																	{"id":21, "name":"EX2-QT KLM-CMU"},
																	{"id":22, "name":"eX2 UX_eXcite_0001"},
																	{"id":23, "name":"eX3 B787-8"},
																	{"id":24, "name":"eX3 eXLite"},
																	{"id":25, "name":"eXW UX A330 / eXW UX B737"},
																	{"id":26, "name":"Presidential eX3 789"},
																	{"id":27, "name":"Presidential B747 2/B747-2 Old SW"},
																	{"id":28, "name":"ex2 BEST"},
																	{"id":29, "name":"ex2 305"},
																	{"id":30, "name":"S3Ki"},
																	{"id":31, "name":"EX2-QT KLM-NG"},
																	{"id":32, "name":"A330"},
																	{"id":33, "name":"A319"},
																	{"id":34, "name":"EX2 Android"}
																	],
															"output":{},"rowsAffected":[3]}

															sql.close();
															res.render('report', 
																{
																	"taskMasterList" : taskMasterList,
																	"projectList" : projectList,
																	"stateList" : stateList,
																	"systemList" : systemList,
																	"subSystems" : subSystems,
																	"MediaTypeList" : MediaTypeList,
																	"WorkTypeList" : WorkTypeList,
																	"currSession" : currSession,
																	"employeeList" : employeeList,
																	"normalUsers" : normalUsers
																});
														}
													})
												}
											})
										}
									})
								}
							})				
						}
					})
				}
			})
		}
	})
	sql.on('error', err => {
		console.log(err);
	})
}

function getTaskList(req, res) {
	var currSession;
	var sqlQuery = "";
	currSession = req.session;
	if(currSession.userType == "Manager")
	{
		sqlQuery = "select * from taskDetails";
	}
	else
	{
		sqlQuery = "select * from taskDetails where userid = " + currSession.userId;
	}
	console.log("sqlQuery : ");
	console.log(sqlQuery);
	sql.connect(dbConfig, err1 => {
		if(err1)
		{
			console.log("Problem in connecting to DB. " + err1);
			sql.close();
		}
		else
		{
			//new sql.Request().query('select * from taskDetails', (err2, taskList) => {
			new sql.Request().query( sqlQuery , (err2, taskList) => {
				if(err2)
				{
					console.log("Problem while quering the DB. " + err2);
					//Need to send this info to FE
					sql.close();
				}
				else
				{
					//console.log(JSON.stringify(taskList));
					sql.close();
					//ORG res.send({"status": "success", "data" : taskList });
					res.send({"status": "success", "data" : taskList.recordset});
				}
			})
		}
	})
	sql.on('error', err => {
		console.log(err);
	})
}

function getTasklistCount(res) {
	sql.connect(dbConfig, err1 => {
		if(err1)
		{
			console.log("Problem in connecting to DB. " + err1);
			sql.close();
		}
		else
		{
			new sql.Request().query('SELECT COUNT(taskdid) AS records FROM taskDetails', (err2, taskListCount) => {
				if(err2)
				{
					console.log("Problem while quering the DB. " + err2);
					//Need to send this info to FE
					sql.close();
				}
				else
				{
					//console.log(JSON.stringify(taskListCount));
					sql.close();
					res.send({"status": "success", "data" : taskListCount});
				}
			})
		}
	})
	sql.on('error', err => {
		console.log(err);
	})
}
module.exports = router;