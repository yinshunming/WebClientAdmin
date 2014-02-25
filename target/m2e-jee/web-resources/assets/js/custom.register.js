$(document).ready(function(){
		
		$("#registerJSPNav").addClass("active");
		var registerBtn = $("#registerFormSb");
		
		var registerForm = $("#registerForm");
		
		registerForm.validate({
			ignore: [],
			rules: {
				username : {
					 required: true
				}, 
				email : {
					required: true,
					email: true
				},
				password: {
					required: true,
					minlength: 4
				},
				password2: {
					required: true,
					equalTo: "#password"
				},
				oneBugFullName: {
					required: true,
				}
			}, 
			 submitHandler: function(form) {
				 registerBtn.button('loading');
					$.ajax({
						type: registerForm.attr('method'),
						url: registerForm.attr('action'),
						data: registerForm.serialize(),
						cache : false,
						success: function (data) {
							var dataObj = data;
							alertify.log(dataObj,"success");
							//alert(dataObj);
							window.location.reload();
						},
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							
						},
						
						complete: function (XMLHttpRequest, textStatus) {
							registerBtn.button('reset');
						}
					});	
			},
			highlight: function(element) {
				$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
			},
			success: function(element) {
				element
				.text('OK!').addClass('valid')
				.closest('.form-group').removeClass('has-error').addClass('has-success');
			}
		});
		
		}); 