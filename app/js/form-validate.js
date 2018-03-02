jQuery(document).ready(function($) {

	$("#contact-form").validate({
		errorPlacement: function(error, element) {},
		invalidHandler: function(event, validator) {
			//get errors
      if (validator.errorList.length) {
        var message = validator.errorList[0].message
        $("div.err div").html(message);
        $("div.err").show();  
      } else {
  				$("div.err").hide();      
      }
		}
	});
})
