<?php
	require("../codebase/connector/grid_connector.php");
	$res=mysql_connect("localhost","root","dishajain");
    	mysql_select_db("data");
	
	$conn = new GridConnector($res,"MySQL");
	$conn->render_table("interns","intern_id","fname,lname,email,color");
?>