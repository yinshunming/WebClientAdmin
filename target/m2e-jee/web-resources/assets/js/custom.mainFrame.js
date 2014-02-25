	var ownerBugDataTable;
	var managerBugDataTable;
	var differentBugDataTable;
	
   
    
	function updateStatus(id, bugId) {
		var updateBtn = $("#status_" + id);
		updateBtn.button('loading');

		$.ajax({
			type : "get",
			url : "/BugTrackingSystem/api/bugStatus?id=" + id + "&bugId="
					+ bugId,
			data : "",
			cache : false,
			success : function(data) {
				$("#label_status_" + id).text(data);
			},

			error : function(XMLHttpRequest, textStatus, errorThrown) {
				//alert("updating error! Please try again");
				alertify.log( "updating error! Please try again" ,"error");
			},

			complete : function(XMLHttpRequest, textStatus) {
				updateBtn.button('reset');
			}
		});

	}
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
    
	$(document)
			.ready(
					function() {
												
					
						$("#mainFrameJSPNav").addClass("active");

						$.ajax({
									type : "get",
									url : "/BugTrackingSystem/api/mainFrame",
									data : "",
									cache :false,
									success : function(data) {
										var dataObj = data;
										var  managedRecordList=[];
										$.each(dataObj.managedList,
														function(i, buginfo) {
															var record = [];
															record.push("<img src='assets/images/details_open.png' >");
															record.push("<a data-id="
																					+ buginfo.id
																					+ " style='text-decoration : none ' onclick='return false'>"
																					+ buginfo.bugId
																					+ "</a>");
															record.push("<a href='http://onebug.citrite.net/tmtrack/tmtrack.dll?IssuePage&RecordId="
																					+ buginfo.bugId
																					+ "&Template=view&TableId=1000' target='view_window' title='"
																					+buginfo.title+"'>"
																					+ buginfo.title
																					+ "</a>");
															record.push(buginfo.project);
															record.push(buginfo.component);
															record.push(buginfo.owner);
															record.push("<label id=label_status_" + buginfo.id + ">"
																					+ buginfo.status
																					+ "</label>");
															record.push("<button id=status_"
																					+ buginfo.id
																					+ " onclick= "
																					+ "javascript:updateStatus('"
																					+ buginfo.id
																					+ "','"
																					+ buginfo.bugId
																					+ "') class='btn btn-default'>update</button>"
																					);
															 managedRecordList.push(record);
														});
													
										managerBugDataTable = $('#managedBugTable').dataTable( {
											"sDom": 'R<C>H<"clear"><"ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix"lfr>t<"ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix"i<"managedButtonPlaceholder">p>',
											"bProcessing": true,
											/* "bLengthChange":false,
											"bPaginate":false, */
											"fnRowCallback":  truncatTextReder,
											"aoColumnDefs": [
												{ "bSortable": false, "aTargets": [ 0 ] }
											], 
											"aaSorting": [[1, 'asc']],
											"bJQueryUI": true,
											"sPaginationType": "full_numbers",
											"aaData": managedRecordList,
											"aoColumns": [
									            { sWidth: '5%'  },
									            { sWidth: '10%' },
									            { sWidth: '39%' },
									            { sWidth: '1%' ,
									            "bVisible":    false },
									            { sWidth: '15%' },
									            { sWidth: '10%' },
									            { sWidth: '10%' },
									            { sWidth: '10%' }
									            ]
										});	
										managerBugDataTable.rowGrouping({
											iGroupingColumnIndex:3,
											bExpandableGrouping: true,
										});		
										 managerBugDataTable.makeEditable({
											sUpdateURL: function(value, settings)
											{
		                             			return(value); //Simulation of server-side response using a callback function
											},
											"aoColumns": 
											[
											  null,
											  null,
											  null,
											  {
											    cssclass:"required",
											  	indicator: 'Saving component...',
											  	tooltip: 'Double click to modify component',
											  	loadtext: 'loading...',
											  	 type: 'select',
											  	 onblur: 'submit',
											  	 data: "{'':'Please select...', 'None':'None','DDC-ADIdentity Service':'DDC-ADIdentity Service','DDC-Broker Service':'DDC-Broker Service','DDC-Configuration Service':'DDC-Configuration Service','DDC-Configuration Logging Service':'DDC-Configuration Logging Service','DDC-Delegated Admin Service':'DDC-Delegated Admin Service','DDC-Event Test Service':'DDC-Event Test Service','DDC-Host Service':'DDC-Host Service','DDC-Machine Creation Service':'DDC-Machine Creation Service','DDC-Scout(Taas)':'DDC-Scout(Taas)','VDA-Broker Agent(VDA)':'VDA-Broker Agent(VDA)','VDA-Machine Identity Service Agent':'VDA-Machine Identity Service Agent','HDX-ICA HostCore':'HDX-ICA HostCore','HDX-ICA Graphics':'HDX-ICA Graphics','HDX-ICA Integration':'HDX-ICA Integration','HDX-ICA IO':'HDX-ICA IO','HDX-ICA Multimedia':'HDX-ICA Multimedia','HDX-ICA Printing':'HDX-ICA Printing','HDX-ICA Packaging':'HDX-ICA Packaging','Director':'Director','Group Policy':'Group Policy','Studio':'Studio','Licensing':'Licensing','Monitoring Service':'Monitoring Service','StoreFront':'StoreFront','MetaInstaller':'MetaInstaller','AppV':'AppV','PVD':'PVD','PVS':'PVS'}",
											  	 sUpdateURL:  function(value, settings)
						                                {
						                                		var heads=$("#managedBugTable th");
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
						                                		var bugId=nTr.childNodes[index].childNodes[0].innerText;
						                                		
						                                		$.ajax({
																	type : "post",
																	url : "/BugTrackingSystem/api/bug?method=put&id="+id+"&bugId="+bugId+"&component="+value,
																	success : function(data) {
																			 alertify.log(data,"success");
   																    		 //alert(data) ; 
   																    		  }
																	});
						                                        return(value);
						                                }
												
											  },
											  null,
											  null,
											  null
											]
										
										}); 
										$(".managedButtonPlaceholder").html("<button id='updateAllManagedListBtn' name='updateAllManagedListBtn' style='margin-left : 15px' class='btn btn-default' data-loading-text='Loading'>updateall</button>");
										$(".managedButtonPlaceholder").css("width","10%");
										$(".managedButtonPlaceholder").css("float","right");
										//if ($.isFunction($.bootstrapIE6)) $.bootstrapIE6("#managedBugTable");
																			
										var  ownerRecordList=[];
										$.each(
														dataObj.ownerList,
														function(i, buginfo) {
															var record = [];
															record.push("<img src='assets/images/details_open.png' >");
															record.push("<a data-id="
																					+ buginfo.id
																					+ " style='text-decoration : none ' onclick='return false'>"
																					+ buginfo.bugId
																					+ "</a>");
														    record.push("<a href='http://onebug.citrite.net/tmtrack/tmtrack.dll?IssuePage&RecordId="
																					+ buginfo.bugId
																					+ "&Template=view&TableId=1000'  target='view_window' title='"
																					+buginfo.title+"'>"
																					+ buginfo.title
																					+ "</a>");
														    record.push(buginfo.project);
														    record.push(buginfo.component);
														    record.push( buginfo.owner);
														    record.push(
																				   "<label id=label_status_" + buginfo.id + ">"
																					+ buginfo.status
																					+ "</label>");
															record.push("<button id=status_"
																					+ buginfo.id
																					+ " onclick= "
																					+ "javascript:updateStatus('"
																					+ buginfo.id
																					+ "','"
																					+ buginfo.bugId
																					+ "') class='btn btn-default'>update</button>");
														    ownerRecordList.push(record);
																														
														});
														
										
										

										/*
										 * Initialse DataTables, with no sorting on the 'details' column
										 */
										ownerBugDataTable = $('#ownerBugTable').dataTable( {
											"sDom": 'R<C>H<"clear"><"ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix"lfr>t<"ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix"i<"ownerButtonPlaceholder">p>',
											//"sDom": 'R<C><"ownerButtonPlaceholder">H<"clear">',
											"bProcessing": true,
											/* "bLengthChange":false,
											"bPaginate":false, */
											"fnRowCallback":  truncatTextReder,
											"aoColumnDefs": [
												{ "bSortable": false, "aTargets": [ 0 ] }
											], 
											"aaSorting": [[1, 'asc']],
											"bJQueryUI": true,
											"sPaginationType": "full_numbers",
											"aaData": ownerRecordList,
											"aoColumns": [
									            { sWidth: '5%' },
									            { sWidth: '10%' },
									            { sWidth: '39%' },
									            { sWidth: '1%',
									            "bVisible":    false  },
									            { sWidth: '15%' },
									            { sWidth: '10%' },
									            { sWidth: '10%' },
									            { sWidth: '10%' }
									            ]
										});
										
										
										
										ownerBugDataTable.rowGrouping({
											iGroupingColumnIndex:3,
											bExpandableGrouping: true,
										});
										
										ownerBugDataTable.makeEditable({
											sUpdateURL: function(value, settings)
											{
		                             			return(value); //Simulation of server-side response using a callback function
											},
											"aoColumns": 
											[
											  null,
											  null,
											  null,
											  {
											    cssclass:"required",
											  	indicator: 'Saving component...',
											  	tooltip: 'Double click to modify component',
											  	loadtext: 'loading...',
											  	 type: 'select',
											  	 onblur: 'submit',
											  	 data: "{'':'Please select...', 'None':'None','DDC-ADIdentity Service':'DDC-ADIdentity Service','DDC-Broker Service':'DDC-Broker Service','DDC-Configuration Service':'DDC-Configuration Service','DDC-Configuration Logging Service':'DDC-Configuration Logging Service','DDC-Delegated Admin Service':'DDC-Delegated Admin Service','DDC-Event Test Service':'DDC-Event Test Service','DDC-Host Service':'DDC-Host Service','DDC-Machine Creation Service':'DDC-Machine Creation Service','DDC-Scout(Taas)':'DDC-Scout(Taas)','VDA-Broker Agent(VDA)':'VDA-Broker Agent(VDA)','VDA-Machine Identity Service Agent':'VDA-Machine Identity Service Agent','HDX-ICA HostCore':'HDX-ICA HostCore','HDX-ICA Graphics':'HDX-ICA Graphics','HDX-ICA Integration':'HDX-ICA Integration','HDX-ICA IO':'HDX-ICA IO','HDX-ICA Multimedia':'HDX-ICA Multimedia','HDX-ICA Printing':'HDX-ICA Printing','HDX-ICA Packaging':'HDX-ICA Packaging','Director':'Director','Group Policy':'Group Policy','Studio':'Studio','Licensing':'Licensing','Monitoring Service':'Monitoring Service','StoreFront':'StoreFront','MetaInstaller':'MetaInstaller','AppV':'AppV','PVD':'PVD','PVS':'PVS'}",
											  	 sUpdateURL:  function(value, settings)
						                                {
						                                		var heads=$("#ownerBugTable th");
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
						                                		var bugId=nTr.childNodes[index].childNodes[0].innerText;
						                                		
						                                		$.ajax({
																	type : "post",
																	url : "/BugTrackingSystem/api/bug?method=put&id="+id+"&bugId="+bugId+"&component="+value,
																	success : function(data) {
																			 alertify.log(data,"success");
   																    		 //alert(data) ;  
   																    		}
																	});
						                                        return(value);
						                                }
												
											  },
											  null,
											  null,
											  null
											]
										
										}); 
										
										$(".ownerButtonPlaceholder").html("<button id='updateAllOwnerListBtn' name='updateAllOwnerListBtn' style='margin-left : 15px' class='btn btn-default' data-loading-text='Loading'>updateall</button>");
										$(".ownerButtonPlaceholder").css("width","10%");
										$(".ownerButtonPlaceholder").css("float","right");
										//if ($.isFunction($.bootstrapIE6)) $.bootstrapIE6("#ownerBugTable");
										var  differentRecordList=[];				
										$.each(
														dataObj.changedList,
														function(i,
																warppedBuginfo) {
															var buginfo = warppedBuginfo.buginfo;
															var record=[];
															record.push("<img src='assets/images/details_open.png' >");
															record.push("<a data-id="
																					+ buginfo.id																				
																					+ " style='text-decoration : none ' onclick='return false'>"
																					+ buginfo.bugId
																					+ "</a>");
															record.push("<a href='http://onebug.citrite.net/tmtrack/tmtrack.dll?IssuePage&RecordId="
																					+ buginfo.bugId
																					+ "&Template=view&TableId=1000'  target='view_window' title='"
																					+buginfo.title+"'>"
																					+ buginfo.title
																					+ "</a>");
															record.push(buginfo.project);
															record.push(buginfo.component);
															record.push(warppedBuginfo.newOwner);
															record.push(buginfo.status);
															record.push("<label class='radio'><input type='radio' form='differentForm' name='radio_" + buginfo.id + "_" + warppedBuginfo.managedBugId + "' value='manage' \/\>manage</label>"
																					+ "<label class='radio'><input type='radio' form='differentForm'  name='radio_" + buginfo.id + "_" + warppedBuginfo.managedBugId + "' value='ingore' \/\>ingore </label>");
															
															differentRecordList.push(record);
															
														});
										differentBugDataTable = $('#differentBugTable').dataTable( {
											"sDom": 'R<C>H<"clear"><"ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix"lfr>t<"ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix"i<"diffentButtonPlaceholder">p>',
											"bProcessing": true,
											/* "bLengthChange":false,
											"bPaginate":false, */
											"fnRowCallback":  truncatTextReder,
											"aoColumnDefs": [
												{ "bSortable": false, "aTargets": [ 0 ] }
											], 
											"aaSorting": [[1, 'asc']],
											"bJQueryUI": true,
											"sPaginationType": "full_numbers",
											"aaData": differentRecordList,
											"aoColumns": [
									            { sWidth: '5%' },
									            { sWidth: '10%' },
									            { sWidth: '39%' },
									            { sWidth: '1%',
									            "bVisible":    false  },
									            { sWidth: '15%' },
									            { sWidth: '10%' },
									            { sWidth: '10%' },
									            { sWidth: '10%' }
									            ]
										});
										
										differentBugDataTable.rowGrouping({
											iGroupingColumnIndex:3,
											bExpandableGrouping: true,
										});
										
										differentBugDataTable.makeEditable({
											sUpdateURL: function(value, settings)
											{
		                             			return(value); //Simulation of server-side response using a callback function
											},
											"aoColumns": 
											[
											  null,
											  null,
											  null,
											  {
											    cssclass:"required",
											  	indicator: 'Saving component...',
											  	tooltip: 'Double click to modify component',
											  	loadtext: 'loading...',
											  	 type: 'select',
											  	 onblur: 'submit',
											  	 data: "{'':'Please select...', 'None':'None','DDC-ADIdentity Service':'DDC-ADIdentity Service','DDC-Broker Service':'DDC-Broker Service','DDC-Configuration Service':'DDC-Configuration Service','DDC-Configuration Logging Service':'DDC-Configuration Logging Service','DDC-Delegated Admin Service':'DDC-Delegated Admin Service','DDC-Event Test Service':'DDC-Event Test Service','DDC-Host Service':'DDC-Host Service','DDC-Machine Creation Service':'DDC-Machine Creation Service','DDC-Scout(Taas)':'DDC-Scout(Taas)','VDA-Broker Agent(VDA)':'VDA-Broker Agent(VDA)','VDA-Machine Identity Service Agent':'VDA-Machine Identity Service Agent','HDX-ICA HostCore':'HDX-ICA HostCore','HDX-ICA Graphics':'HDX-ICA Graphics','HDX-ICA Integration':'HDX-ICA Integration','HDX-ICA IO':'HDX-ICA IO','HDX-ICA Multimedia':'HDX-ICA Multimedia','HDX-ICA Printing':'HDX-ICA Printing','HDX-ICA Packaging':'HDX-ICA Packaging','Director':'Director','Group Policy':'Group Policy','Studio':'Studio','Licensing':'Licensing','Monitoring Service':'Monitoring Service','StoreFront':'StoreFront','MetaInstaller':'MetaInstaller','AppV':'AppV','PVD':'PVD','PVS':'PVS'}",
											  	 sUpdateURL:  function(value, settings)
						                                {
						                                		var heads=$("#differentBugTable th");
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
						                                		var bugId=nTr.childNodes[index].childNodes[0].innerText;
						                                		
						                                		$.ajax({
																	type : "post",
																	url : "/BugTrackingSystem/api/bug?method=put&id="+id+"&bugId="+bugId+"&component="+value,
																	success : function(data) {
																			 alertify.log(data,"success");
   																    		// alert(data) ;  
   																    		}
																	});
						                                        return(value);
						                                }
												
											  },
											  null,
											  null,
											  null
											]
										
										}); 
										
										$(".diffentButtonPlaceholder").html("<button id='modifyBtn' name='modifyBtn' class='btn btn-default' style='margin-left : 15px' onclick='javascript:modifyBtnClick()' type='button' data-loading-text='Loading'>modify</button>");
										$(".diffentButtonPlaceholder").css("width","10%");
										$(".diffentButtonPlaceholder").css("float","right");
										//if ($.isFunction($.bootstrapIE6)) $.bootstrapIE6("#differentBugTable");

									},

									error : function(XMLHttpRequest,
											textStatus, errorThrown) {

									},

									complete : function(XMLHttpRequest,
											textStatus) {

									}
								});

						var updateAllOwnerListBtn = $("#updateAllOwnerListBtn");
						$(document).delegate('#updateAllOwnerListBtn','click',function () {
									updateAllOwnerListBtn.button('loading');
									var table = $("#ownerBugTableBody");
									var _map = new Object();

									var i = 0;

									table.find('tr').each(
													function(index, row) {
														var allCells = $(row)
																.find('td');
													    // ignore the group row which only has one row data
														if(allCells.length>1){
															var anchor = allCells[1]
																.getElementsByTagName("a")[0];
															var bugId = anchor.innerHTML;
															var id = anchor
																	.getAttribute(
																			"data-id");

	
															var btn = $("#status_"
																	+ id);
															btn.button('loading');
	
															_map[id] = bugId;
															i++;

														}
														
													});

									$.ajax({
												type : "post",
												url : "/BugTrackingSystem/api/bugStatus",
												data : _map,
												cache : false,
												success : function(data) {
													var dataObj = data;
													$.each(
																	dataObj,
																	function(i,
																			obj) {
																		for ( var id in obj) {
																			var newStatus = obj[id];
																			var btn = $("#status_"
																					+ id);
																			btn
																					.button('reset');
																			$(
																					"#label_status_"
																							+ id)
																					.text(
																							newStatus);
																		}
																	});

												},

												error : function(
														XMLHttpRequest,
														textStatus, errorThrown) {
													alertify.log("updating error! Please try again","error");
													//alert("updating error! Please try again");
												},

												complete : function(
														XMLHttpRequest,
														textStatus) {
													updateAllOwnerListBtn
															.button('reset');
												}
											});

								});

						var updateAllManagedListBtn = $("#updateAllManagedListBtn");
						$(document).delegate('#updateAllManagedListBtn','click',function () {
									updateAllManagedListBtn.button('loading');
									var table = $("#managedBugTableBody");
									var _map = new Object();

									var i = 0;

									table
											.find('tr')
											.each(
													function(index, row) {
														var allCells = $(row)
																.find('td');
														if(allCells.length>1){
															var anchor = allCells[1]
																.getElementsByTagName("a")[0];
															var bugId = anchor.innerHTML;
															var id = anchor
																	.getAttribute(
																			"data-id");
	
															var btn = $("#status_"
																	+ id);
															btn.button('loading');
	
															_map[id] = bugId;
															i++;
															
														
														}
														
													});

									$.ajax({
												type : "post",
												url : "/BugTrackingSystem/api/bugStatus",
												data : _map,
												cache : false,
												success : function(data) {
													var dataObj = data;
													$
															.each(
																	dataObj,
																	function(i,
																			obj) {
																		for ( var id in obj) {
																			var newStatus = obj[id];
																			var btn = $("#status_"
																					+ id);
																			btn
																					.button('reset');
																			$(
																					"#label_status_"
																							+ id)
																					.text(
																							newStatus);
																		}
																	});

												},

												error : function(
														XMLHttpRequest,
														textStatus, errorThrown) {
													alertify.log("updating error! Please try again","error");
													//alert("updating error! Please try again");
												},

												complete : function(
														XMLHttpRequest,
														textStatus) {
													updateAllManagedListBtn
															.button('reset');
												}
											});

								});


					$(document).delegate('#ownerBugTable tbody td img','click',function () {
					    var heads=$("#ownerBugTable th");
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
						
				       		//alert("hello");
							if ( ownerBugDataTable.fnIsOpen(nTr) )
							{
								//This row is already open - close it
								this.src = "assets/images/details_open.png";
								ownerBugDataTable.fnClose( nTr );
							}
							else
							{
								//Open this row
								this.src = "assets/images/details_close.png";
								$.ajax({
									type: "get",
									url: "/BugTrackingSystem/api/bug?id=" + id,
									data: "",
									cache: false,
									success: function (data) {
										bugInfo = data;
									    var sOut= getBugInfoTable(bugInfo);										
										ownerBugDataTable.fnOpen( nTr, sOut, 'details' );
										
										}
									});
							}							
						} );
						
					
	
					$(document).delegate('#managedBugTable tbody td img','click',function () {
					 var heads=$("#managedBugTable th");
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
						
				       		
							if ( managerBugDataTable.fnIsOpen(nTr) )
							{
								//alert("hello");
								//This row is already open - close it
								this.src = "assets/images/details_open.png";
								managerBugDataTable.fnClose( nTr );
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
										managerBugDataTable.fnOpen( nTr, sOut, 'details' );
										
										}
									});
							}							
						} );
						
						
						$(document).delegate('#differentBugTable tbody td img','click',function () {
						var heads=$("#differentBugTable th");
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
						
				       		//alert("hello");
							if ( differentBugDataTable.fnIsOpen(nTr) )
							{
								//This row is already open - close it
								this.src = "assets/images/details_open.png";
								differentBugDataTable.fnClose( nTr );
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
										differentBugDataTable.fnOpen( nTr, sOut, 'details' );
										
										}
									});
							}							
						} );
						
			});
	
	
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

				       
	function modifyBtnClick() {
		var modifyBtn = $("#modifyBtn");
		var differentFrame = $("#differentForm");

		modifyBtn.button('loading');
		$.ajax({
			method : differentFrame.attr('method'),
			url : differentFrame.attr('action'),
			data : differentFrame.serialize(),
			cache : false,
			success : function(data) {
			    alertify.log(data,"success");
				//alert(data);
				window.location.reload();
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {

			},

			complete : function(XMLHttpRequest, textStatus) {
				modifyBtn.button('reset');
			}
		});
	}