Ein minimales Angular2 Mars Rover Client Projekt.

Die Entwicklung beginnt damit dass man in einer Kommandozeilenumgebung in der der nodejs und
npm Pfad bereits korrekt gesetzt ist folgende Befehle ausführt:

npm install
npm start

Der erste Befehl installiert die notwendigen dependencies. Der zweite Befehl führt einen build
aus und startet einen minimalen server um die Website in einem Browser anzusehen.
Beginnt man nun die Entwicklung wird bei jeder Änderung ein rebuild ausgeführt und der Browser
refreshed.

Um die Tests auszuführen muss folgender Befehl verwendet werden:

npm run test

Wenn das Projekt gestartet ist, kann man über server:<port> die Webanwendung öffnen. Voraussetzung für
korrekte Funktion ist das zudem der Server gestartet wurde:
https://github.com/davidibl/MarsRoverCamundaKata

Danach kann man über die Weboberfläche den Mars Rover in einem zwei dimensionalen Koordinaten System
mit Befehelen der Form "ffrrblbb" steuern.
Der String entspricht hierbei einer Reihe von Befehlen.

f: move forward
b: move backward
r: turn right
l: turn left

Das System ist 10x10 Felder groß.

Die Status Updates werden nach eienr Neuberechnung des Status per Push an den Client gesendet.

Viel Spass
David Ibl