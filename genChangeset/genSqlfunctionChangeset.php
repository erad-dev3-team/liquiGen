<?php
	
	session_start();
	
	
	
if(!empty($_POST['functionName']) && !empty($_POST['jiraName']) && !empty($_POST['comment']))
{
	
	$functions = explode(";", $_POST['functionName']);
	
	
	//XML generálás	
	$xmlHeader = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<databaseChangeLog
	xmlns=\"http://www.liquibase.org/xml/ns/dbchangelog\"
	xmlns:ext=\"http://www.liquibase.org/xml/ns/dbchangelog-ext\"
	xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"
	xsi:schemaLocation=\"http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.5.xsd http://www.liquibase.org/xml/ns/dbchangelog-ext http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-ext.xsd\">
	";
	
	$numChangeSet = 0;
	foreach($functions as $tmp)
	{
		
		$tmp = str_replace(".sql", "", $tmp);
		
		if($tmp)
		{
			$xmlHeader .= genChangeSet($tmp, $_POST['comment'], $_POST['jiraName'], $numChangeSet);
			$numChangeSet++;
		}
		
	}

	
$xmlHeader .= "</databaseChangeLog>";
	
	$changeSetId = date("Ymd") . "T" . date("Hi") . "-" . strtoupper($_POST['comment']);
	header('Content-type: text/xml');
	header('Content-Disposition: attachment; filename=' . $changeSetId . '.xml');
	echo $xmlHeader;
	
	
	
	exit;
	
	
}
else
{
	echo "Kötelező kitölteni: SQL funkció neve, JIRA felhasználónév, Jegyszám / Komment
		<a href=\"../index.php\">Vissza</a>";
}


function genChangeSet($functionName, $comment, $jiraName, $numChangeSet)
{
	
	$dataTypes = array("character varying", "varchar", "bigint", "boolean", "character", "char", "date", "double precision", "integer", "numeric", "real", "text", "timestamp without time zone", "time without time zone", "timestamp", "time");
	$shortDataTypes = array("cv", "cv", "bi", "b", "c", "c", "d", "dp", "i", "n", "r", "t", "tswtz", "twtz", "ts", "ti");
	
	
	$parameterStart = strpos($functionName, "(");
	$pointPoint = strpos(substr($functionName, 0, $parameterStart), '.');
	
	
	$params = substr($functionName, $parameterStart);
	$schema = substr($functionName, 0, $pointPoint);
	
	if(!$schema){$schema = "public";}
	$sqlName = substr($functionName, 0, $parameterStart) . str_replace($dataTypes, $shortDataTypes, $params);
	$sqlName = str_replace(" ", "", $sqlName);
	$sqlName = str_replace(".", "", $sqlName);
	$sqlName = $sqlName . ".sql";
	
	$changeSetId = date("Ymd") . "T" . date("Hi") . "-" . strtoupper($comment) . "_" . $numChangeSet;
	
	$ret = "
	<changeSet author=\"$jiraName\" id=\"$changeSetId\" objectQuotingStrategy=\"QUOTE_ALL_OBJECTS\" runOnChange=\"true\">
		<comment>" . strtoupper($comment) . "</comment>
		
		<createProcedure 
			encoding=\"utf8\"
			path=\"../liquisql/sql/" . $schema . "/proc/" . substr($sqlName, $pointPoint) ."\"
			relativeToChangelogFile=\"true\"/>
			
	</changeSet>
";		
	
	
	return $ret;
	
}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
?>