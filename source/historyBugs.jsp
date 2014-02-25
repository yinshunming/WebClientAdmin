<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <title>History Bugs</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- @if NODE_ENV == 'DEVELOPMENT' -->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css"/>
	<link rel="stylesheet" href="assets/css/bootstrap.validation.css"/>
    <link rel="stylesheet" href="assets/css/jquery.dataTables.demo_page.css" />
	<link rel="stylesheet" href="assets/css/jquery.dataTables.demo_table_jui.css" />
	<link rel="stylesheet" href="assets/css/jquery.ui-1.8.4.custom.css" />
	<link rel="stylesheet" href="assets/css/custom.placeholder.css" />
	<link rel="stylesheet" href="assets/css/alertify.core.css" />
	<link rel="stylesheet" href="assets/css/alertify.default.css" />
<!-- @endif -->
<!-- @if NODE_ENV == 'PRODUCTION' -->
	<link rel="stylesheet" href="assets/css/common.min.css" />
	<link rel="stylesheet" href="assets/css/datatable.min.css" />
<!-- @endif -->
  </head>
  
  <body>
    <%@ include file="navigation.jsp" %>
    
   
    
    <div class="container" style="padding-top:70px">
     <div class="row" >
	    	<div class="col-lg-12">
	    	
	    	<div class="col-lg-4">
	    		<h3>OwnerBugsList</h3>
	    	</div>
	    			    	
		    	<div id="ownerBugsDiv">
		    			<br/>
	    				<table id="ownerBugsTable" class="table display" cellpadding="0"
						cellspacing="0" border="0">
				        <thead>
				          <tr>
				          	<th>Detail</th>
				            <th>BugId</th>
				            <th>Title</th>
				            <th>Project</th>
				            <th>Owner</th>
				            <th>Status</th>
				            <th>Managed</th>
				            <th>Operation</th>
				          </tr>
				        </thead>
				        <tbody id="ownerBugsTableBody">
				          	
				        </tbody>
				      </table>
	    
		    	</div>
	    	</div>
	    	</div>
    </div>
     <div class="container"  >
    	   <div class="row" >
	    	<div class="col-lg-12">   	
	    	<div class="col-lg-4">
	    		<h3>HistoryManagedBugsList</h3>
	    	</div>	    	
			
		    	<div id="historyBugsDiv">
		    			<br/>
	    				<table id="historyBugsTable" class="table display" cellpadding="0"
						cellspacing="0" border="0">
				        <thead>
				          <tr>
				          	<th>Detail</th>
				            <th>BugId</th>
				            <th>Title</th>
				            <th>Project</th>
				            <th>Owner</th>
				            <th>Status</th>
				            <th>Managed</th>
				            <th>Operation</th>
				          </tr>
				        </thead>
				        <tbody id="historyBugsTableBody">
				          
				        </tbody>
				      </table>
	    
		    	</div>
	    	</div>
    	</div>
    </div>
<!-- @if NODE_ENV == 'DEVELOPMENT' -->
    <script src="assets/js/jquery-1.10.2.min.js"></script>
   	<script src="assets/js/jquery.validate.min.js" ></script>
	<script src="assets/js/jquery.placeholder.js" ></script>
	<script src="assets/js/bootstrap.min.js" ></script>
	<script src="assets/js/jquery.dataTables.js"></script>
	<script src="assets/js/jquery.dataTables.rowGrouping.js"></script>
	<script src="assets/js/jquery.dataTables.colReorderWithResize.js"></script>
	<script src="assets/js/alertify.min.js"></script>
	<script src="assets/js/custom.navigation.js"></script>
	<script src="assets/js/custom.historyBugs.js"></script>
	<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
	<!--[if lt IE 9]>
	  	<script src="assets/js/custom.html5.js"></script>
	 	<script src="assets/js/custom.respond.min.js"></script>
	<![endif]-->

<!-- @endif -->

<!-- @if NODE_ENV == 'PRODUCTION' -->
	<script src="assets/js/common.min.js"></script>
	<script src="assets/js/historyBugs.min.js"></script>
	<!--[if lt IE 9]>
	 	 <script src="assets/js/ltIE9.min.js"></script>
	<![endif]-->

	

 	 
<!-- @endif -->

  </body>

</html>
