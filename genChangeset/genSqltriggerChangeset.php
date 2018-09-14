<?php
	
	try
	{
		
		$schemaAndName = array();
		
		$_POST['triggerSchema'] = str_replace(".sql", "", $_POST['triggerSchema']);
		
		if(!strpos($_POST['triggerSchema'], "."))
		{
			$schemaAndName[0] = "public";
			$schemaAndName[1] = $_POST['triggerSchema'];
		}
		else
		{
			$schemaAndName = explode(".", $_POST['triggerSchema']);
		}
		
		//$fileContent = file_get_contents("../uploads/" . $_GET['file']);
		$changeSetId = date("Ymd") . "T" . date("Hi") . "-" . strtoupper($_POST['comment']);
		
		$cs .= "<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<databaseChangeLog
	xmlns=\"http://www.liquibase.org/xml/ns/dbchangelog\"
	xmlns:ext=\"http://www.liquibase.org/xml/ns/dbchangelog-ext\"
	xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"
	xsi:schemaLocation=\"http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.5.xsd http://www.liquibase.org/xml/ns/dbchangelog-ext http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-ext.xsd\">

	<changeSet id=\"$changeSetId\" author=\"$_POST[jiraName]\">
		<createProcedure 
			encoding=\"utf8\"
			path=\"../liquisql/sql/".$schemaAndName[0]."/trigger/".$schemaAndName[1].".sql\"
			relativeToChangelogFile=\"true\"/>
    </changeSet>
	
</databaseChangeLog>
";
		
		header('Content-type: text/xml');
		header('Content-Disposition: attachment; filename=' . $changeSetId . '.xml');
		echo $cs;
		
		exit;
		
	}
	catch(Exception $exc)
	{
		echo $exc;
		exit;
	}	
	
?>