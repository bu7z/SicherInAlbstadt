function loadfunc(){
    let str = document.getElementById("bname").innerHTML;
    let result = str.replace(/Benutzername/gi,"Marcel");
    document.getElementById("bname").innerHTML = result;

    let str2 = document.getElementById("newchats").innerHTML;
    let result2 = str2.replace(/anzahl/gi, "29");
    document.getElementById("newchats").innerHTML = result2;
}

function c_logout(){
    alert('logöt');
}

