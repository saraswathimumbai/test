(function() {
	/*
    var country_list = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
    var people_list = [];
    for (var i = 0; i < 100; i++) {
        people_list.push({
            name: chance.name(),
            age: chance.age()
        });
    }
	*/
	function makeAjaxCall(url, methodType){
	   var promiseObj = new Promise(function(resolve, reject){
		  var xhr = new XMLHttpRequest();
		  xhr.open(methodType, url, true);
		  xhr.send();
		  xhr.onreadystatechange = function(){
		  if (xhr.readyState === 4){
			 if (xhr.status === 200){
				console.log("xhr done successfully");
				var resp = xhr.responseText;
				var respJson = JSON.parse(resp);
				resolve(respJson);
			 } else {
				reject(xhr.status);
				console.log("xhr failed");
			 }
		  } else {
			 console.log("xhr processing going on");
		  }
	   }
	   console.log("request sent succesfully");
	 });
	 return promiseObj;
	}

	var loadPage = function(searchTerm, pageNumber, pageSize) {
		 var deferred = $.Deferred();
		var url = "/search?key=" + searchTerm;
	   var promiseObj = new Promise(function(resolve, reject){
			  var xhr = new XMLHttpRequest();
			  xhr.open("GET", url, true);
			  xhr.send();
			  xhr.onreadystatechange = function(){
			  if (xhr.readyState === 4){
				 if (xhr.status === 200){
					console.log("xhr done successfully");
					var resp = xhr.responseText;
					console.log("xhr.responseText : ");
					console.log(xhr.responseText);
					var respJson = JSON.parse(resp);
					resolve(respJson);
					deferred.resolve(respJson);
				 } else {
					reject(xhr.status);
					console.log("xhr failed");
					deferred.resolve([]);
				 }
			  } else {
				 console.log("xhr processing going on");
			  }
		   }
		   console.log("request sent succesfully");
		 });
		 //return promiseObj;
		 
		 return deferred.promise();
    };
	
	function processUserDetailsResponse(repoList){
	 console.log("render repo list");
	 console.log(repoList); 
	}

	function errorHandler(statusCode){
	 console.log("failed with status", statusCode);
	}

    $('#country-field').richAutocomplete({
        loadPage: loadPage,
        paging: true,
        pageSize: 20,
        extractText: function(item) {
            console.log("In extractText(). item :  " + item.n );
            return item.n;
        },
        //render: function(item) {
        //    return '<p class="icon-name">' + item.n + '</p>';
        //},

        render: function(item) {
            return '<p>' + item.n + '</p><small>' + '1' + '</small>';
        },

        select: function(item) {
             if(item.m)
            		$('#selected-item').text(item.m);
             else
            		$('#selected-item').text("");

            console.log("In select(). item :  " + item.n);
        },
            showSpinner: false,
            debounce: 0,
           emptyRender: function() {
                return '<p>No Matches Found...</p>';
            }
    });
})();
