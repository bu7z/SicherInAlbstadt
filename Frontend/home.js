function loadfunc(){
    

    let str2 = document.getElementById("newchats").innerHTML;
    let result2 = str2.replace(/anzahl/gi, "29");
    document.getElementById("newchats").innerHTML = result2;
}

fetch('/home')
      .then(response => response.text())
      .then(data => {
        document.getElementById('bname').innerHTML = data;
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Daten:', error);
      });

function c_logout(){
    alert('logöt');
}

