function createXMLObject() {
	    try {
	        if (window.XMLHttpRequest) {
	            xmlhttp = new XMLHttpRequest();
	        }
	        // code for IE
	        else if (window.ActiveXObject) {
	            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	        }
	    } catch (e) {
	        xmlhttp=false;
	    }
    return xmlhttp;
}
	
	$(document).ready(function(){
		$("#logout").addClass("active");
		
		var logoutForm = $("#logoutForm");
		var logoutFormButton = $("#logoutFormSb");
		
		$.ajax({
				type: 'get',
				url: logoutForm.attr('action'),
				data: "",
				cache : false,
				success: function (data, textStatus) {	
					 $("#username").val(data);
				},
				
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					
				},
				
				complete: function (XMLHttpRequest, textStatus) {
				
				}
			});
		
		logoutFormButton.click(function() {
			
			
			logoutFormButton.button('loading');
			
           
			window.location.href = "http://logout@" + location.hostname + ":" + location.port + "/WebClient/logout.jsp";

			
		});
		

	});