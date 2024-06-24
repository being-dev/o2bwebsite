jQuery(document).ready(function($) {
  "use strict";

  //Contact
  $('#sendMsg').on('click', function(){
   
    var f = $("#myform").find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs
     
      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'validate-email':
            var isRequired = i.attr('data-required');
            if ((!isRequired || i.val().trim().length > 0) && !emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      //var i = $("#myform"); // current input
      var i = $(this); // current input
      var rule = i.attr('data-rule');
      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validate').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
	
	var indexed_array = {};
    if (ferror) return false;
    else {
		
		

    $.map($("#myform").serializeArray(), function(n, i){
        indexed_array[n['name']] = n['value'];
    });

	}
    var this_form = $("#myform");
    var action = $("#myform").attr('action');

    if(!action ) {
      this_form.find('.loading').slideUp();
      alert("The form action property is not set!")
      return false;
    }

    $("#sendMsg").hide();
    this_form.find('.loading').slideDown();
    $.ajax({
      type: "POST",
      url: action,
      data: JSON.stringify(indexed_array),
      success: function(msg) {
        this_form.find('.loading').slideUp();
        alert("Thanks you for feedback, we will contact you soon.");
        location.reload()
      },
      error: function (result, status) {
        console.log(result);
        alert("Some error occur while submitting feedback")
      },
      complete: function(data) {
        this_form.find('.loading').slideUp();
    }
    });
    
    return false;
  });

});