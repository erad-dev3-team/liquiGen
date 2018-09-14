function keydownTab(event,s)
{
	if(event.keyCode == 9){
		event.preventDefault();
		var sstart = s.selectionStart;
		var stringstart = s.value.substring(0,sstart);
		var stringend = s.value.substring(sstart);
		s.value = stringstart + "	" + stringend;
		s.selectionStart = sstart + 1;
		s.selectionEnd = sstart + 1;
		console.log();
	}
}

function help() 
{
	window.open("help.html", "_blank", "width=850, height=600");
}							

function openTab(evt, tabName) 
{
	// Declare all variables
	var i, tabcontent, tablinks;

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";

}