

fetch('/home_name', {
  credentials: "include"
})
      .then(response => response.text())
      .then(data => {
        document.getElementById('bname').innerHTML = data;
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Daten:', error);
      });

fetch('/home_anznachr', {
  credentials: 'include'
})
      .then(response => response.text())
      .then(data => {
        document.getElementById('newchats').innerHTML = data;
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Daten:', error);
      });
