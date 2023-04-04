<img src="https://img.shields.io/badge/coded%20by%20human-100%25-brightgreen">

# SicherInAlbstadt
Sicherer Nachrichtenaustausch über das Internet

Auth0 implementation -> Marcel mach mal

## Design-MockUp
https://www.figma.com/file/FhW600TfEBEQYiToxRPTf7/Untitled?node-id=0%3A1&t=f7j7gmseh4v5orVu-1

## Vorgehen
1. Konzept finalisieren
2. Grundidee darstellen
3. Funktionsweise Schritte

### Konzept
E2EE leicht gemacht!
Barrierefreies verschlüsseln und versenden von Textnachrichten über eine WebApp.
Management von keypairs und Bereitstellung einer pubkey-Datenbank (Keyserver) bzw. eventuell
lesen eines öffentlichen Keyservers.

### Grundidee
User meldet sich auf einer Weboberfläche an mittels EMAIL und PWD.
  * Möglichkeiten:
    * E2EE-Textnachricht an andere existierende User senden
    * User suchen mittels EMAIL Adresse oder Username
