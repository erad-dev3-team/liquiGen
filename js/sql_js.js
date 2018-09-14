var divCounter = 0;
var divPreconditions = {};

function sql_add_div(e, t, q) {
	var datadivcount = gebcn('datadiv').length;
	if (!q || datadivcount === 0) {
		e.preventDefault();
		var newDiv = document.createElement('DIV');
		var sqldiv_n = sqldiv;
		sqldiv_n = sqldiv_n.replace(/<NUM>/g, divCounter);
		newDiv.innerHTML = sqldiv_n;
		newDiv.children[0].className += " datadiv_v";
		window.setTimeout(function () { newDiv.children[0].className = newDiv.children[0].className.replace("v_v", "v_o"); }, 100);
		window.setTimeout(function () { newDiv.children[0].className = newDiv.children[0].className = 'datadiv'; }, 1000);
		gebi('dataDivHolder').appendChild(newDiv);
		divPreconditions[divCounter] = 0;
		addPrec(this.event, divCounter);
		var pmd = gebi(`precondition_main_div_${divCounter}`);
		pmd.onwheel = function () { setupProgreess(pmd.id.split('_')[3]); };
		pmd.onchange = function () { setupProgreess(`${pmd.id.split('_')[3]}`); };
		pmd.onseeking = function () { setupProgreess(`${pmd.id.split('_')[3]}`); };
		pmd.onseeked = function () { setupProgreess(`${pmd.id.split('_')[3]}`); };
		pmd.onscroll = function () { setupProgreess(`${pmd.id.split('_')[3]}`); };

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

function addPrec(e, num) {
	e = e || window.event;
	if (e) {
		e.preventDefault();
	}
	var target = gebi('target_' + num);
	var prec = document.createElement("DIV");
	prec.className = 'pc_span_class';
	prec.id = `pc_span_${num}_${divPreconditions[num]}`;
	prec.innerHTML = `${precondition_template}`
		.replace(/<NUM>/g, `${num}`)
		.replace(/<PNUM>/g, `${divPreconditions[num]}`);
	var pmd = gebi('precondition_main_div_' + num);
	pmd.appendChild(prec);
	pmd.insertBefore(prec, target);
	divPreconditions[num]++;
	setupProgreess(num);
}

function setupProgreess(num) {
	console.log(num);
	var prog = gebi(`precondition_progress_${num}`);
	var div = gebi(`precondition_main_div_${num}`);
	if (prog) {
		var max = div.getElementsByClassName('pc_span_class').length;
		var col_0 = (div.scrollHeight / max);
		var tmp = (div.scrollTop / col_0);
		var numc = Math.floor(tmp) + (tmp > Math.floor(tmp) ? 1 : 0);
		//fillPB(prog, max, numc);
		fillPB(prog, div.scrollHeight - div.offsetHeight, div.scrollTop);
	}
}

function fillPB(pb, parts, color) {
	var percent = ((100 / parts) * color);
	percent = percent + (Math.floor(percent) < percent + 0.5 ? 1 : 0);
	pb.style.background = `linear-gradient(to right, rgba(255,0,25,1) 0%,rgba(255,0,25,1) ${percent - 1}%,rgba(255,255,255,1) ${percent}%,rgba(109,52,52,1) ${percent}%,rgba(109,52,52,1) 100%)`;
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

function close_div(num) {
	var v = gebi("sql_datadiv_" + num);
	var vv = v.parentElement;
	if (vv) {
		v.style.height = v.offsetHeight + "px";
		window.setTimeout(function () { v.className = 'datadiv_v'; }, 100);
		window.setTimeout(function () { closeDiv(vv) }, 800);
	}
}

function closeDiv(div) {
	if (div) {
		div.parentNode.removeChild(div);

		if (gebcn('datadiv').length === 0) {
			divCounter = 0;
		}
	}
}

function get_checkbox(num) {
	var cb = gebi('precondition_checkbox_' + num);
	return cb || null;
}

function handle_check_change(num) {
	var cb = get_checkbox(num);
	if (cb) {
		var pcsm = gebi('precondition_main_div_' + num);
		var b = gebi('btn_add_pc_' + num);
		if (pcsm) {
			if (pcsm.getElementsByClassName('pc_span_class').length == 0) {
				if (b) { b.click(); }
			}

			if (cb.checked) {
				pcsm.className = "precMainDiv_v";
				window.setTimeout(function () { if (!(gebi(`prec_popout_${num}`)).parentElement.hasAttribute('nop')) { (gebi(`prec_popout_${num}`)).parentElement.style.paddingTop = "80px"; (gebi(`prec_popout_${num}`)).parentElement.setAttribute('nop', '1'); } }, 10);
				window.setTimeout(function () { (gebi(`prec_popout_${num}`)).parentElement.style.removeProperty("padding-top"); setPopupOnBG(gebi(`prec_popout_${num}`)); }, 1000);
			} else {
				pcsm.className = "precMainDiv precMainDiv_uc";
				window.setTimeout(function () { pcsm.className = "precMainDiv"; }, 1000);
				window.setTimeout(function () { setPopupOnCont(gebi(`prec_popout_${num}`)); }, 10);
			}
			showhidenot(num);
		}
	}
}

function uncheck_boxes() {
	var pccs = document.getElementsByClassName("pcc");
	for (var p of pccs) {
		var num = p.id.split('_')[1];
		if (p && p.checked) { p.click(); }
	}

	var cb = get_checkbox(num);
	if (cb) {
		var pcsm = gebi('precondition_main_div_' + num);
		var b = gebi('btn_add_pc_' + num);
		if (pcsm) {
			if (pcsm.getElementsByClassName('pc_span_class').length == 0) {
				if (b) { b.click(); }
			}

			if (cb.checked) {
				pcsm.className = "precMainDiv_v";
				window.setTimeout(function () { if (!(gebi(`prec_popout_${num}`)).parentElement.hasAttribute('nop')) { (gebi(`prec_popout_${num}`)).parentElement.style.paddingTop = "80px"; (gebi(`prec_popout_${num}`)).parentElement.setAttribute('nop', '1'); } }, 10);
				window.setTimeout(function () { (gebi(`prec_popout_${num}`)).parentElement.style.removeProperty("padding-top"); setPopupOnBG(gebi(`prec_popout_${num}`)); }, 1000);
			} else {
				pcsm.className = "precMainDiv precMainDiv_uc";
				window.setTimeout(function () { pcsm.className = "precMainDiv"; }, 1000);
				window.setTimeout(function () { setPopupOnCont(gebi(`prec_popout_${num}`)); }, 10);
			}
			showhidenot(num);
		}
	}
}

function setPopupOnBG(obj) {
	if (obj) {
		obj.parentElement.removeChild(obj);
		gebcn('center')[0].appendChild(obj);

		var v = gebi(obj.getAttribute('data-owner'));

		if (v) {
			obj.style.position = 'absolute';
			obj.style.left = (getOffsetLeft(v) + 3) + 'px';
			obj.style.top = (v.getBoundingClientRect().y + 2) + 'px';
			obj.className = 'prec_popout_base prec_popout';
		}
	}
}

function setPopupOnCont(obj) {
	if (obj) {

		var v = gebi(obj.getAttribute('data-owner'));

		obj.style.position = 'absolute';
		obj.className = 'prec_popout_base prec_popout_hide';

		window.setTimeout(function () {
			obj.parentElement.removeChild(obj);
			v.appendChild(obj);
		}, 1000);
	}
}

function setSQL(num) {
	var sel = gebi('sql_sel_' + num);
	var t0b = gebi('sql_' + num);

	if (sel && t0b) {
		t0b.textContent = sel.value;
	}
}

function close_pc(num_pnum) {
	var v = gebi(`pc_span_${num_pnum}`);
	var vp = v.parentElement;
	if (v) {
		vp.removeChild(v);
		if (vp.getElementsByClassName('pc_span_class').length == 0) {
			var pcc = gebi(`precondition_checkbox_${num_pnum.split('_')[0]}`);
			if (pcc && pcc.checked) {
				pcc.click();
			}
		}
	}
}

function setText(num) {
	var sel = gebi('pc_sel_' + num);
	var tb = gebi('precSql_' + num);
	var res = gebi('precRes_' + num);

	if (sel && tb && res) {
		if (sel.value.split(';')[1] === "CB") {
			tb.textContent = sel.value.split(';')[0];
			res.type = "checkbox";
			res.addEventListener("change", function (event) { showhidenot(event); });
			gebi('lbl_' + res.id).style.display = 'inline';
			gebi('cs_type_' + num).value = 'xml';
		} else {
			tb.textContent = sel.value.split(';')[0] + ';';
			res.type = "text";
			res.value = sel.value.split(';')[1];
			res.removeAttribute("onchange");
			gebi('lbl_' + res.id).style.display = 'none';
			gebi('xml_not_close_' + res.id).style.display = 'none';
			gebi('xml_not_close_' + res.id).style.display = 'none';
			gebi('cs_type_' + num).value = 'sql';
		}
	}
}

function showhidenot(e) {
	var res;
	var open;
	var closed;

	if (isNaN(parseInt(e))) {
		res = e.target;

		open = gebi('xml_not_open_' + res.id);
		closed = gebi('xml_not_close_' + res.id);

		if (res.checked && open && closed) {
			open.style.display = 'inline';
			closed.style.display = 'inline';
		} else {
			open.style.display = 'none';
			closed.style.display = 'none';
		}
	} else {
		var cb = gebi('precondition_checkbox_' + e);
		res = gebi('precRes_' + e);
		open = gebi('xml_not_open_precRes_' + e);
		closed = gebi('xml_not_close_precRes_' + e);

		if (cb && res && open && closed) {
			if (cb.checked && res.checked) {
				open.style.display = 'inline';
				closed.style.display = 'inline';
			} else {
				open.style.display = 'none';
				closed.style.display = 'none';
			}
		}
	}
}

function getOffsetLeft(object) {
	var i = 0;
	var o = object;

	while (o && o.offsetLeft > 0) {
		i += o.offsetLeft;
		o = o.offsetParent;
	}

	return i;
}

function getOffsetTop(object) {
	var i = 0;
	var o = object;

	while (o && o.offsetTop > 0) {
		i += o.offsetTop;
		o = o.offsetParent;
	}

	return i;
}

function toggleCheckboxesSingle(d, type) {
	console.log(d);
	console.log(type);
	var d0 = gebi(d[0]);
	var d1 = gebi(d[1]);
	var d2 = gebi(d[2]);
	var d3 = gebi(d[3]);

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

function gebcn(className) {
	return document.getElementsByClassName(className);
}

function hide(obj) {
	if (obj)
		obj.style.visibility = "hidden";
}

function show(obj) {
	if (obj)
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
		"sql": "sql",
		"tab": "createTable",
		"vie": "createView",
		"col": "addColumn",
		"ind": "createIndex",
		"pro": "createProcedure",

		"aai": "addAutoIncrement",
		"adv": "addDefaultValue",
		"afk": "addForeignKeyConstraint",
		"ann": "addNotNullConstraint",
		"apk": "addPrimaryKey",
		"aun": "addUniqueConstraint",

		"dta": "dropTable",
		"dvi": "dropView",
		"dco": "dropColumn",
		"dpr": "dropPrimaryKey",
		"din": "dropIndex",
		"del": "delete",

		"mdt": "modifyDataType",
		"ret": "renameTable",
		"rec": "renameColumn",
		"rev": "renameView",
		"upd": "update",
		"ins": "insert"
	};

	return names[s.toLowerCase()];
}

function closeAllCheckboxes(d) {
}