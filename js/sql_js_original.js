var sqldiv =	`<tr>
					<td>
						<div class='datadiv' id='sql_datadiv_<NUM>' style='border:1px solid white; border-radius:12px;position:relative;float:left;width:850px;padding:10px 10px 10px 80px;margin-bottom:20px;'>
						<label style='margin-left:-70px;margin-top:-10px;position:absolute;'>Changeset #<NUM></label>
						<div class="closebtn unselectable"; id='btn_close_<NUM>' onclick="close_div('<NUM>');">×</div>
						<span class='pccs'><label style='cursor:pointer;position:absolute;margin-top:3px;' for='precondition_checkbox_<NUM>'>Precondition</label><input style='cursor:pointer;' data-num='<NUM>' class='pcc' type='checkbox' title='precondition' name='precondition_checkbox_<NUM>' id='precondition_checkbox_<NUM>' onchange='handle_check_change(<NUM>)' /></span><br /><br />
						
						<input type='hidden' name='changeset_num_<NUM>' value='<NUM>' />
						<input type='hidden' id='cs_type_<NUM>' name='cs_type_<NUM>' value='sql' />
						
						<div class='pc_span_class' id='pc_span_<NUM>'>
							<tr id='precondition_<NUM>'>
								<td class='precondition_tr' >
									<p>Precondition SQL</p>
								</td>
								<td>
									<span class='xml_not' id='xml_not_open_precRes_<NUM>'>&lt;NOT&gt;</span><br />
									<textarea id='precSql_<NUM>' name='precSql_<NUM>' style='min-height:50px;min-width:450px;' data-placeholder="SELECT count(*) FROM settings.domestic_country WHERE UPPER(country_iso2_code) IN ('XX');" placeholder = "SELECT count(*) FROM settings.domestic_country WHERE UPPER(country_iso2_code) IN ('XX');" onfocus="this.placeholder = '';" onblur="if(this.placeholder==''){this.placeholder = this.getAttribute('data-placeholder');}"></textarea>
									<span style='display:inline-block;'>
									Preset preconditions<br />
									<div id='pc_apl_<NUM>' class='pc_applicator' onclick='setText(<NUM>);'>←</div>
									<select id='pc_sel_<NUM>' class='pc_selector'>
										 <option value='SELECT count(*) FROM settings.domestic_country WHERE UPPER(country_iso2_code) IN ("_COUNTRY_","_COUNTRY_");1'>Country</option>
										 <option value='&lt;tableExists schemaName="_SCHEMA_" tableName="_TABLE_" /&gt;;CB'>Table exists</option>
										 <option value='&lt;columnExists schemaName="_SCHEMA_" tableName="_TABLE_" columnName="_COLUMN_" /&gt;;CB'>Column exists</option>
										 <option value='&lt;viewExists schemaName="_SCHEMA_" viewName="_VIEW_" /&gt;;CB'>View exists</option>
										 <option value='&lt;indexExists schemaName="_SCHEMA_" indexName="_INDEX_" /&gt;;CB'>Index exists</option>
										 <option value='&lt;sequenceExists schemaName="_SCHEMA_" sequenceName="_SEQUENCE_" /&gt;;CB'>Sequence exists</option>
										 <option value='&lt;primaryKeyExists schemaName="_SCHEMA_" tableName="_TABLE_" primaryKeyName="_KEY_" /&gt;;CB'>Primary Key exists</option>
										 <option value='&lt;foreignKeyConstraintExists schemaName="_SCHEMA_" foreignKeyName="_KEY_" /&gt;;CB'>Foreign Key Constraint Exists</option>
										 <option value="SELECT count(*) FROM _SCHEMA_._TABLE_ WHERE _COLUMN_='_VALUE_';1">Count value</option>
										 <option value="SELECT _COLUMN_ FROM _SCHEMA_._TABLE_ WHERE _COLUMN_='_VALUE_';_VALUE_">Select value</option>
									</select></span>
									<br /><span class='xml_not' id='xml_not_close_precRes_<NUM>'>&lt;/NOT&gt;</span>
								</td>
							</tr>
							<tr>
								<td>
									<br />
									<p>Precondition Expected result</p>
								</td>
								<td>
									<label class='unselectable' id='lbl_precRes_<NUM>' style='display:none; cursor:pointer;' for='precRes_<NUM>'>NOT</label>
									<input id='precRes_<NUM>' class='res_' type='text' name='precRes_<NUM>' data-placeholder='1' placeholder='1' onfocus="this.placeholder = '';" onblur="if(this.placeholder==''){this.placeholder = this.getAttribute('data-placeholder');}" />
								</td>
							</tr>
						</div>
						
						<tr>
							<td>
								<p>SQL: </p>
							</td>
							<td>
								<label id='sql_label_top_<NUM>' class='unselectable' style='position:relative;left:-60px;font-family:Consolas;'>&lt;sql&gt;</label>
								<br />
								<label id='cdata_label_top_<NUM>' class='unselectable' style='position:relative;left:-40px;font-family:Consolas;color:#FF8'>&lt;![CDATA[</label>
								<br />
								<textarea onkeydown='keydownTab(event,this);' name='sql_<NUM>' id='sql_<NUM>' style='height:150px;' data-placeholder='SELECT&#13;&#09;*&#13;FROM&#13;&#09;texts' placeholder='SELECT&#13;&#09;*&#13;FROM&#13;&#09;texts' onfocus="this.placeholder = '';" onblur="if(this.placeholder==''){this.placeholder = this.getAttribute('data-placeholder');}" ></textarea>
								<span style='display:inline-block;'>
								</span>
								<br />
								<label id='cdata_label_bottom_<NUM>' class='unselectable' style='position:relative;left:-40px;font-family:Consolas;color:#FF8'>]]&gt;</label>
								<br />
								<label id='sql_label_bottom_<NUM>' class='unselectable' style='position:relative;left:-60px;font-family:Consolas;'>&lt;/sql&gt;</label>
							</td>
						</tr>
					</div>
				</td>
			</tr>`;

var divCounter = 0;

function sql_add_div(e, t, q) {
	if (!q || document.getElementsByClassName('datadiv').length === 0) {
		e.preventDefault();
		var newDiv = document.createElement('DIV');
		var sqldiv_n = sqldiv;
		sqldiv_n = sqldiv_n.replace(/<NUM>/g, divCounter);
		newDiv.innerHTML = sqldiv_n;
		document.getElementById('dataDivHolder').appendChild(newDiv);

		loadImgs(newDiv);

		loadLabls(newDiv);

		var radios = document.getElementsByName("rad_type_" + divCounter);
		for (var r of radios) {
			r.onchange = function (event) {
				switchInput(event.target.value.split("_")[0], event.target.value.split("_")[1]);
			}
		}

		divCounter++;
	}
}

function loadImgs(newDiv) {
	var imgl = newDiv.getElementsByTagName("img");

	for (var v of imgl) {
		if (!v.onclick) {

			v.onclick = function (event) {
				event.stopPropagation();
				var dc = event.target.id;
				dc = dc.split(/\_/g);
				dc = dc[dc.length - 1];
				var typ = event.target.getAttribute("data-type");

				var pre = "cb_show_other";
				var cbt = ["_", "_add_", "_drop_", "_misc_"];

				toggleCheckboxesSingle([pre + cbt[0] + dc, pre + cbt[1] + dc, pre + cbt[2] + dc, pre + cbt[3] + dc], typ);
				return false;
			}
		}
	}
}

function loadLabls(newDiv) {
	var labls = newDiv.getElementsByTagName("label");

	for (var llll of labls) {
		if (llll.hasAttribute("data-type") && !llll.onclick) {

			llll.onclick = function (event) {
				event.stopPropagation();
				var dc1 = event.target.id;
				dc1 = dc1.split(/\_/g);
				dc1 = dc1[dc1.length - 1];
				var typ1 = event.target.getAttribute("data-type");

				var pre1 = "cb_show_other";
				var cbt1 = ["_", "_add_", "_drop_", "_misc_"];

				toggleCheckboxesSingle([pre1 + cbt1[0] + dc1, pre1 + cbt1[1] + dc1, pre1 + cbt1[2] + dc1, pre1 + cbt1[3] + dc1], typ1);
				return false;
			}
		}
	}
}

function close_div(num){
	if(document.getElementById("sql_datadiv_" + num)){
		document.getElementById("sql_datadiv_" + num).parentNode.removeChild(document.getElementById("sql_datadiv_" + num));
	}
	if(document.getElementsByClassName('datadiv').length === 0){
		divCounter = 0;
	}
}

function get_checkbox(num){
	var cb = document.getElementById('precondition_checkbox_' + num);
	return cb || null;
}

function handle_check_change(num){
	var cb = get_checkbox(num);
	if(cb){
		
		var pcs = document.getElementById('pc_span_' + num);
		if(pcs){
			if(cb.checked){
				pcs.className = "pc_span_class_v";
				showhidenot(num);
			}else{
				pcs.className = "pc_span_class";
				showhidenot(num);
			}
		}
	}
}

function setSQL(num){
	var sel = document.getElementById('sql_sel_' + num); 
	var t0b = document.getElementById('sql_' + num);  
	
	if(sel && t0b){ 
		t0b.textContent = sel.value;
	}
}

function setText(num){
	var sel = document.getElementById('pc_sel_' + num); 
	var tb = document.getElementById('precSql_' + num); 
	var res = document.getElementById('precRes_' + num); 
	
	if(sel && tb && res){ 
		if(sel.value.split(';')[1] === "CB"){
			tb.textContent = sel.value.split(';')[0];
			res.type = "checkbox";
			res.addEventListener("change", function(event){ showhidenot(event); });
			document.getElementById('lbl_' + res.id).style.display = 'inline';
			document.getElementById('cs_type_' + num).value = 'xml';
		}else{
			tb.textContent = sel.value.split(';')[0] + ';'; 
			res.type = "text";
			res.value = sel.value.split(';')[1]; 
			res.removeAttribute("onchange");
			document.getElementById('lbl_'+res.id).style.display = 'none';
			document.getElementById('xml_not_close_' + res.id).style.display = 'none';
			document.getElementById('xml_not_close_' + res.id).style.display = 'none';
			document.getElementById('cs_type_' + num).value = 'sql';
		}
	}
}
	
function showhidenot(e)
{
	var res;
	var open;
	var closed;

	if(isNaN(parseInt(e))){
		res = e.target;
		
		open	=	document.getElementById('xml_not_open_' + res.id);
		closed	=	document.getElementById('xml_not_close_' + res.id);
		
		if(res.checked && open && closed){
			open.style.display = 'inline';
			closed.style.display = 'inline';
		}else{
			open.style.display = 'none';
			closed.style.display = 'none';
		}
	}else{
		var cb 	=	document.getElementById('precondition_checkbox_' + e);
		res 	=	document.getElementById('precRes_' + e); 
		open	=	document.getElementById('xml_not_open_precRes_' + e);
		closed	=	document.getElementById('xml_not_close_precRes_' + e);
		
		if(cb && res && open && closed){
			if(cb.checked && res.checked){
				open.style.display = 'inline';
				closed.style.display = 'inline';
			}else{
				open.style.display = 'none';
				closed.style.display = 'none';
			}
		}
	}
	
}

function toggleCheckboxesSingle(d, type) {
	console.log(d);
	console.log(type);
	var d0 = document.getElementById(d[0]);
	var d1 = document.getElementById(d[1]);
	var d2 = document.getElementById(d[2]);
	var d3 = document.getElementById(d[3]);

	switch (type) {
		case "main":
			if (d0 && d1 && d2 && d3) {
				console.log("Type: MAIN");
				d1.checked = false;
				d2.checked = false;
				d3.checked = false;

				d0.checked = !d0.checked;
			}
			break;

		case "sub1":
			if (d1 && d2 && d3) {
				console.log("Type: SUB1");
				d1.checked = !d1.checked;
				d2.checked = false;
				d3.checked = false;
			}
			break;

		case "sub2":
			if (d1 && d2 && d3) {
				console.log("Type: SUB2");
				d1.checked = false;
				d2.checked = !d2.checked;
				d3.checked = false;
			}
			break;

		case "sub3":
			if (d1 && d2 && d3) {
				console.log("Type: SUB3");
				d1.checked = false;
				d2.checked = false;
				d3.checked = !d3.checked;
			}
			break;
	}
}


function switchInput(type, index) {
	var labels = [gebi("sql_label_top_" + index), gebi("sql_label_bottom_" + index), gebi("cdata_label_top_" + index), gebi("cdata_label_bottom_" + index)];
	if (type !== "SQL") {
		hide(labels[2]);
		hide(labels[3]);
		labels[0].style.top = "20px";
		labels[1].style.top = "-30px";
	} else {
		show(labels[2]);
		show(labels[3]);
		labels[0].style.top = "0px";
		labels[1].style.top = "0px";
	}
	renameLabel(labels[0], labels[1], getName(type));

	switch (type) {

	}
}

function gebi(id) {
	return document.getElementById(id);
}

function hide(obj) {
	if (obj)
	obj.style.visibility = "hidden";
}

function show(obj) {
	if(obj)
	obj.style.visibility = "visible";
}

function renameLabel(label1, label2, name) {
	//name = name.toLowerCase();
	if (label1 && label2) {
		label1.textContent = `<${name}>`;
		label2.textContent = `</${name}>`;
	}
}

function getName(s) {
	var names = {
		"sql" : "sql",
		"tab" : "createTable",
		"vie" : "createView",
		"col" : "addColumn",
		"ind" : "createIndex",
		"pro" : "createProcedure",

		"aai" : "addAutoIncrement",
		"adv" : "addDefaultValue",
		"afk" : "addForeignKeyConstraint",
		"ann" : "addNotNullConstraint",
		"apk" : "addPrimaryKey",
		"aun" : "addUniqueConstraint",

		"dta" : "dropTable",
		"dvi" : "dropView",
		"dco" : "dropColumn",
		"dpr" : "dropPrimaryKey",
		"din" : "dropIndex",
		"del" : "delete",

		"mdt" : "modifyDataType",
		"ret" : "renameTable",
		"rec" : "renameColumn",
		"rev" : "renameView",
		"upd" : "update",
		"ins" : "insert"
	};

	return names[s.toLowerCase()];
}

function closeAllCheckboxes(d) {

}






