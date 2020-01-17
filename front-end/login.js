
// Below function Executes on click of login button.
function validate(){
var email = document.getElementById("email").value;
var password = document.getElementById("password").value;
if ( email == "rrakesh711@gmail.com" && password == "12345678"){
window.location.href = "homepage.html"; // Redirecting to other page.
return false;
}
else if(email == "test@gmail.com" && password == "12345678"){
    window.location.href = "homepage.html"; // Redirecting to other page.
    return false;
}
else{
alert("Wrong Username or Password");
return false;
}
}