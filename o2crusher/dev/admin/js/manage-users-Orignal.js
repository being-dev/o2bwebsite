var quarryOwners = [];
var users = [];
var allscreen;
var allroles;
var typeVal="";

const SERVER_URL = getServerUrl();
$("#loadinganimation").show();
$(document).ajaxStop(function(){
  $("#loadinganimation").hide();
});
function loadUsers(type) {
    $.ajax({
        url: SERVER_URL + sessionStorage.getItem("o2crusher.code") +'/admin/web/user/list'+type,
        type: 'post',
		headers: {
                'token': sessionStorage.getItem("token"),
        },
        complete: function (response) {
            if (response.status == 200) {
				$("#datatableid").DataTable().destroy();
                users = response.responseJSON;
                var tableBody = prepareUserTableBody(users);
                $('#idUserTableBody').html(tableBody);				
				$('#datatableid').DataTable({"pageLength": 25});
            } else {
               errorRequest(response.status);
            }
        }
    });
}

function loadAllScreen(){
	 const SERVER_URL = getServerUrl();
    $.ajax({
        url: SERVER_URL + sessionStorage.getItem("o2crusher.code") +'/admin/web/screen/listScreen',
        type: 'post',
		headers: {
                'token': sessionStorage.getItem("token"),
        },
        complete: function (response) {
            if (response.status == 200) {
                users = response.responseJSON;
                //screenDetails(response);
				allscreen = response;
				loadAllRoles('','');
		    } else {
               errorRequest(response.status);
            }
        }
    });	
}
function loadAllRoles(reqtype,type){
	$("#loadinganimation").show();
	typeVal=type;
	 const SERVER_URL = getServerUrl();
    $.ajax({
        url: SERVER_URL + sessionStorage.getItem("o2crusher.code") +'/admin/web/role/listRole'+type,
        type: 'post',
		headers: {
                'token': sessionStorage.getItem("token"),
        },
        complete: function (response) {
			var ujson = JSON.parse(sessionStorage.getItem("users"));
			allroles=response.responseJSON;
			if (response.status == 200) {
				if(reqtype == 'U'){
						loadUsers(type);
				}else{
					prepareRoleList(response.responseJSON);
				
				}
            } else {
                errorRequest(response.status);
            }
        }
    });	
}

function partychange(result){
	if(result == 'Y'){
		$(".partyclass").show();
	}else{
		$(".partyclass").hide();
	}	
}

function loadAllParty(){
	 const SERVER_URL = getServerUrl();
    $.ajax({
        url: SERVER_URL + sessionStorage.getItem("o2crusher.code") +'/MOBILE/party-list?category=CRUSHER',
        type: 'post',
		headers: {
                'token': sessionStorage.getItem("token"),
        },
        complete: function (response) {
			 if (response.status == 200) {
					perparePartyList(response.responseJSON);				
		    } else {
                errorRequest(response.status);
            }
        }
    });	
}

function perparePartyList(response){
	var count = 1;
	$(response).each(function(index,obj){	
		if(count == 4){
			count=1;
		}
		$("#partylist"+count).append('<input type="radio" name="party" id="'+obj+'" value="'+obj+'" /><label for="'+obj+'">'+obj+'</label><br>');
		count++;
	});
}


function prepareRoleList(response){
	$("#datatableid").DataTable().destroy();
	$("#idRoleTableBody").html('');
	var ujson = JSON.parse(sessionStorage.getItem("users"));
   $(response).each(function(index,obj){
			var str="<tr><td>"+(++index)+"</td><td class='roleClass'>"+$(obj).attr('code')+"</td><td>"+$(obj).attr('description')+"</td>";
			str += '<td>';
			str += '<button type="button" class="btn btn-primary" title="Update" alt="Update" data-id="' + $(obj).attr('id') + '" onClick="editRole(this)"><i class="fa fa-edit"></i></button>';
			str += '&nbsp;&nbsp;';
			str += '<button type="button" class="btn btn-primary" title="Update" alt="Update" data-id="' + $(obj).attr('id') + '" onClick="viewRoleUser(this)"><i class="fa fa-users"></i></button>';
			str += '&nbsp;&nbsp;';
			str += '<button type="button" class="btn btn-danger" title="Remove" alt="Remove" data-id="' + $(obj).attr('id') + '" onClick="deleteRole(this)"><i class="fa fa-trash"></i></button>';
			str += '</td></tr>';		
			$("#idRoleTableBody").append(str);	
	});
	$('#datatableid').DataTable({"pageLength": 25});
}

function viewRoleUser(obj){
	var map = {};
		map["roleid"]=$(obj).attr("data-id");
		$.ajax({
				url: SERVER_URL + sessionStorage.getItem("o2crusher.code") +'/admin/web/role/rolewiseuser',
				type: 'post',
				headers: {
                'token': sessionStorage.getItem("token"),
				},
				data:JSON.stringify(map),
				complete: function (response) {
				if (response.status == 200) {
					$('#showModalRoleDialog').modal('show');
						var str="";
							$(response.responseJSON).each(function(key,val){
								str = str + (++key) +". " +val+"<br>" ;
							});
							if(str == ""){
								str="<h2>This role is not assign to any user.</h2>";
							}
							$("#rolewiseuserlist").html(str);
						
				} else {
					errorRequest(response.status);
				}
			}
		});	
}

function deleteRole(obj){
	if(confirm("Are you sure you want to delete this record?")){
		$("#loadinganimation").show();
		var map = {};
		map["id"]=$(obj).attr("data-id");
		$.ajax({
				url: SERVER_URL + sessionStorage.getItem("o2crusher.code") +'/admin/web/role/deleteRole',
				type: 'post',
				headers: {
                'token': sessionStorage.getItem("token"),
				},
				data:JSON.stringify(map),
				complete: function (response) {
				if (response.status == 200) {
						alert(response.responseJSON);
						loadAllRoles('','');
				} else {
					errorRequest(response.status);
				}
			}
		});
	}	
}
function deleteUser(userId) {
	if(confirm("Are you sure you want to delete this record?")){
		$("#loadinganimation").show();
		var map = {};
		map["id"]=userId;
		$.ajax({
				url: SERVER_URL + sessionStorage.getItem("o2crusher.code") +'/admin/web/user/deleteUser',
				type: 'post',
				headers: {
                'token': sessionStorage.getItem("token"),
				},
				data:JSON.stringify(map),
				complete: function (response) {
				if (response.status == 200) {
						alert(response.responseJSON);
						loadUsers(typeVal);
				} else {
					errorRequest(response.status);
				}
			}
		});
	}
}

function userStatus(userId,userStatus,mobileNO) {
	if(confirm("Are you sure you want to "+ (userStatus == 0 ? "Disable" : "Enable") +" user with MobileNo "+mobileNO+"?")){
		$("#loadinganimation").show();
		var map = {};
		map["id"]=userId;
		map["status"]=(userStatus == 0 ? false : true);
		$.ajax({
				url: SERVER_URL + sessionStorage.getItem("o2crusher.code") +'/admin/web/user/update-user-status',
				type: 'post',
				headers: {
					'token': sessionStorage.getItem("token"),
				},
				data:JSON.stringify(map),
				complete: function (response) {
				if (response.status == 200) {
						alert("Status Updated Successfully");
						loadUsers(typeVal);
				} else {
					errorRequest(response.status);
				}
			}
		});
	}
}
function editRole(obj){	

	var map = {};
	map["id"]=$(obj).attr("data-id");
	$.ajax({
			url: SERVER_URL + sessionStorage.getItem("o2crusher.code") +'/admin/web/role/getByIdRole',
			type: 'post',
			headers: {
                'token': sessionStorage.getItem("token"),
			},
			data:JSON.stringify(map),
			complete: function (response) {
				if (response.status == 200) {
					$('#showModalDialog').modal('show');
					$("input[type='checkbox']").prop('checked', false);
					screenDetails(allscreen);
					$("#txtRoleName").val(response.responseJSON.code);
					$("#txtDesc").val(response.responseJSON.description);
					$("#txtid").val(response.responseJSON.id)
					$.each(response.responseJSON.featuresMap,function(key,val){		
						//$("#"+key).prop('checked', true);
						//$("#"+val+"_"+key).prop('checked', true);
						if(document.getElementById(key) != null){
							document.getElementById(key).checked = true;
							document.getElementById(val+"_"+key).checked = true;
						}
					});
				} else {
					errorRequest(response.status);
				}
			}
		});
}

function editUser(userId) {
    	var map = {};
		map["userId"]=userId;
		$.ajax({
			url: SERVER_URL + sessionStorage.getItem("o2crusher.code") +'/admin/web/user/getById',
			type: 'post',
			headers: {
                'token': sessionStorage.getItem("token"),
			},
			data:JSON.stringify(map),
			complete: function (response) {
				if (response.status == 200) {
					var user = response.responseJSON;
					$('#txtMobile').val(user.mobile).attr('readonly','readonly');
					$('#txtid').val(user.id);
					$('#txtEmail').val(user.email);
					$('#txtPassword').val(user.password).attr('readonly','readonly');
					$('#txtusername').val(user.username);
					$('#showModalDialog').modal('show');
					$("#assignRoles").empty();
					$("#allRoles").empty();
					$("#assignManager").empty();
					$("#allUsers").empty();
					var ujson = JSON.parse(sessionStorage.getItem("users"));
					$.each(allroles, function(key, value) {
						$("#allRoles").append('<option value="'+value.id+'">'+value.code+'</option>');
						
					});
					$.each(users, function(key, value) {
						$("#allUsers").append('<option value="'+value.id+'">'+value.mobile + "-" +value.username+'</option>');
					});
					$.each(user.userRoles, function(key, value) {
						$('#allRoles option[value="'+value+'"]').detach().appendTo('#assignRoles');
					});
					$.each(user.userManager, function(key, value) {
						$('#allUsers option[value="'+value+'"]').detach().appendTo('#assignManager');
					});
					if(user.partyassign == null){
						$("input[type='radio'][id='noid']").prop('checked',true);
						partychange('N');
					}else{
						$("input[type='radio'][id='yesid']").prop('checked',true);
						partychange('Y');
						$("input[type='radio'][id='"+user.partyassign+"']").prop('checked',true);
					}
					
				}else{
					errorRequest(response.status);
				}
		}		
	});
}

function openAdd(){
	$('#showModalDialog').modal('show');
	$("input[type='checkbox']").prop('checked', false);
	$("#txtid").val(""); 
	$("#txtRoleName").val("");
	$("#txtDesc").val("");

	screenDetails(allscreen);
}
function openUserAdd(){
	$('#showModalDialog').modal('show');
	$('#txtMobile').attr('readonly',false);
	$('#txtPassword').attr('readonly',false);	
	$("#assignRoles").empty();
	$("#allRoles").empty();
	$("#assignManager").empty();
	$("#allUsers").empty();
	$('#txtMobile').val("");
	$('#txtEmail').val("");
	$('#txtPassword').val("");
	$('#txtusername').val("");
	$("#txtid").val("");
	var ujson = JSON.parse(sessionStorage.getItem("users"));
	$.each(allroles, function(key, value) {
			$("#allRoles").append('<option value="'+value.id+'">'+value.code+'</option>');
	});
	$.each(users, function(key, value) {
		$("#allUsers").append('<option value="'+value.id+'">'+value.mobile + "-" +value.username+'</option>');
	});
	$("input[type='radio'][id='noid']").prop('checked',true);
	partychange('N');	
	
}

function sortMenu(response){
	var newMap = {};
	for(var i=1;i<=Object.keys(response).length;i++){
		$.each(response, function(key, value) {
			if(i.toString() == key.split(",")[2]){
				newMap[key]=value;
			}
		});	
	}
	return newMap;
}

function screenDetails(response){
	var newMap = sortMenu(response.responseJSON.details);
	var str ='<div ><div class="form-group col-md-12">';
	$.each(newMap, function(key, value) {
		str = str +  '<h3><u>'+key.split(",")[0]+'</u></h3>';
		let sortedVal = Object.keys(value).sort().reduce((a, c) => (a[c] = value[c], a), {});		
		$.each(sortedVal, function(key2, value2) {
		str = str +  '<ul style="margin-left:15px"><li><label for="txtEmail2" class="form-label">'+key2+'</label><ol>';
			$.each(value2, function(key3, value3) {				
				str = str +  '<li><input type="checkbox" name="mainid" id="'+value3.id+'" onclick="checkradioState(this)" ></input>&nbsp;&nbsp;<label>'+value3.name+'</label>&nbsp;&nbsp;[Read Access <input type="radio" name="myradio'+value3.id+'" value="R" id="R_'+value3.id+'"> | Full Access <input type="radio" value="F" name="myradio'+value3.id+'" id="F_'+value3.id+'">&nbsp;&nbsp;]</li>';
			});
			str=str+"</ol></li></ul>";
		});
		str=str+"<br>";
	});
	$("#screenDetails").html(str+"</div></div>");
	
}
function checkradioState(obj){
	if($(obj).is(":checked")){
		$($('input[name="myradio'+$(obj).attr("id")+'"]').get(1)).prop("checked",true);
	}else{
		$($('input[name="myradio'+$(obj).attr("id")+'"]').get(0)).prop("checked",false);
		$($('input[name="myradio'+$(obj).attr("id")+'"]').get(1)).prop("checked",false);
	}
}

function prepareUserTableBody(users) {
    var tableBody = '';
	var count = 1;
	var ujson = JSON.parse(sessionStorage.getItem("users"));
    users.forEach(user => {
			tableBody += '<tr>';
			tableBody += '<td>';
			tableBody += (count++);
			tableBody += '</td>';
			tableBody += '<td>';
			tableBody += user.username;
			tableBody += '</td>';
			tableBody += '<td class="mobileClass">';
			tableBody += user.mobile;
			tableBody += '</td>';
			tableBody += '<td>';
			tableBody += user.email == null ? "" : user.email;
			tableBody += '</td>';
			tableBody += '<td>';
			tableBody += prepareRoles(user.userRoles);
			tableBody += '</td>';
			tableBody += '<td>';
			tableBody += '<button type="button" class="btn btn-primary" title="Update" alt="Update" onClick="editUser(\'' + user.id + '\')"><i class="fa fa-edit"></i></button>';
			tableBody += '&nbsp;';
			tableBody += '<button type="button" class="btn btn-danger" title="Remove" alt="Remove" onClick="deleteUser(\'' + user.id + '\')"><i class="fa fa-trash"></i></button>';
			tableBody += '&nbsp;';
			var isActiveFontClass = 'fa fa-check'
			var isActiveButtonClass = 'btn btn-primary'
			var userTitle= 'Active User';
			var userStatus = 0;
			if(user.isActive == false){
				isActiveFontClass ='fa fa-warning';
				isActiveButtonClass='btn btn-danger';
				userTitle= 'Disabled User';
				userStatus=1;
			}
			tableBody += '<button type="button" class="'+isActiveButtonClass+'" title="'+userTitle+'" alt="'+userTitle+'" onClick="userStatus(' + user.id + ','+userStatus+','+user.mobile+')"><i class="'+isActiveFontClass+'"></i></button>';
			tableBody += '</td>';
			tableBody += '</tr>';
	});

    if (users.length == 0) {
        tableBody += '<tr class="form-label">';
        tableBody += '<td colspan="7" align="center">';
        tableBody += 'No records avaialble.';
        tableBody += '</td>';
        tableBody += '</tr>';

    }

    return tableBody;
}

function prepareRoles(assignroles){
	var str = "";
	$(assignroles).each(function(key,val){
		str = str + getRoleName(val) + ", ";
	});
	return str
}
function getRoleName(id){
	var str="";
	$(allroles).each(function(key,value){		
		if(value.id == id){
			str =  value.code;
		}
	});
	return str;
}

$('#btnUFSubmit').click(function (event) {
	if($("#txtusername").val() == ""){
		alert("Please Enter User Name");
		return false;
	}
	if($("#txtPassword").val() == ""){
		alert("Please Enter Password");
		return false;
	}
	if($("#txtPassword").val().length <= 4){
		alert("Password must be minimum 5 characters");
		return false;
	}
	if($("#txtEmail").val() != ""){
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if( !emailReg.test( $("#txtEmail").val() ) ) {
			alert("Please enter valid email id");
			return false;
		} 
	}
	if($("#assignRoles").find("option").length == 0){
		alert("Please add some roles to user");
		return false;
	}
	var selPart = $("input[type='radio'][name='party']:checked").val();
	if($("input[type='radio'][name='sel']:checked").val() == "Y" && selPart == undefined){
		alert("Please map party for user");
		return false;
	}
	
	var map = {};
	var suffixurl="";	
	if($("#txtid").val() != ""){
		map["id"]=$("#txtid").val();	
		suffixurl="updateUser";		
	}else{
		map["password"]=$("#txtPassword").val();
		suffixurl="createUser";	
		var found="N";
		$(users).each(function (i,u){
			if(u.mobile == $("#txtMobile").val()){
				 found="Y";
			}  
		});
		if(found == 'Y'){
			alert("Sorry This Mobile number is already used, Please enter different Mobile Number.");
			return false;
		}
	}
	map["mobile"]=$("#txtMobile").val();
	map["email"]=$("#txtEmail").val();	
	map["username"]=$("#txtusername").val();
	if($("input[type='radio'][name='sel']:checked").val() == "Y"){
		map["partyassign"]=selPart;
	}
	
	var array = new Array();
	$("#assignRoles option").each(function(){
		array.push($(this).val());  
	});
	map["userRoles"]=array;
	
	var array2 = new Array();
	$("#assignManager option").each(function(){
		array2.push($(this).val());  
	});
	map["userManager"]=array2;
	$(this).attr("disabled",true).html("Please Wait...")
	$.ajax({
			url: SERVER_URL + sessionStorage.getItem("o2crusher.code") +'/admin/web/user/'+suffixurl,
			type: 'post',
			headers: {
                'token': sessionStorage.getItem("token"),
			},
			data:JSON.stringify(map),
			complete: function (response) {
				$('#btnUFSubmit').attr("disabled",false).html("Save")
				if (response.status == 200) {
					alert(response.responseJSON);
					setTimeout(() => {
						loadUsers(typeVal);
						$('#showModalDialog').modal('hide');
					}, 1000);
				}else if (response.status == 500) {
					alert(response.responseJSON);
				} else {
					errorRequest(response.status);
				}
			}
		});
});

$('#btnRolesSubmit').click(function (event) {
	if($("#txtRoleName").val() == ""){
		alert("Role name must not be empty");
		return false;
	}
	if($("#txtDesc").val() == ""){
		alert("Role Description must not be empty");
		return false;
	}
	var map2={};
	$("input[name='mainid']:checked").each(function(){
		map2[$(this).attr("id")]=$('input[name="myradio'+$(this).attr("id")+'"]:checked').val();
	});
	
	var map = {};
	if($("#txtid").val() != ""){
		map["id"]=$("#txtid").val();
	}else{
		var found="N";
		$(".roleClass").each(function(){
			if($(this).html() == $("#txtRoleName").val()){
				 found="Y";
			}
		});
		if(found == 'Y'){
			alert("Sorry This Role name is already used, Please enter different Role name.");
			return false;
		}
		
	}
	map["code"]=$("#txtRoleName").val();
	map["description"]=$("#txtDesc").val();
	map["featuresMap"]=map2;
	$.ajax({
			url: SERVER_URL + sessionStorage.getItem("o2crusher.code") +'/admin/web/role/createRole',
			type: 'post',
			headers: {
                'token': sessionStorage.getItem("token"),
			},
			data:JSON.stringify(map),
			complete: function (response) {
				if (response.status == 200) {
					alert(response.responseJSON);
					setTimeout(() => {
						loadAllRoles('','');
						$('#showModalDialog').modal('hide');
					}, 1000);
				} else {
					errorRequest(response.status);
				}
			}
		});
});
var mytoken='';
$('#btnsignin').click(function (event) {
	sessionStorage.clear();
	if($("#mobile").val() == "" || $("#pass").val() == "" || $("#code").val() == "" ){
		alert("Please enter Code, Mobile Number and Password");
		return false;
	}
	sessionStorage.setItem("o2crusher.code",$("#code").val().toUpperCase());
	$(this).html("<i class='fa fa-spinner fa-spin'></i>&nbsp;&nbsp;Please Wait...").attr("disabled",true);
	var map={};
	map["mobile"]=$("#mobile").val();
	map["password"]=$("#pass").val();
	$.ajax({
			url: SERVER_URL + sessionStorage.getItem("o2crusher.code") +'/admin/web/user/login',
			type: 'post',
			headers: {
                'token': 'A',
				'data': 'Y'
			},
			data:JSON.stringify(map),
			complete: function (response) {
				$('#btnsignin').html("Sign in").attr("disabled",false);
				if (response.status == 200) {
					if(typeof response.responseJSON == 'string'){
						mytoken=response.responseJSON;
						$('#otpModalDialog').modal('show');
						otpfocus();				
					}else{
						sessionStorage.setItem("token",response.responseJSON.additionalDetails[0]);
						sessionStorage.setItem("access",JSON.stringify(response.responseJSON.details["Admin Portal,truck,7"]));
						sessionStorage.setItem("users",JSON.stringify(response.responseJSON.users));
						location.href="views/index.html"	
					}
				} else {
					alert(response.responseJSON);					
				}
			}
		});
});

function otpfocus(){
	setTimeout(() => {
			$("#txtotp").focus();
	}, 1000);
}

$('#btnOtplogin').click(function (event) {
	if($("#txtotp").val() == "" || $("#txtotp").val().length != 6){
		alert("Please enter valid OTP");
		otpfocus();
		return false;
	}
	$(this).html("<i class='fa fa-spinner fa-spin'></i>&nbsp;&nbsp;Please Wait...").attr("disabled",true);
	var map={};
	map["otp"]=$("#txtotp").val();
	map["password"]=$("#pass").val();
	$.ajax({
			url: SERVER_URL + sessionStorage.getItem("o2crusher.code") +'/admin/web/user/loginotp',
			type: 'post',
			headers: {
                'token': 'A',
				'data': mytoken
			},
			data:JSON.stringify(map),
			complete: function (response) {
				$("#btnOtplogin").html("Verify Login").attr("disabled",false);
				if (response.status == 200) {
						$('#otpModalDialog').modal('hide');
						sessionStorage.setItem("token",response.responseJSON.additionalDetails[0]);
						sessionStorage.setItem("access",JSON.stringify(response.responseJSON.details["Admin Portal,truck,7"]));
						sessionStorage.setItem("users",JSON.stringify(response.responseJSON.users));
						location.href="views/index.html"	
				} else {
					alert(response.responseJSON);
					otpfocus();					
				}
			}
		});
});


function submitOtp(){
	$('#btnOtplogin').trigger('click');
	return false;
}
function errorRequest(sta){
	location.href="../index.html";
}
function showPass(){
	if($("#txtid").val() == ""){
		if($("#txtPassword").attr("type") == 'text'){	
			$("#txtPassword").attr("type","password");
			$("#eyePass").attr("class","fa fa-eye-slash");
		}else{
			$("#txtPassword").attr("type","text");
			$("#eyePass").attr("class","fa fa-eye");		
		}
	}
}