<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE HTML>
<html>
<head>

<title>Main Frame</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- @if NODE_ENV == 'DEVELOPMENT' -->
	<link rel="stylesheet" href="assets/css/bootstrap.min.css" />
    <link rel="stylesheet" href="assets/css/bootstrap.validation.css"/>
	<link rel="stylesheet" href="assets/css/jquery.dataTables.demo_page.css" />
	<link rel="stylesheet" href="assets/css/jquery.dataTables.demo_table_jui.css" />
	<link rel="stylesheet" href="assets/css/jquery.ui-1.8.4.custom.css" />
	<link rel="stylesheet" href="assets/css/custom.placeholder.css" />
	<link rel="stylesheet" href="assets/css/alertify.core.css" />
	<link rel="stylesheet" href="assets/css/alertify.default.css" /> 
<!-- @endif -->

<!-- @if NODE_ENV == 'PRODUCTION' -->
	<link rel="stylesheet" href="assets/css/mainFrame.min.css" />
<!-- @endif -->

</head>

<body>
	<nav class="navbar navbar-default navbar-fixed-top" role="navigation" >
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target=".navbar-collapse">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand" >Bug Tracker  Admin</a>
			</div>
			<div class="collapse navbar-collapse">
				<ul class="nav navbar-nav" id="nav">
					<li id="mainFrameJSPNav"><a href="" class="external" >DashBoard</a></li>
					
					<li id="UsersNav"><a href="#section-1" title="scroll to user table">Users
							Info</a></li>
					<li id="ManagedBugsNav"><a href="#section-2" title="scroll to managed bugs table">Managed Bugs
							</a></li>
					<li id="OwnedBugsNav"><a href="#section-3" title="scroll to owned bugs table">Owned Bugs
							</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li id="feedbackNav"><a href='http://10.158.2.124:8050/feedback/' >Feedback</a></li>
					<li id="logoutNav"><a href="#">Logout</a></li>
				</ul>		
			</div>
		</div>
	</nav>


	<div class="container" style="padding-top:70px" id="section-1">
		<div class="row">
			<div id="userInfoDiv" class="col-lg-12">


				<div class="col-lg-4">
					<h3>Users Info</h3>
				</div>

				<div>

					<br />
					
					<table id="userInfoTable" class="table display" cellpadding="0"
						cellspacing="0" border="0">

						<thead>
							<tr>
								<th>ID</th>
								<th>UserName</th>
								<th>Password</th>
								<th>OneBugFullName</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody id="userInfoTableBody">

						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	
	<div class="container"  id="section-2">
		<div class="row">
			<div id="managedBugDiv" class="col-lg-12">


				<div class="col-lg-4">
					<h3>Managed Bugs</h3>
				</div>

				<div>

					<br />
					
					<table id="managedBugsTable" class="table display" cellpadding="0"
						cellspacing="0" border="0">

						<thead>
							<tr>
								<th><!-- Detail --></th>
								<th>BugId</th>
								<th>Title</th>
								<th>UserName</th>
								<th>Project</th>
								<th>Component</th>
								<th>Owner</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody id="managedBugsTableBody">

						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	
	<div class="container" id="section-3">
		<div class="row">
			<div id="ownedBugDiv" class="col-lg-12">


				<div class="col-lg-4">
					<h3>Owned Bugs</h3>
				</div>

				<div>

					<br />
					
					<table id="ownedBugsTable" class="table display" cellpadding="0"
						cellspacing="0" border="0">

						<thead>
							<tr>
								<th><!-- Detail --></th>
								<th>BugId</th>
								<th>Title</th>
								<th>UserName</th>
								<th>Project</th>
								<th>Component</th>
								<th>Owner</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody id="ownedBugsTableBody">

						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	
<div class="modal  fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="userModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" id="user-modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title " id="userModalLabel">Add New User:</h4>
      </div>
      <div class="modal-body " style="margin-bottom:0px,padding-bottom:0px">
        <form id="addUserForm" name="bugInfoForm" action="/BugTrackingSystemAdmin/api/userinfo" method="post" class="well form-horizontal" style="margin-bottom:0px,padding-bottom:0px">
				  		    <fieldset>
				  		    
				  		   <div class="form-group">
					  		    <label class="control-label col-lg-3">Username</label> 
					  		   	<div class="col-lg-9">
					  		    <input id="username" class="form-control col-lg-9" type="text" name="username" placeholder="Username" style="width:80%" > 
					  		    </div>
				  		    </div>
				  		    
				  		    
				  		    <div class="form-group">
					  		    <label class="control-label col-lg-3">Password</label> 
					  		   	<div class="col-lg-9">
					  		    <input id="password" class="form-control col-lg-9 " type="password" name="password" placeholder="Password" style="width:80%"> 
					  		    </div>
				  		    </div>
				  		    
				  		    
				  		    <div class="form-group">
					  		    <label class="control-label col-lg-3">OneBug FullName</label> 
					  		   	<div class="col-lg-9">
					  		    <input id="oneBugFullName" class="form-control col-lg-9" type="text" name="oneBugFullName" placeholder="OneBugFullName" style="width:80%"> 
					  		    </div>
				  		    </div>
				  		    
				  		     <div class="form-group">
					  		    <label class="control-label col-lg-3">Email</label> 
					  		   	<div class="col-lg-9">
					  		    <input id="email" class="form-control col-lg-9" type="text" name="email" placeholder="Email" style="width:80%"> 
					  		    </div>
				  		    </div>
				  		    
				  			</fieldset>
						</form>
      </div>
	  <div class="modal-footer">
        <button type="button" class="btn btn-default " data-dismiss="modal">Close</button>
		<button type="submit" class="btn btn-primary" id="userInfoFormSb" form="addUserForm"  data-loading-text="Loading...">OK</button>
      </div>
      
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div class="modal  fade" id="addManagedBugModal" tabindex="-1" role="dialog" aria-labelledby="managedBugModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" id="managedBug-modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title " id="managedBugModalLabel">Add New Managed Bug:</h4>
      </div>
      <div class="modal-body " style="margin-bottom:0px,padding-bottom:0px">
        <form id="addManagedBugForm" name="bugInfoForm" action="/BugTrackingSystemAdmin/api/managedBugs" method="post" class="well form-horizontal" style="margin-bottom:0px,padding-bottom:0px">
				  		    <fieldset id="managedFiledSet">
				  		      <div class="form-group" id="managedUser">
					  		    <label class="control-label col-lg-3" for="userinfoId">UserName</label>
					  		    <div class="col-lg-7">

					  		    	<select id="managedUserId"  name="userinfoId" class="form-control" style="width:60%">
					  		    		
					  		    	</select>
					  		    </div>
					  		</div>
    
				  		     <div class="form-group" id="managedBug">
					  		    <label class="control-label col-lg-3">BugId</label> 
					  		   	<div class="col-lg-7">
					  		    <input id="managedBugId" class="form-control col-lg-9" type="text" name="buginfoId" placeholder="BugId" style="width:60% "> 
					  		    <button class="btn btn-primary " disabled="disabled" type="button"  id="managedBugFind"  data-loading-text="Loading..." style="margin-left:3px">Find</button>
					  		    </div>
				  		    </div>
				  		    

					  			
					  	   <div id="bugContent">		
					  		<div class="form-group ">
					  			<label class="control-label col-lg-3" for="title">Title </label>
					  			
					  			<div class="col-lg-8">
					  			<input class="form-control" id="managedTitle" readonly="true" name="title" type="text" value=""/>
					  			</div>
					  		</div>
					  		
					  		<div class="form-group ">
					  			<label class="control-label col-lg-3" for="project">Project </label>
					  			<div class="col-lg-8">
					  			<input class="form-control" id="managedProject" readonly="true" name="project" type="text" value=""/>
					  			</div>
					  		</div>
					  		
					  		<div class="form-group ">
					  			<label class="control-label col-lg-3" for="project">Component </label>
					  			<div class="col-lg-8">
					  			<input class="form-control" id="managedComponent" readonly="true" name="component" type="text" value=""/>
					  			</div>
					  		</div>
					  		
					  		<div class="form-group ">
					  			<label class="control-label col-lg-3" for="type">Type </label>
					  			<div class="col-lg-8">
					  			<input class="form-control" id="managedType" readonly="true" name="type" type="text" value=""/>
					  			</div>
					  		</div>
					  		
					  		<div class="form-group ">
					  			<label class="control-label col-lg-3" for="status">Status </label>
					  			
					  			<div class="col-lg-8">
					  			<input class="form-control" id="managedStatus" readonly="true" name="status" type="text" value=""/>
					  			</div>
					  		</div>
					  		
					  		
					  		<div class="form-group ">
					  			<label class="control-label col-lg-3" for="description">Description</label>
					  			
					  			<div class="col-lg-8">
					  			<textarea  class="form-control" id="managedDescription" readonly="true" name="description" type="text" rows="3" value=""></textarea>
					  			</div>
					  		</div>
					  		
					  		
					  		<div class="form-group ">
					  			<label class="control-label col-lg-3" for="owner">Owner</label>
					  			<div class="col-lg-8">
					  			<input class="form-control" id="managedOwner" readonly="true" name="owner" type="text" value=""/>
					  			</div>
					  		</div>
					  		
					  		<div class="form-group ">
					  			<label class="control-label col-lg-3" for="submitter">Submitter</label>
					  			
					  			<div class="col-lg-8">
					  			<input class="form-control" id="managedSubmitter" readonly="true" name="submitter" type="text" value=""/>
					  			</div>
					  		</div>
					  		
					  		<div class="form-group ">
					  			<label class="control-label col-lg-3" for="submitData">SumitterData</label>
					  			<div class="col-lg-8">
					  			<input class="form-control" id="managedSubmitData"  readonly="true" name="submitData" type="text" value=""/>
					  			</div>
					  		</div>
					  		
					  		<div class="form-group ">
					  			<label class="control-label col-lg-3" for="severity">Severity</label>
					  			<div class="col-lg-8">
					  			<input class="form-control" id="managedSeverity" readonly="true" name="severity" type="text" value=""/>
					  			</div>
					  		</div>
					  		
					  		
					  		<div class="form-group ">
					  			<label class="control-label col-lg-3" for="tags">Tags </label>
					  			<div class="col-lg-8">
					  			<input class="form-control" id="managedTags" readonly="true" name="tags" type="text" value=""/>
					  			</div>
					  		</div>
					  		
					  		<div class="form-group ">
					  			<label class="control-label col-lg-3" for="regression">Rgression </label>
					  			<div class="col-lg-8">	
					  			<input class="form-control" id="mangedRegression" class="btn btn-default"  readonly="true" name="regression" type="text" value=""/>
					  			</div>
					  		</div>
				  		    </div>
				  			</fieldset>
						</form>
      </div>
	  <div class="modal-footer">
        <button type="button" class="btn btn-default " data-dismiss="modal">Close</button>
		<button type="submit" class="btn btn-primary" id="managedBugFormSb" form="addManagedBugForm"  data-loading-text="Loading...">OK</button>
      </div>
      
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->


<div class="modal  fade" id="addOwnedBugModal" tabindex="-1" role="dialog" aria-labelledby="ownedBugModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header" id="ownedBug-modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title " id="ownedBugModalLabel">Add New Owned Bug:</h4>
      </div>
      <div class="modal-body " style="margin-bottom:0px,padding-bottom:0px">
        <form id="addOwnedBugForm" name="bugInfoForm" action="/BugTrackingSystemAdmin/api/ownerBugs" method="post" class="well form-horizontal" style="margin-bottom:0px,padding-bottom:0px">
				  		    <fieldset>
				  		    
				  		   <div class="form-group">
					  		    <label class="control-label col-lg-3">Username</label> 
					  		   	<div class="col-lg-9">
					  		    <input id="username" class="form-control col-lg-9" type="text" name="username" placeholder="Username" style="width:80%" > 
					  		    </div>
				  		    </div>
				  		    

				  		    
				  		     <div class="form-group">
					  		    <label class="control-label col-lg-3">Email</label> 
					  		   	<div class="col-lg-9">
					  		    <input id="email" class="form-control col-lg-9" type="text" name="email" placeholder="Email" style="width:80%"> 
					  		    </div>
				  		    </div>
				  		    
				  			</fieldset>
						</form>
      </div>
	  <div class="modal-footer">
        <button type="button" class="btn btn-default " data-dismiss="modal">Close</button>
		<button type="submit" class="btn btn-primary" id="ownedBugFormSb" form="addOwnedBugForm"  data-loading-text="Loading...">OK</button>
      </div>
      
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<!-- @if NODE_ENV == 'DEVELOPMENT' -->
	<script src="assets/js/jquery-1.10.2.min.js"></script>	
	<script src="assets/js/jquery.scrollTo.js"></script>
	<script src="assets/js/jquery.nav.js"></script>	
	<script src="assets/js/jquery.validate.min.js" ></script>
	<script src="assets/js/jquery.placeholder.js" ></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/jquery.highlight-4.js"></script>
	<script src="assets/js/jquery.dataTables.js"></script>
	<script src="assets/js/jquery.dataTables.editable.js"></script>
	<script src="assets/js/jquery.jeditable.js"></script>
	<script src="assets/js/jquery.dataTables.rowGrouping.js"></script>
	<script src="assets/js/jquery.dataTables.colReorderWithResize.js"></script>
	<script src="assets/js/jquery-ui-1.10.4.custom.js"></script>	
	<script src="assets/js/alertify.min.js"></script>
	<!-- <script src="assets/js/custom.navigation.js"></script> -->
	<script src="assets/js/custom.mainFrame.js"></script>
	<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
	<!--[if lt IE 9]>
	 	 <script src="assets/js/custom.html5.js"></script>
	 	 <script src="assets/js/custom.respond.min.js"></script>
	<![endif]-->
<!-- @endif -->

<!-- @if NODE_ENV == 'PRODUCTION' -->
	<script src="assets/js/mainFrame.min.js"></script>
	<!--[if lt IE 9]>
	 	 <script src="assets/js/ltIE9.min.js"></script>
	<![endif]-->
 	 
<!-- @endif -->	
</body>
</html>
