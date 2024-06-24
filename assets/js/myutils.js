var prevIndex = -1; 
var sortState = 'N'; 
function sortTableDetails(obj){
	var position = $(obj).parent().index();
	var table, rows, switching, i, x, y, shouldSwitch;
	var tableName =  table = $(obj).parent().parent().parent().parent().attr("id");
	table = document.getElementById(tableName);
	switching = true;
		while (switching) {
		switching = false;
		rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");   
		for (i = 0; i < (rows.length - 1); i++) {     
			shouldSwitch = false;      
			x = rows[i].getElementsByTagName("TD")[position];
			y = rows[i + 1].getElementsByTagName("TD")[position]; 
			var sortdataType = 'string';
			if(rows[i].getElementsByTagName("TD")[position].getAttribute("data-type") == 'number' && rows[i + 1].getElementsByTagName("TD")[position].getAttribute("data-type") == 'number'){
				sortdataType = 'number';
			}     
			if( prevIndex != position){
				sortState = 'N';
			}     
			if( prevIndex == position && sortState == 'Y'){
			if(sortdataType == 'string'){
			if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {     
				shouldSwitch= true;
				break;
			}  	    
			}else{
				if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {     
					shouldSwitch= true;
					break;
				} 
			}
			}else{      
			if(sortdataType == 'string'){
			if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {     
				shouldSwitch= true;
				break;
			}
			}else{
					if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {     
						shouldSwitch= true;
						break;
					}
				} 
			}
		}
		if (shouldSwitch) {     
		rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		switching = true;
		}   
	}
	sortState = sortState == 'Y' ? 'N' : 'Y'; 
	prevIndex = position;
}

function initTableAttr(){
	$(".searchtxt").on("keyup", function () {
			var value = $(this).val().toLowerCase();
			$("#"+$(this).attr("data-id")+" tbody tr").filter(function () {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
		});
		$(".sortingClass").find('a').click(function () {
			sortTableDetails(this);
			return false;
		});
}

function stringToDateTime(date){
	var dateTime = date.split(" ");
	var dateArr = dateTime[0].split("/");
	var month=parseInt(dateArr[1]);
            month-=1;
	var timeArr = dateTime[1];
	var hour=timeArr.split(":")[0]
	if("PM" == dateTime[2]){
		hour = hour + 12;
	}	
 return new Date(dateArr[2],month,dateArr[0],hour,timeArr.split(":")[1]);
}