var pc_ph =					`SELECT count(*) FROM settings.domestic_country WHERE UPPER(country_iso2_code) IN ('XX');`;

var precondition_template = `
							<!--:: Precondition container[<NUM> / <PNUM>] START ::-->
							<tr id='precondition_<NUM>_<PNUM>'>
								<td class='precondition_tr' >
									<label class='pc_info_label_big'>Precondition# [<NUM>/<PNUM>]</label><div class="pc_closebtn unselectable" id='btn_close_pc_<NUM>_<PNUM>' onclick="close_pc('<NUM>_<PNUM>');">×</span></div>
								</td>
								<td>
									<span class='xml_not' id='xml_not_open_precRes_<NUM>_<PNUM>'>&lt;NOT&gt;</span>
									<br />
									<!--:: PC precondition_sql[<NUM> / <PNUM>] START ::-->
									<textarea id='precSql_<NUM>_<PNUM>' name='precSql_<NUM>_<PNUM>' style='min-height:50px;min-width:450px;' data-placeholder="${ pc_ph}" placeholder = "${pc_ph}" onfocus="this.placeholder = '';" onblur="if(this.placeholder==''){this.placeholder = this.getAttribute('data-placeholder');}"></textarea>
									<!--:: PC precondition_sql[<NUM> / <PNUM>] END ::-->
									<span style='display:inline-block;'>
										<!--:: PC presets[<NUM> / <PNUM>] START ::-->
										Preset preconditions
										<br />
										<div id='pc_apl_<NUM>_<PNUM>' class='pc_applicator' onclick='setText("<NUM>_<PNUM>");'>←</div>
										<select id='pc_sel_<NUM>_<PNUM>' class='pc_selector'>
											<option value='SELECT count(*) FROM settings.domestic_country WHERE UPPER(country_iso2_code) IN (&#39;_COUNTRY_&#39;,&#39;_COUNTRY_&#39;);1'>Country</option>
											<option value='&lt;tableExists schemaName="_SCHEMA_" tableName="_TABLE_" /&gt;;CB'>Table exists</option>
											<option value='&lt;columnExists schemaName="_SCHEMA_" tableName="_TABLE_" columnName="_COLUMN_" /&gt;;CB'>Column exists</option>
											<option value='&lt;viewExists schemaName="_SCHEMA_" viewName="_VIEW_" /&gt;;CB'>View exists</option>
											<option value='&lt;indexExists schemaName="_SCHEMA_" indexName="_INDEX_" /&gt;;CB'>Index exists</option>
											<option value='&lt;sequenceExists schemaName="_SCHEMA_" sequenceName="_SEQUENCE_" /&gt;;CB'>Sequence exists</option>
											<option value='&lt;primaryKeyExists schemaName="_SCHEMA_" tableName="_TABLE_" primaryKeyName="_KEY_" /&gt;;CB'>Primary Key exists</option>
											<option value='&lt;foreignKeyConstraintExists schemaName="_SCHEMA_" foreignKeyName="_KEY_" /&gt;;CB'>Foreign Key Constraint Exists</option>
											<option value="SELECT count(*) FROM _SCHEMA_._TABLE_ WHERE _COLUMN_='_VALUE_';1">Count value</option>
											<option value="SELECT _COLUMN_ FROM _SCHEMA_._TABLE_ WHERE _COLUMN_='_VALUE_';_VALUE_">Select value</option>
										</select>
										<!--:: PC presets[<NUM> / <PNUM>] END ::-->
									</span>
									<br />
									<span class='xml_not' id='xml_not_close_precRes_<NUM>_<PNUM>'>&lt;/NOT&gt;</span>
								</td>
							</tr>
							<tr>
								<!--:: PC result[<NUM> / <PNUM>] START ::-->
								<td>
									<br />
									<p>Precondition Expected result</p>
								</td>
								<td>
									<label class='unselectable' id='lbl_precRes_<NUM>_<PNUM>' style='display:none; cursor:pointer;' for='precRes_<NUM>_<PNUM>'>NOT</label>
									<input id='precRes_<NUM>_<PNUM>' class='res_' type='text' name='precRes_<NUM>_<PNUM>' data-placeholder='1' placeholder='1' onfocus="this.placeholder = '';" onblur="if(this.placeholder==''){this.placeholder = this.getAttribute('data-placeholder');}" />
								</td>
								<!--:: PC result[<NUM> / <PNUM>] END ::-->
							</tr>
							<!--:: Precondition container[<NUM> / <PNUM>] END ::-->
							`;

var sqldiv =				`
							<tr>
								<td>
									<div class='datadiv unselectable' id='sql_datadiv_<NUM>'>
										<label style='margin-left:-70px;margin-top:-10px;position:absolute;'>Changeset #<NUM></label>
										<div class="closebtn unselectable" id='btn_close_<NUM>' onclick="close_div('<NUM>');">×</div>
										<span class='pccs'>
											<label class='pcc_label' for='precondition_checkbox_<NUM>'>Precondition</label>
											<input style='cursor:pointer;' data-num='<NUM>' class='pcc' type='checkbox' title='precondition' name='precondition_checkbox_<NUM>' id='precondition_checkbox_<NUM>' onchange='handle_check_change(<NUM>)' />
										</span>
										<br />
										<br />
										<div class='precMainDiv' id='precondition_main_div_<NUM>'>
											<div id='prec_popout_<NUM>' class='prec_popout_hide' style='background-image:url(${popup});' data-owner='precondition_main_div_<NUM>'></div>
											<input type='hidden' name='changeset_num_<NUM>' value='<NUM>' />
											<input type='hidden' id='cs_type_<NUM>' name='cs_type_<NUM>' value='sql' />

											<span style='position:relative; margin-bottom:100px;' id='target_<NUM>'></span>
											<!--PRECONDITION HELYE-->
							
											<div class='btn_add_pc_holder' id='btn_add_pc_holder_<NUM>'>
												<button class='btn_add_pc' id='btn_add_pc_<NUM>' onclick='addPrec(event,<NUM>);'>Add Precondition</button>
												<span id='precondition_progress_<NUM>' class='precon_prog' style='background:gray;'></span>
											</div>
										</div>
									<tr>
										<td>
											<span class='unselectable' id='radioSelectors'>
												<!--IMPORTANT-->
												<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_SQL_<NUM>' value='SQL_<NUM>' checked />		<label class='radioLabel' for='rad_SQL_<NUM>' >RUN CUSTOM SQL			</label></span>
												<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_TAB_<NUM>' value='TAB_<NUM>' />				<label class='radioLabel' for='rad_TAB_<NUM>'>Create Table				</label></span>
												<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_VIE_<NUM>' value='VIE_<NUM>' />				<label class='radioLabel' for='rad_VIE_<NUM>'>Create View				</label></span><br />
												<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_COL_<NUM>' value='COL_<NUM>' />				<label class='radioLabel' for='rad_COL_<NUM>'>Add Column				</label></span>
												<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_IND_<NUM>' value='IND_<NUM>' />				<label class='radioLabel' for='rad_IND_<NUM>'>Create Index				</label></span>
												<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_PRO_<NUM>' value='PRO_<NUM>' />				<label class='radioLabel' for='rad_PRO_<NUM>'>Create Procedure			</label></span>
												<br class='br40' />
												<label id='lbl_other_<NUM>' data-type='main' class='lbl_other' for='cb_show_other_<NUM>'>Other</label><input class='w_cb cb_show_other' type='checkbox' id='cb_show_other_<NUM>'><img data-type='main' id='img_other_opener_<NUM>' class='img_other_opener' name='img_other_opener_<NUM>'  src='${ plus}' />
												<span class='s_other'>
													<label id='lbl_other_add_<NUM>' data-type='sub1' for='cb_show_other_add_<NUM>'>Add</label><input class='w_cb cb_show_other_add' type='checkbox' id='cb_show_other_add_<NUM>'><img data-type='sub1' id='img_other_add_opener_<NUM>' class='img_other_add_opener' name='img_other_add_opener_<NUM>'  src='${ arrow}' />
													<span class='s_other_add'>
														<br />
														<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_AAI_<NUM>' value='AAI_<NUM>' />	<label class='radioLabel' for='rad_AAI_<NUM>'>Add Auto Increment			</label></span>
														<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_ADV_<NUM>' value='ADV_<NUM>' />	<label class='radioLabel' for='rad_ADV_<NUM>'>Add Default Value				</label></span>
														<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_AFK_<NUM>' value='AFK_<NUM>' />	<label class='radioLabel' for='rad_AFK_<NUM>'>Add Foreign Key Constraint	</label></span><br />
														<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_ANN_<NUM>' value='ANN_<NUM>' />	<label class='radioLabel' for='rad_ANN_<NUM>'>Add Not Null Constraint		</label></span>
														<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_APK_<NUM>' value='APK_<NUM>' />	<label class='radioLabel' for='rad_APK_<NUM>'>Add Primary Key Constraint	</label></span>
														<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_AUN_<NUM>' value='AUN_<NUM>' />	<label class='radioLabel' for='rad_AUN_<NUM>'>Add Unique Constraint			</label></span><br />
													</span>
													<!--OTHER: DROP-->   
													<br />
													<label id='lbl_other_drop_<NUM>' data-type='sub2' for='cb_show_other_drop_<NUM>'>Drop</label><input class='w_cb cb_show_other_drop' type='checkbox' id='cb_show_other_drop_<NUM>'><img data-type='sub2' id='img_other_drop_opener_<NUM>' class='img_other_drop_opener' name='img_other_drop_opener_<NUM>'  src='${ arrow}' />
													<span class='s_other_drop'>
														<br />
														<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_DTA_<NUM>' value='DTA_<NUM>' />	<label class='radioLabel' for='rad_DTA_<NUM>'>DROP Table					</label></span>
														<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_DVI_<NUM>' value='DVI_<NUM>' />	<label class='radioLabel' for='rad_DVI_<NUM>'>DROP View						</label></span>
														<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_DCO_<NUM>' value='DCO_<NUM>' />	<label class='radioLabel' for='rad_DCO_<NUM>'>DROP Column					</label></span><br />
														<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_DPR_<NUM>' value='DPR_<NUM>' />	<label class='radioLabel' for='rad_DPR_<NUM>'>DROP Procedure				</label></span>
														<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_DIN_<NUM>' value='DIN_<NUM>' />	<label class='radioLabel' for='rad_DIN_<NUM>'>DROP Index					</label></span>
														<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_DEL_<NUM>' value='DEL_<NUM>' />	<label class='radioLabel' for='rad_DEL_<NUM>'>DELETE FROM					</label></span><br />
													</span>
													<!--OTHER: Misc-->
													<br />
													<label id='lbl_other_misc_<NUM>' data-type='sub3' for='cb_show_other_misc'>Misc</label><input class='w_cb cb_show_other_misc' type='checkbox' id='cb_show_other_misc_<NUM>'><img data-type='sub3' id='img_other_misc_opener_<NUM>' class='img_other_misc_opener' name='img_other_misc_opener_<NUM>'  src='${ arrow}' />
													<span class='s_other_misc'>
														<br />
														<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_MDT_<NUM>' value='MDT_<NUM>' />	<label class='radioLabel' for='rad_MDT_<NUM>'>Modify Data Type				</label></span>
														<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_RET_<NUM>' value='RET_<NUM>' />	<label class='radioLabel' for='rad_RET_<NUM>'>Rename Table					</label></span>
														<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_REC_<NUM>' value='REC_<NUM>' />	<label class='radioLabel' for='rad_REC_<NUM>'>Rename Column					</label></span><br />
														<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_REV_<NUM>' value='REV_<NUM>' />	<label class='radioLabel' for='rad_REV_<NUM>'>Rename View					</label></span>
														<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_UPD_<NUM>' value='UPD_<NUM>' />	<label class='radioLabel' for='rad_UPD_<NUM>'>UPDATE						</label></span>
														<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_INS_<NUM>' value='INS_<NUM>' />	<label class='radioLabel' for='rad_INS_<NUM>'>INSERT INTO					</label></span><br />
														<span class='radioSep'>	<input type='radio' name='rad_type_<NUM>' id='rad_CMD_<NUM>' value='CMD_<NUM>' />	<label class='radioLabel' for='rad_CMD_<NUM>'>Run Command					</label></span>
													</span>
												</span>
											</span>
											<p>SQL: </p>
										</td>
										<td>
											<label id='sql_label_top_<NUM>' class='unselectable' style='position:relative;left:-60px;font-family:Consolas;'>&lt;sql&gt;</label>
											<br />
											<label id='cdata_label_top_<NUM>' class='unselectable' style='position:relative;left:-40px;font-family:Consolas;color:#FF8'>&lt;![CDATA[</label>
											<br />
											<textarea onkeydown='keydownTab(event,this);' name='sql_<NUM>' id='sql_<NUM>' style='height:150px;' data-placeholder='SELECT&#13;&#09;*&#13;FROM&#13;&#09;texts' placeholder='SELECT&#13;&#09;*&#13;FROM&#13;&#09;texts' onfocus="this.placeholder = '';" onblur="if(this.placeholder==''){this.placeholder = this.getAttribute('data-placeholder');}" ></textarea>
											<span style='display:inline-block;'>
												Preset data generator<br />
												<div id='sql_apl_<NUM>' class='pc_applicator' onclick='setSQL(<NUM>);'>←</div>
												<select id='sql_sel_<NUM>' class='sql_selector'>
													<option value=''>&lt;WORK IN PROGRESS&gt;</option>
													<option value='CREATE INDEX \r\n\t_INDEX_NAME_ \r\nON \r\n\t_SCHEMA_._TABLE_ \r\nUSING \r\n\tbtree (_COLUMN_);'>CREATE INDEX</option>
												</select></span>
											<br />
											<label id='cdata_label_bottom_<NUM>' class='unselectable' style='position:relative;left:-40px;font-family:Consolas;color:#FF8'>]]&gt;</label>
											<br />
											<label id='sql_label_bottom_<NUM>' class='unselectable' style='position:relative;left:-60px;font-family:Consolas;'>&lt;/sql&gt;</label>
								
										</td>
									</tr>
								</div>
							</td>
						</tr>`;