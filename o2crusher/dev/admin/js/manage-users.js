var allscreen,allroles,quarryOwners=[],users=[],typeVal="";const SERVER_URL=getServerUrl();function loadUsers(e){$.ajax({url:SERVER_URL+sessionStorage.getItem("o2crusher.code")+"/admin/web/user/list"+e,type:"post",headers:{token:sessionStorage.getItem("token")},complete:function(e){if(200==e.status){$("#datatableid").DataTable().destroy();var t=prepareUserTableBody(users=e.responseJSON);$("#idUserTableBody").html(t),$("#datatableid").DataTable({pageLength:25})}else errorRequest(e.status)}})}function loadAllScreen(){let e=getServerUrl();$.ajax({url:e+sessionStorage.getItem("o2crusher.code")+"/admin/web/screen/listScreen",type:"post",headers:{token:sessionStorage.getItem("token")},complete:function(e){200==e.status?(users=e.responseJSON,allscreen=e,loadAllRoles("","")):errorRequest(e.status)}})}function loadAllRoles(e,t){$("#loadinganimation").show(),typeVal=t;let a=getServerUrl();$.ajax({url:a+sessionStorage.getItem("o2crusher.code")+"/admin/web/role/listRole"+t,type:"post",headers:{token:sessionStorage.getItem("token")},complete:function(a){JSON.parse(sessionStorage.getItem("users")),allroles=a.responseJSON,200==a.status?"U"==e?loadUsers(t):prepareRoleList(a.responseJSON):errorRequest(a.status)}})}function partychange(e){"Y"==e?$(".partyclass").show():$(".partyclass").hide()}function loadAllParty(){let e=getServerUrl();$.ajax({url:e+sessionStorage.getItem("o2crusher.code")+"/MOBILE/party-list?category=CRUSHER",type:"post",headers:{token:sessionStorage.getItem("token")},complete:function(e){200==e.status?perparePartyList(e.responseJSON):errorRequest(e.status)}})}function perparePartyList(e){var t=1;$(e).each(function(e,a){4==t&&(t=1),$("#partylist"+t).append('<input type="radio" name="party" id="'+a+'" value="'+a+'" /><label for="'+a+'">'+a+"</label><br>"),t++})}function prepareRoleList(e){$("#datatableid").DataTable().destroy(),$("#idRoleTableBody").html(""),JSON.parse(sessionStorage.getItem("users")),$(e).each(function(e,t){var a="<tr><td>"+ ++e+"</td><td class='roleClass'>"+$(t).attr("code")+"</td><td>"+$(t).attr("description")+"</td>";a+="<td>",a+='<button type="button" class="btn btn-primary" title="Update" alt="Update" data-id="'+$(t).attr("id")+'" onClick="editRole(this)"><i class="fa fa-edit"></i></button>',a+="&nbsp;&nbsp;",a+='<button type="button" class="btn btn-primary" title="Update" alt="Update" data-id="'+$(t).attr("id")+'" onClick="viewRoleUser(this)"><i class="fa fa-users"></i></button>',a+="&nbsp;&nbsp;",a+='<button type="button" class="btn btn-danger" title="Remove" alt="Remove" data-id="'+$(t).attr("id")+'" onClick="deleteRole(this)"><i class="fa fa-trash"></i></button>',a+="</td></tr>",$("#idRoleTableBody").append(a)}),$("#datatableid").DataTable({pageLength:25})}function viewRoleUser(e){var t={};t.roleid=$(e).attr("data-id"),$.ajax({url:SERVER_URL+sessionStorage.getItem("o2crusher.code")+"/admin/web/role/rolewiseuser",type:"post",headers:{token:sessionStorage.getItem("token")},data:JSON.stringify(t),complete:function(e){if(200==e.status){$("#showModalRoleDialog").modal("show");var t="";$(e.responseJSON).each(function(e,a){t=t+ ++e+". "+a+"<br>"}),""==t&&(t="<h2>This role is not assign to any user.</h2>"),$("#rolewiseuserlist").html(t)}else errorRequest(e.status)}})}function deleteRole(e){if(confirm("Are you sure you want to delete this record?")){$("#loadinganimation").show();var t={};t.id=$(e).attr("data-id"),$.ajax({url:SERVER_URL+sessionStorage.getItem("o2crusher.code")+"/admin/web/role/deleteRole",type:"post",headers:{token:sessionStorage.getItem("token")},data:JSON.stringify(t),complete:function(e){200==e.status?(alert(e.responseJSON),loadAllRoles("","")):errorRequest(e.status)}})}}function deleteUser(e){if(confirm("Are you sure you want to delete this record?")){$("#loadinganimation").show();var t={};t.id=e,$.ajax({url:SERVER_URL+sessionStorage.getItem("o2crusher.code")+"/admin/web/user/deleteUser",type:"post",headers:{token:sessionStorage.getItem("token")},data:JSON.stringify(t),complete:function(e){200==e.status?(alert(e.responseJSON),loadUsers(typeVal)):errorRequest(e.status)}})}}function userStatus(e,t,a){if(confirm("Are you sure you want to "+(0==t?"Disable":"Enable")+" user with MobileNo "+a+"?")){$("#loadinganimation").show();var s={};s.id=e,s.status=0!=t,$.ajax({url:SERVER_URL+sessionStorage.getItem("o2crusher.code")+"/admin/web/user/update-user-status",type:"post",headers:{token:sessionStorage.getItem("token")},data:JSON.stringify(s),complete:function(e){200==e.status?(alert("Status Updated Successfully"),loadUsers(typeVal)):errorRequest(e.status)}})}}function editRole(e){var t={};t.id=$(e).attr("data-id"),$.ajax({url:SERVER_URL+sessionStorage.getItem("o2crusher.code")+"/admin/web/role/getByIdRole",type:"post",headers:{token:sessionStorage.getItem("token")},data:JSON.stringify(t),complete:function(e){200==e.status?($("#showModalDialog").modal("show"),$("input[type='checkbox']").prop("checked",!1),screenDetails(allscreen),$("#txtRoleName").val(e.responseJSON.code),$("#txtDesc").val(e.responseJSON.description),$("#txtid").val(e.responseJSON.id),$.each(e.responseJSON.featuresMap,function(e,t){null!=document.getElementById(e)&&(document.getElementById(e).checked=!0,document.getElementById(t+"_"+e).checked=!0)})):errorRequest(e.status)}})}function editUser(e){var t={};t.userId=e,$.ajax({url:SERVER_URL+sessionStorage.getItem("o2crusher.code")+"/admin/web/user/getById",type:"post",headers:{token:sessionStorage.getItem("token")},data:JSON.stringify(t),complete:function(e){if(200==e.status){var t=e.responseJSON;$("#txtMobile").val(t.mobile).attr("readonly","readonly"),$("#txtid").val(t.id),$("#txtEmail").val(t.email),$("#txtPassword").val(t.password).attr("readonly","readonly"),$("#txtusername").val(t.username),$("#showModalDialog").modal("show"),$("#assignRoles").empty(),$("#allRoles").empty(),$("#assignManager").empty(),$("#allUsers").empty(),JSON.parse(sessionStorage.getItem("users")),$.each(allroles,function(e,t){$("#allRoles").append('<option value="'+t.id+'">'+t.code+"</option>")}),$.each(users,function(e,t){$("#allUsers").append('<option value="'+t.id+'">'+t.mobile+"-"+t.username+"</option>")}),$.each(t.userRoles,function(e,t){$('#allRoles option[value="'+t+'"]').detach().appendTo("#assignRoles")}),$.each(t.userManager,function(e,t){$('#allUsers option[value="'+t+'"]').detach().appendTo("#assignManager")}),null==t.partyassign?($("input[type='radio'][id='noid']").prop("checked",!0),partychange("N")):($("input[type='radio'][id='yesid']").prop("checked",!0),partychange("Y"),$("input[type='radio'][id='"+t.partyassign+"']").prop("checked",!0))}else errorRequest(e.status)}})}function openAdd(){$("#showModalDialog").modal("show"),$("input[type='checkbox']").prop("checked",!1),$("#txtid").val(""),$("#txtRoleName").val(""),$("#txtDesc").val(""),screenDetails(allscreen)}function openUserAdd(){$("#showModalDialog").modal("show"),$("#txtMobile").attr("readonly",!1),$("#txtPassword").attr("readonly",!1),$("#assignRoles").empty(),$("#allRoles").empty(),$("#assignManager").empty(),$("#allUsers").empty(),$("#txtMobile").val(""),$("#txtEmail").val(""),$("#txtPassword").val(""),$("#txtusername").val(""),$("#txtid").val(""),JSON.parse(sessionStorage.getItem("users")),$.each(allroles,function(e,t){$("#allRoles").append('<option value="'+t.id+'">'+t.code+"</option>")}),$.each(users,function(e,t){$("#allUsers").append('<option value="'+t.id+'">'+t.mobile+"-"+t.username+"</option>")}),$("input[type='radio'][id='noid']").prop("checked",!0),partychange("N")}function sortMenu(e){for(var t={},a=1;a<=Object.keys(e).length;a++)$.each(e,function(e,s){a.toString()==e.split(",")[2]&&(t[e]=s)});return t}function screenDetails(e){var t=sortMenu(e.responseJSON.details),a='<div ><div class="form-group col-md-12">';$.each(t,function(e,t){a=a+"<h3><u>"+e.split(",")[0]+"</u></h3>";let s=Object.keys(t).sort().reduce((e,a)=>(e[a]=t[a],e),{});$.each(s,function(e,t){a=a+'<ul style="margin-left:15px"><li><label for="txtEmail2" class="form-label">'+e+"</label><ol>",$.each(t,function(e,t){a=a+'<li><input type="checkbox" name="mainid" id="'+t.id+'" onclick="checkradioState(this)" ></input>&nbsp;&nbsp;<label>'+t.name+'</label>&nbsp;&nbsp;[Read Access <input type="radio" name="myradio'+t.id+'" value="R" id="R_'+t.id+'"> | Full Access <input type="radio" value="F" name="myradio'+t.id+'" id="F_'+t.id+'">&nbsp;&nbsp;]</li>'}),a+="</ol></li></ul>"}),a+="<br>"}),$("#screenDetails").html(a+"</div></div>")}function checkradioState(e){$(e).is(":checked")?$($('input[name="myradio'+$(e).attr("id")+'"]').get(1)).prop("checked",!0):($($('input[name="myradio'+$(e).attr("id")+'"]').get(0)).prop("checked",!1),$($('input[name="myradio'+$(e).attr("id")+'"]').get(1)).prop("checked",!1))}function prepareUserTableBody(e){var t="",a=1;return JSON.parse(sessionStorage.getItem("users")),e.forEach(e=>{t+="<tr>",t+="<td>",t+=a++,t+="</td>",t+="<td>",t+=e.username,t+="</td>",t+='<td class="mobileClass">',t+=e.mobile,t+="</td>",t+="<td>",t+=null==e.email?"":e.email,t+="</td>",t+="<td>",t+=prepareRoles(e.userRoles),t+="</td>",t+="<td>",t+='<button type="button" class="btn btn-primary" title="Update" alt="Update" onClick="editUser(\''+e.id+'\')"><i class="fa fa-edit"></i></button>',t+="&nbsp;",t+='<button type="button" class="btn btn-danger" title="Remove" alt="Remove" onClick="deleteUser(\''+e.id+'\')"><i class="fa fa-trash"></i></button>',t+="&nbsp;";var s="fa fa-check",o="btn btn-primary",r="Active User",n=0;!1==e.isActive&&(s="fa fa-warning",o="btn btn-danger",r="Disabled User",n=1),t+='<button type="button" class="'+o+'" title="'+r+'" alt="'+r+'" onClick="userStatus('+e.id+","+n+","+e.mobile+')"><i class="'+s+'"></i></button>',t+="</td>",t+="</tr>"}),0==e.length&&(t+='<tr class="form-label">',t+='<td colspan="7" align="center">',t+="No records avaialble.",t+="</td>",t+="</tr>"),t}function prepareRoles(e){var t="";return $(e).each(function(e,a){t=t+getRoleName(a)+", "}),t}function getRoleName(e){var t="";return $(allroles).each(function(a,s){s.id==e&&(t=s.code)}),t}$("#loadinganimation").show(),$(document).ajaxStop(function(){$("#loadinganimation").hide()}),$("#btnUFSubmit").click(function(e){if(""==$("#txtusername").val())return alert("Please Enter User Name"),!1;if(""==$("#txtPassword").val())return alert("Please Enter Password"),!1;if($("#txtPassword").val().length<=4)return alert("Password must be minimum 5 characters"),!1;if(""!=$("#txtEmail").val()&&!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test($("#txtEmail").val()))return alert("Please enter valid email id"),!1;if(0==$("#assignRoles").find("option").length)return alert("Please add some roles to user"),!1;var t=$("input[type='radio'][name='party']:checked").val();if("Y"==$("input[type='radio'][name='sel']:checked").val()&&void 0==t)return alert("Please map party for user"),!1;var a={},s="";if(""!=$("#txtid").val())a.id=$("#txtid").val(),s="updateUser";else{a.password=$("#txtPassword").val(),s="createUser";var o="N";if($(users).each(function(e,t){t.mobile==$("#txtMobile").val()&&(o="Y")}),"Y"==o)return alert("Sorry This Mobile number is already used, Please enter different Mobile Number."),!1}a.mobile=$("#txtMobile").val(),a.email=$("#txtEmail").val(),a.username=$("#txtusername").val(),"Y"==$("input[type='radio'][name='sel']:checked").val()&&(a.partyassign=t);var r=[];$("#assignRoles option").each(function(){r.push($(this).val())}),a.userRoles=r;var n=[];$("#assignManager option").each(function(){n.push($(this).val())}),a.userManager=n,$(this).attr("disabled",!0).html("Please Wait..."),$.ajax({url:SERVER_URL+sessionStorage.getItem("o2crusher.code")+"/admin/web/user/"+s,type:"post",headers:{token:sessionStorage.getItem("token")},data:JSON.stringify(a),complete:function(e){$("#btnUFSubmit").attr("disabled",!1).html("Save"),200==e.status?(alert(e.responseJSON),setTimeout(()=>{loadUsers(typeVal),$("#showModalDialog").modal("hide")},1e3)):500==e.status?alert(e.responseJSON):errorRequest(e.status)}})}),$("#btnRolesSubmit").click(function(e){if(""==$("#txtRoleName").val())return alert("Role name must not be empty"),!1;if(""==$("#txtDesc").val())return alert("Role Description must not be empty"),!1;var t={};$("input[name='mainid']:checked").each(function(){t[$(this).attr("id")]=$('input[name="myradio'+$(this).attr("id")+'"]:checked').val()});var a={};if(""!=$("#txtid").val())a.id=$("#txtid").val();else{var s="N";if($(".roleClass").each(function(){$(this).html()==$("#txtRoleName").val()&&(s="Y")}),"Y"==s)return alert("Sorry This Role name is already used, Please enter different Role name."),!1}a.code=$("#txtRoleName").val(),a.description=$("#txtDesc").val(),a.featuresMap=t,$.ajax({url:SERVER_URL+sessionStorage.getItem("o2crusher.code")+"/admin/web/role/createRole",type:"post",headers:{token:sessionStorage.getItem("token")},data:JSON.stringify(a),complete:function(e){200==e.status?(alert(e.responseJSON),setTimeout(()=>{loadAllRoles("",""),$("#showModalDialog").modal("hide")},1e3)):errorRequest(e.status)}})});var mytoken="";function otpfocus(){setTimeout(()=>{$("#txtotp").focus()},1e3)}function submitOtp(){return $("#btnOtplogin").trigger("click"),!1}function errorRequest(e){location.href="../index.html"}function showPass(){""==$("#txtid").val()&&("text"==$("#txtPassword").attr("type")?($("#txtPassword").attr("type","password"),$("#eyePass").attr("class","fa fa-eye-slash")):($("#txtPassword").attr("type","text"),$("#eyePass").attr("class","fa fa-eye")))}$("#btnsignin").click(function(e){if(sessionStorage.clear(),""==$("#mobile").val()||""==$("#pass").val()||""==$("#code").val())return alert("Please enter Code, Mobile Number and Password"),!1;sessionStorage.setItem("o2crusher.code",$("#code").val().toUpperCase()),$(this).html("<i class='fa fa-spinner fa-spin'></i>&nbsp;&nbsp;Please Wait...").attr("disabled",!0);var t={};t.mobile=$("#mobile").val(),t.password=$("#pass").val(),$.ajax({url:SERVER_URL+sessionStorage.getItem("o2crusher.code")+"/admin/web/user/login",type:"post",headers:{token:"A",data:"Y"},data:JSON.stringify(t),complete:function(e){$("#btnsignin").html("Sign in").attr("disabled",!1),200==e.status?"string"==typeof e.responseJSON?(mytoken=e.responseJSON,$("#otpModalDialog").modal("show"),otpfocus()):(sessionStorage.setItem("token",e.responseJSON.additionalDetails[0]),sessionStorage.setItem("access",JSON.stringify(e.responseJSON.details["Admin Portal,truck,7"])),sessionStorage.setItem("users",JSON.stringify(e.responseJSON.users)),location.href="views/index.html"):alert(e.responseJSON)}})}),$("#btnOtplogin").click(function(e){if(""==$("#txtotp").val()||6!=$("#txtotp").val().length)return alert("Please enter valid OTP"),otpfocus(),!1;$(this).html("<i class='fa fa-spinner fa-spin'></i>&nbsp;&nbsp;Please Wait...").attr("disabled",!0);var t={};t.otp=$("#txtotp").val(),t.password=$("#pass").val(),$.ajax({url:SERVER_URL+sessionStorage.getItem("o2crusher.code")+"/admin/web/user/loginotp",type:"post",headers:{token:"A",data:mytoken},data:JSON.stringify(t),complete:function(e){$("#btnOtplogin").html("Verify Login").attr("disabled",!1),200==e.status?($("#otpModalDialog").modal("hide"),sessionStorage.setItem("token",e.responseJSON.additionalDetails[0]),sessionStorage.setItem("access",JSON.stringify(e.responseJSON.details["Admin Portal,truck,7"])),sessionStorage.setItem("users",JSON.stringify(e.responseJSON.users)),location.href="views/index.html"):(alert(e.responseJSON),otpfocus())}})});