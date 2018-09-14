<?php	
	
	try
	{
		
		$fileName = "";
		$name = "";
		if(!strpos($_POST['file'], "."))
		{
			$fileName = $_POST['file'] . ".sql";
			$name = $_POST['file'];
		}
		else
		{
			$fileName = $_POST['file'];
			$name = str_replace(".sql", "", $_POST['file']);
		}
		
		$changeSetId = date("Ymd") . "T" . date("Hi") . "-" . strtoupper($_POST['comment']);
		
		$cs .= "<?xml version=\"1.0\" encoding=\"UTF-8\"?>
<databaseChangeLog
	xmlns=\"http://www.liquibase.org/xml/ns/dbchangelog\"
	xmlns:ext=\"http://www.liquibase.org/xml/ns/dbchangelog-ext\"
	xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"
	xsi:schemaLocation=\"http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.5.xsd http://www.liquibase.org/xml/ns/dbchangelog-ext http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-ext.xsd\">

	<changeSet id=\"$changeSetId\" author=\"".$_POST['jiraName']."\">
	
		<preConditions onFail=\"MARK_RAN\">
			<sqlCheck expectedResult=\"1\">
			
				SELECT COUNT(*) FROM settings.domestic_country WHERE UPPER(country_iso2_code) IN ('XX', 'XX') LIMIT 1;
				
			</sqlCheck>
		</preConditions>
		
		<sqlFile 
		encoding=\"utf8\"
		path=\"../liquisql/udq/$fileName\"
        relativeToChangelogFile=\"true\"
        splitStatements=\"true\"
        stripComments=\"true\"/>
		
	</changeSet>
		
		
	<changeSet id=\"" . $changeSetId . "_1\" author=\"".$_POST['jiraName']."\">
		
		<sql>
			<![CDATA[
				INSERT INTO 
					ud_queries.queries_attributes 
					(
						query_name,
						cron_m,
						cron_h,
						cron_dom,
						cron_mon,
						cron_dow, 
						cron_email,
						ftp_host,
						ftp_dir,
						ftp_user,
						ftp_pass,
						enabled
					)				
					SELECT
						'" . $name . "',
						'',
						'',
						'',
						'',
						'',
						'',
						'',
						'',
						'',
						'',
						false
					WHERE NOT EXISTS (SELECT 1 FROM ud_queries.queries_attributes WHERE query_name = '".$name."');
			]]>
		</sql>
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