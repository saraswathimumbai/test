var express = require('express');
var router = express.Router();

//TODO
//Change all the names to John, Peter, Stalin

var d = [
{
"name": "abc", 
"id" : "11abc11", 
},
{
"name": "hello", 
"id"  : "22hello22", 
},
];
router.get('/', function(req, res, next) {
  res.render('index', { });
});

/*
var c = [
	'apple',
	'ball',
	'cat'
];
var indexArr = [
	0,1,2
];
var m = [
	0,1,2
];
var e = [
	'11apple11',
	'22ball22',
	'33cat33'
];
*/

/*
var c = [
'add few more points to the currently sent email',
'adding few more points to the currently sent email',

'send address',
'send contact information',

'adjourn the case',

'after receiving the buglist',
'after receiving the issue list',
'after receiving the bug list',
'after receiving the issuelist',
'on receiving the buglist',
'on receiving the issuelist',
'on receiving the bug list',
'on receiving the issue list',

'completion of testing',
'finishing the testing',
'after testing the project',
'on testing the project',
'testing of project is done',
'complete the testing',

'after receiving clarification from the customer',
'on receiving clarification from the customer',
'after getting clarification from the customer',

'respond to customer after receiving the design',
'responding to customer after receiving the design',
'reply to customer after receiving the design',
'replying to customer after receiving the design',
'email to customer after receiving the design',
'emailing to customer after receiving the design',

'after receiving the feedback from the customer',
'on receiving the feedback from the customer',
'after receiving the review from the customer',
'on receiving the review from the customer',

'after receiving the graphics',
'on receiving the graphics'
];
var m = [0,0,  1,1,   2,  3,3,3,3,3,3,3,3,	4,4,4,4,4,4,    5,5,5,   6,6,6,6,6,6,  7,7,7,7,  8,8 ];
var e = [
'111add few more points to the currently sent email111',

'111send address111',

'111adjourn the case111',

'111after receiving the buglist111',

'111Completion of testing111',

'111after receiving clarification from the customer111',

'111respond to customer after receiving the design111',

'111after receiving the feedback from the customer111',

'111after receiving the graphics111',
];

var f = [
'22add few more points to the currently sent email22',

'22send address22',

'22adjourn the case22',

'22after receiving the buglist22',

'22Completion of testing22',

'22after receiving clarification from the customer22',

'22respond to customer after receiving the design22',

'22after receiving the feedback from the customer22',

'22after receiving the graphics22',
];
*/

var c = [
//0
'add few more points to the currently sent email',
'adding few more points to the currently sent email',
'add few more points to the sent email',
'adding few more points to the sent email',

//1
'send address',
'send contact information',
'send contact',

//2
'adjourn the case',
'adjourn',

//3
'after receiving the buglist',
'after receiving the issue list',
'receive the bug list',
'receive the issuelist',
'on receiving the buglist',
'on receiving the issuelist',

//4
'Completion of testing',
'finishing the testing',
'after testing the project',
'on testing the project',
'testing of project is done',
'complete the testing',

//5
'after receiving clarification from the customer',
'on receiving clarification from the customer',
'after getting clarification from the customer',

//6
'respond to customer after receiving the design',
'responding to customer after receiving the design',
'reply to customer after receiving the design',
'replying to customer after receiving the design',
'email to customer after receiving the design',
'emailing to customer after receiving the design',

//7
'after receiving the feedback from the customer',
'on receiving the feedback from the customer',

//8
'after receiving the review from the customer',
'on receiving the review from the customer',

//9
'after receiving the graphics',
'on receiving the graphics',

//10
'respond to customer after receiving the files',
'reply to customer after receiving the files',
'email to customer after receiving the files',
'emailing to customer after receiving the files',
'after receiving files from the customer',
'after receiving files from colleague',
'on receiving files from the customer',
'on receiving files from colleague',
'after receive the files',
'receive the files',

//11
'respond to customer after receiving the software',
'responding to customer after receiving the software',
'reply to customer after receiving the software',
'replying to customer after receiving the software',
'email to customer after receiving the software',
'emailing to customer after receiving the software',

//12
'after receiving the information from customer',
'after receiving the information',
'on receiving the information from customer',
'on receiving the information',
'after receiving the information from manager',
'on receiving the information from manager',
'after receiving the information from colleague',
'on receiving the information from colleague',

//13
'Agenda for the meeting',
'Agenda'

//14
,'publishing leave of subordinate'
,'announcing the leave of the subordinate'

//15
,'appraisal form'
,'appraisal'

//16
,'getting review from customer on design'
,'get review from customer on design'
,'to receive review from customer on design'
,'requesting for reviewing the graphics'
,'request for reviewing the graphics'
,'requesting the review of graphics'
,'request the review of graphics'
,'to ask the review of graphics'
,'asking the review of graphics'

//17
,'asking review from customer on software'
,'getting review from customer on software'
,'get review from customer on software'
,'to receive review from customer on software'
,'to ask review from customer on software'
,'request customer to review the software'

//18
,'asking the status of the issue'
,'requesting the status of the issue'
,'request the status of the issue'

//19
,'asking the status of the project'
,'requesting the status of the project'
,'request the status of the project'

//20
,'assign the issue list to resource'
,'assign the bugs to resource'
,'assigning the issue list to resource'
,'assigning the bugs to resource'
,'delegate the issue list to resource'
,'delegate the bugs to resource'

//21
,'assign the work to the resource'
,'delegate the work to the resource'
,'assign the task to the resource'
,'delegate the task to the resource'
,'assigning the action item to the resource'
,'assign the action item to the resource'
,'delegate the action item to the resource'
,'delegating the action item to the resource'
,'delegate the action item to the resource'

//22
,'assigning the testing to resource'
,'assigning the testing to person'
,'assign the testing to resource'
,'assign the testing to person'

//23
,'authorisation letter'

//24
,'new born baby'

//25
,'new employee'

//26
,'new Year'
,'happy new Year'

//27
,'bank detail'
,'account detail'
,'bank account'

//28
,'birthday wishes'

//29
,'bounce back of cheque'
,'bounce of cheque'
,'bounceback of cheque'

//30
,'need time to respond to the query from the customer'
,'need time to get back to the query from the customer'
,'need time to reply to the query from the customer'
,'get time to respond to the query from the customer'
,'get time to get back to the query from the customer'
,'get time to reply to the query from the customer'
,'getting time to respond to the query from the customer'
,'getting time to get back to the queries from the customer'
,'getting time to reply to the query from the customer'
,'buy time to respond to the query from the customer'
,'buy time to get back to the query from the customer'
,'buy time to reply to the query from the customer'

];

var m = [
0,0,0,0,  1,1,1,    2,2,  3,3,3,3,3,3,  4,4,4,4,4,4,  5,5,5,  6,6,6,6,6,6,  7,7,  8,8,  9,9,
10,10,10,10,10,10,10,10,10,10,   11,11,11,11,11,11,  12,12,12,12,12,12,12,12,  13,13,  14,14,    15,15,
16,16,16,16,16,16,16,16,16,   17,17,17,17,17,17,   18,18,18,     19,19,19,     20,20,20,20,20,20,
21,21,21,21,21,21,21,21,21,		22,22,22,22,		23,		24,		25,		26,26,		27,27,27,		28,		29,29,29,
30,30,30,30,30,30,30,30,30,30,30,30,		
		];
var e = [

//0
'Hi Kaushik,\n	I would like to add one more point to the below e-mail.\n\nPlease send the new document.\nRegards,\nRahul\n',

'Dear Sir,\n     Please find the address below.\n\nMrs.Krishnakanth\n156, Hawraw Street,\nJamshedpur\nTel: 034-56735373\nMob: 987654321\nRegards\nJameel\n',

//2
'Dt: 22nd September, 2010\n\nFrom\nFarook Shah\n\nTo\nThe Income Tax Officer,\nWard No.10 (10)\nCalcutta\n\nSub: My Pan No: YUYUYU5656 - Assessment Year 2012-13 \n\n   This has reference to your notice U.s 145(3) of the Income Tax Act, 1961 dt.5/08/2013 in respect of Assessment Year 2012-13 asking me to appear on 4/09/2013.  As this notice is received by me today, I hereby request you to kindly adjourn the case and give another date after 10 to 15 days since I am not in Calcutta now.\n\nPlease do the needful.\n\nThanking you,\n\nYours faithfully,\nFarook Shah',

'Hi Kaushik,\n\n	Thanks for the bug list. I will review the list and update you the status by the end of this month.\n\nThanks and Regards,\nKhushiyal.',

//4
'Hi Sakshi,\n\n	I have tested the easy email  project version 1.7. Please find the bug report.\n\nRegards,\nSanjay',

'Hi Hemanth Jain,\n\n	Thanks for the clarification.\n\nRegards,\nTrisha Motwani.',

//6
'Hi Kaushik,\n\n	Thank you for the easy email gui design.\n\nHave a nice day!!!\n\nRegards,\nKhushiyal',

'Hi Hemanth Jain,\n\n	Thanks for providing the feedback. We will send you the new screens by 10th June.\n\nRegards,\nTrisha Motwani.',

//8
'Hi Trisha,\n\n	Thanks for reviewing the screen. We will make the required changes.\n\nRegards,\nTrisha Motwani.',

'Hi Bhatia,\n\n	Thanks for the graphics.\nWe will update you if there are any issues.\n\nWith Regards,\nCarlose', 

//10
'Hi Nandlal,\n\nThank you for the easy email documents.\nWe will update you if there are any issues.\nHave a nice day.\n\nRegards,\nSakshi',

'Hi Kaushik,\n\nThank you for the easy email software.\nHave a nice day ahead!\n\nRegards,\nKhushiyal',

//12
'Hello Karuna,\n\nThanks for the easy email project information. We will get back to you in case of any query.\n\nWith Regards,\nNatarajan',

'Hi,\n\nPlease find the agenda for the meeting.\n\nDate: Wed Jan 5th\n09:00 am\ntask 1\n\n1:00pm-2:00pm\ntask 2\n\n2:00pm-5:00pm\n\nThanks,\nShyamala',

//14
'Hi,\n\n	Suresh is on leave today.\n\nRegards\nSharma',

'Hi,\n\n   Please find attached the appraisal form.\n\nRegards,Damodar',

//16
'Hi Amit Bangrae,\n\n	I have attached the screens of easy email project in this e-mail. Please review and provide the feedback.\n\nThanks\nShyamala',

'Hello Hemanth Jain,\n\n	Please review the following screens/modules in the software\n\n  List of screens/modules\n  1. Item 1\n  2. Item 2\n\nThanks\nRamu',

//18
'Hi Kaushik,\n\n	Please send the status of the issues in easy email project.\n\nThank you,\nSakshi.',

'Hi Kaushik,\n\n	Please send the status of the easy email project.\n\nThank you,\nSakshi.',

//20
'Hello Khushiyal,\n\n	Please find the attached issue list. We need to close the issues by the end of this month.\n\nThanks & Regards,\nKaushik',

'Hi Karuna,\n\n	Please complete the documentaion of easy email project and send it to Ada systems.\n\nRegards\nPrakash Jain',

//22
'Hi Damodar,\n\n   Please test the easy email project and send the bug report by 10th Jan 2012.\n\nThanks & Regards,\nCarlose',

//23
'From,										Mumbai\nWinston\nOrissa\n\nTo,\n\n<address>\n\nSubject: Authorization of Mr. Komal shah for receiving the letters.\n\nDear Sir,\n\n         I authorize Mr. Komal shah for receiving the letters on my name.\n\nThanking You\n\nYours faithfully\n<e-mail sender>',

//24
'Dear Brown,\n\nKamesh and Trisha were gifted with a baby girl yesterday evening at 3:00. The Mom and the baby are in a good condition.\n\nTake care,\nLal Advaani',

//25
'Hi All,\n\nTrisha has joined us in the accounts department as senior accountant. Please welcome her. Her e-mail address is trisha@easyemail.co.in\n\nWith Regards,\nKaruna',

//26
'Dear sir,\n\nWish you all a very Happy & fabulous New Year - 2013 filled with Good health & prosperity.\nThanks and regards,\nKaushik',

//27
'Dear Sir,\n\nMy bank account details are given below.\n\nNAME     BHASKAR\n\nBANK     STATE BANK OF INDIA\n\nA/C NO   987654321987654321\n\nREGARDS,\n\nAMALA',

//28
'Hi,\n\n       Wish you a Very Happy Birthday. Many Many Happy returns of the day.\n\nRegards\nHazeena Begaum',

//29
'TO\nM/s Easy email software\n\nKind Attention:   Mr. Nambiar\n               Managing Director.\n\nDear Sir,\n        Ref: Your Cheque No.987654 of Govinda bank dt. 05 / 02 / 2012,	for Rs.1,23,456 / - drawn in our Favour.\n           With reference to the above, we wish to inform you that the\nabove cheque was returned by your bankers for paucity of fund. Kindly Co operate, and release our payment.\nPlease acknowledge receipt of this letter.\n\nyours respectfully,\nTough mail',

//30
'Hi Abilash\n\n	We shall get back to you by end of this week.\n\nRegards\nVrishab',

];

var f = [

//0
'Hi {customer},\n\n	I would like to add one more point to the below e-mail.\n\n{additional_information}\n\nRegards,\n{e-mail sender}',

'Dear {receiver name},\n     Please find the address below.\n\n156, Hawraw Street,\nJamshedpur\nTel: 034-56735373\nMob: 987654321\n\nRegards\n{e-mail sender}',

//2
'Dt: {Date}\n\nFrom\n{e-mail sender}\n\nTo\n{e-mail receiver}\n\nSub: My PAN No: {PAN No.} -	{Assessment Year}\n\n     This has reference to your notice U.s 145(3) of the Income Tax Act, 1961 dt.5/08/2013 in respect of Assessment Year 2012-13 asking me to appear on 4/09/2013.  As this notice is received by me today, I hereby request you to kindly adjourn the case and give another date after 10 to 15 days since I am not in Calcutta now.\n\nPlease do the needful.\n\nThanking you,\n\nYours faithfully,\n{e-mail sender}',

'Hi {email receiver},\n\n	Thanks for the bug list. I will review the list and update you the status by the end of this month.\n\nThanks and Regards,\n{e-mail sender}',

//4
'Hi {email receiver},\n\n	I have tested the {project name} {version number}. Please find the bug report.\n\nRegards,\n{e-mail sender}',

'Hi {email receiver},\n\n	Thanks for the clarification.\n\nRegards,\n{e-mail sender}',

//6
'Hi {email receiver},\n\n	Thank you for the <project name> design.\n\nHave a nice day!!!\n\nRegards,\n{e-mail sender}',

'Hi {email receiver},\n\n	Thanks for providing the feedback. We will send you the modified screens by {date}.\n\nRegards,\n{e-mail sender}',

//8
'Hi {email receiver},\n\n	Thanks for reviewing the screen. We will make the required changes.\n\nRegards,\n{e-mail sender}',

'Hi {email receiver},\n\n	Thanks for the graphics.\nWe will update you if there are any issues.\n\nWith Regards,\n{e-mail sender}',

//10
'Hi {email receiver},\n\nThank you for the {file name}.\nWe will update you if there are any issues.\nHave a nice day.\n\nRegards,\n{e-mail sender}',

'Hi {email receiver},\n\nThank you for the {software name}.\nHave a nice day ahead!\n\nRegards,\n{e-mail sender}',

//12
'Hi {email receiver},\n\nThanks for the {project name} information. We will get back to you in case of any query.\n\nWith Regards,\n{e-mail sender}',

'Hi {email receiver},\n\nPlease find the agenda for the meeting below.\n\n- task 1.\n- task 2.\n- task 3.\n\nThanks,\n{e-mail sender}',

//14
'Hi,\n\n	Suresh is on leave today.\n\nRegards\n<e-mail sender>',

'Hi,\n\n   Please find attached the appraisal form.\n\nRegards,\n<e-mail sender>',

//16
'Hi Amit Bangrae,\n\n	I have attached the screens of <project name> in this e-mail. Please review and provide the feedback.\n\nThanks\n<e-mail sender>',

'Hello Hemanth Jain,\n\n	Please review the following screens/modules in the software.\n\n  List of screens/modules\n  1. Item 1\n  2. Item 2\n\nThanks\n<e-mail sender>',

//18
'Hi Kaushik,\n\n	Please send the status of the issues in <project name>.\n\nThank you,\n<e-mail sender>',

'Hi Kaushik,\n\n	Please send the status of the <project name>.\n\nThank you,\n<e-mail sender>',

//20
'Hello Khushiyal,\n\n	Please find the attached issue list. We need to close the issues by the end of this month.\n\nThanks & Regards,\n<e-mail sender>',

'Hi Karuna,\n\n	Please complete the documentaion of <project name> and send it to <customer name>.\n\n	Regards\n<e-mail sender>',

//22
'Hi Damodar,\n\n   Please test the <project name> and send the bug report by <date>.\n\nThanks & Regards,\n<e-mail sender>',

//23
'From,										Mumbai\nPRAVEEN SHAH\nMumbai\n\nTo,\n<address>\n\nSubject: Authorization of Mr. Komal shah for receiving the letters.\n\nDear Sir,\n\nI authorize Mr. Komal shah for receiving the letters on my name.\n\nThanking You\n\nYours faithfully\n<e-mail sender>',

//24
'Dear Brown,\n\n<Father> and <Mother> were gifted with a baby <boy or girl> yesterday evening at 3:00. The Mom and the baby are in a good condition.\n\nTake care,\n<e-mail sender>',

//25
'Hi All,\n\nTrisha has joined us in the <department name> as <designation>. Please welcome her. Her e-mail address is <email address>.\n\nWith Regards,\n<e-mail sender>',

//26
'Dear sir,\n\nWish you all a very Happy & fabulous New Year - 2013 filled with Good health & prosperity.\nThanks and regards,\n\n<e-mail sender>',

//27
'Dear Sir,\n\nMy bank account details are given below.\n\nNAME     BHASKAR\n\nBANK     STATE BANK OF INDIA\n\nA/C NO   987654321987654321\n\nREGARDS,\n\n<e-mail sender>',

//28
'Hi,\n\n       Wish you a Very Happy Birthday. Many Many Happy returns of the day.\n\nRegards\n<e-mail sender>',

//29
'TO\nM/s Easy email software\n\nKind Attention:   Mr. Nambiar\n              Managing Director.\n\nDear Sir,\n       Ref: Your Cheque No.987654 of Govinda bank dt. 05 / 02 / 2012,\n                   for Rs.1,23,456 / - drawn in our Favour.\n           With reference to the above, we wish to inform you that the\nabove cheque was returned by your bankers for paucity of fund. Kindly Co operate, and release our payment.\nPlease acknowledge receipt of this letter.\n\nyours respectfully,\n<e-mail sender>',

//30
'Hi Abilash\n\n	We shall get back to you by end of this week.\n\nRegards\n<e-mail sender>',


];



/*
router.get('/search', function(req, res, next){
	if(req.query.query.length > 1){
		var wordsList = [];
		var sub1 = [];
		var index1 = [];
		var sub2 = [];
		var index2 = [];
		var sub3 = [];
		var index3 = [];
		var sub4 = [];
		var index4 = [];
		var source = [];
		var result = [];
		wordsList = req.query.query.split(' ');
		for(var j = 0; i < wordsList.length; j++){
			if(j == 0){
				srcSub = c;
				destSub = sub1;
				srcIndex = indexArr;
				destIndex = index1;
			}else if(j == 1){
				srcSub = sub1;
				destSub = sub2;
				srcIndex = index1;
				destIndex = index2;
			}else if(j == 2){
				srcSub = sub2;
				destSub = sub3;
				srcIndex = index2;
				destIndex = index3;
			}else if(j == 3){
				srcSub = sub3;
				destSub = sub4;
				srcIndex = index3;
				destIndex = index4;
			}			
			for(var i = 0; i < srcSub.length; i++)
			{
				if( srcSub[i].indexOf( wordsList[j] ) != -1)
				{
					destSub.push(srcSub[i]);
					//dest.push(	{"name": c[i],"id" : e[m[i]]});
				}
			}
		}
		if(destSub.length)
		{
			for(var i = 0; i < destSub.length; i++){
				result.push({"name": destSub[i],"id" : destSub[i]})
			}			
			console("result :")
			console(result)
			res.writeHead(200, {'Content-Type':'text/plain'})
			res.end(JSON.stringify(result));
		}
		else
		{
			res.writeHead(200, {'Content-Type':'text/plain'})
			res.end(JSON.stringify(d));
		}
	}
	else
	{
		res.writeHead(200, {'Content-Type':'text/plain'})
		res.end(JSON.stringify(d));
	}
});
*/

/*	Working code
router.get('/search', function(req, res, next){
	if(req.query.query.length > 1)
	{
		var a = [];
		for(var i = 0; i < c.length; i++)
		{
			if( c[i].indexOf(req.query.query) != -1)
			{
				a.push(	{"name": c[i],"id" : e[m[i]]});
			}
		}
		if(a.length)
		{
			res.writeHead(200, {'Content-Type':'text/plain'})
			res.end(JSON.stringify(a));
		}
		else
		{
			res.writeHead(200, {'Content-Type':'text/plain'})
			res.end(JSON.stringify(d));
		}
	}
	else
	{
		res.writeHead(200, {'Content-Type':'text/plain'})
		res.end(JSON.stringify(d));
	}
});
*/

/* test purpose
router.get('/search', function(req, res, next){
	if(req.query.query.length > 1)
	{
		var a = [];

		for(var i = 0; i < c.length; i++)
		{
			if( c[i].indexOf(req.query.query) != -1)
			{
				a.push(	{"name": c[i],"id" : e[m[i]]});
			}
		}
		if(a.length)
		{
			res.writeHead(200, {'Content-Type':'text/plain'})
			a = [ 
				{"name": 'completion of testing',"id" : 'completion of testing'}, 
				{"name": 'finishing the testing',"id" : 'finishing the testing'}, 
				{"name": 'after testing the project',"id" : 'after testing the project'}, 
				{"name": 'on testing the project',"id" : 'on testing the project'}, 
				{"name": 'testing of project is done',"id" : 'testing of project is done'}
			];
			res.end(JSON.stringify(a));
		}
		else
		{
			res.writeHead(200, {'Content-Type':'text/plain'})
			res.end(JSON.stringify(d));
		}
	}
	else
	{
		res.writeHead(200, {'Content-Type':'text/plain'})
		res.end(JSON.stringify(d));
	}
});
*/

router.get('/body', function(req, res, next){
	if(req.query.key)
	{
		res.writeHead(200, {'Content-Type':'text/plain'});
		res.end(JSON.stringify({"i":e[ m[ parseInt(req.query.key, 10) ] ], "j": f[ m[ parseInt(req.query.key, 10) ] ] } ) );
	}
	else
	{
		res.writeHead(200, {'Content-Type':'text/plain'});
		res.end(JSON.stringify( {"i": "dummy", "j": "dummy" } ) );
	}
});

router.get('/search', function(req, res, next){
	if(req.query.query.length > 1)
	{
		var des1 = [];
		var indexArr1 = [];
		var des2 = [];
		var indexArr2 = [];
		var des3 = [];
		var indexArr3 = [];
		var stringArr = req.query.query.split(' ');
		for(var j = 0; j < stringArr.length; j++)
		{
			if(j == 0)
			{
				for(var i = 0; i < c.length; i++)
				{
					if( c[i].indexOf(stringArr[0]) != -1)
					{
						des1.push(c[i]);
						//console.log("des1 : " + c[i])
						indexArr1.push(i);
					}
				}
			}
			else if(j == 1)
			{
				if(des1.length)
				{
					for(var k = 0; k < des1.length; k++)
					{
						if( des1[k].indexOf(stringArr[1]) != -1)
						{
							des2.push(des1[k]);
							//console.log("des2 : " + des1[k])
							indexArr2.push( indexArr1[k] );
						}
					}
					if(des2.length == 0)
					{
						des2 = des1;
						indexArr2 = indexArr1;
					}
				}
				else
				{
					for(var k = 0; k < c.length; k++)
					{
						if( c[k].indexOf(stringArr[1]) != -1)
						{
							des2.push(c[k]);
							//console.log("des2 : " + des1[k])
							indexArr2.push(k);
						}
					}
				}
			}
			else if(j == 2)
			{
				if(des2.length)
				{
					for(var k = 0; k < des2.length; k++)
					{
						if( des2[k].indexOf(stringArr[2]) != -1)
						{
							des3.push(des2[k]);
							//console.log("des2 : " + des1[k])
							indexArr3.push( indexArr2[k] );
						}
					}
					if(des3.length == 0)
					{
						des3 = des2;
						indexArr3 = indexArr2;
					}
				}
				else
				{
					for(var k = 0; k < c.length; k++)
					{
						if( c[k].indexOf(stringArr[2]) != -1)
						{
							des3.push(c[k]);
							//console.log("des2 : " + des1[k])
							indexArr3.push(k);
						}
					}
				}
			}
		}

		if(stringArr.length == 1 && des1.length)
		{
			var result = [];
			res.writeHead(200, {'Content-Type':'text/plain'});
			for(var ii = 0; ii < des1.length; ii++)
			{
				result.push({"name": des1[ii], "id" : indexArr1[ii]});
			}
			//res.end(JSON.stringify(des1));
			res.end(JSON.stringify(result));
		}
		else if(stringArr.length == 2 && des2.length)
		{
			var result = [];
			for(var ii = 0; ii < des2.length; ii++)
			{
				result.push({"name": des2[ii], "id" : indexArr2[ii]});
			}
			res.writeHead(200, {'Content-Type':'text/plain'})
			//res.end(JSON.stringify(des2));
			res.end(JSON.stringify(result));
		}
		else if(stringArr.length == 3 && des3.length)
		{
			var result = [];
			for(var ii = 0; ii < des3.length; ii++)
			{
				result.push({"name": des3[ii], "id" : indexArr3[ii]});
			}
			res.writeHead(200, {'Content-Type':'text/plain'})
			//res.end(JSON.stringify(des3));
			res.end(JSON.stringify(result));
		}
		else
		{
			res.writeHead(200, {'Content-Type':'text/plain'})
			res.end(JSON.stringify(d));
		}
	}
	else
	{
		res.writeHead(200, {'Content-Type':'text/plain'})
		res.end(JSON.stringify(d));
	}
});
module.exports = router;