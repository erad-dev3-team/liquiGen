<?php	
	#RM:2018-07-22: Small change. Made it so you can create multiple SQL changesets in the same file
	#RM:2018-08-23: Added possibility to use XML style preconditions
	
	$cs_indexes = array();
    $changesets = array();

	if(empty($_POST['jiraName'])){ $_POST['jiraName'] = '[JIRA NÉV]'; }
	if(empty($_POST['comment'])){ $_POST['comment'] = '[JIRA JEGYSZÁM]'; }
	
	foreach ($_POST as $k => $v) {
		if(strstr($k, "changeset_num")){
			array_push($cs_indexes,$v);
		}
	}
	
	
	foreach ($cs_indexes as $v) {
		$obj = array(
			'id'=>					'',
			'precondition'=>		'',
			'precondition_is_xml'=>	'',
			'precondition_is_not'=>	'',
			'precondition_sql'=>	'',
			'precondition_result'=>	'',
			'sql'=>					''
		);
		
		if($_POST['sql_' . $v]){
			
			$obj['id']					= $v; 
			$obj['sql']					= $_POST['sql_' . $v]; 
			$obj['precondition_is_xml']	= ($_POST['cs_type_' . $v] == 'xml' ? '1' : '0');
			
			if(!empty($_POST['precondition_checkbox_' . $v])){
				$obj['precondition'] 		= '1'; 
				$obj['precondition_sql'] 	=	$_POST['precSql_' . $v];
				
				if($obj['precondition_is_xml'] == '0'){
					if($_POST['precSql_' . $v] && $_POST['precRes_' . $v] !== null)
					{
						$obj['precondition_result']	= $_POST['precRes_' . $v];
					}
				}
				else
				{
					$obj['precondition_is_not'] = (!empty($_POST['precRes_' . $v]) ? '1' : '0');
				}
			}
			else
			{ $obj['precondition'] = '0'; }
		}
		
		if(!empty($obj['sql'])){ array_push($changesets,$obj); }
	}
	
	$cs = "<?xml version=\"1.0\" encoding=\"UTF-8\"?> 
	<databaseChangeLog
		xmlns=\"http://www.liquibase.org/xml/ns/dbchangelog\"
		xmlns:ext=\"http://www.liquibase.org/xml/ns/dbchangelog-ext\"
		xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"
		xsi:schemaLocation=\"http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.5.xsd http://www.liquibase.org/xml/ns/dbchangelog-ext http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-ext.xsd\">
	
	";

	try
	{
		
		foreach ($changesets as $changeset) 
		{
			$hasPrecondition = $changeset['precondition'];
			$prec_is_xml = $changeset['precondition_is_xml'];
			$prec_is_not = $changeset['precondition_is_not'];
			$precSql = $changeset['precondition_sql'];
			$precRes = $changeset['precondition_result'];
			$sql = trim($changeset['sql']);
			
			$sql = trim(	preg_replace('/^\<sql\>/i'		,""	,$sql)	);
			$sql = trim(	preg_replace('/\<\/sql\>$/i'	,""	,$sql)	);
			$sql = trim(	preg_replace('/^\<!\[cdata\[/i'	,""	,$sql)	);
			$sql = trim(	preg_replace('/\]\]>$/i'		,""	,$sql)	);
			
			$sql = trim($sql);
			
			$sql = preg_replace('/\n/',"\n\t\t\t\t\t\t",$sql);
			
			$changeSetId = date("Ymd") . "T" . date("Hi") . "-" . strtoupper($_POST['comment']);
			
			if(count($changesets) > 1)
			{ 
				$changeSetId .= '_' . $changeset['id']; 
			}
	
			$preconditionString = "";
			$strt =	"\n					<not>";
			$end =	"\n					</not>";
			$tab =	"	";
			
			if($hasPrecondition)
			{
				if($prec_is_xml == 0){
					$strt =	"\n					<sqlCheck expectedResult=\"". $precRes ."\">";
					$end =	"\n					</sqlCheck>";
				}else{
					if($prec_is_not == 0)
					{
						$strt	= "";
						$end	= ""; 
						$tab	= ""; 
					}
				}
				
				$preconditionString = "
				<preConditions onFail=\"MARK_RAN\">" . $strt . "
				" . $tab . "	". $precSql ."" . $end . "
				</preConditions>
				";
			}
	
	
		   $cs .= "
		   
			<changeSet id=\"$changeSetId\" author=\"$_POST[jiraName]\">
				" . $preconditionString . "
				<sql>
					<![CDATA[
						$sql
					]]>
				</sql>
				
			</changeSet>
			
		";
			
			
			
		}
	
		$cs .= "</databaseChangeLog>";

		$cs = str_replace("\r\n","\n",$cs);
		$cs = str_replace("\n\n","\n",$cs);
		
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