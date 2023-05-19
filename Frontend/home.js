

fetch('/home_name')
      .then(response => response.text())
      .then(data => {
        document.getElementById('bname').innerHTML = data;
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Daten:', error);
      });

fetch('/home_anznachr')
      .then(response => response.text())
      .then(data => {
        document.getElementById('newchats').innerHTML = data;
      })
      .catch(error => {
        console.error('Fehler beim Abrufen der Daten:', error);
      });
