	var userInfoDataTable;
	var managedBugDataTable;
	var ownedBugDataTable;

	
	 function ellipsis(text, n) {
		    if(text.length>n)
		        return text.substring(0,n)+"...";
		    else
		        return text;
	    }

	    function truncatTextReder( nRow, aData, iDisplayIndex) 
	    {
	        var $cell=$('td:eq(2)', nRow);
	        var text=ellipsis($cell.text(),100);
	        var srcText =$cell.text().replace(/&/g, '&amp;')
	           .replace(/"/g, '&quot;')
	           .replace(/'/g, '&#39;')
	           .replace(/</g, '&lt;')
	           .replace(/>/g, '&gt;');
	       	var slices=$cell.html().split(srcText);      
	        var html;
	        if(slices.length>2)
	        {
	          html=slices[0]+$cell.text()+slices[1]+text+slices[2];
	        }else {
	          html = $cell.html().replace($cell.text(),text);
	        }
	        $cell.html(html);
	        return nRow;
	    }
	    
	    function  getBugInfoTable(bugInfo){
			var sOut = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
			sOut += '<tr><td>Component:</td><td>'+bugInfo.component+'</td></tr>';
			sOut += '<tr><td>BugId:</td><td>'+bugInfo.bugId+'</td></tr>';
			sOut += '<tr><td>Title:</td><td>'+bugInfo.title+'</td></tr>';
			sOut += '<tr><td>Project:</td><td>'+bugInfo.project+'</td></tr>';
			sOut += '<tr><td>Type:</td><td>'+bugInfo.type+'</td></tr>';
			sOut += '<tr><td>Status:</td><td>'+bugInfo.status+'</td></tr>';
			sOut += '<tr><td>Description:</td><td>'+bugInfo.description+'</td></tr>';
			sOut += '<tr><td>Owner:</td><td>'+bugInfo.owner+'</td></tr>';
			sOut += '<tr><td>Submitter:</td><td>'+bugInfo.submitter+'</td></tr>';
			sOut += '<tr><td>SubmitData:</td><td>'+bugInfo.submitData+'</td></tr>';
			sOut += '<tr><td>Severity:</td><td>'+bugInfo.severity+'</td></tr>';
			sOut += '<tr><td>Tags:</td><td>'+bugInfo.tags+'</td></tr>';
			sOut += '<tr><td>Regression:</td><td>'+bugInfo.regression+'</td></tr>';									
			sOut += '</table>';
			return sOut;
	    }
	
	   function  updateUserInfo(value, settings){
			var heads=$("#userInfoTable th");
		    var index;
		    var id;
		    var username;
		    var password;
		    var onebugfullname;
		    var email;
		    
		    var nTr = $(this).parents('tr')[0];
		    $.each(heads,function(n,value){
		      var text=value.childNodes[0].childNodes[0].data;
		      switch(text){
			      case "ID":
			    	  id=nTr.childNodes[n].childNodes[0].data; 
			    	  break;
			      case "UserName":
			    	  if(nTr.childNodes[n].childNodes[0].nodeName.toUpperCase()=="FORM"){
			    		  username=nTr.childNodes[n].childNodes[0].childNodes[0].value; 
			    	  }else {
			    		  username=nTr.childNodes[n].childNodes[0].data; 
			    	  }
			    	 
			    	  break;
			      case "Password":
			    	  if(nTr.childNodes[n].childNodes[0].nodeName.toUpperCase()=="FORM"){
			    		  password=nTr.childNodes[n].childNodes[0].childNodes[0].value; 
			    	  }else {
			    		  password=nTr.childNodes[n].childNodes[0].data; 
			    	  }
			    	  break;
			      case "OneBugFullName":
			    	  if(nTr.childNodes[n].childNodes[0].nodeName.toUpperCase()=="FORM"){
			    		  onebugfullname=nTr.childNodes[n].childNodes[0].childNodes[0].value; 
			    	  }else {
			    		  onebugfullname=nTr.childNodes[n].childNodes[0].data; 
			    	  }
			    	  break;
			      case "Email":
			    	  if(nTr.childNodes[n].childNodes[0].nodeName.toUpperCase()=="FORM"){
			    		  email=nTr.childNodes[n].childNodes[0].childNodes[0].value; 
			    	  }else {
			    		  email=nTr.childNodes[n].childNodes[0].data; 
			    	  }
			    	  break;
		      }
		    
		    });
		   	
    		$.ajax({
				type : "post",
				url : "/BugTrackingSystemAdmin/api/userinfo?method=put&id="+id+"&username="+username+"&password="+password+"&oneBugFullName="+onebugfullname+"&email="+email,
				success : function(data) {
						 alertify.log(data,"success");
			    		// alert(data) ;  
			    		}
				});
            return(value);
	   }
	   
	   function  deleteUserInfo(tr){
		   var  id=tr[0].childNodes[0].childNodes[0].data;
		   $.ajax({
				type : "delete",
				url : "/BugTrackingSystemAdmin/api/userinfo?method=delete&id="+id,
				success : function(data) {
						 alertify.log(data,"success");
			    		// alert(data) ;  
			    		}
				});
           return true;
	   }
	   
	   function  addUserInfo(tr){
		   var  id=tr[0].childNodes[0].childNodes[0].data;
		   $.ajax({
				type : "delete",
				url : "/BugTrackingSystemAdmin/api/userinfo?method=delete&id="+id,
				success : function(data) {
						 alertify.log(data,"success");
			    		// alert(data) ;  
			    		}
				});
           return true;
	   }
	   
	   function  deleteManagedBug(tr){
		   var heads=$("#managedBugsTable th");
		    var index;
		    $.each(heads,function(n,value){
		      
		      if(value.childNodes[0].childNodes[0].data=="BugId"){
		        index=n;
		        return false;
		      }
		      else 
		         return true;
		    
		    });
		   
		  	var id = tr[0].childNodes[index].childNodes[0].attributes['data-manageId'].value;
   		
		   $.ajax({
				type : "delete",
				url : "/BugTrackingSystemAdmin/api/managedBugs?method=delete&id="+id,
				success : function(data) {
						 alertify.log(data,"success");
			    		// alert(data) ;  
			    		}
				});
           return true;
	   }
	   
	   function  deleteOwnedBug(tr){
		   var heads=$("#ownedBugsTable th");
		    var index;
		    $.each(heads,function(n,value){
		      
		      if(value.childNodes[0].childNodes[0].data=="BugId"){
		        index=n;
		        return false;
		      }
		      else 
		         return true;
		    
		    });
		   
		  	var id = tr[0].childNodes[index].childNodes[0].attributes['data-ownerId'].value;
   		
		   $.ajax({
				type : "delete",
				url : "/BugTrackingSystemAdmin/api/ownerBugs?method=delete&id="+id,
				success : function(data) {
						 alertify.log(data,"success");
			    		// alert(data) ;  
			    		}
				});
           return true;
	   }
	   
	   
	$(document).ready(
					function() {
												
					
						$("#mainFrameJSPNav").addClass("active");

						$.ajax({
									type : "get",
									url : "/BugTrackingSystemAdmin/api/userinfos",
									data : "",
									cache :false,
									success : function(data) {
										
										var dataObj = data;
										var  userInfoList=[];
										$.each(dataObj,
														function(i, userInfo) {
															var record = [];
															record.push(userInfo.id);
															record.push(userInfo.username);
															record.push(userInfo.password);
															record.push(userInfo.oneBugFullName);
															record.push(userInfo.email);
															 userInfoList.push(record);
														});
													
										userInfoDataTable = $('#userInfoTable').dataTable( {
											"sDom": 'R<C>H<"clear"><"ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix"lfr>t<"ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix"ip>',
											//"bProcessing": true,
											//"aaSorting": [[1, 'asc']],
											"bJQueryUI": true,
											"sPaginationType": "full_numbers",
											"aaData": userInfoList,
											"aoColumns": [
									            { sWidth: '10%' },
									            { sWidth: '20%' },
									            { sWidth: '20%' },
									            { sWidth: '20%' },
									            { sWidth: '30%' }
									            ]
										});	
										
										 userInfoDataTable.makeEditable({
											 
											 "aoColumns": [
												              null,
												              {
												            	  cssclass:"required",
												            	  indicator: 'Saving Username...',
																  tooltip: 'Double click to modify user Name',
																  loadtext: 'loading...',
																 // type: 'text',
																  onblur: 'submit',
																  sUpdateURL: updateUserInfo,
												              	},
												              	{
												             
												            	  cssclass:"required minlength",
												            	  indicator: 'Saving Password...',
																  tooltip: 'Double click to modify password',
																  loadtext: 'loading...',
																 // type: 'text',
																  onblur: 'submit',
																  sUpdateURL: updateUserInfo,
												              	},
												              	{
													            	  cssclass:"required",
													            	  indicator: 'Saving Username...',
																	  tooltip: 'Double click to modify onebug full name',
																	  loadtext: 'loading...',
																	 // type: 'text',
																	  onblur: 'submit',
																	  sUpdateURL: updateUserInfo,
												              	},
												              	{
													            	  cssclass:"required email",
													            	  indicator: 'Saving Username...',
																	  tooltip: 'Double click to modify email',
																	  loadtext: 'loading...',
																	 // type: 'text',
																	  onblur: 'submit',
																	  sUpdateURL: updateUserInfo,
													             }		
												              	
												              ],
											
											
											/*sAddURL: "assets/other/blank.txt",
	                             			sAddHttpMethod: "GET",
	                             			sAddNewRowFormId: "userInfoForm",
	                             			sAddNewRowButtonId: "addUserBtn",
	                             			sAddNewRowOkButtonId: "addUserOkBtn",
	            							sAddNewRowCancelButtonId: "addUserCancleBtn",	
										    oAddNewRowButtonOptions: {	label: "Add...",
															icons: {primary:'ui-icon-plus'} 
											},
											oAddNewRowFormOptions: { 	
                                                title: 'Add New User',
												show: "blind",
												hide: "explode",
                                                modal: true
											}	,
												*/
								            sDeleteHttpMethod: "GET",
		                             		sDeleteURL: "assets/other/blank.txt",
		                             		fnOnDeleting: deleteUserInfo,
							                sDeleteRowButtonId: "deleteUserBtn",	
											oDeleteRowButtonOptions: {	
												label: "Remove", 
												icons: {primary:'ui-icon-trash'}
											},							                
							                sAddDeleteToolbarSelector: "#userInfoTable_length"
										}); 
									},
									complete : function(status) {
										var addButton='<button data-toggle="modal" data-target="#addUserModal"  id="addUserBtn" class="add_row ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false"><span class="ui-button-icon-primary ui-icon ui-icon-plus"></span><span class="ui-button-text">Add...</span></button>';
										$(addButton).insertBefore("#deleteUserBtn");
									}
						});
						

						
						
						
						
						
						$.ajax({
							type : "get",
							url : "/BugTrackingSystemAdmin/api/managedBugs",
							data : "",
							cache :false,
							success : function(data) {
								
								var dataObj = data;
								var  managedBugsList=[];
								$.each(dataObj,
												function(i, managedBug) {
													var record = [];
													record.push("<img src='assets/images/details_open.png' >");
													record.push("<a data-id="
															+ managedBug.buginfo.id
															+" data-manageId="
															+ managedBug.id
															+ " style='text-decoration : none ' onclick='return false'>"
															+ managedBug.buginfo.bugId
															+ "</a>");
													record.push("<a href='http://onebug.citrite.net/tmtrack/tmtrack.dll?IssuePage&RecordId="
																			+ managedBug.buginfo.bugId
																			+ "&Template=view&TableId=1000' target='view_window' title='"
																			+managedBug.buginfo.title+"'>"
																			+ managedBug.buginfo.title
																			+ "</a>");
													record.push(managedBug.userinfo.username);
													record.push(managedBug.buginfo.project);
													record.push(managedBug.buginfo.component);
													record.push(managedBug.buginfo.owner);
													record.push("<label id=label_status_" + managedBug.buginfo.id + ">"
															+ managedBug.buginfo.status
															+ "</label>");
													managedBugsList.push(record);
												});
											
								managedBugDataTable = $('#managedBugsTable').dataTable( {
									//"sDom": 'R<C>H<"clear"><"ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix"lfr>t<"ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix"ip>',
									//"bProcessing": true,
									//"aaSorting": [[1, 'asc']],
									"fnRowCallback":  truncatTextReder,
									"aoColumnDefs": [
														{ "bSortable": false, "aTargets": [ 0 ] }
													], 
									"bJQueryUI": true,
									"sPaginationType": "full_numbers",
									"aaData": managedBugsList,
									"aoColumns": [
										            { sWidth: '5%'  },
										            { sWidth: '10%' },
										            { sWidth: '39%' },
										            { sWidth: '1%' ,
										            "bVisible":    false },
										            { sWidth: '10%' },
										            { sWidth: '15%' },
										            { sWidth: '10%' },
										            { sWidth: '10%' }
										        ]
								});	
								
								managedBugDataTable.rowGrouping({
									iGroupingColumnIndex:3,
									bExpandableGrouping: true,
								});	
								
								managedBugDataTable.makeEditable({	
									"aoColumns": [
									              null,
									              null,
									              null,
									              null,
									              null,
									              null,
									              null,
									              null,									              
									              ],
									/*sAddURL: "assets/other/blank.txt",
                         			sAddHttpMethod: "GET",
                         			sAddNewRowFormId: "addManagedBugForm",
                         			sAddNewRowButtonId: "addManagedBugBtn",
                         			sAddNewRowOkButtonId: "addManagedBugOkBtn",
        							sAddNewRowCancelButtonId: "addManagedBugCancleBtn",
        							
								    oAddNewRowButtonOptions: {	label: "Add...",
													icons: {primary:'ui-icon-plus'} 
									},
									
									oAddNewRowFormOptions: { 	
                                        title: 'Add New User Managed Bug',
										show: "blind",
										hide: "explode",
                                        modal: true
									}	,
										*/
								    sDeleteHttpMethod : "GET",
									sDeleteURL : "assets/other/blank.txt",
									fnOnDeleting : deleteManagedBug,																					
                         			sDeleteRowButtonId: "deleteManagedBugBtn",
                         			oDeleteRowButtonOptions: {	
										label: "Remove", 
										icons: {primary:'ui-icon-trash'}
									},		
									sAddDeleteToolbarSelector: "#managedBugsTable_length"	
								}); 
							},
							complete : function(status) {
								var addButton='<button data-toggle="modal" data-target="#addManagedBugModal"  id="addManagedBugBtn" class="add_row ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button" aria-disabled="false"><span class="ui-button-icon-primary ui-icon ui-icon-plus"></span><span class="ui-button-text">Add...</span></button>';
								$(addButton).insertBefore("#deleteManagedBugBtn");
							}
						});
						
						
						
						$.ajax({
							type : "get",
							url : "/BugTrackingSystemAdmin/api/ownerBugs",
							data : "",
							cache :false,
							success : function(data) {
								
								var dataObj = data;
								var  ownedBugsList=[];
								$.each(dataObj,
												function(i, ownedBug) {
													var record = [];
													record.push("<img src='assets/images/details_open.png' >");
													record.push("<a data-id="
															+ ownedBug.buginfo.id
															+" data-ownerId="
															+ ownedBug.id
															+ " style='text-decoration : none ' onclick='return false'>"
															+ ownedBug.buginfo.bugId
															+ "</a>");
													record.push("<a href='http://onebug.citrite.net/tmtrack/tmtrack.dll?IssuePage&RecordId="
																			+ ownedBug.buginfo.bugId
																			+ "&Template=view&TableId=1000' target='view_window' title='"
																			+ownedBug.buginfo.title+"'>"
																			+ ownedBug.buginfo.title
																			+ "</a>");
													record.push(ownedBug.userinfo.username);
													record.push(ownedBug.buginfo.project);
													record.push(ownedBug.buginfo.component);
													record.push(ownedBug.buginfo.owner);
													record.push("<label id=label_status_" + ownedBug.buginfo.id + ">"
															+ ownedBug.buginfo.status
															+ "</label>");
													ownedBugsList.push(record);
												});
											
								ownedBugDataTable = $('#ownedBugsTable').dataTable( {
									//"sDom": 'R<C>H<"clear"><"ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix"lfr>t<"ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix"ip>',
									//"bProcessing": true,
									//"aaSorting": [[1, 'asc']],
									"fnRowCallback":  truncatTextReder,
									"aoColumnDefs": [
														{ "bSortable": false, "aTargets": [ 0 ] }
													], 
									"bJQueryUI": true,
									"sPaginationType": "full_numbers",
									"aaData": ownedBugsList,
									"aoColumns": [
										            { sWidth: '5%'  },
										            { sWidth: '10%' },
										            { sWidth: '39%' },
										            { sWidth: '1%' ,
										            "bVisible":    false },
										            { sWidth: '10%' },
										            { sWidth: '15%' },
										            { sWidth: '10%' },
										            { sWidth: '10%' }
										        ]
								});	
								
								ownedBugDataTable.rowGrouping({
									iGroupingColumnIndex:3,
									bExpandableGrouping: true,
								});	
								
								ownedBugDataTable.makeEditable({	
									"aoColumns": [
									              null,
									              null,
									              null,
									              null,
									              null,
									              null,
									              null,
									              null,
									              
									              ],
									/*sAddURL: "assets/other/blank.txt",
                         			sAddHttpMethod: "GET",
                         			
                         			sAddNewRowFormId: "addNewOwnedBugForm",
                         			sAddNewRowButtonId: "addNewOwnedBugBtn",
                         			sAddNewRowOkButtonId: "addOwnedBugOkBtn",
        							sAddNewRowCancelButtonId: "addOwnedBugCancleBtn",
                         			
								    oAddNewRowButtonOptions: {	label: "Add...",
													icons: {primary:'ui-icon-plus'} 
									},
									oAddNewRowFormOptions: { 	
                                        title: 'Add New User Owned Bug',
										show: "blind",
										hide: "explode",
                                        modal: true
									}	,
									sAddDeleteToolbarSelector: "#ownedBugsTable_length"		
									*/
					                sDeleteHttpMethod : "GET",
									sDeleteURL : "assets/other/blank.txt",
									fnOnDeleting : deleteOwnedBug,																					
                         			sDeleteRowButtonId: "deleteOwnedBugBtn",
                         			oDeleteRowButtonOptions: {	
										label: "Remove", 
										icons: {primary:'ui-icon-trash'}
									},		
									sAddDeleteToolbarSelector: "#ownedBugsTable_length"	
																					
									
								}); 
							},
							complete : function(status) {
								var addButton='<button data-toggle="modal" data-target="#addOwnedBugModal" id="addNewOwnedBugBtn" class="add_row ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"  role="button" aria-disabled="false"><span class="ui-button-icon-primary ui-icon ui-icon-plus"></span><span class="ui-button-text">Add...</span></button>';
							//	$(addButton).insertBefore("#deleteOwnedBugBtn");
							}
						});
						
						
						
						
						$(document).delegate('#managedBugsTable tbody td img','click',function () {
							 var heads=$("#managedBugsTable th");
							    var index;
							    $.each(heads,function(n,value){
							      
							      if(value.childNodes[0].childNodes[0].data=="BugId"){
							        index=n;
							        return false;
							      }
							      else 
							         return true;
							    
							    });
								var nTr = $(this).parents('tr')[0];
							  	var id = nTr.childNodes[index].childNodes[0].attributes['data-id'].value;
								
						       		
									if ( managedBugDataTable.fnIsOpen(nTr) )
									{
										//alert("hello");
										//This row is already open - close it
										this.src = "assets/images/details_open.png";
										managedBugDataTable.fnClose( nTr );
									}
									else
									{
										//Open this row
										this.src = "assets/images/details_close.png";
										$.ajax({
											type: "get",
											url: "/BugTrackingSystem/api/bug?id=" + id,
											data: "",
											cache : false,
											success: function (data) {
												bugInfo = data;
											    var sOut= getBugInfoTable(bugInfo);										
											    managedBugDataTable.fnOpen( nTr, sOut, 'details' );
												
												}
											});
									}							
						});
						

						$(document).delegate('#ownedBugsTable tbody td img','click',function () {
							 var heads=$("#ownedBugsTable th");
							    var index;
							    $.each(heads,function(n,value){
							      
							      if(value.childNodes[0].childNodes[0].data=="BugId"){
							        index=n;
							        return false;
							      }
							      else 
							         return true;
							    
							    });
								var nTr = $(this).parents('tr')[0];
							  	var id = nTr.childNodes[index].childNodes[0].attributes['data-id'].value;
								
						       		
									if ( ownedBugDataTable.fnIsOpen(nTr) )
									{
										//alert("hello");
										//This row is already open - close it
										this.src = "assets/images/details_open.png";
										ownedBugDataTable.fnClose( nTr );
									}
									else
									{
										//Open this row
										this.src = "assets/images/details_close.png";
										$.ajax({
											type: "get",
											url: "/BugTrackingSystem/api/bug?id=" + id,
											data: "",
											cache : false,
											success: function (data) {
												bugInfo = data;
											    var sOut= getBugInfoTable(bugInfo);										
											    ownedBugDataTable.fnOpen( nTr, sOut, 'details' );
												
												}
											});
									}							
							} );
						
						$(document).delegate('#addUserBtn','click',function () {
							//alert("Hello!!");
							var userName='<fieldset><div class="form-group"><label class="control-label col-lg-3">Username</label><div class="col-lg-9"><input id="username" class="form-control col-lg-9" name="username" placeholder="Username" style="width:80%" type="text"> </div></div>';
							var password='<div class="form-group"><label class="control-label col-lg-3">Password</label><div class="col-lg-9"><input id="password" class="form-control col-lg-9 " name="password" placeholder="Password" style="width:80%" type="password"></div></div>';
							var oneBugName='<div class="form-group"><label class="control-label col-lg-3">OneBug FullName</label><div class="col-lg-9"><input id="oneBugFullName" class="form-control col-lg-9" name="oneBugFullName" placeholder="OneBugFullName" style="width:80%" type="text"></div></div>';
							var email='<div class="form-group"><label class="control-label col-lg-3">Email</label><div class="col-lg-9"><input id="email" class="form-control col-lg-9" name="email" placeholder="Email" style="width:80%" type="text"></div></div></fieldset>';
							$("#addUserForm").html(userName+password+oneBugName+email);
							
							
							
						});		
						
						$(document).delegate('#managedBugFind','click',function () {
							
							var bugId=$(this).parent()[0].childNodes[1].value.replace(/^(bug|BUG)?/,"");
							//alert(bugId);
							//$('#managedBugFind').button('loading');
							$.ajax({
								type : "get",
								url : "/BugTrackingSystem/api/bugs?bugId="+bugId,
								data : "",
								cache :false,
								success : function(data) {
									
									var dataObj = data;
									if (dataObj != null) {
										   
										var nullStr="(null)";	
										if(dataObj.title){
											 $("#managedTitle").val(dataObj.title);
										}else {
											$("#managedTitle").val(nullStr);
										}
										
										if(dataObj.project){
											$("#managedProject").val(dataObj.project);
										}else {
											$("#managedProject").val(nullStr);
										}
										
										if(dataObj.component){
											  $("#managedComponent").val(dataObj.component);
										}else {
											$("#managedComponent").val(nullStr);
										}
										
										if(dataObj.type){
											   $("#managedType").val(dataObj.type);
										}else {
											$("#managedType").val(nullStr);
										}
										
										if(dataObj.status){
											   $("#managedStatus").val(dataObj.status);
										}else {
											$("#managedStatus").val(nullStr);
										}
										
										dataObj.description=dataObj.description.replace(/<br ?\/?>/g, "\n");
										 
										if(dataObj.description){
											  $("#managedDescription").val(dataObj.description);
										}else {
											$("#managedDescription").val(nullStr);
										}
										
										if(dataObj.owner){
											$("#managedOwner").val(dataObj.owner);
										}else {
											$("#managedOwner").val(nullStr);
										}
										
										if(dataObj.submitter){
											$("#managedSubmitter").val(dataObj.submitter);
										}else {
											$("#managedSubmitter").val(nullStr);
										}
										
										if(dataObj.submitData){
											$("#managedSubmitData").val(dataObj.submitData);
										}else {
											$("#managedSubmitData").val(nullStr);
										}
										
										if(dataObj.severity){
											$("#managedSeverity").val(dataObj.severity);
										}else {
											$("#managedSeverity").val(nullStr);
										}
										
										if(dataObj.tags){
											 $("#managedTags").val(dataObj.tags);
										}else {
											$("#managedTags").val(nullStr);
										}
										
										if(dataObj.regression){
											 $("#mangedRegression").val(dataObj.regression);
										}else {
											$("#mangedRegression").val(nullStr);
										}
										   
										} 
								},
								complete : function(status){
									$('#managedBugFind').button('reset');
								}
							});
							
						});
						
						
						$(document).delegate('#addManagedBugBtn','click',function () {
							
							$("#managedBugFind").prop("disabled","true");
							$("#managedTitle").val("");
							$("#managedProject").val("");
							$("#managedComponent").val("");
							$("#managedType").val("");
							$("#managedStatus").val("");
							$("#managedDescription").val("");
							$("#managedOwner").val("");
							$("#managedSubmitter").val("");
							$("#managedSubmitData").val("");
							$("#managedSeverity").val("");
							$("#managedTags").val("");
							$("#mangedRegression").val("");
							$.ajax({
										type : "get",
										url : "/BugTrackingSystemAdmin/api/userinfos",
										data : "",
										cache :false,
										success : function(data) {
											
											var dataObj = data;
											$.each(dataObj,
															function(i, userInfo) {
																$("#managedUserId").append('<option value='+userInfo.id+'>'+userInfo.username+'</option>');
																
															});
										}
							});

						});		
						
						$(document).delegate('#addNewOwnedBugBtn','click',function () {
							//
							//

						});	
						
						
						
						
						
						
						var addUserOkBtn = $("#userInfoFormSb");
						
						var addUserForm = $("#addUserForm");

						
						addUserForm.validate({
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
								oneBugFullName: {
									required: true,
								}
							}, 
							 submitHandler: function(form) {
								 addUserOkBtn.button('loading');
									$.ajax({
										type: addUserForm.attr('method'),
										url: addUserForm.attr('action'),
										data: addUserForm.serialize(),
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
											addUserOkBtn.button('reset');
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
							},

						});
						
						var addManagedBugOkBtn = $("#managedBugFormSb");
						
						var addManagedBugForm = $("#addManagedBugForm");
						
						addManagedBugForm.validate({
							ignore: [],
							rules: {
								buginfoId : {
									 regex: '^(bug|BUG)?[0-9]{6,7}$',
									 required :true
								},
								userinfoId: {
									required: true
								}
							}, 
							 submitHandler: function(form) {
								 addManagedBugOkBtn.button('loading');
								 var userInfoId=$("#managedUserId").val();
								 var bugInfoId=$("#managedBugId").val();
								 alert("userInfo"+userInfoId);
								 alert("bugInfo"+bugInfoId);
								 
								$.ajax({
									type: addManagedBugForm.attr('method'),
									//url: addManagedBugForm.attr('action')+"?userinfoId="+userInfoId+"&buginfoId="+bugInfoId,
									url: addManagedBugForm.attr('action'),
									data: addUserForm.serialize(),
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
										addManagedBugOkBtn.button('reset');
									}
								});	
							},
							showErrors: function(errorMap, errorList) {
								if(errorList.length>0){
									$("#managedBugId").closest('.form-group').removeClass('has-success').addClass('has-error');
									$("#managedBugFind").prop("disabled","true");
									$("#managedTitle").val("");
									$("#managedProject").val("");
									$("#managedComponent").val("");
									$("#managedType").val("");
									$("#managedStatus").val("");
									$("#managedDescription").val("");
									$("#managedOwner").val("");
									$("#managedSubmitter").val("");
									$("#managedSubmitData").val("");
									$("#managedSeverity").val("");
									$("#managedTags").val("");
									$("#mangedRegression").val("");
								}
								else {
									this.defaultShowErrors();
								}
								
							  },
							success: function(element) {
								element
								.text('OK!').addClass('valid')
								.closest('.form-group').removeClass('has-error').addClass('has-success');
								$("#managedBugFind").removeAttr('disabled');
								element.remove();
							},

						});
						
			});
		
														
										
										

										
