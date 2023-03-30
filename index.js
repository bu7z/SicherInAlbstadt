

let toggle = 0;

function showForm(e){
    console.log("heloShowplz");
    toggle = 1
    if(e.id == "login"){
        document.getElementById("logF").style.transform = "scale(1)";
        document.getElementById("logF").style.transition = "1s";
        return;
    } else if(e.id == "reg"){
        document.getElementById("regF").style.transform = "scale(1)";
        document.getElementById("regF").style.transition = "1s";
        return;
    } else{
        return;
    }
}


function hideForm(e){
    console.log("hideplz");
    if (toggle != 0){
        toggle = 0;
        return;    
    } else if(e.id == "logF" || e.id == "regF"){
        //dont hide
        return;
    } else{
        document.getElementById("logF").style.transform = "scale(0)";
        document.getElementById("logF").style.transition = "1s";
        document.getElementById("regF").style.transform = "scale(0)";
        document.getElementById("regF").style.transition = "1s";
    }
    
}



//password confirmation

var password = document.getElementById("pwd")
  , confirm_password = document.getElementById("pwdConf");

function validatePassword(){
  if(password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;