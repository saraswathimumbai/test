//TODO proper variable naming, reduce the variable len
var parentTaskdid = 0;
var projectid = 0;
var systemId = 0;
var subSystems = null;
var mediaTypeId = 0;
var taskId = 0;
var workTypeId = 0;
var totalTitleCount = 0;
var userId = 0;
var userRole = "";
var UIState = -1;

var currentSession = {};

//List of task from back-end
var task = new Array();
//List of tasks used for display purpose
var taskList = new Array();
var totalTasks = 0;

//Master list
var projectList = [];
var taskTypeList = [];
var SystemList = [];
var subSystemList = [];
var MediaTypeList = [];
var WorkTypeList = [];
var StateList = [];
var empList = [];
var employeeList = [];
var normalUsers = [];

document.addEventListener('DOMContentLoaded', function(){
	var date = new Date();
	var dateToStr = date.toUTCString().split(' ');
	document.getElementById("user").innerHTML = "Hi " + currentSession.userName + ", Welcome to Task Tracker.";
	document.getElementById("date").innerHTML = "Task Status ( "+ dateToStr[1] + ' ' + dateToStr[2] + ' ' + dateToStr[3] + " )";
	for(var i = 0; i < empList.length; i++)
	{
		employeeList[empList[i].employeeId] = empList[i].name;
	}
	getTasklist();
	if (userRole == "Manager")
	{
		document.getElementById("dashboardTitle").innerHTML = "Summary ( "+ dateToStr[1] + ' ' + dateToStr[2] + ' ' + dateToStr[3] + " )";
		setInterval(getTasklistCount, 10000);
	}
	else
	{
		document.getElementById("dashboardTableHeader").style.display = "none";
		document.getElementById("note").innerHTML = "Note: Multiple Sub-Systems can be selected for the same task. Press the 'Control' key and then select multiple sub-systems.";
	}
	setUIState(1);
}, false);

function stateChange()
{
	var selection = document.getElementById('StateList').value;
	if(selection == 2)
	{
		document.getElementById('totalrecords').disabled = true;
		document.getElementById('SubmitButton').innerHTML = "Pause Task";
		document.getElementById('comments').disabled = true;
	}
	else if(selection == 4)
	{
		document.getElementById('totalrecords').disabled = false;
		document.getElementById('SubmitButton').innerHTML = "Complete Task";
		document.getElementById('comments').disabled = false;
	}
}

function SubmitTask()
{
	var taskState = 0;
	var StateListObj = document.getElementById("StateList");
	//console.log("State ::" + StateListObj.options[StateListObj.selectedIndex].value);
	taskState = parseInt(StateListObj.options[StateListObj.selectedIndex].value,10);
	document.getElementById('SubmitButton').disabled = true;
	if(taskState == 1)
		startTask();
	else if(taskState == 2)
		pauseTask();
	else if(taskState == 3)
		resumeTask();
	else if(taskState == 4)
		completeTask();
}

function addOption(selectbox,text,value )
{
	var optn = document.createElement("OPTION");
	optn.text = text;
	optn.value = value;
	selectbox.options.add(optn);
}

function setUIState(state)
{
	var i;
	var selectbox = document.getElementById("StateList");
	if(selectbox)
	{
		if(state == 1)
		{
			if(UIState == 1) return;
			selectbox.remove(1);
			selectbox.remove(0);
			addOption(selectbox, "Start",1);
			UIState = 1;
		}
		else if(state == 2)
		{
			if(UIState == 2) return;
			addOption(selectbox, "Pause", 2);
			addOption(selectbox, "Complete", 4);
			UIState = 2;
		}
		else if(state == 3)
		{
			if(UIState == 3) return;
			selectbox.remove(1);
			selectbox.remove(0);
			addOption(selectbox, "Resume", 3);
			UIState = 3;
		}
		else if(state == 4)
		{
			if(UIState == 4) return;
			selectbox.remove(0);
			addOption(selectbox, "Complete", 4);
			UIState = 4;
		}
	}
}

function getSelectValues(select)
{
	var result = [];
	var options = select && select.options;
	var opt;
	for (var i=0, iLen=options.length; i<iLen; i++) {
		opt = options[i];
		if (opt.selected) {
			result.push(subSystemList[i].name);
		}
	}
	return result;
}

function startTask()
{
	var list = null;
	var ajaxReq = new XMLHttpRequest();
	var formData = new FormData();
	var ProjectListObj = document.getElementById("ProjectList");
	var taskTypeListObj = document.getElementById("TaskList");
	var SystemListObj = document.getElementById("SystemList");
	var SubSystemListObj = document.getElementById("subSystemList");
	var arr = getSelectValues(SubSystemListObj);
	var MediaTypeListObj = document.getElementById("MediaTypeList");
	var WorkTypeListObj = document.getElementById("WorkTypeList");
	list = arr.join('*');
	console.log(list);
	
	var d = new Date();
	var data =  {
		"userid": userId,
		"projectid": parseInt(ProjectListObj.options[ProjectListObj.selectedIndex].value,10),
		"systemId": parseInt(SystemListObj.options[SystemListObj.selectedIndex].value,10),
		"subSystemList": list,
		"mediaTypeId": parseInt(MediaTypeListObj.options[MediaTypeListObj.selectedIndex].value,10),
		"taskId" : parseInt(taskTypeListObj.options[taskTypeListObj.selectedIndex].value,10),
		"workTypeId" : parseInt(WorkTypeListObj.options[WorkTypeListObj.selectedIndex].value,10),
		"stateId" : 1,
		"trasctionDate" : d.getTime()
	};
	ajaxReq.open('POST', '/report/start', true);
	formData.append('json', JSON.stringify(data));
	ajaxReq.onload = function(e)
	{
		if (ajaxReq.status >= 200 && ajaxReq.status < 300)
		{
			var responseText = JSON.parse(ajaxReq.responseText)

			if (responseText.status == "failed")
			{
				alert("An unexpected error occurred. Please try again later.");
			}
			else if (responseText.status == "success")
			{
				parentTaskdid = parseInt(responseText.parentTaskdid, 10);
				projectid = parseInt(ProjectListObj.options[ProjectListObj.selectedIndex].value, 10);
				systemId = parseInt(SystemListObj.options[SystemListObj.selectedIndex].value, 10);
				subSystems = list;
				mediaTypeId = parseInt(MediaTypeListObj.options[MediaTypeListObj.selectedIndex].value, 10);
				taskId = parseInt(taskTypeListObj.options[taskTypeListObj.selectedIndex].value, 10);
				workTypeId = parseInt(WorkTypeListObj.options[WorkTypeListObj.selectedIndex].value, 10);
				setUIState(2);
				getTasklist();
				alert("The operation was successful. The task is in 'Start' state now.");
			}
		}
		else
		{
			alert("An unexpected error occurred. Please try again later.");
		}
	};
	ajaxReq.send(formData);
}

function pauseTask(){
	if(parentTaskdid == 0)
	{
		alert("The task is not yet started. Please start the task before pausing it.");
		document.getElementById('SubmitButton').disabled = false;
		return;
	}
	var ajaxReq = new XMLHttpRequest();
	var formData = new FormData();
	var d = new Date();
	var data =  {
		"userid": userId,
		"projectid": projectid,
		"systemId": systemId,
		"mediaTypeId": mediaTypeId,
		"subSystemList": subSystems,
		"taskId" : taskId,
		"workTypeId" : workTypeId,
		"stateId" : 2,
		"parentTaskdid" : parentTaskdid,
		"trasctionDate" : d.getTime()
	};
	ajaxReq.open('POST', '/report/pause', true);
	formData.append('json', JSON.stringify(data));
	ajaxReq.onload = function(e)
	{
		if (ajaxReq.status >= 200 && ajaxReq.status < 300)
		{
			var responseText = JSON.parse(ajaxReq.responseText)

			if (responseText.status == "failed")
			{
				alert("An unexpected error occurred. Please try again later.");
			}
			else if (responseText.status == "success")
			{
				setUIState(3);
				getTasklist();
				alert("The operation was successful. The task is in 'Pause' state now.");
			}
		}
		else
		{
			alert("An unexpected error occurred. Please try again later.");
		}
	};
	ajaxReq.send(formData);
}

function resumeTask()
{
	var ajaxReq = new XMLHttpRequest();
	var formData = new FormData();
	if(parentTaskdid == 0)
	{
		alert("The task is not yet started. Please start the task before resuming it.");
		document.getElementById('SubmitButton').disabled = false;
		return;
	}
	var d = new Date();
	var data =  {
		"userid": userId,
		"projectid": projectid,
		"systemId": systemId,
		"mediaTypeId": mediaTypeId,
		"subSystemList": subSystems,
		"taskId" : taskId,
		"workTypeId" : workTypeId,
		"stateId" : 3,
		"parentTaskdid" : parentTaskdid,
		"trasctionDate" : d.getTime()
	};
	ajaxReq.open('POST', '/report/resume', true);
	formData.append('json', JSON.stringify(data));
	ajaxReq.onload = function(e)
	{
		if (ajaxReq.status >= 200 && ajaxReq.status < 300)
		{
			var responseText = JSON.parse(ajaxReq.responseText)
			if (responseText.status == "failed")
			{
				alert("An unexpected error occurred. Please try again later.");
			}
			else if (responseText.status == "success")
			{
				setUIState(2);
				getTasklist();
				alert("The operation was successful. The task is in 'Resume' state now.");
			}
		}
		else
		{
			alert("An unexpected error occurred. Please try again later.");
		}
	};
	ajaxReq.send(formData);
}

function completeTask()
{
	var ajaxReq = new XMLHttpRequest();
	var formData = new FormData();
	if (parentTaskdid == 0)
	{
		alert("The task is not yet started. Please start the task before completing it.")
		document.getElementById('SubmitButton').disabled = false;
		return;
	}
	var totalrecordsObj = document.getElementById("totalrecords");
	if ( (!totalrecordsObj.value) || (totalrecordsObj.value == 0) || isNaN(totalrecordsObj.value))
	{
		alert("Please Enter valid Media Count before proceeding.");
		document.getElementById('SubmitButton').disabled = false;
		return;
	}
	var comment = document.getElementById("comments");
	var d = new Date();
	var data =  {
		"userid": userId,
		"projectid": projectid,
		"systemId": systemId,
		"mediaTypeId": mediaTypeId,
		"taskId" : taskId,
		"subSystemList": subSystems,
		"workTypeId" : workTypeId,
		"totalTitleCount": totalrecordsObj.value,
		"stateId" : 4,
		"parentTaskdid" : parentTaskdid,
		"trasctionDate" : d.getTime(),
		"comment" : comment.value
	};
	ajaxReq.open('POST', '/report/complete', true);
	formData.append('json', JSON.stringify(data));
	ajaxReq.onload = function(e)
	{
		if (ajaxReq.status >= 200 && ajaxReq.status < 300)
		{
			var responseText = JSON.parse(ajaxReq.responseText)
			if (responseText.status == "failed")
			{
				alert("An unexpected error occurred. Please try again later.");
			}
			else if (responseText.status == "success")
			{
				parentTaskdid = 0;
				projectid = 0;
				systemId = 0;
				mediaTypeId = 0;
				taskId = 0;
				workTypeId = 0;
				totalTitleCount = 0;
				subSystems = null;
				userid = 0;
				setUIState(1);
				getTasklist();
				alert("The operation was successful. The task is in 'Complete' state now.");
			}
		}
		else
		{
			alert("An unexpected error occurred. Please try again later.");
		}
	};
	ajaxReq.send(formData);
}

function getTasklist()
{
	var ajaxReq = new XMLHttpRequest();
	var formData = new FormData();
	ajaxReq.open('GET', '/report/gettasklist', true);
	ajaxReq.onload = function(e)
	{
		if (ajaxReq.status >= 200 && ajaxReq.status < 300)
		{
			var responseText = JSON.parse(ajaxReq.responseText)
			if (responseText.status == "failed")
			{
				alert("An Unexpected error encountered. Please try again later.");
			}
			else if (responseText.status == "success")
			{
				massageData(responseText.data);
				if ( userRole == "Manager"){
					analyseData(responseText.data);
				}
			}
		}
		else
		{
			alert("An Unexpected error encountered. Please try again later.");
		}
	};
	ajaxReq.send(formData);
}

function analyseData(data)
{
	//console.log("resourceInTaskList :")
	//console.log(resourceInTaskList)
	//console.log("normalUsers :")
	//console.log(normalUsers)
	//console.log("inactiveUsers :")
	//console.log(inactiveUsers)
	
	var resourceInTaskList = [];
	var resInStartResumeState = [];
	var resInPauseCompleteState = [];
	var inactiveUsers = [];
	var html = '';	
	var date1 = new Date();
	var dateToStr = date1.toUTCString().split(' ');
	var currDate = dateToStr[1] + ' ' + dateToStr[2] + ' ' + dateToStr[3];

	console.log("taskList :")
	console.log(taskList);

	for (var counter = 0; counter < taskList.length; counter++)
	{
		var date2 = new Date(parseInt(taskList[counter].trasctionDate, 10));
		var str = date2.toUTCString().split(' ');
		str = str[1] + ' ' + str[2] + ' ' + str[3];

		// Check if the task is done today
		if (resourceInTaskList.indexOf(taskList[counter].userid) == -1 && str == currDate)
		{
			resourceInTaskList.push(taskList[counter].userid);
		}
		if (taskList[counter].stateId == 1 || taskList[counter].stateId == 3)
		{
			if (resInStartResumeState.indexOf(taskList[counter].userid) == -1 && str == currDate)
			{
				resInStartResumeState.push(taskList[counter]);
			}
		}
		else if(taskList[counter].stateId == 2 || taskList[counter].stateId == 4)
		{
			var userIdExist = false;
			//Check if the userid is already present
			for (var kk = 0; kk < resInPauseCompleteState.length; kk++)
			{
				if (resInPauseCompleteState[kk].userid == taskList[counter].userid)
				{
					userIdExist = true;
					kk = resInPauseCompleteState.length;
				}
			}
			if(!userIdExist)
				resInPauseCompleteState.push(taskList[counter]);
		}
	}
	
	for (var counter = 0; counter < normalUsers.length; counter++)
	{
		if(resourceInTaskList.indexOf(normalUsers[counter]) == -1)
		{
			inactiveUsers.push(normalUsers[counter]);
		}
	}
	
	for (var counter = resInPauseCompleteState.length - 1; counter >= 0 ; counter--)
	{
		for (var i = 0; i < resInStartResumeState.length; i++)
		{
			if(resInPauseCompleteState[counter].userid == resInStartResumeState[i].userid)
			{
				resInPauseCompleteState.splice(counter, 1);
				counter = resInPauseCompleteState.length - 1;
			}
		}
	}
	
	resInPauseCompleteState.sort(function(a, b){
		return a.trasctionDate - b.trasctionDate;
	})
	
	for (var counter = 0; counter < inactiveUsers.length; counter++)
	{
		html +="<tr>";
		html +="<td>"+ employeeList[inactiveUsers[counter]] + "</td>";
		html +="<td></td>";
		html +="<td></td>";
		html +="<td></td>";
		html +="<td></td>";
		html +="<td style='color:red;'>Inactive</td>";
		html +="<td></td>";
		html +="</tr>";
	}
	
	/*
	<th>Employee</th>
	<th>Project</th>
	<th>Task</th>
	<th>Start Time</th>
	<th>End Time</th>
	<th>Status</th>
	<th>Total Time(h/m/s)</th>
	*/

	for (var counter = 0; counter < resInPauseCompleteState.length; counter++)
	{
		html +="<tr>";
		html +="<td>"+ employeeList[resInPauseCompleteState[counter].userid] + "</td>";
		html +="<td>" + projectList[resInPauseCompleteState[counter].projectid - 1].projectname + "</td>";

		html +="<td>" + taskTypeList[resInPauseCompleteState[counter].taskId - 1].taskname + "</td>";
		
		html +="<td>" + resInPauseCompleteState[counter].startTime + "</td>";
		html +="<td>" + resInPauseCompleteState[counter].endTime + "</td>";
		var currDate = new Date();
		html +="<td style='color:brown;'>Idle</td>";
		//html +="<td>" + resInPauseCompleteState[counter].totalTimeTaken + "</td>";
		html +="<td>" + msToHMS( currDate.getTime() - parseInt(resInPauseCompleteState[counter].trasctionDate, 10)) + "</td>";
		html +="</tr>";
	}

	for (var counter = 0; counter < resInStartResumeState.length; counter++)
	{
		html +="<tr>";
		html +="<td>"+ employeeList[resInStartResumeState[counter].userid] + "</td>";
		html +="<td>" + projectList[resInStartResumeState[counter].projectid - 1].projectname + "</td>";

		html +="<td>" + taskTypeList[resInStartResumeState[counter].taskId - 1].taskname + "</td>";
		
		html +="<td>" + resInStartResumeState[counter].startTime + "</td>";
		html +="<td></td>";
		html +="<td style='color:green;'>Active</td>";
		html +="<td>" + resInStartResumeState[counter].totalTimeTaken + "</td>";
		html +="</tr>";
	}
	
	document.getElementById('dashboardTableBody').innerHTML = html;
}

function massageData(data)
{
	task = [];
	//taskList will have last activity in zero element of array ---> first activity in last element of array.
	taskList = [];
	var tempTask = [];
	var parentTaskdidArr = [];
	var endTime = 0;
	var startTime = 0;
	var timeDiff = 0;
	
	totalTasks = 0;
	//console.log("\n data::");
	//console.log(JSON.stringify(data));
	for (var i in data)
	{
		if (!task[data[i].parentTaskdid])
		{
			task[data[i].parentTaskdid] = new Array();
		}
		task[data[i].parentTaskdid].push(data[i]);
		totalTasks++;
		tempTask.push(data[i]);
	}
	//console.log("task::");
	//console.log(JSON.stringify(task));
	//console.log("tempTask::");
	//console.log(JSON.stringify(tempTask));
	tempTask.sort(function(a, b){
		return a.trasctionDate - b.trasctionDate;
	})
	//console.log("SORTED tempTask::");
	//console.log(JSON.stringify(tempTask));

	//taskList will have last activity as zero element ---> first activity as last element.
	for (var counter = tempTask.length - 1; counter >= 0; counter--)
	{
		if ( ( userRole == "Manager") || (( userRole != "Manager" ) && ( tempTask[counter].userid == userId ) ) )
		{
			if(!parentTaskdidArr[tempTask[counter].parentTaskdid])
			{
				parentTaskdidArr[tempTask[counter].parentTaskdid] = 1;
				taskList.push(tempTask[counter]);

				var date = new Date(parseInt(tempTask[counter].trasctionDate, 10));
				var dateToStr = date.toUTCString().split(' ');
				taskList[taskList.length - 1].date = dateToStr[1] + ' ' + dateToStr[2] + ' ' + dateToStr[3];
				
				taskList[taskList.length - 1].timeDiffC = 0;
				var currDate = new Date();
				if(tempTask[counter].stateId == 1)
				{
					taskList[taskList.length - 1].startTime =  date.toLocaleTimeString();
					taskList[taskList.length - 1].endTime = "";
					taskList[taskList.length - 1].totalTimeTaken = msToHMS( currDate.getTime() - parseInt(tempTask[counter].trasctionDate, 10));
					taskList[taskList.length - 1].endTimeC = 0;
				}
				else if(tempTask[counter].stateId == 2)
				{
					taskList[taskList.length - 1].endTime = date.toLocaleTimeString();
					taskList[taskList.length - 1].endTimeC = parseInt(tempTask[counter].trasctionDate, 10);
				}
				else if(tempTask[counter].stateId == 3)
				{
					//taskList[taskList.length - 1].startTime =  date.toLocaleTimeString();
					taskList[taskList.length - 1].endTime = "";
				}
				else if(tempTask[counter].stateId == 4)
				{
					taskList[taskList.length - 1].endTime = date.toLocaleTimeString();
					taskList[taskList.length - 1].endTimeC = parseInt(tempTask[counter].trasctionDate, 10);
				}
			}
			else
			{
				if(tempTask[counter].stateId == 1)
				{
					for(var counter1 = 0; counter1 < taskList.length; counter1++)
					{
						if(taskList[counter1].parentTaskdid == tempTask[counter].parentTaskdid)
						{
							var date = new Date(parseInt(tempTask[counter].trasctionDate, 10));
							taskList[counter1].startTime =  date.toLocaleTimeString();
							taskList[counter1].initTimeC = parseInt(tempTask[counter].trasctionDate, 10);
							taskList[counter1].totalTimeTaken = msToHMS( ( taskList[counter1].endTimeC - taskList[counter1].initTimeC) + taskList[counter1].timeDiffC);
						}
					}
				}
				else if(tempTask[counter].stateId == 2)
				{
					for(var counter1 = 0; counter1 < taskList.length; counter1++)
					{
						if(taskList[counter1].parentTaskdid == tempTask[counter].parentTaskdid)
						{
							taskList[counter1].endTimeC = parseInt(tempTask[counter].trasctionDate, 10);
						}
					}					
				}
				else if(tempTask[counter].stateId == 3)
				{
					for(var counter1 = 0; counter1 < taskList.length; counter1++)
					{
						if(taskList[counter1].parentTaskdid == tempTask[counter].parentTaskdid)
						{
							taskList[counter1].initTimeC = parseInt(tempTask[counter].trasctionDate, 10);
							taskList[counter1].timeDiffC = ( taskList[counter1].endTimeC - taskList[counter1].initTimeC);
							taskList[counter1].totalTimeTaken = msToHMS( taskList[counter1].timeDiffC );
						}
					}
				}
			}
		}
	}
	var html = "";
	//console.log("taskList::");
	//console.log(JSON.stringify(taskList));
	
	//User is Normal user and didn't have any data in the DB. Need to show UI for starting the task.
	if (taskList.length == 0)
	{
		if ( userRole != "Manager" )
		{
			html +="<tr>";
			if (currentSession.userName)
			{
				html +="<td>"+ currentSession.userName + "</td>";
			}
			else
			{
				html +="<td></td>";
			}
			var date = new Date();
			var dateToStr = date.toUTCString().split(' ');
			html +="<td>" + dateToStr[1] + " " + dateToStr[2] + " " + dateToStr[3] + "</td>";
			html +="<td><select id='ProjectList'>"
			for(var i = 0; i < projectList.length; i++)
			{
				html += "<option value='" + projectList[i].projectid + "'>"  + projectList[i].projectname + "</option>";
			}
			html +="</select></td>";
			html +="<td><select id='TaskList'>"
			for(var i = 0; i < taskTypeList.length; i++)
			{
				html += "<option value='" + taskTypeList[i].taskId + "'>"  + taskTypeList[i].taskname + "</option>";
			}
			html +="</select></td>";

			html +="<td><select id='SystemList'>";
			for(var i = 0; i < SystemList.length; i++)
			{
				html += "<option value='" + SystemList[i].systemId + "'>"  + SystemList[i].systemname + "</option>";
			}
			html +="</select></td>";
			
			html +="<td><select id='subSystemList' multiple>";
			for(var i = 0; i < subSystemList.length; i++)
			{
				html += "<option value='" + subSystemList[i].id + "'>"  + subSystemList[i].name + "</option>";
			}
			html +="</select></td>";
			
			html +="<td><select id='MediaTypeList'>"
			for(var i = 0; i < MediaTypeList.length; i++)
			{
				html += "<option value='" + MediaTypeList[i].mediaTypeId  + "'>"  + MediaTypeList[i].mediatype + "</option>";
			}
			html +="</select></td>";
			html +="<td><select id='WorkTypeList'>"
			for(var i = 0; i < WorkTypeList.length; i++)
			{
				html += "<option value='" + WorkTypeList[i].worktypeid  + "'>"  + WorkTypeList[i].worktype + "</option>";
			}		
			html +="</select></td>";
			html +="<td><input type='text' id='totalrecords' name='records' value='' size='10' maxlength='15' disabled /></td>";
			html +="<td><input type='text' id='comments' name='comment' value='' size='10' maxlength='100' disabled /></td>";
			html +="<td></td>";
			html +="<td></td>";
			html +="<td></td>";
			html +="<td><select id='StateList' disabled> <option value='1'>Start</option></select></td>";
			html +="<td><button id='SubmitButton' type='button' onclick='SubmitTask()'>Start Task</button></td>";
			html +="</tr>";
			document.getElementById('tableHtml').innerHTML = html;
			return;
		}
		else
		{
			html +="<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
			document.getElementById('tableHtml').innerHTML = html;
			return;
		}
	}
	
	for (var i = 0; i < taskList.length; i++)
	{
		// If the state is Start, Pause, Resume
		if (StateList[taskList[i].stateId - 1].stateId != 4)
		{
			//If user is Normal user
			if ( userRole != "Manager")
			{
				html +="<tr>";
				if(employeeList[taskList[i].userid])
				{
					html +="<td>"+ employeeList[taskList[i].userid] + "</td>";
				}
				else
				{
					html +="<td>"+ taskList[i].userid + "</td>";
				}
				html +="<td>"+ taskList[i].date + "</td>";
				
				if(projectList[taskList[i].projectid - 1])
					html +="<td>"+ projectList[taskList[i].projectid - 1].projectname + "</td>";
					
				if(taskTypeList[taskList[i].taskId - 1])
					html +="<td>"+ taskTypeList[taskList[i].taskId - 1].taskname + "</td>";
					
				if(SystemList[taskList[i].systemId - 1])
					html +="<td>"+ SystemList[taskList[i].systemId - 1].systemname + "</td>";
					
				if(taskList[i].subSystem)
				{
					html +="<td>";
					var t = taskList[i].subSystem;
					var arr = t.split("*");
					for(var k = 0; k < arr.length; k++)
					{
						html += arr[k] + "<br>";
					}
					html +="</td>";
				}
				else
				{
					html +="<td></td>";
				}

				if(MediaTypeList[taskList[i].mediaTypeId - 1])
					html +="<td>"+ MediaTypeList[taskList[i].mediaTypeId - 1].mediatype+ "</td>";
				if(WorkTypeList[taskList[i].workTypeId - 1])
					html +="<td>"+ WorkTypeList[taskList[i].workTypeId - 1].worktype+ "</td>";
	
				if(taskList[i])
				{
					html +="<td><input type='text' id='totalrecords' name='records' value='' size='10' maxlength='15' disabled/></td>";
					html +="<td><input type='text' id='comments' name='comment' value='' size='10' maxlength='100' disabled /></td>";
					html +="<td>"+ taskList[i].startTime + "</td>";
					html +="<td>"+ taskList[i].endTime + "</td>";
					html +="<td>"+ taskList[i].totalTimeTaken + "</td>";
				}
				if((StateList[taskList[i].stateId - 1].stateId == 1) || (StateList[taskList[i].stateId - 1].stateId == 3))
				{
					html +="<td><select id='StateList' onchange='stateChange()'> <option value='2'>Pause</option> <option value='4'>Complete</option> </select></td>";
				}
				else if(StateList[taskList[i].stateId - 1].stateId == 2)
				{
					html +="<td><select id='StateList' disabled > <option value='3'>Resume</option></select></td>";
				}
				else if(StateList[taskList[i].stateId - 1].stateId == 4)
				{
					html +="<td>Completed</td>";
				}
				if (StateList[taskList[i].stateId - 1].stateId == 1)
				{
					html +="<td><button id='SubmitButton' type='button' onclick='SubmitTask()'>Pause Task</button></td>";
				}
				else if (StateList[taskList[i].stateId - 1].stateId == 2)
				{
					html +="<td><button id='SubmitButton' type='button' onclick='SubmitTask()'>Resume Task</button></td>";
				}
				else if(StateList[taskList[i].stateId - 1].stateId == 3)
				{
					html +="<td><button id='SubmitButton' type='button' onclick='SubmitTask()'>Pause Task</button></td>";
				}
				else
				{
					html +="<td></td>";
				}
				html +="</tr>";
				parentTaskdid = taskList[i].parentTaskdid;
				projectid = taskList[i].projectid;
				systemId = taskList[i].systemId;
				mediaTypeId = taskList[i].mediaTypeId;
				taskId = taskList[i].taskId;
				workTypeId = taskList[i].workTypeId;
				totalTitleCount = taskList[i].totalTitleCount;
			}
			//User is Manager
			else
			{
				html +="<tr>";
				if (employeeList[taskList[i].userid])
				{
					html +="<td>"+ employeeList[taskList[i].userid] + "</td>";
				}
				else
				{
					html +="<td>"+ taskList[i].userid + "</td>";
				}
				
				html +="<td>"+ taskList[i].date + "</td>";
				if (projectList[taskList[i].projectid - 1])
					html +="<td>"+ projectList[taskList[i].projectid - 1].projectname + "</td>";
				if (taskTypeList[taskList[i].taskId - 1])
					html +="<td>"+ taskTypeList[taskList[i].taskId - 1].taskname + "</td>";
					
				if(SystemList[taskList[i].systemId - 1])
					html +="<td>"+ SystemList[taskList[i].systemId - 1].systemname + "</td>";
					
				if(taskList[i].subSystem)
				{
					html +="<td>";
					var t = taskList[i].subSystem;
					var arr = t.split("*");
					for(var k = 0; k < arr.length; k++)
					{
						html += arr[k] + "<br>";
					}
					html +="</td>";
				}
				else
				{
					html +="<td></td>";
				}
					
				if(MediaTypeList[taskList[i].mediaTypeId - 1])
					html +="<td>"+ MediaTypeList[taskList[i].mediaTypeId - 1].mediatype+ "</td>";
				if(WorkTypeList[taskList[i].workTypeId - 1])
					html +="<td>"+ WorkTypeList[taskList[i].workTypeId - 1].worktype+ "</td>";
				if(taskList[i])
				{
					html +="<td>0</td>";
					html +="<td></td>";
					html +="<td>"+ taskList[i].startTime + "</td>";
					html +="<td>"+ taskList[i].endTime + "</td>";
					html +="<td>"+ taskList[i].totalTimeTaken + "</td>";
				}

				if(StateList[taskList[i].stateId - 1].stateId == 1)
				{
					html +="<td>Start</td>";
				}
				else if(StateList[taskList[i].stateId - 1].stateId == 2)
				{
					html +="<td>Pause</td>";
				}
				else if(StateList[taskList[i].stateId - 1].stateId == 3)
				{
					html +="<td>Resume</td>";
				}
				else if(StateList[taskList[i].stateId - 1].stateId == 4)
				{
					html +="<td>Completed</td>";
				}
				html +="<td></td>";
				html +="</tr>";
			}
		}
		// If the state is Complete
		else if((StateList[taskList[i].stateId - 1].stateId == 4) && (i == 0))
		{
			if ( userRole != "Manager")
			{
				html +="<tr>";
				if(employeeList[taskList[i].userid])
				{
					html +="<td>"+ employeeList[taskList[i].userid] + "</td>";
				}
				else
				{
					html +="<td>"+ taskList[i].userid + "</td>";
				}
				var date = new Date();
				var dateToStr = date.toUTCString().split(' ');
				html +="<td>" + dateToStr[1] + " " + dateToStr[2] + " " + dateToStr[3] + "</td>";
				html +="<td><select id='ProjectList'>" 
				for(var k = 0; k < projectList.length; k++)
				{
					html += "<option value='" + projectList[k].projectid + "'>"  + projectList[k].projectname + "</option>";
				}
				html +="</select></td>";
				html +="<td><select id='TaskList'>"
				for(var k = 0; k < taskTypeList.length; k++)
				{
					html += "<option value='" + taskTypeList[k].taskId + "'>"  + taskTypeList[k].taskname + "</option>";
				}
				html +="</select></td>";

				html +="<td><select id='SystemList'>"
				for(var k = 0; k < SystemList.length; k++)
				{
					html += "<option value='" + SystemList[k].systemId + "'>"  + SystemList[k].systemname + "</option>";
				}
				html +="</select></td>";


				html +="<td><select id='subSystemList' multiple>";
				for(var k = 0; k < subSystemList.length; k++)
				{
					html += "<option value='" + subSystemList[k].id + "'>"  + subSystemList[k].name + "</option>";
				}
				html +="</select></td>";


				html +="<td><select id='MediaTypeList'>"
				for(var k = 0; k < MediaTypeList.length; k++)
				{
					html += "<option value='" + MediaTypeList[k].mediaTypeId  + "'>"  + MediaTypeList[k].mediatype + "</option>";
				}
				html +="</select></td>";
				html +="<td><select id='WorkTypeList'>"
				for(var k = 0; k < WorkTypeList.length; k++)
				{
					html += "<option value='" + WorkTypeList[k].worktypeid  + "'>"  + WorkTypeList[k].worktype + "</option>";
				}
				html +="</select></td>";
				html +="<td><input type='text' id='totalrecords' name='records' value='' size='10' maxlength='15' disabled /></td>";
				html +="<td><input type='text' id='comments' name='comment' value='' size='10' maxlength='100' disabled /></td>";
				html +="<td></td>";
				html +="<td></td>";
				html +="<td></td>";
				html +="<td><select id='StateList' disabled > <option value='1'>Start</option></select></td>";
				html +="<td><button id='SubmitButton' type='button' onclick='SubmitTask()'>Start Task</button></td>";
				html +="</tr>";
			}

			if (taskList[i])
			{
				html +="<tr>";
				if(employeeList[taskList[i].userid])
				{
					html +="<td>"+ employeeList[taskList[i].userid] + "</td>";
				}
				else
				{
					html +="<td>"+ taskList[i].userid + "</td>";
				}
				html +="<td>"+ taskList[i].date + "</td>";
				if(projectList[taskList[i].projectid - 1])
					html +="<td>"+ projectList[taskList[i].projectid - 1].projectname + "</td>";
				if(taskTypeList[taskList[i].taskId - 1])
					html +="<td>"+ taskTypeList[taskList[i].taskId - 1].taskname + "</td>";
					
				if(SystemList[taskList[i].systemId - 1])
					html +="<td>"+ SystemList[taskList[i].systemId - 1].systemname + "</td>";
					
				if(taskList[i].subSystem)
				{
					html +="<td>";
					var t = taskList[i].subSystem;
					var arr = t.split("*");
					for(var k = 0; k < arr.length; k++)
					{
						html += arr[k] + "<br>";
					}
					html +="</td>";
				}
				else
				{
					html +="<td></td>";
				}
					
				if(MediaTypeList[taskList[i].mediaTypeId - 1])
					html +="<td>"+ MediaTypeList[taskList[i].mediaTypeId - 1].mediatype+ "</td>";
				if(WorkTypeList[taskList[i].workTypeId - 1])
					html +="<td>"+ WorkTypeList[taskList[i].workTypeId - 1].worktype+ "</td>";
				if(taskList[i])
				{
					html +="<td>"+ taskList[i].totalTitleCount + "</td>";
					if(taskList[i].comment == null)
						html +="<td></td>";
					else
						html +="<td>"+ taskList[i].comment + "</td>";
					html +="<td>"+ taskList[i].startTime + "</td>";
					html +="<td>"+ taskList[i].endTime + "</td>";
					html +="<td>"+ taskList[i].totalTimeTaken + "</td>";
				}
				if(StateList[taskList[i].stateId - 1])
					html +="<td>"+ StateList[taskList[i].stateId - 1].statename + "</td>";
				html +="<td></td>";
				html +="</tr>";
			}
		}
		else
		{
			html +="<tr>";
			if(employeeList[taskList[i].userid])
			{
				html +="<td>"+ employeeList[taskList[i].userid] + "</td>";
			}
			else
			{
				html +="<td>"+ taskList[i].userid + "</td>";
			}
			html +="<td>"+ taskList[i].date + "</td>";
			if(projectList[taskList[i].projectid - 1])
				html +="<td>"+ projectList[taskList[i].projectid - 1].projectname + "</td>";
			if(taskTypeList[taskList[i].taskId - 1])
				html +="<td>"+ taskTypeList[taskList[i].taskId - 1].taskname + "</td>";

			if(SystemList[taskList[i].systemId - 1])
				html +="<td>"+ SystemList[taskList[i].systemId - 1].systemname + "</td>";

			if(taskList[i].subSystem)
			{
				html +="<td>";
				var t = taskList[i].subSystem;
				var arr = t.split("*");
				for(var k = 0; k < arr.length; k++)
				{
					html += arr[k] + "<br>";
				}
				html +="</td>";
			}
			else
			{
				html +="<td></td>";
			}

			if(MediaTypeList[taskList[i].mediaTypeId - 1])
				html +="<td>"+ MediaTypeList[taskList[i].mediaTypeId - 1].mediatype+ "</td>";
			if(WorkTypeList[taskList[i].workTypeId - 1])
				html +="<td>"+ WorkTypeList[taskList[i].workTypeId - 1].worktype+ "</td>";
			if(taskList[i])
			{
				html +="<td>"+ taskList[i].totalTitleCount + "</td>";
				if(taskList[i].comment == null)
					html +="<td></td>";
				else
					html +="<td>"+ taskList[i].comment + "</td>";
				html +="<td>"+ taskList[i].startTime + "</td>";
				html +="<td>"+ taskList[i].endTime + "</td>";
				html +="<td>"+ taskList[i].totalTimeTaken + "</td>";
			}			
			if(StateList[taskList[i].stateId - 1])
				html +="<td>"+ StateList[taskList[i].stateId - 1].statename + "</td>";
			html +="<td></td>";				
			html +="</tr>";
		}
	}
	document.getElementById('tableHtml').innerHTML = html;
}

function getTasklistCount()
{
	var ajaxReq = new XMLHttpRequest();
	var formData = new FormData();
	ajaxReq.open('GET', '/report/gettasklistcount', true);
	ajaxReq.onload = function(e)
	{
		if (ajaxReq.status >= 200 && ajaxReq.status < 300)
		{
			var responseText = JSON.parse(ajaxReq.responseText)
			if (responseText.status == "failed")
			{
				console.log("An unexpected error encountered. Please try again later.");
			}
			else if (responseText.status == "success")
			{
				//console.log("responseText.data.recordset[0].records : " + responseText.data.recordset[0].records);
				var records = parseInt(responseText.data.recordset[0].records, 10);
				if(records != totalTasks)
				{
					//when records of getTasklistCount do not match with local records count.
					getTasklist();
				}
			}
		}
		else
		{
			console.log("An unexpected error encountered. Please try again later.");
		}
	};
	ajaxReq.send(formData);
}

function msToHMS( ms )
{
	var seconds = ms / 1000;
	var hours = parseInt( seconds / 3600 );
	seconds = seconds % 3600;
	var minutes = parseInt( seconds / 60 );
	seconds = parseInt( seconds % 60 );
	return hours+":"+minutes+":"+seconds;
}