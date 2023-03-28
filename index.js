

let toggle = 0;

function showForm(e){
    console.log("heloShowplz");
    toggle = 1
    if(e.id == "login"){
        document.getElementById("logF").style.transform = "scale(1)";
        document.getElementById("logF").style.transition = "1s";
        return;
    } else{

    }
    return;
}


function hideForm(e){
    console.log("hideplz");
    if (toggle != 0){
        toggle = 0;
        return;    
    } else if(e.id == "logF"){
        console.log("dontHidePlz");
        return;
    } else{
        document.getElementById("logF").style.transform = "scale(0)";
        document.getElementById("logF").style.transition = "1s";
        console.log("test");
    }
    
}