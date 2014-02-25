	var ownerBugDataTable;
	var managerBugDataTable;
	
	function ellipsis(text, n) {
	    if(text.length>n)
	        return text.substring(0,n)+"...";
	    else
	        return text;
    }

    function truncatTextReder( nRow, aData, iDisplayIndex) 
    {
        var $cell=$('td:eq(2)', nRow);
        // truncated text
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
	
   	function operateManagedBugs(managedBugId, id, operate) {
   		var operateManagedBtn = $("#operateManagedBtn_" + managedBugId);
		var buttonStr=operateManagedBtn.html();
		if(buttonStr=='Ignore'){
			operate=ingoreCmd;
		}
		else if (buttonStr=='Restore'){
			operate=restoreCmd;
		}
   		operateManagedBtn.button('loading');
   		
   		$.ajax({
			type: "post",
			url: "/BugTrackingSystem/api/managed?method=put&operate=" +  operate + "&managedBugId=" + managedBugId + "&id=" + id,
			data: "",
			cache : false,
			success: function (data) {
			    alertify.log(data,"success");
				//alert(data);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
					
				},
				
			complete: function (XMLHttpRequest, textStatus) {
					 operateManagedBtn.button("reset");
					 if(operate==ingoreCmd){				
						operateManagedBtn.html('Restore');
					 }
					else if(operate==restoreCmd){
						operateManagedBtn.html('Ignore');	
					}
					//operateManagedBtn.enable();
				}
		});
   	} 
   	

	function deleteOwnerBugs(managedBugId, id) {
		
	}
	
	function operateOwnerBugs(managedBugId, id, operate) {
		var operateOwnerBtn = $("#operateOwnerBtn_" + managedBugId);
		var buttonStr=operateOwnerBtn.html();
		if(buttonStr=='Ignore'){
			operate=ingoreCmd;
		}
		else if (buttonStr=='Restore'){
			operate=restoreCmd;
		}
		operateOwnerBtn.button('loading');
		$.ajax({
			type: "post",
			url: "/BugTrackingSystem/api/owner?method=put&operate=" + operate + "&managedBugId=" + managedBugId + "&id=" + id,
			data: "",
			cache : false,
			success: function (data) {
				alertify.log(data,"success");
				//alert(data);
				//window.location.reload();
			},
			
			error : function(XMLHttpRequest, textStatus, errorThrown) {
					
			},
				
			complete: function (XMLHttpRequest, textStatus) {
				operateOwnerBtn.button('reset');
				 if(operate==ingoreCmd){				
					operateOwnerBtn.html('Restore');
				 }
				else if(operate==restoreCmd){
					operateOwnerBtn.html('Ignore');	
				}
			}
		});
	}
	
	var ingoreCmd = "ingore";
	var restoreCmd = "restore";
	
	var managedText = "managed";
	var notManagedText = "not-managed";
	
	$(document).ready(function(){
		$("#historyBugsJSPNav").addClass("active");
			
		$.ajax({
			type: "get",
			url: "/BugTrackingSystem/api/managed",
			data: "",
			cache : false,
			success: function (data) {
				var dataObj = data;
				var  managedRecordList=[];
			
				$.each(dataObj, function(i,warppedBuginfo) {
					
					var buginfo = warppedBuginfo.buginfo;
					var operationBtn = "";
					var managedDisplay = "";
					
					if (warppedBuginfo.status == 0) {
						operationBtn = "<button id = 'operateManagedBtn_" +  warppedBuginfo.managedBugId + "' class='btn btn-default' type='button' data-loading-text='Loading...' onclick= " + "javascript:operateManagedBugs('"   + warppedBuginfo.managedBugId + "','" + buginfo.id + "','" + ingoreCmd +"')>Ingore</button>";
						managedDisplay = managedText;
					} else {
						operationBtn = "<button id = 'operateManagedBtn_" +  warppedBuginfo.managedBugId + "' class='btn btn-default' type='button' data-loading-text='Loading...' onclick= " + "javascript:operateManagedBugs('"   + warppedBuginfo.managedBugId + "','" + buginfo.id + "','" +  restoreCmd + "')>Restore</button>";
						managedDisplay = notManagedText;
					}
					var record = [];
					record.push("<img src='assets/images/details_open.png' >");
					record.push("<td><a data-id=" + buginfo.id + " style='text-decoration : none ' onclick='return false'>" + buginfo.bugId + "</a>");
					record.push("<a href='http://onebug.citrite.net/tmtrack/tmtrack.dll?IssuePage&RecordId=" + buginfo.bugId + "&Template=view&TableId=1000' target='view_window' title='"+buginfo.title+"'>" + buginfo.title + "</a>");
					record.push(buginfo.project);
					record.push(buginfo.owner);
					record.push(buginfo.status);
					record.push(managedDisplay);
					record.push(operationBtn + "<button class='btn btn-default historyDelete' type='button' id='deleteManagedBtn_" + warppedBuginfo.managedBugId + "' data-bugId='"+buginfo.id+"'data-manageId='"+warppedBuginfo.managedBugId+"' data-loading-text='Loading...' " + ")>Delete</button>");
					managedRecordList.push(record);
					
					
				});
				managerBugDataTable = $('#historyBugsTable').dataTable( {
											"bProcessing": true,
											/* "bLengthChange":false,
											"bPaginate":false, */
											"fnRowCallback":  truncatTextReder,
											"sDom": 'R<C>H<"clear"><"ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix"lfr>t<"ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix"ip>',
											"aoColumnDefs": [
												{ "bSortable": false, "aTargets": [ 0 ] }
											], 
											"aaSorting": [[1, 'asc']],
											"bJQueryUI": true,
											"sPaginationType": "full_numbers",
											"aaData": managedRecordList,
											"aoColumns": [
									            { sWidth: '5%' },
									            { sWidth: '10%' },
									            { sWidth: '30%' },
									            { sWidth: '10%' ,
									            "bVisible":    false },
									            { sWidth: '10%' },
									            { sWidth: '10%' },
									            { sWidth: '10%' },
									            { sWidth: '15%' }
									            ]
										});		
				managerBugDataTable.rowGrouping({
					iGroupingColumnIndex:3,
					bExpandableGrouping: true,
				});
			}	
		});
					
				
		$.ajax({
			type: "get",
			url: "/BugTrackingSystem/api/owner",
			data: "",
			cache : false,
			success: function (data) {
				var dataObj = data;
				var ownerRecordList=[];
				$.each(dataObj, function(i,warppedBuginfo) {
					var record=[];
					var buginfo = warppedBuginfo.buginfo;
					var operationBtn = "";
					var managedDisplay = "";
					
					if (warppedBuginfo.status == 0) {
						operationBtn = "<button id = 'operateOwnerBtn_" +  warppedBuginfo.managedBugId + "' class='btn btn-default' type='button' data-loading-text='Loading...' onclick= " + "javascript:operateOwnerBugs('"  + warppedBuginfo.managedBugId + "','" + buginfo.id + "','" + ingoreCmd +"')>Ingore</button>";
						managedDisplay = managedText;
					} else {
						operationBtn = "<button id = 'operateOwnerBtn_" +  warppedBuginfo.managedBugId + "' class='btn btn-default' type='button' data-loading-text='Loading...' onclick= " + "javascript:operateOwnerBugs('" + warppedBuginfo.managedBugId + "','" + buginfo.id + "','" + restoreCmd + "')>Restore</button>";
						managedDisplay = notManagedText;
					} 
					record.push("<img src='assets/images/details_open.png' >");
					record.push("<td><a data-id=" + buginfo.id + " style='text-decoration : none ' onclick='return false'>" + buginfo.bugId + "</a>");
					record.push("<a href='http://onebug.citrite.net/tmtrack/tmtrack.dll?IssuePage&RecordId=" + buginfo.bugId + "&Template=view&TableId=1000' target='view_window' title='"+buginfo.title+"'>" + buginfo.title  + "</a>");
					record.push(buginfo.project);
					record.push(buginfo.owner);
					record.push(buginfo.status);
					record.push(managedDisplay);
					//record.push(operationBtn + "<button class='btn btn-default ' type='button' id='deleteManagedBtn_" + warppedBuginfo.managedBugId +  "' data-loading-text='Loading...' onclick= " + "javascript:deleteManagedBugs('" + warppedBuginfo.managedBugId + "','" + buginfo.id + "')>Delete</button>");
					record.push(operationBtn + "<button class='btn btn-default owernerDelete' type='button' id='deleteManagedBtn_" + warppedBuginfo.managedBugId + "' data-bugId='"+buginfo.id+"'data-manageId='"+warppedBuginfo.managedBugId+"' data-loading-text='Loading...' " + ")>Delete</button>");
					ownerRecordList.push(record);
					
				});
				ownerBugDataTable = $('#ownerBugsTable').dataTable( {
											"bProcessing": true,
											/* "bLengthChange":false,
											"bPaginate":false, */
											"fnRowCallback":  truncatTextReder,
											"sDom": 'R<C>H<"clear"><"ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix"lfr>t<"ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix"ip>',
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
									            { sWidth: '30%' },
									            { sWidth: '10%' ,
									            "bVisible":    false },
									            { sWidth: '10%' },
									            { sWidth: '10%' },
									            { sWidth: '10%' },
									            { sWidth: '15%' }
									            ]
										});		
				ownerBugDataTable.rowGrouping({
					iGroupingColumnIndex:3,
					bExpandableGrouping: true,
				});
			}
		});
		$(document).delegate('#historyBugsTable tbody td img','click',function () {
						var heads=$("#historyBugsTable th");
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
							if ( managerBugDataTable.fnIsOpen(nTr) )
							{
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
		$(document).delegate('#ownerBugsTable tbody td img','click',function () {
						var heads=$("#ownerBugsTable th");
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

		$(document).delegate('.historyDelete','click',function () {
						var managedBugId=$(this).attr("data-manageid");
						var id=$(this).attr("data-bugid");
						var row = $(this).closest("tr").get(0);
						var rowId=managerBugDataTable.fnGetPosition(row);
						var deleteBtn = $("#deleteManagedBtn_" + managedBugId);
						deleteBtn.button('loading');
						$.ajax({
							type: "delete",
							url: "/BugTrackingSystem/api/managed?managedBugId=" + managedBugId + "&id=" + id,
							data: "",
							cache : false,
							success: function (data) {
							    alertify.log(data,"success");
								//alert(data);
								
								//window.location.reload();
							},
							error : function(XMLHttpRequest, textStatus, errorThrown) {
									
								},
								
							complete: function (XMLHttpRequest, textStatus) {
									deleteBtn.button('reset');
									managerBugDataTable.fnDeleteRow(rowId);
								}
						});
				       				
		} );	
		$(document).delegate('.owernerDelete','click',function () {
						var managedBugId=$(this).attr("data-manageid");
						var id=$(this).attr("data-bugid");
						var row = $(this).closest("tr").get(0);
						var rowId=managerBugDataTable.fnGetPosition(row);
						var deleteBtn = $("#deleteOwnerBtn_" + id);
						deleteBtn.button('loading');
						$.ajax({
							type: "delete",
							url: "/BugTrackingSystem/api/owner?managedBugId=" + managedBugId + "&id=" + id,
							data: "",
							cache : false,
							success: function (data) {
								alertify.log(data,"success");
								//alert(data);
								//window.location.reload();
							},
							
							error : function(XMLHttpRequest, textStatus, errorThrown) {
									
							},
								
							complete: function (XMLHttpRequest, textStatus) {
								deleteBtn.button('reset');
								ownerBugDataTable.fnDeleteRow(rowId);
							}
						});
				       				
		} );			
	});