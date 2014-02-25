<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE HTML>
<html>
<head>

<title>Main Frame</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<link rel="stylesheet" href="assets/css/bootstrap.min.css" />
	<link rel="stylesheet" href="assets/css/bootstrap.validation.css"/>
	<link rel="stylesheet" href="assets/css/jquery.dataTables.demo_page.css" />
	<link rel="stylesheet" href="assets/css/jquery.dataTables.demo_table_jui.css" />
	<link rel="stylesheet" href="assets/css/jquery.ui-1.8.4.custom.css" />
	<link rel="stylesheet" href="assets/css/custom.placeholder.css" />
	<link rel="stylesheet" href="assets/css/alertify.core.css" />
	<link rel="stylesheet" href="assets/css/alertify.default.css" />
</head>

<body>
	<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target=".navbar-collapse">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand" >Bug Tracking System Admin</a>
			</div>
			<div class="collapse navbar-collapse">
				<ul class="nav navbar-nav">
					<li id="mainFrameJSPNav"><a href="#">DashBoard</a></li>
					
					<li id="UsersNav"><a href="#">Users
							Info</a></li>
					<li id="ManagedBugsNav"><a href="#">Managed Bugs
							</a></li>
					<li id="OwnedBugsNav"><a href="#">Owned Bugs
							</a></li>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<li id="logoutNav"><a href="#">Logout</a></li>
				</ul>		
			</div>
		</div>
	</nav>


	<div class="container" style="padding-top:70px">
		<div class="row">
			<div id="ownerBugDiv" class="col-lg-12">


				<div class="col-lg-4">
					<h3>OwnerBugList</h3>
				</div>

				<div>
					<br />
					<table id="ownerBugTable" class="table display" cellpadding="0"
						cellspacing="0" border="0">

						<thead>
							<tr>
								<th>Detail</th>
								<th>BugId</th>
								<th>Title</th>
								<th>Project</th>
								<th>Component</th>
								<th>Owner</th>
								<th>Status</th>
								<th>Operation</th>
							</tr>
						</thead>
						<tbody id="ownerBugTableBody">

						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>


	<div class="container">
		<div class="row">
			<div id="managedBugDiv" class="col-lg-12">
				<div class="col-lg-4">
					<h3>ManagedBugList</h3>
				</div>
				<div>
					<br />
					<table id="managedBugTable"  class="table display" cellpadding="0"
						cellspacing="0" border="0">
						<thead>
							<tr>
								<th>Detail</th>
								<th>BugId</th>
								<th>Title</th>
								<th>Project</th>
								<th>Component</th>
								<th>Owner</th>
								<th>Status</th>
								<th>Operation</th>
							</tr>
						</thead>
						<tbody id="managedBugTableBody">

						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="row">
			<div class="col-lg-12">
				<div class="col-lg-4">
					<h3>ChangedBugList</h3>
				</div>


				<div id="differentDiv">

					<form id="differentForm" name="differentForm"
								action="/BugTrackingSystem/api/bugs?method=put" method="post">
					</form>
						<br />
						<table id="differentBugTable"  class="table display" cellpadding="0"
						cellspacing="0" border="0">

							<thead>
								<tr>
									<th>Detail</th>
									<th>BugId</th>
									<th>Title</th>
									<th>Project</th>
									<th>Component</th>
									<th>NewOwner</th>
									<th>Status</th>
									<th>Operation</th>
								</tr>
							</thead>							
									<tbody id="differentBugTableBody">		
									</tbody>												
						</table>
						<div id='modifyBtnDiv'></div>
					


					<!--  
	    			<button id="refreshBtn" name="refreshBtn" type="button" value="refresh" class="btn btn-default" data-loading-text="Loading">refresh</button>  
		    		-->
				</div>
			</div>
		</div>
	</div>

	<script src="assets/js/jquery-1.10.2.min.js"></script>
	<script src="assets/js/jquery.validate.min.js" ></script>
	<script src="assets/js/jquery.placeholder.js" ></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/jquery.dataTables.js"></script>
	<script src="assets/js/jquery.dataTables.editable.js"></script>
	<script src="assets/js/jquery.jeditable.js"></script>
	<script src="assets/js/jquery.dataTables.rowGrouping.js"></script>
	<script src="assets/js/jquery.dataTables.colReorderWithResize.js"></script>
	<script src="assets/js/alertify.min.js"></script>
	<script src="assets/js/custom.navigation.js"></script>
	<script src="assets/js/custom.mainFrame.js"></script>
	<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
	<!--[if lt IE 9]>
	 	 <script src="assets/js/custom.html5.js"></script>
	 	 <script src="assets/js/custom.respond.min.js"></script>
	<![endif]-->

</body>
</html>
