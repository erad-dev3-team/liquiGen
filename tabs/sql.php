<!--#RM:2018-07-22: Small change. Made it so you can create multiple SQL changesets in the same file-->
<?=$sql?>

<div id="sql" class="tabcontent">
	
	
	
		
	
		<form method="post" action="genChangeset/genSQLChangeset.php" enctype="multipart/form-data">
			<table id='t_sql'>
				<!--DATA COMES HERE-->
				<div id='dataDivHolder'>
				    <input type='hidden' name='action' value='post' />
                    <input type='hidden' name='source' value='sql' />
				</div>
				<tr>
					<td>
						<button title="Add new SQL" onclick="sql_add_div(event,this);">+</button>
					</td>
				</tr>
				<tr>
					<td>
						<p>JIRA felhasználóneved : </p>
					</td>
					<td>
						<textarea id="jiraName" name="jiraName"></textarea>
					</td>
				</tr>
				<tr>
					<td>
						<p>JIRA jegyszám : </p>
					</td>
					<td>
						<textarea name="comment"></textarea>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<input type="submit" style="width : 100%; height : 35px;" value="Mehet" />
					</td>
				</tr>
				<tr>
					<td>
						<!--<a href = "#" onclick = "help()"><h2>Használati utasítás itt!</h2></a>-->
					</td>
				</tr>
			</table>
		</form>
</div>