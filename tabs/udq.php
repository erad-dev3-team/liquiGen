<div id="udq" class="tabcontent">
	<form method="post" action="genChangeset/genUdqChangeset.php" enctype="multipart/form-data">
		<table>
			<tr>
				<td>
					
					<p>UD Query: </p>
				</td>
				<td>
					<input id="file" name="file" placeholder="UDQ_fájl_neve.sql">
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