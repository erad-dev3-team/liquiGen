<?php

	
	if($_POST['jiraName'] && $_POST['comment'])
	{
		
		try
		{
		
			$target_dir = "uploads/";
			$target_file = $target_dir . basename($_FILES["file"]["name"]);
			
			
			// Check if image file is a actual image or fake image
			if($_POST["action"] === "post") 
			{
				
				//echo pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION);
				if(strtolower(pathinfo($_FILES["file"]["name"], PATHINFO_EXTENSION)) != "sql")
				{
					echo "Ez nem SQL fájl!";
					exit;
				}
				
				if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) 
				{
					
					echo "Sikeresen feltöltve: " . basename( $_FILES["file"]["name"]);
					
					$url = "genChangeset/";
					if($_POST["source"])
					{
						if($_POST["source"] === "udq")
						{
							$url .= "genUdqChangeset.php?jiraName=$_POST[jiraName]&issueNum=$_POST[comment]&file=" . basename($_FILES["file"]["name"]);
						}
						else if($_POST["source"] === "fc")
						{
							$url .= "genFcChangeset.php?jiraName=$_POST[jiraName]&issueNum=$_POST[comment]&file=" . basename($_FILES["file"]["name"]);
						}
						
						header("Location: $url");
						
					}
					
				}  
				else 
				{
					echo "Hiba a következő fájl feltöltésekor: " . basename( $_FILES["file"]["name"]);
				}

			}
				
		}
		catch(Exception $exc)
		{
			echo $exc;
		}
		
	}
	else
	{
		echo "Kötelező kitölteni: SQL funkció neve, JIRA felhasználónév, Jegyszám / Komment
			  <a href=\"../index.php\">Vissza</a>";
	}
	
?>
