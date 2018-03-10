(function () {

/*
  function init(){
    $('#submitButton').click(submitButtonHandler);
  }
*/

  function submitButtonHandler (evt) {
     var testForm = document.getElementById('testForm');

      //prevent form submission
      evt.preventDefault();
      evt.stopPropagation();

      $('#post-results-container').fadeOut();
      $('.ajaxLoader').css('display', 'inline-block');
		console.log(" testForm.employeeid.value : " + testForm.employeeid.value);
		console.log(" testForm.password.value : " + testForm.password.value);

      //make the AJAX call
	  /*
      $.ajax({
        url: '/',
        type: 'POST',
        data: {
          employeeid: testForm.employeeid.value,
          password: testForm.password.value
        },
        success: postSuccessHandler
      });
	  */
  }

  function postSuccessHandler (jsonData) {
		console.log("jsonData ::");
		console.log(jsonData);
  };

//init on document ready
$(document).ready(init);
})();