<!--RM:2018-07-22: Small change. Made it so you can create multiple SQL changesets in the same file-->
<!--RM:2018-08-23: More small changes, extracted css and js to separate files-->
<?php
		
		//Handle variables
		//{
			$w			=	""; 
			$images		=	"var arrow		=	'./img/arrow_X.png'		;
							var plus		=	'./img/plus_X.png'		;
							var info		=	'./img/info_X.png'		;
							var popup		=	'./img/popup_X.png'		;
							var popdown		=	'./img/popdown_X.png'	;";

			$sql		=	"";
			$j			=	"";
			$jj			=	0;
		//}


		//Handle debug
		//{
			if(isset($_GET['debug']) || isset($_GET['dbg'])) { $j = ""; $jj = 1;  } else { $j = "_original"; }
			if($j	== "") { $sql = "<script src='./js/sql_template_js.js' type='text/javascript' ></script>"; }
			$sql	.= "<script src='./js/sql_js${j}.js' type='text/javascript' ></script>";
			$sql	.= "<link rel='stylesheet' href='./css/sql_css${j}.css' type='text/css' />";
		//}


		//Handle colors, store in cookie
		//{
			if(isset($_GET['c']) && !empty($_GET['c']) )
			{
				$w = $_GET['c'];
			}
			else if(isset($_COOKIE['color']))
			{
				$w = $_COOKIE['color'];
			}
			else{ $w = "w"; } //Fallback to white as default

			$images = str_replace( "X", $w, $images );

			if(isset($_COOKIE['color'])){ unset($_COOKIE['color']); }
			setcookie ("color", "$w", (time() + (1 * 60 * 60 * 24 * 30 )) );

			if(isset($_GET['c'])){
				header("Location: ./index.php" . ((isset($_GET['debug']) || isset($_GET['dbg'])) ? "?debug=1" : ""));
			}
		//}

?>


<!DOCTYPE html>
<html>

	<head>
		<meta charset="utf-8">
		<title>DPD Group IT Solutions - liquiGen v2.0</title>
		<link rel='icon' href='./img/favicon4.ico' type='image/icon' />
		<link rel='stylesheet' href='./css/main_css.css' type='text/css' />
		<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script src="./js/main_js.js" type="text/javascript"></script>
		<?php
		#Adding JS variables for later use
		print "	<script>
					
					$images

					window.onload = (function(){
						if(1 == ${jj}){ 
							document.getElementById('btn_sql').click(); 
						}
					});
				</script>";
		?>
	</head>
	
	
<!-- MAGIC STARTS HERE -->
	<body>
		<div class='center'>
				<table class='main_table'>
					<tr>
						<td colspan="2" >
							<h1> DPD Group IT Solutions - liquiGen </h1>
							<h1>Kérlek, mindig ellenőrizd a kimeneti fájlt <br/> és ha hiba van, jelezd!</h1>
						</td>
					</tr>
					<tr>
						<td>
							<!-- GOMBOK -->
							<div class="tab">
								<button id='btn_fnc' class="tablinks" onclick="openTab(event, 'func')">	SQL funkció (csak paraméter típusokkal!!)</button>
								<button id='btn_trg' class="tablinks" onclick="openTab(event, 'trigger')">SQL trigger</button>
								<button id='btn_udq' class="tablinks" onclick="openTab(event, 'udq')">UD Query</button>
								<button id='btn_fc'  class="tablinks" onclick="openTab(event, 'fc')">Formcreator</button>
								<button id='btn_sql' class="tablinks" onclick="openTab(event, 'sql'); sql_add_div(event,this,1)">SQL</button>
							</div>

						</td>
					</tr>
					<tr>
						<td>
							<!-- TABOK -->
							<?php require_once "tabs/func.php";		?>
							<?php require_once "tabs/trigger.php";	?>
							<?php require_once "tabs/udq.php";		?>
							<?php require_once "tabs/fc.php";		?>
							<?php require_once "tabs/sql.php";		?>
							
						</td>
					</tr>
				</table>
			</form>
		</div>
	</body>
</html>